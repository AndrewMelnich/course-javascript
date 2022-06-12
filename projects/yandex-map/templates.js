export const formTemplate = `
  <form id="add-form" class="form">
    <div class="form__name">Отзыв: </div>
    <label class="form__block">
        <input type="text" placeholder="Укажите ваше имя" class="form__input" name="author" >
    </label>
    <label class="form__block">
        <input type="text" placeholder="Укажите место" class="form__input" name="place" >
    </label>
        <textarea class="form__input form__input--textarea" placeholder="Оставьте отзыв" name="review"></textarea>
    <div class="form__btn">
        <button id="add-btn" class="form__button">Добавить</button>
    </div>
  </form> 
`;
