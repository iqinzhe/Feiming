// 汉堡菜单展开/收起
const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('menu');
hamburger.addEventListener('click', () => {
  menu.style.display = (menu.style.display === 'flex') ? 'none' : 'flex';
});

// 分享按钮
const shareBtn = document.getElementById('share');
shareBtn.addEventListener('click', () => {
  if (navigator.share) {
    navigator.share({
      title: '吉他世界',
      text: '每次拨弦都是心灵的飞舞共鸣！',
      url: window.location.href
    });
  } else {
    alert('当前浏览器不支持分享功能');
  }
});

// 底部返回顶部
const footer = document.getElementById('footer');
footer.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
