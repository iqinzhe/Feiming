/**
 * AX Guitar 网站核心功能
 * 功能包含：菜单控制、搜索、分享、返回顶部
 */

// DOM加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
  initMobileMenu();
  setupShare();
  setupBackToTop();
});

// 移动菜单控制 - 修复汉堡菜单功能
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const menu = document.getElementById('menu');
  
  if (hamburger && menu) {
    hamburger.addEventListener('click', function() {
      menu.classList.toggle('show');
      console.debug('菜单状态:', menu.classList.contains('show'));
    });
  }
}

// 分享功能 - 修复分享按钮功能
function setupShare() {
  const shareBtn = document.getElementById('shareBtn');
  
  shareBtn?.addEventListener('click', function() {
    try {
      if (navigator.share) {
        navigator.share({
          title: document.title,
          url: location.href
        });
      } else {
        alert('请手动复制链接分享: ' + location.href);
      }
    } catch (e) {
      console.error('分享失败:', e);
      alert('分享功能出错，请重试');
    }
  });
}

// 返回顶部
function setupBackToTop() {
  const footer = document.getElementById('footerToTop');
  
  footer?.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
