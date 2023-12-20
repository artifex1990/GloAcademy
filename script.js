'use strict';

const additionalServices = [];
let title;
let screens;
let screenPrice;
let adaptive;
let rollback = Math.random() * 100;
let fullPrice = 0;
let servicePercentPrice = 0;
let discount = 0;
let allServicePrices = 0;

const isNumber = function(number) {
    return !isNaN(parseFloat(number)) && isFinite(number) && !`${number}`.includes(' ');
}

const getAllServicePrices = function() {
    const maxServices = 2;
    let sum = 0;
    let serviceIndex = 0;
    let nameService;
    let costService;

    while (serviceIndex < maxServices) {
        nameService = prompt(`Какой дополнительный тип услуги №${serviceIndex + 1} нужен?`);
        costService = prompt(`Сколько будет стоить услуга №${serviceIndex + 1}?`);

        if (isNumber(costService)) {
            costService = parseFloat(costService);
            additionalServices[serviceIndex] = {
                'nameService': nameService,
                'costService': costService
            };
            sum += costService;
            serviceIndex++
        } else {
            alert(`Вы ввели не число! Задайте заново наименование услуги №${serviceIndex + 1} и стоимость!`);
        }
    }

    return sum;
}

function asking() {
    title = prompt('Как называется ваш проект?');
    screens = prompt('Какие типы экранов нужно разработать?');

    do {
        screenPrice = prompt('Сколько будет стоить данная работа?');
    } while(!isNumber(screenPrice));

    screenPrice = parseFloat(screenPrice);
    adaptive = confirm('Нужен ли адаптив на сайте?');
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

function printServices(services) {
    services.forEach(
        service => 
            console.log(`Наименование услуги '${getTitle(service.nameService)}' и её стоимость: ${service.costService} руб.`)
    );
}

asking();
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice(screenPrice, allServicePrices);
servicePercentPrice = getServicePercentPrices(fullPrice, rollback);

console.log('Некоторые интересные моменты по типам в js');
console.log(showTypeOf(getAllServicePrices));
console.log(showTypeOf(getRollbackMessage(fullPrice)));
console.log(showTypeOf(adaptive));
console.log('================Услуги===================');
printServices(additionalServices);
console.log('===================================');
console.log(`Название проекта '${getTitle(title)}'`);
console.log(`Экраны для разработки ${getScreens(screens)}`);
console.log(getRollbackMessage(fullPrice));
console.log(`Итоговая стоимость за вычетом отката посреднику: ${servicePercentPrice} руб.`);
