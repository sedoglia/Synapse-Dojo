import type { Locale, Passage } from '../i18n';

const ui: Locale['ui'] = {
  'app.tagline': 'Unos minutos al día para una mente más ágil',
  'home.how': 'Entrena cada día y mídete para ver tu progreso',
  'onboard.title': '¡Bienvenido!',
  'onboard.ask': '¿Cómo te llamas?',
  'onboard.placeholder': 'Tu nombre',
  'onboard.go': 'Empecemos',

  'landing.heroTitle': 'Entrena tu mente unos minutos al día',
  'landing.heroSub': '35 ejercicios cognitivos basados en la neurociencia para potenciar memoria, atención, velocidad de cálculo y reflejos. 100% gratis, sin anuncios, sin cuenta ni contraseña.',
  'landing.badgeFree': '100% Gratis',
  'landing.badgePrivacy': 'Privacidad total · Datos locales',
  'landing.badgeScience': 'Basado en la ciencia',
  'landing.badgeOpenSource': 'Código abierto',
  'landing.startCardTitle': 'Empieza a entrenar ahora',
  'landing.startCardDesc': 'Sin registro. Elige un apodo para personalizar tu experiencia y guardar tu progreso en tu navegador.',
  'landing.guestBtn': 'O juega como invitado',
  'landing.guestName': 'Invitado',
  'landing.guideBtn': '📖 Guía e instrucciones',
  'landing.howItWorks': 'Cómo funciona Synapse Dojo',
  'landing.pillar1Title': 'Entrenamiento diario',
  'landing.pillar1Desc': '4 ejercicios seleccionados cada día que se adaptan a tu nivel. Solo unos 10 minutos.',
  'landing.pillar2Title': 'Neuro Score diario',
  'landing.pillar2Desc': 'Una prueba rápida de unos 4 minutos en las 9 áreas para medir objetivamente tu progreso.',
  'landing.pillar3Title': 'Gimnasio libre (35 juegos)',
  'landing.pillar3Desc': 'Practica libremente en las 9 áreas cognitivas cuando quieras para superar tus récords.',
  'landing.pillar4Title': 'Clasificación semanal (opcional)',
  'landing.pillar4Desc': 'Si te apetece, compara tu constancia y tu mejora con otros jugadores o con amigos, con un apodo aleatorio. Está desactivada hasta que te unes y puedes salir cuando quieras.',
  'landing.domainsTitle': 'Las 9 áreas cognitivas entrenadas',
  'landing.guideCtaTitle': '¿Quieres saber cómo funciona cada juego?',
  'landing.guideCtaDesc': 'Lee nuestra guía detallada con los fundamentos científicos, beneficios y reglas de los 35 ejercicios.',
  'landing.guideCtaBtn': 'Leer la guía completa',
  'landing.footerTagline': 'Synapse Dojo · Entrenamiento cognitivo gratuito',

  'guide.title': 'Guía e instrucciones',
  'guide.subtitle': 'Cómo funciona Synapse Dojo, las secciones de la app y la explicación de los 35 ejercicios cognitivos',
  'guide.navSections': 'Secciones de la app',
  'guide.introH': '¿Por qué entrenar el cerebro?',
  'guide.introP': 'El cerebro tiene una capacidad extraordinaria para reorganizarse y crear nuevas conexiones sinápticas a lo largo de toda la vida: esto es la neuroplasticidad. Igual que el ejercicio físico mantiene el cuerpo en forma, estimular con regularidad diversas funciones cognitivas ayuda a conservar la agilidad mental, la memoria y la concentración. Synapse Dojo ofrece un entrenamiento diario, rápido y estimulante: solo unos minutos al día con ejercicios que se calibran a tu nivel actual.',
  'guide.planH': '🏋️ Entrenamiento diario (Plan)',
  'guide.planP': 'Cada día, Synapse Dojo crea una secuencia de 4 ejercicios sobre diferentes áreas (velocidad, memoria, control y razonamiento). Los ejercicios se adaptan a tu nivel: si aciertas suben de dificultad, y si fallas se simplifican para mantenerte siempre en la zona óptima de aprendizaje. Al completar el entrenamiento aumentas tu racha diaria y ganas puntos XP para subir de nivel.',
  'guide.checkH': '📏 Mide tu Neuro Score (Daily Check)',
  'guide.checkP': 'El Neuro Score es una evaluación estandarizada de unos 15–20 minutos que mide las 9 áreas cognitivas (Velocidad, Atención, Control Ejecutivo, Memoria de Trabajo, Memoria, Razonamiento Espacial, Lógica, Lenguaje y Coordinación Bilateral), seleccionando cada día un ejercicio rotativo para cada área. Dado que cubre todo el espectro cerebral, la puntuación obtenida (0–1000) ofrece una medida objetiva y completa de tu agilidad mental a lo largo del tiempo.',
  'guide.trainingH': '🧩 Gimnasio libre (35 ejercicios)',
  'guide.trainingP': 'En la sección Gimnasio tienes acceso libre a todos los 35 ejercicios divididos por habilidad cerebral. Puedes entrenar sin límites, probar nuevos retos o superar tu propio récord.',
  'guide.progressH': '📈 Progreso y estadísticas',
  'guide.progressP': 'Consulta tu perfil cognitivo con los niveles alcanzados en cada habilidad, el historial de tu Neuro Score, los logros y medallas desbloqueados (como rachas de días seguidos o niveles avanzados) y el calendario mensual de tus sesiones.',
  'guide.boardH': '🏆 Clasificación Semanal y Grupos de Amigos',
  'guide.boardP': 'Opcional y desactivada hasta que te unes desde Ajustes. Cada semana puedes comparar la constancia (10 puntos por día de entrenamiento más 1 por ejercicio, hasta 12 al día), la mejora respecto a tu propio punto de partida y el mejor nivel por ejercicio, con una franja de edad opcional. Se reinicia cada lunes y ves el top 3 y a los jugadores cercanos a ti, con un apodo aleatorio. También puedes crear un grupo privado e invitar a familiares y amigos con un enlace o un código. Puedes salir cuando quieras y se borran todos tus datos.',
  'guide.settingsH': '⚙️ Ajustes y privacidad',
  'guide.settingsP': 'Personaliza tu experiencia: sonidos, vibración, ritmo relajado (más tiempo para responder), texto grande y un recordatorio diario para añadir al calendario; el tema claro u oscuro sigue al de tu dispositivo. Desde aquí también te unes a la clasificación o sales de ella y gestionas tus grupos. Tu progreso se guarda solo en tu navegador: puedes exportarlo a un archivo JSON de copia de seguridad o pasarlo a otro dispositivo en cualquier momento.',
  'guide.gamesH': 'Los 35 ejercicios cognitivos en detalle',
  'guide.gameWhy': 'Para qué sirve (Fundamento):',
  'guide.gameHow': 'Cómo funciona:',
  'guide.faqH': 'Consejos y preguntas frecuentes (FAQ)',
  'guide.faq1Q': '¿Cuánto tiempo debería entrenar cada día?',
  'guide.faq1A': 'La constancia importa más que la intensidad. Bastan 10-15 minutos al día (el entrenamiento diario; el Neuro Score, si quieres, lleva otros 15-20 minutos). Entrenar 4 o 5 días a la semana da resultados mucho mejores que una sesión larga y esporádica, y por eso en la clasificación un día más cuenta más que un entrenamiento más el mismo día.',
  'guide.faq2Q': '¿Dónde se guardan mis datos y puntuaciones?',
  'guide.faq2A': 'Todo se queda en tu dispositivo. Synapse Dojo no necesita cuenta ni contraseña y no usa cookies de seguimiento: tus puntuaciones y progresos se guardan en tu navegador (localStorage). Solo si te unes a la clasificación semanal opcional se envía un resumen de la semana, con un apodo aleatorio.',
  'guide.faq3Q': '¿Tienen los juegos instrucciones durante la partida?',
  'guide.faq3A': '¡Sí! Al iniciar cualquier ejercicio encontrarás instrucciones breves y una prueba práctica guiada para familiarizarte con los controles antes de comenzar la sesión puntuada.',

  'home.hello': '¡Hola, {name}!',
  'home.streak': '{n} días seguidos',
  'home.streak1': '1 día seguido',
  'home.streak0': 'Empieza tu racha hoy',
  'home.check': 'Mide tu Neuro Score',
  'home.checkSub': 'Evalúa las 9 áreas cognitivas · unos 4 min · monitorea tu agilidad mental',
  'home.checkDone': 'Hecho hoy: {score}',
  'home.training': 'Gimnasio',
  'home.trainingSub': 'Todos los ejercicios, agrupados por habilidad',
  'home.progress': 'Progreso',
  'home.progressSub': 'Perfil por habilidad, niveles y calendario',
  'home.settings': 'Ajustes',

  'plan.title': 'Entrenamiento',
  'plan.titleN': 'Entrenamiento {n}',
  'plan.again': 'Otro entrenamiento',
  'plan.againSub': '¿Quieres más? Toca para 4 ejercicios nuevos de otras habilidades',
  'plan.sub': '{n} ejercicios elegidos para ti · se adaptan a tu nivel · unos {min} min',
  'plan.progress': '{done}/{n} completados',
  'plan.step': 'Ejercicio {i} de {n}',
  'plan.done': '¡Entrenamiento completado!',
  'plan.doneSub': '¡Buen trabajo! Si aún tienes ganas, empieza otro entrenamiento ahora, con ejercicios distintos.',

  'common.back': 'Atrás',
  'common.start': '¡Ya!',
  'common.quit': 'Salir',
  'common.retry': 'Reintentar',
  'common.menu': 'Menú',
  'common.next': 'Siguiente',
  'common.continue': 'Continuar',
  'common.best': 'Récord',
  'common.newBest': '¡Nuevo récord!',
  'common.level': 'Nivel',
  'common.levelChange': 'Nivel: {from} → {to}',
  'common.why': 'Por qué funciona',
  'common.timeout': 'Se acabó el tiempo',
  'common.step': 'Prueba {i} de {n}',
  'common.correct': '{ok}/{n} correctas',

  'domain.speed': 'Velocidad',
  'domain.attention': 'Atención',
  'domain.wm': 'Memoria de trabajo',
  'domain.memory': 'Memoria',
  'domain.executive': 'Control',
  'domain.spatial': 'Espacial',
  'domain.reasoning': 'Razonamiento',
  'domain.language': 'Cálculo y lectura',

  'ex.glance.name': 'Golpe de vista',
  'ex.glance.desc': 'Por un instante aparece un vehículo en el centro y una estrella cerca del borde. Dime qué vehículo era y dónde estaba la estrella. El tiempo de exposición se acorta a medida que mejoras.',
  'ex.glance.why': 'Entrena el «campo visual útil»: captar más cosas de un solo vistazo. Es el tipo de ejercicio usado en el estudio ACTIVE, donde el entrenamiento de velocidad de procesamiento se asoció con un menor riesgo de demencia a 10 años.',
  'ex.glance.which': '¿Qué vehículo había en el centro?',
  'ex.glance.where': '¿Dónde estaba la estrella?',
  'ex.glance.detail': 'Umbral: {ms} ms',

  'ex.reflex.name': 'Reflejo de elección',
  'ex.reflex.desc': 'Se ilumina uno de cuatro paneles. Si es verde, tócalo enseguida; si es rojo, ¡no toques nada!',
  'ex.reflex.why': 'Tiempo de reacción de elección con señales que ignorar (go/no-go): une velocidad y control de las respuestas automáticas.',
  'ex.reflex.hint': 'Verde: toca · Rojo: quieto',
  'ex.reflex.detail': 'Reacción media: {ms} ms · {ok}/{n} correctas',

  'ex.path.name': 'Sendero de números',
  'ex.path.desc': 'Toca los círculos en orden. En los niveles altos alternas números y letras: 1 → A → 2 → B → 3 …',
  'ex.path.why': 'Una versión del Trail Making Test, usado en neuropsicología para medir la búsqueda visual rápida y, en la forma alterna, la flexibilidad mental.',
  'ex.path.next': 'Siguiente: {v}',
  'ex.path.detail': '{secs} s · {err} errores',

  'ex.pilot.name': 'Piloto',
  'ex.pilot.desc': 'Mantente en la carretera: arrastra con el dedo o, en el ordenador, usa las teclas ← →. Cuando aparezca un círculo verde, pulsa SEÑAL (botón en pantalla, clic o barra espaciadora): puedes hacerlo desde que aparece hasta que se vacíe el anillo que rodea la señal. Ignora las demás señales.',
  'ex.pilot.why': 'Inspirado en NeuroRacer (Universidad de California, San Francisco): en un estudio publicado en Nature, el entrenamiento adaptativo en multitarea redujo el coste de hacer dos cosas a la vez, y el efecto duró 6 meses.',
  'ex.pilot.press': '¡SEÑAL!',
  'ex.pilot.detail': 'Señales correctas: {ok}/{n} · en la carretera {road}%',

  'ex.radar.name': 'Radar',
  'ex.radar.desc': 'Algunas bolas se iluminan: son los objetivos. Luego todas se vuelven iguales y se mueven. Síguelas con la mirada y al final toca los objetivos.',
  'ex.radar.why': 'Seguimiento de múltiples objetos: seguir varios objetos en movimiento entrena la atención repartida en el espacio, la misma que usas en el tráfico o entre la multitud.',
  'ex.radar.watch': 'Recuerda los objetivos',
  'ex.radar.track': 'Síguelos…',
  'ex.radar.pick': 'Toca los {n} objetivos',
  'ex.radar.detail': 'Objetivos: hasta {n} · {ok}/{t} rondas correctas',

  'ex.clash.name': 'Choque de colores',
  'ex.clash.desc': 'Mira la regla arriba: toca el COLOR de la tinta o el SIGNIFICADO de la palabra. El tiempo para responder se reduce a medida que mejoras.',
  'ex.clash.why': 'El efecto Stroop: frenar la respuesta automática (leer) para dar la que se pide. Entrena la inhibición, una de las funciones ejecutivas principales.',
  'ex.clash.ruleInk': '🎨 Color de la tinta',
  'ex.clash.ruleWord': '📖 Significado',

  'ex.switch.name': 'Doble regla',
  'ex.switch.desc': 'Aparece un número. Si el marco es AZUL, di si es par o impar. Si es NARANJA, si es menor o mayor que 5. ¡La regla cambia sin avisar!',
  'ex.switch.why': 'Cambio de tarea: saltar rápido entre reglas. El entrenamiento reduce el «coste del cambio», incluso en tareas no entrenadas; las personas mayores suelen mejorar más.',
  'ex.switch.parity': '¿PAR o IMPAR?',
  'ex.switch.size': '¿MENOR o MAYOR que 5?',
  'ex.switch.even': 'PAR',
  'ex.switch.odd': 'IMPAR',
  'ex.switch.detail': '{ok}/{n} · coste del cambio {cost} ms',

  'ex.echo.name': 'Eco',
  'ex.echo.desc': 'Se ilumina un cuadrado cada vez. Para cada uno pregúntate: ¿está en el mismo sitio que el de N pasos atrás? Si es así pulsa POSICIÓN, si no, no pulses nada. Empiezas con N = 1, el cuadrado justo anterior; después se añade una letra, que se compara igual.',
  'ex.echo.why': 'n-back: comparar cada elemento con el de N pasos antes. Es la tarea de memoria de trabajo más estudiada; las mejoras son claras en tareas parecidas y menos seguras en las lejanas.',
  'ex.echo.before': 'Antes',
  'ex.echo.now': 'Ahora',
  'ex.echo.ago': '{n} atrás',
  'ex.echo.demo1': 'Se ilumina un cuadrado: aún no hay nada con qué compararlo, solo espera.',
  'ex.echo.demo2': 'Distinto del anterior → no pulses nada.',
  'ex.echo.demo3': 'Igual que el anterior → ¡pulsa POSICIÓN!',
  'ex.echo.demo4': 'Otra vez distinto → no pulses. Y así sucesivamente.',
  'ex.echo.stripWait': 'Recuérdalo: lo compararás con los que vengan después.',
  'ex.echo.stripCompare': '¿El cuadrado encendido AHORA está en el mismo sitio que el resaltado? Si es así, pulsa POSICIÓN.',
  'ex.echo.stripCompareDual': 'Compara AHORA con el resaltado: mismo cuadrado → POSICIÓN, misma letra → LETRA.',
  'ex.echo.back1': 'el justo anterior',
  'ex.echo.backN': 'el de {n} pasos atrás',
  'ex.echo.dualTitle': '¡A partir de ahora es doble!',
  'ex.echo.dualText': 'Además del cuadrado oirás una letra, también escrita dentro del cuadrado. Pulsa POSICIÓN si el cuadrado coincide con {back} y LETRA si la letra coincide con {back}. Pueden coincidir los dos, uno o ninguno.',
  'ex.echo.series': 'Serie {i} de {n}',
  'ex.echo.seriesStart1': 'Esta serie tiene {len} cuadrados. El primero es solo para recordar: no pulses. Desde el segundo, compara cada cuadrado con el justo anterior.',
  'ex.echo.seriesStartN': 'Esta serie tiene {len} cuadrados. Los primeros {k} son solo para recordar: no pulses. Luego compara cada cuadrado con el de {k} pasos atrás.',
  'ex.echo.turnWait': 'Cuadrado {i} de {len} · recuérdalo, no pulses',
  'ex.echo.turnAsk': 'Cuadrado {i} de {len} · ¿igual que {back}?',
  'ex.echo.turnAskDual': 'Cuadrado {i} de {len} · ¿mismo sitio? ¿misma letra? (frente a {back})',
  'ex.echo.seriesEnd': 'Fin de la serie {i} de {n}',
  'ex.echo.seriesScore': 'Precisión: {acc}% · coincidencias captadas {hit} de {targets} · pulsaciones erróneas {fa}',
  'fb.echoNotSame': 'no pulses (era distinto)',
  'fb.echoNotSameLetter': 'no pulses (la letra era distinta)',
  'fb.echoMissed': 'pulsa {btn} (era igual)',
  'ex.echo.pos': 'Posición',
  'ex.echo.letter': 'Letra',
  'ex.echo.rule1': '1-back · compara con el justo anterior',
  'ex.echo.ruleDual': '{n}-back ×2 · compara cuadrado y letra con {back}',
  'ex.echo.rule': '{n}-back · compara con {n} pasos atrás',
  'ex.echo.block': 'Bloque {i}: {acc}% de precisión (aciertos menos falsas alarmas)',

  'ex.grid.name': 'Cuadrícula de luces',
  'ex.grid.desc': 'Mira cómo se encienden las casillas y repite la secuencia. Atención: ¡a veces hay que repetirla al revés!',
  'ex.grid.why': 'El test de Corsi: recordar secuencias en el espacio, hacia delante y hacia atrás. Mide y entrena la memoria de trabajo visoespacial.',
  'ex.grid.watch': 'Observa…',
  'ex.grid.yours': '¡Tu turno! ({n} casillas)',
  'ex.grid.back': '¡AL REVÉS! ({n} casillas)',
  'ex.grid.span': 'Secuencia más larga: {n}',
  'ex.grid.detail': 'Span hacia delante {f} · hacia atrás {b}',

  'ex.digits.name': 'Últimas cifras',
  'ex.digits.desc': 'Pasa una serie de cifras de longitud imprevisible. Cuando se detiene, escribe las últimas N en el orden correcto.',
  'ex.digits.why': 'Running span: mantener en mente solo las últimas cifras de una secuencia que se actualiza sin parar. Entrena la actualización de la memoria de trabajo.',
  'ex.digits.watch': 'Recuerda las últimas {n}',
  'ex.digits.recall': 'Escribe las últimas {n} cifras',
  'ex.digits.detail': '{ok}/{n} correctas · span {span}',

  'ex.rotate.name': 'Rotaciones',
  'ex.rotate.desc': '¿Las dos figuras son la misma figura girada, o una es la imagen en espejo de la otra?',
  'ex.rotate.why': 'Rotación mental. Un metaanálisis de 217 estudios muestra que las habilidades espaciales mejoran con el entrenamiento, de forma duradera y también en tareas parecidas no entrenadas.',
  'ex.rotate.same': 'Igual',
  'ex.rotate.mirror': 'Espejo',

  'ex.towers.name': 'Torres',
  'ex.towers.desc': 'Mueve las bolas para reproducir el objetivo sin superar el número máximo de movimientos. Toca una varilla para coger la bola de arriba y luego toca dónde ponerla. ¡Piensa antes de mover!',
  'ex.towers.why': 'La Torre de Londres: planificar una secuencia de movimientos antes de actuar. Es una prueba clásica de planificación, una función ejecutiva.',
  'ex.towers.goal': 'Objetivo',
  'ex.towers.moves': 'Movimientos: {m} · máximo: {min}',
  'ex.towers.too': 'Sin movimientos',
  'ex.towers.detail': 'Resueltos dentro del máximo: {ok}/{n}',

  'ex.odd.name': 'El intruso',
  'ex.odd.desc': 'Todas las figuras menos una comparten un rasgo (forma, color, relleno o número). Encuentra la que no lo tiene.',
  'ex.odd.why': 'Razonamiento inductivo: descubrir la regla común oculta entre diferencias irrelevantes. Tareas parecidas aparecen en las baterías de Cambridge Brain Sciences.',
  'ex.odd.ask': '¿Cuál es el intruso?',
  'ex.odd.because': 'la diferencia es: {dim}',
  'ex.odd.dimFill': 'Relleno',

  'ex.math.name': 'Sprint de cálculo',
  'ex.math.desc': 'Resuelve las operaciones lo más rápido que puedas. La respuesta se envía en cuanto escribes todas sus cifras.',
  'ex.math.why': 'Muchos cálculos sencillos hechos rápido: el principio de la «terapia de aprendizaje» estudiada por el grupo de Kawashima, que mostró mejoras en atención, inhibición y velocidad en personas mayores.',
  'ex.math.detail': '{ok}/{n} · {secs} s',

  'ex.reading.name': 'Lectura rápida',
  'ex.reading.desc': 'Lee el texto EN VOZ ALTA, lo más rápido que puedas pronunciando con claridad. Luego responde a una pregunta.',
  'ex.reading.why': 'Leer en voz alta: la otra mitad de la «terapia de aprendizaje» del grupo de Kawashima. La pregunta final comprueba que de verdad has leído.',
  'ex.reading.aloud': '🗣️ Lee en voz alta',
  'ex.reading.done': 'He terminado',
  'ex.reading.detail': '{wpm} palabras/min · comprensión {ok}/{n}',

  'ex.vault.name': 'Caja fuerte de palabras',
  'ex.vault.desc': 'Memoriza las palabras. Luego te mostraré más: dime si cada una ya la habías visto o es nueva.',
  'ex.vault.why': 'Memoria de reconocimiento: distinguir lo que ya viste de lo nuevo. Entrena la memoria episódica.',
  'ex.vault.study': 'Memoriza estas palabras',
  'ex.vault.done': 'He terminado',
  'ex.vault.seen': 'Vista',
  'ex.vault.new': 'Nueva',
  'ex.vault.result': '{n}/{t} correctas',

  'ex.pairs.name': 'Parejas',
  'ex.pairs.desc': 'Verás algunas parejas formadas por un símbolo y una palabra, p. ej. 🍎 🔗 martillo. Memorízalas. Luego aparece solo el símbolo y eliges la palabra con la que iba. No hay audio: todo es visual.',
  'ex.pairs.why': 'Asociación de pares: unir dos elementos es una de las tareas de memoria episódica más sensibles.',
  'ex.pairs.study': 'Cada símbolo tiene su palabra: recuerda cuál va con cuál',
  'ex.pairs.tip': 'Después verás solo el símbolo y elegirás su palabra. Truco: imagina una escena que los una, p. ej. {sym} + «{word}».',
  'ex.pairs.timer': '⏱ {s} segundos',
  'ex.pairs.ask': '¿Con qué palabra iba?',
  'ex.pairs.detail': '{ok}/{n} parejas recordadas',

  'color.red': 'ROJO',
  'color.blue': 'AZUL',
  'color.green': 'VERDE',
  'color.yellow': 'AMARILLO',

  'result.title': 'Resultado',
  'check.title': 'Tu Neuro Score',
  'check.delta': '{d} respecto a la última vez',
  'check.first': 'Primera medición registrada. ¡Vuelve mañana!',
  'check.rescaled': 'La puntuación se ha recalibrado: este es tu nuevo punto de partida. Los resultados anteriores siguen guardados, pero no se comparan.',
  'check.doneToday': 'Ya hiciste la medición de hoy. ¡Vuelve mañana para medirte otra vez!',

  'rank.0': 'Chispa',
  'rank.1': 'Corriente',
  'rank.2': 'Circuito',
  'rank.3': 'Red neuronal',
  'rank.4': 'Maestro de la sinapsis',

  'training.title': 'Gimnasio',
  'training.today': 'Hecho hoy',

  'progress.title': 'Progreso',
  'progress.chart': 'Neuro Score',
  'progress.empty': 'Haz tu primera medición diaria para ver el gráfico.',
  'progress.calendar': 'Últimas 4 semanas',
  'progress.domains': 'Perfil por habilidad',
  'progress.domainsHint': 'Basado en el nivel alcanzado en cada ejercicio.',
  'progress.exercises': 'Niveles y récords',
  'progress.none': '—',
  'progress.stats': 'Días activos: {days} · Sesiones: {runs}',
  'progress.week': 'Esta semana: {n}/4 días de entrenamiento',

  'settings.title': 'Ajustes',
  'settings.name': 'Nombre',
  'settings.lang': 'Idioma',
  'settings.sound': 'Efectos de sonido',
  'settings.relaxed': 'Ritmo relajado (más tiempo para responder)',
  'settings.bigText': 'Texto grande',
  'settings.reset': 'Borrar todos los datos',
  'settings.resetConfirm': '¿Seguro que quieres borrar todo el progreso? No se puede deshacer.',
  'ex.glance.example': 'Ejemplo: 🚗 en el centro y la estrella arriba a la derecha → responde 🚗 y luego toca la casilla de arriba a la derecha.',
  'ex.reflex.example': 'Ejemplo: se enciende un panel verde → tócalo enseguida. Si es rojo → no toques nada y espera.',
  'ex.path.example': 'Ejemplo: toca 1, luego 2, luego 3… En la versión alterna: 1 → A → 2 → B → 3 → C.',
  'ex.pilot.example': 'Ejemplo: aparece un círculo verde con el anillo lleno → pulsa SEÑAL antes de que se vacíe. Un triángulo o un cuadrado → no pulses.',
  'ex.radar.example': 'Ejemplo: se encienden 2 bolas → síguelas con la mirada mientras se mezclan con las demás y luego toca justo esas 2.',
  'ex.clash.example': 'Ejemplo: la palabra ROJO escrita en azul → con la regla 🎨 responde AZUL, con la regla 📖 responde ROJO.',
  'ex.switch.example': 'Ejemplo: 7 en un marco azul → IMPAR. El mismo 7 en un marco naranja → MAYOR que 5.',
  'ex.echo.example': 'Ejemplo 1-back: se enciende el cuadrado de arriba y justo después otra vez el mismo → pulsa POSICIÓN. Si es otro → no pulses.',
  'ex.grid.example': 'Ejemplo: se encienden 1 → 2 → 3. Toca 1, 2, 3. Si dice AL REVÉS, toca 3, 2, 1.',
  'ex.digits.example': 'Ejemplo: pasan 4 8 1 7 2 9 y tienes que recordar las últimas 3 → escribe 7 2 9.',
  'ex.vault.example': 'Ejemplo: estudiaste «árbol» y «barco». Aparece «árbol» → Vista. Aparece «taza» → Nueva.',
  'ex.pairs.example': 'Ejemplo: viste la pareja 🍎 – martillo. Después aparece 🍎 → elige «martillo».',
  'ex.rotate.example': 'Ejemplo: si girando la figura de la derecha obtienes la de la izquierda → Igual. Si necesitarías un espejo → Espejo.',
  'ex.towers.example': 'Ejemplo: el objetivo tiene el rojo arriba, pero ahora lo tapa el azul → mueve primero el azul y luego coloca el rojo.',
  'ex.odd.example': 'Ejemplo: tres círculos rojos rellenos y un círculo azul relleno → el intruso es el azul (el único de otro color).',
  'ex.math.example': 'Ejemplo: 7 + 8 = → escribe 15. La respuesta se envía en cuanto escribes todas sus cifras.',
  'ex.reading.example': 'Ejemplo: lee el texto en voz alta, pulsa «He terminado» y responde a la pregunta sobre él.',
  'fb.pilotRoad': 'mantente en la carretera',
  'fb.pilotMissed': 'era el círculo verde: pulsa SEÑAL',
  'fb.pilotNotTarget': 'pulsa solo con el círculo verde',
  'fb.pilotStray': 'no hay ninguna señal a la vista: espera el círculo verde',
  'fb.oddHere': 'el resaltado en verde',
  'fb.gridOrder': 'el orden numerado en las casillas',
  'fb.right': '¡Correcto!',
  'fb.wrong': 'Incorrecto',
  'fb.was': 'Respuesta correcta: {v}',
  'fb.noGo': 'era rojo, no toques',
  'fb.tooSlow': 'demasiado lento, toca antes',
  'fb.otherPad': 'el panel encendido',
  'fb.starHere': 'la estrella está donde brilla ahora',
  'fb.minMoves': 'se podía hacer en {n} movimientos',
  'intro.tip': 'El juego se adapta a ti: fallarás más o menos una de cada cinco, y justo ahí es donde el cerebro aprende más.',
  'intro.practice': 'Práctica guiada',
  'intro.practiceFirst': '¿Primera vez? Prueba una práctica guiada: es corta y no cuenta.',
  'practice.tag': 'Práctica',
  'practice.done': '¡Práctica completada!',
  'practice.doneSub': 'Ya conoces las reglas. ¿Listo para la de verdad?',
  'result.accuracy': 'Precisión: {pct}%',
  'result.combo': 'Mejor racha: ×{n}',
  'result.msgUp': 'Estás mejorando: a partir de aquí el juego se vuelve un poco más difícil.',
  'result.msgDown': 'El nivel ha bajado un poco para que entrenes en el punto justo. ¡Es normal!',
  'result.msgSame': 'Nivel estable: estás consolidando. Sigue así.',
  'result.history': 'Tu nivel en el tiempo',
  'result.sinceFirst': '{pct} desde la primera vez',
  'result.newBadge': '¡Nuevo logro!',
  'level.player': 'Nivel {n}',
  'level.up': '¡Has llegado al nivel {n}!',
  'home.next': 'Próximo logro',
  'home.week': 'Objetivo semanal: {n}/4 días',
  'badges.title': 'Logros',
  'badges.count': '{n}/{t} conseguidos',
  'settings.vibration': 'Vibración (en el móvil)',
  'settings.reminder': 'Recordatorio diario',
  'settings.reminderHint': 'Descarga un evento recurrente para añadirlo al calendario del móvil o del ordenador.',
  'settings.reminderTime': 'Hora',
  'settings.reminderBtn': 'Añadir al calendario',
  'reminder.desc': 'Unos minutos para entrenar la mente',
  'badge.first.name': 'Primer paso',
  'badge.first.desc': 'Completa tu primer ejercicio',
  'badge.check.name': 'Primera medición',
  'badge.check.desc': 'Mide tu Neuro Score por primera vez',
  'badge.plan.name': 'Entrenamiento completo',
  'badge.plan.desc': 'Completa un entrenamiento diario',
  'badge.streak3.name': 'Tres seguidos',
  'badge.streak3.desc': 'Entrena 3 días seguidos',
  'badge.week4.name': 'Semana completa',
  'badge.week4.desc': 'Entrena 4 días en la misma semana',
  'badge.streak7.name': 'Semana en llamas',
  'badge.streak7.desc': 'Entrena 7 días seguidos',
  'badge.combo10.name': 'Relámpago',
  'badge.combo10.desc': '10 respuestas correctas seguidas',
  'badge.explorer.name': 'Explorador',
  'badge.explorer.desc': 'Prueba los 35 ejercicios',
  'badge.balanced.name': 'Mente completa',
  'badge.balanced.desc': 'Entrena las 9 habilidades en 7 días',
  'badge.levelups25.name': 'En ascenso',
  'badge.levelups25.desc': 'Sube de nivel 25 veces',
  'badge.plans10.name': 'Constancia',
  'badge.plans10.desc': 'Completa 10 entrenamientos diarios',
  'badge.combo25.name': 'Tormenta',
  'badge.combo25.desc': '25 respuestas correctas seguidas',
  'badge.nback3.name': 'Eco profundo',
  'badge.nback3.desc': 'Llega a 3-back en Eco',
  'badge.span7.name': 'Memoria de acero',
  'badge.span7.desc': 'Llega a span 7 en la Cuadrícula de luces',
  'badge.glance50.name': 'Ojo de halcón',
  'badge.glance50.desc': 'Baja a unos 100 ms en Golpe de vista',
  'badge.neuro800.name': 'Red neuronal',
  'badge.neuro800.desc': 'Consigue al menos 800 de Neuro Score',
  'badge.streak30.name': 'Un mes juntos',
  'badge.streak30.desc': 'Entrena 30 días seguidos',
  'settings.about': 'Juego de código abierto de entrenamiento cognitivo. Solo por diversión: no es una herramienta médica. El ejercicio físico, el sueño y la vida social también le sientan bien al cerebro.',
  'settings.data': 'Tu progreso',
  'settings.dataHint': 'Guarda tu progreso en un archivo para tener una copia o pasarlo a otro dispositivo o dirección del juego: cada uno tiene su propio guardado.',
  'settings.export': 'Exportar progreso',
  'settings.import': 'Importar progreso',
  'settings.importBad': 'Este archivo no es un guardado válido de Synapse Dojo.',
  'settings.importConfirm': '¿Sustituir los datos actuales por los del archivo ({name}, {runs} ejercicios jugados, el último el {last})? Se perderá tu progreso actual.',
  'settings.importDone': 'Progreso importado.',
  'privacy.title': 'Privacidad y aviso legal',
  'privacy.updated': 'Última actualización: 4 de noviembre de 2026',
  'privacy.dataH': 'Tus datos se quedan en tu dispositivo',
  'privacy.data': 'Tu nombre, tus progresos y tus ajustes se guardan solo en el navegador de este dispositivo (localStorage). Nunca se envían a un servidor (salvo el resumen semanal de la clasificación opcional, si te unes: ver abajo) y nadie, ni siquiera quien gestiona el juego, puede verlos. Desaparecen si borras los datos del navegador o usas «Borrar todos los datos»: puedes guardar una copia con «Exportar progreso» en Ajustes.',
  'privacy.cookiesH': 'Sin cuentas ni cookies',
  'privacy.cookies': 'No hace falta registrarse y el juego no usa cookies, publicidad ni herramientas de perfilado. Las fuentes y los archivos del juego los sirve el mismo sitio, sin servicios de terceros.',
  'privacy.hostingH': 'Alojamiento',
  'privacy.hosting': 'La versión pública está alojada en Cloudflare (Cloudflare Pages). Como cualquier servidor web, para entregar las páginas y protegerlas de ataques Cloudflare trata datos técnicos como tu dirección IP y el tipo de navegador, según su propia política de privacidad.',
  'privacy.statsH': 'Estadísticas de visitas',
  'privacy.stats': 'Solo en la versión pública, las visitas se cuentan con Cloudflare Web Analytics, que no usa cookies, no guarda nada en tu navegador y no sigue a las personas entre sitios: solo muestra datos agregados como páginas vistas, país y tipo de dispositivo. Los nombres y los resultados de los ejercicios nunca se envían.',
  'privacy.boardH': 'Clasificación semanal opcional',
  'privacy.board': 'Solo si te unes desde Ajustes, después de cada sesión el juego envía a su servidor (Cloudflare Workers con una base de datos D1) un resumen de la semana en curso: días de entrenamiento y actividades de cada día, cambio de nivel y mejor nivel por ejercicio, si usas el ritmo relajado y, si la indicaste, tu franja de edad. Está vinculado a un identificador aleatorio y a un apodo generado, nunca a tu nombre, tu correo ni al resto de tus progresos. Si creas un grupo de amigos o te unes a uno, el servidor guarda también el nombre del grupo, quién forma parte de él (visibles solo para sus miembros) y a quién ha vetado su creador. Al unirte, Cloudflare Turnstile comprueba que no eres un robot, según la política de privacidad de Cloudflare. Los resultados semanales se borran a las 8 semanas y todo lo demás tras 90 días sin uso; «Salir y borrar mis datos» o «Borrar todos los datos» lo borran al instante, y un grupo que se queda sin miembros se elimina. La base jurídica es tu consentimiento, que puedes retirar en cualquier momento saliendo de la clasificación.',
  'privacy.medicalH': 'No es un dispositivo médico',
  'privacy.medical': 'Synapse Dojo es un juego para divertirse. No es un dispositivo médico, no diagnostica nada y no promete prevenir, frenar ni tratar la demencia, el deterioro cognitivo ni ningún otro problema de salud. Las puntuaciones solo indican cómo te va en los ejercicios. Si te preocupa tu salud, consulta a un médico.',
  'privacy.contactH': 'Contacto',
  'privacy.contact': 'Preguntas sobre el juego o tus datos: {contact}',
  'privacy.open': 'Abrir el juego',

  'license.title': 'Licencia y Términos',
  'license.subtitle': 'Licencia de software, usos permitidos y derechos de autor',
  'license.authorH': 'Autor y Propiedad Intelectual',
  'license.authorP': 'Synapse Dojo es un proyecto original e independiente creado por Sergio Dogliani. Todos los derechos comerciales reservados.',
  'license.polyformH': 'Licencia PolyForm Noncommercial 1.0.0',
  'license.polyformP': 'El software se distribuye bajo la licencia PolyForm Noncommercial 1.0.0. Puede consultar el código fuente, ejecutarlo y utilizarlo libremente para estudio personal, educación, investigación y fines no comerciales. Queda estrictamente prohibido cualquier uso comercial no autorizado, reventa, monetización o redistribución.',
  'license.permittedH': 'Usos Permitidos',
  'license.permittedP': 'Estudio personal, entrenamiento cognitivo, investigación no comercial, pruebas y disfrute privado sin fines comerciales.',
  'license.restrictedH': 'Restricciones Comerciales',
  'license.restrictedP': 'No está permitido usar, modificar o distribuir este software para obtener compensación económica, ventajas comerciales, publicidad o integrarlo en productos comerciales de pago sin una licencia comercial por escrito del autor.',
  'license.fontsH': 'Fuentes y Recursos',
  'license.fontsP': 'La fuente Nunito se distribuye bajo la licencia SIL Open Font License 1.1. Los paradigmas de ejercicios psicológicos son de dominio público.',
  'license.linksH': 'Documentación y Enlaces Oficiales',
  'license.officialLink': 'Leer el texto oficial de PolyForm Noncommercial 1.0.0',
  'license.repoLink': 'Ver el archivo LICENSE en el repositorio de GitHub',
  'license.open': 'Abrir el juego',

  'domain.coordination': "Coordinación",
  'shape.circle': "Círculo",
  'shape.square': "Cuadrado",
  'shape.triangle': "Triángulo",
  'shape.diamond': "Rombo",
  'ex.span.name': "Span de dígitos",
  'ex.span.desc': "Memoriza la secuencia numérica y escríbela en el orden indicado",
  'ex.span.why': "El span de dígitos es la prueba estándar de la capacidad de memoria a corto plazo y memoria de trabajo verbal.",
  'ex.span.example': "4 8 1 9   Escribe los números en el orden solicitado (directo o inverso)",
  'ex.span.forward': "Hacia adelante",
  'ex.span.backward': "Hacia atrás",
  'ex.span.watch': "Memoriza {n} dígitos",
  'ex.span.recallFor': "Escribe los dígitos en orden directo",
  'ex.span.recallBack': "¡Escribe los dígitos al revés!",
  'ex.span.detail': "{ok}/{n} correctos · span {span}",
  'ex.stories.name': "Memoria de historias",
  'ex.stories.desc': 'Lee una o varias escenas breves y, tras una pausa con una pequeña tarea, recuerda los detalles de cada una',
  'ex.stories.why': "La memoria episódica vincula personajes, lugares y tiempos, estimulando el recuerdo narrativo del hipocampo.",
  'ex.stories.example': "Lee atentamente la historia y responde las preguntas sobre los detalles",
  'ex.stories.title': "Escena {n}",
  'ex.stories.ready': "¡He leído, listo!",
  'ex.stories.qItem': "¿Qué llevaba consigo {name}?",
  'ex.stories.qPlace': "¿Dónde estaba {name}?",
  'ex.stories.qTime': "¿En qué momento ocurrió la escena?",
  'ex.stories.qTimeOf': '¿Cuándo estuvo allí {name}?',
  'ex.stories.filler': 'Pausa: ¿par o impar? Responde con calma, no cuenta para la puntuación.',
  'ex.stories.detail': "{ok}/{n} detalles correctos",
  'ex.stories.text': '{name} llevaba consigo {item}. Se encontraba {place} {time}, donde terminó su recado.',
  'ex.anagrams.letters': 'letras',
  'ex.resources.task8': 'Girasoles',
  'ex.resources.task7': 'Pescado',
  'ex.resources.task6': 'Huevos',
  'ex.resources.task5': 'Tomates',
  'ex.resources.task4': 'Pan',
  'ex.resources.task3': 'Miel',
  'ex.resources.task2': 'Queso',
  'ex.resources.task1': 'Manzanas',
  'ex.resources.confirm': 'Comprar',
  'ex.reaction.target': 'Objetivo: < {ms} ms',
  'result.timeBonusPts': 'pts de tiempo',
  'result.speedBonus': 'Bonus de rapidez (+10 XP)',
  'ex.flanker.name': "Test de Flanker",
  'ex.flanker.desc': "Concéntrate en la flecha central e ignora las flechas laterales",
  'ex.flanker.why': "La tarea de Eriksen Flanker mide la atención selectiva y la capacidad de inhibir distractores visuales adyacentes.",
  'ex.flanker.example': "← ← → ← ←   El objetivo es la flecha central (→)",
  'ex.flanker.instruction': "Toca la dirección de la flecha central",
  'ex.flanker.detail': "{ok}/{n} correctos · {ms} ms",
  'ex.gonogo.name': "Go / No-Go",
  'ex.gonogo.desc': "Toca rápido ante señales verdes; frénate con la señal de stop roja",
  'ex.gonogo.why': "Entrena el control inhibitorio motor y la supresión prefrontal de respuestas impulsivas y automáticas.",
  'ex.gonogo.example': "● = ¡Toca rápido!   ✕ = ¡No toques!",
  'ex.gonogo.hint': "Toca en ●, deténte en ✕",
  'ex.gonogo.detail': "{ok}/{n} correctos · {ms} ms",
  'ex.msit.name': "Interferencia Múltiple (MSIT)",
  'ex.msit.desc': "Identifica qué número es diferente sin importar su posición",
  'ex.msit.why': "El MSIT activa la corteza cingulada anterior al provocar interferencia entre identidad numérica y posición espacial.",
  'ex.msit.example': "1 2 1   El número diferente es 2",
  'ex.msit.hint': "¿Qué número es diferente?",
  'ex.msit.detail': "{ok}/{n} correctos · {ms} ms",
  'ex.binding.name': "Color y Forma",
  'ex.binding.desc': "Encuentra el objeto que combina la forma y el color correctos antes de que se acabe el tiempo",
  'ex.binding.why': "La integración de rasgos (feature binding) estimula la combinación cortical de canales visuales de forma y color.",
  'ex.binding.example': "Encuentra el Círculo Azul entre Cuadrados Azules y Círculos Rojos",
  'ex.binding.find': "Buscar",
  'ex.binding.detail': "{ok}/{n} correctos",// sorting
  'ex.sorting.name': 'Clasificación de Cartas',
  'ex.sorting.desc': 'Deduce la regla secreta (Color, Forma o Número) a partir de las respuestas y adáptate cuando cambie',
  'ex.sorting.why': 'Inspirado en el Wisconsin Card Sorting Test (WCST), entrena la flexibilidad cognitiva, la inducción de reglas y el cambio de criterio.',
  'ex.sorting.example': 'Carta con 3 triángulos rojos: empareja por forma (triángulo), color (rojo) o número (3). ¡Descubre la regla por ensayo y error!',
  'ex.sorting.hint': 'Empareja por Color, Forma o Número. ¡La regla secreta cambia periódicamente!',
  'ex.sorting.detail': '{ok}/{n} correctos · {cats} reglas',
  'ex.sorting.secretRule': 'Encuentra la regla secreta',
  'ex.sorting.dimColor': 'Color',
  'ex.sorting.dimShape': 'Forma',
  'ex.sorting.dimCount': 'Número',
  'ex.sorting.refLabel': 'Cartas de referencia (toca para emparejar)',
  'ex.sorting.targetLabel': 'Carta a emparejar',
  'ex.sorting.feedbackStart': 'Prueba una hipótesis: toca una carta para probar Color, Forma o Número',
  'ex.sorting.correct': '¡Correcto! Regla confirmada',
  'ex.sorting.wrong': '¡Incorrecto! Esa no es la regla activa',
  'ex.sorting.ruleShifted': '¡La regla ha cambiado! Encuentra el nuevo criterio',
  'ex.sorting.lostRule': '¡Regla perdida! Mantén el criterio descubierto',
  'ex.sorting.perseveration': '¡Atención: ya habías descartado esta regla!',
  'ex.sorting.eliminated': 'Descartado: {dim} no es la regla',

  
  'ex.resources.name': 'Puesto del mercado',
  'ex.resources.desc': 'Compra mercancía para revender: no gastes más de lo que tienes y gana todo lo posible',
  'ex.resources.why': 'Es el «problema de la mochila», estudiado en ciencias cognitivas (Murawski y Bossaerts, 2016): encontrar la mejor combinación dentro de un límite exige planificación, memoria de trabajo y comparar costes y beneficios.',
  'ex.resources.example': 'Ejemplo: tienes 50 monedas. Las manzanas cuestan 20 y dan 25 de ganancia, el pan cuesta 30 y da 30, la miel cuesta 40 y da 35 → manzanas y pan dan 55 con 50 monedas: mejor que solo la miel.',
  'ex.resources.detail': "{ok}/{n} completados",
  'ex.reaction.name': "Tiempo de Reacción",
  'ex.reaction.desc': "Toca lo más rápido posible en cuanto la pantalla se vuelva verde",
  'ex.reaction.why': "Mide la velocidad pura de conducción visomotora y la alerta refleja sin retrasos de decisión.",
  'ex.reaction.example': "Espera el verde, luego toca inmediatamente",
  'ex.reaction.ready': "Prepárate",
  'ex.reaction.wait': "Espera el verde...",
  'ex.reaction.tapNow': "¡TOCA AHORA!",
  'ex.reaction.early': "¡Salida en falso!",
  'ex.reaction.penalty': "Espera siempre la señal verde",
  'ex.reaction.detail': "Media: {ms} ms · Récord: {best} ms ({ok}/{n})",
  'ex.dots.name': "Cálculo con Puntos",
  'ex.dots.desc': "Juzga al instante qué lado contiene más puntos sin contarlos",
  'ex.dots.why': "Entrena el sistema numérico aproximado (ANS): saber de un vistazo qué grupo es mayor, sin contar, gracias a la representación parietal de las cantidades.",
  'ex.dots.example': "Toca rápido el recuadro con más puntos",
  'ex.dots.hint': "¿Qué lado tiene más puntos?",
  'ex.dots.left': "Izquierda",
  'ex.dots.right': "Derecha",
  'ex.dots.detail': "{ok}/{n} correctos",
  'ex.anagrams.name': "Anagramas",
  'ex.anagrams.desc': "Ordena las letras para reconstruir la palabra oculta",
  'ex.anagrams.why': "Activa la memoria de trabajo ortográfica, el acceso léxico y la recombinación fonológica.",
  'ex.anagrams.example': "Toca las letras en el orden correcto para formar la palabra",
  'ex.anagrams.hint': "Toca las letras para reconstruir la palabra",
  'ex.anagrams.detail': "{ok}/{n} resueltos",
  'ex.fluency.name': "Sprint de Palabras",
  'ex.fluency.desc': "Confirma al vuelo las palabras que empiezan por la letra objetivo",
  'ex.fluency.why': "Decisiones ortográficas rápidas: leer una palabra y comprobar su letra inicial bajo presión de tiempo entrena el reconocimiento rápido de palabras y la elección de la respuesta. (Es una tarea de clasificación rápida, no una prueba de fluidez verbal, en la que uno mismo produce palabras.)",
  'ex.fluency.example': "Toca si la palabra comienza por la letra indicada",
  'ex.fluency.targetLetter': "Letra objetivo:",
  'ex.fluency.detail': "{ok}/{n} correctos",// matrix
  'ex.matrix.name': 'Matriz Espacial',
  'ex.matrix.desc': 'Memoriza la posición de los bloques azules y colócalos tras la rotación mental',
  'ex.matrix.why': 'Demanda rotación mental y transformación de coordenadas espaciales, fortaleciendo circuitos parietofrontales.',
  'ex.matrix.example': 'Memoriza el patrón y coloca los elementos tras la rotación mental',
  'ex.matrix.memorize': 'Memoriza los bloques azules',
  'ex.matrix.itemsToRemember': 'bloques a memorizar',
  'ex.matrix.same': 'Toca las casillas que estaban iluminadas',
  'ex.matrix.noRot': 'Misma posición (sin rotación)',
  'ex.matrix.rot90': 'Gira 90° en sentido horario: toca dónde están ahora los bloques',
  'ex.matrix.rot90Badge': '90° horario',
  'ex.matrix.rot180': 'Gira 180°: toca dónde están ahora los bloques',
  'ex.matrix.rot180Badge': '180° invertida',
  'ex.matrix.rot270': 'Gira 90° en sentido antihorario: toca dónde están ahora los bloques',
  'ex.matrix.rot270Badge': '90° antihorario',
  'ex.matrix.detail': '{ok}/{n} correctos',
  'ex.matrix.confirm': 'Confirmar ({sel}/{n})',

  
  'ex.tapSeq.name': "Tap Bilateral",
  'ex.tapSeq.desc': "Coordina ambos pulgares para reproducir secuencias alternadas",
  'ex.tapSeq.why': "El toque bimanual alternado activa las cortezas motoras de ambos hemisferios y estimula el cuerpo calloso.",
  'ex.tapSeq.example': "◀ ▶ ◀ ▶   Sigue el ritmo con ambos pulgares",
  'ex.tapSeq.hint': "Toca izquierda y derecha en la secuencia indicada antes de que se acabe el tiempo",
  'ex.tapSeq.detail': "{ok}/{n} secuencias completadas",
  'ex.swipePattern.name': "Swipe Bilateral",
  'ex.swipePattern.desc': 'Haz los dos gestos a la vez, antes de que se acabe la barra: dos pulgares en el móvil; en el ordenador W A S D para la izquierda y las flechas para la derecha (con el ratón, uno tras otro).',
  'ex.swipePattern.why': "Los gestos bimanuales simultáneos desafían la disociación espacial y la coordinación motora asimétrica.",
  'ex.swipePattern.example': "Desliza el pulgar izquierdo hacia arriba ↑ y el derecho hacia abajo ↓",
  'ex.swipePattern.hint': 'Haz los dos gestos a la vez, antes de que se acabe la barra: dos pulgares en el móvil; en el ordenador W A S D para la izquierda y las flechas para la derecha (con el ratón, uno tras otro).',
  'ex.swipePattern.together': '¡Las dos manos a la vez!',
  'ex.swipePattern.detail': "{ok}/{n} patrones correctos",
  'ex.rhythm.name': "Ritmo Bilateral",
  'ex.rhythm.desc': "Sincroniza los toques izquierdo y derecho con el ritmo del metrónomo",
  'ex.rhythm.why': "La sincronización rítmica bilateral involucra al cerebelo y al área motora suplementaria para la precisión temporal.",
  'ex.rhythm.example': "Toca izquierda y derecha alternativamente acompasado con el pulso",
  'ex.rhythm.hint': 'Toca al compás con la mano indicada. Los primeros 3 tiempos sirven para coger el ritmo; después el punto debe caer en la zona verde.',
  'ex.rhythm.detail': "{ok}/{n} a tiempo · error medio {ms} ms",
  'ex.crossMove.name': "Movimientos Cruzados",
  'ex.crossMove.desc': "Cruza la línea media corporal: responde en el lado opuesto",
  'ex.crossMove.why': "Cruzar la línea media fuerza la transmisión interhemisférica a través del cuerpo calloso.",
  'ex.crossMove.example': "Objetivo a la izquierda + \"Cruza\" -> Toca el botón DERECHO",
  'ex.crossMove.same': "Mismo lado: Toca el lado correspondiente",
  'ex.crossMove.cross': "¡CRUZA: Toca el lado OPUESTO!",
  'ex.crossMove.detail': "{ok}/{n} correctos · {ms} ms",
  'ex.dualTask.name': "Dual-Task Bilateral",
  'ex.dualTask.desc': "Mantén pulsado a la izquierda mientras respondes con la mano derecha",
  'ex.dualTask.why': "El paradigma de doble tarea aísla la atención hemisférica dividida y la gestión de recursos asimétricos.",
  'ex.dualTask.example': "Mantén pulsado a la izquierda mientras con el pulgar derecho decides Par / Impar",
  'ex.dualTask.hint': 'Sigue manteniendo pulsado el botón izquierdo mientras eliges Par / Impar antes de que se acabe la barra',
  'ex.dualTask.hold': "Mantén pulsado (IZQ)",
  'ex.dualTask.even': "Par",
  'ex.dualTask.odd': "Impar",
  'ex.dualTask.notHolding': "¡No mantuviste pulsado a la izquierda!",
  'ex.dualTask.detail': "{ok}/{n} correctos",

  'board.title': 'Clasificación semanal',
  'board.nick': '{animal} {adj} {n}',
  'board.tab.days': 'Constancia',
  'board.tab.improvement': 'Mejora',
  'board.tab.best': 'Mejor nivel',
  'board.explain.days': '10 puntos por cada día de entrenamiento, más 1 por cada ejercicio o Neuro check, hasta 12 al día (tres entrenamientos). Lo que más cuenta es repartir el entrenamiento a lo largo de la semana.',
  'board.explain.improvement': 'Cuánto ha subido tu nivel desde el inicio de la semana: cada uno compite con su propio punto de partida. Un ejercicio nuevo parte de su primer nivel.',
  'board.explain.best': 'Tu mejor nivel de la semana en un ejercicio.',
  'board.explain.relaxed': 'Juegas a ritmo relajado, así que compites con otros jugadores a ritmo relajado.',
  'board.value.improvement': '{v} pts',
  'board.allExercises': 'Todos los ejercicios',
  'board.exercise': 'Ejercicio',
  'board.ageBand': 'Franja de edad',
  'board.band.all': 'Todas las edades',
  'board.band.u30': 'Menos de 30',
  'board.band.30-49': '30–49',
  'board.band.50-64': '50–64',
  'board.band.65-74': '65–74',
  'board.band.75+': '75 o más',
  'board.you': 'tú',
  'board.players': '{n} jugadores esta semana',
  'board.reset': 'El lunes empieza una nueva semana: todos vuelven a empezar de cero.',
  'board.empty': 'Aún no hay nadie esta semana. ¡Entrena y estrena la clasificación!',
  'board.notYet': 'Aún no estás en esta clasificación: entrena esta semana para aparecer.',
  'board.loading': 'Cargando…',
  'board.err.offline': 'Sin conexión. Vuelve a intentarlo cuando estés en línea.',
  'board.err.human_check': 'La comprobación antirrobots no ha funcionado. Inténtalo de nuevo.',
  'board.err.server': 'Algo ha fallado. Inténtalo más tarde.',
  'home.board': 'Clasificación semanal',
  'home.boardSub': 'Constancia y mejora, semana a semana',
  'home.boardRank': 'Constancia: n.º {rank} de {n} esta semana',
  'settings.board': 'Clasificación semanal',
  'settings.boardHint': 'Opcional. Cada semana compara con otros jugadores cuántas veces entrenas y cuánto mejoras. Solo se envía un resumen de la semana (días de entrenamiento, cambio de nivel, mejor nivel por ejercicio) con un apodo aleatorio: sin nombre, correo ni cuenta. Puedes salir cuando quieras y se borra todo.',
  'settings.boardAge': 'Franja de edad (opcional, para compararte con gente de tu edad)',
  'settings.boardNoAge': 'Prefiero no decirlo',
  'settings.boardJoin': 'Unirme a la clasificación',
  'settings.boardJoining': 'Uniéndote…',
  'settings.boardMember': 'Estás en la clasificación como {name}.',
  'settings.boardOpen': 'Abrir la clasificación',
  'settings.boardRename': 'Nuevo apodo',
  'settings.boardLeave': 'Salir y borrar mis datos',
  'settings.boardLeaveConfirm': '¿Salir de la clasificación? Tus resultados se borrarán del servidor.',

  'board.value.points': '{n} pts',
  'board.detail.days': '{days} d · {n} act.',
  'board.players1': '1 jugador esta semana',
  'board.scope': 'Clasificación',
  'board.scope.all': 'Todos',
  'board.groups': 'Grupos',
  'groups.title': 'Grupos de amigos',
  'groups.hint': 'Crea un grupo y envía el enlace o el código a tu familia y amigos: solo los miembros ven el grupo y su clasificación.',
  'groups.empty': 'Todavía no estás en ningún grupo.',
  'groups.members': '{n} miembros',
  'groups.members1': '1 miembro',
  'groups.code': 'Código {code}',
  'groups.open': 'Clasificación',
  'groups.invite': 'Invitar',
  'groups.copied': 'Invitación copiada: pégala en un mensaje.',
  'groups.inviteText': '¡Entrena conmigo en Synapse Dojo! Únete a mi grupo «{name}»: {url}',
  'groups.leave': 'Salir',
  'groups.leaveConfirm': '¿Salir del grupo «{name}»?',
  'groups.create': 'Crear un grupo',
  'groups.namePlaceholder': 'Nombre del grupo (p. ej. Familia)',
  'groups.createBtn': 'Crear',
  'groups.join': 'Unirse con un código',
  'groups.codePlaceholder': 'Código de invitación',
  'groups.joinBtn': 'Unirse',
  'groups.err.not_found': 'No hay ningún grupo con este código.',
  'groups.err.limit': 'Ya estás en el número máximo de grupos (10).',
  'groups.err.full': 'Este grupo está completo (100 miembros).',
  'groups.err.bad_name': 'Elige un nombre de 1 a 30 caracteres.',
  'groups.err.not_member': 'Ya no formas parte de este grupo.',
  'invite.title': 'Invitación a «{name}»',
  'invite.text': 'Para unirte al grupo, participa en la clasificación semanal: es opcional y puedes salir cuando quieras.',
  'invite.textMember': 'Únete al grupo para compararte con ellos cada semana.',
  'invite.join': 'Unirme al grupo',
  'invite.dismiss': 'No, gracias',
  'prompt.title': 'Clasificación semanal',
  'prompt.text': '¿Te apetece comparar tu constancia y tu mejora con otros jugadores, o con amigos en un grupo privado? Es totalmente opcional: participa solo si te apetece y sal cuando quieras.',
  'prompt.join': 'Saber más',
  'prompt.later': 'Ahora no',
  'prompt.never': 'No volver a preguntar',
  'settings.boardGroups': 'Grupos de amigos',

  'board.bandHint': 'Indica tu franja de edad en Ajustes para compararte con gente de tu edad.',
  'home.boardGap': 'Te faltan {n} puntos para subir un puesto',
  'home.boardGap1': 'Te falta 1 punto para subir un puesto',

  'ex.resources.money': '🪙 Gastado {cost} de {budget} · quedan {left}',
  'ex.resources.over': '🪙 Gastado {cost} de {budget}: demasiado, quita algo',
  'ex.resources.earned': '📈 Ganancia: {val}',
  'ex.resources.cost': 'Cuesta {n} 🪙',
  'ex.resources.gain': 'Ganas {n} 🪙',
  'ex.resources.was': 'se podían ganar {n}',

  'groups.creator': 'creador',
  'groups.idle': 'Sin entrenar aún esta semana',
  'groups.remove': 'Quitar del grupo',
  'groups.removeConfirm': '¿Quitar a {name} de «{group}»? Podrá volver con el código de invitación.',

  'settings.saved': 'Guardado',

  'groups.copyCode': 'Copiar código',
  'groups.codeCopied': 'Código copiado',
  'groups.copyFailed': 'No se pudo copiar: selecciona el código y cópialo a mano',
  'groups.ban': 'Vetar del grupo',
  'groups.banConfirm': '¿Vetar a {name} de «{group}»? Saldrá del grupo y no podrá volver, ni siquiera con el código de invitación.',
  'groups.actionsHint': '✕ quita del grupo (puede volver con el código) · 🚫 veta (no puede volver)',
  'groups.bannedTitle': 'Vetados ({n})',
  'groups.unban': 'Readmitir',
  'groups.err.banned': 'No puedes unirte a este grupo: su creador te ha vetado.',

  'groups.newCode': 'Nuevo código',
  'groups.newCodeConfirm': '¿Sustituir el código de «{group}»? El código anterior y los enlaces de invitación dejarán de funcionar. Quien ya está en el grupo sigue dentro.',
  'groups.newCodeDone': 'Nuevo código creado: el anterior ya no funciona',
};

