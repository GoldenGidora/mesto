import Card from "../components/Card.js";
import {initialCards, config} from "../utils/constants.js"
import FormValidator from "../components/FormValidator.js";
import './index.css';

const userName = document.querySelector('.profile__title'),
    userDescription = document.querySelector('.profile__text'),
    buttonProfileEdit = document.querySelector('.profile__button_type_edit'),
    popupEditProfile = document.querySelector('.popup_type_edit'),
    userNameInput = document.querySelector('.popup__input_type_name'),
    userDescriptionInput = document.querySelector('.popup__input_type_description'),
    formEditSubmit = document.querySelector('#popup_edit_submit');

const buttonPlaceAdd = document.querySelector('.profile__button_type_add'),
    popupAddPlace = document.querySelector('.popup_type_add'),
    placeNameInput = document.querySelector('.popup__input_type_place'),
    placeLinkInput = document.querySelector('.popup__input_type_link'),
    placeAddFormSubmit = document.querySelector('#popup_add_submit');
const popupImage = document.querySelector('.popup__image');
const popupFigcaption = document.querySelector('.popup__figcaption');
const popupTypeImage = document.querySelector('.popup_type_image');
const cardsSection = document.querySelector('.cards');

const formValidators = {};

const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.form));
    formList.forEach((element) => {
        const validator = new FormValidator(config, element);
        const formName = element.getAttribute('name');
        formValidators[formName] = validator;
        validator.enableValidation();
    })
}
enableValidation(config);

function handleCardClick(name, link) {
    popupImage.src = link;
    popupImage.alt = name;
    popupFigcaption.textContent = name;
    openPopup(popupTypeImage);
}

function createCard(item) {
    return new Card({data: item, templateSelector: '#template_card', handleCardClick})
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
    formValidators["profile edit"].toggleButtonState();
})

buttonPlaceAdd.addEventListener('click', () => {
    openPopup(popupAddPlace);
    formValidators["post add"].toggleButtonState();
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