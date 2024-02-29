module.exports = {
  // Добавим описание на русском языке ко всем типам
  types: [
    { value: 'feat', name: 'afeat: Добавление нового функционала' },
    { value: 'fix', name: 'fix: Исправление ошибок' },
    {
      value: 'refactor',
      name: 'refactor: Правки кода без исправления ошибок или добавления новых функций',
    },
    { value: 'build', name: 'build: Сборка проекта или изменения внешних зависимостей' },
    { value: 'ci', name: 'ci: Настройка CI и работа со скриптами' },
    { value: 'docs', name: 'docs: Обновление документации' },
    { value: 'perf', name: 'perf: Изменения направленные на улучшение производительности' },

    { value: 'revert', name: 'revert: Откат на предыдущие коммиты' },
    { value: 'style', name: 'style: Правки по кодстайлу (табы, отступы, точки, запятые и т.д.)' },
    { value: 'test', name: 'test: Добавление тестов' },
  ],
  // Область. Она характеризует фрагмент кода, которую затронули изменения
  // scopes: [
  //   { name: 'commitizen' },
  //   { name: 'git' },
  //   { name: 'scripts' },
  //   { name: 'components' },
  //   { name: 'tutorial' },
  //   { name: 'catalog' },
  //   { name: 'product' },
  // ],

  // Возможность задать спец ОБЛАСТЬ для определенного типа коммита (пример для 'fix')
  // scopeOverrides: {
  // fix: [{ name: 'merge' }, { name: 'style' }, { name: 'e2eTest' }, { name: 'unitTest' }],
  // },

  skipQuestions: ['scope', 'customScope', 'breaking'],
  // Смена дефолтных вопросов
  messages: {
    type: 'Какие изменения вы вносите?\n',
    scope: 'Выберите ОБЛАСТЬ, которую вы изменили (опционально):',
    // Спросим если allowCustomScopes в true
    customScope: 'Укажите свою ОБЛАСТЬ:',
    subject: 'Напишите КОРОТКОЕ описание в коммита:\n',
    body: 'Напишите ПОДРОБНОЕ описание (опционально). Используйте "|" для новой строки:\n',
    /*
      my items are:| - item01| - item 02

        my items are:
         - item01
         - item 02
    */
    breaking: 'Список BREAKING CHANGES (опционально):\n',
    footer: 'Место для мета данных (тикетов, ссылок и остального). Например: GENCLINIC-...:\n',
    confirmCommit: 'Вас устраивает получившийся коммит?',
  },

  // Разрешим собственную ОБЛАСТЬ
  allowCustomScopes: false,

  // Запрет на Breaking Changes
  allowBreakingChanges: true,

  // Префикс для нижнего колонтитула
  footerPrefix: 'МЕТА ДАННЫЕ:',

  // limit subject length
  subjectLimit: 72,

  // Имя ветки к сообщению коммита
  appendBranchNameToCommitMessage: true,
};
