(() => {
  'use strict';
  const header = document.getElementById('header');
  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.getElementById('navegacion');
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');

  // Editable character content. These are narrative roles, not verified CVs.
  // Crops refer to the existing 1600 × 714 council illustration, not new portraits.
  // Replace portrait.src with an approved individual image and crop with null when available.
  const councilImage = 'assets/consejo-1600.webp';
  const heroes = [
    {
      id: 'cabra', name: 'La Cabra', title: 'El Hechicero Supremo', specialty: 'Guardián de la alianza', emblem: '✧',
      description: 'La mirada que reúne a la alianza. Entre mapas, código y algún conjuro, recuerda que la verdadera magia está en pensar y construir juntos.',
      skills: ['Arquitectura arcana', 'Conjuros de automatización', 'Protección de sistemas', 'Sabiduría del código'],
      footnote: 'Poderes de nuestro universo fantástico; no representan certificaciones.',
      portrait: { src: councilImage, alt: 'La Cabra blanca, con cuernos curvos, corona, túnica azul y báculo mágico.', crop: [865, 0, 450, 600], thumbnail: [925, 25, 260, 260] }
    },
    {
      id: 'gonza', name: 'Paladín Gonza', title: 'El estratega de la alianza', specialty: 'Estrategia y desarrollo', emblem: '⚑',
      description: 'Cada misión empieza por entender qué vale la pena construir. Su rol conecta los objetivos del proyecto con una dirección compartida por el equipo.',
      skills: ['Visión de la misión', 'Definición de prioridades', 'Estrategia de desarrollo'],
      portrait: { src: councilImage, alt: 'Paladín Gonza, de cabello oscuro y barba, con armadura azul y dorada.', crop: [510, 160, 360, 480], thumbnail: [560, 245, 220, 220] }
    },
    {
      id: 'juanma', name: 'Paladín Juanma', title: 'El paladín de las entregas', specialty: 'Desarrollo y delivery', emblem: '⚔',
      description: 'Del mapa al siguiente avance. Su rol acompaña el desarrollo y las entregas, manteniendo la conversación sobre qué sigue y cómo llegar juntos.',
      skills: ['Desarrollo', 'Organización de entregas', 'Seguimiento de avances'],
      portrait: { src: councilImage, alt: 'Paladín Juanma, de cabello claro y barba, reunido frente al portátil.', crop: [730, 190, 360, 480], thumbnail: [800, 260, 220, 220] }
    },
    {
      id: 'alfred', name: 'Alfred', title: 'El arquitecto de la torre', specialty: 'Arquitectura de software', emblem: '♜',
      description: 'Antes de levantar una torre, hay que pensar sus cimientos. Su especialidad pone el foco en la estructura del software y en cómo se relacionan sus partes.',
      skills: ['Diseño de sistemas', 'Visión de conjunto', 'Decisiones de arquitectura'],
      portrait: { src: councilImage, alt: 'Alfred, de cabello oscuro largo, observa el consejo con armadura medieval.', crop: [625, 85, 300, 400], thumbnail: [655, 125, 240, 240] }
    },
    {
      id: 'frida', name: 'Frida', title: 'La tejedora de magia digital', specialty: 'Magia digital y tecnología', emblem: '✧',
      description: 'Donde aparece una tarea repetitiva, hay una oportunidad de imaginar otro camino. Su rol reúne tecnología e ingenio para explorar nuevas posibilidades.',
      skills: ['Tecnología', 'Automatización', 'Exploración de soluciones'],
      portrait: { src: councilImage, alt: 'Frida, con cabello violeta y auriculares luminosos, junto al mapa mágico.', crop: [1240, 185, 360, 480], thumbnail: [1345, 245, 250, 250] }
    },
    {
      id: 'dami', name: 'Dami', title: 'El guardián de la calidad', specialty: 'Guardián de la calidad', emblem: '⛨',
      description: 'Una misión también se cuida en los detalles. Su especialidad invita a revisar, probar y hacer preguntas antes de dar una entrega por terminada.',
      skills: ['Revisión de calidad', 'Pruebas', 'Detección de riesgos'],
      portrait: { src: councilImage, alt: 'Dami, de cabeza rapada y armadura oscura, revisa el mapa de la misión.', crop: [1015, 230, 360, 480], thumbnail: [1080, 290, 250, 250] }
    },
    {
      id: 'omelis', name: 'Omelis', title: 'La aliada de los caminos', specialty: 'Colaboración y soluciones', emblem: '⌘',
      description: 'Las buenas soluciones se encuentran escuchando distintas miradas. Su rol representa el diálogo y la colaboración que conectan las necesidades con el equipo.',
      skills: ['Colaboración', 'Escucha', 'Construcción de soluciones'],
      portrait: { src: councilImage, alt: 'Omelis, de cabello oscuro ondulado, participa en el consejo de la alianza.', crop: [1120, 115, 330, 440], thumbnail: [1180, 175, 250, 250] }
    },
    {
      id: 'seba', name: 'Seba', title: 'El consultor ancestral', specialty: 'Consultoría ancestral', emblem: 'S',
      description: 'Una pausa para mirar el mapa completo. Su rol aporta la perspectiva de la consultoría: entender el contexto y conversar sobre las alternativas antes de avanzar.',
      skills: ['Lectura del contexto', 'Análisis de alternativas', 'Orientación del proyecto'], portrait: null
    }
  ];

  // Only register files that actually exist. No URL probing or eager video downloads.
  // sources: [{ src: 'assets/heroes/cabra/invocacion.webm', type: 'video/webm' }, ...]
  // poster/final: local WebP paths, or null to retain the existing illustration.
  const heroMedia = {
    cabra: { sources: [], poster: null, final: null },
    gonza: { sources: [], poster: null, final: null },
    juanma: { sources: [], poster: null, final: null },
    alfred: { sources: [], poster: null, final: null },
    frida: { sources: [], poster: null, final: null },
    dami: { sources: [], poster: null, final: null },
    omelis: { sources: [], poster: null, final: null },
    seba: { sources: [], poster: null, final: null }
  };

  const selector = document.getElementById('hero-selector');
  const roster = document.getElementById('hero-roster');
  const characterPanel = document.getElementById('character-panel');
  const characterPortrait = document.getElementById('character-portrait');
  const characterImage = document.getElementById('character-image');
  const characterPlaceholder = document.getElementById('character-placeholder');
  const selectionStatus = document.getElementById('hero-selection-status');
  let activeHero = heroes[0];
  let sectionVisible = false;
  const video = document.getElementById('character-video');
  const replayButton = document.getElementById('invocation-replay');
  const skipButton = document.getElementById('invocation-skip');
  const invocationStatus = document.getElementById('invocation-status');
  const magicToggle = document.getElementById('magic-toggle');
  let pendingInvocation = true;
  let invocationVersion = 0;
  let session = null;
  let mediaCleanup = () => {};
  let pendingStill = null;
  let stillVersion = 0;
  let fallbackTimer = 0;
  let fallbackRemaining = 0;
  let fallbackStarted = 0;
  let magicPaused = false;
  let entranceFrame = 0;
  video.muted = true;
  video.defaultMuted = true;

  const applyPortrait = (frame, image, portrait, thumbnail = false) => {
    image.src = portrait.src;
    image.alt = thumbnail ? '' : portrait.alt;
    const crop = thumbnail ? portrait.thumbnail || portrait.crop : portrait.crop;
    frame.classList.toggle('is-cropped', Boolean(crop));
    if (crop) {
      const [x, y, width, height] = crop;
      frame.style.setProperty('--portrait-width', `${1600 / width * 100}%`);
      frame.style.setProperty('--portrait-left', `${-x / width * 100}%`);
      frame.style.setProperty('--portrait-top', `${-y / height * 100}%`);
    }
  };
  const buttons = heroes.map((hero, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'hero-choice';
    button.dataset.hero = hero.id;
    button.setAttribute('aria-controls', 'character-panel');
    button.setAttribute('aria-pressed', String(index === 0));
    button.setAttribute('aria-label', `${hero.name}: ${hero.specialty}`);
    button.tabIndex = index === 0 ? 0 : -1;
    const portrait = document.createElement('span');
    portrait.className = 'roster-portrait';
    portrait.setAttribute('aria-hidden', 'true');
    if (hero.portrait) {
      const image = document.createElement('img');
      image.width = 1600;
      image.height = 714;
      image.loading = 'lazy';
      image.decoding = 'async';
      applyPortrait(portrait, image, hero.portrait, true);
      portrait.append(image);
    } else {
      portrait.classList.add('roster-placeholder');
      portrait.textContent = hero.emblem;
    }
    const name = document.createElement('span');
    name.className = 'hero-choice-name';
    name.textContent = hero.name;
    const specialty = document.createElement('span');
    specialty.className = 'hero-choice-specialty';
    specialty.textContent = hero.specialty;
    const marker = document.createElement('span');
    marker.className = 'hero-choice-marker';
    marker.setAttribute('aria-hidden', 'true');
    marker.textContent = hero.emblem;
    button.append(portrait, marker, name, specialty);
    button.addEventListener('click', () => selectHero(hero, true));
    roster.append(button);
    return button;
  });

  const canAnimate = () => sectionVisible && !document.hidden && !motionPreference.matches && !magicPaused;
  const setState = (state, message) => {
    characterPanel.dataset.invocation = state;
    if (message) invocationStatus.textContent = message;
    skipButton.disabled = !['loading', 'playing', 'paused', 'fallback'].includes(state);
    replayButton.disabled = motionPreference.matches;
  };
  const releaseVideo = () => {
    mediaCleanup();
    mediaCleanup = () => {};
    video.pause();
    video.hidden = true;
    if (video.hasAttribute('src')) {
      video.removeAttribute('src');
      video.load();
    }
    video.removeAttribute('poster');
    characterPanel.classList.remove('has-cinematic');
  };
  const cancelInvocation = () => {
    invocationVersion += 1;
    stillVersion += 1;
    if (pendingStill) { pendingStill.onload = null; pendingStill.onerror = null; pendingStill = null; }
    clearTimeout(fallbackTimer);
    fallbackTimer = 0;
    fallbackRemaining = 0;
    cancelAnimationFrame(entranceFrame);
    characterPanel.classList.remove('is-entering', 'is-summoning', 'is-resting');
    session = null;
    releaseVideo();
  };
  const showBasePortrait = () => {
    characterPortrait.hidden = !activeHero.portrait;
    characterPlaceholder.hidden = Boolean(activeHero.portrait);
    if (activeHero.portrait) applyPortrait(characterPortrait, characterImage, activeHero.portrait);
  };
  const loadStill = (src, version, onReady = () => {}) => {
    if (!src) return;
    const request = ++stillVersion;
    if (pendingStill) { pendingStill.onload = null; pendingStill.onerror = null; }
    const image = new Image();
    pendingStill = image;
    image.onload = () => {
      if (version !== invocationVersion || request !== stillVersion) return;
      pendingStill = null;
      characterPortrait.hidden = false;
      characterPlaceholder.hidden = true;
      applyPortrait(characterPortrait, characterImage, { src, alt: `${activeHero.name}, ilustración de su invocación.`, crop: null });
      onReady();
    };
    // A missing/corrupt still never replaces a usable portrait or a stable video frame.
    image.onerror = () => { if (request === stillVersion) pendingStill = null; };
    image.src = src;
  };
  const finishInvocation = (message = 'Invocación finalizada.') => {
    if (!session) return;
    const version = session.version;
    session.state = 'finished';
    clearTimeout(fallbackTimer);
    fallbackTimer = 0;
    fallbackRemaining = 0;
    cancelAnimationFrame(entranceFrame);
    characterPanel.classList.remove('is-entering', 'is-summoning');
    characterPanel.classList.add('is-resting');
    video.pause();
    if (!video.hidden) document.getElementById('character-art-caption').textContent = `${activeHero.name.toUpperCase()} / INVOCACIÓN FINALIZADA`;
    setState('finished', message);
    // Until the final still decodes, retain the poster or last decoded video frame.
    loadStill(heroMedia[activeHero.id].final, version, () => {
      releaseVideo();
      characterPanel.classList.add('has-final-still');
      document.getElementById('character-art-caption').textContent = `${activeHero.name.toUpperCase()} / POSE FINAL`;
    });
  };
  const tickFallback = () => {
    if (fallbackTimer || !fallbackRemaining || !canAnimate()) return;
    fallbackStarted = performance.now();
    fallbackTimer = window.setTimeout(() => finishInvocation(session.fallbackMessage), fallbackRemaining);
  };
  const startFallback = (version, message = 'Presentación ilustrada. Cinemática aún no disponible.') => {
    if (version !== invocationVersion || !session || session.state === 'finished') return;
    releaseVideo();
    if (characterPortrait.hidden) characterPlaceholder.hidden = false;
    session.kind = 'fallback';
    session.state = 'fallback';
    session.fallbackMessage = message;
    document.getElementById('character-art-caption').textContent = activeHero.portrait ? 'ILUSTRACIÓN DEL UNIVERSO DE LA ALIANZA' : 'SEBA / EMBLEMA PROVISIONAL';
    setState('fallback', message);
    cancelAnimationFrame(entranceFrame);
    entranceFrame = requestAnimationFrame(() => {
      entranceFrame = requestAnimationFrame(() => {
        if (version !== invocationVersion || motionPreference.matches) return;
        characterPanel.classList.add(activeHero.id === 'cabra' ? 'is-summoning' : 'is-entering');
        fallbackRemaining = activeHero.id === 'cabra' ? 1600 : 700;
        tickFallback();
      });
    });
  };
  const requestPlayback = () => {
    const current = session;
    if (!current || current.kind !== 'video' || current.state === 'finished' || current.playPending || !canAnimate()) return;
    current.playPending = true;
    video.play().then(() => {
      if (session !== current) return;
      current.playPending = false;
      if (!canAnimate() || current.state === 'finished') video.pause();
    }).catch((error) => {
      if (session !== current || current.state === 'finished') return;
      current.playPending = false;
      if (error.name === 'AbortError') return;
      if (error.name === 'NotAllowedError') {
        startFallback(current.version, 'El navegador no inició el video. Podés intentarlo con Repetir invocación.');
      } else {
        tryVideoSource(current.sourceIndex + 1, current.version);
      }
    });
  };
  const tryVideoSource = (index, version) => {
    if (version !== invocationVersion || !session || session.state === 'finished') return;
    const sources = session.sources;
    releaseVideo();
    // Invalidate the promise and event handlers belonging to the previous source.
    const current = { ...session, kind: 'video', state: 'loading', sourceIndex: index, playPending: false };
    session = current;
    if (index >= sources.length) {
      startFallback(version, 'El video no está disponible. Mostramos la presentación ilustrada.');
      return;
    }
    setState('loading', 'Preparando invocación…');
    const controller = new AbortController();
    mediaCleanup = () => controller.abort();
    const listen = (event, handler) => video.addEventListener(event, () => {
      if (session === current && current.state !== 'finished') handler();
    }, { signal: controller.signal });
    listen('playing', () => {
      video.hidden = false;
      characterPlaceholder.hidden = true;
      characterPanel.classList.add('has-cinematic');
      document.getElementById('character-art-caption').textContent = `INVOCACIÓN DE ${activeHero.name.toUpperCase()}`;
      if (!canAnimate()) { video.pause(); return; }
      current.state = 'playing';
      setState('playing', 'Invocación en curso. Podés omitirla cuando quieras.');
    });
    listen('pause', () => {
      if (!video.ended) {
        current.state = 'paused';
        setState('paused', 'Invocación en pausa.');
      }
    });
    listen('ended', () => finishInvocation());
    listen('error', () => tryVideoSource(index + 1, version));
    video.muted = true;
    video.playsInline = true;
    video.preload = 'none';
    if (heroMedia[activeHero.id].poster) video.poster = heroMedia[activeHero.id].poster;
    video.src = sources[index].src;
    video.load();
    requestPlayback();
  };
  const beginInvocation = () => {
    if (!canAnimate()) return;
    pendingInvocation = false;
    cancelInvocation();
    const version = invocationVersion;
    showBasePortrait();
    characterPanel.classList.remove('has-final-still');
    const media = heroMedia[activeHero.id];
    session = { version, kind: 'fallback', state: 'loading', sourceIndex: -1, sources: media.sources.filter((source) => source.src && video.canPlayType(source.type)) };
    loadStill(media.poster, version);
    if (session.sources.length) tryVideoSource(0, version);
    else startFallback(version);
  };
  const updateAmbient = () => {
    const running = canAnimate();
    selector.classList.toggle('effects-running', running);
    if (pendingInvocation && running) { beginInvocation(); return; }
    if (session && session.kind === 'video' && session.state !== 'finished') {
      if (running) requestPlayback();
      else video.pause();
    }
    if (session && session.kind === 'fallback' && session.state !== 'finished') {
      if (running) tickFallback();
      else if (fallbackTimer) {
        clearTimeout(fallbackTimer);
        fallbackTimer = 0;
        fallbackRemaining = Math.max(1, fallbackRemaining - (performance.now() - fallbackStarted));
      }
    }
  };
  function selectHero(hero, announce = false) {
    if (announce && activeHero.id === hero.id) return;
    cancelInvocation();
    activeHero = hero;
    pendingInvocation = !motionPreference.matches;
    characterPanel.classList.remove('has-final-still');
    characterPanel.dataset.hero = hero.id;
    buttons.forEach((button) => {
      const selected = button.dataset.hero === hero.id;
      button.setAttribute('aria-pressed', String(selected));
      button.tabIndex = selected ? 0 : -1;
    });
    document.getElementById('character-order').textContent = `${String(heroes.indexOf(hero) + 1).padStart(2, '0')} / EL CONSEJO DE LA ALIANZA`;
    document.getElementById('character-title').textContent = hero.title;
    document.getElementById('character-name').textContent = hero.name;
    document.getElementById('character-specialty').textContent = hero.specialty;
    document.getElementById('character-description').textContent = hero.description;
    const skillList = document.getElementById('character-skills');
    skillList.replaceChildren(...hero.skills.map((skill) => {
      const item = document.createElement('li');
      item.textContent = skill;
      return item;
    }));
    document.getElementById('skills-heading').textContent = hero.id === 'cabra' ? 'PODERES DEL HECHICERO' : 'APORTES A LA MISIÓN';
    document.getElementById('character-footnote').textContent = hero.footnote || 'Especialidades del personaje dentro de nuestra alianza.';
    showBasePortrait();
    loadStill(motionPreference.matches ? heroMedia[hero.id].final || heroMedia[hero.id].poster : heroMedia[hero.id].poster, invocationVersion);
    setState(motionPreference.matches ? 'static' : 'idle', motionPreference.matches ? 'Movimiento reducido: presentación estática.' : 'Presentación ilustrada.');
    document.getElementById('character-art-caption').textContent = hero.portrait ? 'ILUSTRACIÓN DEL UNIVERSO DE LA ALIANZA' : 'SEBA / EMBLEMA PROVISIONAL';
    if (announce) {
      selectionStatus.textContent = `${hero.name}. ${hero.title}. ${hero.specialty}.`;
    }
    updateAmbient();
  }
  roster.addEventListener('keydown', (event) => {
    const current = buttons.indexOf(event.target);
    if (current < 0) return;
    const horizontal = window.matchMedia('(max-width: 760px)').matches;
    let next = current;
    if (event.key === 'ArrowRight') next = (current + 1) % buttons.length;
    else if (event.key === 'ArrowLeft') next = (current - 1 + buttons.length) % buttons.length;
    else if (event.key === 'ArrowDown') next = (current + (horizontal ? 1 : 2)) % buttons.length;
    else if (event.key === 'ArrowUp') next = (current - (horizontal ? 1 : 2) + buttons.length) % buttons.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = buttons.length - 1;
    else return;
    event.preventDefault();
    buttons.forEach((button, index) => { button.tabIndex = index === next ? 0 : -1; });
    buttons[next].focus({ preventScroll: true });
    if (horizontal) {
      const target = buttons[next];
      const left = target.offsetLeft - roster.offsetLeft - (roster.clientWidth - target.offsetWidth) / 2;
      roster.scrollTo({ left, behavior: motionPreference.matches ? 'instant' : 'smooth' });
    }
  });
  // Returning to the group with Tab starts at the selected character.
  roster.addEventListener('focusout', (event) => {
    if (!roster.contains(event.relatedTarget)) {
      buttons.forEach((button) => { button.tabIndex = button.dataset.hero === activeHero.id ? 0 : -1; });
    }
  });
  replayButton.addEventListener('click', () => {
    if (motionPreference.matches) return;
    magicPaused = false;
    magicToggle.setAttribute('aria-pressed', 'false');
    magicToggle.textContent = 'Pausar animación';
    magicToggle.setAttribute('aria-label', 'Pausar animación e invocación');
    pendingInvocation = true;
    if (!sectionVisible) document.getElementById('character-art').scrollIntoView({ behavior: 'smooth', block: 'start' });
    updateAmbient();
  });
  skipButton.addEventListener('click', () => {
    if (skipButton.disabled) return;
    // Keep focus on an enabled control when skipping disables this button.
    replayButton.focus({ preventScroll: true });
    finishInvocation('Presentación omitida. Podés repetirla cuando quieras.');
  });
  selector.hidden = false;
  selectHero(heroes[0]);
  if ('IntersectionObserver' in window) {
    const visibilityObserver = new IntersectionObserver((entries) => {
      sectionVisible = entries[0].isIntersecting;
      updateAmbient();
    }, { threshold: 0.08 });
    visibilityObserver.observe(document.getElementById('character-art'));
  } else {
    // Geometric visibility fallback keeps videos from playing offscreen in older browsers.
    const checkVisibility = () => {
      const rect = document.getElementById('character-art').getBoundingClientRect();
      sectionVisible = rect.bottom > 0 && rect.top < window.innerHeight;
      updateAmbient();
    };
    window.addEventListener('scroll', checkVisibility, { passive: true });
    window.addEventListener('resize', checkVisibility, { passive: true });
    checkVisibility();
  }
  document.addEventListener('visibilitychange', updateAmbient);
  window.addEventListener('pagehide', () => {
    cancelInvocation();
    pendingInvocation = false;
    setState('idle', 'Podés iniciar la presentación con Repetir invocación.');
  });
  magicToggle.hidden = motionPreference.matches;
  magicToggle.textContent = 'Pausar animación';
  magicToggle.setAttribute('aria-label', 'Pausar animación e invocación');
  magicToggle.addEventListener('click', () => {
    magicPaused = !magicPaused;
    magicToggle.setAttribute('aria-pressed', String(magicPaused));
    magicToggle.textContent = magicPaused ? 'Reanudar animación' : 'Pausar animación';
    magicToggle.setAttribute('aria-label', magicPaused ? 'Reanudar animación e invocación' : 'Pausar animación e invocación');
    updateAmbient();
  });
  motionPreference.addEventListener('change', () => {
    magicToggle.hidden = motionPreference.matches;
    if (motionPreference.matches) {
      cancelInvocation();
      pendingInvocation = false;
      showBasePortrait();
      loadStill(heroMedia[activeHero.id].final || heroMedia[activeHero.id].poster, invocationVersion);
      setState('static', 'Movimiento reducido: presentación estática.');
    } else {
      replayButton.disabled = false;
      setState('idle', 'Podés iniciar la presentación con Repetir invocación.');
    }
    updateAmbient();
  });
  const setMenu = (open) => {
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    navigation.classList.toggle('is-open', open);
  };
  menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      menuButton.focus();
    }
  });
  document.addEventListener('click', (event) => {
    if (!header.contains(event.target)) setMenu(false);
  });
  navigation.addEventListener('focusout', (event) => {
    if (!header.contains(event.relatedTarget)) setMenu(false);
  });
  window.matchMedia('(min-width: 761px)').addEventListener('change', (event) => {
    if (event.matches) setMenu(false);
  });
  let scrollScheduled = false;
  const updateHeader = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 35);
    scrollScheduled = false;
  };
  updateHeader();
  window.addEventListener('scroll', () => {
    if (!scrollScheduled) { scrollScheduled = true; window.requestAnimationFrame(updateHeader); }
  }, { passive: true });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const target = document.getElementById(anchor.hash.slice(1));
      if (!target) return;
      event.preventDefault();
      setMenu(false);
      target.scrollIntoView({ behavior: motionPreference.matches ? 'instant' : 'smooth', block: 'start' });
      // Move keyboard focus with the in-page navigation, without a second scroll.
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
      if (window.location.hash !== anchor.hash) history.pushState(null, '', anchor.hash);
    });
  });

  const reveals = document.querySelectorAll('.reveal');
  let observer;
  const showAll = () => {
    if (observer) observer.disconnect();
    reveals.forEach((element) => element.classList.remove('is-pending'));
  };
  if ('IntersectionObserver' in window && !motionPreference.matches) {
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('is-pending');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    reveals.forEach((element) => { element.classList.add('is-pending'); observer.observe(element); });
  }
  motionPreference.addEventListener('change', (event) => { if (event.matches) showAll(); });
  document.getElementById('year').textContent = String(new Date().getFullYear());

  // No receiver is assumed. A verified address may be configured in the HTML.
  // This optional mode only opens the visitor's mail client; it never sends a request.
  const form = document.getElementById('contact-form');
  const receiver = form.dataset.contactEmail.trim();
  const receiverIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(receiver) && !/[\r\n]/.test(receiver);
  if (!receiverIsValid) return;
  form.querySelector('fieldset').disabled = false;
  const submit = form.querySelector('button[type="submit"]');
  submit.disabled = false;
  submit.firstChild.textContent = 'Preparar email ';
  document.getElementById('contact-notice').textContent = 'Este formulario abre tu aplicación de correo con un borrador. Revisalo y envialo desde allí; la web no envía mensajes.';
  form.querySelector('.privacy-note').textContent = 'Tus datos no se guardan en este sitio. El mensaje se prepara en tu aplicación de correo.';
  const fields = ['name', 'email', 'message'].map((id) => document.getElementById(id));
  const validate = (field) => {
    let error = '';
    if (!field.value.trim()) error = 'Completá este campo.';
    else if (field.type === 'email' && !field.validity.valid) error = 'Ingresá un email válido.';
    else if (field.id === 'message' && field.value.trim().length < 10) error = 'Contanos tu desafío en al menos 10 caracteres.';
    else if (field.maxLength > 0 && field.value.length > field.maxLength) error = `Usá hasta ${field.maxLength} caracteres.`;
    field.setAttribute('aria-invalid', String(Boolean(error)));
    document.getElementById(`${field.id}-error`).textContent = error;
    return !error;
  };
  fields.forEach((field) => {
    field.addEventListener('blur', () => validate(field));
    field.addEventListener('input', () => { if (field.getAttribute('aria-invalid') === 'true') validate(field); });
  });
  document.querySelectorAll('[data-service]').forEach((link) => {
    link.addEventListener('click', () => { document.getElementById('service').value = link.dataset.service; });
  });
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const invalid = fields.filter((field) => !validate(field));
    const status = document.getElementById('form-status');
    if (invalid.length) {
      status.textContent = 'Revisá los campos señalados antes de continuar.';
      invalid[0].focus();
      return;
    }
    const service = document.getElementById('service').value || 'Consulta general';
    const subject = `Nueva misión: ${service}`;
    const body = `Nombre: ${fields[0].value.trim()}\nEmail: ${fields[1].value.trim()}\n\n${fields[2].value.trim()}`;
    window.location.href = `mailto:${receiver}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    status.textContent = 'Se solicitó abrir tu aplicación de correo. El mensaje aún no fue enviado; revisalo y envialo desde allí.';
  });
})();
