// Действие при нажатии кнопки Изменить кота
/*
    По умолчанию форма отправляется на сервер get-запросом по адресу атрибута action 
    (если он отсутсвует или пустой - страница перезагрузится)
*/
function updateItem() {
  updateForm.addEventListener("submit", (e) => {
    e.preventDefault(); // остановить действие по умолчанию
    const body = {};
    // console.log(addForm.children); // получить дочерние теги (прямые потомки)
    // console.log(addForm.elements); // получить все элементы формы (input/select/textarea/button)

    for (let i = 0; i < updateForm.elements.length; i++) {
      const upd = updateForm.elements[i];
      console.log(upd);
      // на сервер отправляются name=value
      console.log(upd.name);
      console.log(upd.value);
      if (upd.name) {
        // элемент формы имеет атрибут name (не является кнопкой)
        if (upd.type === "checkbox") {
          body[upd.name] = upd.checked;
        } else {
          // body[inp.name] = !isNaN(inp.value) ? +inp.value : inp.value;
          body[upd.name] = upd.value;
        }
      }
    }

    // Добавление карточки с новым котом, изменение фунции addCat
    fetch(`${path}/update/${body.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        // if (res.ok) {
        // если ответ сервера ОК - такого номера в списке котов нет
        updateForm.reset(); // очистить модальную форму
        mdBoxUpdate.style = null; // закрыть модальную форму
        localStorage.setItem("cats-data", JSON.stringify(body)); // перезаписываем глобальную переменную
      })
      .then((err) => {
        if (err && err.message) {
          alert(err.message);
        }
      });
  });
}
