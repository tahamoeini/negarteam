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
    languageLabel: 'Language', skip: 'Skip to content', home: 'Negar Team, home', header: 'A map of what we’re figuring out',
    hero: { index: 'FIELD NOTES', indexDate: '001 — ONGOING', title: ['Some things begin', 'as products.', 'Some begin as questions.'], summary: 'Negar is where we find out\nwhich is which.', fields: ['Technology', 'Products', 'Systems', 'Research', 'Experiments'], enter: 'Enter the map', foot: ['NO MASTER PLAN', 'JUST A RECURRING QUESTION'] },
    origin: { kicker: 'THERE WAS NO MASTER PLAN', heading: 'Negar didn’t begin\nwith a market category.', habit: 'It grew from a habit:', thought: 'when something doesn’t make sense,\ninvestigate it.', outcomes: ['Sometimes the answer is software.', 'Sometimes infrastructure.', 'Sometimes research.', 'Sometimes an experiment.', 'And sometimes the original question was wrong.'], note: 'Those are usually\nthe interesting ones.' },
    questions: { kicker: 'CURRENT QUESTIONS', kickerNote: 'the question comes first', heading: 'A few things\nwe’re trying to make sense of.', view: 'View this map as', choose: 'Choose map perspective', perspectives: { products: 'Products', questions: 'Questions', systems: 'Systems' }, form: 'CURRENT FORM', system: 'SYSTEM', unknownLabel: 'Unfinished question node', unknown: 'There should always be something\nhere we can’t explain yet.', askAgain: 'Ask again in six months.', caption: 'SAME BODY OF WORK. DIFFERENT LEVELS OF ZOOM.' },
    interrupt: { top: ['— SIGNAL PAUSED —', 'SYSTEM INTERRUPT', '— RESUME WHEN READY —'], question: 'A QUESTION BEFORE THE NEXT QUESTION', title: ['Are we solving the problem,', 'or merely making the existing', 'solution more sophisticated?'], note: 'We ask this one a lot.' },
    constraints: { kicker: 'CONSTRAINTS WE CHOOSE', title: ['A few conditions', 'for making things.'], aside: ['Not a values poster.', 'More like rules the system has to live with.'], items: constraints.map(([, name, description]) => [name, description] as [string, string]) },
    test: { kicker: 'THE NEGAR TEST', asideLabel: 'A SMALL THOUGHT EXPERIMENT', aside: ['Product ideas are cheap.', 'Good questions take longer.'], title: ['Would Negar', 'build it?'], question: 'QUESTION', currentRead: 'CURRENT READ', next: 'Next condition', seeResult: 'See where this leads', conclusion: 'CONCLUSION / STILL OPEN', result: ['Technology isn’t the thesis.', 'The problem is.'], again: 'Run that thought again' },
    domains: { kicker: 'FORMS THE WORK CAN TAKE', title: ['Not everything', 'we build is an app.'], items: [['USE', 'Products', 'Things people can actually use.'], ['DEPEND', 'Infrastructure', 'Things other things can depend on.'], ['UNDERSTAND', 'Research', 'Questions worth understanding before building.'], ['TEST', 'Experiments', 'Ideas that deserve time to be tested.']], note: 'Some experiments survive.' },
    margin: { label: 'A NOTE IN THE MARGIN', title: ['I don’t get bored easily.', 'I get bothered when things don’t make sense.'], paragraphs: ['Negar has gradually become the place where I do something about that.', 'Sometimes that becomes software. Sometimes research. Sometimes an experiment. And sometimes it becomes a question we’re still trying to answer.'], author: '— Taha' },
    closing: { signal: 'ALL BRANCHES RETURN TO THE QUESTION', title: ['Negar is not a collection', 'of products.', 'It’s a way of looking', 'at problems.'], paragraphs: ['Some things here are products.', 'Some are experiments.', 'Some are questions that haven’t found their product yet.'], invitation: ['If any of them are questions you’re thinking about too,', 'we’d like to hear from you.'], github: 'Negar on GitHub', more: 'More open work', footer: ['NEGAR TEAM / INDEPENDENT WORKS', 'Lead. Laugh. Learn. Build what makes sense.'], back: 'Back to the question' },
    projectPerspective: { products: 'PRODUCT', questions: 'QUESTION', systems: 'SYSTEM' },
    projects: {},
  },
  ru: {
    languageLabel: 'Язык', skip: 'Перейти к содержимому', home: 'Negar Team — на главную', header: 'Карта вопросов, над которыми мы работаем',
    hero: { index: 'ПОЛЕВЫЕ ЗАМЕТКИ', indexDate: '001 — ПРОДОЛЖАЕТСЯ', title: ['Некоторые идеи начинаются', 'с продукта.', 'Другие — с вопроса.'], summary: 'В Negar мы выясняем,\nчто есть что.', fields: ['Технологии', 'Продукты', 'Системы', 'Исследования', 'Эксперименты'], enter: 'Открыть карту', foot: ['БЕЗ ГЛАВНОГО ПЛАНА', 'ТОЛЬКО ВОЗВРАЩАЮЩИЙСЯ ВОПРОС'] },
    origin: { kicker: 'ГЛАВНОГО ПЛАНА НЕ БЫЛО', heading: 'Negar начался\nне с рыночной категории.', habit: 'Всё выросло из привычки:', thought: 'если что-то непонятно,\nнадо разобраться.', outcomes: ['Иногда ответ — программное обеспечение.', 'Иногда — инфраструктура.', 'Иногда — исследование.', 'Иногда — эксперимент.', 'А иногда неверным был сам исходный вопрос.'], note: 'Обычно именно они\nсамые интересные.' },
    questions: { kicker: 'ТЕКУЩИЕ ВОПРОСЫ', kickerNote: 'сначала — вопрос', heading: 'Несколько вещей,\nв которых мы пытаемся разобраться.', view: 'Показать карту по темам', choose: 'Выбрать ракурс карты', perspectives: { products: 'Продукты', questions: 'Вопросы', systems: 'Системы' }, form: 'ТЕКУЩАЯ ФОРМА', system: 'СИСТЕМА', unknownLabel: 'Незавершённый вопрос', unknown: 'Здесь всегда должно оставаться\nто, что мы пока не можем объяснить.', askAgain: 'Вернуться к этому через полгода.', caption: 'ОДНА И ТА ЖЕ РАБОТА. РАЗНЫЙ УРОВЕНЬ ПРИБЛИЖЕНИЯ.' },
    interrupt: { top: ['— СИГНАЛ ПРИОСТАНОВЛЕН —', 'СИСТЕМНАЯ ПАУЗА', '— ПРОДОЛЖИМ, КОГДА БУДЕМ ГОТОВЫ —'], question: 'ВОПРОС ПЕРЕД СЛЕДУЮЩИМ ВОПРОСОМ', title: ['Мы решаем проблему', 'или лишь делаем привычное', 'решение сложнее?'], note: 'Мы часто задаём себе этот вопрос.' },
    constraints: { kicker: 'ПРИНЦИПЫ, КОТОРЫЕ МЫ ВЫБИРАЕМ', title: ['Несколько условий,', 'по которым мы создаём.'], aside: ['Это не плакат с ценностями.', 'Скорее правила, которым должна следовать система.'], items: [['Понятность', 'Люди должны понимать, что делает система.'], ['Самостоятельность', 'Технологии должны помогать людям понимать, решать, создавать и действовать.'], ['Локальный контроль', 'Предпочитаем локальный контроль, если централизация не нужна.'], ['Оправданная сложность', 'Сложность должна оправдывать своё существование.'], ['Инфраструктура', 'К инфраструктуре тоже нужен продуктовый подход.'], ['Доверие', 'Инструмент не должен требовать слепой веры.'], ['Эксперименты', 'Экспериментам можно провалиться. Путанице — нет.']] },
    test: { kicker: 'ТЕСТ NEGAR', asideLabel: 'НЕБОЛЬШОЙ МЫСЛЕННЫЙ ЭКСПЕРИМЕНТ', aside: ['Придумать продукт легко.', 'Хорошие вопросы требуют времени.'], title: ['Стала бы Negar', 'это создавать?'], question: 'ВОПРОС', currentRead: 'НАШ ОТВЕТ', next: 'Следующее условие', seeResult: 'Посмотреть, к чему это ведёт', conclusion: 'ВЫВОД / ВОПРОС ОТКРЫТ', result: ['Технологии — не главная идея.', 'Главное — проблема.'], again: 'Подумать ещё раз' },
    domains: { kicker: 'ВО ЧТО МОЖЕТ ПРЕВРАТИТЬСЯ РАБОТА', title: ['Не всё,', 'что мы создаём, — приложение.'], items: [['ИСПОЛЬЗОВАТЬ', 'Продукты', 'То, чем люди могут пользоваться.'], ['ПОЛАГАТЬСЯ', 'Инфраструктура', 'То, на чём могут работать другие решения.'], ['ПОНЯТЬ', 'Исследования', 'Вопросы, в которых стоит разобраться до разработки.'], ['ПРОВЕРИТЬ', 'Эксперименты', 'Идеи, которым стоит дать время на проверку.']], note: 'Некоторые эксперименты продолжаются.' },
    margin: { label: 'ЗАМЕТКА НА ПОЛЯХ', title: ['Мне редко становится скучно.', 'Меня задевает, когда что-то не сходится.'], paragraphs: ['Постепенно Negar стал местом, где я могу с этим что-то сделать.', 'Иногда это превращается в программу. Иногда — в исследование или эксперимент. А иногда — в вопрос, на который мы всё ещё ищем ответ.'], author: '— Таха' },
    closing: { signal: 'ВСЕ ВЕТВИ ВОЗВРАЩАЮТСЯ К ВОПРОСУ', title: ['Negar — не просто', 'набор продуктов.', 'Это способ смотреть', 'на проблемы.'], paragraphs: ['Здесь есть продукты.', 'Есть эксперименты.', 'И есть вопросы, для которых ещё не нашлось продукта.'], invitation: ['Если вас тоже занимают какие-то из этих вопросов,', 'мы будем рады поговорить.'], github: 'Negar на GitHub', more: 'Другие открытые проекты', footer: ['NEGAR TEAM / НЕЗАВИСИМЫЕ ПРОЕКТЫ', 'Думать. Радоваться. Учиться. Создавать то, что имеет смысл.'], back: 'Вернуться к вопросу' },
    projectPerspective: { products: 'ПРОДУКТ', questions: 'ВОПРОС', systems: 'СИСТЕМА' },
    projects: {
      glyphmend: { question: 'Почему информация становится бесполезной только потому, что её поместили в PDF?', description: 'Локальная рабочая среда для восстановления PDF: преобразует документы в структурированные Markdown и DOCX, сохраняя источники и отмечая неопределённость.', category: 'Документы', system: 'Восстановление документов · Локальная обработка · Структурированные знания', action: 'Открыть GlyphMend', stage: 'Доступен' },
      synthora: { question: 'Что делать, если нужная информация разрознена, противоречива и поступает из разных источников?', description: 'Инструмент для планирования инвестиций в браузере, который показывает исходные данные, расчёты, допущения и степень неопределённости.', category: 'Рынки', system: 'Данные рынка из разных источников · Поддержка решений · Локальное планирование', action: 'Открыть Synthora', stage: 'Доступен' },
      ariadne: { question: 'Почему контекст теряется каждый раз, когда мы меняем инструмент или устройство?', description: 'Локальная платформа непрерывности контекста сохраняет факты, необходимые, чтобы вернуться к прерванной цифровой работе.', category: 'Контекст', system: 'Непрерывность контекста · Локальное хранение · Взаимодействие человека и инструментов', action: 'Следить за Ariadne', stage: 'В разработке' },
      smartpack: { question: 'Может ли архив быть полезным, если для него не нужно устанавливать новые зависимости?', description: 'Архиватор для Ubuntu без потери данных, созданный на стандартной библиотеке Python: адаптивное сжатие, проверка целостности и безопасное извлечение.', category: 'Файлы', system: 'Адаптивное сжатие · Проверка целостности · Инструменты без зависимостей', action: 'Открыть SmartPack', stage: 'Доступен' },
    },
  },
  zh: {
    languageLabel: '语言', skip: '跳转到正文', home: 'Negar Team 首页', header: '我们正在探索的问题地图',
    hero: { index: '观察笔记', indexDate: '001 — 持续更新', title: ['有些事情始于产品，', '有些事情', '始于一个问题。'], summary: 'Negar 的工作，是在这里\n弄清楚其中的区别。', fields: ['技术', '产品', '系统', '研究', '实验'], enter: '进入地图', foot: ['没有总计划', '只有一个反复出现的问题'] },
    origin: { kicker: '一开始并没有总计划', heading: 'Negar 并非始于\n某个市场类别。', habit: '它源于一个习惯：', thought: ['遇到不明白的事，', '就去弄清楚。'].join('\n'), outcomes: ['有时，答案是软件。', '有时，是基础设施。', '有时，是研究。', '有时，是实验。', '有时，最初的问题本身就错了。'], note: '往往正是这些问题\n最有意思。' },
    questions: { kicker: '当前的问题', kickerNote: '先问问题', heading: '有些事情，\n我们还在努力弄明白。', view: '地图视角', choose: '选择地图视角', perspectives: { products: '产品', questions: '问题', systems: '系统' }, form: '当前形态', system: '系统', unknownLabel: '尚未完成的问题节点', unknown: '这里始终应该留有一些\n我们还无法解释的事情。', askAgain: '六个月后再来看看。', caption: '同一份工作，不同的观察层次。' },
    interrupt: { top: ['— 信号暂停 —', '系统暂停', '— 准备好后继续 —'], question: '提出下一个问题之前', title: ['我们是在解决问题，', '还是只让现有的', '解决方案更加复杂？'], note: '我们常常会问自己这个问题。' },
    constraints: { kicker: '我们选择遵守的原则', title: ['创造事物时，', '我们坚持几个条件。'], aside: ['这不是一张价值观海报。', '更像是系统必须遵守的规则。'], items: [['易于理解', '人们应该能够理解系统正在做什么。'], ['自主能力', '技术应该帮助人们理解、决策、创造并采取行动。'], ['本地掌控', '没有必要集中处理时，优先选择本地掌控。'], ['复杂度要有理由', '复杂度必须证明自己存在的价值。'], ['基础设施', '基础设施同样值得用产品思维来建设。'], ['信任', '工具不应要求人们盲目信任它。'], ['实验', '实验可以失败，但不应让人困惑。']] },
    test: { kicker: 'NEGAR 测试', asideLabel: '一个小小的思想实验', aside: ['提出产品创意很容易。', '好问题需要更多时间。'], title: ['Negar 会', '去做它吗？'], question: '问题', currentRead: '当前判断', next: '下一个条件', seeResult: '看看这会引向何处', conclusion: '结论 / 仍待探索', result: ['技术不是核心命题。', '问题才是。'], again: '重新思考一次' },
    domains: { kicker: '工作可以采取的形式', title: ['我们创造的', '并不全是应用。'], items: [['使用', '产品', '人们可以实际使用的东西。'], ['依赖', '基础设施', '其他事物可以依赖的基础。'], ['理解', '研究', '值得在动手开发前先弄清的问题。'], ['检验', '实验', '值得花时间验证的想法。']], note: '有些实验会继续下去。' },
    margin: { label: '页边札记', title: ['我并不容易感到无聊。', '让我在意的是事情说不通。'], paragraphs: ['渐渐地，Negar 成了我可以着手解决这些困惑的地方。', '有时，这会变成软件；有时是研究或实验；有时，则是一个我们仍在努力回答的问题。'], author: '— Taha' },
    closing: { signal: '所有分支最终都会回到问题本身', title: ['Negar 并不是', '一组产品。', '它是一种看待', '问题的方式。'], paragraphs: ['这里有一些产品。', '有一些实验。', '也有一些尚未找到产品形态的问题。'], invitation: ['如果其中有些问题你也正在思考，', '欢迎和我们聊聊。'], github: '在 GitHub 上查看 Negar', more: '更多开源项目', footer: ['NEGAR TEAM / 独立项目', '思考、欢笑、学习，创造真正有意义的东西。'], back: '回到问题' },
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

export const pageMetadata: Record<Locale, { title: string; description: string; ogDescription: string }> = {
  en: { title: 'Negar Team — Build what makes sense', description: 'Negar is an evolving body of technology, products, systems, research and experiments. When something doesn’t make sense, investigate it.', ogDescription: 'A living map of questions becoming products, infrastructure, research and experiments.' },
  ru: { title: 'Negar Team — Создавать то, что имеет смысл', description: 'Negar — это развивающееся пространство технологий, продуктов, систем, исследований и экспериментов. Если что-то непонятно — надо разобраться.', ogDescription: 'Живая карта вопросов, которые становятся продуктами, инфраструктурой, исследованиями и экспериментами.' },
  zh: { title: 'Negar Team — 创造真正有意义的事物', description: 'Negar 是一个不断发展的技术、产品、系统、研究与实验集合。遇到不明白的事，就去弄清楚。', ogDescription: '一张不断演变的问题地图，记录问题如何成为产品、基础设施、研究与实验。' },
}

export function localizedProject<T extends Project>(project: T, locale: Locale): T {
  if (locale === 'en') return project
  const translation = copy[locale].projects[project.id]
  if (!translation) throw new Error(`Missing ${locale} translation for ${project.id}`)
  return { ...project, ...translation }
}
