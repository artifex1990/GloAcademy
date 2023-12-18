'use strict';

const title = prompt('Как называется ваш проект?');
const screens = prompt('Какие типы экранов нужно разработать?');
const screenPrice = parseInt(prompt('Сколько будет стоить данная работа?'));
const rollback = Math.trunc(Math.random() * 100 + 1);
const fullPrice = Infinity;
const adaptive = !!prompt('Нужен ли адаптив на сайте?');

//Вывести в консоль тип данных значений переменных title, fullPrice, adaptive;
console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);

//Вывести в консоль длину строки из переменной screens
console.log(screens.length);

/*
Вывести в консоль “Стоимость верстки экранов (screenPrice) рублей/ долларов/гривен/юани”
и “Стоимость разработки сайта (fullPrice) рублей/ долларов/гривен/юани”
*/
console.log(`${screenPrice} рублей`);
console.log(`${Math.round(screenPrice / 89.7 * 100) / 100} долларов`);
console.log(`${Math.round(screenPrice / 2.42 * 100) / 100} гривен`);
console.log(`${Math.round(screenPrice / 12.61 * 100) / 100} юани`);

console.log(`${rollback} рублей`);
console.log(`${Math.round(rollback / 89.7 * 100) / 100} долларов`);
console.log(`${Math.round(rollback / 2.42 * 100) / 100} гривен`);
console.log(`${Math.round(rollback / 12.61 * 100) / 100} юани`);

//Привести строку screens к нижнему регистру и разбить строку на массив, вывести массив в консоль
console.log(screens.toLowerCase().split(''));

//Вывести в консоль Процент отката посреднику за работу (fullPrice * (rollback/100))
console.log(fullPrice * (rollback / 100));
