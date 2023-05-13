let userName = document.querySelector('.profile__title'),
    userDescription = document.querySelector('.profile__text'),
    buttonProfileEdit = document.querySelector('.profile__button_type_edit'),
    popupEditProfile = document.querySelector('.popup_type_edit_profile'),
    buttonCloseEditPopup = document.querySelector('#CloseEdit'),
    userNameInput = document.querySelector('.popup__input_type_name'),
    userDescriptionInput = document.querySelector('.popup__input_type_description'),
    editFormSubmit = document.querySelector('#popup_edit_submit');

let buttonPlaceAdd = document.querySelector('.profile__button_type_add'),
    buttonCloseAddPopup = document.querySelector('#CloseAdd'),
    popupAddPlace = document.querySelector('.popup_type_add_post'),
    placeNameInput = document.querySelector('.popup__input_type_place'),
    placeLinkInput = document.querySelector('.popup__input_type_link'),
    placeAddFormSubmit = document.querySelector('#popup_add_submit');

let template = document.querySelector('#template_card').content;
let cardsSection = document.querySelector('.cards');
const initialCards = [
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

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function cardRender(cardItem) {
    let cardElement = template.querySelector('.cards__item').cloneNode(true);
    cardElement.querySelector('.cards__img').src = cardItem.link;
    cardElement.querySelector('.cards__title').textContent = cardItem.name;
    const like = cardElement.querySelector('.cards__like');
    like.addEventListener('click', () => {
        like.classList.toggle('cards__like_active');
    })
    cardElement.querySelector('.cards__delete')
        .addEventListener('click', () => cardElement.remove());
    cardsSection.prepend(cardElement);
}

initialCards.map(cardRender)

buttonProfileEdit.addEventListener('click', () => {
    openPopup(popupEditProfile)
    userNameInput.value = userName.textContent;
    userDescriptionInput.value = userDescription.textContent;
})

buttonPlaceAdd.addEventListener('click', () => openPopup(popupAddPlace));

buttonCloseEditPopup.addEventListener('click', () => closePopup(popupEditProfile));
buttonCloseAddPopup.addEventListener('click', () => closePopup(popupAddPlace));

editFormSubmit.addEventListener('submit', (event) => {
    event.preventDefault();
    userName.textContent = `${userNameInput.value}`;
    userDescription.textContent = `${userDescriptionInput.value}`;
    closePopup(buttonCloseEditPopup);
})

placeAddFormSubmit.addEventListener('submit', (event) => {
    event.preventDefault();
    cardRender({name: placeNameInput.value, link: placeLinkInput.value});
    closePopup(popupAddPlace);
    placeAddFormSubmit.reset();
})