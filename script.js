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
