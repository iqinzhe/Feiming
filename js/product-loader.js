document.addEventListener('DOMContentLoaded', function() {
  // 添加前导斜杠确保GitHub Pages路径正确
  fetch('/data/products.json')
    .then(response => response.json())
    .then(data => {
      // ...其余逻辑保持不变...
    })
    .catch(error => {
      console.error('加载产品数据失败:', error);
      document.getElementById('models-container').innerHTML = `
        <div style="color:red; padding:20px; text-align:center;">
          产品加载失败，请刷新重试
        </div>
      `;
    });
});