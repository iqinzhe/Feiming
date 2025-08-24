/**
 * AX Guitar 网站核心功能
 * 功能包含：菜单控制、搜索、分享、返回顶部
 * 优化版：添加了点击外部关闭菜单、滚动关闭菜单和ESC键关闭菜单功能
 * 新增：防止菜单与内容重叠的动态padding调整
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
  const menuHeight = 50; // 菜单展开后的近似高度
  
  if (hamburger && menu) {
    // 点击汉堡菜单切换显示
    hamburger.addEventListener('click', function(e) {
      e.stopPropagation(); // 防止事件冒泡到document
      const isOpening = !menu.classList.contains('show');
      menu.classList.toggle('show');
      
      // 新增：动态调整body的padding-top防止重叠
      if (isOpening) {
        document.body.style.paddingTop = `calc(var(--top-bar-height) + ${menuHeight}px)`;
      } else {
        document.body.style.paddingTop = 'var(--top-bar-height)';
      }
      
      console.debug('菜单状态:', menu.classList.contains('show'));
    });

    // 点击页面其他地方时，自动关闭菜单
    document.addEventListener('click', function(e) {
      if (menu.classList.contains('show') && 
          !menu.contains(e.target) && 
          !hamburger.contains(e.target)) {
        menu.classList.remove('show');
        // 新增：关闭菜单时恢复原始padding
        document.body.style.paddingTop = 'var(--top-bar-height)';
        console.debug('点击外部，菜单已关闭');
      }
    });

    // 页面滚动时，自动收起菜单（防止遮挡内容）
    window.addEventListener('scroll', function() {
      if (menu.classList.contains('show')) {
        menu.classList.remove('show');
        // 新增：滚动关闭菜单时恢复原始padding
        document.body.style.paddingTop = 'var(--top-bar-height)';
        console.debug('页面滚动，菜单已关闭');
      }
    });

    // 点击 ESC 键关闭菜单
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && menu.classList.contains('show')) {
        menu.classList.remove('show');
        // 新增：ESC关闭菜单时恢复原始padding
        document.body.style.paddingTop = 'var(--top-bar-height)';
        console.debug('ESC键按下，菜单已关闭');
      }
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