document.addEventListener('DOMContentLoaded', function() {
  // 从URL获取系列参数
  const urlParams = new URLSearchParams(window.location.search);
  const seriesId = urlParams.get('series');
  
  if (!seriesId) {
    window.location.href = 'instruments.html';
    return;
  }

  fetch('../data/products.json')
    .then(response => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json().catch(e => {
        throw new Error('无效的JSON格式');
      });
    })
    .then(data => {
      if (!data.series) throw new Error('数据格式错误：缺少series字段');
      
      // 查找当前系列数据
      const series = data.series.find(s => s.id === seriesId.toLowerCase());
      if (!series) {
        throw new Error(`未找到系列ID: ${seriesId}`);
      }

      // =====================
      // 新增D系列特殊逻辑开始
      // =====================
      if (series.id === 'd') {
        // 1. 添加body专属class
        document.body.classList.add('series-d-special');
        
        // 2. 插入动态内容（特色横幅）
        const dynamicSections = document.getElementById('dynamic-sections');
        if (dynamicSections) {
          dynamicSections.innerHTML += `
            <div class="feature-banner">
              <h3>🎸 限量版扭曲琴颈设计</h3>
              <p>现在购买享专属定制服务</p>
            </div>
          `;
        }
      }
      // ===================
      // 新增代码结束
      // ===================

      // 设置页面标题
      document.title = `${series.name} - AX Bass&Guitar`;
      document.getElementById('page-title').textContent = series.name;
      
      // 设置系列标题
      document.getElementById('series-title').textContent = series.name;
      
      // ...保持其余现有代码不变...
      // 包括：创建系列封面、产品卡片、特殊内容区块等逻辑
    })
    .catch(error => {
      console.error('加载失败详情:', error);
      document.getElementById('models-container').innerHTML = `
        <div style="color:red; padding:20px; text-align:center;">
          产品加载失败: ${error.message}<br>
          请检查控制台获取详细信息
        </div>
      `;
    });
});