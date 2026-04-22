// Простой чат-бот с ответами на частые вопросы
const assistantDB = {
  "привет": "👋 Привет! Я помогу найти подходящий ИИ-инструмент. Спроси про категории, VPN или рейтинги!",
  "категории": "📁 Доступные категории:\n• 📝 Текст и ресёрч\n• 🌐 Сайты и MVP\n• 📊 Презентации\n• 🎨 Изображения\n• 🎬 Видео\n• ⚙️ Автоматизация\n• 🔐 Локальный контур",
  "без vpn": "✅ Инструменты без VPN из РФ:\n• GigaChat\n• Lovable\n• Gamma\n• Canva AI\n• Kandinsky\n• n8n\n• Qwen локально",
  "лучший": "⭐ Топ-3 по рейтингу:\n1. ChatGPT (10/10) — универсален, но нужен VPN\n2. Claude (10/10) — для длинных документов, нужен VPN\n3. Lovable (9/10) — создание MVP, работает без VPN",
  "текст": "📝 Для работы с текстом рекомендую:\n• ChatGPT/Claude — если есть VPN\n• GigaChat/YandexGPT — если нужен русский контекст и работа без VPN",
  "изображения": "🎨 Для генерации изображений:\n• Midjourney — лучшее качество (нужен VPN)\n• Kandinsky — бесплатно, по-русски, без VPN",
  "помощь": "💡 Как пользоваться:\n1. Введи запрос в поиск сверху\n2. Выбери категорию или фильтр по VPN\n3. Нажми на карточку, чтобы перейти на сайт инструмента",
  "default": "🤔 Не совсем понял вопрос. Попробуй спросить:\n• «какие инструменты без VPN?»\n• «что лучше для презентаций?»\n• «покажи категории»"
};

function getAnswer(query) {
  const q = query.toLowerCase().trim();
  for (const [key, answer] of Object.entries(assistantDB)) {
    if (q.includes(key)) return answer;
  }
  return assistantDB.default;
}

// DOM элементы помощника
const assistantBtn = document.getElementById('assistantBtn');
const assistantFloat = document.getElementById('assistantFloat');
const assistantClose = document.getElementById('assistantClose');
const assistantWidget = document.getElementById('assistantWidget');
const assistantChat = document.getElementById('assistantChat');
const assistantMessage = document.getElementById('assistantMessage');
const assistantSend = document.getElementById('assistantSend');

function toggleAssistant() {
  assistantWidget?.classList.toggle('hidden');
}

function addMessage(text, isUser = false) {
  if (!assistantChat) return;
  const msg = document.createElement('div');
  msg.className = `message ${isUser ? 'user' : 'bot'}`;
  msg.textContent = text;
  assistantChat.appendChild(msg);
  assistantChat.scrollTop = assistantChat.scrollHeight;
}

function handleSend() {
  const text = assistantMessage?.value.trim();
  if (!text) return;
  
  addMessage(text, true);
  assistantMessage.value = '';
  
  // Имитация "печатает..."
  setTimeout(() => {
    addMessage(getAnswer(text));
  }, 400);
}

// События
assistantBtn?.addEventListener('click', toggleAssistant);
assistantFloat?.addEventListener('click', toggleAssistant);
assistantClose?.addEventListener('click', toggleAssistant);
assistantSend?.addEventListener('click', handleSend);
assistantMessage?.addEventListener('keypress', e => {
  if (e.key === 'Enter') handleSend();
});

// Приветственное сообщение
if (assistantChat) {
  setTimeout(() => addMessage("👋 Привет! Я помогу выбрать ИИ-инструмент. Спроси про категории, VPN или рейтинги!"), 500);
}