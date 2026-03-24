/* =============================================
   맨 위로 버튼
============================================= */
const topBtn = document.getElementById('topBtn');

window.addEventListener('scroll', () => {
  topBtn.classList.toggle('visible', window.scrollY > 300);
});

topBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* =============================================
   목차 현재 섹션 하이라이트
============================================= */
const sections = document.querySelectorAll('section[id]');
const tocLinks = document.querySelectorAll('.toc ul li a');

const tocObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      tocLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.toc ul li a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-20% 0px -70% 0px' });

sections.forEach(s => tocObserver.observe(s));

/* =============================================
   섹션 스크롤 등장 애니메이션
============================================= */
const style = document.createElement('style');
style.textContent = `.section.visible { opacity: 1 !important; transform: translateY(0) !important; }`;
document.head.appendChild(style);

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.section').forEach(el => {
  el.style.cssText += 'opacity:0;transform:translateY(18px);transition:opacity .45s ease,transform .45s ease,box-shadow .2s ease;';
  fadeObserver.observe(el);
});