const words: string[] = [
  "árbol", "barco", "vela", "delfín", "elefante", "mariposa", "helado", "isla", "lámpara", "montaña",
  "nube", "paraguas", "piano", "cuaderno", "cohete", "silla", "tambor", "huevo", "volcán", "mochila",
  "anillo", "bicicleta", "almohada", "dragón", "tijeras", "jirafa", "llave", "limón", "martillo", "nave",
  "reloj", "pingüino", "araña", "espejo", "taza", "violín", "castillo", "fresa", "gaviota", "lobo",
  "medalla", "nido", "olla", "zapato", "tren", "maleta", "cometa", "faro", "bellota", "pan",
  "ladrillo", "caballo", "tienda", "esponja", "pera", "botella", "corona", "tortuga", "río", "estrella",
  "cama", "casa", "pato", "gato", "sopa", "mapa", "vaso", "luna", "león", "toro",
  "foco", "lago", "coro", "mina", "cuna", "bota", "gota", "rosa", "muro", "pala",
  "pelo", "rama", "sapo", "foca", "mono", "foso", "copa", "tapa", "seda", "pozo",
  "playa", "torre", "selva", "libro", "campo", "suelo", "fuego", "aguas", "perro", "tigre",
  "queso", "puente", "arena", "plata", "cobre", "fruta", "carne", "grano", "viento", "lluvia",
  "nieve", "noche", "tarde", "pluma", "flecha", "tabla", "cable", "rueda", "clavo", "aguja",
  "bolsa", "disco", "radio", "techo", "pasta", "plato", "horno", "barra", "cinta", "cerro",
  "bosque", "piedra", "camino", "ventana", "cuadro", "puerto", "fuente", "teatro", "parque", "pueblo",
  "puerta", "comida", "moneda", "espada", "escudo", "camisa", "abrigo", "cabeza", "cuerpo", "diente",
  "madera", "cristal", "hierro", "bronce", "sombra", "sonido", "música", "dibujo", "cartel", "cocina",
  "jardín", "planeta", "piloto", "palacio", "cuevas", "sendero", "abismo", "verano", "guitarra", "bandera",
  "campana", "cascada", "pintura", "escultura", "muralla", "tormenta", "cosecha", "mercado", "terraza", "lagunas",
  "galaxia", "linterna", "carreta", "misterio", "horizonte", "silencio", "teclado", "palmera", "cuchara", "tenedor",
  "universo", "pirámide", "relámpago", "laberinto", "orquesta", "diamante", "edificio", "campamento", "torbellino", "trinchera",
  "armadura", "fortaleza", "cordillera", "carrusel", "biblioteca", "termómetro", "telescopio", "autopista", "cocodrilo", "terremoto",
];

