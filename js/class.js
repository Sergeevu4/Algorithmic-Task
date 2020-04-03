'use strict';

/*
TODO ЗАДАЧИ:
  * 1) Class + Arguments или Rest
  * 2) ES6 Создание Класса и Подкласса
  * 3) ES5 Создание Класса и Подкласса
  * 4) ES6 Создание Static Свойств
  * 5) Диаграмма классов: Наследование
  * 6) Диаграмма классов: Композиция (ЗАМОК)
  * 7) Диаграмма классов: Агрегация (ПУШКИ)
  * 8) Диаграмма классов: Ассоциация (КОМАНДЫ И ПЕРСОНАЖИ)
  * 9) Пример работы This со стрелочными функциями
  * 10) EventEmittet - на прототипах
  * 11) EventEmittet - на замыкании
  * 12) EventEmittet объект + взаимодействие в классах
  * 13)

*/

(function() {
  // ? Стили для console.log
  const consoleLogStyles = [
    'color: green',
    'background-color: yellow',
    'font-size: 12px',
    'border: 1px solid red',
    'padding: 5px',
  ].join(';');

  // ! 1
  (function() {
    console.log('%c 1) CLASS + ARGUMENTS ИЛИ REST', consoleLogStyles);

    // * Основной класс
    class Animal {
      constructor(name, weight) {
        this.name = name;
        this.weight = weight;
      }

      run() {
        return `${this.name} побежал.`;
      }

      measureWeight() {
        return `Я вешу ${this.weight}`;
      }
    }

    // * Зависимый класс
    class Rabbit extends Animal {
      constructor(...parament) {
        /*
            Можно было было написать через arguments НО eslint Ругается !
            Деструктуризация arguments
            const [name, weight, color] = arguments;
            super(...arguments);
          */
        const [name, weight, color] = parament;

        // Можно было так
        // super(...parament);

        super(name, weight);

        this.color = color;
      }

      showColor() {
        return `Мой цвет - ${this.color}`;
      }
    }

    // * Создание Объекта с методами
    const rabbit1 = new Rabbit(`White`, '5кг', 'серый');

    console.log(rabbit1.run()); // White побежал.
    console.log(rabbit1.showColor()); // Мой цвет - серый
    console.log(rabbit1.measureWeight()); // Я вешу 5кг
  })();

  // ! 2
  (function() {
    console.log('%c 2) ES6 СОЗДАНИЕ КЛАССА И ПОДКЛАССА', consoleLogStyles);

    /*
        ! class - это function
        ! class не всплывают
        ! class не засоряют глобальное пространство имен:
        ! (window.Task === Task) ~ (ES5 TRUE) в (ES6 FAlSE)
      */

    // * Родительский класс
    class Task {
      constructor(title = Task.getDefaultTitle()) {
        // Свойства указываются только в констуктуре + через this
        this._title = title;
        this.done = false;

        // Статическое свойство Констуктора, которая вынесена за пределы class
        // * Счетчик количество созданных объектов
        Task.count += 1;

        console.log(`Создание задачи`);
      } // между методами НЕ СТАВИТЬСЯ ЗАПЯТАЯ

      // Название get и set не должны совпадать с названиями свойств объект
      // Можно использовать внутри класса
      get title() {
        return this._title;
      }

      set title(value) {
        this._title = value;
      }

      /*
        # this внутри static методов ссылается не на объект, а на сам класс
         Статический метод может быть использован только через
         Конструктор Class: Task.getDefaultTitle() или SubTask.getDefaultTitle()
         Статический метод наследуется конструктором потомка extends Class:

         Так же Конструктором потомка наследует get и set и остальные методы: complete()
      */

      static getDefaultTitle() {
        return `Задача`;
      }

      complete() {
        // вызывается set(true)
        this.done = true;
        console.log(`Задача "${this.title}" выполнена`);
      }
    }

    // ! Статическое свойство Констуктора, которая вынесена за пределы class
    Task.count = 0;

    // * Подкласс extends - расширяет
    class SubTask extends Task {
      constructor(title, parent) {
        super(title);

        /*
           Если внутри подкласса мы создаем констуктор,
           То внутри него сразу вызвать констуктор Основного Класса: super(title);
           Если же мы не создаем constructor внутри подкласса
           То он создается автоматически и вызывает (используется) констуктор основного класса
        */

        // Можно в качестве параметра передавать класс созданный основным конструктором
        this.parent = parent;
        console.log(`Создание подзадачи`);
      }

      complete() {
        super.complete(); // Вызов родительсокого метода

        console.log(`Подзача "${this.title}" выполнена`);
      }
    }

    const task = new Task(`Изучить JavsScript`);
    const subTask = new SubTask(`Изучить ES6`, task);

    task.complete();
    subTask.complete();

    console.log(task);
    console.log(subTask);

    /*
       Созданных объект subTask, принадлежит к классу Task (), так как оон ищет через prototype
       Оператор instanceof проверяет, присутствует ли объект constructor.prototype в цепочке прототипов object.
    */
    console.log(subTask instanceof Task); // true

    console.log(Object.getPrototypeOf(subTask) === SubTask.prototype);
    // true - SubTask {} === SubTask {}
  })();

  // ! 3
  (function() {
    console.log('%c 3) ES5 СОЗДАНИЕ КЛАССА И ПОДКЛАССА', consoleLogStyles);

    /*
      https://learn.javascript.ru/new-prototype
      Чтобы новым объектам автоматически ставить прототип, конструктору ставится свойство prototype.
      При создании объекта через new, в его прототип __proto__ записывается ссылка из prototype функции-конструктора.

      Установка Rabbit.prototype = animal
      буквально говорит интерпретатору следующее:
      "При создании объекта через new Rabbit запиши ему __proto__ = animal".

      Свойство с именем prototype можно указать на любом объекте,
      но особый смысл оно имеет, лишь если назначено функции-конструктору.
      Само по себе, без вызова оператора new,оно вообще ничего не делает,
      его единственное назначение – указывать __proto__ для новых объектов.
    */

    // https://learn.javascript.ru/class-inheritance

    // * Создание Основного класса
    // # Функция по констуктор Основного класса
    function Task(title) {
      this._title = title;
      this._done = false;
      Task.count += 1;
    }

    // # Добавления Get и Set Основноному классу
    Object.defineProperty(Task.prototype, `title`, {
      get() {
        return this._title;
      },

      set(value) {
        this._title = value;
      },
    });

    // # Добавления метода в Основной класс в прототип
    Task.prototype.complete = function() {
      this._done = true;
    };

    // # Добавления статистического метода в Основной класс
    // Так как в js - функции являются объектами, то им можно задать в свойства функцию
    Task.getDefaultTitle = function() {
      return `Задача`;
    };

    // # Статическое свойство Основного класса
    Task.count = 0;

    // * Добавление Подкласса
    // # Функция констуктор Подкласса
    function SubTask(title, parent) {
      Task.call(this, title); // или так Task.apply(this, arguments);
      this._parent = parent;
    }

    // * Задаём наследование (ES6 extends)
    SubTask.prototype = Object.create(Task.prototype);

    /*
      В prototype по умолчанию всегда находится свойство constructor, указывающее на функцию-конструктор.
      В частности, SubTask.prototype.constructor === SubTask.
      Если мы рассчитываем использовать это свойство, то при замене prototype через
      Object.create нужно его явно сохранить:
      SubTask.prototype.constructor = SubTask;
    */

    SubTask.prototype.constructor = SubTask;
    // console.log(SubTask.prototype.constructor === SubTask) // true
    // console.log(SubTask.prototype.constructor.name === SubTask) // true

    const task = new Task(`Изучить JavaScript`);
    const subtask = new SubTask(`Изучить ES6`, task);

    console.log(task);
    console.log(subtask);
  })();

  // ! 4
  (function() {
    console.log('%c 4) ES6 СОЗДАНИЕ STATIC СВОЙСТВ', consoleLogStyles);
    // * Пример создания Static свойств для подсчета создания объектов
    class Person {
      constructor() {
        Person.count += 1;
        /*
          Можно было записать: this.constructor.count += 1
          С классами есть наследование и если мы сделаем класс Person2
          который будет расширять этот Person,
          то count у него будет 0 ( ? )..
        */
      }

      static get count() {
        if (!this._count) {
          this._count = 0;
        }
        return this._count;
      }

      static set count(value) {
        this._count = value;
      }

      /*
        ! this внутри static методов ссылается не на объект, а на сам класс

        Если обратиться на чтение static get к свойству count (Person.count)
        До того как был создан объект, то создается свойство _count = 0 ( Person.count ~ 0)
        Если бы этого не было: свойство было равно this._count = undefined
        Это бы вызвало NaN - так как при создании объектов
        Вызывается в конструктуре на запись static set, и если оно равно undefined += 1, будет NaN
      */
    }

    const p = new Person();
    console.log(Person.count); // 1

    const p1 = new Person();
    // console.log(Person.count); // 2
    const p2 = new Person();
    // console.log(Person.count); // 3
  })();

  /*
    !Диаграмма классов
    диаграмма, демонстрирующая классы системы, их
    атрибуты, методы и взаимосвязи между ними
  */

  // ! 5
  (function() {
    console.log('%c 5) Диаграмма классов: Наследование', consoleLogStyles);

    // * Наследование

    class Animal {
      constructor(name) {
        this.name = name;
      }

      say() {
        throw new Error(`Abstract method called`);
      }
    }

    class Cat extends Animal {
      constructor(name, speed = 3, age = 0) {
        super(name);
        this.speed = speed;
        this._totalDistance = 0;
        this.age = age;
      }

      get performance() {
        return this._totalDistance / this.age;
      }

      say() {
        return `${this.name} говорит: 'Мяу'!`;
      }

      run(time) {
        const distance = time * this.speed;
        this._totalDistance += distance;
        return distance;

        /* МОЖНО ИЗБАВИТЬСЯ ОТ ПЕРЕМЕННОЙ distance
          this._totalDistance += time * this.speed;
          return this._totalDistance
      */
      }
    }

    const newCat = new Cat(`Матроскин`, 5, 10);
    console.log(newCat);
  })();

  // ! 6
  (function() {
    console.log('%c 6) Диаграмма классов: Композиция (зависимость) - (ЗАМОК)', consoleLogStyles);

    // * Композиция - сущности которые жестко зависят друг от друга

    /*
      ! Элемент который входит в состав неотделим и не может существовать сама по себе.
        Комнаты не могут быть без Замка.
        Разрушив замок, разрушиться и комнаты. Комнаты неотделимые сущности от Замка
    */

    // Перечисление
    const RoomType = {
      BATHROOM: `bathroom`,
      LIVING_ROOM: `living room`,
      KITCHEN: `kitchen`,
    };

    class Room {
      constructor(type) {
        this._type = type;
      }

      clean() {
        console.log(`Комната "${this._type}" убрана`);
      }
    }

    class Castle {
      constructor() {
        this._rooms = [];

        // У каждого замка есть хоть одна комната: Вызов внутреннего метода
        this.addRoom(RoomType.LIVING_ROOM);
      }

      addRoom(type) {
        const newRoom = new Room(type);
        this._rooms.push(newRoom);
        return newRoom;
      }
    }

    const newCastle = new Castle();

    console.log(newCastle);
    // Castle { _rooms: [ Room { _type: 'living room' } ] }

    console.log(newCastle.addRoom(RoomType.BATHROOM));
    //  Room { _type: 'bathroom' }

    console.log(newCastle);
    // Castle { _rooms: [ Room { _type: 'living room' }, Room { _type: 'bathroom' } ] }
  })();

  // ! 7
  (function() {
    console.log('%c 7) Диаграмма классов: Агрегация (связь) - (ПУШКИ)', consoleLogStyles);

    // * Агрегация (связь)

    /*
      ! Элемент может входить в состав
        Менее жесткая связь чем Композиция
        Вещи могут существовать отдельно Героя,
        но Герой - может обладать какими-то вещами

        Если Герой умрет вещички от него останутся
    */

    // # Оружие
    class Item {
      constructor(name) {
        this.name = name;
      }
    }

    const sword = new Item(`меч`);
    const pistol = new Item(`пистолет`);
    const armour = new Item(`броник`);

    // # Герой
    class Hero {
      constructor(name) {
        this.name = name;

        // Структура данных set (Множество) -
        // чтобы в сумке не оказалось одинаковых предметов
        this.bag = new Set();
      }

      // Сумка
      add(item) {
        this.bag.add(item);
      }

      // Метод вывода вещей из сумки

      inspect() {
        return `У персонажа "${this.name}" найдено:
            ${[...this.bag].map(it => it.name).join(`, `)}`;
      }
    }

    // # Персонаж
    const luidgi = new Hero(`Луиджи Сопрано`);
    luidgi.add(pistol);
    luidgi.add(armour);

    console.log(luidgi.inspect());
    // У персонажа "Луиджи Сопрано" найдено: пистолет, броник
  })();

  // ! 8
  (function() {
    console.log(
      '%c 8) Диаграмма классов: Ассоциация (слабая связь) - (КОМАНДЫ И ПЕРСОНАЖИ)',
      consoleLogStyles
    );

    /*
      ! (Самая слабая связь) Ничего не гарантирует
      Некие сущности могут существовать с друг другом временно
      или вовсе могут быть не связанны и друг и от друга не зависят.

      Команды и персонажи

      Персонаж может выбрать сторону, может не выбирать строну
      А так же у каждой команды может быть от 0 до N Персонажей
    */

    // * Класс по созданию Героев
    class Hero {
      constructor(name) {
        this.name = name;
        this.bag = new Set();
      }
      add(item) {
        this.bag.add(item);
      }
    }

    // # Герои
    const mario = new Hero(`Марио`);
    const mushroom = new Hero(`Грибочек`);
    const dragon = new Hero(`Дракон`);
    const turtle = new Hero(`Черепаха`);

    //* Класс по созданию Команд Героев
    class Team {
      constructor(name) {
        this.name = name;
        this.members = new Set();
      }

      // ! Если Герой находиться уже в этой команде, то он не добавляется заново
      addHero(hero) {
        if (hero.team) {
          this.members.delete(hero);
        }

        this.members.add(hero);
        hero.team = this;
      }
    }

    // # Команда Джедай
    const jedi = new Team(`Светлая сторона`);
    jedi.addHero(mario);

    console.log(jedi);

    // # Команда Ситков
    const sith = new Team(`Темная сторона`);
    sith.addHero(mushroom);

    console.log(sith);
  })();

  // ! 9
  (function() {
    console.log('%c 9) Пример работы This со стрелочными функциями', consoleLogStyles);

    const test = {
      name: 'test object',
      createAnonFunction() {
        console.log(this.name); //  test object
        return function() {
          console.log(this); //  undefined !!!!
          console.log(arguments);
        };
      },

      createArrowFunction() {
        console.log(this.name); //  test object
        return () => {
          console.log(this.name); //  test object
          console.log(arguments);
        };
      },
    };

    const anon = test.createAnonFunction('hello', 'world');
    const arrow = test.createArrowFunction('hello', 'world');
    console.log(anon());
    console.log(arrow());
  })();

  // !10
  (function() {
    console.log('%c 10) EventEmittet - на прототипах', consoleLogStyles);

    /*
      Паттерн Publish/subscribe (публикация и подписка)
      Один из методов реализации паттерна: EventEmittet (абстракция через которую разные части программы могу взаимодействовать).
      Он - позволяет создавать объект, навешивать на него несколько обработчиков событий.
      Каждое событие имеет имя и массив обработчиков.
      EventEmittet - доступен из разных частей программы, одни навешиваться на событие,
      а другие могут emitet это событие (присылать) и когда они присылают это событие, то
      все кто подписан на эти события получают вызов функции(данные).
  */

    // https://github.com/HowProgrammingWorks/EventEmitter/blob/master/JavaScript/a-prod.js

    const EventEmittet = function() {
      /*
        Коллекция (Справочник) событий.
        С самого начала она пустая.
        Пример коллекции с событием
        events: {
          name1: [fn1, fn2]
        }
      */
      this.events = {};
    };

    // Метод для навешивания события
    EventEmittet.prototype.on = function(name, fn) {
      // Проверяю есть ли EventEmittet внутри коллекции, переданое событие
      const event = this.events[name];

      // Если там не undefined или null, то внутрь массива мы отправляем функцию
      if (event) event.push(fn);
      // Если такого события нету, то мы создаем внутри коллекции массив с функцией
      else this.events[name] = [fn];
    };

    // Метод для отправки событий
    EventEmittet.prototype.emit = function(name, ...data) {
      const event = this.events[name];
      if (event) event.forEach(fn => fn(...data));
    };

    // Экземпляр EventEmittet
    const ee = new EventEmittet();

    ee.on('event1', data => {
      console.log(data); // { a: 5 }
    });

    ee.on('event2', (...data) => {
      console.log(data); //  [ { a: 10 }, 10 ]
    });

    // ee.emit('event', {a: 5});
    ee.emit('event1', { a: 3 });
    ee.emit('event2', { a: 10 }, 10);

    /*
      Происходит подпись on: я передаю название события, и функцию которая должна сработать
      при вызове данного имени, то есть срабатывает отправки события emit с переданным аргументом
	  */

    console.log(ee);
  })();

  // !11
  (function() {
    console.log('%c 10)  EventEmittet - на замыкании', consoleLogStyles);

    // ! EventEmittet - на замыкании
    const emitter = () => {
      const events = {};
      return {
        on: (name, fn) => {
          const event = events[name];
          if (event) event.push(fn);
          else events[name] = [fn];
          console.log(events);
        },
        emit: (name, ...data) => {
          const event = events[name];
          if (event) event.forEach(fn => fn(...data));
        },
      };
    };

    const eventE = emitter();

    eventE.on('event1', data => {
      console.log(data); //  { a: 1 } { a: 2 }
    });

    eventE.emit('event1', { a: 1 });
    eventE.emit('event1', { a: 2 });

    console.log(eventE);

    // EventEmittet - на замыкании + Рефакторинг в Функциональном стиле
    const emitter2 = (events = {}) => ({
      on: (name, fn) => (events[name] = events[name] || []).push(fn),
      emit: (name, ...data) => (event[name] || []).forEach(fn => fn(...data)),
    });

    const eventE2 = emitter();

    eventE2.on('event1', data => {
      console.log(data); //  { a: 1 } { a: 2 }
    });

    eventE2.emit('event1', { a: 1 });
    eventE2.emit('event1', { a: 2 });
  })();

  // !12
  (function() {
    console.log('%c 11) EventEmittet объект + взаимодействие в классах', consoleLogStyles);

    // ! EventEmittet объект + взаимодействие в классах
    /*
      https://monsterlessons.com/project/lessons/publishsubscribe-v-javascript
      Представим, что у нас есть онлайн магазин, который при новом заказе посылает емейл юзеру.

      Такие проблемы решаются с помощью паттерна publish/subscribe.
      В приложении мы паблишим события без привязки к какому-то конкретному классу.
      И мы можем создавать подписчиков (subscribers), которые будут слушать события, которые им интересны.

      Это позволяет не делать зависимости между компонентами системы.
    */

    // ! Мы хотим реализовать вот такое использование нашего PubSub:

    /*
      Мы создали объект channels, в котором мы будем хранить наши каналы.
      Например, foo у нас будет каналом. В методе subscribe мы проверяем - есть ли канал и если нет - создаем.
      Потом, пушим в созданный канал новый listener.
      В publish мы проходимся по слушателям канала и вызываем их.
      Если канала или слушателей нет, то ничего не делаем.
    */

    const EventBus = {
      channels: {},
      // Подписка
      subscribe(channelName, listener) {
        if (!this.channels[channelName]) {
          this.channels[channelName] = [];
        }
        this.channels[channelName].push(listener);
      },
      // Публикация
      publish(channelName, data) {
        const channel = this.channels[channelName];
        if (!channel || !channel.length) {
          return;
        }
        channel.forEach(listener => listener(data));
      },
    };

    /*
      Сначала, с помощью subscribe мы подписались на ивент foo, и когда он выстрелит,
      то наш коллбек, который мы передали вторым параметром, выполнится.
      Потом мы выстрелили publish с ивентом foo и передали в параметрах текст Hello world.
    */

    EventBus.subscribe('foo', () => console.log('foo fired'));
    EventBus.publish('foo', 'Hello world');

    // Заказ
    class Order {
      constructor(params) {
        this.params = params;
      }

      save() {
        console.log('Order saved');
        EventBus.publish('order/new', {
          userEmail: this.params.userEmail,
        });
      }
    }

    class Mailer {
      constructor() {
        EventBus.subscribe('order/new', this.sendPurchaseEmail);
      }

      sendPurchaseEmail(params) {
        params;
        console.log(`Email send to ${params.userEmail}`);
      }
    }

    const mailer = new Mailer();
    // Создать заказ
    const order = new Order({ userEmail: 'john@gmail.com' });
    // Сохраем его
    order.save();

    console.log(order);
  })();
})();
