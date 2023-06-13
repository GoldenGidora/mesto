import Card from "../components/Card.js";
import {initialCards, config,
    usernameSelector, userDescSelector, usernameInputSelector, userDescInputSelector} from "../utils/constants.js"
import FormValidator from "../components/FormValidator.js";
import './index.css';
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

const buttonProfileEdit = document.querySelector('.profile__button_type_edit');
const buttonPlaceAdd = document.querySelector('.profile__button_type_add');
const formValidators = {};
const user = new UserInfo({usernameSelector, userDescriptionSelector: userDescSelector});
const viewImagePopup = new PopupWithImage('.popup_type_image');

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

function createCard(item) {
    return new Card(item, '#template_card', (name, link) => {
        viewImagePopup.open(name, link);
    }).generateCard();
}

const cardSection = new Section(initialCards, (card) => {
    cardSection.addItem(createCard(card));
}, '.cards');

const addPostForm = new PopupWithForm('.popup_type_add', (formData) => {
    cardSection.addItem(createCard(formData));
    addPostForm.close();
})

const profileEditForm = new PopupWithForm('.popup_type_edit', (formData) => {
    user.setUserInfo(formData);
    profileEditForm.close();
})

buttonProfileEdit.addEventListener('click', () => {
    const {username, description} = user.getUserInfo();
    document.querySelector(usernameInputSelector).value = username;
    document.querySelector(userDescInputSelector).value = description;
    profileEditForm.open();
    formValidators["profile edit"].toggleButtonState();
})

buttonPlaceAdd.addEventListener('click', () => {
    addPostForm.open();
    formValidators["post add"].toggleButtonState();
});

cardSection.renderItems();
viewImagePopup.setEventListeners();
profileEditForm.setEventListeners();
addPostForm.setEventListeners();