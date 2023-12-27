'use strict';

const appData = {
    title: '',
    screens: [],
    adaptive: true,
    rollback: Math.random() * 100,
    fullPrice: 0,
    servicePercentPrice:0,
    additionalServices: [],

    isNumber: function(number) {
        return !isNaN(parseFloat(number)) && isFinite(number);
    },

    isString: function(string) {
        return !this.isNumber(string) && typeof string === 'string' && string.length;
    },

    getAllScreenPrices: function() {  
        return this.screens.reduce((acc, service) => acc += service.price, 0);
    },
    
    getAllServicePrices: function() {  
        return this.additionalServices.reduce((acc, service) => acc += service.price, 0);
    },
    
    asking: function() {
        const maxScreens = 2;
        const maxServices = 2;

        do {
            this.title = prompt('Как называется ваш проект?');
        } while(!this.isString(this.title));
        

        for(let id = 0; id < maxScreens; id++) {
            let name = '';
            let price = 0;

            do {
                name = prompt('Какой тип экрана разрабатываем?');
            } while(!this.isString(name));

            do {
                price = prompt(`Сколько он будет стоить?`);
            } while(!this.isNumber(price));

            this.screens.push({id, name, price: parseFloat(price)});
        }
        
        for(let id = 0; id < maxServices; id++) {
            let name = '';
            let price = 0;

            do {
                name = prompt(`Какой дополнительный тип услуги №${id + 1} нужен?`);
            } while(!this.isString(name));

            do {
                price = prompt('Сколько будет стоить данная работа?');
            } while(!this.isNumber(price));
    
            this.additionalServices.push({id, name, price: parseFloat(price)});
        }
    
        this.adaptive = confirm('Нужен ли адаптив на сайте?');
    },
    
    getFullPrice: function() {
        return this.getAllScreenPrices() + this.getAllServicePrices();
    },
    
    getTitle: function(title) {
        let titleTemp = title;
    
        if (!titleTemp || typeof title !== 'string') return titleTemp;
    
        titleTemp = titleTemp.trim().toLowerCase();
    
        return titleTemp[0].toUpperCase() + titleTemp.slice(1);
    },
    
    getServicePercentPrices: function() {
        return Math.ceil(this.getFullPrice() - this.rollback);
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
                console.log(`Наименование услуги '${this.getTitle(service.name)}' и её стоимость: ${service.price} руб.`)
        );
    },

    printScreens: function() {
        this.screens.forEach(
            screen => 
                console.log(`Тип экрана '${this.getTitle(screen.name)}' и его стоимость: ${screen.price} руб.`)
        );
    },

    start: function() {
        this.asking();

        this.fullPrice = this.getFullPrice();
        this.servicePercentPrice = this.getServicePercentPrices();

        this.logger();
    },

    logger: function() {
        console.log('================Услуги===================');
        this.printServices();
        
        console.log('================Экраны===================');
        this.printScreens();

        console.log('===================================');
        console.log(`Название проекта '${this.getTitle(this.title)}'`);
        console.log(this.getRollbackMessage(this.getFullPrice()));
        console.log(`Итоговая стоимость за вычетом отката посреднику: ${this.servicePercentPrice} руб.`);

        console.log('================Поля и методы объекта appData===================');


        for(let key in this) {
            console.log(`${key}: ${this[key]}`);
        }
    }

}

appData.start();
