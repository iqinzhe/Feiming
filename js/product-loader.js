document.addEventListener('DOMContentLoaded', function() {
  const urlParams = new URLSearchParams(window.location.search);
  const seriesId = urlParams.get('series');
  
  if (!seriesId) {
    window.location.href = 'instruments.html';
    return;
  }

  // 添加时间戳防止缓存
  const jsonUrl = `data/products.json?t=${new Date().getTime()}`;
  
fetch('../data/products.json')
  .then(response => {
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json().catch(e => {
      throw new Error('无效的JSON格式');
    });
  })
  .then(data => {
    if (!data.series) throw new Error('数据格式错误：缺少series字段');
    // ...处理数据...
  })
  .catch(error => {
    console.error('加载失败详情:', error);
    alert(`数据加载失败，请检查:\n1. 控制台错误信息\n2. 网络请求状态\n3. 文件路径是否正确`);
  });

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
