document.addEventListener('DOMContentLoaded', function() {
  // 从URL获取系列参数
  const urlParams = new URLSearchParams(window.location.search);
  const seriesId = urlParams.get('series');
  
  if (!seriesId) {
    window.location.href = 'instruments.html';
    return;
  }

  fetch('data/products.json')
    .then(response => response.json())
    .then(data => {
      const series = data.series.find(s => s.id === seriesId.toLowerCase());
      if (!series) {
        window.location.href = 'instruments.html';
        return;
      }

      // 设置页面标题
      document.title = `${series.name} - AX Bass&Guitar`;
      document.getElementById('page-title').textContent = series.name;
      
      // 设置系列标题
      document.getElementById('series-title').textContent = series.name;
      
      // 创建系列封面和描述
      const heroSection = document.getElementById('series-hero');
      heroSection.innerHTML = `
        <div class="hero-content" style="position:relative; height:400px; overflow:hidden;">
          <img src="${series.cover}" alt="${series.name}" style="width:100%; height:100%; object-fit:cover;">
          <div style="position:absolute; bottom:0; left:0; right:0; padding:30px; background:linear-gradient(transparent, rgba(0,0,0,0.8));">
            <p style="margin:0; font-size:1.2em; line-height:1.5;">${series.description.replace(/\n/g, '<br>')}</p>
          </div>
        </div>
      `;
      
      // 创建产品型号卡片
      const modelsContainer = document.getElementById('models-container');
      modelsContainer.innerHTML = series.models.map(model => `
        <div class="dynamic-model-card" style="border-left-color:${model.ctaColor || 'rgba(255,255,255,0.5)'}">
          <div style="padding:20px;">
            <img src="${model.image}" alt="${model.name}" style="width:100%; height:auto; border-radius:8px;">
          </div>
          <div style="padding:20px;">
            <h2 style="margin-top:0;">${model.name}</h2>
            <p style="font-weight:bold;">${model.features}</p>
            <ul style="padding-left:20px;">
              ${model.specs.map(spec => `<li>${spec}</li>`).join('')}
            </ul>
            <button style="margin-top:20px; padding:10px 20px; background:${model.ctaColor || 'rgba(255,255,255,0.2)'}; border:none; border-radius:4px; color:white; cursor:pointer;">
              了解更多
            </button>
          </div>
        </div>
      `).join('');
      
      // 处理D系列的特殊内容区块
      const dynamicSections = document.getElementById('dynamic-sections');
      if (series.id === 'd' && series.models[0].sections) {
        dynamicSections.innerHTML = series.models[0].sections.map(section => {
          if (section.type === 'text-with-image') {
            return `
              <section class="tn-section">
                <div class="tn-content" style="${section.layout === 'left' ? '' : 'flex-direction:row-reverse;'}">
                  <div style="flex:1;">
                    <img src="${section.image}" alt="${section.title}" style="width:100%; height:auto; border-radius:8px;">
                  </div>
                  <div style="flex:2;">
                    <h2>${section.title}</h2>
                    <p style="line-height:1.6;">${section.content}</p>
                  </div>
                </div>
              </section>
            `;
          } else if (section.type === 'benefits') {
            return `
              <section class="tn-section" style="background:rgba(0,0,0,0.1);">
                <div class="tn-content">
                  <h2 style="grid-column:1/-1; text-align:center;">${section.title}</h2>
                  ${section.items.map(item => `
                    <div style="padding:15px; background:rgba(255,255,255,0.05); border-radius:8px;">
                      <h3 style="margin-top:0;">${item.title}</h3>
                      <p style="margin-bottom:0;">${item.desc}</p>
                    </div>
                  `).join('')}
                </div>
              </section>
            `;
          } else if (section.type === 'comparison') {
            return `
              <section class="tn-section">
                <h2 style="text-align:center;">${section.title}</h2>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-top:20px;">
                  <div>
                    <img src="${section.images[0]}" alt="传统琴颈" style="width:100%; height:auto; border-radius:8px;">
                    <p style="text-align:center;">传统琴颈</p>
                  </div>
                  <div>
                    <img src="${section.images[1]}" alt="扭曲琴颈" style="width:100%; height:auto; border-radius:8px;">
                    <p style="text-align:center;">扭曲琴颈</p>
                  </div>
                </div>
              </section>
            `;
          }
          return '';
        }).join('');
      }
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