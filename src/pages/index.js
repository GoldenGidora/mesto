import Card from "../components/Card.js";
import {
    config,
    usernameSelector, userDescSelector, usernameInputSelector, userDescInputSelector, avatarSelector
} from "../utils/constants.js"
import FormValidator from "../components/FormValidator.js";
import './index.css';
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupConfirm from "../components/PopupConfirm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api";

const usernameInput = document.querySelector(usernameInputSelector);
const userDescInput = document.querySelector(userDescInputSelector);
const buttonProfileEdit = document.querySelector('.profile__button_type_edit');
const buttonAvatarEdit = document.querySelector('.profile__avatar_edit');
const buttonPlaceAdd = document.querySelector('.profile__button_type_add');
const formValidators = {};
const user = new UserInfo({usernameSelector, userDescSelector, avatarSelector});
const viewImagePopup = new PopupWithImage('.popup_type_image');
const deletePopup = new PopupConfirm('.popup_type_confirm');

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-70',
    headers: {
        authorization: '99bdb945-3b1c-4bb2-a40c-a00024f1a035',
        'Content-Type': 'application/json'
    }
})
Promise.all([api.getUserInfo(), api.getCards()])
    .then(([userData, cards]) => {
        user.setUserInfo(userData);
        cardSection.renderItems(cards);
    })
    .catch(e => console.log(`Ошибка: \n${e}`))

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
    const card = new Card(item, user.id,
        '#template_card',
        (name, link) => {
            viewImagePopup.open(name, link);
        },
        (id) => {
            api.setLike(id)
                .then(data => {
                    card.likeHandler(data);
                })
                .catch(e => console.log(e))
        },
        (id) => {
            api.removeLike(id)
                .then(data => {
                    card.likeHandler(data);
                })
                .catch(e => console.log(e))
        },
        (id) => {
            deletePopup.open();
            deletePopup.removeCallback(() => {
                api.removeCard(id)
                    .then(() => {
                        card.deleteCard();
                    })
                    .catch(e => console.log(e))
            })
        }
    );
    return card.generateCard();
}

const cardSection = new Section((card) => {
    cardSection.addItem(createCard(card));
}, '.cards');

const addPostForm = new PopupWithForm('.popup_type_add', (formData) => {
    api.addCard(formData)
        .then(res => cardSection.addItem(createCard(res)))
        .catch(e => console.log(e));
    addPostForm.close();
})

const profileEditForm = new PopupWithForm('.popup_type_edit', (formData) => {
    profileEditForm.loading(true);
    api.editUserInfo(formData)
        .then((data) => user.setUserInfo(data))
        .catch(e => console.log(e))
        .finally(() => profileEditForm.loading(false));
    profileEditForm.close();
})

const avatarEditForm = new PopupWithForm('.popup_type_avatar', (formData) => {
    avatarEditForm.loading(true);
    api.editAvatar(formData)
        .then(() => {
            document.querySelector(avatarSelector).src = formData.avatar;
            avatarEditForm.close();
        })
        .catch(e => console.log(`Ошибка: ${e}`))
        .finally(() => avatarEditForm.loading(false));
});

buttonProfileEdit.addEventListener('click', () => {
    const {username, description} = user.getUserInfo();
    usernameInput.value = username;
    userDescInput.value = description;
    profileEditForm.open();
    formValidators["profile edit"].toggleButtonState();
})

buttonAvatarEdit.addEventListener('click', () => {
    avatarEditForm.open();
    formValidators["profile avatar-edit"].toggleButtonState();
})

buttonPlaceAdd.addEventListener('click', () => {
    addPostForm.open();
    formValidators["post add"].toggleButtonState();
});

viewImagePopup.setEventListeners();
profileEditForm.setEventListeners();
avatarEditForm.setEventListeners();
addPostForm.setEventListeners();
deletePopup.setEventListeners();