document.addEventListener('DOMContentLoaded', function () {
  const navbar = document.getElementById('navbar');
  const btnTopo = document.getElementById('btn-topo');
  const typedEl = document.getElementById('typed');

  // Ano dinâmico no footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Navbar com fundo ao rolar
  function handleScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
      btnTopo.classList.add('show');
    } else {
      navbar.classList.remove('scrolled');
      btnTopo.classList.remove('show');
    }
  }

  window.addEventListener('scroll', handleScroll);
  handleScroll();

  // Link ativo no menu conforme a seção visível
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinks = document.querySelectorAll('.navbar .nav-link');

  window.addEventListener('scroll', function () {
    const pos = window.scrollY + 100;
    let current = '';
    sections.forEach(function (section) {
      if (pos >= section.offsetTop && pos < section.offsetTop + section.offsetHeight) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
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

  // Animações ao rolar (reveal)
  const revealEls = document.querySelectorAll('.service-card, .info-card, .skill-card, .contact-card');
  revealEls.forEach(function (el) {
    el.classList.add('reveal');
  });

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
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

  const skillObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const bars = entry.target.querySelectorAll('.progress-bar');
          bars.forEach(function (bar) {
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

  if (skillsSection) {
    skillObserver.observe(skillsSection);
  }

  // Formulário de contato (simulação de envio)
  const form = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }
    form.classList.remove('was-validated');
    const nome = document.getElementById('nome').value.trim();
    formStatus.innerHTML =
      '<div class="alert alert-success alert-dismissible fade show" role="alert">' +
      'Obrigado, ' + nome + '! Mensagem enviada. Em breve entrarei em contato.' +
      '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Fechar"></button></div>';
    form.reset();
    setTimeout(function () {
      if (formStatus.firstChild) {
        formStatus.firstChild.classList.remove('show');
        setTimeout(function () {
          formStatus.innerHTML = '';
        }, 300);
      }
    }, 6000);
  });
});
