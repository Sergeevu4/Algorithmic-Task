// https://cz-git.qbb.sh/

const { execSync } = require('child_process');

// # Название активной ветки
// ! Могут быть проблемы у пользователей Windows
const issue = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();

// Флаг включения/отключения отображения в emoji в коммитах и консоли
const SHOW_EMOJI = true;

const showEmojiWithTitle = (emoji = '') => (SHOW_EMOJI ? `${emoji} ` : '');

/** @type {import('cz-git').UserConfig} */
module.exports = {
  // Все правила валидации коммитов: https://commitlint.js.org/#/reference-rules
  rules: {
    // Тело коммита должно начинаться с пустой строки
    'body-leading-blank': [2, 'always'],

    // Нижний колонтитул коммита должен начинаться с пустой строки
    'footer-leading-blank': [2, 'always'],

    // Максимальная  длина заголовка Коммита
    // Используется в настройках maxHeaderLength
    // 'header-max-length': [2, 'always', 92],

    // Минимальная длина заголовка Коммита
    // Используется в настройках minSubjectLength
    // 'subject-min-length': [2, 'always', 10],

    // Область всегда только в нижнем регистре, у нас вместо scope название ветки
    // 'scope-case': [2, 'always', 'lower-case'],

    // Перечислим все возможные области коммитов
    // 'scope-enum': [1, 'always', cz.scopes.map(type => type.name)],

    // Описание не может быть пустым
    // 'subject-empty': [2, 'always'],

    // // Описание не должно заканчиваться '.'
    // 'subject-full-stop': [2, 'never', '.'],

    // Тип всегда только в нижнем регистре
    'type-case': [2, 'always', 'lower-case'],

    // Тип не может быть пустым
    'type-empty': [2, 'never'],
  },
  prompt: {
    // alias: { fd: 'docs: fix typos' },
    messages: {
      type: 'Какие изменения вы вносите?\n',
      scope: 'Выберите ОБЛАСТЬ, которую вы изменили (опционально):',
      customScope: 'Укажите свою ОБЛАСТЬ:',
      subject: 'Напишите КОРОТКОЕ описание в коммита:\n',
      body: 'Напишите ПОДРОБНОЕ описание (опционально). Используйте "|" для новой строки:\n',
      /*
        Выполнил:| - item 01| - item 02

          Выполнил:
           - item 01
           - item 02
      */
      breaking: 'Список BREAKING CHANGES (опционально):\n',
      footer: 'Место для мета данных (тикетов, ссылок и остального). Например: GENCLINIC-...:\n',
      confirmCommit: 'Вас устраивает получившийся коммит?',
    },
    types: [
      {
        value: 'feat',
        name: `feat: ${showEmojiWithTitle('✨')}Добавление нового функционала`,
        emoji: '✨', // ':sparkles:'
      },
      {
        value: 'fix',
        name: `fix: ${showEmojiWithTitle('🐛')}Исправление ошибок`,
        emoji: '🐛',
      },
      {
        value: 'refactor',
        name: `refactor: ${showEmojiWithTitle(
          '♻️'
        )} Правки кода без исправления ошибок или добавления новых функций`,
        emoji: '♻️',
      },
      {
        value: 'build',
        name: `build: ${showEmojiWithTitle('📦️')}Сборка проекта или изменения внешних зависимостей`,
        emoji: '📦️',
      },
      {
        value: 'style',
        name: `style: ${showEmojiWithTitle(
          '💄'
        )}Правки по кодстайлу (табы, отступы, точки, запятые и т.д.)`,
        emoji: '💄',
      },
      {
        value: 'perf',
        name: `perf: ${showEmojiWithTitle('⚡️')}Изменения направленные на улучшение производительности`,
        emoji: '⚡️',
      },
      {
        value: 'test',
        name: `test: ${showEmojiWithTitle('✅')}Добавление тестов`,
        emoji: '✅',
      },
      {
        value: 'ci',
        name: `ci: ${showEmojiWithTitle('🎡')}Настройка CI и работа со скриптами`,
        emoji: '🎡',
      },
      {
        value: 'revert',
        name: `revert: ${showEmojiWithTitle('⏪️')}Откат на предыдущие коммиты`,
        emoji: '⏪️',
      },
    ],
    useEmoji: SHOW_EMOJI,
    emojiAlign: 'center',
    themeColorCode: '',
    // Будет отображаться: fix(GENCLINIC-...)
    scopes: [issue ? `${issue}` : ''],
    allowCustomScopes: false,
    allowEmptyScopes: false,
    upperCaseSubject: true,
    customScopesAlign: 'bottom',
    customScopesAlias: 'custom',
    emptyScopesAlias: 'empty',
    markBreakingChangeMode: false,
    // allowBreakingChanges: ['feat', 'fix'],
    breaklineNumber: 100,
    breaklineChar: '|',
    skipQuestions: ['scope', 'breaking', 'footer', 'footerPrefix'],
    // issuePrefixs: [{ value: 'closed', name: 'closed:   ISSUES has been processed' }],
    customIssuePrefixsAlign: 'top',
    emptyIssuePrefixsAlias: 'skip',
    customIssuePrefixsAlias: 'custom',
    allowCustomIssuePrefixs: false,
    allowEmptyIssuePrefixs: false,
    confirmColorize: true,
    // maxHeaderLength от введенного числа отнимается длина 'build' и длина emoji
    // Максимальная  длина заголовка Коммита
    maxHeaderLength: 92,
    // Минимальная длина заголовка Коммита
    minSubjectLength: 3,
    scopeOverrides: undefined,
    defaultBody: '',
    defaultIssues: issue ? `${issue}` : '',
    defaultScope: '',
    defaultSubject: '',
  },
};