const passages: Passage[] = [
  {
    text: "El faro de la isla de Piedrablanca se encendió por primera vez una noche de niebla de 1891. El farero, un antiguo pescador llamado Arturo, subía los ciento treinta escalones de la torre dos veces al día para limpiar la lente y dar cuerda al mecanismo que hacía girar la luz. En las noches de tormenta no dormía: se quedaba arriba vigilando el mar, con un termo de café y una vieja radio. En cuarenta años de servicio, ningún barco naufragó cerca de la isla.",
    question: "¿Cuántos escalones tenía la torre?",
    answers: [
      "Ciento treinta",
      "Trescientos",
      "Noventa y uno",
    ],
  },
  {
    text: "Las abejas que encuentran un buen campo de flores vuelven a la colmena y hacen una danza especial. El ángulo de la danza respecto a la vertical indica la dirección de la comida respecto al sol, mientras que la duración de la danza indica la distancia. Las otras abejas siguen los movimientos con las antenas y luego salen volando directamente hacia el lugar indicado. Así una sola exploradora puede guiar a cientos de compañeras.",
    question: "¿Qué indica la duración de la danza?",
    answers: [
      "La distancia de la comida",
      "El tipo de flor",
      "La hora del día",
    ],
  },
  {
    text: "Marta había decidido aprender a hacer pan. La primera hogaza salió del horno dura como una piedra, y la segunda estaba cruda por dentro. Al tercer intento entendió el problema: la cocina estaba demasiado fría y la masa no subía bien. Desde entonces deja la masa reposar cerca del radiador, tapada con un paño, y cada domingo sus vecinos llaman a la puerta atraídos por el olor.",
    question: "¿Por qué no le salía bien el pan a Marta?",
    answers: [
      "La cocina estaba demasiado fría",
      "Usaba demasiada sal",
      "El horno estaba roto",
    ],
  },
  {
    text: "En la montaña la temperatura baja de media unos seis grados y medio por cada mil metros de altitud. Por eso, incluso en pleno verano, hay nieve en las cumbres más altas. Los excursionistas expertos llevan siempre un jersey en la mochila, aunque en el valle haga calor. También el viento puede hacer que el frío se note mucho más de lo que marca el termómetro.",
    question: "¿Cuánto baja la temperatura cada mil metros?",
    answers: [
      "Unos seis grados y medio",
      "Unos dos grados",
      "Unos quince grados",
    ],
  },
  {
    text: "En el pequeño pueblo de Valfonda el mercado se celebra cada jueves en la plaza. El puesto más visitado no es el de la fruta ni el de los quesos, sino el de Elías, que lleva cuarenta años arreglando relojes y radios. La gente le lleva aparatos que ya nadie sabe arreglar, y él, con una lupa y unas pinzas, casi siempre consigue que vuelvan a funcionar.",
    question: "¿A qué se dedica Elías?",
    answers: [
      "Arregla relojes y radios",
      "Vende quesos",
      "Cultiva fruta",
    ],
  },
  {
    text: "El pulpo tiene tres corazones y la sangre azul. Dos corazones bombean la sangre hacia las branquias, y el tercero la empuja por el resto del cuerpo. Además es un maestro del disfraz: gracias a unas células especiales de la piel, puede cambiar de color en una fracción de segundo para camuflarse o comunicarse. Algunos pulpos incluso llevan cáscaras de coco como refugio portátil.",
    question: "¿Cuántos corazones tiene el pulpo?",
    answers: [
      "Tres",
      "Uno",
      "Ocho",
    ],
  },
  {
    text: "Los taxistas de Londres deben memorizar más de veinticinco mil calles y miles de puntos de interés para aprobar el riguroso examen conocido como \"El Conocimiento\". Estudios de neuroimagen han demostrado que esta intensa demanda de navegación espacial agranda físicamente el hipocampo posterior, la región cerebral encargada de la memoria espacial.",
    question: "¿Qué región cerebral se desarrolla notablemente en los taxistas londinenses?",
    answers: [
      "El hipocampo posterior",
      "La corteza motora primaria",
      "El lóbulo frontal izquierdo",
    ],
  },
  {
    text: "Los gecos pueden trepar por paredes lisas de cristal y colgarse del techo boca abajo usando solo una pata. Este prodigio no se debe a ventosas ni sustancias pegajosas, sino a millones de diminutos pelos microscópicos en sus dedos llamados espátulas. Estos filamentos se adhieren al vidrio mediante fuerzas moleculares débiles llamadas fuerzas de van der Waals.",
    question: "¿Qué fuerza física permite a los gecos adherirse al cristal?",
    answers: [
      "Fuerzas microscópicas de van der Waals",
      "Succión por microventosas",
      "Una secreción adhesiva transparente",
    ],
  },
  {
    text: "En 1901, unos buzos recolectores de esponjas descubrieron en un naufragio junto a la isla griega de Anticitera un corroído mecanismo de bronce. Datado en el siglo II antes de Cristo, este artefacto contenía decenas de precisos engranajes diferenciales para calcular las fases lunares y predecir eclipses con asombrosa exactitud astronómica.",
    question: "¿Para qué servía el sofisticado mecanismo de Anticitera?",
    answers: [
      "Calcular ciclos astronómicos y eclipses",
      "Medir la profundidad marina",
      "Calibrar la velocidad del viento",
    ],
  },
  {
    text: "Durante la Segunda Guerra Mundial, criptógrafos en Bletchley Park, liderados por Alan Turing, trabajaron incansablemente para descifrar las comunicaciones de la máquina alemana Enigma. Construyeron gigantescas computadoras electromecánicas llamadas Bombas que analizaban millones de permutaciones hasta descifrar la clave diaria de transmisión.",
    question: "¿Qué nombre recibieron las máquinas electromecánicas diseñadas por Turing?",
    answers: [
      "Bombas",
      "Colosos",
      "Enigmas inversas",
    ],
  },
  {
    text: "El telescopio espacial James Webb orbita el Sol a un millón y medio de kilómetros de la Tierra, en el punto de equilibrio gravitatorio conocido como Lagrange L2. Protegido por un parasol del tamaño de una pista de tenis, sus espejos hexagonales de berilio chapados en oro captan luz infrarroja de las primeras galaxias formadas tras el Big Bang.",
    question: "¿A qué distancia aproximada de la Tierra orbita el telescopio James Webb?",
    answers: [
      "Un millón y medio de kilómetros",
      "Trescientos ochenta mil kilómetros",
      "Cien mil kilómetros",
    ],
  },
  {
    text: "En la Fosa de las Marianas, a casi ocho mil metros bajo la superficie marina, habita el pez baboso de las Marianas en completa oscuridad. Su cuerpo gelatinoso y translúcido carece de vejiga natatoria y sus proteínas celulares están estabilizadas por una molécula llamada TMAO, lo que le permite soportar presiones mil veces superiores a la atmosférica.",
    question: "¿Qué adaptación química ayuda al pez de las Marianas a resistir la presión?",
    answers: [
      "La molécula estabilizadora TMAO",
      "Una densa capa de grasa sólida",
      "Escamas reforzadas con titanio",
    ],
  },
  {
    text: "En los profundos cañones andinos, los ingenieros incas construyeron puentes colgantes sobre ríos caudalosos sin usar vigas de madera ni cables de metal. Comunidades enteras recolectaban hierba de montaña y la trenzaban en sogas que luego unían en gruesos cables del grosor de troncos. Cada año, el puente desgastado se renovaba en una fiesta colectiva de tres días.",
    question: "¿Qué material principal empleaban los incas para sus puentes colgantes?",
    answers: [
      "Hierba silvestre de montaña trenzada",
      "Tiras de cuero de llama curtido",
      "Ramas de cedro atadas con cáñamo",
    ],
  },
  {
    text: "En 1610, Galileo Galilei apuntó su telescopio artesanal hacia Júpiter y descubrió cuatro puntos brillantes alineados junto al planeta. A lo largo de noches sucesivas observó cómo cambiaban de posición mientras orbitaban alrededor de Júpiter. Estos satélites galileanos aportaron la primera prueba visual de que no todos los cuerpos celestes giran en torno a la Tierra.",
    question: "¿Cuántas lunas de Júpiter descubrió Galileo en 1610?",
    answers: [
      "Cuatro",
      "Dos",
      "Siete",
    ],
  },
  {
    text: "En las selvas mesoamericanas, los antiguos mayas consideraban las semillas de cacao como moneda sagrada y regalo de los dioses. Además de intercambiarlas como dinero, las tostaban y molían para elaborar una bebida ceremonial espumosa y amarga. Vertían el líquido repetidamente desde lo alto para generar espuma y la sazonaban con chile molido y vainilla.",
    question: "¿Qué especia picante añadían los mayas a su bebida ceremonial de cacao?",
    answers: [
      "Chile molido",
      "Jengibre silvestre",
      "Clavo de olor seco",
    ],
  },
  {
    text: "En bahías tropicales del Caribe y el Pacífico, las aguas nocturnas resplandecen con una intensa luz azul eléctrica cuando las olas rompen o los remos se mueven. Este fenómeno lo generan miles de millones de plancton unicelular llamados dinoflagelados. Ante una perturbación mecánica, activan un destello químico para asustar a los depredadores marinos.",
    question: "¿De qué color es la luz emitida por los dinoflagelados bioluminiscentes?",
    answers: [
      "Azul eléctrico brillante",
      "Verde esmeralda",
      "Ámbar dorado",
    ],
  },
  {
    text: "Los camaleones no alteran el color de su piel mezclando pigmentos líquidos dentro de sus células. Bajo su epidermis poseen una capa de células iridóforas que contienen una red cristalina de guanina. Al tensar o relajar la piel, los camaleones modifican la separación entre estos nanocristales, reflejando selectivamente longitudes de onda específicas como espejos fotónicos.",
    question: "¿Cómo cambian de color los camaleones?",
    answers: [
      "Modificando la distancia entre nanocristales en su piel",
      "Comprimiendo bolsas de tinta bajo sus escamas",
      "Variando su temperatura corporal",
    ],
  },
  {
    text: "Según una antigua leyenda de las tierras altas de Etiopía, el café fue descubierto por un joven pastor de cabras llamado Kaldi. Observó que, tras mordisquear las brillantes bayas rojas de un arbusto silvestre, su rebaño saltaba y correteaba con inusual energía durante toda la noche. Kaldi llevó un puñado de bayas a un monasterio cercano para investigar su efecto.",
    question: "¿Quién descubrió según la leyenda el efecto vigorizante de las bayas de café?",
    answers: [
      "Un observador pastor de cabras llamado Kaldi",
      "Un comerciante del Mar Rojo",
      "Un monje ermitaño",
    ],
  },
  {
    text: "Bajo el inmenso casquete de hielo de la Antártida, la nieve acumulada durante milenios se ha comprimido en hielo azul purísimo. En su estructura cristalina quedan atrapadas diminutas burbujas de aire selladas desde hace cientos de miles de años. Al perforar núcleos de hielo de más de tres kilómetros de profundidad, los científicos analizan muestras directas de la atmósfera prehistórica.",
    question: "¿Qué analizan los científicos en los núcleos de hielo de la Antártida?",
    answers: [
      "Burbujas de aire atmosférico selladas hace miles de años",
      "Gotas de agua de mar fosilizadas",
      "Polen petrificado de árboles extintos",
    ],
  },
  {
    text: "En desiertos costeros y continentales de todo el mundo, los viajeros experimentan el asombroso fenómeno de las dunas que cantan. Cuando avalanchas de arena seca se deslizan ladera abajo, millones de granos de cuarzo de tamaño idéntico colisionan a la misma frecuencia. Esta fricción coordinada emite un zumbido profundo, similar al sonido de un violonchelo, que resuena durante minutos.",
    question: "¿Qué origina el característico zumbido de las dunas cantarinas?",
    answers: [
      "La fricción coordinada de granos de cuarzo al deslizarse",
      "El viento aullando entre grietas rocosas",
      "Ecos en cavernas subterráneas",
    ],
  },
];

