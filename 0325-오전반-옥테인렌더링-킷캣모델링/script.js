// ===== TOC Active State =====
const sections = document.querySelectorAll('.section');
const tocBtns  = document.querySelectorAll('.toc-btn');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      tocBtns.forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('href') === '#' + id);
      });
    }
  });
}, { rootMargin: '-30% 0px -60% 0px' });

sections.forEach(s => observer.observe(s));

// ===== Render Card Toggle =====
document.querySelectorAll('.render-card').forEach(card => {
  card.addEventListener('click', () => {
    const isActive = card.classList.contains('active');
    document.querySelectorAll('.render-card').forEach(c => c.classList.remove('active'));
    if (!isActive) card.classList.add('active');
  });
});

// ===== Smooth scroll for TOC =====
tocBtns.forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(btn.getAttribute('href'));
    if (target) {
      const offset = 64;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ===== Sample Slider Demo =====
const slider = document.getElementById('sampleSlider');
const sliderVal = document.getElementById('sliderVal');
const sliderTag = document.getElementById('sliderTag');

if (slider) {
  const values = [128, 256, 512, 1024, 2048, 4096];
  slider.addEventListener('input', () => {
    const val = values[slider.value];
    sliderVal.textContent = val;
    if (val <= 512) {
      sliderTag.textContent = '가렌더 (빠른 프리뷰)';
      sliderTag.className = 'badge badge-blue';
    } else if (val <= 2048) {
      sliderTag.textContent = '최종 렌더';
      sliderTag.className = 'badge badge-green';
    } else {
      sliderTag.textContent = '고품질 최종 렌더';
      sliderTag.className = 'badge badge-purple';
    }
  });
}

// ===== Scroll fade-in =====
const fadeEls = document.querySelectorAll('.section, .render-card, .step-content, .point-card');

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

fadeEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(16px)';
  el.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
  fadeObserver.observe(el);
});
