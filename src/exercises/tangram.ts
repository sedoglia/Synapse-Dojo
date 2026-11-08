import { h, flash, pick } from '../dom';
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

interface TrayPiece {
  id: string;
  type: TangramPieceType;
  color: string;
  rot: number;
  flip: boolean;
  placedSlotId: string | null;
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
  why: 'ex.tangram.why',
  example: 'ex.tangram.example',
  minutes: [1.5, 2.5],
  levels: { min: 1, max: 8, start: 2 },
  levelLabel: (l) => `${piecesCountForLevel(l)} ${t('ex.tangram.pieces')}`,

  async run(ctx) {
    // 3 schemes per match in training (2 in daily check, 1 in practice)
    const trials = ctx.count(3, 2, 1);
    const st = ctx.stair(trials, 1, 8, { target: 0.75, fastStart: true });
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
        rot: ctx.practice ? s.rot : ((Math.floor(Math.random() * 8) * 45) % 360),
        flip: false,
        placedSlotId: null,
      }));

      let selectedPieceId: string | null = pieces[0]?.id ?? null;
      let hintsLeft = currentLevel <= 3 ? 2 : 1;
      let hintsUsed = 0;
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

      // Main Game Board (SVG)
      const boardContainer = h('div', { class: 'tangram-board-container' });
      const svgNS = 'http://www.w3.org/2000/svg';
      const boardSvg = document.createElementNS(svgNS, 'svg');
      boardSvg.setAttribute('viewBox', puzzle.viewBox);
      boardSvg.setAttribute('class', 'tangram-svg-board');

      // Base unified solid silhouette (clean dark silhouette without internal lines)
      const baseGroup = document.createElementNS(svgNS, 'g');
      baseGroup.setAttribute('class', 'tangram-silhouette-base');
      for (const slot of puzzle.slots) {
        const basePoly = document.createElementNS(svgNS, 'polygon');
        basePoly.setAttribute('points', slot.points.map((p) => `${p[0]},${p[1]}`).join(' '));
        basePoly.setAttribute('class', 'tangram-base-polygon');
        baseGroup.append(basePoly);
      }
      boardSvg.append(baseGroup);

      // Group for Placed Pieces and Interactive Target Slots
      const slotsGroup = document.createElementNS(svgNS, 'g');
      slotsGroup.setAttribute('class', 'tangram-slots-group');
      boardSvg.append(slotsGroup);

      boardContainer.append(boardSvg);

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
      // Keep flipBtn in layout with visibility:hidden to avoid any layout jump
      flipBtn.style.visibility = 'hidden';
      flipBtn.style.pointerEvents = 'none';

      const controlsBar = h('div', { class: 'tangram-controls-bar' }, rotLeftBtn, rotRightBtn, flipBtn);

      // Tray of unplaced pieces
      const trayContainer = h('div', { class: 'tangram-tray' });

      // Victory / Reveal Banner
      const revealBanner = h('div', { class: 'tangram-reveal-banner hidden' });

      // Assemble stage layout
      tangramWrap.append(headerBar, boardContainer, controlsBar, trayContainer, revealBanner);
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

      // Visual ghost hint for orientation mismatch on a slot
      const flashSlotHint = (slot: ActiveSlot) => {
        const slotEl = slotsGroup.querySelector(`[data-slot-id="${slot.id}"]`);
        if (!slotEl) return;
        slotEl.classList.remove('tangram-slot-hint-glow');
        void (slotEl as HTMLElement).offsetWidth; // Trigger reflow for animation restart
        slotEl.classList.add('tangram-slot-hint-glow');
        setTimeout(() => {
          slotEl.classList.remove('tangram-slot-hint-glow');
        }, 750);
      };

      const renderBoard = () => {
        slotsGroup.replaceChildren();

        for (const slot of slots) {
          const slotEl = document.createElementNS(svgNS, 'polygon');
          const ptsStr = slot.points.map((p) => `${p[0]},${p[1]}`).join(' ');
          slotEl.setAttribute('points', ptsStr);
          slotEl.setAttribute('data-slot-id', slot.id);

          const isFilled = slot.filledByPieceId !== null;
          if (isFilled) {
            const fillingPiece = pieces.find((p) => p.id === slot.filledByPieceId);
            slotEl.setAttribute('class', 'tangram-slot filled');
            slotEl.setAttribute('fill', fillingPiece?.color ?? slot.color);
            slotEl.setAttribute('stroke', '#ffffff');
            slotEl.setAttribute('stroke-width', '1.5');
          } else {
            let cls = 'tangram-slot empty';
            if (ctx.practice) cls += ' practice-guide';

            slotEl.setAttribute('class', cls);
            slotEl.setAttribute('fill', 'var(--tangram-silhouette-fill)');
            slotEl.setAttribute('stroke', ctx.practice ? 'rgba(255, 255, 255, 0.22)' : 'var(--tangram-silhouette-fill)');
            if (ctx.practice) slotEl.setAttribute('stroke-dasharray', '3,3');
            slotEl.setAttribute('stroke-width', ctx.practice ? '1' : '1.5');
          }

          // Slot click handler: click-to-place or click to return to tray
          slotEl.onclick = (e) => {
            e.stopPropagation();
            if (solved) return;

            if (slot.filledByPieceId) {
              unplacePiece(slot.filledByPieceId);
              return;
            }

            const selected = getSelectedPiece();
            if (!selected) {
              sfx.tick();
              ctx.hint(t('ex.tangram.selectPieceFirst'));
              return;
            }

            if (selected.type !== slot.type) {
              sfx.bad();
              flash(boardContainer, 'tangram-flash-bad', 250);
              ctx.hint(t('ex.tangram.wrongPiece'));
              return;
            }

            // Shape matches this region: check orientation
            if (!isAngleMatch(selected.type, selected.rot, slot.rot)) {
              flashSlotHint(slot);
              sfx.bad();
              flash(boardContainer, 'tangram-flash-bad', 250);
              ctx.hint(t('ex.tangram.wrongAngle'));
              return;
            }

            // Match and orientation verified: SNAP!
            snapPieceIntoSlot(selected, slot);
          };

          slotsGroup.append(slotEl);
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

              // Live magnetic snap feedback over empty slots
              const { x: svgX, y: svgY } = clientToSvgPoint(boardSvg, me.clientX, me.clientY);
              const emptySlots = slots.filter((s) => s.filledByPieceId === null);
              for (const s of emptySlots) {
                const sEl = slotsGroup.querySelector(`[data-slot-id="${s.id}"]`);
                if (!sEl) continue;
                const d = Math.hypot(svgX - s.cx, svgY - s.cy);
                const isReady = d < 56 && s.type === piece.type && isAngleMatch(piece.type, piece.rot, s.rot);
                sEl.classList.toggle('target-ready', isReady);
              }
            }
          };

          const onPointerUp = (ue: PointerEvent) => {
            window.removeEventListener('pointermove', onPointerMove);
            window.removeEventListener('pointerup', onPointerUp);
            window.removeEventListener('pointercancel', onPointerUp);

            // Clean up any target-ready outlines
            const targetReadyEls = slotsGroup.querySelectorAll('.target-ready');
            targetReadyEls.forEach((el) => el.classList.remove('target-ready'));

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

        // Find the closest empty slot within generous snap proximity
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

        // 58 SVG units tolerance covers the entire slot area
        if (bestSlot && bestDist < 58) {
          if (bestSlot.type === piece.type) {
            if (isAngleMatch(piece.type, piece.rot, bestSlot.rot)) {
              snapPieceIntoSlot(piece, bestSlot);
              return;
            } else {
              flashSlotHint(bestSlot);
              sfx.bad();
              flash(boardContainer, 'tangram-flash-bad', 250);
              ctx.hint(t('ex.tangram.wrongAngle'));
            }
          } else {
            sfx.bad();
            flash(boardContainer, 'tangram-flash-bad', 250);
            ctx.hint(t('ex.tangram.wrongPiece'));
          }
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
        const nextUnplaced = pieces.find((p) => p.placedSlotId === null && p.id !== piece.id);
        selectedPieceId = nextUnplaced?.id ?? null;

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

        const piece = pieces.find((p) => p.placedSlotId === null && p.type === emptySlot.type);
        if (!piece) return;

        hintsLeft--;
        hintsUsed++;
        hintBtn.textContent = `💡 ${hintsLeft}`;
        if (hintsLeft <= 0) hintBtn.disabled = true;

        // Auto-align rotation and flip
        piece.rot = emptySlot.rot;
        piece.flip = Boolean(emptySlot.flip);

        sfx.sparkle();
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
          // Snap selected piece to first available ready slot
          const sp = getSelectedPiece();
          if (!sp || solved) return;
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
      });

      const triggerVictory = () => {
        if (solved) return;
        solved = true;

        // Confetti explosion + fanfare chime
        sfx.fanfare();
        haptic('combo');
        burstConfetti(stage);

        // Radiant glow on the solved board
        boardSvg.classList.add('solved-glow');

        // Reveal the solved figure name
        revealBanner.replaceChildren(
          h('span', { class: 'tangram-reveal-icon' }, puzzle.icon),
          h('span', { class: 'tangram-reveal-text' }, t('ex.tangram.solved', { name: t(puzzle.name as any) })),
        );
        revealBanner.classList.remove('hidden');

        // Brief delay for the player to enjoy the dopamine burst
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
      const cleanSolve = result && hintsUsed === 0;
      ctx.track(st, cleanSolve, { heard: result });
      if (result) correct++;
      await ctx.wait(350);
    }

    ctx.progress(1);
    // Benchmark for speed bonus calibrated per level:
    // (18s base + 6s per piece) gives achievable, highly dopaminergic +10 XP speed bonus for swift play
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
