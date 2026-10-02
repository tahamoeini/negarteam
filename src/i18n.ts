import { constraints, prompts, type Project, type ProjectId } from './data/projects'

export type Locale = 'en' | 'ru' | 'zh'

export const localeNames: Record<Locale, string> = {
  en: 'English',
  ru: 'Русский',
  zh: '简体中文',
}

type ProjectCopy = Pick<Project, 'question' | 'description' | 'category' | 'system' | 'action' | 'stage'>
type LocalizedPrompt = { statement: string; response: string }

type Copy = {
  languageLabel: string
  theme: { switchToDark: string; switchToLight: string; dark: string; light: string }
  skip: string
  home: string
  header: string
  hero: { index: string; indexDate: string; title: string[]; summary: string; fields: string[]; enter: string; foot: string[] }
  origin: { kicker: string; heading: string; habit: string; thought: string; outcomes: string[]; note: string }
  questions: { kicker: string; kickerNote: string; heading: string; view: string; choose: string; perspectives: Record<'products' | 'questions' | 'systems', string>; form: string; system: string; unknownLabel: string; unknown: string; askAgain: string; caption: string }
  interrupt: { top: string[]; question: string; title: string[]; note: string }
  constraints: { kicker: string; title: string[]; aside: string[]; items: [string, string][] }
  test: { kicker: string; asideLabel: string; aside: string[]; title: string[]; question: string; currentRead: string; next: string; seeResult: string; conclusion: string; result: string[]; again: string }
  domains: { kicker: string; title: string[]; items: [string, string, string][]; note: string }
  margin: { label: string; title: string[]; paragraphs: string[]; author: string }
  closing: { signal: string; title: string[]; paragraphs: string[]; invitation: string[]; github: string; more: string; footer: string[]; back: string }
  projectPerspective: Record<'products' | 'questions' | 'systems', string>
  projects: Partial<Record<ProjectId, ProjectCopy>>
}

