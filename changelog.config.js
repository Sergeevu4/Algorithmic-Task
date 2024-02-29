module.exports = {
  disableEmoji: false,
  format: '{type}{scope}: {emoji}{subject}',
  list: ['feat', 'fix', 'style', 'refactor', 'docs', 'perf', 'chore', 'ci', 'test'],
  maxMessageLength: 109,
  minMessageLength: 3,
  questions: ['type', 'scope', 'subject', 'body', 'breaking', 'issues', 'lerna'],
  types: {
    chore: {
      description: 'Обновление без изменения логики основного кода',
      emoji: '🤖',
      value: 'chore',
    },
    ci: {
      description:
        'Используется для указания изменений, связанных с системой интеграции и развертывания, включая сценарии, конфигурации или инструменты',
      emoji: '🎡',
      value: 'ci',
    },
    docs: {
      description: 'Изменение в документации',
      emoji: '✏️',
      value: 'docs',
    },
    feat: {
      description: 'Добавляет новый функционал',
      emoji: '🎸',
      value: 'feat',
    },
    fix: {
      description: 'Исправляет ошибку',
      emoji: '🐛',
      value: 'fix',
    },
    perf: {
      description: 'Изменение, которое улучшает производительность',
      emoji: '⚡️',
      value: 'perf',
    },
    refactor: {
      description: 'Изменение, которое не исправляет ошибку и не добавляет функционал',
      emoji: '💡',
      value: 'refactor',
    },
    release: {
      description: 'Create a release commit',
      emoji: '🏹',
      value: 'release',
    },
    style: {
      description: 'Изменение, которое связано со стилями и не влияет на логику кода',
      emoji: '💄',
      value: 'style',
    },
    test: {
      description: 'Добавление тестов или исправление существующих',
      emoji: '💍',
      value: 'test',
    },
    messages: {
      type: 'Какие изменения вы вносите?',
      scope: 'Выберите ОБЛАСТЬ, которую вы изменили (опционально):',
      customScope: 'Укажите свою ОБЛАСТЬ:',
      subject: 'Напишите КОРОТКОЕ описание:',
      body: 'Напишите ПОДРОБНОЕ описание (опционально). Используйте | для новой строки:',
      breaking: 'Список BREAKING CHANGES (опционально):',
      footer: 'Место для мета данных (тикетов, ссылок и остального). Например: GENCLINIC-1881:',
      confirmCommit: 'Вас устраивает получившийся коммит?',
    },
  },
};
