let buttonEdit = document.querySelector('.profile__button_type_edit');
let popup = document.querySelector('.popup');
let buttonClose = document.querySelector('.popup__close');
let userName = document.querySelector('.profile__title');
let userDescription = document.querySelector('.profile__text');
let userNameInput = document.querySelector('.popup__input_type_name');
let userDescriptionInput = document.querySelector('.popup__input_type_description');
let buttonAdd = document.querySelector('.profile__button_type_add');
let formSubmit = document.querySelector('#popup_form_submit');
let template = document.querySelector('#template_card');
const initialCards  = [
    {
        name: 'Mountain',
        link: 'https://images.unsplash.com/photo-1683520596266-b7811d63e5af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    },
    {
        name: 'Desert',
        link: 'https://images.unsplash.com/photo-1683526976156-1a3f1a315049?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80',
    },
    {
        name: 'Soldiers are resting on the field',
        link: 'https://images.unsplash.com/photo-1683480678676-9aff6d4cf61c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1118&q=80',
    },
    {
        name: 'Zürich, Switzerland',
        link: 'https://images.unsplash.com/photo-1683377117046-99ca0f5a8291?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    },
    {
        name: 'Crocodiles',
        link: 'https://images.unsplash.com/photo-1683640528593-f3e19d9e06ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    },
    {
        name: 'Osaka, Japan',
        link: 'https://images.unsplash.com/photo-1683459597762-0d8cf92b6c1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    },
]
function closePopup() {
    popup.classList.remove('popup_opened');
}

function cardRender(cardList) {

}

buttonEdit.addEventListener('click', () => {
    popup.classList.add('popup_opened');
    userNameInput.value = userName.textContent;
    userDescriptionInput.value = userDescription.textContent;
})

buttonClose.addEventListener('click', closePopup)

formSubmit.addEventListener('submit', (event) => {
    event.preventDefault();
    userName.textContent = `${userNameInput.value}`;
    userDescription.textContent = `${userDescriptionInput.value}`;
    closePopup();
})