import { h, flash, pick, rand } from '../dom';
import { t } from '../i18n';
import { sfx, haptic } from '../audio';
import { getRecentHistory, saveRecentHistory } from '../storage';
import { onKeys } from '../widgets';
import { burstConfetti } from '../screens/play';
import type { Exercise } from './types';
import { TANGRAM_PUZZLES, type TangramPuzzle, type TangramPieceType, type TangramSlot } from './tangramPuzzles';

const RECENT_KEY = 'synapse_tangram_recent_puzzles';
const MAX_RECENT_MEMORY = 30;

const getRecentPuzzleIds = (): string[] => getRecentHistory(RECENT_KEY);
const saveRecentPuzzleId = (id: string) => saveRecentHistory(RECENT_KEY, id, MAX_RECENT_MEMORY);

// Canonical centered shapes for tray rendering
// Base scale u = 40 (matches mathematical puzzle grid)
const u = 40;
const mLeg = u * Math.SQRT2;
const lLeg = 2 * u;

const CANONICAL_PTS: Record<TangramPieceType, [number, number][]> = {
  ST: [
    [-u / 3, -u / 3],
    [(2 * u) / 3, -u / 3],
    [-u / 3, (2 * u) / 3],
  ],
  MT: [
    [-mLeg / 3, -mLeg / 3],
    [(2 * mLeg) / 3, -mLeg / 3],
    [-mLeg / 3, (2 * mLeg) / 3],
  ],
  LT: [
    [-lLeg / 3, -lLeg / 3],
    [(2 * lLeg) / 3, -lLeg / 3],
    [-lLeg / 3, (2 * lLeg) / 3],
  ],
  SQ: [
    [-u / 2, -u / 2],
    [u / 2, -u / 2],
    [u / 2, u / 2],
    [-u / 2, u / 2],
  ],
  PR: [
    [-u, -u / 2],
    [0, -u / 2],
    [u, u / 2],
    [0, u / 2],
  ],
};

const PIECE_COLORS: Record<TangramPieceType, string> = {
  ST: '#10B981',
  MT: '#06B6D4',
  SQ: '#8B5CF6',
  PR: '#EC4899',
  LT: '#F59E0B',
};

const CLASSIC_SET: TangramPieceType[] = ['LT', 'LT', 'MT', 'SQ', 'PR', 'ST', 'ST'];

interface TrayPiece {
  id: string;
  type: TangramPieceType;
  color: string;
  rot: number;
  flip: boolean;
  placedSlotId: string | null;
  isDecoy?: boolean;
}

interface ActiveSlot extends TangramSlot {
  filledByPieceId: string | null;
}

function isAngleMatch(type: TangramPieceType, pieceRot: number, slotRot: number): boolean {
  const diff = ((pieceRot - slotRot) % 360 + 360) % 360;
  if (type === 'SQ') return diff % 90 === 0;
  if (type === 'PR') return diff % 180 === 0;
  return diff === 0;
}

const piecesCountForLevel = (l: number): number => {
  if (l <= 1) return 3;
  if (l <= 3) return 4;
  if (l <= 4) return 5;
  if (l <= 5) return 6;
  return 7;
};

function clientToSvgPoint(svg: SVGSVGElement, clientX: number, clientY: number): { x: number; y: number } {
  const pt = svg.createSVGPoint();
  pt.x = clientX;
  pt.y = clientY;
  const ctm = svg.getScreenCTM();
  if (ctm) {
    const transformed = pt.matrixTransform(ctm.inverse());
    return { x: transformed.x, y: transformed.y };
  }
  const rect = svg.getBoundingClientRect();
  return {
    x: ((clientX - rect.left) / rect.width) * 300,
    y: ((clientY - rect.top) / rect.height) * 300,
  };
}

