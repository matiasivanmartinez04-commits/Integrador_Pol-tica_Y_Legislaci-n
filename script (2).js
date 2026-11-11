/* ==========================================================================
   Política y Legislación Escolar — Trabajo Integrador
   Navegación por ventanas, mazo de repaso y cuestionario.
   ========================================================================== */

(function () {
  'use strict';

  /* ---------------------------------------------------------------
     1. Navegación entre ventanas
     --------------------------------------------------------------- */
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.tab'));
  var panels = Array.prototype.slice.call(document.querySelectorAll('.panel'));

  function showTab(id) {
    panels.forEach(function (p) {
      var on = p.id === id;
      p.hidden = !on;
      p.classList.toggle('is-active', on);
    });
    tabs.forEach(function (t) {
      var on = t.dataset.target === id;
      t.classList.toggle('is-active', on);
      t.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = (document.querySelector('#' + id + ' h1') || {}).textContent
      ? document.querySelector('#' + id + ' h1').textContent.trim() + ' · Política y Legislación Escolar'
      : 'Política y Legislación Escolar';
  }

  tabs.forEach(function (t) {
    t.addEventListener('click', function () { showTab(t.dataset.target); });
  });

  document.querySelectorAll('[data-goto]').forEach(function (b) {
    b.addEventListener('click', function () { showTab(b.dataset.goto); });
  });

  document.addEventListener('keydown', function (e) {
    if (e.target.matches('input, textarea')) return;
    var current = panels.findIndex(function (p) { return !p.hidden; });
    if (e.key === 'ArrowRight' && current < panels.length - 1) showTab(panels[current + 1].id);
    if (e.key === 'ArrowLeft' && current > 0) showTab(panels[current - 1].id);
  });

  /* ---------------------------------------------------------------
     2. Contraste
     --------------------------------------------------------------- */
  var themeBtn = document.getElementById('themeBtn');
  var root = document.documentElement;
  var saved = null;
  try { saved = localStorage.getItem('pyle-theme'); } catch (err) { saved = null; }
  if (saved) root.setAttribute('data-theme', saved);

  themeBtn.addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'oscuro' ? 'claro' : 'oscuro';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('pyle-theme', next); } catch (err) {}
  });

  /* ---------------------------------------------------------------
     3. Barra de avance de lectura
     --------------------------------------------------------------- */
  var bar = document.getElementById('progressBar');
  function updateBar() {
    var h = document.documentElement.scrollHeight - window.innerHeight;
    var pct = h > 0 ? (window.scrollY / h) * 100 : 0;
    bar.style.width = Math.min(100, Math.max(0, pct)) + '%';
  }
  window.addEventListener('scroll', updateBar, { passive: true });
  window.addEventListener('resize', updateBar);
  updateBar();

  /* ---------------------------------------------------------------
     4. Mazo de conceptos
     --------------------------------------------------------------- */
  var cartas = [
    {
      tag: 'Saforcada y Ximenes',
      q: 'Derecho a la educación como derecho individual',
      a: 'Supone una igualdad formal: el derecho se reconoce jurídicamente a todas las personas y se expresa como igualdad de oportunidades. El Estado debe propiciar que existan esas oportunidades, por vía propia o de la iniciativa privada, en el marco de las libertades individuales. No exige realización efectiva.'
    },
    {
      tag: 'Saforcada y Ximenes',
      q: 'Derecho a la educación como derecho social',
      a: 'Supone igualdad en el acceso a una educación de calidad a lo largo de la vida. El Estado es el ámbito de lo común y tiene la responsabilidad principal de garantizarlo mediante la educación pública. No alcanza el reconocimiento jurídico: importa su realización efectiva.'
    },
    {
      tag: 'Saforcada y Ximenes',
      q: '¿Qué es la juridificación reactiva?',
      a: 'Un uso del derecho y de los tribunales —impulsado por coaliciones liberal-conservadoras— para resignificar la noción de libertad y afirmar la primacía de la familia en materia de educación, ética y sexualidad. Construye una nueva dogmática jurídica conservadora que vacía de contenido los derechos sociales sin derogarlos.'
    },
    {
      tag: 'Saforcada y Ximenes',
      q: '¿Qué significa disputar el derecho «desde dentro»?',
      a: 'Que el ataque no consiste en desconocer el derecho a la educación, sino en redefinir su contenido desde su propio lenguaje: se reconoce el derecho del niño o la niña a la escolaridad y, al mismo tiempo, se afirma un derecho educativo natural de madres y padres a dirigir la educación de sus hijos, incluida la educación en el hogar.'
    },
    {
      tag: 'Saforcada y Ximenes',
      q: '¿Por qué Chile es un caso de interés?',
      a: 'Porque la ausencia del derecho social a la educación en la Constitución de 1980, sustituido por la noción de libertad de enseñanza, fue la base jurídica de un modelo de mercado que privatizó la educación pública y produjo procesos de segregación a lo largo de cuatro décadas.'
    },
    {
      tag: 'Saforcada y Ximenes',
      q: 'Ciclos de expansión y retracción del derecho',
      a: 'El derecho no avanza de forma lineal: se expande con el Estado de Bienestar y con las leyes de comienzos del siglo XXI (obligatoriedad, financiamiento, nuevos temas como interculturalidad, diversidad sexual y migraciones), y se retrae en las dictaduras, en los años noventa y en la actual restauración conservadora.'
    },
    {
      tag: 'Gluz y Kesler',
      q: '¿Cuál es la hipótesis del artículo?',
      a: 'Que las dinámicas de individuación de larga data generaron las condiciones de posibilidad para el avance de las nuevas derechas: al cristalizar reglas, procedimientos y modos de intervención pública, vehiculizaron representaciones estigmatizantes sobre los sectores más vulnerados y erosionaron la legitimidad de las políticas protectoras.'
    },
    {
      tag: 'Gluz y Kesler',
      q: '¿Qué entienden por individuación?',
      a: 'Un modo de intervención pública que responsabiliza a cada sujeto por sus resultados. Se expresa en instrumentos que impulsan la competencia, la autoevaluación, la educación emocional y la rendición de cuentas, y en el desplazamiento del acompañamiento a las trayectorias.'
    },
    {
      tag: 'Gluz y Kesler',
      q: '¿Por qué la CABA aparece como «semillero»?',
      a: 'Porque por la concentración de actores políticos y capacidades institucionales que reúne, anticipa intervenciones que luego se replican a escala nacional —en muchos casos por el traslado de funcionarios hacia la cartera educativa nacional—. Allí se consolidaron las derechas que después llegaron a la presidencia.'
    },
    {
      tag: 'Gluz y Kesler',
      q: 'Financiamiento selectivo y competitivo',
      a: 'Los instrumentos que eran universales se volvieron selectivos y se asignaron bajo reglas competitivas: el Plan de Mejora Institucional pasó a otorgar recursos a unas pocas instituciones según Proyectos de Aprendizaje Integrado, y Conectar Igualdad fue reemplazado por Aprender Conectados.'
    },
    {
      tag: 'Gluz y Kesler',
      q: '¿Qué son los fondos rotatorios?',
      a: 'El mecanismo de asignación de recursos por etapas y sujeto a rendición de cuentas, utilizado para financiar las acciones previstas en los planes operativos mediante convenios por metas. Quien no rinde pierde los desembolsos: en un contexto de ajuste, profundiza la fragmentación y la desigualdad entre jurisdicciones.'
    },
    {
      tag: 'Gluz y Kesler',
      q: 'Vouchers Educativos (2024)',
      a: 'Financiamiento temporario a familias con hijos en escuelas de gestión privada con subvención mayor al 75% e ingresos que no superan siete salarios mínimos. Se paga con fondos antes destinados a programas socioeducativos estatales. Su impacto es sobre todo simbólico: instala la «libre elección» y la crítica estigmatizante hacia la escuela pública.'
    }
  ];

  var idx = 0;
  var carta = document.getElementById('carta');
  var cartaFront = document.getElementById('cartaFront');
  var cartaBack = document.getElementById('cartaBack');
  var cartaTag = document.getElementById('cartaTag');
  var cartaTagB = document.getElementById('cartaTagB');
  var deckCount = document.getElementById('deckCount');

  function pintar() {
    var c = cartas[idx];
    carta.classList.remove('is-flipped');
    cartaFront.textContent = c.q;
    cartaBack.textContent = c.a;
    cartaTag.textContent = c.tag;
    cartaTagB.textContent = c.tag;
    deckCount.textContent = (idx + 1) + ' / ' + cartas.length;
  }

  if (carta) {
    carta.addEventListener('click', function () {
      carta.classList.toggle('is-flipped');
    });
    document.getElementById('nextCard').addEventListener('click', function () {
      idx = (idx + 1) % cartas.length; pintar();
    });
    document.getElementById('prevCard').addEventListener('click', function () {
      idx = (idx - 1 + cartas.length) % cartas.length; pintar();
    });
    document.getElementById('shuffleCard').addEventListener('click', function () {
      for (var i = cartas.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var t = cartas[i]; cartas[i] = cartas[j]; cartas[j] = t;
      }
      idx = 0; pintar();
    });
    document.addEventListener('keydown', function (e) {
      if (document.getElementById('s4').hidden) return;
      if (e.key === 'ArrowRight') { idx = (idx + 1) % cartas.length; pintar(); }
      if (e.key === 'ArrowLeft') { idx = (idx - 1 + cartas.length) % cartas.length; pintar(); }
      if (e.key === ' ') { e.preventDefault(); carta.classList.toggle('is-flipped'); }
    });
    pintar();
  }

  /* ---------------------------------------------------------------
     5. Cuestionario
     --------------------------------------------------------------- */
  var preguntas = [
    {
      q: 'Según Saforcada y Ximenes, la concepción del derecho a la educación como derecho individual se expresa como…',
      o: ['Igualdad en el acceso a una educación de calidad a lo largo de la vida.',
          'Igualdad de oportunidades, en el marco de las libertades individuales.',
          'Obligatoriedad estatal de garantizar la educación pública.'],
      r: 1,
      f: 'La concepción individual supone una igualdad formal: el derecho se reconoce jurídicamente a todas las personas y se expresa como igualdad de oportunidades. La responsabilidad del Estado es propiciar que existan esas oportunidades, sea por vía propia o de la iniciativa privada.'
    },
    {
      q: '¿Qué distingue al derecho social del derecho individual?',
      o: ['Que exige realización efectiva, no solo reconocimiento jurídico.',
          'Que se limita a la educación primaria y obligatoria.',
          'Que depende de la capacidad de cada familia para elegir una escuela.'],
      r: 0,
      f: 'Para el derecho social no alcanza el reconocimiento jurídico: importa su realización efectiva. El Estado, como ámbito de lo común, garantiza el derecho mediante la educación pública y con igualdad en el acceso a una educación de calidad.'
    },
    {
      q: 'La «juridificación reactiva» consiste en…',
      o: ['Ampliar derechos sociales por vía judicial.',
          'Usar el derecho para resignificar la libertad y afirmar la primacía de la familia, vaciando de contenido los derechos sociales.',
          'Derogar explícitamente la obligatoriedad escolar.'],
      r: 1,
      f: 'Los ejes comunes y transnacionales de la juridificación reactiva son la profunda resignificación de la noción de libertad y la afirmación de la primacía de la familia en materia de educación, ética y sexualidad. No se deroga el derecho: se lo disputa desde dentro.'
    },
    {
      q: 'Según Gluz y Kesler, ¿qué son las dinámicas de individuación?',
      o: ['Políticas que refuerzan el acompañamiento colectivo de las trayectorias.',
          'Modos de intervención pública que responsabilizan a cada sujeto por sus resultados.',
          'Estrategias de ampliación de la matrícula en el nivel secundario.'],
      r: 1,
      f: 'Los autores sostienen que estas lógicas relegan el rol de lo estatal en la construcción de soportes y responsabilizan a los sujetos por sus resultados, mediante instrumentos que impulsan la competencia, la autoevaluación y la rendición de cuentas.'
    },
    {
      q: '¿Por qué los autores consideran a la Ciudad de Buenos Aires un «semillero»?',
      o: ['Porque allí se sancionó la primera ley de educación común del país.',
          'Porque anticipó intervenciones de política educativa que luego se replicaron a escala nacional.',
          'Porque concentra la mayor matrícula de gestión privada del país.'],
      r: 1,
      f: 'La CABA se constituyó en un semillero de intervenciones para el resto del país: por las características y los atributos de poder de los actores que allí se encuentran, y por el traslado de funcionarios hacia la cartera educativa nacional.'
    },
    {
      q: 'Los «fondos rotatorios» son…',
      o: ['Recursos asignados por etapas y sujetos a rendición de cuentas.',
          'Aportes fijos que las familias hacen a las escuelas de gestión privada.',
          'Un fondo compensatorio entre provincias con distinta capacidad económica.'],
      r: 0,
      f: 'Se trata de la asignación de recursos por etapas y sujeta a rendición, el mecanismo elegido para financiar las acciones previstas en los planes operativos mediante convenios por metas. Quien no rinde, pierde los desembolsos.'
    },
    {
      q: 'Respecto de los Vouchers Educativos de 2024, los autores afirman que…',
      o: ['Crearon un mercado educativo completo, tal como se había prometido en campaña.',
          'No llegaron a todos los estudiantes, pero avanzan en la crítica estigmatizante y en la idea de «libre elección».',
          'Reemplazaron el financiamiento de la educación pública en su totalidad.'],
      r: 1,
      f: 'El programa se distancia de la promesa de crear un mercado educativo, pero avanza en la crítica estigmatizante hacia la escuela pública y en la instalación de la libre elección de las familias. Por eso los autores hablan de un impacto fundamentalmente simbólico.'
    },
    {
      q: '¿Qué consecuencia tuvo el reemplazo de Conectar Igualdad por Aprender Conectados, según Gluz y Kesler?',
      o: ['Se multiplicó la entrega de netbooks a cada estudiante.',
          'Se pasó de una asignación universal a un equipamiento de escuelas con aulas digitales móviles y laboratorios de robótica, estimulando la competencia.',
          'Se eliminó el uso de tecnología en la enseñanza secundaria.'],
      r: 1,
      f: 'El plan de asignación universal de netbooks y de formación docente fue reemplazado por un programa orientado al equipamiento de las escuelas con aulas digitales móviles y laboratorios de robótica, acompañado de propuestas que estimularon la competencia.'
    }
  ];

  var qi = 0, score = 0, answered = false;
  var qText = document.getElementById('qText');
  var qOpts = document.getElementById('qOpts');
  var qFb = document.getElementById('qFb');
  var qStep = document.getElementById('qStep');
  var qScore = document.getElementById('qScore');
  var btnNext = document.getElementById('quizNext');
  var btnReset = document.getElementById('quizReset');

  function pintarPregunta() {
    answered = false;
    var p = preguntas[qi];
    qText.textContent = (qi + 1) + '. ' + p.q;
    qStep.textContent = 'Pregunta ' + (qi + 1) + ' de ' + preguntas.length;
    qScore.textContent = 'Puntaje: ' + score;
    qFb.hidden = true;
    qFb.innerHTML = '';
    btnNext.disabled = true;
    btnNext.textContent = qi === preguntas.length - 1 ? 'Ver resultado →' : 'Siguiente pregunta →';
    qOpts.innerHTML = '';

    p.o.forEach(function (txt, i) {
      var b = document.createElement('button');
      b.className = 'opt';
      b.type = 'button';
      b.textContent = txt;
      b.addEventListener('click', function () { responder(i, b); });
      qOpts.appendChild(b);
    });
  }

  function responder(i, boton) {
    if (answered) return;
    answered = true;
    var p = preguntas[qi];
    var botones = Array.prototype.slice.call(qOpts.children);

    botones.forEach(function (b) { b.disabled = true; });
    botones[p.r].classList.add('is-right');

    if (i === p.r) {
      score++;
      qFb.innerHTML = '<strong>Correcto.</strong> ' + p.f;
    } else {
      boton.classList.add('is-wrong');
      qFb.innerHTML = '<strong>Casi.</strong> La respuesta correcta está marcada en verde. ' + p.f;
    }

    qFb.hidden = false;
    qScore.textContent = 'Puntaje: ' + score;
    btnNext.disabled = false;
  }

  if (btnNext) {
    btnNext.addEventListener('click', function () {
      if (qi < preguntas.length - 1) {
        qi++;
        pintarPregunta();
      } else {
        var total = preguntas.length;
        qText.textContent = 'Resultado final: ' + score + ' de ' + total;
        qStep.textContent = 'Cuestionario terminado';
        qOpts.innerHTML = '';
        qFb.hidden = false;

        var msg;
        if (score === total) {
          msg = '<strong>Muy bien.</strong> Tenés la unidad entera. Podés exponer sin mirar las tarjetas.';
        } else if (score >= total * 0.75) {
          msg = '<strong>Bien.</strong> Repasá las que fallaste y volvé a intentarlo: son las que suelen preguntarse en el coloquio.';
        } else if (score >= total * 0.5) {
          msg = '<strong>Vas bien.</strong> Conviene volver al mazo y distinguir bien derecho individual de derecho social, y financiamiento universal de selectivo.';
        } else {
          msg = '<strong>Falta repaso.</strong> Empezá por las tarjetas del mazo y después volvé al cuestionario.';
        }
        qFb.innerHTML = msg;
        btnNext.textContent = 'Volver a empezar';
        btnNext.onclick = function () {
          qi = 0; score = 0;
          btnNext.onclick = null;
          location.reload();
        };
      }
    });
  }

  if (btnReset) {
    btnReset.addEventListener('click', function () {
      qi = 0;
      score = 0;
      pintarPregunta();
    });
  }

  if (qText) pintarPregunta();

})();
