const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    siteNav.classList.toggle('open');
  });
}

const revealItems = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('visible'));
}

const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');

    galleryItems.forEach((item) => {
      const show = filter === 'all' || item.dataset.category === filter;
      item.hidden = !show;
    });
  });
});

const quoteForm = document.querySelector('#quote-form');

if (quoteForm) {
  quoteForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(quoteForm);
    const subject = encodeURIComponent('Right-1 Assembly service request');
    const body = encodeURIComponent(
      `Name: ${data.get('name')}\nPhone: ${data.get('phone')}\nService: ${data.get('service')}\n\nProject details:\n${data.get('message')}`
    );
    window.location.href = `mailto:right1assembly@gmail.com?subject=${subject}&body=${body}`;
  });
}