import type { StoryScenario } from '../i18n';

export const stories: StoryScenario[] = [
  {
    "name": "Elena",
    "item": "una bolsa azul",
    "itemDistractors": [
      "una mochila roja",
      "una maleta verde"
    ],
    "place": "bajo el banco del parque",
    "placeDistractors": [
      "frente a la cafetería",
      "en el tren"
    ],
    "time": "a las 15:30",
    "timeDistractors": [
      "a las 18:00",
      "a las 12:15"
    ]
  },
  {
    "name": "Marco",
    "item": "un cuaderno de cuero",
    "itemDistractors": [
      "un libro ilustrado",
      "una tableta negra"
    ],
    "place": "en la mesa de la biblioteca",
    "placeDistractors": [
      "en la terraza",
      "en la sala de espera"
    ],
    "time": "el jueves por la mañana",
    "timeDistractors": [
      "el viernes por la tarde",
      "el martes por la noche"
    ]
  },
  {
    "name": "Sara",
    "item": "una bicicleta amarilla",
    "itemDistractors": [
      "un patinete plateado",
      "una moto blanca"
    ],
    "place": "junto a la fuente central",
    "placeDistractors": [
      "frente al ayuntamiento",
      "detrás del quiosco"
    ],
    "time": "a las 9:00",
    "timeDistractors": [
      "a las 11:30",
      "a las 14:00"
    ]
  },
  {
    "name": "David",
    "item": "una bufanda de lana roja",
    "itemDistractors": [
      "un gorro azul",
      "una chaqueta marrón"
    ],
    "place": "en la silla de la cafetería",
    "placeDistractors": [
      "en el muro del puerto",
      "en el pasillo de la oficina"
    ],
    "time": "el sábado por la noche",
    "timeDistractors": [
      "el domingo por la mañana",
      "el miércoles a las 16:00"
    ]
  },
  {
    "name": "Julia",
    "item": "un jarrón de cerámica blanca",
    "itemDistractors": [
      "una lámpara dorada",
      "un cuadro de madera"
    ],
    "place": "en el alféizar de la cocina",
    "placeDistractors": [
      "en el mostrador de la entrada",
      "en el estante del salón"
    ],
    "time": "a las 17:45",
    "timeDistractors": [
      "a las 20:00",
      "a las 10:15"
    ]
  },
  {
    "name": "Lucas",
    "item": "unos prismáticos de marinero",
    "itemDistractors": [
      "una brújula de latón",
      "un mapa antiguo"
    ],
    "place": "sobre la roca del faro",
    "placeDistractors": [
      "en la proa del barco",
      "en la cabaña del muelle"
    ],
    "time": "a las primeras luces del alba",
    "timeDistractors": [
      "al atardecer",
      "a las doce en punto"
    ]
  },
  {
    "name": "Clara",
    "item": "una cámara fotográfica vintage",
    "itemDistractors": [
      "un estuche de lentes",
      "un trípode de aluminio"
    ],
    "place": "en la terraza panorámica",
    "placeDistractors": [
      "por la avenida de los tilos",
      "en la pasarela"
    ],
    "time": "el viernes al atardecer",
    "timeDistractors": [
      "el sábado al amanecer",
      "el jueves por la tarde"
    ]
  },
  {
    "name": "Mateo",
    "item": "un reloj de bolsillo dorado",
    "itemDistractors": [
      "una pulsera de plata",
      "un anillo antiguo"
    ],
    "place": "en el escritorio del anticuario",
    "placeDistractors": [
      "en la caja fuerte del hotel",
      "en la vitrina central"
    ],
    "time": "el lunes a las 11:00",
    "timeDistractors": [
      "el miércoles a las 15:30",
      "el viernes a las 9:15"
    ]
  },
  {
    "name": "Valentina",
    "item": "un paraguas de lunares amarillos",
    "itemDistractors": [
      "un impermeable verde",
      "un chal de seda"
    ],
    "place": "en la parada del tranvía",
    "placeDistractors": [
      "en la entrada del metro",
      "bajo los soportales de la plaza"
    ],
    "time": "el miércoles bajo la lluvia",
    "timeDistractors": [
      "el martes al salir del trabajo",
      "el jueves por la noche"
    ]
  },
  {
    "name": "Simón",
    "item": "una caja de hojalata pintada",
    "itemDistractors": [
      "un cofre de madera",
      "un frasco de cristal"
    ],
    "place": "en los escalones del teatro",
    "placeDistractors": [
      "en el pasillo del cine",
      "junto a la taquilla"
    ],
    "time": "el domingo a las 14:30",
    "timeDistractors": [
      "el sábado a las 21:00",
      "el lunes a las 18:00"
    ]
  },
  {
    "name": "Federica",
    "item": "un mapa estelar enrollado",
    "itemDistractors": [
      "un globo terráqueo",
      "un astrolabio de bronce"
    ],
    "place": "en el observatorio de la colina",
    "placeDistractors": [
      "en el torreón del castillo",
      "en el césped del planetario"
    ],
    "time": "a medianoche despejada",
    "timeDistractors": [
      "a las diez de la noche",
      "a las dos de la madrugada"
    ]
  },
  {
    "name": "Andrés",
    "item": "una llave de hierro labrada",
    "itemDistractors": [
      "un candado pesado",
      "un medallón grabado"
    ],
    "place": "en el baúl del ático",
    "placeDistractors": [
      "detrás del cuadro del salón",
      "en el cajón del escritorio"
    ],
    "time": "el martes a las 16:15",
    "timeDistractors": [
      "el jueves a las 10:30",
      "el domingo por la tarde"
    ]
  },
  {
    "name": "Silvia",
    "item": "una tetera de hierro fundido esmaltada",
    "itemDistractors": [
      "una jarra de cristal",
      "una taza de porcelana"
    ],
    "place": "en la mesa del invernadero",
    "placeDistractors": [
      "en el cenador del jardín",
      "en el mostrador del taller"
    ],
    "time": "el sábado a las 10:00",
    "timeDistractors": [
      "el domingo a las 17:00",
      "el viernes en el desayuno"
    ]
  },
  {
    "name": "Lorenzo",
    "item": "una flauta de madera de nogal",
    "itemDistractors": [
      "un mandolín antiguo",
      "un arco de ébano"
    ],
    "place": "en el puente de piedra arqueado",
    "placeDistractors": [
      "junto a la orilla del arroyo",
      "bajo el roble centenario"
    ],
    "time": "el miércoles temprano por la mañana",
    "timeDistractors": [
      "el jueves al atardecer",
      "el sábado por la tarde"
    ]
  },
  {
    "name": "Alicia",
    "item": "una caja de ceras para colorear",
    "itemDistractors": [
      "un bloc de dibujo",
      "una paleta de óleo"
    ],
    "place": "en la escalinata del museo",
    "placeDistractors": [
      "en el claustro medieval",
      "en la entrada de la galería de arte"
    ],
    "time": "el domingo a las 16:45",
    "timeDistractors": [
      "el sábado al mediodía",
      "el martes a las 14:00"
    ]
  },
  {
    "name": "Fabio",
    "item": "un sombrero de paja trenzada",
    "itemDistractors": [
      "unas gafas de sol",
      "un pañuelo de cuadros"
    ],
    "place": "en el muelle pesquero",
    "placeDistractors": [
      "en la playa de las conchas",
      "en el amarre de los veleros"
    ],
    "time": "el viernes al mediodía",
    "timeDistractors": [
      "el domingo a las 11:00",
      "el miércoles a las 15:00"
    ]
  },
  {
    "name": "Beatriz",
    "item": "un farol de latón brillante",
    "itemDistractors": [
      "un candelabro de tres brazos",
      "una linterna de bolsillo"
    ],
    "place": "en el pórtico del patio antiguo",
    "placeDistractors": [
      "a lo largo del pasillo de frescos",
      "frente al portón monumental"
    ],
    "time": "el jueves por la noche a las 20:30",
    "timeDistractors": [
      "el viernes al anochecer",
      "el sábado a altas horas de la noche"
    ]
  },
  {
    "name": "Roberto",
    "item": "una radio portátil a pilas",
    "itemDistractors": [
      "un tocadiscos compacto",
      "un altavoz de bolsillo"
    ],
    "place": "en el banco de carpintería",
    "placeDistractors": [
      "en la caseta de herramientas",
      "en el taller mecánico"
    ],
    "time": "el lunes a las 8:30",
    "timeDistractors": [
      "el miércoles a las 13:00",
      "el viernes a las 17:15"
    ]
  },
  {
    "name": "Camila",
    "item": "un abanico de seda bordada",
    "itemDistractors": [
      "un mantón de encaje negro",
      "un gorro de terciopelo"
    ],
    "place": "en la galería del castillo",
    "placeDistractors": [
      "en el balcón de la torre",
      "en el salón de los espejos"
    ],
    "time": "el martes al atardecer",
    "timeDistractors": [
      "el jueves por la tarde",
      "el domingo al anochecer"
    ]
  },
  {
    "name": "Gabriel",
    "item": "un diario de a bordo amarillento",
    "itemDistractors": [
      "un atlas náutico encuadernado",
      "un pergamino con sello"
    ],
    "place": "en la bodega del viejo lagar",
    "placeDistractors": [
      "en la bodega del velero",
      "en el cobertizo de carruajes"
    ],
    "time": "el sábado por la tarde a las 15:00",
    "timeDistractors": [
      "el lunes a las 11:30",
      "el miércoles por la noche"
    ]
  },
  {
    "name": "Martina",
    "item": "una caja de bombones de chocolate negro",
    "itemDistractors": [
      "una cesta de galletas especiadas",
      "una tarta de almendras"
    ],
    "place": "en el escaparate de la pastelería",
    "placeDistractors": [
      "en la mesa del salón de té",
      "a la entrada de la tienda de ultramarinos"
    ],
    "time": "el jueves a las 17:00",
    "timeDistractors": [
      "el sábado a las 10:30",
      "el domingo a las 16:15"
    ]
  },
  {
    "name": "Jorge",
    "item": "una lupa redonda",
    "itemDistractors": [
      "un microscopio portátil",
      "unas pinzas de precisión"
    ],
    "place": "en el escritorio del despacho",
    "placeDistractors": [
      "en el archivo familiar",
      "en la mesa de dibujo técnico"
    ],
    "time": "el miércoles a las 19:30",
    "timeDistractors": [
      "el martes a las 12:00",
      "el viernes a las 18:45"
    ]
  },
  {
    "name": "Serena",
    "item": "una bolsa de lona ecológica",
    "itemDistractors": [
      "un cesto de mimbre claro",
      "una mochila de montaña"
    ],
    "place": "en el puesto de libros de ocasión",
    "placeDistractors": [
      "en el mercado de flores",
      "frente a la tienda ecológica"
    ],
    "time": "el domingo por la mañana a las 10:15",
    "timeDistractors": [
      "el sábado a las 16:00",
      "el jueves a las 11:45"
    ]
  },
  {
    "name": "Pedro",
    "item": "un estuche para violonchelo",
    "itemDistractors": [
      "una carpeta de partituras",
      "una funda de guitarra clásica"
    ],
    "place": "en el escenario del jardín de invierno",
    "placeDistractors": [
      "en el vestíbulo del auditorio",
      "a la entrada de la sala de conciertos"
    ],
    "time": "el viernes por la noche a las 21:15",
    "timeDistractors": [
      "el sábado por la tarde",
      "el domingo a las 18:30"
    ]
  }
];

