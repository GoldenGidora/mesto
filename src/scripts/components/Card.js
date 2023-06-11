export default class Card {
    constructor({name, link }, templateSelector, handleCardClick) {
        this._templateSelector = templateSelector;
        this._image = link;
        this._title = name;
        this._handleCardClick = handleCardClick;
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
            this._handleCardClick(this._title, this._image);
        })
    }

    generateCard() {
        this._element = this._getTemplate();
        this._deleteBtn = this._element.querySelector('.cards__delete');
        this._likeBtn = this._element.querySelector('.cards__like');
        this._imageCard = this._element.querySelector('.cards__img');

        this._imageCard.src = this._image;
        this._imageCard.alt = this._title;

        this._element.querySelector('.cards__title').textContent = this._title;
        this._setEventListeners();

        return this._element;
    }
}