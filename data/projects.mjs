export const DEFAULT_PROJECT_CATEGORY = "personal";

export const projectCategories = [
  { id: "personal", label: "Собственные разработки" },
  { id: "direct", label: "Самостоятельные заказы" },
  { id: "studio", label: "В составе команды" },
];

export const projects = [
  {
    id: "ushakov-cookie",
    category: "personal",
    title: "ushakov.cookie",
    image: "/ushakov.cookie.webp",
    summary:
      "Модуль cookie-consent для 1С-Битрикс: управляет принятием и отклонением категорий cookies и хранит реестр согласий.",
    role: "Самостоятельно спроектировал и реализовал модуль как собственный проект.",
    result:
      "Согласия посетителей и подключение аналитических сценариев собраны в одном управляемом решении.",
    stack: ["1С-Битрикс", "PHP", "JavaScript", "Bitrix D7"],
    caseSlug: null,
    projectUrl: null,
    repositoryUrl: "https://github.com/UshakovDev/ushakov.cookie",
    contentStatus: "source-verified",
    isPlaceholder: false,
    published: true,
  },
  {
    id: "ushakov-telegram",
    category: "personal",
    title: "ushakov.telegram",
    image: "/ushakov.telegram.webp",
    summary:
      "Модуль уведомлений для 1С-Битрикс: передаёт сотрудникам и покупателям события заказов, оплат и смены статусов.",
    role: "Самостоятельно разработал интеграцию сайта с Telegram Bot API.",
    result:
      "События интернет-магазина можно доставлять в Telegram и связывать с конкретными пользователями.",
    stack: ["1С-Битрикс", "PHP", "Bitrix D7", "Telegram Bot API"],
    caseSlug: null,
    projectUrl: null,
    repositoryUrl: "https://github.com/UshakovDev/ushakov.telegram",
    contentStatus: "source-verified",
    isPlaceholder: false,
    published: true,
  },
  {
    id: "anonymous-telegram-chatbot",
    category: "personal",
    title: "Anonymous Telegram Chatbot",
    image: "/Anonymous-Telegram-chatbot.webp",
    summary:
      "Telegram-бот для анонимного общения с подбором собеседников, рейтингами, блокировками и служебными рассылками.",
    role: "Самостоятельно реализовал серверную часть, сценарии бота и фоновые операции.",
    result:
      "Основные пользовательские и административные сценарии объединены в одном приложении.",
    stack: ["Python", "Django", "Telegram API", "Redis", "Celery"],
    caseSlug: null,
    projectUrl: null,
    repositoryUrl: "https://github.com/UshakovDev/Anonymous-Telegram-chatbot",
    contentStatus: "source-verified",
    isPlaceholder: false,
    published: true,
  },
  {
    id: "youtube-proxy",
    category: "personal",
    title: "youtube-proxy",
    image: "/youtube-proxy.webp",
    summary:
      "Асинхронный HTTPS CONNECT proxy с фрагментацией трафика и подготовленными вариантами запуска для Windows и Debian.",
    role: "Самостоятельно разработал сетевой сервис и сценарии установки.",
    result:
      "Получился переносимый инструмент с отдельными вариантами запуска для локальной машины и Linux-сервера.",
    stack: ["Python", "asyncio", "HTTPS CONNECT", "systemd"],
    caseSlug: null,
    projectUrl: null,
    repositoryUrl: "https://github.com/UshakovDev/youtube-proxy",
    contentStatus: "source-verified",
    isPlaceholder: false,
    published: true,
  },
  {
    id: "demo-bitrix-store",
    category: "direct",
    title: "Интернет-магазин на 1С-Битрикс — демонстрационный кейс",
    image: "/thumb111.jpg",
    summary:
      "Тестовый пример самостоятельного заказа: доработка каталога и сценария оформления заказа.",
    role: "Тестовые данные: анализ задачи, разработка компонентов и проверка результата.",
    result: "Тестовый результат: ключевой пользовательский сценарий работает по согласованной логике.",
    stack: ["1С-Битрикс", "PHP", "JavaScript", "MySQL"],
    caseSlug: "bitrix-store-example",
    projectUrl: null,
    repositoryUrl: null,
    contentStatus: "placeholder",
    isPlaceholder: true,
    published: false,
    case: {
      about:
        "Демонстрационный интернет-магазин. Название клиента, домен и фактическое описание необходимо заменить перед публикацией.",
      problem:
        "Тестовая ситуация: стандартный каталог не учитывал часть бизнес-правил, а оформление заказа требовало лишних действий.",
      task:
        "Уточнить требования, доработать каталог и упростить путь пользователя до отправки заказа.",
      responsibility:
        "Тестовые данные: аудит существующего решения, PHP- и JavaScript-доработки, проверка интеграций.",
      solution:
        "Тестовый вариант решения: отдельные компоненты каталога, серверная валидация и обновлённый сценарий оформления.",
      challenges: [
        "сохранение совместимости с существующими данными",
        "работа без полной переработки проекта",
        "проверка пользовательского сценария на разных устройствах",
      ],
      result:
        "Тестовый результат без вымышленных метрик: согласованный сценарий реализован и передан на проверку.",
      testimonial: null,
    },
  },
  {
    id: "demo-telegram-integration",
    category: "direct",
    title: "Интеграция заявок с Telegram — демонстрационный кейс",
    image: "/thumb222.jpg",
    summary:
      "Тестовый пример самостоятельного заказа: доставка заявок с сайта ответственным сотрудникам в Telegram.",
    role: "Тестовые данные: проектирование обмена, обработка формы и настройка уведомлений.",
    result: "Тестовый результат: заявка проходит валидацию и доставляется в выбранный Telegram-чат.",
    stack: ["JavaScript", "PHP", "REST API", "Telegram Bot API"],
    caseSlug: "telegram-leads-example",
    projectUrl: null,
    repositoryUrl: null,
    contentStatus: "placeholder",
    isPlaceholder: true,
    published: false,
    case: {
      about:
        "Демонстрационный кейс интеграции формы сайта с Telegram. Все сведения о клиенте и результате являются шаблоном.",
      problem:
        "Тестовая ситуация: обращения обрабатывались вручную и могли остаться без своевременного уведомления.",
      task:
        "Организовать проверяемую отправку заявок в Telegram и понятную обработку ошибок.",
      responsibility:
        "Тестовые данные: схема обмена, серверный обработчик, интеграция Telegram Bot API и техническая проверка.",
      solution:
        "Тестовый вариант решения: сервер принимает форму, валидирует поля, отправляет сообщение и возвращает интерфейсу понятный статус.",
      challenges: [
        "защита формы от автоматических отправок",
        "корректная обработка недоступности внешнего API",
        "исключение чувствительных данных из журналов",
      ],
      result:
        "Тестовый результат без реальных показателей: полный путь от формы до уведомления готов к приёмочной проверке.",
      testimonial: null,
    },
  },
  {
    id: "demo-catalog-automation",
    category: "direct",
    title: "Автоматизация каталога — демонстрационный кейс",
    image: "/thumb333.jpg",
    summary:
      "Тестовый пример самостоятельного заказа: автоматизация обновления товарных данных из внешнего источника.",
    role: "Тестовые данные: анализ формата, разработка импорта и диагностика ошибок обмена.",
    result: "Тестовый результат: обновление каталога выполняется повторяемо и формирует понятный отчёт.",
    stack: ["Python", "REST API", "PostgreSQL", "Docker"],
    caseSlug: "catalog-automation-example",
    projectUrl: null,
    repositoryUrl: null,
    contentStatus: "placeholder",
    isPlaceholder: true,
    published: false,
    case: {
      about:
        "Демонстрационный кейс автоматизации товарного каталога. Перед публикацией требуется заменить весь контент фактическими данными.",
      problem:
        "Тестовая ситуация: товарные данные обновлялись вручную, а причины ошибок было сложно определить.",
      task:
        "Создать повторяемый импорт, проверку входных данных и отчёт о проблемных записях.",
      responsibility:
        "Тестовые данные: проектирование процесса, реализация обработки данных и подготовка запуска.",
      solution:
        "Тестовый вариант решения: фоновый импорт получает данные, валидирует их, обновляет каталог и записывает итоговый статус.",
      challenges: [
        "частично заполненные записи во внешнем источнике",
        "повторный запуск без дублирования данных",
        "ограничение нагрузки на рабочий сайт",
      ],
      result:
        "Тестовый результат без вымышленных цифр: процесс можно запускать повторно, а ошибки доступны для дальнейшего разбора.",
      testimonial: null,
    },
  },
  {
    id: "arsenal-rent",
    category: "studio",
    title: "arsenal-rent.ru",
    image: "/arsenal-rent.ru.webp",
    summary: "Черновой пример описания: развитие каталога услуг и пользовательских сценариев сайта аренды.",
    role: "Проект выполнен командой SP-ArtGroup. Тестовая формулировка вклада: доработка компонентов и интерфейсов.",
    result: "Результат для публикации нужно заменить подтверждённой формулировкой.",
    stack: ["1С-Битрикс", "PHP", "JavaScript", "HTML/CSS"],
    caseSlug: null,
    projectUrl: "https://arsenal-rent.ru",
    repositoryUrl: null,
    contentStatus: "draft",
    isPlaceholder: false,
    published: true,
  },
  {
    id: "asyastroy",
    category: "studio",
    title: "asyastroy.ru",
    image: "/asyastroy.ru.webp",
    summary: "Черновой пример описания: доработки информационных разделов и форм строительного сайта.",
    role: "Проект выполнен командой SP-ArtGroup. Тестовая формулировка вклада: шаблоны страниц и обработка форм.",
    result: "Результат для публикации нужно заменить подтверждённой формулировкой.",
    stack: ["1С-Битрикс", "PHP", "JavaScript", "HTML/CSS"],
    caseSlug: null,
    projectUrl: "https://asyastroy.ru",
    repositoryUrl: null,
    contentStatus: "draft",
    isPlaceholder: false,
    published: true,
  },
  {
    id: "faw28",
    category: "studio",
    title: "faw28.ru",
    image: "/faw28.ru.webp",
    summary: "Черновой пример описания: поддержка каталога автомобилей и связанных форм обращения.",
    role: "Проект выполнен командой SP-ArtGroup. Тестовая формулировка вклада: доработка каталога и клиентских форм.",
    result: "Результат для публикации нужно заменить подтверждённой формулировкой.",
    stack: ["1С-Битрикс", "PHP", "JavaScript", "HTML/CSS"],
    caseSlug: null,
    projectUrl: "https://faw28.ru",
    repositoryUrl: null,
    contentStatus: "draft",
    isPlaceholder: false,
    published: true,
  },
  {
    id: "snab28",
    category: "studio",
    title: "snab28.ru",
    image: "/snab28.ru.webp",
    summary: "Черновой пример описания: развитие товарного каталога и структуры коммерческого сайта.",
    role: "Проект выполнен командой SP-ArtGroup. Тестовая формулировка вклада: компоненты каталога и технические исправления.",
    result: "Результат для публикации нужно заменить подтверждённой формулировкой.",
    stack: ["1С-Битрикс", "PHP", "JavaScript", "HTML/CSS"],
    caseSlug: null,
    projectUrl: "https://snab28.ru",
    repositoryUrl: null,
    contentStatus: "draft",
    isPlaceholder: false,
    published: true,
  },
  {
    id: "regional-school",
    category: "studio",
    title: "xn--28-jlcdu4bn.xn--p1ai",
    image: "/xn--28-jlcdu4bn.xn--p1ai.webp",
    summary: "Черновой пример описания: обновление разделов и компонентов информационного сайта.",
    role: "Проект выполнен командой SP-ArtGroup. Тестовая формулировка вклада: шаблоны и адаптивные интерфейсы.",
    result: "Результат для публикации нужно заменить подтверждённой формулировкой.",
    stack: ["1С-Битрикс", "PHP", "JavaScript", "HTML/CSS"],
    caseSlug: null,
    projectUrl: "https://xn--28-jlcdu4bn.xn--p1ai",
    repositoryUrl: null,
    contentStatus: "draft",
    isPlaceholder: false,
    published: true,
  },
  {
    id: "endoscopia28",
    category: "studio",
    title: "endoscopia28.ru",
    image: "/endoscopia28.ru.webp",
    summary: "Черновой пример описания: доработка медицинского информационного сайта и форм записи.",
    role: "Проект выполнен командой SP-ArtGroup. Тестовая формулировка вклада: компоненты контента и формы.",
    result: "Результат для публикации нужно заменить подтверждённой формулировкой.",
    stack: ["1С-Битрикс", "PHP", "JavaScript", "HTML/CSS"],
    caseSlug: null,
    projectUrl: "https://endoscopia28.ru",
    repositoryUrl: null,
    contentStatus: "draft",
    isPlaceholder: false,
    published: true,
  },
  {
    id: "tvoyaapteka",
    category: "studio",
    title: "tvoyaapteka.ru",
    image: "/tvoyaapteka.ru.webp",
    summary: "Черновой пример описания: поддержка каталога, поиска и пользовательских сценариев аптечного сайта.",
    role: "Проект выполнен командой SP-ArtGroup. Тестовая формулировка вклада: исправления каталога и интеграций.",
    result: "Результат для публикации нужно заменить подтверждённой формулировкой.",
    stack: ["1С-Битрикс", "PHP", "JavaScript", "HTML/CSS"],
    caseSlug: null,
    projectUrl: "https://www.tvoyaapteka.ru",
    repositoryUrl: null,
    contentStatus: "draft",
    isPlaceholder: false,
    published: true,
  },
  {
    id: "mmill",
    category: "studio",
    title: "mmill.ru",
    image: "/mmill.ru.webp",
    summary: "Черновой пример описания: развитие каталога и технических разделов коммерческого сайта.",
    role: "Проект выполнен командой SP-ArtGroup. Тестовая формулировка вклада: серверные доработки и интерфейсы.",
    result: "Результат для публикации нужно заменить подтверждённой формулировкой.",
    stack: ["1С-Битрикс", "PHP", "JavaScript", "HTML/CSS"],
    caseSlug: null,
    projectUrl: "https://mmill.ru",
    repositoryUrl: null,
    contentStatus: "draft",
    isPlaceholder: false,
    published: true,
  },
  {
    id: "shtormauto",
    category: "studio",
    title: "shtormauto.ru",
    image: "/shtormauto.ru.webp",
    summary: "Черновой пример описания: поддержка автомобильного каталога и форм обратной связи.",
    role: "Проект выполнен командой SP-ArtGroup. Тестовая формулировка вклада: каталог и исправление ошибок.",
    result: "Результат для публикации нужно заменить подтверждённой формулировкой.",
    stack: ["1С-Битрикс", "PHP", "JavaScript", "HTML/CSS"],
    caseSlug: null,
    projectUrl: "https://shtormauto.ru",
    repositoryUrl: null,
    contentStatus: "draft",
    isPlaceholder: false,
    published: true,
  },
  {
    id: "domobuvi",
    category: "studio",
    title: "domobuvi.shop",
    image: "/domobuvi.shop.webp",
    summary: "Черновой пример описания: доработка каталога, карточек товара и оформления заказа.",
    role: "Проект выполнен командой SP-ArtGroup. Тестовая формулировка вклада: компоненты магазина и клиентский интерфейс.",
    result: "Результат для публикации нужно заменить подтверждённой формулировкой.",
    stack: ["1С-Битрикс", "PHP", "JavaScript", "HTML/CSS"],
    caseSlug: null,
    projectUrl: "https://domobuvi.shop",
    repositoryUrl: null,
    contentStatus: "draft",
    isPlaceholder: false,
    published: true,
  },
  {
    id: "berloga28",
    category: "studio",
    title: "berloga28.ru",
    image: "/berloga28.ru.webp",
    summary: "Черновой пример описания: развитие товарных разделов и адаптивного интерфейса сайта.",
    role: "Проект выполнен командой SP-ArtGroup. Тестовая формулировка вклада: шаблоны, формы и технические исправления.",
    result: "Результат для публикации нужно заменить подтверждённой формулировкой.",
    stack: ["1С-Битрикс", "PHP", "JavaScript", "HTML/CSS"],
    caseSlug: null,
    projectUrl: "https://berloga28.ru",
    repositoryUrl: null,
    contentStatus: "draft",
    isPlaceholder: false,
    published: true,
  },
  {
    id: "realvita",
    category: "studio",
    title: "realvita.ru",
    image: "/realvita.ru.webp",
    summary: "Черновой пример описания: доработки каталога и информационных разделов коммерческого сайта.",
    role: "Проект выполнен командой SP-ArtGroup. Тестовая формулировка вклада: серверная логика и интерфейсные исправления.",
    result: "Результат для публикации нужно заменить подтверждённой формулировкой.",
    stack: ["1С-Битрикс", "PHP", "JavaScript", "HTML/CSS"],
    caseSlug: null,
    projectUrl: "https://realvita.ru",
    repositoryUrl: null,
    contentStatus: "draft",
    isPlaceholder: false,
    published: true,
  },
];

