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
