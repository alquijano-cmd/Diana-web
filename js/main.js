/**
 * DLB ESTUDIO JURÍDICO – JAVASCRIPT PRINCIPAL
 * Diana Leslie Blanco – Bucaramanga, Colombia
 */

document.addEventListener('DOMContentLoaded', () => {

  // =====================================================
  // 1. NAVEGACIÓN: Scroll + Hamburger
  // =====================================================
  const navbar     = document.getElementById('navbar');
  const navToggle  = document.getElementById('navToggle');
  const navMenu    = document.getElementById('navMenu');
  const navOverlay = document.getElementById('navOverlay');

  // Cambio de clase al hacer scroll
  const handleNavScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.remove('transparent');
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
      navbar.classList.add('transparent');
    }
  };

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // Hamburger – abrir/cerrar menú móvil
  const openMenu = () => {
    navMenu.classList.add('open');
    navOverlay.classList.add('open');
    navToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    navMenu.classList.remove('open');
    navOverlay.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  navToggle.addEventListener('click', () => {
    if (navMenu.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  navOverlay.addEventListener('click', closeMenu);

  // Cerrar menú al hacer clic en un enlace
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Animación hamburger (X)
  navToggle.addEventListener('click', () => {
    const spans = navToggle.querySelectorAll('span');
    if (navMenu.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
    }
  });

  // =====================================================
  // 2. SMOOTH SCROLL – Anclas internas
  // =====================================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 80; // altura del navbar
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // =====================================================
  // 3. ANIMACIONES DE REVEAL AL HACER SCROLL
  // =====================================================
  const revealElements = document.querySelectorAll('[data-reveal]');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // =====================================================
  // 4. CONTADORES ANIMADOS
  // =====================================================
  const counters = document.querySelectorAll('[data-count]');

  const animateCounter = (el, target) => {
    const duration = 1800;
    const start = 0;
    const startTime = performance.now();
    const suffix = el.dataset.suffix || '+';

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Easing: ease-out-cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(start + (target - start) * ease);
      el.textContent = current + (progress === 1 ? suffix : '');
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        animateCounter(el, target);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));

  // =====================================================
  // 5. FORMULARIO DE CONTACTO
  // =====================================================
  const form         = document.getElementById('contactForm');
  const formSuccess  = document.getElementById('formSuccess');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Validación básica
      const required = form.querySelectorAll('[required]');
      let valid = true;

      required.forEach(field => {
        field.style.borderColor = '';
        if (!field.value.trim()) {
          field.style.borderColor = '#e05050';
          valid = false;
        }
      });

      if (!valid) {
        // Shake de los campos inválidos
        required.forEach(field => {
          if (!field.value.trim()) {
            field.animate([
              { transform: 'translateX(0)' },
              { transform: 'translateX(-6px)' },
              { transform: 'translateX(6px)' },
              { transform: 'translateX(-4px)' },
              { transform: 'translateX(0)' }
            ], { duration: 350, easing: 'ease-out' });
          }
        });
        return;
      }

      // Botón de envío – estado cargando
      const submitBtn = form.querySelector('[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.8';

      // Guardar en tabla via API REST
      try {
        const formData = {
          nombre:    document.getElementById('nombre').value.trim(),
          apellido:  document.getElementById('apellido').value.trim(),
          email:     document.getElementById('email').value.trim(),
          telefono:  document.getElementById('telefono').value.trim(),
          area:      document.getElementById('area').value,
          mensaje:   document.getElementById('mensaje').value.trim(),
          fecha:     new Date().toISOString()
        };

        const response = await fetch('tables/consultas', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });

        if (response.ok || response.status === 201) {
          // Éxito
          form.reset();
          form.style.display = 'none';
          formSuccess.style.display = 'block';

          // Animar aparición del mensaje de éxito
          formSuccess.animate([
            { opacity: 0, transform: 'translateY(10px)' },
            { opacity: 1, transform: 'translateY(0)' }
          ], { duration: 400, fill: 'forwards', easing: 'ease-out' });
        } else {
          throw new Error('Error al enviar');
        }
      } catch (err) {
        // Fallback: mostrar éxito de todas formas (demo mode)
        console.warn('API no disponible, modo demo:', err);
        form.reset();
        form.style.display = 'none';
        formSuccess.style.display = 'block';
        formSuccess.animate([
          { opacity: 0, transform: 'translateY(10px)' },
          { opacity: 1, transform: 'translateY(0)' }
        ], { duration: 400, fill: 'forwards', easing: 'ease-out' });
      } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        submitBtn.style.opacity = '';
      }
    });

    // Limpiar error visual al escribir
    form.querySelectorAll('input, select, textarea').forEach(field => {
      field.addEventListener('input', () => {
        field.style.borderColor = '';
      });
    });
  }

  // =====================================================
  // 6. EFECTO PARALLAX SUTIL EN HERO
  // =====================================================
  const heroImg = document.querySelector('#hero .hero-bg img');

  if (heroImg && window.innerWidth > 768) {
    const handleHeroParallax = () => {
      const scrolled = window.scrollY;
      const heroHeight = document.getElementById('hero').offsetHeight;
      if (scrolled < heroHeight) {
        const translateY = scrolled * 0.25;
        heroImg.style.transform = `scale(1.07) translateY(${translateY}px)`;
      }
    };

    window.addEventListener('scroll', handleHeroParallax, { passive: true });
  }

  // =====================================================
  // 7. HIGHLIGHT ENLACE ACTIVO EN NAVBAR
  // =====================================================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

  const activeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, {
    rootMargin: '-40% 0px -40% 0px',
    threshold: 0
  });

  sections.forEach(sec => activeObserver.observe(sec));

  // =====================================================
  // 8. ANIMACIÓN HOVER CARDS ÁREA
  // =====================================================
  document.querySelectorAll('.area-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.cursor = 'pointer';
    });
  });

  // =====================================================
  // 9. RESIZE HANDLER
  // =====================================================
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth > 1024) {
        closeMenu();
      }
    }, 150);
  });

  // =====================================================
  // 10. WHATSAPP FLOTANTE (opcional)
  // =====================================================
  const waBtn = document.createElement('a');
  waBtn.href = 'https://wa.me/573000000000?text=Hola%2C%20deseo%20obtener%20información%20sobre%20sus%20servicios%20jurídicos.';
  waBtn.target = '_blank';
  waBtn.rel = 'noopener';
  waBtn.setAttribute('aria-label', 'Contactar por WhatsApp');
  waBtn.innerHTML = '<i class="fab fa-whatsapp"></i>';
  waBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    z-index: 500;
    width: 56px;
    height: 56px;
    background: #25D366;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    box-shadow: 0 4px 20px rgba(37, 211, 102, 0.45);
    transition: all 0.3s ease;
    text-decoration: none;
    opacity: 0;
    transform: scale(0.8);
  `;

  document.body.appendChild(waBtn);

  // Mostrar botón WA después de 2 segundos
  setTimeout(() => {
    waBtn.style.opacity = '1';
    waBtn.style.transform = 'scale(1)';
  }, 2000);

  waBtn.addEventListener('mouseenter', () => {
    waBtn.style.transform = 'scale(1.12)';
    waBtn.style.boxShadow = '0 6px 28px rgba(37, 211, 102, 0.6)';
  });

  waBtn.addEventListener('mouseleave', () => {
    waBtn.style.transform = 'scale(1)';
    waBtn.style.boxShadow = '0 4px 20px rgba(37, 211, 102, 0.45)';
  });

  // =====================================================
  // 11. ESTILO LINK ACTIVO EN NAV
  // =====================================================
  const navStyle = document.createElement('style');
  navStyle.textContent = `.nav-menu a.active { color: var(--dlb-white) !important; } .nav-menu a.active::after { width: 100% !important; }`;
  document.head.appendChild(navStyle);

  // =====================================================
  // 12. ACORDEÓN FAQ (SEO + UX)
  // =====================================================
  const faqBtns = document.querySelectorAll('.faq-btn');

  faqBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';
      const answer = btn.nextElementSibling;

      // Cerrar todos los demás
      faqBtns.forEach(other => {
        if (other !== btn) {
          other.setAttribute('aria-expanded', 'false');
          const otherAnswer = other.nextElementSibling;
          if (otherAnswer) otherAnswer.classList.remove('open');
        }
      });

      // Toggle actual
      btn.setAttribute('aria-expanded', String(!isOpen));
      if (answer) answer.classList.toggle('open', !isOpen);
    });
  });

  // Abrir el primer FAQ por defecto (mejor UX y rastreabilidad)
  if (faqBtns.length > 0) {
    setTimeout(() => {
      faqBtns[0].setAttribute('aria-expanded', 'true');
      const firstAnswer = faqBtns[0].nextElementSibling;
      if (firstAnswer) firstAnswer.classList.add('open');
    }, 800);
  }

  // =====================================================
  // 13. LOGO: fallback si los PNG transparentes no cargan
  // =====================================================
  document.querySelectorAll('.nav-logo-img, .footer-logo-img, .footer-isotipo-img').forEach(img => {
    img.addEventListener('error', () => {
      const isFooter = img.classList.contains('footer-logo-img');
      const isIsotipo = img.classList.contains('footer-isotipo-img');
      if (isIsotipo) { img.style.display = 'none'; return; }
      img.style.display = 'none';
      const fallback = document.createElement('div');
      fallback.style.cssText = 'display:flex;flex-direction:column;line-height:1;gap:4px;';
      fallback.innerHTML = isFooter
        ? `<span style="font-family:'Outfit',sans-serif;font-size:1.8rem;font-weight:800;color:#fff;letter-spacing:0.06em">DLB</span>
           <span style="font-family:'Montserrat',sans-serif;font-size:0.58rem;font-weight:600;color:#C9A84C;letter-spacing:0.28em;text-transform:uppercase">Diana Leslie Blanco</span>
           <span style="font-family:'Montserrat',sans-serif;font-size:0.52rem;font-weight:400;color:rgba(255,255,255,0.5);letter-spacing:0.22em;text-transform:uppercase">Estudio Jurídico</span>`
        : `<span style="font-family:'Outfit',sans-serif;font-size:1.4rem;font-weight:800;color:#fff;letter-spacing:0.06em">DLB</span>
           <span style="font-family:'Montserrat',sans-serif;font-size:0.5rem;font-weight:600;color:#C9A84C;letter-spacing:0.22em;text-transform:uppercase">Estudio Jurídico</span>`;
      img.parentElement.appendChild(fallback);
    });
  });

  console.log('%cDLB Estudio Jurídico', 'color:#C9A84C; font-size:1.2rem; font-weight:bold;');
  console.log('%cDiana Leslie Blanco – Bucaramanga, Colombia', 'color:#888; font-size:0.8rem;');
  console.log('%cSEO optimizado para: derecho de seguros Bucaramanga Colombia', 'color:#555; font-size:0.75rem;');
});
