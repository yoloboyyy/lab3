import { assert } from 'chai';
import { randomNumberArray, randomStringArray, randomValue as random } from '../helper';
const nativeSlice = Array.prototype.slice;
const nativeMap = Array.prototype.map;
const nativeReduce = Array.prototype.reduce;

import {
    bindFunction,
    defaultParameterValue,
    returnArgumentsArray,
    returnCounter,
    returnFirstArgument,
    returnFnResult,
    forEach,
    map,
    reduce,
    deleteProperty,
    hasProperty,
    getEnumProps,
    upperProps,
    slice,
    calculator,
    isAllTrue,
    isSomeTrue,
    returnBadArguments
} from '../src/index';

describe('Часть 1 - функции', () => {
    describe('returnFirstArgument', () => {
        it('должна возвращать переданный аргумент', () => {
            let value = random();
            let result = returnFirstArgument(value);

            assert.strictEqual(result, value);
        });
    });

    describe('defaultParameterValue', () => {
        it('должна возвращать сумму переданных аргументов', () => {
            let valueA = random('number');
            let valueB = random('number');
            let result = defaultParameterValue(valueA, valueB);

            assert.strictEqual(result, valueA + valueB);
        });

        it('значение по умолчанию второго аргумента должно быть 100', () => {
            let value = random('number');
            let result = defaultParameterValue(value);

            assert.strictEqual(result, value + 100);
        });
    });

    describe('returnArgumentsArray', () => {
        it('должна возвращать переданные аргументы в виде массива', () => {
            let result;
            let value;

            value = random('array', 1);
            result = returnArgumentsArray(...value);
            assert.deepEqual(result, value);
        });

        it('должна возвращать пустой массив если нет аргументов', () => {
            let result = returnArgumentsArray();

            assert.deepEqual(result, []);
        });
    });

    describe('returnFnResult', () => {
        it('должна возвращать результат вызова переданной функции', () => {
            function fn() {
                return value;
            }

            let value = random();
            let result = returnFnResult(fn);

            assert.strictEqual(result, value);
        });
    });

    describe('returnCounter', () => {
        it('должна возвращать функцию', () => {
            let result = returnCounter();

            assert.typeOf(result, 'function');
        });

        it('возвращаемая функция должна увеличивать переданное число на единицу при каждом вызове', () => {
            let value = random('number');
            let result = returnCounter(value);

            assert.equal(result(), value + 1);
            assert.equal(result(), value + 2);
            assert.equal(result(), value + 3);
        });

        it('значение аргумента должно быть 0 по умолчанию', () => {
            let result = returnCounter();

            assert.equal(result(), 1);
            assert.equal(result(), 2);
            assert.equal(result(), 3);
        });
    });

    describe('bindFunction', () => {
        function fn(a, b) {
            return a + b;
        }

        it('должна возвращать функцию', () => {
            let result = bindFunction(fn);

            assert.typeOf(result, 'function');
        });

        it('должна привязывать аргументы возвращаемой функции', () => {
            let valueA = random('number');
            let valueB = random('number');
            let result = bindFunction(fn, valueA, valueB);

            assert.equal(result(), valueA + valueB);
        });
    });
});
describe('Часть 2 - объекты и массивы', () => {
    describe('forEach', () => {
        it('должна вызывать функцию для каждого элемента массива и передавать элемент первым аргументом', () => {
            let array = randomNumberArray();
            let passed = [];

            forEach(array, el => passed.push(el));

            assert.deepEqual(array, passed);
        });

        it('должна передавать индекс элемента вторым аргументом', () => {
            let array = randomNumberArray();
            let index = 0;

            forEach(array, (el, i) => assert.equal(i, index++));
        });

        it('должна передавать сам массив третьим аргументом', () => {
            let array = randomNumberArray();

            forEach(array, (el, i, a) => assert.strictEqual(a, array));
        });
    });

    describe('map', () => {
        it('должна вызывать функцию для каждого элемента массива и передавать элемент первым аргументом', () => {
            let array = randomNumberArray();
            let passed = [];

            map(array, el => passed.push(el));

            assert.deepEqual(array, passed);
        });

        it('должна передавать индекс элемента вторым аргументом', () => {
            let array = randomNumberArray();
            let index = 0;

            map(array, (el, i) => assert.equal(i, index++));
        });

        it('должна передавать сам массив третьим аргументом', () => {
            let array = randomNumberArray();

            map(array, (el, i, a) => assert.strictEqual(a, array));
        });

        it('должна возвращать измененную копию массива', () => {
            let array = randomNumberArray();
            let target = nativeMap.call(array, el => el ** 2);
            let result = map(array, el => el ** 2);

            assert.deepEqual(result, target);
        });

        it('не должна изменять оригинальный массив', () => {
            let array = randomNumberArray();
            let arrayCopy = nativeSlice.call(array);

            map(array, el => el ** 2);
            assert.deepEqual(array, arrayCopy);
        });
    });

    describe('reduce', () => {
        it('должна вызывать функцию для каждого элемента и передавать предыдущий результат первым аргументом', () => {
            let array = randomNumberArray();
            let i = 0;
            let prevResult = array[0];

            reduce(array, prev => {
                assert.equal(prev, prevResult);

                return prevResult = i++;
            });
        });

        it('должна учитывать initial', () => {
            let array = randomNumberArray();
            let passed = [];
            let initial = random('number');

            reduce(array, prev => passed.push(prev), initial);
            assert.deepEqual(passed[0], initial);
        });

        it('если initial не указан, то при первой итерации в prev передается первый элемент массива', () => {
            let array = randomNumberArray();
            let passed = [];

            reduce(array, prev => passed.push(prev));
            assert.strictEqual(passed[0], array[0]);
        });

        it('должна передавать элемент вторым аргументом', () => {
            let array = randomNumberArray();
            let passed = [];
            let initial = random('number');

            reduce(array, (prev, el) => passed.push(el));
            assert.deepEqual(array.slice(1), passed);

            passed = [];
            reduce(array, (prev, el) => passed.push(el), initial); // с учетом initial
            assert.deepEqual(array, passed);
        });

        it('должна передавать индекс элемента третьим аргументом', () => {
            let array = randomNumberArray();
            let index = 1;
            let initial = random('number');

            reduce(array, (prev, el, i) => assert.equal(i, index++));

            index = 0;
            reduce(array, (prev, el, i) => assert.equal(i, index++), initial); // с учетом initial
        });

        it('должна передавать сам массив четвертым аргументом', () => {
            let array = randomNumberArray();

            reduce(array, (prev, el, i, a) => assert.strictEqual(a, array));
        });

        it('не должна изменять оригинальный массив', () => {
            let array = randomNumberArray();
            let arrayCopy = nativeSlice.call(array);

            reduce(array, el => el ** 2);
            assert.deepEqual(array, arrayCopy);
        });

        it('общая проверка работоспособности', () => {
            let array = randomNumberArray();
            let target = nativeReduce.call(array, (prev, el) => prev + el);
            let result = reduce(array, (prev, el) => prev + el);
            let initial = random('number');

            assert.deepEqual(result, target);

            target = nativeReduce.call(array, (prev, el) => prev + el, initial);
            result = reduce(array, (prev, el) => prev + el, initial);
            assert.deepEqual(result, target);
        });
    });

    describe('deleteProperty', () => {
        it('должна удалять указанное свойство из объекта', () => {
            let obj = { a: 1 };

            deleteProperty(obj, 'a');

            assert.notProperty(obj, 'a');
        });
    });

    describe('hasProperty', () => {
        it('должна возвращать true если объект имеет указанное свойство и false в противном случае', () => {
            let obj = { a: 1 };

            assert.isTrue(hasProperty(obj, 'a'));
            assert.isFalse(hasProperty(obj, 'b'));
        });
    });

    describe('getEnumProps', () => {
        it('должна возвращать массив только с перечисляемыми свойствами', () => {
            let obj = { a: 1, b: 2 };
            let target = ['a', 'b'];
            let result;

            Object.defineProperty(obj, 'c', { enumerable: false });
            result = getEnumProps(obj);

            assert.deepEqual(result, target);
        });
    });

    describe('upperProps', () => {
        it('должна возвращать массив с именами свойств и преобразовывать эти имена в верхний регистр', () => {
            let obj = { a: 1, b: 2 };
            let target = ['A', 'B'];
            let result = upperProps(obj);

            assert.deepEqual(result, target);
        });
    });

    describe('slice', () => {
        it('общая проверка работоспособности', () => {
            let array = [1, 2, 3, 4, 5, 6, 7];
            let target = nativeSlice.call(array);
            let result = slice(array);

            assert.deepEqual(result, target);

            target = nativeSlice.call(array, 0);
            result = slice(array, 0);
            assert.deepEqual(result, target);

            target = nativeSlice.call(array, 0, 0);
            result = slice(array, 0, 0);
            assert.deepEqual(result, target);

            target = nativeSlice.call(array, 0, 1);
            result = slice(array, 0, 1);
            assert.deepEqual(result, target);

            target = nativeSlice.call(array, 0, 2);
            result = slice(array, 0, 2);
            assert.deepEqual(result, target);

            target = nativeSlice.call(array, 0, 5);
            result = slice(array, 0, 5);
            assert.deepEqual(result, target);

            target = nativeSlice.call(array, 0, -1);
            result = slice(array, 0, -1);
            assert.deepEqual(result, target);

            target = nativeSlice.call(array, 0, -3);
            result = slice(array, 0, -3);
            assert.deepEqual(result, target);

            target = nativeSlice.call(array, 0, -10000);
            result = slice(array, 0, -10000);
            assert.deepEqual(result, target);

            target = nativeSlice.call(array, 3);
            result = slice(array, 3);
            assert.deepEqual(result, target);

            target = nativeSlice.call(array, 3, -100);
            result = slice(array, 3, -100);
            assert.deepEqual(result, target);

            target = nativeSlice.call(array, 3, 100);
            result = slice(array, 3, 100);
            assert.deepEqual(result, target);

            target = nativeSlice.call(array, 3, 5);
            result = slice(array, 3, 5);
            assert.deepEqual(result, target);

            target = nativeSlice.call(array, 9999);
            result = slice(array, 9999);
            assert.deepEqual(result, target);

            target = nativeSlice.call(array, -9999);
            result = slice(array, -9999);
            assert.deepEqual(result, target);

            target = nativeSlice.call(array, -9999, 4);
            result = slice(array, -9999, 4);
            assert.deepEqual(result, target);

            target = nativeSlice.call(array, -9999, -4);
            result = slice(array, -9999, -4);
            assert.deepEqual(result, target);
        });
    });
});
describe('Часть 3 - работа с исключениями и отладчиком', () => {
    describe('isAllTrue', () => {
        it('должна вызывать fn для всех элементов массива', () => {
            let array = random('array', 1);
            let pass = [];

            isAllTrue(array, e => pass.push(e));

            assert.deepEqual(pass, array);
        });

        it('должна вернуть true, если fn вернула true для всех элементов массива', () => {
            let array = randomNumberArray();
            let result = isAllTrue(array, Number.isFinite);

            assert.isTrue(result);
        });

        it('должна выбросить исключение, если передан пустой массив', () => {
            assert.throws(isAllTrue.bind(null, [], () => {
            }), 'empty array');
        });

        it('должна выбросить исключение, если передан не массив', () => {
            assert.throws(isAllTrue.bind(':(', () => {
            }), 'empty array');
        });

        it('должна выбросить исключение, если fn не функция', () => {
            let array = randomNumberArray();

            assert.throws(isAllTrue.bind(null, array, ':('), 'fn is not a function');
        });
    });

    describe('isSomeTrue', () => {
        it('должна вернуть true, если fn вернула true хотя бы для одного элемента массива', () => {
            let array = randomStringArray().concat(random('number'));
            let result = isSomeTrue(array, Number.isFinite);

            assert.isTrue(result);
        });

        it('должна выбросить исключение, если передан пустой массив', () => {
            assert.throws(isSomeTrue.bind(null, [], () => {
            }), 'empty array');
        });

        it('должна выбросить исключение, если передан не массив', () => {
            assert.throws(isSomeTrue.bind(':(', () => {
            }), 'empty array');
        });

        it('должна выбросить исключение, если fn не функция', () => {
            let array = randomNumberArray();

            assert.throws(isSomeTrue.bind(null, array, ':('), 'fn is not a function');
        });
    });

    describe('returnBadArguments', () => {
        it('должна вызывать fn для всех элементов массива', () => {
            let array = random('array', 1);
            let pass = [];

            returnBadArguments(e => pass.push(e), ...array);

            assert.deepEqual(pass, array);
        });

        it('должна вернуть массив с аргументами, для которых fn выбрасила исключение', () => {
            let evenNumbers = randomNumberArray('even');
            let oddNumbers = randomNumberArray('odd');
            let fn = a => {
                if (a % 2 != 0) {
                    throw new Error('not even');
                }
            };
            let result = returnBadArguments(fn, ...evenNumbers, ...oddNumbers);

            assert.deepEqual(result, oddNumbers);
        });

        it('должна вернуть массив пустой массив, если не передано дополнительных аргументов', () => {
            let fn = () => ':)';
            let result = returnBadArguments(fn);

            assert.deepEqual(result, []);
        });

        it('должна выбросить исключение, если fn не функция', () => {
            assert.throws(returnBadArguments.bind(null, ':('), 'fn is not a function');
        });
    });

    describe('calculator', () => {
        it('должна возвращать объект с методами', () => {
            let calc = calculator();

            assert.includeMembers(Object.keys(calc), ['sum', 'dif', 'div', 'mul']);
        });

        it('метод sum должен складывать аргументы', () => {
            let initialValue = random('number');
            let calc = calculator(initialValue);
            let args = randomNumberArray();

            assert.strictEqual(calc.sum(...args), args.reduce((prev, current) => prev + current, initialValue));
        });

        it('метод dif должен вычитать аргументы', () => {
            let initialValue = random('number');
            let calc = calculator(initialValue);
            let args = randomNumberArray();

            assert.strictEqual(calc.dif(...args), args.reduce((prev, current) => prev - current, initialValue));
        });

        it('метод div должен делить аргументы', () => {
            let initialValue = random('number');
            let calc = calculator(initialValue);
            let args = randomNumberArray();

            assert.strictEqual(calc.div(...args), args.reduce((prev, current) => prev / current, initialValue));
        });

        it('метод div должен выбрасывать исключение, если хотя бы один из аргументов равен 0', () => {
            let initialValue = random('number');
            let calc = calculator(initialValue);
            let args = [...randomNumberArray(), 0];

            assert.throws(calc.div.bind(null, ...args), 'division by 0');
        });

        it('метод mul должен умножать аргументы', () => {
            let initialValue = random('number');
            let calc = calculator(initialValue);
            let args = randomNumberArray();

            assert.strictEqual(calc.mul(...args), args.reduce((prev, current) => prev * current, initialValue));
        });

        it('функция должна выбрасывать исключение, если number не является числом', () => {
            assert.throws(calculator.bind(null, ':('), 'number is not a number');
        });

        it('значение по умолчанию для аргумента number должно быть равно 0', () => {
            let calc = calculator();
            let args = randomNumberArray();

            assert.strictEqual(calc.sum(...args), args.reduce((prev, current) => prev + current));
        });
    });
});
