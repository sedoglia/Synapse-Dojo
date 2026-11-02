import { h, shuffle, flash } from '../dom';
import { t } from '../i18n';
import { Staircase } from '../adaptive';
import type { Exercise } from './types';

interface StoryScenario {
  name: string;
  item: string;
  itemDistractors: [string, string];
  place: string;
  placeDistractors: [string, string];
  time: string;
  timeDistractors: [string, string];
}

const SCENARIOS: StoryScenario[] = [
  {
    name: 'Elena',
    item: 'una borsa blu',
    itemDistractors: ['uno zaino rosso', 'una valigia verde'],
    place: 'sotto la panchina del parco',
    placeDistractors: ['davanti al bar', 'sul treno'],
    time: 'alle 15:30',
    timeDistractors: ['alle 18:00', 'alle 12:15'],
  },
  {
    name: 'Marco',
    item: 'un taccuino di cuoio',
    itemDistractors: ['un libro illustrato', 'un tablet nero'],
    place: 'sul tavolo della biblioteca',
    placeDistractors: ['in terrazza', 'nella sala d’attesa'],
    time: 'giovedì mattina',
    timeDistractors: ['venerdì pomeriggio', 'martedì sera'],
  },
  {
    name: 'Sara',
    item: 'una bicicletta gialla',
    itemDistractors: ['un monopattino argento', 'una vespa bianca'],
    place: 'accanto alla fontana centrale',
    placeDistractors: ['davanti al comune', 'dietro al chiosco'],
    time: 'alle 9:00',
    timeDistractors: ['alle 11:30', 'alle 14:00'],
  },
  {
    name: 'Davide',
    item: 'una sciarpa di lana rossa',
    itemDistractors: ['un berretto blu', 'una giacca marrone'],
    place: 'sulla sedia del caffè',
    placeDistractors: ['sul muretto del porto', 'nel corridoio dell’ufficio'],
    time: 'sabato sera',
    timeDistractors: ['domenica mattina', 'mercoledì alle 16:00'],
  },
  {
    name: 'Giulia',
    item: 'un vaso di ceramica bianca',
    itemDistractors: ['una lampada dorata', 'un quadro di legno'],
    place: 'sul davanzale della cucina',
    placeDistractors: ['sul bancone dell’ingresso', 'sulla mensola della sala'],
    time: 'alle 17:45',
    timeDistractors: ['alle 20:00', 'alle 10:15'],
  },
  {
    name: 'Luca',
    item: 'un binocolo da marinaio',
    itemDistractors: ['una bussola d’ottone', 'una mappa antica'],
    place: 'sopra la roccia del faro',
    placeDistractors: ['sulla prua della barca', 'nella cabina del molo'],
    time: 'alle prime luci dell’alba',
    timeDistractors: ['al tramonto', 'a mezzogiorno in punto'],
  },
  {
    name: 'Chiara',
    item: 'una macchina fotografica vintage',
    itemDistractors: ['una custodia di lenti', 'un treppiede d’alluminio'],
    place: 'sulla terrazza panoramica',
    placeDistractors: ['lungo il viale dei tigli', 'sul ponte dei sospiri'],
    time: 'venerdì al tramonto',
    timeDistractors: ['sabato all’alba', 'giovedì pomeriggio'],
  },
  {
    name: 'Matteo',
    item: 'un orologio da tasca dorato',
    itemDistractors: ['un bracciale d’argento', 'un anello antico'],
    place: 'sul banco dell’antiquario',
    placeDistractors: ['nella cassaforte dell’hotel', 'nella vetrina centrale'],
    time: 'lunedì alle 11:00',
    timeDistractors: ['mercoledì alle 15:30', 'venerdì alle 9:15'],
  },
  {
    name: 'Valentina',
    item: 'un ombrello a pois gialli',
    itemDistractors: ['un impermeabile verde', 'uno scialle di seta'],
    place: 'alla fermata del tram',
    placeDistractors: ['all’ingresso della metro', 'sotto il porticato della piazza'],
    time: 'mercoledì sotto la pioggia',
    timeDistractors: ['martedì all’uscita dal lavoro', 'giovedì sera'],
  },
  {
    name: 'Simone',
    item: 'una scatola di latta dipinta',
    itemDistractors: ['un cofanetto di legno', 'un barattolo di vetro'],
    place: 'sul gradino del teatro',
    placeDistractors: ['nella corsia del cinema', 'accanto alla biglietteria'],
    time: 'domenica alle 14:30',
    timeDistractors: ['sabato alle 21:00', 'lunedì alle 18:00'],
  },
  {
    name: 'Federica',
    item: 'una mappa stellare arrotolata',
    itemDistractors: ['un globo terrestre', 'un astrolabio di bronzo'],
    place: 'all’osservatorio della collina',
    placeDistractors: ['nella torretta del castello', 'sul prato del planetario'],
    time: 'a mezzanotte serena',
    timeDistractors: ['alle dieci di sera', 'alle due del mattino'],
  },
  {
    name: 'Andrea',
    item: 'una chiave di ferro intarsiata',
    itemDistractors: ['un lucchetto pesante', 'un medaglione inciso'],
    place: 'nella cassapanca della soffitta',
    placeDistractors: ['dietro il quadro in salotto', 'nel cassetto dello scrittoio'],
    time: 'martedì alle 16:15',
    timeDistractors: ['giovedì alle 10:30', 'domenica pomeriggio'],
  },
  {
    name: 'Silvia',
    item: 'una teiera di ghisa smaltata',
    itemDistractors: ['una caraffa di cristallo', 'una tazza di porcellana'],
    place: 'sul tavolino della serra',
    placeDistractors: ['nel gazebo in giardino', 'sul bancone del laboratorio'],
    time: 'sabato alle 10:00',
    timeDistractors: ['domenica alle 17:00', 'venerdì a colazione'],
  },
  {
    name: 'Lorenzo',
    item: 'un flauto di legno di noce',
    itemDistractors: ['un mandolino antico', 'un archetto d’ebano'],
    place: 'sul ponte di pietra ad arco',
    placeDistractors: ['lungo la riva del torrente', 'all’ombra della quercia secolare'],
    time: 'mercoledì mattina presto',
    timeDistractors: ['giovedì all’imbrunire', 'sabato pomeriggio'],
  },
  {
    name: 'Alice',
    item: 'una scatola di pastelli a cera',
    itemDistractors: ['un album da disegno', 'una tavolozza di colori a olio'],
    place: 'sulla scalinata del museo',
    placeDistractors: ['nel chiostro medievale', 'all’entrata della galleria d’arte'],
    time: 'domenica alle 16:45',
    timeDistractors: ['sabato a mezzogiorno', 'martedì alle 14:00'],
  },
  {
    name: 'Fabio',
    item: 'un cappello di paglia intrecciata',
    itemDistractors: ['un paio di occhiali da sole', 'una bandana a quadri'],
    place: 'sul molo dei pescatori',
    placeDistractors: ['sulla spiaggia delle conchiglie', 'all’ancoraggio delle barche a vela'],
    time: 'venerdì a mezzogiorno',
    timeDistractors: ['domenica alle 11:00', 'mercoledì alle 15:00'],
  },
  {
    name: 'Beatrice',
    item: 'una lanterna d’ottone lucido',
    itemDistractors: ['un candelabro a tre bracci', 'una torcia tascabile'],
    place: 'nel portico dell’antico cortile',
    placeDistractors: ['lungo il corridoio affrescato', 'davanti al portone monumentale'],
    time: 'giovedì sera alle 20:30',
    timeDistractors: ['venerdì all’imbrunire', 'sabato a tarda notte'],
  },
  {
    name: 'Roberto',
    item: 'una radiolina portatile a pile',
    itemDistractors: ['un giradischi compatto', 'un altoparlante tascabile'],
    place: 'sul banco della falegnameria',
    placeDistractors: ['nella casetta degli attrezzi', 'all’officina meccanica'],
    time: 'lunedì alle 8:30',
    timeDistractors: ['mercoledì alle 13:00', 'venerdì alle 17:15'],
  },
  {
    name: 'Camilla',
    item: 'un ventaglio di seta ricamata',
    itemDistractors: ['uno scialle di pizzo nero', 'una cuffia di velluto'],
    place: 'nel loggiato del castello',
    placeDistractors: ['sul balcone della torre', 'nella sala degli specchi'],
    time: 'martedì al tramonto',
    timeDistractors: ['giovedì pomeriggio', 'domenica a sera'],
  },
  {
    name: 'Gabriele',
    item: 'un diario di bordo ingiallito',
    itemDistractors: ['un atlante nautico rilegato', 'una pergamena con sigillo'],
    place: 'nella cantina del vecchio torchio',
    placeDistractors: ['nella stiva del veliero', 'nella rimessa delle carrozze'],
    time: 'sabato pomeriggio alle 15:00',
    timeDistractors: ['lunedì alle 11:30', 'mercoledì sera'],
  },
  {
    name: 'Martina',
    item: 'una scatola di cioccolatini fondenti',
    itemDistractors: ['un cestino di biscotti speziati', 'una torta alle mandorle'],
    place: 'nella vetrina della pasticceria',
    placeDistractors: ['sul tavolino della sala da tè', 'all’ingresso della drogheria'],
    time: 'giovedì alle 17:00',
    timeDistractors: ['sabato alle 10:30', 'domenica alle 16:15'],
  },
  {
    name: 'Giorgio',
    item: 'una lente d’ingrandimento rotonda',
    itemDistractors: ['un microscopio portatile', 'un paio di pinzette di precisione'],
    place: 'sulla scrivania dello studio',
    placeDistractors: ['sull’archivio di famiglia', 'sul tavolo da disegno tecnico'],
    time: 'mercoledì alle 19:30',
    timeDistractors: ['martedì alle 12:00', 'venerdì alle 18:45'],
  },
  {
    name: 'Serena',
    item: 'una borsa di tela ecologica',
    itemDistractors: ['un cesto di vimini chiaro', 'uno zaino da trekking'],
    place: 'alla bancarella dei libri usati',
    placeDistractors: ['al mercato dei fiori', 'davanti al negozio bio'],
    time: 'domenica mattina alle 10:15',
    timeDistractors: ['sabato alle 16:00', 'giovedì alle 11:45'],
  },
  {
    name: 'Pietro',
    item: 'una custodia per violoncello',
    itemDistractors: ['una borsa porta-spartiti', 'una custodia di chitarra classica'],
    place: 'sul palco del giardino d’inverno',
    placeDistractors: ['nel foyer dell’auditorium', 'all’ingresso della sala concerti'],
    time: 'venerdì sera alle 21:15',
    timeDistractors: ['sabato pomeriggio', 'domenica alle 18:30'],
  },
];

