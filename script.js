'use strict';

let title = prompt('Как называется ваш проект?');
let screens = prompt('Какие типы экранов нужно разработать?');
let screenPrice = parseInt(prompt('Сколько будет стоить данная работа?'));
let adaptive = confirm('Нужен ли адаптив на сайте?');
let firstService = prompt('Какой дополнительный тип услуги нужен?');
let firstServicePrice = parseInt(prompt('Сколько это будет стоить?'));
let secondService = prompt('Какой дополнительный тип услуги нужен?');
let secondServicePrice = parseInt(prompt('Сколько это будет стоить?'));
let fullPrice = 0;
let servicePercentPrice = 0;
let discount = 0;
let allServicePrices = 0;

const getAllServicePrices = function(servicePrice1, servicePrice2) {
    return servicePrice1 + servicePrice2;
}

function getFullPrice(screenPrice, call) {
    return screenPrice + call(firstServicePrice, secondServicePrice);
}

function getTitle(title) {
    let titleTemp = title;

    if (!titleTemp) return titleTemp;

    titleTemp = titleTemp.toLowerCase();

    return titleTemp[0].toUpperCase() + titleTemp.slice(1);
}

function getServicePercentPrices(fullPrice) {
    const rollback = Math.random() * 100;

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

allServicePrices = getAllServicePrices(firstServicePrice, secondServicePrice);
fullPrice = getFullPrice(screenPrice, getAllServicePrices);
servicePercentPrice = getServicePercentPrices(fullPrice);

console.log(`Название проекта '${getTitle(title)}'`);
console.log(`Экраны для разработки ${getScreens(screens)}`);
console.log(getRollbackMessage(fullPrice));
console.log(`Итоговая стоимость за вычетом отката посреднику: ${servicePercentPrice} руб.`);