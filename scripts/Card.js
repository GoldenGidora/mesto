export default class Card {
    constructor({data, templateSelector, openPopup}) {
        this._templateSelector = templateSelector;
        this._image = data.link;
        this._title = data.name;
        this._handleImageClick = openPopup;
    }

    _getTemplate() {
        return document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.cards__item')
            .cloneNode(true);
    }

    _setEventListeners() {
        this._likeBtn.addEventListener('click', () => this._likeBtn.classList.toggle('cards__like_active'));
        this._deleteBtn.addEventListener('click', () => this._element.remove())
        this._imageCard.addEventListener('click', () => {
            document.querySelector('.popup__image').src = this._image;
            document.querySelector('.popup__image').alt = this._title;
            document.querySelector('.popup__figcaption').textContent = this._title;
            this._handleImageClick(document.querySelector('.popup_type_image'));
        })
    }

    generateCard() {
        this._element = this._getTemplate();
        this._deleteBtn = this._element.querySelector('.cards__delete');
        this._likeBtn = this._element.querySelector('.cards__like');
        this._imageCard = this._element.querySelector('.cards__img');

        this._element.querySelector('.cards__img').src = this._image;
        this._element.querySelector('.cards__img').alt = this._title;
        this._element.querySelector('.cards__title').textContent = this._title;

        this._setEventListeners();

        return this._element;
    }
}