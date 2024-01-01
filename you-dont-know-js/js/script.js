'use strict';

const adv = document.querySelector('.adv');

const books = document.querySelectorAll('.book');
const book1 = books[1];
const book2 = books[0];
const book3 = books[4];
const book4 = books[3];
const book5 = books[5];
const book6 = books[2];

const book2Chapters = book2.querySelectorAll('li');
const book2ChapterPreface = book2Chapters[1];
const book2Chapter1 = book2Chapters[3];
const book2Chapter2 = book2Chapters[6];
const book2Chapter3 = book2Chapters[8];
const book2Chapter4 = book2Chapters[4];
const book2Chapter5 = book2Chapters[5];
const book2ChapterAppendixB = book2Chapters[9];
const book2ChapterAppendixC = book2Chapters[2];

const book5Chapters = book5.querySelectorAll('li');
const book5ChapterPreface = book5Chapters[1];
const book5Chapter1 = book5Chapters[9];
const book5Chapter2 = book5Chapters[3];
const book5Chapter3 = book5Chapters[4];
const book5Chapter4 = book5Chapters[2];
const book5Chapter5 = book5Chapters[6];
const book5Chapter6 = book5Chapters[7];

const book6Chapters = book6.querySelectorAll('li');
const book6NewChapter = document.createElement('li');
const book6Chapter7 = book6Chapters[8];

book1.after(book2);
book2.after(book3);
book3.after(book4);
book5.after(book6);

document.body.style.backgroundImage = 'url(./image/adv.jpg)';
document.body.style.backgroundSize = 'auto';

book3.querySelector('h2 > a').innerHTML = 'Книга 3. this и <b>Прототипы</b> Объектов';

adv.remove();

book2ChapterPreface.after(book2Chapter1);
book2Chapter1.after(book2Chapter2);
book2Chapter2.after(book2Chapter3);
book2Chapter3.after(book2Chapter4);
book2Chapter4.after(book2Chapter5);
book2ChapterAppendixB.after(book2ChapterAppendixC);

book5ChapterPreface.after(book5Chapter1);
book5Chapter1.after(book5Chapter2);
book5Chapter2.after(book5Chapter3);
book5Chapter3.after(book5Chapter4);
book5Chapter4.after(book5Chapter5);
book5Chapter5.after(book5Chapter6);

book6NewChapter.textContent = 'Глава 8: За пределами ES6';
book6Chapter7.append(book6NewChapter);
