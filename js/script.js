document.addEventListener('DOMContentLoaded', function () {
  const navbar = document.getElementById('navbar');
  const btnTopo = document.getElementById('btn-topo');
  const typedEl = document.getElementById('typed');
  const scrollProgress = document.getElementById('scroll-progress');
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinks = document.querySelectorAll('.navbar .nav-link');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Ano dinâmico no footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // UI ao rolar: progresso, navbar, botão topo e link ativo (unificado + rAF)
  function updateScrollUI() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    if (docHeight > 0) {
      scrollProgress.style.width = (scrollTop / docHeight) * 100 + '%';
    }

    if (scrollTop > 50) {
      navbar.classList.add('scrolled');
      btnTopo.classList.add('show');
    } else {
      navbar.classList.remove('scrolled');
      btnTopo.classList.remove('show');
    }

    const pos = scrollTop + 100;
    let current = '';
    sections.forEach(function (section) {
      if (pos >= section.offsetTop && pos < section.offsetTop + section.offsetHeight) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }

  let ticking = false;
  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        updateScrollUI();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', updateScrollUI);
  updateScrollUI();

  // Voltar ao topo
  btnTopo.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  });

  // Fechar menu mobile ao clicar em um link
  const navCollapse = document.getElementById('menu');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (navCollapse.classList.contains('show')) {
        bootstrap.Collapse.getInstance(navCollapse).hide();
      }
    });
  });

  // Efeito de digitação (typing)
  const frases = [
    'Desenvolvedor Web',
    'PHP + MySQL',
    'HTML, CSS, JavaScript & Bootstrap',
    'WordPress & Moodle',
    'Formado em Recursos Humanos'
  ];

  if (reduceMotion) {
    typedEl.textContent = frases[0];
  } else {
    let fraseIndex = 0;
    let charIndex = 0;
    let deletando = false;

    function digitar() {
      const atual = frases[fraseIndex];
      if (!deletando) {
        charIndex++;
        typedEl.textContent = atual.substring(0, charIndex);
        if (charIndex === atual.length) {
          deletando = true;
          setTimeout(digitar, 1800);
          return;
        }
        setTimeout(digitar, 90);
      } else {
        charIndex--;
        typedEl.textContent = atual.substring(0, charIndex);
        if (charIndex === 0) {
          deletando = false;
          fraseIndex = (fraseIndex + 1) % frases.length;
        }
        setTimeout(digitar, 50);
      }
    }

    digitar();
  }

  // Animações ao rolar (reveal)
  const revealEls = document.querySelectorAll('.service-card, .info-card, .skill-card, .contact-card, .link-btn');

  revealEls.forEach(function (el, index) {
    el.classList.add('reveal');
    el.style.transitionDelay = (index % 4) * 0.1 + 's';
  });

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          entry.target.style.transitionDelay = '0s';
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealEls.forEach(function (el) {
    observer.observe(el);
  });

  // Barras de progresso das habilidades ao aparecerem
  const skillsSection = document.getElementById('habilidades');

  if (skillsSection) {
    const skillObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.progress-bar').forEach(function (bar) {
              const level = bar.closest('.skill-card').getAttribute('data-level');
              setTimeout(function () {
                bar.style.width = level + '%';
              }, 200);
            });
            skillObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    skillObserver.observe(skillsSection);
  }
});