export const stories: Exercise = {
  id: 'stories',
  icon: '📜',
  domain: 'memory',
  name: 'ex.stories.name',
  desc: 'ex.stories.desc',
  why: 'ex.stories.why',
  example: 'ex.stories.example',
  minutes: 2.5,
  levels: { min: 1, max: 6, start: 2 },
  levelLabel: (l) => `lvl ${l}`,

  async run(ctx) {
    const trials = ctx.count(4, 4, 1);
    const st = new Staircase(ctx.level, 1, 6, { target: 0.75 });
    const pool = shuffle([...SCENARIOS]);

    let correct = 0;
    let totalQuestions = 0;

    for (let i = 0; i < trials; i++) {
      ctx.progress(i / trials, `${i + 1}/${trials}`);
      const scen = pool[i % pool.length];

      // Form story paragraph
      const text = `${scen.name} aveva con sé ${scen.item}. Si trovava ${scen.place} ${scen.time}, dove ha concluso la sua commissione.`;

      const title = h('div', { class: 'story-title' }, t('ex.stories.title', { n: i + 1 }));
      const body = h('div', { class: 'story-card' }, text);
      const readyBtn = h('button', { class: 'btn primary' }, t('ex.stories.ready'));

      ctx.stage.replaceChildren(title, body, readyBtn);

      await ctx.input<void>((done) => {
        readyBtn.onclick = () => done();
      });

      // Brief distraction / delay
      ctx.stage.replaceChildren(h('div', { class: 'grid-status' }, '...'));
      await ctx.wait(600);

      // Questions to ask
      const qList = [
        {
          q: t('ex.stories.qItem', { name: scen.name }),
          correct: scen.item,
          options: shuffle([scen.item, ...scen.itemDistractors]),
        },
        {
          q: t('ex.stories.qPlace', { name: scen.name }),
          correct: scen.place,
          options: shuffle([scen.place, ...scen.placeDistractors]),
        },
        {
          q: t('ex.stories.qTime', { name: scen.name }),
          correct: scen.time,
          options: shuffle([scen.time, ...scen.timeDistractors]),
        },
      ];

      // Number of questions depends on level
      const count = Math.min(qList.length, st.int >= 4 ? 3 : 2);
      const chosenQ = shuffle(qList).slice(0, count);

      for (const item of chosenQ) {
        totalQuestions++;
        const qTitle = h('div', { class: 'story-q' }, item.q);
        let onPick: ((ans: string) => void) | null = null;
        const optButtons = item.options.map((opt) =>
          h('button', { class: 'btn story-opt', onClick: () => onPick?.(opt) }, opt),
        );
        ctx.stage.replaceChildren(qTitle, h('div', { class: 'story-opts' }, ...optButtons));

        const chosen = await ctx.input<string>((done) => {
          onPick = done;
          return () => (onPick = null);
        });

        const ok = ctx.track(st, chosen === item.correct, { was: item.correct });
        const targetBtn = optButtons.find((b) => b.textContent === item.correct);
        if (ok) {
          correct++;
          if (targetBtn) flash(targetBtn, 'good');
        } else {
          if (targetBtn) targetBtn.classList.add('correct-hint');
          const chosenBtn = optButtons.find((b) => b.textContent === chosen);
          if (chosenBtn) flash(chosenBtn, 'bad');
        }
        await ctx.wait(ok ? 400 : 1200);
      }
    }
    ctx.progress(1);

    const { score, timeBonus } = ctx.withTimeBonus(st.score(), 3.0);
    return {
      score,
      detail: t('ex.stories.detail', { ok: correct, n: totalQuestions }),
      level: st.next(),
      timeBonus,
    };
  },
};
