// ===== MOBILE MENU =====
function toggleMenu() {
  const menu = document.getElementById('navMenu');
  menu.classList.toggle('active');
}

document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('navMenu').classList.remove('active');
  });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ===== CONTACT FORM =====
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  btn.textContent = 'SENT ✓';
  btn.style.background = '#1a1a1a';
  btn.style.color = '#fff';
  setTimeout(() => {
    btn.textContent = 'SEND MESSAGE';
    btn.style.background = '';
    btn.style.color = '';
    e.target.reset();
  }, 2500);
}

// ===== DRAGGABLE ID CARD =====
(function () {
  const card = document.getElementById('idCard');
  if (!card) return;

  let isDragging = false;
  let startX, startY, origLeft, origTop;
  let posX = 0, posY = 0;

  function getPos(e) {
    return e.touches ? { x: e.touches[0].clientX, y: e.touches[0].clientY }
                     : { x: e.clientX, y: e.clientY };
  }

  function onStart(e) {
    isDragging = true;
    card.classList.add('dragging');
    const pos = getPos(e);
    startX = pos.x - posX;
    startY = pos.y - posY;
  }

  function onMove(e) {
    if (!isDragging) return;
    e.preventDefault();
    const pos = getPos(e);
    posX = pos.x - startX;
    posY = pos.y - startY;
    card.style.transform = `translate(${posX}px, ${posY}px)`;
  }

  function onEnd() {
    if (!isDragging) return;
    isDragging = false;
    card.classList.remove('dragging');
    // Snap back to origin with spring feel
    card.style.transition = 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
    card.style.transform = '';
    posX = 0; posY = 0;
    setTimeout(() => { card.style.transition = ''; }, 650);
  }

  card.addEventListener('mousedown', onStart);
  card.addEventListener('touchstart', onStart, { passive: false });
  document.addEventListener('mousemove', onMove);
  document.addEventListener('touchmove', onMove, { passive: false });
  document.addEventListener('mouseup', onEnd);
  document.addEventListener('touchend', onEnd);
})();

// ===== DASHBOARD RIBBON — Drag to scroll =====
(function () {
  const wrapper = document.querySelector('.ribbon-wrapper');
  if (!wrapper) return;

  let isDown = false, startX, scrollLeft;

  wrapper.addEventListener('mousedown', e => {
    isDown = true;
    wrapper.classList.add('active');
    startX = e.pageX - wrapper.offsetLeft;
    scrollLeft = wrapper.scrollLeft;
  });
  wrapper.addEventListener('mouseleave', () => { isDown = false; });
  wrapper.addEventListener('mouseup', () => { isDown = false; });
  wrapper.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - wrapper.offsetLeft;
    wrapper.scrollLeft = scrollLeft - (x - startX) * 1.5;
  });
})();

// ===== DASHBOARD LIGHTBOX =====
(function () {
  const lightbox = document.getElementById('dashLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDesc = document.getElementById('lightboxDesc');
  const lightboxTags = document.getElementById('lightboxTags');
  const closeBtn = document.getElementById('lightboxClose');

  document.querySelectorAll('.ribbon-card').forEach(card => {
    card.addEventListener('click', () => {
      const img = card.dataset.img;
      const title = card.dataset.title;
      const desc = card.dataset.desc;
      const tags = card.dataset.tags.split(',');

      lightboxImg.src = img;
      lightboxImg.alt = title;
      lightboxTitle.textContent = title;
      lightboxDesc.textContent = desc;
      lightboxTags.innerHTML = tags.map(t => `<span class="tag">${t.trim()}</span>`).join('');

      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
  });
})();

// ===== SCROLL REVEAL =====
(function () {
  const revealEls = document.querySelectorAll(
    '.about-content, .stats-section, .ribbon-wrapper, .projects-grid, .project-card, .skill-item, .stat-item'
  );

  revealEls.forEach(el => el.classList.add('reveal'));

  const obs = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 60);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach(el => obs.observe(el));
})();
