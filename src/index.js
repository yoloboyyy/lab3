/* Часть 1 - Функции */

/*
 Задание 1:

 Функция должна принимать один аргумент и возвращать его
 */
function returnFirstArgument(arg) {
  return arg;
}

/*
 Задание 2:

 Функция должна принимать два аргумента и возвращать сумму переданных значений
 Значение по умолчанию второго аргумента должно быть 100
 */
function defaultParameterValue(a, b = 100) {
  return a + b;
}

/*
 Задание 3:

 Функция должна возвращать все переданные в нее аргументы в виде массива
 Количество переданных аргументов заранее неизвестно
 */
function returnArgumentsArray() {
  let result = [];
  for (let i = 0; i < arguments.length; i++) {
    result[i] = arguments[i];
  }
  return result;
}

/*
 Задание 4:

 Функция должна принимать другую функцию и возвращать результат вызова переданной функции
 */
function returnFnResult(fn) {
  return fn();
}

/*
 Задание 5:

 Функция должна принимать число (значение по умолчанию - 0) и возвращать функцию (F)
 При вызове F, переданное число должно быть увеличено на единицу и возвращено из F
 */
function returnCounter(number = 0) {
  return function F() {
    return ++number;
  };
}

/*
 Задание 6 *:

 Функция должна принимать другую функцию (F) и некоторое количество дополнительных аргументов
 Функция должна привязать переданные аргументы к функции F и вернуть получившуюся функцию
 */

function bindFunction(F, a, b) {
  return (F = F.bind(null, a, b));
}

/* Часть 2 - работа с массивами и объеектами */

/*
 Задача 1:
 Напишите аналог встроенного метода forEach для работы с массивами
 */
function forEach(array, fn) {
  for (let i = 0; i < array.length; i++) {
    fn(array[i], i, array);
  }
}

/*
 Задача 2:
 Напишите аналог встроенного метода map для работы с массивами
 */
function map(array, fn) {
  let someArray = [];
  for (let i = 0; i < array.length; i++) {
    someArray[i] = fn(array[i], i, array);
  }
  return someArray;
}

/*
 Задача 3:
 Напишите аналог встроенного метода reduce для работы с массивами
 */
function reduce(array, fn, initial) {
  let result,
    prev,
    start = 0;
  initial == null ? setValue() : (prev = initial);

  function setValue() {
    prev = array[0];
    start = 1;
  }

  for (let i = start; i < array.length; i++) {
    result = fn(prev, array[i], i, array);
    prev = result;
  }
  return result;
}

/*
 Задача 4:
 Функция принимает объект и имя свойства, которое необходиом удалить из объекта
 Функция должна удалить указанное свойство из указанного объекта
 */
function deleteProperty(obj, prop) {
  delete obj[prop];
}

/*
 Задача 5:
 Функция принимает объект и имя свойства и возвращает true или false
 Функция должна проверить существует ли укзаанное свойство в указанном объекте
 */
function hasProperty(obj, prop) {
  return prop in obj ? true : false;
}

/*
 Задача 6:
 Функция должна получить все перечисляемые свойства объекта и вернуть их в виде массива
 */
function getEnumProps(obj) {
  let result = [];
  let i = 0;
  for (let prorerty in obj) {
    result[i] = prorerty;
    i++;
  }
  return result;
}

/*
 Задача 7:
 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистра и вернуть в виде массива
 */
function upperProps(obj) {
  let result = [];
  let i = 0;
  for (let property in obj) {
    property = property.toUpperCase();
    result[i] = property;
    i++;
  }
  return result;
}

/*
 Задача 8 *:
 Напишите аналог встроенного метода slice для работы с массивами
 */
function slice(array, from, to) {
  return (array = array.slice(from, to));
}

/* Часть 3 - работа с исключениями и отладчиком */

