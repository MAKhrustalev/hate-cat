// 6) Функция создание карточки одного кота
// 7 Поскольку котов много - завернуть это в  функцию
function createCard(cat, el = box) {
  const card = document.createElement("div");
  card.className = "card";
  if (!cat.image) {
    card.classList.add("default");
  } else {
    card.style.backgroundImage = `url(${cat.image})`;
  }
  const name = document.createElement("h3");
  name.innerText = cat.name;
  // переменная like
  const like = document.createElement("i");
  like.className = "fa-heart card__like";
  like.classList.add(cat.favorite ? "fa-solid" : "fa-regular");
  // 10) Установка лайка на сердечко
  like.addEventListener("click", (e) => {
    e.stopPropagation(); // чтобы нажатие на сердце,не запускало
    //  нажатие на карточку и ее удаление
    if (cat.id) {
      fetch(`${path}/update/${cat.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ favorite: !cat.favorite }),
      }).then((res) => {
        if (res.status === 200) {
          like.classList.toggle("fa-solid"); // toggle или то или то
          like.classList.toggle("fa-regular");
          cats = cats.map((c) => {
            if (c.id === cat.id) {
              c.favorite = !cat.favorite;
            }
            return c;
          });
          localStorage.setItem("cats-data", JSON.stringify(cats)); // перезаписываем глобальную переменную
        }
        return c;
      });
    }
  });

  // переменная handle
  const handle = document.createElement("div");
  handle.className = "handle";

  // переменная trash
  const trash = document.createElement("i");
  trash.className = "fa-solid fa-trash card__trash";
  trash.addEventListener("click", (e) => {
    // событие по клику - удаление карточки
    e.stopPropagation();
    // deleteCard(???, e.currentTarget.parentElement);
    deleteCard(cat.id, card);
  });

  // переменная view
  const view = document.createElement("i");
  view.className = "fa-solid fa-eye card__view";
  view.addEventListener("click", (e) => {
    // событие по клику - просмотр карточки
    e.stopPropagation();
    // deleteCard(???, e.currentTarget.parentElement);
    viewCard(cat.id, card);
  });

  // переменная Update
  const update = document.createElement("i");
  update.className = "fa-solid fa-edit card__edit";
  update.addEventListener("click", (e) => {
    //   // событие по клику - просмотр карточки
    e.stopPropagation();
    //   // deleteCard(???, e.currentTarget.parentElement);
    updateCard(cat.id, card);
  });

  // добавить элементы на карточку сердечко, имя, корзину, глаз
  handle.append(update, view, trash);
  card.append(like, name, handle);
  if (cat.age >= 0) {
    const age = document.createElement("span");
    age.innerText = cat.age;
    card.append(age);
  }
  // По клику на карточке удаляется карточка с определенным id
  // card.addEventListener("click", (e) => { // временно комментируем, чтобы не удалить
  //   deleteCard(cat.id, card);
  // });
  el.append(card);
}
// 9) Фунция удаления карточки с котом
function deleteCard(id, el) {
  if (id) {
    // если есть id
    fetch(`${path}/delete/${id}`, {
      method: "DELETE",
    }).then((res) => {
      // console.log(res);
      // console.log(res.status);
      if (res.status === 200) {
        el.remove();
        cats = cats.filter((c) => c.id !== id); //только коты с id не сопадающим с id удаленного
        localStorage.setItem("cats-data", JSON.stringify(cats)); // перезаписываем глобальную переменную
      }
    });
  }
}

// Открыть модальное окно конкретного кота
const openCatCardPopup = (catResult) => {
  const container = document.getElementsByClassName("container")[0];
  container.insertAdjacentHTML("afterbegin", generateCatCardPopup(catResult));

  let catPopup = document.querySelector(".popup-wrapper-cat-card");
  // Закрыть всплывающее окно с котом (внутри функции открытия)
  let closeCatPopup = document.querySelector(".popup-close-cat-card");

  closeCatPopup.addEventListener("click", () => {
    catPopup.remove();
  });
};

// Функция заполнения модального окна конкретного кота
function viewCard(id) {
  if (id) {
    // если есть id
    fetch(`${path}/show/${id}`)
      .then((res) => {
        openCatCardPopup(res);
        return res.ok ? res.json() : Promise.reject("Ктопроблема");
      })
      .then((catResult) => {
        // Наполнить модальное окно данными, выгруженными из карточки
        document.getElementsByName("popupCard")[0].style.backgroundImage =
          "url(" + catResult.image + ")";
        document.getElementsByName("id")[0].innerText = catResult.id;
        document.getElementsByName("name")[0].innerText = catResult.name;
        document.getElementsByName("description")[0].innerText =
          catResult.description;
        document.getElementsByName("age")[0].innerText = catResult.age;
        document.getElementsByName("rate")[0].innerText = catResult.rate;
      });
  }
}

// document
//   .getElementsByClassName("container")[0]
//   .addEventListener("click", (event) => {
//     if (event.target.className === "fa-solid fa-eye card__view") {
//       console.log(id);
//       //  синхронная функция просмотра кота
//       viewCard(cat.id, card).then((res) => {
//         console.log(res);
//         openCatCardPopup(res);
//       });
//     }
//   });

// document
//   .getElementsByClassName("container")[0]
//   .addEventListener("click", (event) => {
//     console.log(event.target.className);
//   });

// 8) !!!!!!!!!!!!!!!!!!!Добавить мою базу котов!!!!!!!!!

/*
    AJAX - отправить запрос на другой сервис (сервер) без перезагрузки страницы 
    (fetch / xhr - XmlHttpRequest / axios)
    Async
    JavaScript
    And
    XML
*/
if (!cats) {
}
// Функция автоматической генерации новых id для добавляемых котов
//  (создали временно, пока не создали всплывающую форму для создания котов)
// let ids = [];
// fetch(path + "/ids")
//   .then((res) => res.json())
//   .then((data) => {
//     console.log(data);
//     ids = [...data];
//     myCat.id = ids.length ? ids[ids.length - 1] + 1 : 1;
//     // myCat.id = 7;
//     // addCat(myCat); //- эта функция должна быть активна и привязана к кнопке
//   });
// Хардкодная функция для добавления кота
/*
    request fetch:
        1) path - путь запроса
        2) http-заголовки - объект со всеми параметрами запроса 
        (method, headers, body - то что отправляется на сервер (данные))

        Из объекта в строку
        JSON.stringify(obj) <> {a: 123} => '{"a": 123}' 
        Из строки в объект
        JSON.parse(str) <> '{"a": 123}'=> {a: 123}
*/
function addCat(cat) {
  fetch(path + "/add", {
    method: "POST", // та же логика прописывается к put и patch - запросам
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cat), // передать тело кота в виде строки
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
}

if (cats) {
  try {
    cats = JSON.parse(cats); // сделать из строки объект
    console.log(cats);
    for (let cat of cats) {
      createCard(cat, box);
      console.log(cat);
    }
  } catch (err) {
    if (err) {
      cats = null;
    }
  }
} else {
  // Если котов не было - попросить их с сервера
  fetch(path + "/show")
    .then(function (res) {
      console.log(res);
      if (res.statusText === "OK") {
        /*
                  Все методы res возвращают Promise
                  res.text() => возвращает текстовое содержимое (HTML-файл)
                  res.blob() => возвращает двоичный код (бинарный формат данных) 10 => 00001010 => 0a => файлы (картинки / файл)
                  res.json() => отображает данные в ввиде объекта
              */
        return res.json();
      }
    })
    .then(function (data) {
      // data - отввет от сервера
      // console.log(data);
      if (!data.length) {
        box.innerHTML = '<div class="empty">У вас пока еще нет питомцев</div>';
      } else {
        cats = [...data];
        localStorage.setItem("cats-data", JSON.stringify(data));
        for (let c of data) {
          createCard(c, box);
        }
      }
    });
}

// 11) Фунция редактирования карточки с котом ?????????????????????????????????????????????????
mdBox.addEventListener;
function updateCard(id, el = box) {
  if (id) {
    // если есть id
    fetch(`${path}/update/${id}`, {
      method: "PUT",
    }).then((res) => {
      // openCatCardPopup(res);

      // viewCard(id);
      // console.log(res);
      // console.log(res.status);
      if (res.status === 200) {
        // el.remove();
        // cats = cats.filter((c) => c.id !== id); //только коты с id не сопадающим с id удаленного
        localStorage.setItem("cats-data", JSON.stringify(cats)); // перезаписываем глобальную переменную
      }
    });
  }
}