export const tangram: Exercise = {
  id: 'tangram',
  icon: '🧩',
  domain: 'spatial',
  name: 'ex.tangram.name',
  desc: 'ex.tangram.desc',
  how: 'ex.tangram.how',
  why: 'ex.tangram.why',
  example: 'ex.tangram.example',
  minutes: [1.5, 2.5],
  levels: { min: 1, max: 8, start: 2 },
  levelLabel: (l) => `${piecesCountForLevel(l)} ${t('ex.tangram.pieces')}`,

  async run(ctx) {
    // 3 schemes per match in training (2 in daily check, 1 in practice)
    const trials = ctx.count(3, 2, 1);
    const st = ctx.stair(trials, 1, 8, { target: 0.75 });
    const usedPuzzleIds = new Set<string>();
    let correct = 0;

    for (let trial = 0; trial < trials; trial++) {
      ctx.progress(trial / trials, `${trial + 1}/${trials}`);

      // Select puzzle matching current staircase level with recency avoidance
      const currentLevel = ctx.practice ? 1 : st.int;
      const pool = TANGRAM_PUZZLES.filter((p) => p.level === currentLevel);
      const recentList = getRecentPuzzleIds();
      const recentIds = new Set(recentList);
      let candidates = pool.filter((p) => !usedPuzzleIds.has(p.id) && !recentIds.has(p.id));
      if (!candidates.length) {
        // If all puzzles of this level were recently played, recycle the oldest (least recently used)
        const recycled = pool.filter((p) => !usedPuzzleIds.has(p.id));
        recycled.sort((a, b) => recentList.indexOf(a.id) - recentList.indexOf(b.id));
        const sliceLen = Math.max(1, Math.ceil(recycled.length / 2));
        candidates = recycled.slice(0, sliceLen);
      }
      const puzzle: TangramPuzzle = candidates.length
        ? pick(candidates)
        : pool.length
        ? pick(pool)
        : pick(TANGRAM_PUZZLES);

      usedPuzzleIds.add(puzzle.id);
      if (!ctx.practice) {
        saveRecentPuzzleId(puzzle.id);
      }

      // Initialize puzzle state
      const slots: ActiveSlot[] = puzzle.slots.map((s) => ({
        ...s,
        filledByPieceId: null,
      }));

      // Create pieces for the tray matching the puzzle's required tans
      const pieces: TrayPiece[] = puzzle.slots.map((s) => ({
        id: s.id,
        type: s.type,
        color: s.color,
        // Randomized initial rotation to stimulate active mental rotation (0, 45, 90, 135...)
        rot: ctx.practice ? s.rot : ((rand(0, 7) * 45) % 360),
        flip: false,
        placedSlotId: null,
      }));

      // Distractor (decoy) piece for advanced levels (Level 5–8) in non-practice mode:
      // Decoy pieces: the player must work out which pieces to use and which to discard.
      const hasDecoy = !ctx.practice && currentLevel >= 5;
      if (hasDecoy) {
        // Find an unused classic tangram piece type if any, or pick a plausible distractor shape
        const usedTypes = new Set(puzzle.slots.map((s) => s.type));
        const missing = CLASSIC_SET.find((pt) => !usedTypes.has(pt));
        const decoyType: TangramPieceType = missing ?? (currentLevel >= 7 ? 'SQ' : 'ST');
        pieces.push({
          id: `decoy_${decoyType}_${puzzle.id}`,
          type: decoyType,
          color: PIECE_COLORS[decoyType],
          rot: (rand(0, 7) * 45) % 360,
          flip: false,
          placedSlotId: null,
          isDecoy: true,
        });
      }

      let selectedPieceId: string | null = pieces[0]?.id ?? null;
      let hintsLeft = currentLevel <= 3 ? 2 : 1;
      let hintsUsed = 0;
      let misplaces = 0;
      const undoStack: { pieceId: string; slotId: string }[] = [];
      let solved = false;

      // Stage setup
      const stage = ctx.stage;
      stage.replaceChildren();

      // UI Container
      const tangramWrap = h('div', { class: 'tangram-wrap' });

      // Header Bar
      const infoBadge = h(
        'div',
        { class: 'tangram-badge' },
        `${t('ex.tangram.level', { l: currentLevel })} · ${puzzle.slots.length} ${t('ex.tangram.pieces')} · ${puzzle.icon}`,
        ...(hasDecoy ? [h('span', { class: 'tangram-decoy-badge' }, '⚠️ ' + t('ex.tangram.decoyWarning'))] : []),
      );

      const undoBtn = h(
        'button',
        { class: 'btn ghost small tangram-tool-btn', disabled: true, title: t('ex.tangram.undo') },
        '↩',
      );
      const resetBtn = h(
        'button',
        { class: 'btn ghost small tangram-tool-btn', title: t('ex.tangram.clear') },
        '↺',
      );
      const hintBtn = h(
        'button',
        { class: 'btn ghost small tangram-tool-btn', title: t('ex.tangram.hint') },
        `💡 ${hintsLeft}`,
      );

      const actionsRow = h('div', { class: 'tangram-actions' }, undoBtn, resetBtn, hintBtn);
      const headerBar = h('div', { class: 'tangram-header' }, infoBadge, actionsRow);

      // Speed Benchmark & Dynamic Tier Stopwatch (Gold / Silver / Bronze / Standard)
      // Visual feedback on solving speed (speed bands, as in timed WAIS-IV subtests)
      const benchmarkSecs = 18 + piecesCountForLevel(currentLevel) * 6;
      const timerIcon = h('span', { class: 'tangram-timer-icon' }, '🏆');
      const timerLabel = h('span', { class: 'tangram-timer-label' }, t('ex.tangram.tierGold'));
      const timerSec = h('span', { class: 'tangram-timer-sec' }, '00:00');
      const timerBadge = h('div', { class: 'tangram-timer-badge gold' }, timerIcon, timerLabel, timerSec);
      const timerFill = h('div', { class: 'tangram-timer-fill gold', style: 'width: 100%' });
      const timerTrack = h('div', { class: 'tangram-timer-track' }, timerFill);
      const timerRow = h('div', { class: 'tangram-timer-row' }, timerBadge, timerTrack);

      const puzzleStartTime = performance.now();
      let activeTier: 'gold' | 'silver' | 'bronze' | 'standard' = 'gold';

      const updateTimerDisplay = () => {
        if (solved) return;
        const elapsedSecs = (performance.now() - puzzleStartTime) / 1000;
        const mins = Math.floor(elapsedSecs / 60);
        const secs = Math.floor(elapsedSecs % 60);
        timerSec.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

        let tier: 'gold' | 'silver' | 'bronze' | 'standard' = 'gold';
        let progress = 1;

        if (elapsedSecs <= benchmarkSecs) {
          tier = 'gold';
          progress = Math.max(0, 1 - elapsedSecs / benchmarkSecs);
        } else if (elapsedSecs <= benchmarkSecs * 1.4) {
          tier = 'silver';
          progress = Math.max(0, 1 - (elapsedSecs - benchmarkSecs) / (benchmarkSecs * 0.4));
        } else if (elapsedSecs <= benchmarkSecs * 1.8) {
          tier = 'bronze';
          progress = Math.max(0, 1 - (elapsedSecs - benchmarkSecs * 1.4) / (benchmarkSecs * 0.4));
        } else {
          tier = 'standard';
          progress = 0;
        }

        if (tier !== activeTier) {
          activeTier = tier;
          sfx.tick();
        }

        timerBadge.className = `tangram-timer-badge ${tier}`;
        timerIcon.textContent = tier === 'gold' ? '🏆' : tier === 'silver' ? '🥈' : tier === 'bronze' ? '🥉' : '⏱️';
        const labelKey = tier === 'gold' ? 'ex.tangram.tierGold' : tier === 'silver' ? 'ex.tangram.tierSilver' : tier === 'bronze' ? 'ex.tangram.tierBronze' : 'ex.tangram.tierStandard';
        timerLabel.textContent = t(labelKey as any);
        timerFill.className = `tangram-timer-fill ${tier}`;
        timerFill.style.width = `${Math.round(progress * 100)}%`;
      };

      const timerInterval = setInterval(updateTimerDisplay, 100);

      // Main Game Board (SVG)
      const boardContainer = h('div', { class: 'tangram-board-container' });
      const svgNS = 'http://www.w3.org/2000/svg';
      const boardSvg = document.createElementNS(svgNS, 'svg');
      boardSvg.setAttribute('viewBox', puzzle.viewBox);
      boardSvg.setAttribute('class', 'tangram-svg-board');

      // Base solid silhouette: impenetrable black shadow without internal lines (Part-Whole decomposition)
      const baseGroup = document.createElementNS(svgNS, 'g');
      baseGroup.setAttribute('class', 'tangram-silhouette-base');
      for (const slot of puzzle.slots) {
        const basePoly = document.createElementNS(svgNS, 'polygon');
        basePoly.setAttribute('points', slot.points.map((p) => `${p[0]},${p[1]}`).join(' '));
        basePoly.setAttribute('class', 'tangram-base-polygon');
        baseGroup.append(basePoly);
      }
      boardSvg.append(baseGroup);

      // Group for Placed Pieces
      const slotsGroup = document.createElementNS(svgNS, 'g');
      slotsGroup.setAttribute('class', 'tangram-slots-group');
      boardSvg.append(slotsGroup);

      boardContainer.append(boardSvg);

      // Clicking on board: attempt deduction placement at clicked coordinates
      boardSvg.onclick = (e) => {
        if (solved) return;
        const sp = getSelectedPiece();
        if (!sp) {
          sfx.tick();
          ctx.hint(t('ex.tangram.selectPieceFirst'));
          return;
        }
        trySnapAtPoint(e.clientX, e.clientY, sp);
      };

      // Controls Bar (Rotation & Flip)
      const rotLeftBtn = h(
        'button',
        { class: 'btn small tangram-control-btn', title: t('ex.tangram.rotateLeft') },
        '↺ -45°',
      );
      const rotRightBtn = h(
        'button',
        { class: 'btn small tangram-control-btn', title: t('ex.tangram.rotateRight') },
        '↻ +45°',
      );
      const flipBtn = h(
        'button',
        { class: 'btn small tangram-control-btn', title: t('ex.tangram.flip') },
        '⇄',
      );
      flipBtn.style.visibility = 'hidden';
      flipBtn.style.pointerEvents = 'none';

      const controlsBar = h('div', { class: 'tangram-controls-bar' }, rotLeftBtn, rotRightBtn, flipBtn);

      // Tray of unplaced pieces
      const trayContainer = h('div', { class: 'tangram-tray' });

      // Victory / Reveal Banner
      const revealBanner = h('div', { class: 'tangram-reveal-banner hidden' });

      // Assemble stage layout
      tangramWrap.append(headerBar, timerRow, boardContainer, controlsBar, trayContainer, revealBanner);
      stage.append(tangramWrap);

      // Map to keep track of piece DOM elements and SVGs for zero-reflow rotations
      const trayElements = new Map<string, { itemEl: HTMLElement; poly: SVGPolygonElement }>();

      const getSelectedPiece = () => pieces.find((p) => p.id === selectedPieceId);

      const updateControlsState = () => {
        undoBtn.disabled = undoStack.length === 0 || solved;
        hintBtn.disabled = hintsLeft <= 0 || solved;
        const sp = getSelectedPiece();
        const isPR = Boolean(sp && sp.type === 'PR');
        flipBtn.style.visibility = isPR ? 'visible' : 'hidden';
        flipBtn.style.pointerEvents = isPR ? 'auto' : 'none';
        flipBtn.style.opacity = isPR ? '1' : '0';
      };

      // In-place rotation without triggering DOM teardown or layout shift
      const rotateSelected = (delta: number) => {
        const sp = getSelectedPiece();
        if (!sp || solved) return;
        sp.rot = (sp.rot + delta + 360) % 360;
        sfx.tick();
        haptic('tap');
        const entry = trayElements.get(sp.id);
        if (entry) {
          const flipScale = sp.flip ? -1 : 1;
          entry.poly.setAttribute('transform', `scale(${flipScale}, 1) rotate(${sp.rot})`);
        }
      };

      const flipSelected = () => {
        const sp = getSelectedPiece();
        if (!sp || solved || sp.type !== 'PR') return;
        sp.flip = !sp.flip;
        sfx.whoosh();
        haptic('tap');
        const entry = trayElements.get(sp.id);
        if (entry) {
          const flipScale = sp.flip ? -1 : 1;
          entry.poly.setAttribute('transform', `scale(${flipScale}, 1) rotate(${sp.rot})`);
        }
      };

      // Visual ghost hint (only used when Hint button is clicked or in practice mode)
      const flashSlotHint = (slot: ActiveSlot) => {
        const ghost = document.createElementNS(svgNS, 'polygon');
        ghost.setAttribute('points', slot.points.map((p) => `${p[0]},${p[1]}`).join(' '));
        ghost.setAttribute('class', 'tangram-slot-hint-glow');
        slotsGroup.append(ghost);
        setTimeout(() => {
          ghost.remove();
        }, 750);
      };

      const renderBoard = () => {
        slotsGroup.replaceChildren();

        for (const slot of slots) {
          if (slot.filledByPieceId !== null) {
            // Render placed piece with its color
            const fillingPiece = pieces.find((p) => p.id === slot.filledByPieceId);
            const slotEl = document.createElementNS(svgNS, 'polygon');
            slotEl.setAttribute('points', slot.points.map((p) => `${p[0]},${p[1]}`).join(' '));
            slotEl.setAttribute('class', 'tangram-slot filled');
            slotEl.setAttribute('fill', fillingPiece?.color ?? slot.color);
            slotEl.setAttribute('stroke', '#ffffff');
            slotEl.setAttribute('stroke-width', '1.5');

            // Click placed piece: unplace back to tray
            slotEl.onclick = (e) => {
              e.stopPropagation();
              if (solved) return;
              if (slot.filledByPieceId) unplacePiece(slot.filledByPieceId);
            };

            slotsGroup.append(slotEl);
          } else if (ctx.practice) {
            // Scaffolding only in beginner tutorial practice mode
            const guideEl = document.createElementNS(svgNS, 'polygon');
            guideEl.setAttribute('points', slot.points.map((p) => `${p[0]},${p[1]}`).join(' '));
            guideEl.setAttribute('class', 'tangram-slot empty practice-guide');
            slotsGroup.append(guideEl);
          }
        }
      };

      const renderTray = () => {
        trayContainer.replaceChildren();
        trayElements.clear();

        for (const piece of pieces) {
          if (piece.placedSlotId !== null) continue; // Placed on board

          const isSelected = piece.id === selectedPieceId;
          const pieceBtn = h('div', {
            class: `tangram-tray-item ${isSelected ? 'selected' : ''}`,
            title: isSelected ? t('ex.tangram.rotateRight') : t('ex.tangram.name'),
          });

          // SVG preview inside tray: sized with tight padding so pieces appear large & clear
          const pieceSvg = document.createElementNS(svgNS, 'svg');
          pieceSvg.setAttribute('viewBox', '-52 -52 104 104');
          pieceSvg.setAttribute('class', 'tangram-tray-svg');

          const poly = document.createElementNS(svgNS, 'polygon');
          const canonical = CANONICAL_PTS[piece.type];
          poly.setAttribute('points', canonical.map((p) => `${p[0]},${p[1]}`).join(' '));
          poly.setAttribute('fill', piece.color);
          poly.setAttribute('stroke', '#ffffff');
          poly.setAttribute('stroke-width', '2');

          const flipScale = piece.flip ? -1 : 1;
          poly.setAttribute('transform', `scale(${flipScale}, 1) rotate(${piece.rot})`);

          pieceSvg.append(poly);
          pieceBtn.append(pieceSvg);
          trayElements.set(piece.id, { itemEl: pieceBtn, poly });

          // Click on tray item: selects it, or if already selected, rotates 45°
          pieceBtn.onclick = (e) => {
            e.stopPropagation();
            if (solved) return;

            if (selectedPieceId === piece.id) {
              rotateSelected(45);
            } else {
              selectedPieceId = piece.id;
              haptic('tap');
              // Update visual selection borders
              for (const [id, el] of trayElements.entries()) {
                el.itemEl.classList.toggle('selected', id === selectedPieceId);
              }
              updateControlsState();
            }
          };

          // Right click quick-rotate
          pieceBtn.oncontextmenu = (e) => {
            e.preventDefault();
            selectedPieceId = piece.id;
            for (const [id, el] of trayElements.entries()) {
              el.itemEl.classList.toggle('selected', id === selectedPieceId);
            }
            updateControlsState();
            rotateSelected(45);
          };

          // Drag-and-drop pointer support
          attachDragLogic(pieceBtn, piece);

          trayContainer.append(pieceBtn);
        }

        updateControlsState();
      };

      // Pointer drag & drop logic with 1:1 scale piece following cursor
      // Note: Live scanner is intentionally disabled so the player must deduce the placement themselves!
      const attachDragLogic = (el: HTMLElement, piece: TrayPiece) => {
        let isDragging = false;
        let startX = 0;
        let startY = 0;
        let dragClone: HTMLElement | null = null;

        const onPointerDown = (e: PointerEvent) => {
          if (solved || e.button !== 0) return;
          startX = e.clientX;
          startY = e.clientY;
          isDragging = false;

          selectedPieceId = piece.id;
          for (const [id, entry] of trayElements.entries()) {
            entry.itemEl.classList.toggle('selected', id === selectedPieceId);
          }
          updateControlsState();

          const onPointerMove = (me: PointerEvent) => {
            const dx = me.clientX - startX;
            const dy = me.clientY - startY;
            if (!isDragging && Math.hypot(dx, dy) > 8) {
              isDragging = true;
              dragClone = el.cloneNode(true) as HTMLElement;
              dragClone.classList.add('tangram-dragging-clone');
              document.body.append(dragClone);
            }

            if (isDragging && dragClone) {
              dragClone.style.left = `${me.clientX}px`;
              dragClone.style.top = `${me.clientY}px`;
            }
          };

          const onPointerUp = (ue: PointerEvent) => {
            window.removeEventListener('pointermove', onPointerMove);
            window.removeEventListener('pointerup', onPointerUp);
            window.removeEventListener('pointercancel', onPointerUp);

            if (dragClone) {
              dragClone.remove();
              dragClone = null;
            }

            if (isDragging) {
              trySnapAtPoint(ue.clientX, ue.clientY, piece);
            }
          };

          window.addEventListener('pointermove', onPointerMove);
          window.addEventListener('pointerup', onPointerUp);
          window.addEventListener('pointercancel', onPointerUp);
        };

        el.addEventListener('pointerdown', onPointerDown);
      };

      const trySnapAtPoint = (clientX: number, clientY: number, piece: TrayPiece) => {
        const { x: svgX, y: svgY } = clientToSvgPoint(boardSvg, clientX, clientY);

        // Find the closest empty slot within snap proximity
        let bestSlot: ActiveSlot | null = null;
        let bestDist = Infinity;

        for (const slot of slots) {
          if (slot.filledByPieceId !== null) continue;
          const dist = Math.hypot(svgX - slot.cx, svgY - slot.cy);
          if (dist < bestDist) {
            bestDist = dist;
            bestSlot = slot;
          }
        }

        // Authentic Tangram check: piece must match the type AND the orientation
        if (
          bestSlot &&
          bestDist < 50 &&
          bestSlot.type === piece.type &&
          isAngleMatch(piece.type, piece.rot, bestSlot.rot) &&
          !piece.isDecoy
        ) {
          snapPieceIntoSlot(piece, bestSlot);
          return;
        }

        // Misplace attempt: no spoilers, promotes mental planning over random guessing
        misplaces++;
        sfx.bad();
        flash(boardContainer, 'tangram-flash-bad', 220);
        if (ctx.practice && bestSlot && bestSlot.type === piece.type) {
          flashSlotHint(bestSlot);
          ctx.hint(t('ex.tangram.wrongAngle'));
        } else {
          ctx.hint(t('ex.tangram.noMatch'));
        }
      };

      const snapPieceIntoSlot = (piece: TrayPiece, slot: ActiveSlot) => {
        piece.placedSlotId = slot.id;
        slot.filledByPieceId = piece.id;
        undoStack.push({ pieceId: piece.id, slotId: slot.id });

        // Tactile wood clack + ascending pitch note
        sfx.clack();
        const placedCount = slots.filter((s) => s.filledByPieceId !== null).length;
        sfx.note(placedCount - 1);
        haptic('good');

        // Next selected piece: auto-pick the first remaining piece in tray
        const nextUnplaced = pieces.find((p) => p.placedSlotId === null && p.id !== piece.id && !p.isDecoy);
        selectedPieceId = nextUnplaced?.id ?? pieces.find((p) => p.placedSlotId === null)?.id ?? null;

        renderBoard();
        renderTray();
        updateControlsState();

        // Check if all slots are filled!
        if (placedCount === slots.length) {
          triggerVictory();
        }
      };

      const unplacePiece = (pieceId: string) => {
        const piece = pieces.find((p) => p.id === pieceId);
        if (!piece || piece.placedSlotId === null) return;

        const slot = slots.find((s) => s.id === piece.placedSlotId);
        if (slot) slot.filledByPieceId = null;
        piece.placedSlotId = null;

        const idx = undoStack.findIndex((u) => u.pieceId === pieceId);
        if (idx !== -1) undoStack.splice(idx, 1);

        sfx.whoosh();
        haptic('tap');
        selectedPieceId = piece.id;

        renderBoard();
        renderTray();
        updateControlsState();
      };

      // Mouse wheel support: scroll anywhere over game wrap to smoothly rotate active piece
      tangramWrap.addEventListener(
        'wheel',
        (e) => {
          if (solved) return;
          const sp = getSelectedPiece();
          if (!sp) return;
          e.preventDefault();
          const delta = e.deltaY < 0 ? 45 : -45;
          rotateSelected(delta);
        },
        { passive: false },
      );

      // Controls button handlers
      rotLeftBtn.onclick = () => rotateSelected(-45);
      rotRightBtn.onclick = () => rotateSelected(45);
      flipBtn.onclick = () => flipSelected();

      undoBtn.onclick = () => {
        if (!undoStack.length || solved) return;
        const last = undoStack.pop()!;
        const piece = pieces.find((p) => p.id === last.pieceId);
        const slot = slots.find((s) => s.id === last.slotId);
        if (piece) piece.placedSlotId = null;
        if (slot) slot.filledByPieceId = null;

        sfx.whoosh();
        haptic('tap');
        selectedPieceId = piece?.id ?? null;

        renderBoard();
        renderTray();
        updateControlsState();
      };

      resetBtn.onclick = () => {
        if (solved) return;
        for (const p of pieces) p.placedSlotId = null;
        for (const s of slots) s.filledByPieceId = null;
        undoStack.length = 0;

        sfx.whoosh();
        haptic('tap');
        selectedPieceId = pieces[0]?.id ?? null;

        renderBoard();
        renderTray();
        updateControlsState();
      };

      hintBtn.onclick = () => {
        if (hintsLeft <= 0 || solved) return;

        const emptySlot = slots.find((s) => s.filledByPieceId === null);
        if (!emptySlot) return;

        const piece = pieces.find((p) => p.placedSlotId === null && p.type === emptySlot.type && !p.isDecoy);
        if (!piece) return;

        hintsLeft--;
        hintsUsed++;
        hintBtn.textContent = `💡 ${hintsLeft}`;
        if (hintsLeft <= 0) hintBtn.disabled = true;

        // Auto-align rotation and flip
        piece.rot = emptySlot.rot;
        piece.flip = Boolean(emptySlot.flip);

        sfx.sparkle();
        flashSlotHint(emptySlot);
        snapPieceIntoSlot(piece, emptySlot);
      };

      // Keyboard Controls
      onKeys(ctx, {
        ArrowLeft: () => rotateSelected(-45),
        KeyA: () => rotateSelected(-45),
        ArrowRight: () => rotateSelected(45),
        KeyD: () => rotateSelected(45),
        KeyR: () => rotateSelected(45),
        KeyF: () => flipSelected(),
        KeyZ: () => undoBtn.click(),
        KeyH: () => hintBtn.click(),
        Digit1: () => {
          const unplaced = pieces.filter((p) => p.placedSlotId === null);
          if (unplaced[0]) {
            selectedPieceId = unplaced[0].id;
            for (const [id, entry] of trayElements.entries()) {
              entry.itemEl.classList.toggle('selected', id === selectedPieceId);
            }
            updateControlsState();
          }
        },
        Digit2: () => {
          const unplaced = pieces.filter((p) => p.placedSlotId === null);
          if (unplaced[1]) {
            selectedPieceId = unplaced[1].id;
            for (const [id, entry] of trayElements.entries()) {
              entry.itemEl.classList.toggle('selected', id === selectedPieceId);
            }
            updateControlsState();
          }
        },
        Digit3: () => {
          const unplaced = pieces.filter((p) => p.placedSlotId === null);
          if (unplaced[2]) {
            selectedPieceId = unplaced[2].id;
            for (const [id, entry] of trayElements.entries()) {
              entry.itemEl.classList.toggle('selected', id === selectedPieceId);
            }
            updateControlsState();
          }
        },
        Digit4: () => {
          const unplaced = pieces.filter((p) => p.placedSlotId === null);
          if (unplaced[3]) {
            selectedPieceId = unplaced[3].id;
            for (const [id, entry] of trayElements.entries()) {
              entry.itemEl.classList.toggle('selected', id === selectedPieceId);
            }
            updateControlsState();
          }
        },
        Space: () => {
          const sp = getSelectedPiece();
          if (!sp || solved || sp.isDecoy) return;
          const readySlot = slots.find(
            (s) => s.filledByPieceId === null && s.type === sp.type && isAngleMatch(sp.type, sp.rot, s.rot),
          );
          if (readySlot) snapPieceIntoSlot(sp, readySlot);
        },
      });

      // Victory resolution handler
      let onTrialFinished: ((ok: boolean) => void) | null = null;
      const trialPromise = ctx.input<boolean>((done) => {
        onTrialFinished = done;
        // Quitting mid-puzzle must also stop the stopwatch, which would otherwise tick forever.
        return () => clearInterval(timerInterval);
      });

      const triggerVictory = () => {
        if (solved) return;
        solved = true;
        clearInterval(timerInterval);

        // Confetti explosion + fanfare chime
        sfx.fanfare();
        haptic('combo');
        burstConfetti(stage);

        // Fade out unused decoy pieces in tray
        for (const piece of pieces) {
          if (piece.isDecoy && piece.placedSlotId === null) {
            const entry = trayElements.get(piece.id);
            if (entry) entry.itemEl.classList.add('decoy-unused');
          }
        }

        // Radiant glow on the solved board
        boardSvg.classList.add('solved-glow');

        // Reveal the solved figure name and tier achieved
        const tierIconStr = activeTier === 'gold' ? '🏆' : activeTier === 'silver' ? '🥈' : activeTier === 'bronze' ? '🥉' : '⏱️';
        const tierLabelKey = activeTier === 'gold' ? 'ex.tangram.tierGold' : activeTier === 'silver' ? 'ex.tangram.tierSilver' : activeTier === 'bronze' ? 'ex.tangram.tierBronze' : 'ex.tangram.tierStandard';
        revealBanner.replaceChildren(
          h('span', { class: 'tangram-reveal-icon' }, puzzle.icon),
          h(
            'span',
            { class: 'tangram-reveal-text' },
            `${t('ex.tangram.solved', { name: t(puzzle.name as any) })} · ${tierIconStr} ${t(tierLabelKey as any)}`,
          ),
        );
        revealBanner.classList.remove('hidden');

        // Brief delay for the player to enjoy the completed figure
        setTimeout(() => {
          onTrialFinished?.(true);
        }, 1300);
      };

      // Initial render
      renderBoard();
      renderTray();
      updateControlsState();

      // Wait for solve or abort
      const result = await trialPromise;
      clearInterval(timerInterval);
      // Clean solve requires completing without hints and with focused, deliberate moves
      const cleanSolve = Boolean(result && hintsUsed === 0 && misplaces <= (currentLevel <= 3 ? 6 : 4));
      ctx.track(st, cleanSolve, { heard: result });
      if (result) correct++;
      await ctx.wait(350);
    }

    ctx.progress(1);
    // Benchmark for speed bonus calibrated per level:
    // (18s base + 6s per piece) gives an achievable +10 XP speed bonus for swift play
    const benchmarkSecs = 18 + piecesCountForLevel(st.int) * 6;
    const { score, timeBonus } = ctx.withTimeBonus(st.score(), benchmarkSecs);

    return {
      score,
      detail: t('ex.tangram.detail', { ok: correct, n: trials }),
      level: st.next(),
      timeBonus,
    };
  },
};
