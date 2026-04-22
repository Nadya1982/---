// Данные из документа (добавь остальные по аналогии)
const tools = [
  {
    name: "ChatGPT",
    category: "Текст и ресёрч",
    vpn: "yes",
    rating: 10,
    description: "Универсальный центр работы: тексты, анализ, код, таблицы, файлы, изображения, презентации, прототипы.",
    links: { site: "https://chat.openai.com", api: "https://platform.openai.com" }
  },
  {
    name: "GigaChat",
    category: "Текст и ресёрч",
    vpn: "no",
    rating: 8,
    description: "Русский язык, российский контекст, быстрые бытовые и корпоративные задачи.",
    links: { site: "https://gigachat.sberbank.ru" }
  },
  {
    name: "Lovable",
    category: "Сайты и MVP",
    vpn: "no",
    rating: 9,
    description: "Быстрые MVP, веб-приложения, full-stack разработка на естественном языке.",
    links: { site: "https://lovable.dev" }
  },
  {
    name: "Gamma",
    category: "Презентации",
    vpn: "no",
    rating: 8.5,
    description: "Презентации, документы, мини-сайты, экспорт в PPT и PDF.",
    links: { site: "https://gamma.app" }
  },
  {
    name: "Midjourney",
    category: "Изображения",
    vpn: "yes",
    rating: 8.5,
    description: "Художественные изображения, стилизованные материалы, маркетинг, креатив.",
    links: { site: "https://midjourney.com" }
  },
  {
    name: "Kandinsky",
    category: "Изображения",
    vpn: "no",
    rating: 7.5,
    description: "Русскоязычная генерация изображений, локальные сценарии, бесплатный доступ.",
    links: { site: "https://fusionbrain.ai" }
  },
  {
    name: "n8n",
    category: "Автоматизация",
    vpn: "no",
    rating: 7,
    description: "Интеграции, RAG-боты, пайплайны, агенты, уведомления.",
    links: { site: "https://n8n.io" }
  }
];

// DOM элементы
const grid = document.getElementById('toolsGrid');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const vpnFilter = document.getElementById('vpnFilter');
const resetBtn = document.getElementById('resetBtn');

// Формирование бейджа VPN
function getVPNBage(vpn) {
  if (vpn === 'no') return '<span class="badge vpn-no">✅ Без VPN</span>';
  if (vpn === 'yes') return '<span class="badge vpn-yes">❌ Требуется VPN</span>';
  return '<span class="badge vpn-maybe">⚠️ Нестабильно</span>';
}

// Рендер карточки
function renderCard(tool) {
  const linksHtml = Object.entries(tool.links)
    .map(([key, url]) => `<a href="${url}" target="_blank">${key === 'site' ? '🌐 Сайт' : '🔌 API'}</a>`)
    .join(' ');
  
  return `
    <div class="card">
      <div class="card-header">
        <div class="card-title">${tool.name}</div>
        <span class="badge category">${tool.category}</span>
      </div>
      ${getVPNBage(tool.vpn)}
      <div class="card-desc">${tool.description}</div>
      <div class="card-meta">
        <div class="rating"><span class="stars">★</span> ${tool.rating}/10</div>
        <div class="links">${linksHtml}</div>
      </div>
    </div>
  `;
}

// Фильтрация
function filterTools() {
  const query = searchInput.value.toLowerCase();
  const category = categoryFilter.value;
  const vpn = vpnFilter.value;

  const filtered = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(query) || 
                         tool.description.toLowerCase().includes(query);
    const matchesCategory = !category || tool.category === category;
    const matchesVPN = !vpn || tool.vpn === vpn;
    return matchesSearch && matchesCategory && matchesVPN;
  });

  grid.innerHTML = filtered.length 
    ? filtered.map(renderCard).join('')
    : '<div class="card" style="grid-column:1/-1;text-align:center;padding:40px">😕 Ничего не найдено</div>';
}

// События
searchInput?.addEventListener('input', filterTools);
categoryFilter?.addEventListener('change', filterTools);
vpnFilter?.addEventListener('change', filterTools);
resetBtn?.addEventListener('click', () => {
  searchInput.value = '';
  categoryFilter.value = '';
  vpnFilter.value = '';
  filterTools();
});

// Инициализация
if (grid) filterTools();