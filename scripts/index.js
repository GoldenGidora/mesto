let buttonEdit = document.querySelector('.profile__button_type_edit');
let popup = document.querySelector('.popup');
let buttonClose = document.querySelector('.popup__close');
let userName = document.querySelector('.profile__title');
let userDescription = document.querySelector('.profile__text');
let userNameInput = document.querySelector('.popup__input_type_name');
let userDescriptionInput = document.querySelector('.popup__input_type_description');
let buttonAdd = document.querySelector('.profile__button_type_add');
let formSubmit = document.querySelector('#popup_form_submit');

buttonEdit.addEventListener('click', () => {
    popup.classList.add('popup_opened');
    userNameInput.value = userName.textContent;
    userDescriptionInput.value = userDescription.textContent;
})

buttonClose.addEventListener('click', () => {
    popup.classList.remove('popup_opened');
})

formSubmit.addEventListener('submit', (event) => {
    event.preventDefault();
    userName.textContent = `${userNameInput.value}`;
    userDescription.textContent = `${userDescriptionInput.value}`;
    popup.classList.remove('popup_opened');
})