const nicknames = {
  adjectives: [
    'Veloz', 'Brillante', 'Sereno', 'Valiente', 'Astuto', 'Amable', 'Feliz', 'Audaz',
    'Tranquilo', 'Afortunado', 'Radiante', 'Sabio', 'Constante', 'Curioso', 'Alegre', 'Ágil',
    'Paciente', 'Atento', 'Bondadoso', 'Animado', 'Orgulloso', 'Risueño', 'Rápido', 'Noble',
    'Agudo', 'Incansable', 'Ingenioso', 'Osado', 'Dorado', 'Plateado', 'Azul', 'Verde',
  ],
  animals: [
    'Lobo', 'Búho', 'Delfín', 'Panda', 'Tigre', 'Koala', 'Lince', 'Halcón',
    'Cisne', 'Castor', 'Pingüino', 'León', 'Oso', 'Ciervo', 'Erizo', 'Tejón',
    'Petirrojo', 'Flamenco', 'Pelícano', 'Camaleón', 'Gecko', 'Loro', 'Canguro', 'Bisonte',
    'Guepardo', 'Leopardo', 'Lémur', 'Mapache', 'Conejo', 'Elefante', 'Zorro', 'Colibrí',
  ],
};

/** Valid words made of the same letters as a word in `words`, which Anagrams also accepts as answers. */
const anagramWords: string[] = [
  'RETRO',
  'COBRA', 'BROCA', 'CABRO', 'VALE', 'LAVE', 'LEVA', 'BUEN', 'OPINA', 'TROMBA', 'LLEVA',
  'VALLE', 'VENA', 'VEAN', 'VANE', 'COSTILLA', 'COTILLAS', 'FRASE', 'BOLO', 'CAMOTE', 'EDITAN',
  'TENIDA', 'PARE', 'RAPE', 'OÍR', 'ROÍ', 'TALLERES', 'MACA', 'SACA', 'APTO', 'OPTA',
  'TOPA', 'TAPO', 'TOGA', 'PASO', 'POSA', 'NULA', 'OTRO', 'ORTO', 'ROTO', 'ALGO',
  'GALO', 'ORCO', 'NUCA', 'BATO', 'TOBA', 'AROS', 'RASO', 'ORAS', 'LAPA', 'ARMA',
  'AMAR', 'POCA', 'CAPO', 'PACO', 'PATA', 'APTA', 'VELAS', 'SALVE', 'VALES', 'LEVAS',
  'LAVES', 'COMPA', 'GRITE', 'PALTA', 'TRUFA', 'CREAN', 'NACER', 'CENAR', 'CERNA', 'RANGO',
  'VIENE', 'ENVIE', 'DARTE', 'TRAED', 'CALVO', 'VOCAL', 'BOLAS', 'LOBAS', 'ODIAR', 'PATAS',
  'TAPAS', 'APTAS', 'HONOR', 'HONRO', 'CITAN', 'TINCA', 'CORRE', 'PIERDA', 'CURADO', 'PUTERO',
  'REPUTA', 'CADMIO', 'MEANDO', 'PESADA', 'PUERCO', 'TIENDE', 'EDITEN', 'COBREN', 'BROMAS', 'RECTAL',
  'PLANTEA', 'ENREDOS', 'ORDENES', 'RENOVA', 'AVERNO', 'COMADRE', 'ALGUNAS', 'ANGULAS', 'CARTERA', 'ACERTAR',
  'TENDERO', 'IMPEDIRÁ', 'REMADA', 'MAULLAR', 'ACAMPAN', 'EMPALAR', 'PLEAMAR', 'LAMPREA', 'CACHEOS', 'MONTARTE',
  'OMITIRSE', 'MADURARA', 'GUASA', 'TIRAJES', 'LUCRARSE', 'MELLADA', 'TAMALE', 'EDUCARON',
];

export default { ui, words, anagramWords, passages, stories, nicknames };