export const copy: Record<Locale, Copy> = {
  en: {
    languageLabel: 'Language', theme: { switchToDark: 'Switch to dark theme', switchToLight: 'Switch to light theme', dark: 'Dark', light: 'Light' }, skip: 'Skip to content', home: 'Negar Team, home', header: 'A map of what we’re figuring out',
    hero: { index: 'FIELD NOTES', indexDate: '001 — ONGOING', title: ['Start with a question.', 'Look closely.', 'Let the work take shape.'], summary: 'We begin by understanding the problem,\nthen decide what form an answer should take.', fields: ['Technology', 'Products', 'Systems', 'Research', 'Experiments'], enter: 'Enter the map', foot: ['NO FIXED FORM', 'THE QUESTION SETS THE DIRECTION'] },
    origin: { kicker: 'THE HABIT BEHIND THE WORK', heading: 'It began with a habit,\nnot a market category.', habit: 'When something doesn’t make sense,', thought: 'look closely,\nthen follow the question.', outcomes: ['Sometimes that leads to software.', 'Sometimes infrastructure.', 'Sometimes research.', 'Sometimes an experiment.', 'Sometimes the question itself changes.'], note: 'The form follows\nwhat we learn.' },
    questions: { kicker: 'CURRENT QUESTIONS', kickerNote: 'start with the question', heading: 'The questions guiding\nour work right now.', view: 'View this map as', choose: 'Choose map perspective', perspectives: { products: 'Products', questions: 'Questions', systems: 'Systems' }, form: 'CURRENT FORM', system: 'SYSTEM', unknownLabel: 'Unfinished question node', unknown: 'One question is still\nopen.', askAgain: 'Ask again in six months.', caption: 'SAME BODY OF WORK. DIFFERENT LEVELS OF ZOOM.' },
    interrupt: { top: ['— SIGNAL PAUSED —', 'SYSTEM INTERRUPT', '— RESUME WHEN READY —'], question: 'A QUESTION BEFORE THE NEXT QUESTION', title: ['Are we solving the problem,', 'or merely making the existing', 'solution more sophisticated?'], note: 'We ask this one a lot.' },
    constraints: { kicker: 'CONSTRAINTS WE CHOOSE', title: ['Conditions that shape', 'how we make things.'], aside: ['These are working constraints:', 'they guide the way we build.'], items: constraints.map(([, name, description]) => [name, description] as [string, string]) },
    test: { kicker: 'THE NEGAR TEST', asideLabel: 'A SMALL THOUGHT EXPERIMENT', aside: ['A product is one possible answer.', 'First, understand the problem.'], title: ['Would Negar', 'build it?'], question: 'QUESTION', currentRead: 'CURRENT READ', next: 'Next condition', seeResult: 'See where this leads', conclusion: 'CONCLUSION / STILL OPEN', result: ['Technology is one way to answer.', 'The problem gives it purpose.'], again: 'Run that thought again' },
    domains: { kicker: 'FORMS THE WORK CAN TAKE', title: ['The answer may be', 'more than an app.'], items: [['USE', 'Products', 'Things people can actually use.'], ['DEPEND', 'Infrastructure', 'Things other things can depend on.'], ['UNDERSTAND', 'Research', 'Questions worth understanding before building.'], ['TEST', 'Experiments', 'Ideas that deserve time to be tested.']], note: 'Some experiments survive.' },
    margin: { label: 'A NOTE IN THE MARGIN', title: ['I don’t get bored easily.', 'I get bothered when things don’t make sense.'], paragraphs: ['Negar has become the place where I can follow that feeling into work.', 'Sometimes it becomes software or research. Sometimes we run an experiment. And sometimes the useful thing is to leave the question open.'], author: '— Taha' },
    closing: { signal: 'ALL BRANCHES RETURN TO THE QUESTION', title: ['Negar is not a collection', 'of products.', 'It’s a way to look', 'closely at a question.'], paragraphs: ['Some questions become products.', 'Some call for infrastructure or research.', 'Some need an experiment. Others need more time.'], invitation: ['If one of these questions stays with you,', 'we’d like to hear what it brings to mind.'], github: 'Negar on GitHub', more: 'More open work', footer: ['NEGAR TEAM / INDEPENDENT WORKS', 'Lead. Laugh. Learn. Build what makes sense.'], back: 'Back to the question' },
    projectPerspective: { products: 'PRODUCT', questions: 'QUESTION', systems: 'SYSTEM' },
    projects: {},
  },
  ru: {
    languageLabel: 'Язык', theme: { switchToDark: 'Включить тёмную тему', switchToLight: 'Включить светлую тему', dark: 'Тёмная', light: 'Светлая' }, skip: 'Перейти к содержимому', home: 'Negar Team — на главную', header: 'Карта вопросов, над которыми мы работаем',
    hero: { index: 'ПОЛЕВЫЕ ЗАМЕТКИ', indexDate: '001 — ПРОДОЛЖАЕТСЯ', title: ['Начинаем с вопроса.', 'Вникаем в него.', 'Ищем форму ответа.'], summary: 'Сначала мы разбираемся в проблеме,\nа затем решаем, в какой форме ответить.', fields: ['Технологии', 'Продукты', 'Системы', 'Исследования', 'Эксперименты'], enter: 'Открыть карту', foot: ['БЕЗ ЗАДАННОЙ ФОРМЫ', 'НАПРАВЛЕНИЕ ЗАДАЁТ ВОПРОС'] },
    origin: { kicker: 'ПРИВЫЧКА, С КОТОРОЙ ВСЁ НАЧАЛОСЬ', heading: 'Всё началось с привычки,\nа не с рыночной ниши.', habit: 'Если что-то не сходится,', thought: 'вглядеться,\nа затем проследить за вопросом.', outcomes: ['Иногда это приводит к программному обеспечению.', 'Иногда — к инфраструктуре.', 'Иногда — к исследованию.', 'Иногда — к эксперименту.', 'Иногда меняется и сам вопрос.'], note: 'Форму определяет\nто, что мы узнаём.' },
    questions: { kicker: 'ТЕКУЩИЕ ВОПРОСЫ', kickerNote: 'сначала — вопрос', heading: 'Вопросы, которые сейчас\nнаправляют нашу работу.', view: 'Показать карту по темам', choose: 'Выбрать ракурс карты', perspectives: { products: 'Продукты', questions: 'Вопросы', systems: 'Системы' }, form: 'ТЕКУЩАЯ ФОРМА', system: 'СИСТЕМА', unknownLabel: 'Незавершённый вопрос', unknown: 'Один вопрос пока\nостаётся открытым.', askAgain: 'Вернуться к этому через полгода.', caption: 'ОДНА И ТА ЖЕ РАБОТА. РАЗНЫЙ УРОВЕНЬ ПРИБЛИЖЕНИЯ.' },
    interrupt: { top: ['— СИГНАЛ ПРИОСТАНОВЛЕН —', 'СИСТЕМНАЯ ПАУЗА', '— ПРОДОЛЖИМ, КОГДА БУДЕМ ГОТОВЫ —'], question: 'ВОПРОС ПЕРЕД СЛЕДУЮЩИМ ВОПРОСОМ', title: ['Мы решаем проблему', 'или лишь делаем привычное', 'решение сложнее?'], note: 'Мы часто задаём себе этот вопрос.' },
    constraints: { kicker: 'ПРИНЦИПЫ, КОТОРЫЕ МЫ ВЫБИРАЕМ', title: ['Условия, которые задают', 'форму нашей работы.'], aside: ['Это рабочие ограничения:', 'они помогают нам выбирать подход.'], items: [['Понятность', 'Люди должны понимать, что делает система.'], ['Самостоятельность', 'Технологии должны помогать людям понимать, решать, создавать и действовать.'], ['Локальный контроль', 'Предпочитаем локальный контроль, если централизация не нужна.'], ['Оправданная сложность', 'Сложность должна оправдывать своё существование.'], ['Инфраструктура', 'К инфраструктуре тоже нужен продуктовый подход.'], ['Доверие', 'Инструмент не должен требовать слепой веры.'], ['Эксперименты', 'Экспериментам можно провалиться. Путанице — нет.']] },
    test: { kicker: 'ТЕСТ NEGAR', asideLabel: 'НЕБОЛЬШОЙ МЫСЛЕННЫЙ ЭКСПЕРИМЕНТ', aside: ['Продукт — лишь один вариант ответа.', 'Сначала нужно понять проблему.'], title: ['Стала бы Negar', 'это создавать?'], question: 'ВОПРОС', currentRead: 'НАШ ОТВЕТ', next: 'Следующее условие', seeResult: 'Посмотреть, к чему это ведёт', conclusion: 'ВЫВОД / ВОПРОС ОТКРЫТ', result: ['Технология — один из способов ответа.', 'Смысл задаёт проблема.'], again: 'Подумать ещё раз' },
    domains: { kicker: 'ВО ЧТО МОЖЕТ ПРЕВРАТИТЬСЯ РАБОТА', title: ['Ответом может быть', 'не только приложение.'], items: [['ИСПОЛЬЗОВАТЬ', 'Продукты', 'То, чем люди могут пользоваться.'], ['ПОЛАГАТЬСЯ', 'Инфраструктура', 'То, на чём могут работать другие решения.'], ['ПОНЯТЬ', 'Исследования', 'Вопросы, в которых стоит разобраться до разработки.'], ['ПРОВЕРИТЬ', 'Эксперименты', 'Идеи, которым стоит дать время на проверку.']], note: 'Некоторые эксперименты продолжаются.' },
    margin: { label: 'ЗАМЕТКА НА ПОЛЯХ', title: ['Мне редко становится скучно.', 'Меня задевает, когда что-то не сходится.'], paragraphs: ['Negar стал местом, где я могу превратить это чувство в работу.', 'Иногда это становится программой или исследованием. Иногда мы проводим эксперимент. А порой полезнее оставить вопрос открытым.'], author: '— Таха' },
    closing: { signal: 'ВСЕ ВЕТВИ ВОЗВРАЩАЮТСЯ К ВОПРОСУ', title: ['Negar — не коллекция', 'продуктов.', 'Это способ яснее увидеть', 'сам вопрос.'], paragraphs: ['Некоторые вопросы становятся продуктами.', 'Другие требуют инфраструктуры или исследования.', 'Для одних нужен эксперимент, другим нужно время.'], invitation: ['Если один из этих вопросов вам близок,', 'расскажите, о чём он заставил вас задуматься.'], github: 'Negar на GitHub', more: 'Другие открытые проекты', footer: ['NEGAR TEAM / НЕЗАВИСИМЫЕ ПРОЕКТЫ', 'Думать. Радоваться. Учиться. Создавать то, что имеет смысл.'], back: 'Вернуться к вопросу' },
    projectPerspective: { products: 'ПРОДУКТ', questions: 'ВОПРОС', systems: 'СИСТЕМА' },
    projects: {
      glyphmend: { question: 'Почему информация становится бесполезной только потому, что её поместили в PDF?', description: 'Локальная рабочая среда для восстановления PDF: преобразует документы в структурированные Markdown и DOCX, сохраняя источники и отмечая неопределённость.', category: 'Документы', system: 'Восстановление документов · Локальная обработка · Структурированные знания', action: 'Открыть GlyphMend', stage: 'Доступен' },
      synthora: { question: 'Что делать, если нужная информация разрознена, противоречива и поступает из разных источников?', description: 'Инструмент для планирования инвестиций в браузере, который показывает исходные данные, расчёты, допущения и степень неопределённости.', category: 'Рынки', system: 'Данные рынка из разных источников · Поддержка решений · Локальное планирование', action: 'Открыть Synthora', stage: 'Доступен' },
      ariadne: { question: 'Почему контекст теряется каждый раз, когда мы меняем инструмент или устройство?', description: 'Локальная платформа непрерывности контекста сохраняет факты, необходимые, чтобы вернуться к прерванной цифровой работе.', category: 'Контекст', system: 'Непрерывность контекста · Локальное хранение · Взаимодействие человека и инструментов', action: 'Следить за Ariadne', stage: 'В разработке' },
      smartpack: { question: 'Может ли архив быть полезным, если для него не нужно устанавливать новые зависимости?', description: 'Архиватор для Ubuntu без потери данных, созданный на стандартной библиотеке Python: адаптивное сжатие, проверка целостности и безопасное извлечение.', category: 'Файлы', system: 'Адаптивное сжатие · Проверка целостности · Инструменты без зависимостей', action: 'Открыть SmartPack', stage: 'Доступен' },
    },
  },
  zh: {
    languageLabel: '语言', theme: { switchToDark: '切换到深色主题', switchToLight: '切换到浅色主题', dark: '深色', light: '浅色' }, skip: '跳转到正文', home: 'Negar Team 首页', header: '我们正在探索的问题地图',
    hero: { index: '观察笔记', indexDate: '001 — 持续更新', title: ['从一个问题开始。', '仔细看清它。', '让工作逐渐成形。'], summary: '我们先弄清问题，\n再决定答案应该以什么形式出现。', fields: ['技术', '产品', '系统', '研究', '实验'], enter: '进入地图', foot: ['没有固定形式', '方向由问题决定'] },
    origin: { kicker: '工作背后的习惯', heading: '一切始于一种习惯，\n而非某个市场类别。', habit: '遇到说不通的事，', thought: ['先仔细观察，', '再沿着问题追下去。'].join('\n'), outcomes: ['有时，这会带来软件。', '有时，是基础设施。', '有时，是研究。', '有时，是实验。', '有时，问题本身也会改变。'], note: '我们了解得越多，\n答案的形式就越清晰。' },
    questions: { kicker: '当前的问题', kickerNote: '从问题开始', heading: '此刻引导我们工作的\n几个问题。', view: '地图视角', choose: '选择地图视角', perspectives: { products: '产品', questions: '问题', systems: '系统' }, form: '当前形态', system: '系统', unknownLabel: '尚未完成的问题节点', unknown: '还有一个问题\n仍未有答案。', askAgain: '六个月后再来看看。', caption: '同一份工作，不同的观察层次。' },
    interrupt: { top: ['— 信号暂停 —', '系统暂停', '— 准备好后继续 —'], question: '提出下一个问题之前', title: ['我们是在解决问题，', '还是只让现有的', '解决方案更加复杂？'], note: '我们常常会问自己这个问题。' },
    constraints: { kicker: '我们选择遵守的原则', title: ['这些条件塑造了', '我们的工作方式。'], aside: ['这是实际工作中的约束：', '它们帮助我们选择如何去做。'], items: [['易于理解', '人们应该能够理解系统正在做什么。'], ['自主能力', '技术应该帮助人们理解、决策、创造并采取行动。'], ['本地掌控', '没有必要集中处理时，优先选择本地掌控。'], ['复杂度要有理由', '复杂度必须证明自己存在的价值。'], ['基础设施', '基础设施同样值得用产品思维来建设。'], ['信任', '工具不应要求人们盲目信任它。'], ['实验', '实验可以失败，但不应让人困惑。']] },
    test: { kicker: 'NEGAR 测试', asideLabel: '一个小小的思想实验', aside: ['产品只是可能的答案之一。', '首先要弄清问题本身。'], title: ['Negar 会', '去做它吗？'], question: '问题', currentRead: '当前判断', next: '下一个条件', seeResult: '看看这会引向何处', conclusion: '结论 / 仍待探索', result: ['技术是回答问题的一种方式。', '问题决定它为何重要。'], again: '重新思考一次' },
    domains: { kicker: '工作可以采取的形式', title: ['答案可能不止', '一种应用。'], items: [['使用', '产品', '人们可以实际使用的东西。'], ['依赖', '基础设施', '其他事物可以依赖的基础。'], ['理解', '研究', '值得在动手开发前先弄清的问题。'], ['检验', '实验', '值得花时间验证的想法。']], note: '有些实验会继续下去。' },
    margin: { label: '页边札记', title: ['我并不容易感到无聊。', '让我在意的是事情说不通。'], paragraphs: ['Negar 渐渐成了我把这种感受转化为工作的地方。', '有时，它会成为软件或研究；有时，我们会做个实验；有时，更合适的做法是让问题继续保持开放。'], author: '— Taha' },
    closing: { signal: '所有分支最终都会回到问题本身', title: ['Negar 并不是', '一组产品。', '它是一种看清', '问题的方式。'], paragraphs: ['有些问题会成为产品。', '有些问题需要基础设施或研究。', '有些需要实验，另一些则需要更多时间。'], invitation: ['如果其中一个问题一直留在你的脑海里，', '我们想听听它让你想到了什么。'], github: '在 GitHub 上查看 Negar', more: '更多开源项目', footer: ['NEGAR TEAM / 独立项目', '思考、欢笑、学习，创造真正有意义的东西。'], back: '回到问题' },
    projectPerspective: { products: '产品', questions: '问题', systems: '系统' },
    projects: {
      glyphmend: { question: '信息放进 PDF 后，为什么就变得难以使用？', description: '一款本地优先的 PDF 重建工作台，可将文档转换为结构化 Markdown 和 DOCX，同时保留证据并呈现不确定性。', category: '文档', system: '文档重建 · 本地处理 · 结构化知识', action: '查看 GlyphMend', stage: '已上线' },
      synthora: { question: '当所需信息分散、相互矛盾且由多个来源掌握时，该怎么办？', description: '一款以浏览器为先的投资规划工具，清晰展示输入、计算、假设与不确定性。', category: '市场', system: '多源市场数据 · 决策支持 · 本地优先规划', action: '查看 Synthora', stage: '已上线' },
      ariadne: { question: '为什么每次更换工具或设备，工作上下文都会消失？', description: '一个本地优先的上下文延续平台，保存恢复中断的数字工作所需的事实线索。', category: '上下文', system: '上下文延续 · 本地存储 · 人与工具的交互', action: '关注 Ariadne', stage: '进行中' },
      smartpack: { question: '归档工具能否在无需安装额外依赖的情况下发挥作用？', description: '一款基于 Python 标准库构建的 Ubuntu 无损归档工具，支持自适应压缩、完整性校验和安全解压。', category: '文件', system: '自适应压缩 · 完整性校验 · 无额外依赖', action: '查看 SmartPack', stage: '已上线' },
    },
  },
}

