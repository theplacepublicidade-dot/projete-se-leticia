(function () {
  const c = window.CONTENT;
  const root = document.getElementById('root');

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

  const btn = (text, href = '#oferta') =>
    `<a class="vc-btn vc-btn--lg" href="${href}"><span class="disc">${icon('arrow-up-right', 14)}</span><span>${esc(text)}</span></a>`;

  const badge = (text, name = 'sparkle') =>
    `<div class="vc-badge"><span class="dot"></span>${icon(name, 14)}<span>${esc(text)}</span></div>`;

  const shead = (tag, title, lead = '') =>
    `<div class="vc-shead"><span class="vc-mono">${esc(tag)}</span><h2>${title}</h2>${lead ? `<p class="lead">${esc(lead)}</p>` : ''}</div>`;

  const trust = c.hero.pills
    .map((pill) => `<span class="vc-trust-pill">${icon(pill.icon, 14)}${esc(pill.label)}</span>`)
    .join('');

  const testimonials = [0, 1].flatMap(() => ['01', '02', '03', '04', '05']).map((id, i) =>
    `<div class="vc-test-card"><img src="depoimento-fundadora-${id}.png" alt="Depoimento ${(i % 5) + 1}" loading="lazy"></div>`
  ).join('');

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
          <div class="vc-hero-bg" aria-hidden="true"><video autoplay muted loop playsinline preload="metadata"><source src="video-hero.mp4" type="video/mp4"></video></div>
          <div class="vc-glow"></div>
          <nav class="vc-nav">
            <div class="vc-nav-brand">Projete-se<sup>2026</sup></div>
            <ul class="vc-nav-menu" id="vc-mobile-menu">
              <li><a href="#sobre">Sobre</a></li>
              <li><a href="#perfis">Perfis</a></li>
              <li><a href="#processo">Processo</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
            <div class="vc-nav-actions">
              <a class="vc-btn vc-btn--nav" href="#oferta"><span class="disc">${icon('arrow-up-right', 14)}</span><span>Quero acesso</span></a>
              <button class="vc-menu-toggle" type="button" aria-label="Abrir menu" aria-expanded="false" aria-controls="vc-mobile-menu">${icon('menu', 20)}</button>
            </div>
          </nav>
          <div class="vc-hero-inner" style="font-weight:200">
            ${badge('Para arquitetas em reorganização profissional', 'sparkle')}
            <h1><span class="word">Você</span> <span class="word">não</span> <span class="word">está</span> <span class="word">perdida.</span><br><span class="it"><span class="word">Só</span> <span class="word">está</span> <span class="word">sem</span> <span class="word">direção.</span></span></h1>
            <p class="vc-hero-sub reveal">${esc(c.hero.body)}</p>
            <div class="vc-hero-cta reveal">${btn(c.hero.cta)}</div>
            <div class="vc-trust reveal">${trust}</div>
            <div class="vc-hero-sub-cta">12x de R$11,54 · ou R$97 à vista · acesso imediato</div>
            <div class="marquee"><div class="marquee-track">
              <span>Bônus - Turma Fundadora<span class="sep"></span></span><span>4 perfis personalizados<span class="sep"></span></span><span>Guia de Processos<span class="sep"></span></span><span>Mentoria em vídeo 40min<span class="sep"></span></span><span>Garantia incondicional de 14 dias<span class="sep"></span></span><span>Acesso permanente<span class="sep"></span></span>
              <span>Bônus - Turma Fundadora<span class="sep"></span></span><span>4 perfis personalizados<span class="sep"></span></span><span>Guia de Processos<span class="sep"></span></span><span>Mentoria em vídeo 40min<span class="sep"></span></span><span>Garantia incondicional de 14 dias<span class="sep"></span></span><span>Acesso permanente<span class="sep"></span></span>
            </div></div>
          </div>
          <div class="vc-stat-card"><div><div class="num">2 bônus</div><div class="lbl">Turma Fundadora · Guia de Processos</div></div><div class="pill"><span class="disc">${icon('arrow-up-right', 12)}</span><span>Incluso</span></div></div>
          <div class="vc-cut"><div class="ic">${icon('arrow-up-right', 22)}</div><div><div class="lbl">Como funciona</div><div class="sub">Material guiado${icon('arrow', 12)}</div></div></div>
        </section>

        <section class="vc-panel vc-pains"><div class="vc-container">
          ${shead(c.pains.tag, 'Talvez o problema não seja <span class="it">falta de esforço.</span>', c.pains.lead)}
          ${c.pains.items.map((it) => `<div class="vc-pain reveal"><div class="n">${esc(it.n)}</div><p>${esc(it.text)}</p></div>`).join('')}
          <blockquote class="vc-pull reveal">E isso não é falta de capacidade.<br><span class="it">É falta de leitura do momento.</span></blockquote>
        </div></section>

        <section class="vc-panel vc-panel--dark vc-fs"><div class="vc-container">
          ${shead(c.falseSolutions.tag, 'Você já tentou. Mas as soluções <span class="it">erradas</span> não resolvem o problema certo.', c.falseSolutions.lead)}
          <div class="vc-fs-grid">${c.falseSolutions.items.map((it) => `<div class="vc-fs-card reveal"><div class="ic">${icon(it.icon, 20)}</div><h3>${esc(it.title)}</h3><p>${esc(it.body)}</p></div>`).join('')}</div>
          <div class="vc-fs-callout reveal"><span class="vc-mono">— O que ninguém diz</span><h3>Todos esses produtos assumem que você já sabe quem é como profissional.</h3><p>Nenhum deles foi criado para a fase anterior — a fase em que você ainda está tentando entender seu momento, identificar suas dores reais e definir sua direção antes de agir.</p><p class="last">Esse espaço estava vazio. Até agora.</p></div>
        </div></section>

        <section class="vc-panel vc-product" id="sobre"><div class="vc-container"><div class="vc-product-center">
          ${badge(c.product.tag, 'diamond')}
          <div class="vc-product-title-wrap reveal"><h2 class="vc-product-name">Projete<span class="it">-se</span></h2><p class="vc-product-sub">${esc(c.product.subtitle)}</p></div>
          <div class="vc-nots reveal">${c.product.nots.map((n) => `<span class="vc-not">${icon('x', 12)}${esc(n)}</span>`).join('')}</div>
          <p class="vc-product-body reveal">${esc(c.product.body)}</p>
          <div class="vc-product-cta reveal">${btn(c.product.cta)}</div>
        </div>
        </div></section>

        <section class="vc-panel vc-prof" id="perfis"><div class="vc-container">
          ${shead(c.profiles.tag, 'Nem toda arquiteta vive a profissão <span class="it">do mesmo jeito.</span>', c.profiles.lead)}
          <div class="vc-prof-tabs" role="tablist">${c.profiles.items.map((p, i) => `<button role="tab" aria-selected="${i === 0}" class="vc-prof-tab" data-profile="${i}"><span class="vc-prof-tab-meta">Perfil ${esc(p.letter)}</span><div class="vc-prof-tab-letter">${esc(p.letter)}</div><div class="vc-prof-tab-name">${esc(p.name)}</div></button>`).join('')}</div>
          <div class="vc-prof-panel" id="profile-panel"></div>
          <p class="vc-prof-quote-mid reveal">"${esc(c.profiles.quote)}"</p>
        </div></section>

        <section class="vc-panel vc-panel--dark vc-proc" id="processo"><div class="vc-container">
          ${shead(c.process.tag, 'Um processo em etapas. <span class="it">Cada uma com propósito.</span>', c.process.lead)}
          ${c.process.items.map((it) => `<div class="vc-proc-step reveal"><div class="vc-proc-n">${esc(it.n)}</div><div><h3>${esc(it.title)}</h3><p>${esc(it.body)}</p></div></div>`).join('')}
          <div class="vc-video-preview reveal"><img src="leticia-videoaula-cropped.png" alt="Letícia gravando vídeo guia do Projete-se" loading="lazy"><div class="cap"><div class="cap-l"><span class="vc-mono">Vídeos guia · em cada etapa</span><h3>A mentora aparece em vídeo te orientando do começo ao fim.</h3></div><span class="cap-r">Incluído</span></div></div>
        </div></section>

        <section class="vc-panel vc-trans"><div class="vc-container">
          ${shead(c.transformation.tag, 'O que muda <span class="it">depois</span> do Projete-se')}
          <div class="vc-trans-grid">
            <div class="vc-trans-col reveal"><div class="vc-trans-label">${icon('x', 12)}${esc(c.transformation.before.label)}</div><ul class="vc-trans-list">${c.transformation.before.items.map((t) => `<li>${icon('x', 14)}${esc(t)}</li>`).join('')}</ul></div>
            <div class="vc-trans-col vc-trans-col--after reveal"><div class="vc-trans-label">${icon('check', 12)}${esc(c.transformation.after.label)}</div><ul class="vc-trans-list">${c.transformation.after.items.map((t) => `<li>${icon('check', 14)}${esc(t)}</li>`).join('')}</ul></div>
          </div>
        </div></section>

        <section class="vc-panel vc-panel--dark vc-mentor"><div class="vc-container">
          ${shead(c.mentor.tag, 'A pessoa por trás <span class="it">do método.</span>')}
          <div class="vc-mentor-grid">
            <div class="reveal"><div class="vc-mentor-photo"><img src="leticia-perfil.jpg" alt="Letícia Schneider" loading="lazy"></div></div>
            <div class="reveal"><span class="vc-mentor-role">${esc(c.mentor.role)}</span><h2>Letícia <span class="it">Schneider</span></h2><p class="vc-mentor-lead">"${esc(c.mentor.lead)}"</p><div class="vc-mentor-body">${c.mentor.body.map((p) => `<p>${esc(p)}</p>`).join('')}</div><div class="vc-mentor-specs"><div class="vc-mentor-spec">Local<b>Vale do Araguaia</b></div><div class="vc-mentor-spec">Atuação<b>Escritório próprio</b></div><div class="vc-mentor-spec">Método<b>Replicável</b></div></div><div class="vc-mentor-quote"><q>"${esc(c.mentor.quote)}"</q><span class="by">— ${esc(c.mentor.quoteBy)}</span></div></div>
          </div>
        </div></section>

        <section class="vc-panel vc-test"><div class="vc-container">
          ${shead('Resultados reais', 'O que arquitetas estão <span class="it">dizendo.</span>', 'Mensagens recebidas no direct depois que perceberam o que muda quando o ponto de partida é o certo.')}
          <div class="vc-test-wrap"><div class="vc-test-scroll"><div class="vc-test-track">${testimonials}</div></div></div>
          <div class="vc-test-stats"><div class="vc-test-stat reveal"><div class="v">2 bônus</div><div class="lbl">Turma Fundadora · Guia de Processos</div></div><div class="vc-test-stat reveal"><div class="v">14d</div><div class="lbl">Garantia incondicional · sem perguntas</div></div><div class="vc-test-stat reveal"><div class="v">4 perfis</div><div class="lbl">Rota personalizada para o seu momento</div></div></div>
        </div></section>

        <section class="vc-panel vc-bonus"><div class="vc-container">
          ${shead(c.bonus.tag, 'Além do material, você ainda <span class="it">ganha estes bônus:</span>')}
          <div class="vc-bonus-list">${bonusCards}</div>
        </div></section>

        <section class="vc-panel vc-panel--dark vc-pricing" id="oferta"><div class="vc-container">
          ${shead(c.pricing.tag, 'Tudo o que você está <span class="it">levando.</span>')}
          <div class="vc-price-table reveal">${c.pricing.items.map((it, i) => `<div class="vc-price-row${it.bonus ? ' vc-price-row--bonus' : ''}"><span class="vc-price-num">${String(i + 1).padStart(2, '0')}</span><div class="vc-price-name">${esc(it.name)}</div><div class="vc-price-value-wrap"><div class="vc-price-value${it.bonus ? ' strike' : ''}">${esc(it.value)}</div>${it.bonus ? '<span class="vc-price-free">Grátis</span>' : ''}</div></div>`).join('')}<div class="vc-price-total"><span class="vc-mono" style="color:rgba(26,18,12,.6)">Σ</span><span class="lbl">Valor total da oferta</span><span class="v">${esc(c.pricing.total)}</span></div></div>
          <div class="vc-price-today reveal"><span class="vc-price-today-lbl">${esc(c.pricing.todayLine)}</span><div class="vc-price-from">de <span class="strike">12x de R$59,90</span> por apenas</div><div class="vc-price-installment"><span class="pref">12x de</span><span class="num" id="price-counter"><span class="small">R$</span>59,90</span></div><div class="vc-price-cash">ou <b>R$97</b> à vista</div><p>${esc(c.pricing.framing)}</p>${btn(c.pricing.cta)}<small>${esc(c.pricing.sub)}</small></div>
          <div class="vc-compare">${c.pricing.compare.map((line, i) => `<div class="vc-compare-item reveal"><span class="vc-mono">${['SketchUp / Revit', 'Gestão de escritório', 'Projete-se'][i]}</span>${i === 2 ? '<b>O Projete-se custa R$97.</b> E começa exatamente de onde você está.' : esc(line)}</div>`).join('')}</div>
        </div></section>

        <section class="vc-panel vc-guar"><div class="vc-container"><div class="vc-guar-badge reveal">${icon('shield', 56)}</div><h2 class="reveal">${esc(c.guarantee.title)}</h2><p class="reveal">${esc(c.guarantee.body)}</p><p class="vc-guar-note reveal">${esc(c.guarantee.note)}</p><div class="reveal">${btn(c.guarantee.cta)}</div></div></section>

        <section class="vc-panel vc-panel--dark vc-faq" id="faq"><div class="vc-container">
          ${shead(c.faq.tag, 'Suas dúvidas, <span class="it">respondidas.</span>')}
          <div class="vc-faq-list">${c.faq.items.map((it, i) => `<div class="vc-faq-item${i === 0 ? ' open' : ''}"><button class="vc-faq-q" aria-expanded="${i === 0}"><span class="num">${String(i + 1).padStart(2, '0')}</span><span>${esc(it.q)}</span><span class="vc-faq-toggle">${icon(i === 0 ? 'minus' : 'plus', 16)}</span></button><div class="vc-faq-a"><div class="vc-faq-a-inner">${esc(it.a)}</div></div></div>`).join('')}</div>
        </div></section>

        <section class="vc-panel vc-close"><div class="vc-container">
          <h2 class="reveal">Você tem dois caminhos<br><span class="it">a partir daqui.</span></h2>
          <div class="vc-paths"><div class="vc-path reveal"><span class="vc-mono">Caminho A</span><p>${esc(c.close.pathA)}</p></div><div class="vc-path vc-path--b reveal"><span class="vc-mono">Caminho B · escolha</span><p>${esc(c.close.pathB)}</p></div></div>
          <ul class="vc-bundle reveal">${c.close.bundle.map((b) => `<li>${icon('check', 14)}${esc(b)}</li>`).join('')}</ul>
          <div class="vc-close-price reveal">12x de <b>R$11,54</b><div style="font-size:.7em;margin-top:8px;color:var(--ink-soft)">ou R$97 à vista</div></div>
          <div class="reveal">${btn(c.close.cta)}</div><div class="vc-close-sub reveal">${esc(c.close.sub)}</div><blockquote class="vc-close-quote reveal">"${esc(c.mentor.quote)}"<span class="by">— ${esc(c.mentor.quoteBy)}</span></blockquote>
        </div></section>

        <footer class="vc-footer">${esc(c.footer)}</footer>
        <div class="vc-sticky-cta"><span class="liveDot"></span><span>12x de <b style="color:var(--accent)">R$11,54</b> · ou R$97 à vista</span><a class="vc-btn" href="#oferta"><span class="disc">${icon('arrow-up-right', 12)}</span><span>Quero agora</span></a></div>
      </div>
    </div>`;

  function renderProfile(index) {
    const profile = c.profiles.items[index];
    document.querySelectorAll('.vc-prof-tab').forEach((button, i) => {
      button.setAttribute('aria-selected', i === index ? 'true' : 'false');
    });
    document.getElementById('profile-panel').innerHTML = `
      <div class="vc-prof-big">${esc(profile.letter)}</div>
      <div>
        <span class="vc-prof-name">Perfil ${esc(profile.letter)} · ${esc(profile.name)}</span>
        <div class="vc-prof-quote">"${esc(profile.quote)}"</div>
        <p class="vc-prof-body">${esc(profile.body)}</p>
      </div>`;
  }

  function startCounter() {
    const counter = document.getElementById('price-counter');
    if (!counter || counter.dataset.started) return;
    counter.dataset.started = 'true';
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      counter.innerHTML = '<span class="small">R$</span>11,54';
      return;
    }
    const start = 59.90;
    const end = 11.54;
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

  renderProfile(0);

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
    button.addEventListener('click', () => renderProfile(Number(button.dataset.profile)));
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

  const progressBar = document.querySelector('.vc-scroll-progress i');
  const sticky = document.querySelector('.vc-sticky-cta');
  window.addEventListener('scroll', () => {
    const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    const percent = Math.min(1, Math.max(0, scrollY / max));
    progressBar.style.setProperty('--p', `${percent * 100}%`);
    sticky.classList.toggle('in', scrollY > 600 && percent < 0.95);
  }, { passive: true });

  const counter = document.getElementById('price-counter');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        startCounter();
        observer.disconnect();
      }
    }, { threshold: 0.35, rootMargin: '0px 0px -10% 0px' });
    observer.observe(counter);
  } else {
    startCounter();
  }
})();