export function getProjectsByCategory(category, items = projects) {
  return items.filter((project) => project.category === category);
}

export function getAvailableProjectCategories(items = projects) {
  return projectCategories.filter((category) =>
    items.some((project) => project.category === category.id)
  );
}

export function getDefaultProjectCategory(items = projects) {
  const available = getAvailableProjectCategories(items);
  return available.some((category) => category.id === DEFAULT_PROJECT_CATEGORY)
    ? DEFAULT_PROJECT_CATEGORY
    : available[0]?.id || null;
}

export function resolveProjectCategory(hash, items = projects) {
  let candidate = "";

  try {
    candidate = decodeURIComponent(String(hash || "").replace(/^#/, "")).toLowerCase();
  } catch {
    candidate = "";
  }

  const availableIds = getAvailableProjectCategories(items).map((category) => category.id);
  return availableIds.includes(candidate) ? candidate : getDefaultProjectCategory(items);
}

export function getCaseProjects(items = projects) {
  return items.filter((project) => Boolean(project.caseSlug && project.case));
}

export function getPublishedCaseProjects(items = projects) {
  return getCaseProjects(items).filter(
    (project) => project.published === true && project.isPlaceholder !== true
  );
}

export function getProjectBySlug(slug, items = projects) {
  return getCaseProjects(items).find((project) => project.caseSlug === slug) || null;
}
