import Card from "./Card.js";
import {initialCards, config} from "./constants.js"
import FormValidator from "./FormValidator.js";

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
const formEdit = document.forms["profile edit"],
    formPlaceAdd = document.forms["post add"];

const formEditValidator = new FormValidator(config, formEdit);
formEditValidator.enableValidation();
const formPlaceAddValidator = new FormValidator(config, formPlaceAdd);
formPlaceAddValidator.enableValidation();

function createCard(item) {
    return new Card({data: item, templateSelector: '#template_card', openPopup})
        .generateCard();
}

initialCards.forEach(element => {
    cardsSection.prepend(createCard(element))
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
    formPlaceAddValidator.toggleButtonState();
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
    cardsSection.prepend(createCard({name: placeNameInput.value, link: placeLinkInput.value}));
    closePopup(popupAddPlace);
    placeAddFormSubmit.reset();
})