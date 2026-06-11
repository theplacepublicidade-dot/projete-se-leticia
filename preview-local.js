(function () {
  const c = window.CONTENT;
  const root = document.getElementById('root');
  const CHECKOUT_URL = 'https://pay.kiwify.com.br/A7Xa8II';

  const esc = (value) =>
    String(value ?? '').replace(/[&<>'"]/g, (char) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;',
    })[char]);

  const icon = (name, size = 16) => {
    const paths = {
      'arrow-up-right': '<path d="M7 17L17 7"/><path d="M8 7h9v9"/>',
      arrow: '<path d="M5 12h14"/><path d="M13 6l6 6-6 6"/>',
      menu: '<path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/>',
      x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
      check: '<path d="M20 6 9 17l-5-5"/>',
      plus: '<path d="M12 5v14"/><path d="M5 12h14"/>',
      minus: '<path d="M5 12h14"/>',
      shield: '<path d="M12 3 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3z"/>',
      bolt: '<path d="M13 2 4 14h7l-1 8 10-13h-7l1-7z"/>',
      phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.7.6 2.5a2 2 0 0 1-.5 2.1L8 9.5a16 16 0 0 0 6.5 6.5l1.2-1.2a2 2 0 0 1 2.1-.5c.8.3 1.6.5 2.5.6A2 2 0 0 1 22 16.9z"/>',
      mic: '<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><path d="M12 19v3"/>',
      sparkle: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z"/>',
      diamond: '<path d="M6 3h12l4 6-10 12L2 9l4-6z"/>',
      play: '<path d="M8 5v14l11-7-11-7z"/>',
      monitor: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8"/><path d="M12 16v4"/>',
      clipboard: '<path d="M9 4h6"/><path d="M9 2h6v4H9z"/><path d="M7 4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2"/>',
    };
    return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.arrow}</svg>`;
  };

  const btn = (text, href = CHECKOUT_URL) =>
    `<a class="vc-btn vc-btn--lg" href="${href}"><span class="disc">${icon('arrow-up-right', 14)}</span><span>${esc(text)}</span></a>`;

  const badge = (text, name = 'sparkle') =>
    `<div class="vc-badge"><span class="dot"></span>${icon(name, 14)}<span>${esc(text)}</span></div>`;

  const shead = (tag, title, lead = '') =>
    `<div class="vc-shead"><span class="vc-mono">${esc(tag)}</span><h2>${title}</h2>${lead ? `<p class="lead">${esc(lead)}</p>` : ''}</div>`;

  const underlineTitle = (title) => `
    <div class="vc-underline-title vc-motion-title">
      <h2>${title}</h2>
      <svg viewBox="0 0 300 20" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="M 0,10 Q 75,0 150,10 Q 225,20 300,10"></path></svg>
    </div>`;

  const sheadUnderline = (tag, title, lead = '') =>
    `<div class="vc-shead"><span class="vc-mono">${esc(tag)}</span>${underlineTitle(title)}${lead ? `<p class="lead">${esc(lead)}</p>` : ''}</div>`;

  const motionWords = (text, start = 0) =>
    text.split(/(\s+)/).map((segment, index) =>
      segment.trim()
        ? `<span class="vc-motion-word" style="--i:${start + index}">${esc(segment)}</span>`
        : segment
    ).join('');

  const whisperWords = (text, start = 0) => {
    let index = start;
    return text.split(/(\s+)/).map((segment) =>
      segment.trim()
        ? `<span class="vc-whisper-word" style="--i:${index++}">${esc(segment)}</span>`
        : segment
    ).join('');
  };

  const trust = c.hero.pills
    .map((pill) => `<span class="vc-trust-pill">${icon(pill.icon, 14)}${esc(pill.label)}</span>`)
    .join('');

  const testimonialDurations = [28, 34, 31];
  const testimonialCard = (testimonial, isClone = false) => `
    <article class="vc-testimonial-card${isClone ? ' is-clone' : ''}"${isClone ? ' aria-hidden="true"' : ' tabindex="0"'}>
      <p>“${esc(testimonial.text)}”</p>
      <footer>
        <img src="${esc(testimonial.image)}" alt="Foto ilustrativa do perfil de ${esc(testimonial.name)}" loading="lazy">
        <div><strong>${esc(testimonial.name)}</strong><span>${esc(testimonial.role)}</span></div>
      </footer>
    </article>`;

  const testimonialColumns = (count) =>
    Array.from({ length: count }, (_, column) =>
      c.testimonials.filter((_, index) => index % count === column)
    );

  const testimonialLayout = (variant, count) => `
    <div class="vc-testimonial-layout vc-testimonial-layout--${variant}">
      ${testimonialColumns(count).map((items, index) => `
        <div class="vc-testimonial-column" style="--duration:${testimonialDurations[index]}s">
          <div class="vc-testimonial-track">
            ${items.map((testimonial) => testimonialCard(testimonial)).join('')}
            ${items.map((testimonial) => testimonialCard(testimonial, true)).join('')}
          </div>
        </div>`).join('')}
    </div>`;

  const testimonials = [
    testimonialLayout('desktop', 3),
    testimonialLayout('tablet', 2),
    testimonialLayout('mobile', 1),
  ].join('');

  const bonusCards = (c.bonus.items || [c.bonus]).map((bonus) => `
    <div class="vc-bonus-card reveal${bonus.guide ? ' vc-bonus-card--guide' : ''}">
      <div class="vc-bonus-photo${bonus.guide ? ' vc-bonus-visual' : ''}">
        ${bonus.guide ? '<div class="guideMark">Guia<br>de Processos</div>' : '<img src="workspace-leticia.jpg" alt="Escritório de Letícia Schneider" loading="lazy">'}
        <div class="badge"><span class="dot"></span>${esc(bonus.badge || bonus.label)}</div>
        <div class="priceTag"><div class="lbl">Valor real</div><span class="strike">${esc(bonus.value)}</span><span class="free">Incluso na sua compra</span></div>
      </div>
      <div class="vc-bonus-content">
        <div class="vc-bonus-tag">${esc(bonus.label)}</div>
        <h3>${esc(bonus.name)}</h3>
        <p>${esc(bonus.body)}</p>
        ${bonus.body2 ? `<p>${esc(bonus.body2)}</p>` : ''}
        ${bonus.bullets ? `<ul class="vc-bonus-bullets">${bonus.bullets.map((item) => `<li>${esc(item)}</li>`).join('')}</ul>` : ''}
        <p class="vc-bonus-note">${esc(bonus.note)}</p>
      </div>
    </div>`
  ).join('');

  root.innerHTML = `
    <div class="vc-root" data-palette="areia" data-icons="line" style="--font-brand:'Boston Angel';--font-display:'Boston Angel';--font-editorial:'Boston Angel';--font-ui:'Poppins';--font-body:'Poppins';--font-mono:'Poppins';">
      <div class="vc-page">
        <div class="vc-scroll-progress"><i></i></div>
        <section class="vc-panel vc-panel--tall vc-hero">
          <div class="vc-hero-bg" aria-hidden="true"><video autoplay muted loop playsinline webkit-playsinline preload="auto" poster="leticia-videoaula-cropped.png"><source src="video-hero.mp4" type="video/mp4"></video></div>
          <div class="vc-glow"></div>
          <nav class="vc-nav">
            <div class="vc-nav-brand">Projete-se<sup>2026</sup></div>
            <ul class="vc-nav-menu" id="vc-mobile-menu">
              <li><a href="#promessa">Promessa</a></li>
              <li><a href="#metodo">Método</a></li>
              <li><a href="#ia">IA</a></li>
              <li><a href="#bonus">Bônus</a></li>
              <li><a href="#oferta">Comprar</a></li>
            </ul>
            <div class="vc-nav-actions">
              <a class="vc-btn vc-btn--nav" href="${CHECKOUT_URL}"><span class="disc">${icon('arrow-up-right', 14)}</span><span>Quero clareza</span></a>
              <button class="vc-menu-toggle" type="button" aria-label="Abrir menu" aria-expanded="false" aria-controls="vc-mobile-menu">${icon('menu', 20)}</button>
            </div>
          </nav>
          <div class="vc-hero-inner" style="font-weight:200">
            ${badge('Para arquitetas em reorganização profissional', 'sparkle')}
            <h1 class="vc-hero-headline--long">
              <span class="word">ARQUITETA:</span> <span class="word">Cansada</span> <span class="word">de</span> <span class="word">se</span> <span class="word">sentir</span> <span class="word">perdida?</span>
              <span class="vc-hero-headline-support"><span class="word">Destrave</span> <span class="word">sua</span> <span class="word">carreira</span> <span class="word">em</span> <span class="word">7</span> <span class="word">dias</span></span>
              <span class="vc-hero-headline-price"><span class="word">com</span> <span class="word">o</span> <span class="word">Método</span> <span class="word">Projete-se</span> <span class="word">+</span> <span class="word">IA.</span></span>
            </h1>
            <p class="vc-hero-sub reveal">${esc(c.hero.body)}</p>
            <div class="vc-hero-cta reveal">${btn(c.hero.cta)}</div>
            <div class="vc-trust reveal">${trust}</div>
            <div class="vc-hero-sub-cta">12x de R$10,03 · ou R$97 à vista · acesso imediato</div>
            <div class="marquee"><div class="marquee-track">
              <span>Método Projete-se + IA<span class="sep"></span></span><span>R$97 à vista<span class="sep"></span></span><span>12x de R$10,03<span class="sep"></span></span><span>Bônus Mentoria em Vídeo<span class="sep"></span></span><span>Guia de Processos<span class="sep"></span></span><span>Garantia de 14 dias<span class="sep"></span></span>
              <span>Método Projete-se + IA<span class="sep"></span></span><span>R$97 à vista<span class="sep"></span></span><span>12x de R$10,03<span class="sep"></span></span><span>Bônus Mentoria em Vídeo<span class="sep"></span></span><span>Guia de Processos<span class="sep"></span></span><span>Garantia de 14 dias<span class="sep"></span></span>
            </div></div>
          </div>
          <div class="vc-stat-card"><div><div class="num">2 bônus</div><div class="lbl">Mentoria em Vídeo · Guia de Processos</div></div><div class="pill"><span class="disc">${icon('arrow-up-right', 12)}</span><span>Incluso</span></div></div>
          <div class="vc-cut"><div class="ic">${icon('arrow-up-right', 22)}</div><div><div class="lbl">Como funciona</div><div class="sub">Material guiado${icon('arrow', 12)}</div></div></div>
        </section>

        <section class="vc-panel vc-pains vc-simple-section" id="promessa"><div class="vc-container">
          <div class="vc-shead"><span class="vc-mono">${esc(c.pains.tag)}</span><h2 class="vc-motion-title vc-title-whisper">${whisperWords('Você não precisa de mais informação, ')}<span class="it">${whisperWords('precisa de clareza e um plano de ação.', 6)}</span></h2></div>
          <div class="vc-simple-copy reveal">
            <p>${esc(c.pains.lead)}</p>
            ${c.pains.items.map((it) => `<p>${esc(it.text)}</p>`).join('')}
          </div>
          <blockquote class="vc-pull reveal">${esc(c.pains.pull)}</blockquote>
        </div></section>

        <section class="vc-panel vc-panel--dark vc-proc" id="metodo"><div class="vc-container">
          <div class="vc-shead"><span class="vc-mono">${esc(c.process.tag)}</span><div class="vc-hand-title vc-motion-title"><svg viewBox="0 0 1200 300" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="M 108 178 C 76 98, 224 36, 570 42 C 914 45, 1112 96, 1082 176 C 1050 262, 774 274, 493 264 C 236 254, 98 230, 108 178"></path></svg><h2>Seu Guia Pessoal para a Clareza: <span class="it">O Método Projete-se + IA</span></h2></div><p class="lead">${esc(c.process.lead)}</p></div>
          ${c.process.items.map((it) => `<div class="vc-proc-step reveal"><div class="vc-proc-n">${esc(it.n)}</div><div><h3>${esc(it.title)}</h3><p>${esc(it.body)}</p></div></div>`).join('')}
        </div></section>

        <section class="vc-panel vc-ai" id="ia"><div class="vc-container">
          <div class="vc-ai-grid">
            <div class="vc-ai-copy reveal">
              ${badge(c.ai.tag, 'sparkle')}
              <h3>Sua Mentora IA para transformar percepções em <span class="it">ações.</span></h3>
              <p>${esc(c.ai.lead)}</p>
              <p>${esc(c.ai.body)}</p>
              <ul class="vc-ai-list">${c.ai.bullets.map((item) => `<li>${icon('check', 15)}${esc(item)}</li>`).join('')}</ul>
            </div>
            <div class="vc-ai-demo reveal">
              <div class="vc-ai-window">
                <div class="vc-ai-window-bar"><span></span><span></span><span></span></div>
                <div class="vc-ai-screen"><img src="mentora-projete-se-ia.png" alt="Interface da Mentora Projete-se com opções personalizadas para cada perfil profissional" loading="eager" decoding="async"><i class="vc-ai-shine" aria-hidden="true"></i></div>
                <span class="vc-ai-status"><i></i>${esc(c.ai.status)}</span>
              </div>
              <div class="vc-ai-profiles" aria-label="Perfis personalizados">${c.profiles.items.map((profile) => `<span>${esc(profile.name)}</span>`).join('')}</div>
            </div>
          </div>
        </div></section>

        <section class="vc-panel vc-trans"><div class="vc-container">
          ${sheadUnderline(c.transformation.tag, 'Antes e depois do <span class="it">Projete-se.</span>')}
          <div class="vc-trans-grid">
            <div class="vc-trans-col reveal"><div class="vc-trans-label">${icon('x', 12)}${esc(c.transformation.before.label)}</div><ul class="vc-trans-list">${c.transformation.before.items.map((t) => `<li>${icon('x', 14)}${esc(t)}</li>`).join('')}</ul></div>
            <div class="vc-trans-col vc-trans-col--after reveal"><div class="vc-trans-label">${icon('check', 12)}${esc(c.transformation.after.label)}</div><ul class="vc-trans-list">${c.transformation.after.items.map((t) => `<li>${icon('check', 14)}${esc(t)}</li>`).join('')}</ul></div>
          </div>
        </div></section>

        <section class="vc-panel vc-testimonial-v2"><div class="vc-container">
          <div class="vc-testimonial-head">
            <span class="vc-testimonial-badge">DEPOIMENTOS</span>
            <h2 class="vc-motion-title vc-title-whisper">${whisperWords('Quem já encontrou a clareza ')}<span class="it">${whisperWords('com o Projete-se:', 5)}</span></h2>
          </div>
          <div class="vc-testimonial-stage">${testimonials}</div>
        </div></section>

        <section class="vc-panel vc-bonus" id="bonus"><div class="vc-container">
          ${sheadUnderline(c.bonus.tag, 'Bônus <span class="it">exclusivos.</span>')}
          <div class="vc-bonus-list">${bonusCards}</div>
        </div></section>

        <section class="vc-panel vc-panel--dark vc-mentor" id="leticia"><div class="vc-container">
          <div class="vc-shead"><span class="vc-mono">${esc(c.mentor.tag)}</span><h2 class="vc-motion-title vc-title-whisper">${whisperWords('A pessoa por trás ')}<span class="it">${whisperWords('do método.', 4)}</span></h2></div>
          <div class="vc-mentor-grid">
            <div class="vc-mentor-intro reveal"><div class="vc-mentor-photo"><img src="leticia-perfil.jpg" alt="Letícia Schneider" loading="lazy"></div><span class="vc-mentor-role">${esc(c.mentor.role)}</span><h2>Letícia <span class="it">Schneider</span></h2><p class="vc-mentor-lead">"${esc(c.mentor.lead)}"</p></div>
            <div class="vc-mentor-story reveal"><div class="vc-mentor-body">${c.mentor.body.map((p) => `<p>${esc(p)}</p>`).join('')}</div><div class="vc-mentor-quote"><q>"${esc(c.mentor.quote)}"</q><span class="by">— ${esc(c.mentor.quoteBy)}</span></div></div>
          </div>
        </div></section>

        <section class="vc-panel vc-close"><div class="vc-container">
          <h2 class="reveal">Chega de se sentir perdida.<br><span class="it">Sua carreira merece clareza.</span></h2>
          <div class="vc-final-copy reveal">
            <p>${esc(c.close.pathA)}</p>
            <p>${esc(c.close.pathB)}</p>
          </div>
          <ul class="vc-bundle vc-bundle--simple reveal">${c.close.bundle.map((b) => `<li>${icon('check', 14)}${esc(b)}</li>`).join('')}</ul>
          <div class="vc-price-today vc-price-today--compact reveal" id="oferta">
            <span class="vc-price-today-lbl">Invista na sua clareza hoje por apenas:</span>
            <div class="vc-price-from">de <span class="strike">12x de R$59,90</span> por apenas</div>
            <div class="vc-price-installment"><span class="pref">12x de</span><span class="num" id="price-counter"><span class="small">R$</span>59,90</span></div>
            <div class="vc-price-cash">ou <b>R$97</b> à vista</div>
            ${btn(c.close.cta)}
            <small>${esc(c.close.sub)}</small>
          </div>
        </div></section>

        <footer class="vc-footer">${esc(c.footer)}</footer>
        <div class="vc-sticky-cta"><span class="liveDot"></span><span>12x de <b style="color:var(--accent)">R$10,03</b> · ou R$97 à vista</span><a class="vc-btn" href="${CHECKOUT_URL}"><span class="disc">${icon('arrow-up-right', 12)}</span><span>Quero agora</span></a></div>
      </div>
    </div>`;

  let currentProfile = 0;
  let profileTimer = null;
  let profileRotationStopped = false;

  function renderProfile(index) {
    const panel = document.getElementById('profile-panel');
    if (!panel) return;
    currentProfile = index;
    const profile = c.profiles.items[index];
    document.querySelectorAll('.vc-prof-tab').forEach((button, i) => {
      button.setAttribute('aria-selected', i === index ? 'true' : 'false');
    });
    panel.innerHTML = `
      <div class="vc-prof-big">${esc(profile.letter)}</div>
      <div>
        <span class="vc-prof-name">Perfil ${esc(profile.letter)} · ${esc(profile.name)}</span>
        <div class="vc-prof-quote">"${esc(profile.quote)}"</div>
        <p class="vc-prof-body">${esc(profile.body)}</p>
      </div>`;
  }

  function stopProfileRotation() {
    profileRotationStopped = true;
    if (profileTimer) clearInterval(profileTimer);
    profileTimer = null;
  }

  function pauseProfileRotation() {
    if (profileTimer) clearInterval(profileTimer);
    profileTimer = null;
  }

  function startProfileRotation() {
    if (profileRotationStopped || profileTimer || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    profileTimer = setInterval(() => {
      renderProfile((currentProfile + 1) % c.profiles.items.length);
    }, 2200);
  }

  function startCounter() {
    const counter = document.getElementById('price-counter');
    if (!counter || counter.dataset.started) return;
    counter.dataset.started = 'true';
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      counter.innerHTML = '<span class="small">R$</span>10,03';
      return;
    }
    const start = 59.90;
    const end = 10.03;
    const duration = 2400;
    const began = performance.now();
    const easeOutQuint = (t) => 1 - Math.pow(1 - t, 5);
    const tick = (now) => {
      const progress = Math.min(1, (now - began) / duration);
      const value = start + (end - start) * easeOutQuint(progress);
      counter.innerHTML = `<span class="small">R$</span>${value.toFixed(2).replace('.', ',')}`;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  if (document.getElementById('profile-panel')) renderProfile(0);

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const id = link.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', `#${id}`);
      const nav = document.querySelector('.vc-nav');
      const toggle = document.querySelector('.vc-menu-toggle');
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Abrir menu');
      toggle.innerHTML = icon('menu', 20);
    });
  });

  document.querySelector('.vc-menu-toggle').addEventListener('click', () => {
    const nav = document.querySelector('.vc-nav');
    const toggle = document.querySelector('.vc-menu-toggle');
    const isOpen = !nav.classList.contains('is-open');
    nav.classList.toggle('is-open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
    toggle.innerHTML = icon(isOpen ? 'x' : 'menu', 20);
  });

  document.querySelectorAll('.vc-prof-tab').forEach((button) => {
    button.addEventListener('click', () => {
      stopProfileRotation();
      renderProfile(Number(button.dataset.profile));
    });
  });

  document.querySelectorAll('.vc-faq-q').forEach((button) => {
    button.addEventListener('click', () => {
      const item = button.closest('.vc-faq-item');
      const shouldOpen = !item.classList.contains('open');
      document.querySelectorAll('.vc-faq-item').forEach((other) => {
        other.classList.remove('open');
        other.querySelector('.vc-faq-q').setAttribute('aria-expanded', 'false');
        other.querySelector('.vc-faq-toggle').innerHTML = icon('plus', 16);
      });
      if (shouldOpen) {
        item.classList.add('open');
        button.setAttribute('aria-expanded', 'true');
        item.querySelector('.vc-faq-toggle').innerHTML = icon('minus', 16);
      }
    });
  });

  const heroVideo = document.querySelector('.vc-hero-bg video');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const tryPlayHeroVideo = () => {
    if (!heroVideo || reducedMotion.matches) return;
    heroVideo.muted = true;
    heroVideo.defaultMuted = true;
    heroVideo.setAttribute('muted', '');
    heroVideo.setAttribute('playsinline', '');
    heroVideo.setAttribute('webkit-playsinline', '');
    const attempt = heroVideo.play();
    if (attempt && typeof attempt.catch === 'function') attempt.catch(() => {});
  };
  if (heroVideo) {
    ['loadedmetadata', 'loadeddata', 'canplay'].forEach((eventName) => {
      heroVideo.addEventListener(eventName, tryPlayHeroVideo, { passive: true });
    });
    window.addEventListener('pageshow', tryPlayHeroVideo, { passive: true });
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) tryPlayHeroVideo();
    });
    document.addEventListener('touchstart', tryPlayHeroVideo, { passive: true, once: true });
    document.addEventListener('pointerdown', tryPlayHeroVideo, { passive: true, once: true });
    tryPlayHeroVideo();
  }

  const pageRoot = document.querySelector('.vc-root');
  const progressBar = document.querySelector('.vc-scroll-progress i');
  const sticky = document.querySelector('.vc-sticky-cta');
  let scrollFrame = 0;
  let scrollIdleTimer = 0;
  const updateScrollUi = () => {
    scrollFrame = 0;
    const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    const percent = Math.min(1, Math.max(0, scrollY / max));
    progressBar.style.setProperty('--p', `${percent * 100}%`);
    sticky.classList.toggle('in', scrollY > 600 && percent < 0.95);
  };
  window.addEventListener('scroll', () => {
    pageRoot.classList.add('vc-is-scrolling');
    clearTimeout(scrollIdleTimer);
    scrollIdleTimer = setTimeout(() => pageRoot.classList.remove('vc-is-scrolling'), 160);
    if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScrollUi);
  }, { passive: true });
  updateScrollUi();

  const counter = document.getElementById('price-counter');
  if ('IntersectionObserver' in window) {
    const motionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-active');
          motionObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.45, rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('.vc-motion-title').forEach((title) => motionObserver.observe(title));

    const profilesSection = document.getElementById('perfis');
    if (profilesSection) {
      const profilesObserver = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) startProfileRotation();
        else pauseProfileRotation();
      }, { threshold: 0.3 });
      profilesObserver.observe(profilesSection);
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        startCounter();
        observer.disconnect();
      }
    }, { threshold: 0.35, rootMargin: '0px 0px -10% 0px' });
    observer.observe(counter);
  } else {
    document.querySelectorAll('.vc-motion-title').forEach((title) => title.classList.add('is-active'));
    if (document.getElementById('profile-panel')) startProfileRotation();
    startCounter();
  }
})();
