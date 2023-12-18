'use strict';

const title = prompt('Как называется ваш проект?');
const screens = prompt('Какие типы экранов нужно разработать?');
const screenPrice = parseInt(prompt('Сколько будет стоить данная работа?'));
const adaptive = confirm('Нужен ли адаптив на сайте?');
const firstService = prompt('Какой дополнительный тип услуги нужен?');
const firstServicePrice = parseInt(prompt('Сколько это будет стоить?'));
const secondService = prompt('Какой дополнительный тип услуги нужен?');
const secondServicePrice = parseInt(prompt('Сколько это будет стоить?'));
const fullPrice = screenPrice + firstServicePrice + secondServicePrice;
const rollback = Math.random() * 100;
let error = false;

if (fullPrice > 30000) {
    fullPrice -= fullPrice * 0.1;
    console.log('Ваша скидка 10%!');
} else if (fullPrice > 15000) {
    fullPrice -= fullPrice * 0.05;
    console.log('Ваша скидка 5%!');
} else if (fullPrice > 0) {
    console.log('Скидка не предусмотрена!');
} else {
    error = true;
    console.log('Что то пошло не так!');
}

const servicePercentPrice = Math.ceil(fullPrice - rollback);

if (!error) {
    console.log(`Итоговая стоимость за вычетом отката посреднику ${servicePercentPrice}`);
}
