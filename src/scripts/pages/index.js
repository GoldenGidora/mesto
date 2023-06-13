import Card from "../components/Card";
import {initialCards, config} from "../utils/constants"
import FormValidator from "../components/FormValidator";
import './index.css';
import Section from "../components/Section";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm";
import UserInfo from "../components/UserInfo";

const buttonProfileEdit = document.querySelector('.profile__button_type_edit');

const buttonPlaceAdd = document.querySelector('.profile__button_type_add');

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

const user = new UserInfo({usernameSelector: '.profile__title', descriptionSelector: '.profile__text'});


const viewImagePopup = new PopupWithImage('.popup_type_image');
viewImagePopup.setEventListeners();

const addPostForm = new PopupWithForm('.popup_type_add', (formData) => {
    cardSection.addItem(createCard(formData));
    addPostForm.close();
})
const profileEditForm = new PopupWithForm('.popup_type_edit', (formData) => {
    user.setUserInfo(formData);
    profileEditForm.close();
})
profileEditForm.setEventListeners();
addPostForm.setEventListeners();

buttonProfileEdit.addEventListener('click', () => {
    profileEditForm.open();
    formValidators["profile edit"].toggleButtonState();
})
buttonPlaceAdd.addEventListener('click', () => {
    addPostForm.open();
    formValidators["post add"].toggleButtonState();
});