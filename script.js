const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const yearNode = document.querySelector('#year');
const revealNodes = document.querySelectorAll('.reveal');

/* ─── Mobile Nav ─── */
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ─── Scroll Reveal ─── */
if (revealNodes.length) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -8% 0px'
    }
  );

  revealNodes.forEach((node) => revealObserver.observe(node));
}

/* ─── Year ─── */
if (yearNode) {
  yearNode.textContent = String(new Date().getFullYear());
}

/* ─── Form Submission ─── */
const leadForm = document.getElementById('leadForm');
const formSuccess = document.getElementById('formSuccess');

if (leadForm) {
  leadForm.addEventListener('submit', function (e) {
    e.preventDefault();

    /* Basic validation */
    const name = leadForm.querySelector('[name="name"]');
    const email = leadForm.querySelector('[name="email"]');
    const phone = leadForm.querySelector('[name="phone"]');
    const service = leadForm.querySelector('[name="service"]');

    if (!name.value.trim() || !email.value.trim() || !phone.value.trim() || !service.value) {
      alert('Please fill in all required fields.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
      alert('Please enter a valid email address.');
      return;
    }

    /* Hide form fields, show success */
    Array.from(leadForm.children).forEach((child) => {
      if (child.id !== 'formSuccess') {
        child.style.display = 'none';
      }
    });
    formSuccess.style.display = 'block';
  });
}
