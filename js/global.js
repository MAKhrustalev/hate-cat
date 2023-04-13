// Файл для хранения глобальных функций и переменных

// 5) Создаем контейнеры для котов
const box = document.querySelector(".container");

const addBtn = document.querySelector(".add-btn");
const mdBox = document.querySelector(".modal-container");
const mdClose = mdBox.querySelector(".modal-close");
const addForm = document.forms.add; // add row55 index.html

// const updateBtn = event.target.parentElement.parentElement;
// const target = event.target;
// const updateBtn = document.getElementsByClassName(
//   "fa-solid fa-edit card__update"
// );
const mdBoxUpdate = document.querySelector(".modal-container-update");
const mdUpdClose = mdBoxUpdate.querySelector(".modal-update-close");
const updateForm = document.forms.update; // add row84 index.html

// console.log(updateBtn);

console.log(updateForm);
// // const user = "MAKhrustalev"; // мой набор котов - статичный юзер
// const path = `https://cats.petiteweb.dev/api/single/${user}`;

/* 
    Вс е хранится как текст (в виде строки)
    localStorage
        .getItem(name);
        .setItem(name, "value")
*/

let user = localStorage.getItem("maxim"); // перредает строку имя пользователя, которая хранилась в локальном хранилище

if (!user) {
  user = prompt("Ваше уникальное имя: ", "MAKhrustalev");
  localStorage.setItem("maxim", user);
}

const path = `https://cats.petiteweb.dev/api/single/${user}`;
// const path = `https://cats.petiteweb.dev/api/single/lk12`;

/*
    1)
        При загрузке страницы проверять, есть ли коты в LS?
        Если коты уже были в LS - отрисовывать сайт с ними
        Иначе - отправлять сетевой запрос и просить данные с котами (у БД)
*/
let cats = localStorage.getItem("cats-data"); // получить массив с котами, чтобы проверить есть ли он
// console.log(cats);
if (cats) {
  try {
    cats = JSON.parse(cats); //сделать из строки объект
    // console.log(cats);
    for (let cat of cats) {
      createCard(cat, box);
      console.log(cat);
    }
  } catch (error) {
    if (error) {
      cats = null;
    }
  }
} else {
  // Если котов не было , попросить их с сервера
  fetch(path + "/show") // асинхронный promise
    .then(function (res) {
      console.log(res);
      if (res.statusText === "OK") {
        /*
                Все методы res возвращают Promise
                res.text() => возвращает текстовое содержимое (HTML-файл)
                res.blob() => возвращает двоичный код (бинарный формат данных)
                 10 => 00001010 => 0a => файлы (картинки / файл)
                res.json() => отображает данные в ввиде объекта
            */
        return res.json();
      }
    })
    // Если в базе нет котов - предупреджсем об этом, если есть выводим все их карточки
    .then(function (data) {
      // data - ответ от сервера, c - каждый кот в этом массиве
      // console.log(data);
      if (!data.length) {
        box.innerHTML = '<div class="empty">У вас пока нет котиков</div>';
      } else {
        cats = [...data]; // эти коты будут храниться в localStorage (деструктуризация)
        localStorage.setItem("cats-data", data);
        for (let c of data) {
          createCard(c, box);
        }
      }
    });
}

// let a = 2;
// let b = a;
// b = 6;
// console.log("a", a, ", b", b);  // "a", 2, ", b", 6

// Деструктуризация объектов
// let c = {a: 2}
// let d = {...c}; // деструктуризация (копирование объекта или массивва) - скопировать все свойства объекта с, но создать новый объект
// c.a = 6;- меняем у объекта с свойство а на 6
// console.log("c", c.a, ", d", d.a); // "с", 6, ",  d", 2

// 4БДЗ + ГП => отл
// 4БДЗ (2+) => хор
// 3БДЗ (1+) => уд
