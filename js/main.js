// 移动端搜索功能
document.addEventListener('DOMContentLoaded', function() {
  const searchButton = document.querySelector('.search-button');
  const mobileSearch = document.querySelector('.mobile-search');
  
  if (searchButton && mobileSearch) {
    searchButton.addEventListener('click', function() {
      mobileSearch.classList.toggle('active');
    });
  }
});
// 更健壮的事件监听
function initMenu() {
  const menuBtn = document.getElementById('topbarMenuBtn');
  if (!menuBtn) return;

  menuBtn.addEventListener('click', function() {
    const nav = document.getElementById('mobileNav');
    nav.classList.toggle('mobile-nav--open');
    
    // 调试输出
    console.log('当前导航状态:', nav.classList);
  });
}

// 多种加载方式保障
if (document.readyState !== 'loading') {
  initMenu();
} else {
  document.addEventListener('DOMContentLoaded', initMenu);
}
