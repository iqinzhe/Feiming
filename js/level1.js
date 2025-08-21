// 汉堡菜单展开收起
const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menu");
hamburger.addEventListener("click", () => {
  menu.classList.toggle("show");
});

// 分享按钮点击
const shareBtn = document.getElementById("shareBtn");
shareBtn.addEventListener("click", () => {
  if (navigator.share) {
    navigator.share({
      title: "音乐网页",
      text: "每次拨弦都是心灵的飞舞共鸣！",
      url: window.location.href
    });
  } else {
    alert("当前浏览器不支持分享功能。");
  }
});

// 底部点击回到顶部
const footer = document.getElementById("footer");
footer.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
