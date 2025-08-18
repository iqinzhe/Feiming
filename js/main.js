/**
 * AX Guitar - 核心交互脚本
 * 功能：顶部栏菜单/搜索/分享 + 底部栏返回顶部
 */
document.addEventListener('DOMContentLoaded', function() {
  // ================= 顶部栏功能 =================
  const menuBtn = document.getElementById('topbarMenuBtn');
  const mobileNav = document.getElementById('mobileNav');
  const searchBtn = document.getElementById('searchBtn');
  const shareBtn = document.getElementById('shareBtn');

  // 1. 移动菜单控制
  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', function() {
      mobileNav.classList.toggle('mobile-nav--open');
      const isOpen = mobileNav.classList.contains('mobile-nav--open');
      menuBtn.setAttribute('aria-expanded', isOpen);
    });
  }

  // 2. 搜索功能
  searchBtn?.addEventListener('click', function() {
    const query = prompt('请输入搜索关键词', '');
    if (query) {
      window.location.href = `/search?q=${encodeURIComponent(query)}`;
    }
  });

  // 3. 分享功能
  shareBtn?.addEventListener('click', async function() {
    try {
      if (navigator.share) {
        await navigator.share({
          title: document.title,
          url: window.location.href
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('链接已复制到剪贴板');
      }
    } catch (e) {
      console.log('分享取消');
    }
  });

  // ================= 底部栏功能 =================
  const footer = document.getElementById('siteFooter');
  footer?.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});