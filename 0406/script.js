/* 맨 위로 버튼 */
const topBtn = document.getElementById('topBtn');
window.addEventListener('scroll', () => {
  topBtn.classList.toggle('visible', window.scrollY > 300);
});
topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* TOC 하이라이트 */
const tocLinks = document.querySelectorAll('.toc ul li a');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      tocLinks.forEach(l => l.classList.remove('active'));
      const a = document.querySelector(`.toc ul li a[href="#${entry.target.id}"]`);
      if (a) a.classList.add('active');
    }
  });
}, { rootMargin: '-20% 0px -70% 0px' });
document.querySelectorAll('section[id]').forEach(s => observer.observe(s));

/* 섹션 등장 애니메이션 */
const style = document.createElement('style');
style.textContent = `.section.visible{opacity:1!important;transform:translateY(0)!important}`;
document.head.appendChild(style);

const fadeObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.section').forEach(el => {
  el.style.cssText += 'opacity:0;transform:translateY(18px);transition:opacity .45s ease,transform .45s ease,box-shadow .2s ease;';
  fadeObs.observe(el);
});
