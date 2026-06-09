document.querySelectorAll('[data-bs-toggle="popover"]').forEach(el => {
  new bootstrap.Popover(el, { trigger: 'click', html: false });
});

document.addEventListener('click', e => {
  if (!e.target.closest('[data-bs-toggle="popover"]')) {
    document.querySelectorAll('[data-bs-toggle="popover"]').forEach(el => {
      bootstrap.Popover.getInstance(el)?.hide();
    });
  }
});

const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');
const scrollBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
  let cur = '';
  sections.forEach(s => { if (pageYOffset >= s.offsetTop - 90) cur = s.id; });
  navLinks.forEach(l => {
    l.classList.remove('active', 'nav-active');
    if (l.getAttribute('href') === '#' + cur) l.classList.add('active', 'nav-active');
  });
  scrollBtn.style.display = pageYOffset > 350 ? 'flex' : 'none';
});

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
  });
});
const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-bar-fill[data-width]').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skills-section').forEach(s => skillObserver.observe(s));

const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));

document.getElementById('sendBtn').addEventListener('click', () => {
  const toast = new bootstrap.Toast(document.getElementById('msgToast'), { delay: 3500 });
  toast.show();
});
