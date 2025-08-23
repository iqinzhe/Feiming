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

// ==================================================
// 移动菜单控制 - 优化汉堡菜单功能
// 1. 点击汉堡按钮：展开/收起菜单
// 2. 点击任意菜单项：自动收起菜单
// 3. 滚动页面：自动收起菜单
// 4. 点击菜单外部空白区域：自动收起菜单
// ==================================================
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const menu = document.getElementById('menu');
  
  if (hamburger && menu) {
    // 点击汉堡按钮：切换展开/收起
    hamburger.addEventListener('click', function(e) {
      e.stopPropagation(); // 防止点击按钮触发外部点击收起
      menu.classList.toggle('menu--show');
    });

    // 点击菜单项：自动收起
    menu?.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('menu--show');
      });
    });

    // 滚动页面：自动收起
    window.addEventListener('scroll', () => {
      if (menu.classList.contains('menu--show')) {
        menu.classList.remove('menu--show');
      }
    });

    // 点击菜单外部：自动收起
    document.addEventListener('click', function(e) {
      if (menu.classList.contains('menu--show')) {
        const isClickInsideMenu = menu.contains(e.target);
        const isClickHamburger = hamburger.contains(e.target);
        if (!isClickInsideMenu && !isClickHamburger) {
          menu.classList.remove('menu--show');
        }
      }
    });
  }
}

// ==================================================
// 分享功能 - 修复分享按钮功能
// ==================================================
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

// ==================================================
// 返回顶部
// ==================================================
function setupBackToTop() {
  const footer = document.getElementById('footerToTop');
  
  footer?.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