export const promptCopy: Record<Locale, readonly LocalizedPrompt[]> = {
  en: prompts,
  ru: [
    { statement: 'В нём используется ИИ.', response: 'неважно' },
    { statement: 'Он автоматизирует утомительный процесс.', response: 'возможно' },
    { statement: 'Существующие решения уже хорошо справляются с задачей.', response: 'скорее нет' },
    { statement: 'Все считают ошибочное допущение нормой.', response: 'вот теперь интересно' },
    { statement: 'Он даёт людям больше контроля над тем, от чего они зависят.', response: 'продолжим' },
  ],
  zh: [
    { statement: '它使用了人工智能。', response: '无关紧要' },
    { statement: '它能自动处理令人厌烦的流程。', response: '也许' },
    { statement: '现有方案已经很好地解决了这个问题。', response: '大概不会' },
    { statement: '大家都把错误的假设当作理所当然。', response: '这就有意思了' },
    { statement: '它让人们更能掌控自己所依赖的事物。', response: '继续探索' },
  ],
}

export const pageMetadata: Record<Locale, { title: string; description: string; ogDescription: string; ogLocale: string }> = {
  en: { title: 'Negar Team — Build what makes sense', description: 'Negar starts with questions. We look closely, understand the problem, and let the work take the form it needs.', ogDescription: 'A map of the questions shaping Negar’s products, infrastructure, research, and experiments.', ogLocale: 'en_US' },
  ru: { title: 'Negar Team — Создавать то, что имеет смысл', description: 'Negar начинается с вопросов. Мы вникаем в проблему и выбираем форму работы, которая ей подходит.', ogDescription: 'Карта вопросов, которые определяют продукты, инфраструктуру, исследования и эксперименты Negar.', ogLocale: 'ru_RU' },
  zh: { title: 'Negar Team — 创造真正有意义的事物', description: 'Negar 从问题开始。我们仔细理解问题，再让工作以合适的形式展开。', ogDescription: '一张问题地图，展示它们如何引导 Negar 的产品、基础设施、研究与实验。', ogLocale: 'zh_CN' },
}

export function localizedProject<T extends Project>(project: T, locale: Locale): T {
  if (locale === 'en') return project
  const translation = copy[locale].projects[project.id]
  if (!translation) throw new Error(`Missing ${locale} translation for ${project.id}`)
  return { ...project, ...translation }
}
