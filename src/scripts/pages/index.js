import Card from "../components/Card.js";
import {initialCards, config} from "../utils/constants.js"
import FormValidator from "../components/FormValidator.js";
import './index.css';
import Section from "../components/Section";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm";

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
    return new Card(item, '#template_card', (name, link) => {
        viewImagePopup.open(name, link);
    })
        .generateCard();
}

const cardSection = new Section(initialCards, (card) => {
    cardSection.addItem(createCard(card));
}, '.cards');
cardSection.renderItems()

// const handlePopupOverlayClick = (event) => {
//     if (event.target === event.currentTarget) {
//         closePopup(event.currentTarget);
//     }
// }
//
// buttonProfileEdit.addEventListener('click', () => {
//     openPopup(popupEditProfile);
//     userNameInput.value = userName.textContent;
//     userDescriptionInput.value = userDescription.textContent;
//     formValidators["profile edit"].toggleButtonState();
// })
//

// document.querySelectorAll('.popup__close').forEach(button => {
//     const parentPopup = button.closest('.popup');
//     button.addEventListener('click', () => closePopup(parentPopup));
// })

// formEditSubmit.addEventListener('submit', (event) => {
//     event.preventDefault();
//     userName.textContent = `${userNameInput.value}`;
//     userDescription.textContent = `${userDescriptionInput.value}`;
//     closePopup(popupEditProfile);
// })

// placeAddFormSubmit.addEventListener('submit', (event) => {
//     event.preventDefault();
//     cardSection.addItem(createCard({name: placeNameInput.value, link: placeLinkInput.value}))
//     closePopup(popupAddPlace);
//     placeAddFormSubmit.reset();
// })

const viewImagePopup = new PopupWithImage('.popup_type_image');
viewImagePopup.setEventListeners();

const addPostForm = new PopupWithForm('.popup_type_add', (formData) => {{
    cardSection.addItem(createCard(formData));
    addPostForm.close();
}})
addPostForm.setEventListeners();

buttonPlaceAdd.addEventListener('click', () => {
    addPostForm.open();
    formValidators["post add"].toggleButtonState();
});