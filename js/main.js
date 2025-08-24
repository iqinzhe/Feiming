/**
 * AX Guitar 网站核心功能
 * 功能包含：菜单控制、搜索、分享、返回顶部
 * 优化版：添加了点击外部关闭菜单、滚动关闭菜单和ESC键关闭菜单功能
 * 新增：防止菜单与内容重叠的动态padding调整
 * 新增：当前页面菜单项激活状态
 */

// DOM加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
  initMobileMenu();
  setupShare();
  setupBackToTop();
  setActiveMenu(); // 添加当前菜单激活状态
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
      
      // 动态调整body的padding-top防止重叠
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
        // 关闭菜单时恢复原始padding
        document.body.style.paddingTop = 'var(--top-bar-height)';
        console.debug('点击外部，菜单已关闭');
      }
    });

    // 页面滚动时，自动收起菜单（防止遮挡内容）
    window.addEventListener('scroll', function() {
      if (menu.classList.contains('show')) {
        menu.classList.remove('show');
        // 滚动关闭菜单时恢复原始padding
        document.body.style.paddingTop = 'var(--top-bar-height)';
        console.debug('页面滚动，菜单已关闭');
      }
    });

    // 点击 ESC 键关闭菜单
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && menu.classList.contains('show')) {
        menu.classList.remove('show');
        // ESC关闭菜单时恢复原始padding
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

// 设置当前激活的导航菜单项
function setActiveMenu() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const menuLinks = document.querySelectorAll('.menu__link');
  
  menuLinks.forEach(link => {
    // 获取链接的文件名（去除参数）
    const linkHref = link.getAttribute('href');
    const linkPage = linkHref.split('?')[0];
    
    // 特殊处理：特色页面（products.html?series=d）
    if (linkHref.includes('series=d') && currentPage === 'products.html' && 
        new URLSearchParams(window.location.search).get('series') === 'd') {
      link.classList.add('active');
    }
    // 普通页面匹配
    else if (linkPage === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
  
  console.debug('当前页面:', currentPage, '已设置激活菜单项');
}
  
  console.debug('当前页面:', currentPage, '已设置激活菜单项');
}

// 添加图标悬停效果
function setupHoverEffects() {
  const shareBtn = document.getElementById('shareBtn');
  const menuBtn = document.getElementById('hamburger');
  
  // 分享按钮悬停效果
  shareBtn?.addEventListener('mouseenter', function() {
    this.style.opacity = '0.8';
  });
  
  shareBtn?.addEventListener('mouseleave', function() {
    this.style.opacity = '1';
  });
  
  // 菜单按钮悬停效果
  menuBtn?.addEventListener('mouseenter', function() {
    this.style.opacity = '0.8';
  });
  
  menuBtn?.addEventListener('mouseleave', function() {
    this.style.opacity = '1';
  });
}

// 在DOM加载完成后也设置悬停效果
document.addEventListener('DOMContentLoaded', function() {
  initMobileMenu();
  setupShare();
  setupBackToTop();
  setActiveMenu();
  setupHoverEffects(); // 添加悬停效果
});
