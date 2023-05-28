const userName = document.querySelector('.profile__title'),
    userDescription = document.querySelector('.profile__text'),
    buttonProfileEdit = document.querySelector('.profile__button_type_edit'),
    popupEditProfile = document.querySelector('.popup_type_edit'),
    buttonCloseEditPopup = document.querySelector('#CloseEdit'),
    userNameInput = document.querySelector('.popup__input_type_name'),
    userDescriptionInput = document.querySelector('.popup__input_type_description'),
    formEditSubmit = document.querySelector('#popup_edit_submit');

const buttonPlaceAdd = document.querySelector('.profile__button_type_add'),
    buttonCloseAddPopup = document.querySelector('#CloseAdd'),
    popupAddPlace = document.querySelector('.popup_type_add'),
    placeNameInput = document.querySelector('.popup__input_type_place'),
    placeLinkInput = document.querySelector('.popup__input_type_link'),
    placeAddFormSubmit = document.querySelector('#popup_add_submit');

const template = document.querySelector('#template_card').content;
const cardsSection = document.querySelector('.cards');
const formEdit = document.querySelector('#popup_edit_submit'),
    formPlaceAdd = document.querySelector('#popup_add_submit');

import Card from "./Card.js";
import {initialCards, config} from "./constants.js"
import FormValidator from "./FormValidator.js";

userNameInput.value = userName.textContent;
userDescriptionInput.value = userDescription.textContent;

const formEditValidator = new FormValidator(config, formEdit);
formEditValidator.enableValidation();
const formPlaceAddValidator = new FormValidator(config, formPlaceAdd);
formPlaceAddValidator.enableValidation();

initialCards.forEach(element => {
    const card = new Card({data: element, templateSelector: '#template_card', openPopup});
    const cardElement = card.generateCard();
    cardsSection.prepend(cardElement)
})

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', handlePopupPressEsc);
    popup.removeEventListener('click', handlePopupOverlayClick);
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
    popup.addEventListener('click', handlePopupOverlayClick);
    document.addEventListener('keydown', handlePopupPressEsc);
}

const handlePopupOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
        closePopup(event.currentTarget);
    }
}

const handlePopupPressEsc = (event) => {
    const key = event.key;
    if (key === 'Escape') {
        closePopup(document.querySelector('.popup_opened'));
    }
}

buttonProfileEdit.addEventListener('click', () => {
    openPopup(popupEditProfile);
    userNameInput.value = userName.textContent;
    userDescriptionInput.value = userDescription.textContent;
})

buttonPlaceAdd.addEventListener('click', () => {
    openPopup(popupAddPlace);
    popupAddPlace.querySelector('.popup__submit').setAttribute('disabled', 'disable');
});
document.querySelectorAll('.popup__close').forEach(button => {
    const parentPopup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(parentPopup));
})

formEditSubmit.addEventListener('submit', (event) => {
    event.preventDefault();
    userName.textContent = `${userNameInput.value}`;
    userDescription.textContent = `${userDescriptionInput.value}`;
    closePopup(popupEditProfile);
})

placeAddFormSubmit.addEventListener('submit', (event) => {
    event.preventDefault();
    cardsSection.prepend(new Card({
        data: {name: placeNameInput.value, link: placeLinkInput.value},
        templateSelector: '#template_card',
        openPopup
    }).generateCard());
    closePopup(popupAddPlace);
    placeAddFormSubmit.reset();
})