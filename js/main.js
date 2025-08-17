// 汉堡菜单交互控制
const hamburgerBtn = document.getElementById('hamburgerBtn');
const closeMenuBtn = document.getElementById('closeMenuBtn');
const navMenu = document.getElementById('navMenu');

// 切换菜单状态
function toggleMenu() {
    document.body.classList.toggle('menu-active');
}

// 事件监听
hamburgerBtn.addEventListener('click', toggleMenu);
closeMenuBtn.addEventListener('click', toggleMenu);

// 点击菜单项关闭菜单
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', toggleMenu);
});

// 窗口调整大小时，如果菜单处于打开状态且切换到桌面视图，则关闭菜单
window.addEventListener('resize', () => {
    if (window.innerWidth > 767 && document.body.classList.contains('menu-active')) {
        document.body.classList.remove('menu-active');
    }
});

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', () => {
    console.log('页面加载完成，开始移动端布局学习！');
    
    // 添加视口尺寸显示（仅用于学习）
    const displayViewportSize = () => {
        const sizeInfo = document.createElement('div');
        sizeInfo.id = 'viewport-size';
        sizeInfo.style.position = 'fixed';
        sizeInfo.style.bottom = '10px';
        sizeInfo.style.right = '10px';
        sizeInfo.style.backgroundColor = 'rgba(0,0,0,0.7)';
        sizeInfo.style.color = 'white';
        sizeInfo.style.padding = '5px 10px';
        sizeInfo.style.borderRadius = '4px';
        sizeInfo.style.zIndex = '1000';
        sizeInfo.style.fontSize = '12px';
        document.body.appendChild(sizeInfo);
        
        const updateSize = () => {
            sizeInfo.textContent = `${window.innerWidth}×${window.innerHeight}px`;
        };
        
        updateSize();
        window.addEventListener('resize', updateSize);
    };
    
    displayViewportSize();
});