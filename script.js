document.documentElement.classList.add('js');

const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('#site-nav');
const siteHeader = document.querySelector('.site-header');

menuToggle?.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  siteNav?.classList.toggle('is-open', !isOpen);
});

document.querySelectorAll('.site-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle?.setAttribute('aria-expanded', 'false');
    siteNav?.classList.remove('is-open');
  });
});

const updateHeader = () => siteHeader?.classList.toggle('is-scrolled', window.scrollY > 24);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });



/* Botão global de contato via WhatsApp — disponível também nos artigos do blog. */
if (!document.querySelector('.whatsapp-float')) {
  const whatsapp = document.createElement('a');
  whatsapp.className = 'whatsapp-float';
  whatsapp.href = 'https://wa.me/5511942294767?text=Ol%C3%A1%2C%20acessei%20o%20site%20da%20Nathalia%20Ribeiro%20Advocacia%20e%20gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20atendimento.';
  whatsapp.target = '_blank';
  whatsapp.rel = 'noopener noreferrer';
  whatsapp.setAttribute('aria-label', 'Conversar com a Nathalia Ribeiro Advocacia pelo WhatsApp');
  whatsapp.setAttribute('title', 'Fale pelo WhatsApp');
  whatsapp.innerHTML = '<svg viewBox="0 0 32 32" aria-hidden="true" focusable="false"><path d="M16 3.2A12.5 12.5 0 0 0 5.3 22.2L3.5 28.8l6.8-1.8A12.5 12.5 0 1 0 16 3.2Zm0 22.7a10.2 10.2 0 0 1-5.2-1.4l-.4-.2-4 .1 1.1-3.8-.3-.4A10.2 10.2 0 1 1 16 25.9Zm5.6-7.6c-.3-.2-1.8-.9-2.1-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7.1a8.3 8.3 0 0 1-2.5-1.5 9.3 9.3 0 0 1-1.7-2.1c-.2-.3 0-.5.1-.6l.5-.6c.2-.2.2-.4.3-.6s0-.4 0-.6-.7-1.7-1-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4s-1.2 1.2-1.2 2.8 1.2 3.2 1.4 3.4a12 12 0 0 0 4.6 4.1c.6.3 1.1.5 1.5.6.6.2 1.2.2 1.6.1.5-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4s-.3-.2-.6-.4Z"/></svg><span>WhatsApp</span>';
  document.body.appendChild(whatsapp);
}

document.querySelector('#year').textContent = new Date().getFullYear();


const revealElements = document.querySelectorAll(
  '.hero-copy, .hero-card, .about-copy, .about-portrait, .feature-grid article, .practice, .consult-grid > div, .steps li, .faq-list details, .gallery figure, .location-grid > div, .location-grid address, .contact-grid > div'
);

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

revealElements.forEach((element) => {
  element.classList.add('reveal');
  const siblingIndex = Array.from(element.parentElement?.children || []).indexOf(element);
  element.style.transitionDelay = siblingIndex > 0
    ? String(Math.min(siblingIndex * 70, 210)) + 'ms'
    : '0ms';
  revealObserver.observe(element);
});
