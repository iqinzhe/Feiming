/**
 * AX Guitar 网站核心功能
 * 功能包含：菜单控制、搜索、分享、返回顶部
 */

// DOM加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
  initMobileMenu();
  setupSearch();
  setupShare();
  setupBackToTop();
});

// 移动菜单控制
function initMobileMenu() {
  const menuBtn = document.getElementById('topbarMenuBtn');
  const mobileNav = document.getElementById('mobileNav');
  
  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', function() {
      mobileNav.classList.toggle('mobile-nav--open');
      console.debug('菜单状态:', mobileNav.classList.contains('mobile-nav--open'));
    });
  }
}

// 搜索功能
function setupSearch() {
  const searchBtn = document.getElementById('topbarSearchBtn');
  
  searchBtn?.addEventListener('click', function() {
    const query = prompt('请输入搜索关键词');
    if (query) {
      alert(`搜索演示: ${query}`);
      // 实际项目中这里应该是搜索跳转
      // window.location.href = `/search?q=${encodeURIComponent(query)}`;
    }
  });
}

// 分享功能
function setupShare() {
  const shareBtn = document.getElementById('topbarShareBtn');
  
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