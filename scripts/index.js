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

const buttonCloseImage = document.querySelector('#CloseImage'),
    popupTypeImage = document.querySelector('.popup_type_image'),
    imagePopup = document.querySelector('.popup__image'),
    figcaption = document.querySelector('.popup__figcaption');

const template = document.querySelector('#template_card').content;
const cardsSection = document.querySelector('.cards');

userNameInput.value = userName.textContent;
userDescriptionInput.value = userDescription.textContent;

function createCard(cardItem) {
    const cardElement = template.querySelector('.cards__item').cloneNode(true);
    cardElement.querySelector('.cards__img').src = cardItem.link;
    cardElement.querySelector('.cards__img').alt = cardItem.name;
    cardElement.querySelector('.cards__title').textContent = cardItem.name;
    const like = cardElement.querySelector('.cards__like');
    like.addEventListener('click', () => {
        like.classList.toggle('cards__like_active');
    })
    cardElement.querySelector('.cards__delete')
        .addEventListener('click', () => cardElement.remove());
    cardElement.querySelector('.cards__img')
        .addEventListener('click', () => {
            imagePopup.src = cardItem.link;
            imagePopup.alt = cardItem.name;
            figcaption.textContent = cardItem.name;
            openPopup(popupTypeImage);
        })
    return cardElement;
}

initialCards.forEach(element => cardsSection.prepend(createCard(element)))


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
    popupAddPlace.querySelector('.popup__submit').disabled = 'disabled';
    popupAddPlace.querySelector('.popup__submit').classList.add(validationSelectorsConfig.submitDisabled);
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
    cardsSection.prepend(createCard({name: placeNameInput.value, link: placeLinkInput.value}))
    closePopup(popupAddPlace);
    placeAddFormSubmit.reset();
})