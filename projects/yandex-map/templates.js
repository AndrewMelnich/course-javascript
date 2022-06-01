export const formTemplate = ({ author, place, reviewText } = {}) => {
  return `
        <form id="add-form" class="form">
            <label class="form__block">
                <input value="${
                  author || ''
                }" type="text" placeholder="Укажите ваше имя" class="form__input" name="author" ><br></br>
            </label>
            <label class="form__block">
                <input value="${
                  place || ''
                }" type="text" placeholder="Укажите место" class="form__input" name="place" ><br></br>
            </label>
            <label class="form__block">
                <textarea value="${
                  reviewText || ''
                }" class="form__input form__input--textarea" placeholder="Оставьте отзыв" name="review"></textarea><br></br>
            </label>
            <div class="form__btn">
                <button id="add-btn">Добавить</button><br></br>
            </div>
        </form>
    `;
};
