/**
 * AX Guitar - 核心交互脚本 (优化版)
 * 功能：顶部栏菜单/搜索/分享 + 底部栏返回顶部
 * 最后检查：2023-12-01
 */

document.addEventListener('DOMContentLoaded', function() {
  // ================= 顶部栏功能 =================
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  const searchBtn = document.getElementById('searchBtn');
  const shareBtn = document.getElementById('shareBtn');

  // 1. 移动菜单控制
  if (menuBtn && mobileNav) {
    menuBtn.setAttribute('aria-label', '菜单');
    menuBtn.addEventListener('click', function() {
      mobileNav.classList.toggle('mobile-nav--open');
      const isOpen = mobileNav.classList.contains('mobile-nav--open');
      menuBtn.setAttribute('aria-expanded', isOpen);
    });
  }

  // 2. 搜索功能 (带防抖)
  searchBtn?.addEventListener('click', debounce(function() {
    const query = prompt('请输入搜索关键词', '');
    if (query) window.location.href = `/search?q=${encodeURIComponent(query)}`;
  }, 300));

  // 3. 分享功能 (适配现代API)
  shareBtn?.addEventListener('click', async function() {
    try {
      if (navigator.share) {
        await navigator.share({
          title: document.title,
          url: window.location.href
        });
      } else {
        copyToClipboard(window.location.href);
        alert('链接已复制，请手动分享');
      }
    } catch (e) {
      console.log('分享取消');
    }
  });

  // ================= 底部栏功能 =================
  const footer = document.getElementById('siteFooter');
  footer?.addEventListener('click', function(e) {
    if (e.target.closest('.bottombar__label')) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  });

  // ================= 工具函数 =================
  function debounce(fn, delay) {
    let timer;
    return function(...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  }

  function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }
});