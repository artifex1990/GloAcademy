'use strict';

const title = prompt('Как называется ваш проект?');
const screens = prompt('Какие типы экранов нужно разработать?');
const screenPrice = parseInt(prompt('Сколько будет стоить данная работа?'));
const adaptive = confirm('Нужен ли адаптив на сайте?');
const firstService = prompt('Какой дополнительный тип услуги нужен?');
const firstServicePrice = parseInt(prompt('Сколько это будет стоить?'));
const secondService = prompt('Какой дополнительный тип услуги нужен?');
const secondServicePrice = parseInt(prompt('Сколько это будет стоить?'));
const rollback = Math.random() * 100;
let fullPrice = 0;
let servicePercentPrice = 0;
let discount = 0;
let allServicePrices = 0;

const getAllServicePrices = function(servicePrice1, servicePrice2) {
    return servicePrice1 + servicePrice2;
}

function getFullPrice(screenPrice, fullPrice) {
    return screenPrice + fullPrice;
}

function getTitle(title) {
    let titleTemp = title;

    if (!titleTemp) return titleTemp;

    titleTemp = titleTemp.toLowerCase();

    return titleTemp[0].toUpperCase() + titleTemp.slice(1);
}

function getServicePercentPrices(fullPrice, rollback) {
    return Math.ceil(fullPrice - rollback);
}

function getScreens(screens) {
    return screens;
}

function getRollbackMessage(fullPrice) {
    switch(true) {
        case fullPrice > 30000:
            return 'Ваша скидка 10%!';
        case fullPrice > 15000:
            return 'Ваша скидка 5%!';
        case fullPrice > 0:
            return 'Скидка не предусмотрена!';
        default:
            return 'Что то пошло не так!';
    }
}

function showTypeOf(variable) {
    return typeof variable;
}

allServicePrices = getAllServicePrices(firstServicePrice, secondServicePrice);
fullPrice = getFullPrice(screenPrice, allServicePrices);
servicePercentPrice = getServicePercentPrices(fullPrice, rollback);

console.log('Некоторые интересные моменты по типам в js');
console.log(showTypeOf(getAllServicePrices));
console.log(showTypeOf(getRollbackMessage(fullPrice)));
console.log(showTypeOf(secondServicePrice));
console.log(showTypeOf(adaptive));
console.log('===================================');
console.log(`Название проекта '${getTitle(title)}'`);
console.log(`Экраны для разработки ${getScreens(screens)}`);
console.log(getRollbackMessage(fullPrice));
console.log(`Итоговая стоимость за вычетом отката посреднику: ${servicePercentPrice} руб.`);