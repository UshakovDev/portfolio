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
    id: "b2b-catalog",
    category: "direct",
    title: "B2B-каталог на 1С-Битрикс",
    image: "/case-b2b-catalog.svg",
    summary:
      "Доработка B2B-каталога: блок популярных товаров, регистрация, логика выгрузки товаров на сайт и компонент баннера.",
    role:
      "Взял задачи напрямую от заказчика и выполнил их самостоятельно, без команды на проекте.",
    result:
      "Работа принята без замечаний, и заказчик продолжает передавать мне задачи - по этому проекту и по другим.",
    stack: ["1С-Битрикс", "PHP", "JavaScript"],
    caseSlug: "b2b-catalog",
    projectUrl: null,
    repositoryUrl: null,
    contentStatus: "verified",
    isPlaceholder: false,
    published: true,
    case: {
      about:
        "B2B-проект с каталогом товаров. Название заказчика и домен не раскрываются.",
      problem:
        "К моменту подключения часть функциональности каталога оставалась незавершённой: блок популярных товаров, регистрация и выгрузка товаров были доведены не до конца.",
      task:
        "Закрыть незавершённые задачи по каталогу и переработать компонент баннера.",
      responsibility:
        "Все четыре задачи выполнял сам: разбирал существующий код, дорабатывал его и передавал результат заказчику.",
      solution:
        "Завершил блок популярных товаров и регистрацию, привёл в порядок логику выгрузки товаров на сайт, переписал компонент баннера.",
      challenges: [
        "работа в чужой кодовой базе с частично готовой реализацией",
        "доработка отдельных блоков без переписывания остального каталога",
      ],
      result:
        "Все задачи закрыты и приняты, сотрудничество с заказчиком продолжается на других проектах.",
      testimonial: null,
    },
  },
  {
    id: "platform-migration",
    category: "direct",
    title: "Миграция B2B-проекта на новый PHP и 1С-Битрикс",
    image: "/case-platform-migration.svg",
    summary:
      "Оптовый поставщик строительного оборудования: подъём версии PHP с обновлением ядра 1С-Битрикс, всех модулей и базы данных.",
    role:
      "Всю миграцию выполнил самостоятельно: от подъёма PHP и обновления ядра до правки шаблонов и сторонних модулей.",
    result:
      "Задача закрыта в полном объёме - сайт работает на актуальных версиях PHP, 1С-Битрикс и базы данных.",
    stack: ["1С-Битрикс", "PHP", "MySQL"],
    caseSlug: "platform-migration",
    projectUrl: null,
    repositoryUrl: null,
    contentStatus: "verified",
    isPlaceholder: false,
    published: true,
    case: {
      about:
        "Оптовый поставщик строительного оборудования: B2B-каталог с прайс-листом и реализованными проектами. Название заказчика и домен не раскрываются.",
      problem:
        "Сайт работал на устаревшей версии PHP. Обновить только её было нельзя: ядро 1С-Битрикс, внешние модули, база данных и шаблоны с новой версией уже не совместимы.",
      task:
        "Поднять версию PHP и привести к совместимости всю связку: ядро, модули, базу данных и шаблоны.",
      responsibility:
        "Миграцию выполнял полностью сам: определял порядок обновлений, поднимал PHP, обновлял ядро и модули, переводил базу данных и правил шаблоны.",
      solution:
        "Обновил ядро 1С-Битрикс и все модули, включая внешние, перевёл базу данных на версию, совместимую с новым ядром, и привёл шаблоны в соответствие требованиям новой версии PHP.",
      challenges: [
        "модуль SMTP старый и уже не получал обновлений от разработчика - совместимость с новым PHP пришлось дорабатывать вручную",
        "взаимная зависимость обновлений: версии PHP, ядра, модулей и базы данных должны сойтись одновременно",
        "шаблоны переставали работать на новом PHP и требовали правки после каждого шага",
      ],
      result:
        "Задача выполнена в полном объёме: связка PHP, ядра, модулей, базы данных и шаблонов приведена к совместимым актуальным версиям.",
      testimonial: null,
    },
  },
  {
    id: "backup-database",
    category: "direct",
    title: "Резервные копии в облако и разгрузка базы 1С-Битрикс",
    image: "/case-backup-database.svg",
    summary:
      "Оптовый магазин упаковочных материалов: автоматические копии сайта в облако, агенты на cron и разгрузка разросшейся базы данных.",
    role:
      "Сделал всё сам: настроил облачное резервное копирование, перевёл агенты на cron и разгрузил базу данных.",
    result:
      "Копии сайта уходят в облако по расписанию, агенты выполняются штатно, а накопленная за годы статистика убрана из базы.",
    stack: ["1С-Битрикс", "MySQL", "cron"],
    caseSlug: "backup-database",
    projectUrl: null,
    repositoryUrl: null,
    contentStatus: "verified",
    isPlaceholder: false,
    published: true,
    case: {
      about:
        "Оптовый поставщик упаковочных и расходных материалов: гигиеническая продукция, мешки и плёнки, одноразовая посуда. Название заказчика и домен не раскрываются.",
      problem:
        "Агенты 1С-Битрикс не выполнялись, поэтому старая статистика годами не удалялась и её таблицы разрослись до размера, который заметно замедлял сайт. Автоматических резервных копий у проекта тоже не было.",
      task:
        "Настроить автоматическое резервное копирование сайта в облако, перевести агенты на cron и разгрузить базу данных.",
      responsibility:
        "Все работы выполнял сам: настройка резервного копирования, перевод агентов на запуск по cron и чистка базы.",
      solution:
        "Настроил регулярную выгрузку копий сайта в облако и перевёл агенты на cron. Накопленную статистику удалял из базы вручную, небольшими порциями, чтобы не создавать нагрузку на работающий сайт.",
      challenges: [
        "запущенный агент статистики принялся разом чистить данные за все годы, и сайт от этой нагрузки стал заметно медленнее",
        "накопленное пришлось удалять вручную порциями, на работающем магазине и без остановки продаж",
        "чистка базы заняла больше времени, чем планировалось изначально",
      ],
      result:
        "Задача выполнена в полном объёме: копии создаются автоматически, агенты работают по расписанию, а база освобождена от накопленной статистики.",
      testimonial: null,
    },
  },
  {
    id: "arsenal-rent",
    category: "studio",
    title: "arsenal-rent.ru",
    image: "/arsenal-rent.ru.webp",
    summary:
      "Сайт аренды автомобилей на 1С-Битрикс с решением Аспро: каталог по категориям, страницы услуг и документов, формы обращения.",
    role:
      "Проект выполнен командой SP-ArtGroup. Я вёл техническую поддержку: обновлял платформу 1С-Битрикс и её модули, поддерживал в актуальном состоянии решение Аспро и сторонние модули, развивал пользовательские сценарии сайта.",
    result:
      "Сайт продолжает работать на поддерживаемых версиях платформы и решения, что сохраняет совместимость модулей и возможность дальнейших доработок.",
    stack: ["1С-Битрикс", "Аспро", "PHP", "JavaScript"],
    caseSlug: null,
    projectUrl: "https://arsenal-rent.ru",
    repositoryUrl: null,
    contentStatus: "verified",
    isPlaceholder: false,
    published: true,
  },
  {
    id: "asyastroy",
    category: "studio",
    title: "asyastroy.ru",
    image: "/asyastroy.ru.webp",
    summary:
      "Интернет-магазин строительных и отделочных материалов: каталог на десятки тысяч товаров, личный кабинет, выбор города и рассрочка.",
    role:
      "Проект выполнен командой SP-ArtGroup. Я вёл поддержку и развитие: обновлял 1С-Битрикс, его модули и сторонние решения, внедрял и настраивал платёжные модули под требования клиента, дорабатывал обмен данными и пользовательские сценарии, устранял последствия вирусного заражения и ускорял сайт на стороне сервера - перевёл хранение кеша в Redis и подключил поисковый движок Sphinx.",
    result:
      "Крупный каталог стал отзывчивее для покупателей, а сайт - устойчивее: кеширование и поиск ушли на Redis и Sphinx.",
    stack: ["1С-Битрикс", "PHP", "Redis", "Sphinx"],
    caseSlug: null,
    projectUrl: "https://asyastroy.ru",
    repositoryUrl: null,
    contentStatus: "verified",
    isPlaceholder: false,
    published: true,
  },
  {
    id: "faw28",
    category: "studio",
    title: "faw28.ru",
    image: "/faw28.ru.webp",
    summary:
      "Интернет-магазин запчастей для грузовиков FAW: каталог по узлам и моделям двигателей, подбор деталей и заявка на поиск нужной позиции.",
    role:
      "Проект выполнен командой SP-ArtGroup. Я вёл поддержку и развитие: сделал интеграцию каталога товаров с Авито и Дром, обновлял 1С-Битрикс, все его модули и сторонние решения, включая Аспро, дорабатывал обмен данными и пользовательские сценарии, ускорял работу сайта и устранял последствия вирусного заражения.",
    result:
      "Ассортимент публикуется на Авито и Дром из того же каталога, что и на сайте, без отдельного ведения объявлений.",
    stack: ["1С-Битрикс", "Аспро", "PHP", "Авито", "Дром"],
    caseSlug: null,
    projectUrl: "https://faw28.ru",
    repositoryUrl: null,
    contentStatus: "verified",
    isPlaceholder: false,
    published: true,
  },
  {
    id: "snab28",
    category: "studio",
    title: "snab28.ru",
    image: "/snab28.ru.webp",
    summary:
      "Интернет-магазин снабжения для организаций и частных покупателей: инструмент, крепёж, сантехника, спецодежда и отделочные материалы.",
    role:
      "Проект выполнен командой SP-ArtGroup. Я отвечал за поддержку и развитие: под требования российского законодательства ограничил регистрацию через иностранные почтовые сервисы, обновлял 1С-Битрикс, все его модули и сторонние решения, дорабатывал обмен данными и пользовательские сценарии, ускорял работу сайта и закрывал поток небольших доработок.",
    result:
      "Регистрация новых покупателей приведена в соответствие с требованиями законодательства к почтовым сервисам.",
    stack: ["1С-Битрикс", "PHP", "JavaScript"],
    caseSlug: null,
    projectUrl: "https://snab28.ru",
    repositoryUrl: null,
    contentStatus: "verified",
    isPlaceholder: false,
    published: true,
  },
  {
    id: "treid28",
    category: "studio",
    title: "трейд28.рф",
    image: "/xn--28-jlcdu4bn.xn--p1ai.webp",
    summary:
      "Сайт продажи спецтехники и запчастей: погрузчики, автокраны, тралы и полуприцепы, двигатели и поиск по названию техники.",
    role:
      "Проект выполнен командой SP-ArtGroup. На мне были поддержка и развитие: настроил интеграцию каталога с Дром и Фарпост, перенёс кеширование на Memcached и подключил поисковый движок Sphinx, обновлял 1С-Битрикс, все его модули и сторонние решения, включая Феникс, пользовательские сценарии, устранял последствия вирусного заражения и закрывал мелкие доработки.",
    result:
      "Поиск по названию техники работает через Sphinx, а кеширование на Memcached ускоряет выдачу каталога.",
    stack: ["1С-Битрикс", "Феникс", "PHP", "Memcached", "Sphinx"],
    caseSlug: null,
    projectUrl: "https://xn--28-jlcdu4bn.xn--p1ai",
    repositoryUrl: null,
    contentStatus: "verified",
    isPlaceholder: false,
    published: true,
  },
  {
    id: "endoscopia28",
    category: "studio",
    title: "endoscopia28.ru",
    image: "/endoscopia28.ru.webp",
    summary:
      "Сайт центра эндоскопической хирургии: направления приёма, платные услуги, операции по полису ОМС и запись на приём.",
    role:
      "Проект выполнен командой SP-ArtGroup. Я занимался поддержкой и развитием: привёл все формы сайта в соответствие требованиям российского законодательства, обновлял 1С-Битрикс, все его модули и сторонние решения, дорабатывал пользовательские сценарии.",
    result:
      "Формы сайта, включая запись на приём, оформлены по требованиям законодательства к сбору данных посетителей.",
    stack: ["1С-Битрикс", "PHP", "JavaScript"],
    caseSlug: null,
    projectUrl: "https://endoscopia28.ru",
    repositoryUrl: null,
    contentStatus: "verified",
    isPlaceholder: false,
    published: true,
  },
  {
    id: "tvoyaapteka",
    category: "studio",
    title: "tvoyaapteka.ru",
    image: "/tvoyaapteka.ru.webp",
    summary:
      "Интернет-аптека: каталог с наличием товаров в аптеках, акции и хиты продаж, самовывоз или доставка заказа.",
    role:
      "Проект выполнен командой SP-ArtGroup. Моя часть - поддержка и развитие пользовательских сценариев: собирал нестандартные выгрузки из базы данных для аналитики и вёл текущие правки по сайту - формы, отображение блоков и другие небольшие задачи.",
    result:
      "Штатных отчётов для нужной аналитики не хватало - данные готовились отдельными выгрузками из базы под конкретные запросы.",
    stack: ["1С-Битрикс", "PHP", "JavaScript", "MySQL"],
    caseSlug: null,
    projectUrl: "https://www.tvoyaapteka.ru",
    repositoryUrl: null,
    contentStatus: "verified",
    isPlaceholder: false,
    published: true,
  },
  {
    id: "mmill",
    category: "studio",
    title: "mmill.ru",
    image: "/mmill.ru.webp",
    summary:
      "Сайт производителя промышленного оборудования: каталог мельниц для помола, сферы применения и заявка на подбор оборудования.",
    role:
      "Проект выполнен командой SP-ArtGroup. Я работал на поддержке и развитии сайта: настраивал каталог под требования клиента, правил формы и отображение отдельных блоков, разбирал текущие задачи по мере поступления.",
    result:
      "Каталог и формы приведены к виду, который требовался клиенту, без переработки остального сайта.",
    stack: ["1С-Битрикс", "PHP", "JavaScript", "HTML/CSS"],
    caseSlug: null,
    projectUrl: "https://mmill.ru",
    repositoryUrl: null,
    contentStatus: "verified",
    isPlaceholder: false,
    published: true,
  },
  {
    id: "shtormauto",
    category: "studio",
    title: "shtormauto.ru",
    image: "/shtormauto.ru.webp",
    summary:
      "Интернет-магазин шин, дисков и аккумуляторов: подбор по параметрам и госномеру, бонусная программа и онлайн-запись.",
    role:
      "Проект выполнен командой SP-ArtGroup. Мои задачи - поддержка и развитие: устранял сбои в приёме платежей через Paygine, чистил сайт от вредоносного кода и дорабатывал пользовательские сценарии.",
    result:
      "Оплата заказов через Paygine работает штатно, вредоносный код с сайта удалён.",
    stack: ["1С-Битрикс", "PHP", "JavaScript", "Paygine"],
    caseSlug: null,
    projectUrl: "https://shtormauto.ru",
    repositoryUrl: null,
    contentStatus: "verified",
    isPlaceholder: false,
    published: true,
  },
  {
    id: "domobuvi",
    category: "studio",
    title: "domobuvi.shop",
    image: "/domobuvi.shop.webp",
    summary:
      "Интернет-магазин обуви для всей семьи: каталог по категориям и брендам, подбор размера и раздел с ответами покупателям.",
    role:
      "Проект выполнен командой SP-ArtGroup. Моя основная работа - обновления: поднимал ядро 1С-Битрикс, все его модули и решение Аспро до актуальных версий, следя за совместимостью магазина.",
    result:
      "Ядро, модули и Аспро подняты до актуальных версий, каталог и оформление заказа продолжили работать без сбоев.",
    stack: ["1С-Битрикс", "Аспро", "PHP"],
    caseSlug: null,
    projectUrl: "https://domobuvi.shop",
    repositoryUrl: null,
    contentStatus: "verified",
    isPlaceholder: false,
    published: true,
  },
  {
    id: "berloga28",
    category: "studio",
    title: "berloga28.ru",
    image: "/berloga28.ru.webp",
    summary:
      "Сайт базы отдыха: номера, коттеджи, беседки и банкетные залы, услуги, акции и бронирование размещения.",
    role:
      "Проект выполнен командой SP-ArtGroup. Я подключил сайт к системе бронирования Frontdesk24, устранял ошибки в работе сайта и обновлял решение Аспро вместе с остальными модулями.",
    result:
      "Заявки на размещение с сайта попадают напрямую в Frontdesk24, где база отдыха ведёт загрузку номеров.",
    stack: ["1С-Битрикс", "Аспро", "PHP", "Frontdesk24"],
    caseSlug: null,
    projectUrl: "https://berloga28.ru",
    repositoryUrl: null,
    contentStatus: "verified",
    isPlaceholder: false,
    published: true,
  },
  {
    id: "realvita",
    category: "studio",
    title: "realvita.ru",
    image: "/realvita.ru.webp",
    summary:
      "Сайт детского медицинского центра: врачи и услуги, прейскурант, программы наблюдения, прививки и выезд на дом.",
    role:
      "Проект выполнен командой SP-ArtGroup. Я обновлял 1С-Битрикс и закрывал доработки по запросам клиента - в том числе сделал запись к врачу с выбором специалиста по категориям.",
    result:
      "Родители записываются к врачу, выбирая специалиста по категории, а не просматривая общий список.",
    stack: ["1С-Битрикс", "PHP", "JavaScript"],
    caseSlug: null,
    projectUrl: "https://realvita.ru",
    repositoryUrl: null,
    contentStatus: "verified",
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
