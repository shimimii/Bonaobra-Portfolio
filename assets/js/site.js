(() => {
  const filterButtons = Array.from(document.querySelectorAll('[data-filter]'));
  const galleryItems = Array.from(document.querySelectorAll('.gallery-card'));
  const count = document.getElementById('gallery-count');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      filterButtons.forEach(item => {
        const selected = item === button;
        item.classList.toggle('active', selected);
        item.setAttribute('aria-pressed', String(selected));
      });
      let visible = 0;
      galleryItems.forEach(item => {
        const show = filter === 'all' || item.dataset.category === filter;
        item.hidden = !show;
        if (show) visible++;
      });
      if (count) count.textContent = visible;
    });
  });

  const lightbox = document.querySelector('.lightbox');
  if (lightbox) {
    const image = lightbox.querySelector('img');
    const caption = lightbox.querySelector('figcaption');
    const closeButton = lightbox.querySelector('.lightbox-close');
    let previousFocus = null;
    const close = () => {
      lightbox.classList.remove('open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (previousFocus) previousFocus.focus();
    };
    document.querySelectorAll('[data-lightbox]').forEach(link => {
      link.addEventListener('click', event => {
        event.preventDefault();
        previousFocus = link;
        const thumb = link.querySelector('img');
        image.src = link.href;
        image.alt = thumb ? thumb.alt : '';
        caption.textContent = link.dataset.caption || image.alt;
        lightbox.classList.add('open');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        closeButton.focus();
      });
    });
    closeButton.addEventListener('click', close);
    lightbox.addEventListener('click', event => {
      if (event.target === lightbox) close();
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && lightbox.classList.contains('open')) close();
    });
  }

  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', event => {
      event.preventDefault();
      const data = new FormData(form);
      const recipient = 'carlandrei2006@gmail.com';
      const subject = encodeURIComponent(`${data.get('subject')} — from ${data.get('name')}`);
      const body = encodeURIComponent(`Name: ${data.get('name')}\nEmail: ${data.get('email')}\n\n${data.get('message')}`);
      const status = document.getElementById('form-status');
      status.textContent = 'Opening your email app with your message…';
      window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
    });
  }
})();