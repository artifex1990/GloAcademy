'use strict';

const appData = {
    title: '',
    screens: '',
    screenPrice: 0,
    adaptive: true,
    rollback: Math.random() * 100,
    fullPrice: 0,
    servicePercentPrice:0,
    allServicePrices: 0,
    additionalServices: [],

    isNumber: function(number) {
        return !isNaN(parseFloat(number)) && isFinite(number);
    },
    
    getAllServicePrices: function() {
        const maxServices = 2;
        let sum = 0;
        let serviceIndex = 0;
        let nameService;
        let costService;
    
        while (serviceIndex < maxServices) {
            nameService = prompt(`Какой дополнительный тип услуги №${serviceIndex + 1} нужен?`);
            costService = prompt(`Сколько будет стоить услуга №${serviceIndex + 1}?`);
    
            if (this.isNumber(costService)) {
                costService = parseFloat(costService);
                this.additionalServices[serviceIndex] = {
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
    },
    
    asking: function() {
        this.title = prompt('Как называется ваш проект?');
        this.screens = prompt('Какие типы экранов нужно разработать?');
    
        do {
            this.screenPrice = prompt('Сколько будет стоить данная работа?');
        } while(!this.isNumber(this.screenPrice));
    
        this.screenPrice = parseFloat(this.screenPrice);
        this.adaptive = confirm('Нужен ли адаптив на сайте?');
    },
    
    getFullPrice: function() {
        return this.screenPrice + this.fullPrice;
    },
    
    getTitle: function(title) {
        let titleTemp = title;
    
        if (!titleTemp || typeof title !== 'string') return titleTemp;
    
        titleTemp = titleTemp.trim().toLowerCase();
    
        return titleTemp[0].toUpperCase() + titleTemp.slice(1);
    },
    
    getServicePercentPrices: function() {
        return Math.ceil(this.fullPrice - this.rollback);
    },
    
    getScreens: function() {
        return this.screens;
    },
    
    getRollbackMessage: function(fullPrice) {
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
    },
    
    printServices: function() {
        this.additionalServices.forEach(
            service => 
                console.log(`Наименование услуги '${this.getTitle(service.nameService)}' и её стоимость: ${service.costService} руб.`)
        );
    },

    start: function() {
        this.asking();

        this.allServicePrices = this.getAllServicePrices();
        this.fullPrice = this.getFullPrice(this.screenPrice, this.allServicePrices);
        this.servicePercentPrice = this.getServicePercentPrices();

        console.log('================Услуги===================');
        this.printServices();
        console.log('===================================');
        console.log(`Название проекта '${this.getTitle(this.title)}'`);
        console.log(`Экраны для разработки ${this.getScreens()}`);
        console.log(this.getRollbackMessage(this.fullPrice));
        console.log(`Итоговая стоимость за вычетом отката посреднику: ${this.servicePercentPrice} руб.`);
        console.log('================Поля и методы объекта appData===================');
        this.logger();
    },

    logger: function() {
        
        for(let key in this) {
            console.log(`${key}: ${this[key]}`);
        }
    }

}

appData.start();

