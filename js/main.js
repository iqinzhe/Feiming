/* ==================================================
   汉堡菜单控制
   ================================================== */
const hamburger = document.getElementById("hamburger"); // 对应 index.html 里的 id="hamburger"
const menu = document.querySelector(".menu");

// 点击汉堡按钮：展开/收起菜单
if (hamburger && menu) {
  hamburger.addEventListener("click", () => {
    menu.classList.toggle("menu--show");
  });
}

// 点击页面其他地方时，自动关闭菜单
document.addEventListener("click", (e) => {
  if (
    menu.classList.contains("menu--show") &&
    !menu.contains(e.target) &&
    !hamburger.contains(e.target)
  ) {
    menu.classList.remove("menu--show");
  }
});

// 页面滚动时，自动收起菜单（防止遮挡内容）
window.addEventListener("scroll", () => {
  if (menu.classList.contains("menu--show")) {
    menu.classList.remove("menu--show");
  }
});

/* ==================================================
   可扩展功能（后期可加）
   ================================================== */
// 例如：点击 ESC 键关闭菜单
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && menu.classList.contains("menu--show")) {
    menu.classList.remove("menu--show");
  }
});
