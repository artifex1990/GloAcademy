'use strict';

const title = document.getElementsByTagName('h1').title;
const calcBtn = document.getElementsByClassName('handler_btn').start;
const resetBtn = document.getElementsByClassName('handler_btn').reset;
const plusBtn = document.querySelector('.screen-btn');
const itemsPercent = document.querySelectorAll('.other-items.percent');
const itemsNumber = document.querySelectorAll('.other-items.number');
const inputRange = document.querySelector('.rollback input[type="range"]');
const spanRange = document.querySelector('.rollback span.range-value');
const total = document.getElementsByClassName('total-input').total;
const totalCount = document.getElementsByClassName('total-input')['total-count'];
const totalCountOther = document.getElementsByClassName('total-input')['total-count-other'];
const totalCountRollback = document.getElementsByClassName('total-input')['total-count-rollback'];
const totalFullCount = document.getElementsByClassName('total-input')['total-full-count'];
const screens = document.querySelectorAll('.screen');

const appData = {
    title: '',
    adaptive: true,
    rollback: 0,
    screens: [],
    servicesPercent: {},
    servicesNumber: {},

    isNumber: function(number) {
        return !isNaN(parseFloat(number)) && isFinite(number);
    },

    checkScreens: function() {
        const selects = screens[0].parentNode.querySelectorAll('select');
        const inputs = screens[0].parentNode.querySelectorAll('input');
        let isActive = true;
    
        calcBtn.removeAttribute('disabled');
    
        selects.forEach(select => {
            if (!select.value) isActive = false;
        });
    
        inputs.forEach(input => {
            if (!input.value) isActive = false;
        });

        if (!isActive) {
            calcBtn.setAttribute('disabled', '');
            calcBtn.style.opacity = '45%';
            calcBtn.style.cursor = 'default';
            calcBtn.style.pointerEvents = 'none';
        } else {
            calcBtn.style.opacity = '';
            calcBtn.style.cursor = 'pointer';
            calcBtn.style.pointerEvents = '';
        }
    },

    init: function() {
        this.addTitle();
        calcBtn.addEventListener('click', () => this.start());
        resetBtn.addEventListener('click', () => this.reset());
        plusBtn.addEventListener('click', () => this.addScreenBlock());
        inputRange.addEventListener('input', (event) => this.setRollback(event));
        this.updateEventsForScreen();
    },

    start: function() {
        this.blockScreen();
        this.blockAdditionalServices();
        this.replaceBtnControlOnReset();

        this.addScreens();
        this.addServices();
        this.showPrices();
        this.setCalcRollback();
    },

    reset: function() {
        this.resetScreen();
        this.resetAdditionalServices();
        this.replaceBtnControlOnCalc();
        
        this.addScreens();
        this.addServices();
        this.showPrices();
    },

    resetScreen: function() {
        const screens = document.querySelectorAll('.screen');

        screens.forEach((el, index) => {
            const select = el.querySelector('select');
            const input = el.querySelector('input');
            if (!index) {
                select.value = '';
                select.removeAttribute('disabled');
                input.value = '';
                input.removeAttribute('disabled');
            } else {
                el.remove();
            }  
        });
    },

    resetAdditionalServices: function() {
        document.querySelectorAll('input[type=checkbox]').forEach(el => {
            el.removeAttribute('disabled');
            el.checked = false;
        });
    },

    replaceBtnControlOnCalc: function() {
        plusBtn.style.display = '';
        calcBtn.style.display = '';
        resetBtn.style.display = 'none';
    },

    replaceBtnControlOnReset: function() {
        plusBtn.style.display = 'none';
        calcBtn.style.display = 'none';
        resetBtn.style.display = '';
    },

    blockScreen: function() {
        const screens = document.querySelectorAll('.screen');

        screens.forEach(el => {
            el.querySelector('select').setAttribute('disabled', '');
            el.querySelector('input').setAttribute('disabled', '');
        });
    },

    blockAdditionalServices: function() {
        document.querySelectorAll('input[type=checkbox]').forEach(el => el.setAttribute('disabled', ''));
    },

    getAllScreenPrices: function() {  
        return this.screens.reduce((acc, service) => acc += service.price, 0);
    },
    
    getAllServicePrices: function() {
        let pricesNumber = Object.values(this.servicesNumber).reduce((acc, serviceNumber) => acc += serviceNumber, 0);
        let pricesPercent = Object.values(this.servicesPercent).reduce((acc, servicePercent) => acc += this.getAllScreenPrices() * servicePercent / 100, 0);

        return pricesNumber + pricesPercent;
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

    getPriceWithRollback: function() {
        return Math.ceil(this.getFullPrice() + this.getFullPrice() * this.rollback / 100);
    },

    getScreenCount: function() {
        return this.screens.reduce((acc, screen) => acc += screen.count, 0);
    },

    setCalcRollback: function() {
        calcBtn.setAttribute('calculaterollback', '');
    },

    setRollback: function(event) {
        this.rollback = +event.target.value;
        spanRange.textContent = event.target.value + '%';

        if (calcBtn.hasAttribute('calculaterollback')) {
            this.addScreens();
            this.addServices();
            this.showPrices();
        }
    },

    addTitle: function() {
        document.title = this.getTitle(title.textContent);
    },

    addScreenBlock: function() {
        const screens = document.querySelectorAll('.screen');
        const newScreen = screens[0].cloneNode(true);
        
        newScreen.querySelector('input').value = '';
        screens[screens.length - 1].after(newScreen);
        this.updateEventsForScreen();
    },

    addScreens: function() {
        this.screens = [];
        const screens = document.querySelectorAll('.screen');

        screens.forEach((screen, index) => {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            const selectText = select.options[select.selectedIndex].textContent;

            if (select.selectedIndex && this.isNumber(+input.value)) {
                this.screens.push({
                    id: index,
                    name: selectText,
                    count: +input.value,
                    price: +select.value * +input.value
                });
            }
        });
    },

    addServices: function() {
        this.servicesNumber = {};
        this.servicesPercent = {};

        itemsPercent.forEach(element => {
            const check = element.querySelector('input[type=checkbox]');
            const label = element.querySelector('label');
            const input = element.querySelector('input[type=text]');

            if (check.checked) {
                this.servicesPercent[label.textContent] = +input.value;    
            }
        });

        itemsNumber.forEach(element => {
            const check = element.querySelector('input[type=checkbox]');
            const label = element.querySelector('label');
            const input = element.querySelector('input[type=text]');

            if (check.checked) {
                this.servicesNumber[label.textContent] = +input.value;    
            }
        });
    },

    updateEventsForScreen: function() {
        const screens = document.querySelectorAll('.screen');
        screens.forEach((event) => {
            event.addEventListener('input', () => {
                this.checkScreens();
            });
        });
        this.checkScreens();
    },

    showPrices: function() {
        total.value = this.getAllScreenPrices();
        totalCount.value = this.getScreenCount()
        totalCountOther.value = this.getAllServicePrices();
        totalFullCount.value = this.getFullPrice();
        totalCountRollback.value = this.getPriceWithRollback();
    },

    logger: function() {
        for(let key in this) {
            console.log(`${key}: ${this[key]}`);
        }
    }

}

appData.init();