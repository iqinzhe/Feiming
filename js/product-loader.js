document.addEventListener('DOMContentLoaded', function() {
  // 从URL获取系列ID
  const urlParams = new URLSearchParams(window.location.search);
  const seriesId = urlParams.get('series') || 'a';
  const modelId = urlParams.get('model');

  // 加载产品数据
  fetch('data/products.json')
    .then(response => response.json())
    .then(data => {
      const series = data.series.find(s => s.id === seriesId);
      if (!series) return;

      // 设置页面标题
      document.title = `${series.name} - AX Bass&Guitar`;
      
      // 渲染系列标题
      document.getElementById('series-title').textContent = series.name;
      
      // 渲染系列封面和描述
      const heroSection = document.getElementById('series-hero');
      heroSection.innerHTML = `
        <img src="${series.cover}" alt="${series.name}" style="max-width:100%; border-radius:8px;"/>
        ${series.description.split('\n').map(p => `<p>${p}</p>`).join('')}
      `;

      // 渲染产品型号
      const modelsContainer = document.getElementById('models-container');
      series.models.forEach(model => {
        if (modelId && model.id !== modelId) return;
        
        modelsContainer.innerHTML += `
          <section class="dynamic-model-card" style="border-color: ${model.ctaColor || '#2196F3'}">
            <img src="${model.image}" alt="${model.name}" style="width:100%; height:auto;"/>
            <div style="padding:20px;">
              <h2>${model.name}</h2>
              <div style="margin-bottom:20px;">
                <h3>产品特点</h3>
                <p>${model.features}</p>
              </div>
              <div>
                <h3>技术规格</h3>
                <ul style="list-style-type: square; padding-left:20px;">
                  ${model.specs.map(spec => `<li>${spec}</li>`).join('')}
                </ul>
              </div>
              <a href="pricing.html" 
                 style="display:inline-block; margin-top:20px; padding:10px 20px; 
                        background:${model.ctaColor || 'rgba(33,150,243,0.7)'}; 
                        color:white; border-radius:5px;">
                立即定制
              </a>
            </div>
          </section>
        `;
      });

      // 渲染D系列特殊区块
      if (series.models[0]?.sections) {
        const sectionsContainer = document.getElementById('dynamic-sections');
        series.models[0].sections.forEach(section => {
          switch (section.type) {
            case 'text-with-image':
              sectionsContainer.innerHTML += `
                <section class="tn-section">
                  <h2>${section.title}</h2>
                  <div class="tn-content" style="${section.layout === 'left' ? '' : 'flex-direction:row-reverse;'}">
                    <img src="${section.image}" alt="${section.title}" style="width:100%; border-radius:5px;"/>
                    <p style="margin:0;">${section.content}</p>
                  </div>
                </section>
              `;
              break;
              
            case 'benefits':
              sectionsContainer.innerHTML += `
                <section class="tn-section tn-benefits">
                  <h2>${section.title}</h2>
                  <div class="tn-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:20px;">
                    ${section.items.map(item => `
                      <div class="tn-card" style="background:rgba(0,0,0,0.2); padding:20px; border-radius:8px;">
                        <h3 style="margin-top:0;">${item.title}</h3>
                        <p>${item.desc}</p>
                      </div>
                    `).join('')}
                  </div>
                </section>
              `;
              break;
              
            case 'comparison':
              sectionsContainer.innerHTML += `
                <section class="tn-section tn-comparison">
                  <h2>${section.title}</h2>
                  <div class="tn-compare" style="display:grid; grid-template-columns:1fr 1fr; gap:20px;">
                    ${section.images.map(img => `
                      <img src="${img}" alt="对比图" style="width:100%; border-radius:5px;"/>
                    `).join('')}
                  </div>
                </section>
              `;
              break;
          }
        });
      }
    });
});