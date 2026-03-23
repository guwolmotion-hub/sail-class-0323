// 탭 전환
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;
    btn.closest('.section').querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('tab-lights').classList.remove('active');
    document.getElementById('tab-mats').classList.remove('active');
    document.getElementById('tab-' + target).classList.add('active');
  });
});

// 맨 위로 버튼
const topBtn = document.getElementById('topBtn');
window.addEventListener('scroll', () => {
  topBtn.classList.toggle('visible', window.scrollY > 300);
});
topBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
