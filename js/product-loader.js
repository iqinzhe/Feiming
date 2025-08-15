document.addEventListener('DOMContentLoaded', function() {
  const urlParams = new URLSearchParams(window.location.search);
  const seriesId = urlParams.get('series');
  
  if (!seriesId) {
    window.location.href = 'instruments.html';
    return;
  }

  // 添加时间戳防止缓存
  const jsonUrl = `data/products.json?t=${new Date().getTime()}`;
  
  fetch(jsonUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`服务器返回: ${response.status} ${response.statusText}`);
      }
      return response.json().catch(e => {
        throw new Error('JSON解析失败: ' + e.message);
      });
    })
    .then(data => {
      console.log('加载的产品数据:', data);
      const series = data.series.find(s => s.id === seriesId.toLowerCase());
      
      if (!series) {
        throw new Error(`未找到系列ID: ${seriesId}`);
      }

      // ...保持原有的成功处理逻辑...
    })
    .catch(error => {
      console.error('完整错误:', error);
      const errorMsg = `产品加载失败: ${error.message}.<br> 
                       请求URL: ${jsonUrl}<br>
                       请检查: <br>
                       1. 文件是否存在<br>
                       2. 文件内容是否为有效JSON<br>
                       3. 控制台网络请求详情`;
      
      document.getElementById('models-container').innerHTML = `
        <div style="color:red; padding:20px; text-align:center;">
          ${errorMsg}
        </div>
      `;
    });
});