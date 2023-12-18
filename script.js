const title = 'Название проекта';
const screens = 'Простые, Сложные, Интерактивные';
const screenPrice = 123;
const rollback = Math.trunc(Math.random() * 100 + 1);
const fullPrice = Infinity;
const adaptive = true;

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);

console.log(screens.length);

console.log(`${screenPrice} рублей`);
console.log(`${Math.round(screenPrice / 89.7 * 100) / 100} долларов`);
console.log(`${Math.round(screenPrice / 2.42 * 100) / 100} гривен`);
console.log(`${Math.round(screenPrice / 12.61 * 100) / 100} юани`);

console.log(`${rollback} рублей`);
console.log(`${Math.round(rollback / 89.7 * 100) / 100} долларов`);
console.log(`${Math.round(rollback / 2.42 * 100) / 100} гривен`);
console.log(`${Math.round(rollback / 12.61 * 100) / 100} юани`);

console.log(screens.toLowerCase().split(''));

console.log(fullPrice * (rollback / 100));