/*
 Задача 1:
 Функция принимает массив и фильтрующую фукнцию и должна вернуть true или false
 Функция должна вернуть true только если fn вернула true для всех элементов массива
 Необходимо выбрасывать исключение в случаях:
 - array не массив или пустой массив (с текстом "empty array")
 - fn не является функцией (с текстом "fn is not a function")
 Зарпещено использовать встроенные методы для работы с массивами
 */
function isAllTrue(array, fn) {
  if (array == 0 || !Array.isArray(array)) {
    throw new Error("empty array");
  } else if (typeof fn != "function") {
    throw new Error("fn is not a function");
  } else {
    var result = true;
    array.forEach(element => {
      if (fn(element) == false) {
        result = false;
      }
    });
    return result;
  }
}

/*
 Задача 2:
 Функция принимает массив и фильтрующую фукнцию и должна вернуть true или false
 Функция должна вернуть true если fn вернула true хотя бы для одного из элементов массива
 Необходимо выбрасывать исключение в случаях:
 - array не массив или пустой массив (с текстом "empty array")
 - fn не является функцией (с текстом "fn is not a function")
 Зарпещено использовать встроенные методы для работы с массивами
 */
function isSomeTrue(array, fn) {
  if (array == 0 || !Array.isArray(array)) {
    throw new Error("empty array");
  } else if (typeof fn != "function") {
    throw new Error("fn is not a function");
  } else {
    var result = false;
    array.forEach(element => {
      if (fn(element) == true) {
        result = true;
      }
    });
    return result;
  }
}

/*
 Задача 3:
 Функция принимает заранее неизветсное количество аргументов, первым из которых является функция fn
 Функция должна поочередно запусти fn для каждого переданного аргумента (кроме самой fn)
 Функция должна вернуть массив аргументов, для которых fn выбросила исключение
 Необходимо выбрасывать исключение в случаях:
 - fn не является функцией (с текстом "fn is not a function")
 */
function returnBadArguments(fn) {
  let array = [];
  if (typeof fn != "function") {
    throw new Error("fn is not a function");
  } else if (arguments.length == 0) throw new Error("array is empty");
  for (let i = 1; i < arguments.length; i++) {
    try {
      fn(arguments[i]);
    } catch (err) {
      array.push(arguments[i]);
    }
  }
  return array;
}

/*
 Задача 4:
 Функция имеет параметр number (по умолчанию - 0)
 Функция должна вернуть объект, у которого должно быть несколько методов:
 - sum - складывает number с переданными аргументами
 - dif - вычитает из number переданные аргументы
 - div - делит number на первый аргумент. Результат делится на следующий аргумент (если передан) и так далее
 - mul - умножает number на первый аргумент. Результат умножается на следующий аргумент (если передан) и так далее

 Количество передаваемых в методы аргументов заранее неизвестно
 Необходимо выбрасывать исключение в случаях:
 - number не является числом (с текстом "number is not a number")
 - какой-либо из аргументов div является нулем (с текстом "division by 0")
 */
function calculator(number = 0) {
  if (typeof number != "number") {
    throw new Error("number is not a number");
  }

  let object = {
    sum: function() {
      for (let i = 0; i < arguments.length; i++) {
        number += arguments[i];
      }
      return number;
    },
    dif: function() {
      for (let i = 0; i < arguments.length; i++) {
        number -= arguments[i];
      }
      return number;
    },
    div: function() {
      for (let i = 0; i < arguments.length; i++) {
        if (arguments[i] == 0) {
          throw new Error("division by 0");
        }

        number /= arguments[i];
      }
      return number;
    },
    mul: function() {
      for (let i = 0; i < arguments.length; i++) {
        number *= arguments[i];
      }
      return number;
    }
  };
  return object;
}

export {
  returnFirstArgument,
  defaultParameterValue,
  returnArgumentsArray,
  returnFnResult,
  returnCounter,
  bindFunction,
  forEach,
  map,
  reduce,
  deleteProperty,
  hasProperty,
  getEnumProps,
  upperProps,
  slice,
  isAllTrue,
  isSomeTrue,
  returnBadArguments,
  calculator
};
