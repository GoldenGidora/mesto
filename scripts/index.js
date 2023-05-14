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

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function renderCard(cardItem) {
    let cardElement = template.querySelector('.cards__item').cloneNode(true);
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
    cardsSection.prepend(cardElement);
}

initialCards.forEach(renderCard)

buttonProfileEdit.addEventListener('click', () => {
    openPopup(popupEditProfile)
    userNameInput.value = userName.textContent;
    userDescriptionInput.value = userDescription.textContent;
})

buttonPlaceAdd.addEventListener('click', () => openPopup(popupAddPlace));
buttonCloseEditPopup.addEventListener('click', () => closePopup(popupEditProfile));
buttonCloseAddPopup.addEventListener('click', () => closePopup(popupAddPlace));
buttonCloseImage.addEventListener('click', () => closePopup(popupTypeImage))

formEditSubmit.addEventListener('submit', (event) => {
    event.preventDefault();
    userName.textContent = `${userNameInput.value}`;
    userDescription.textContent = `${userDescriptionInput.value}`;
    closePopup(popupEditProfile);
})

placeAddFormSubmit.addEventListener('submit', (event) => {
    event.preventDefault();
    renderCard({name: placeNameInput.value, link: placeLinkInput.value});
    closePopup(popupAddPlace);
    placeAddFormSubmit.reset();
})