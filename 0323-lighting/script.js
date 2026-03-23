/* ===========================
   스크롤 기반 목차 활성화
=========================== */
const tocItems = document.querySelectorAll('.toc-item');
const sections = document.querySelectorAll('section[id]');

function updateActiveToc() {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  tocItems.forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('href') === '#' + current) {
      item.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveToc);
updateActiveToc();

/* ===========================
   섹션 페이드인 애니메이션
=========================== */
const fadeTargets = document.querySelectorAll('.section, .summary-section');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.07 });

fadeTargets.forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

/* ===========================
   동적 스타일 (fade-in)
=========================== */
const style = document.createElement('style');
style.textContent = `
  .fade-in {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }
  .fade-in.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .toc-item.active {
    background: #dbeafe;
    color: #1d4ed8;
    font-weight: 600;
  }
`;
document.head.appendChild(style);

/* ===========================
   파이프라인 아이템 클릭
=========================== */
const pipelineItems = document.querySelectorAll('.pipeline-item');
pipelineItems.forEach(item => {
  item.style.cursor = 'pointer';
  item.addEventListener('click', () => {
    pipelineItems.forEach(i => i.classList.remove('selected'));
    item.classList.add('selected');
  });
});

/* ===========================
   라이트 카드 클릭 효과
=========================== */
const lightCards = document.querySelectorAll('.light-card');
lightCards.forEach(card => {
  card.style.cursor = 'default';
  card.addEventListener('mousedown', () => {
    card.style.transform = 'translateY(-2px) scale(0.99)';
  });
  card.addEventListener('mouseup', () => {
    card.style.transform = 'translateY(-4px)';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
