// Формат создания выскакивающей модальной карточки кота
const generateCatCardPopup = (catResult) => {
  return `<div class="popup-wrapper-cat-card active">
          <div class="popup-cat-card active">
          <div class="popup-close-cat-card btn"><i class="fa-solid fa-xmark"></i></div>
              <div name="popupCard" class="${
                catResult.favorite ? "card__like" : "card"
              }"
              style="background-image: url(${catResult.image})">
           
            <div name="id">${catResult.id}</div>
              <div name="name">${catResult.name}</div>
              <div name="description">${catResult.description}</div>
              <div name="age">${catResult.age}</div>
              <div name="rate">${catResult.rate}</div>
          </div>
      </div>`;
};
