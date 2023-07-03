export default class Card {
    constructor(data, userId, templateSelector, handleCardClick, handleLike, handleRemoveLike, handleCardDelete) {
        this._templateSelector = templateSelector;
        this._image = data.link;
        this._title = data.name;
        this._likes = data.likes;
        this._cardId = data._id;
        this._userId = userId;
        this._ownerId = data.owner._id;
        this._handleCardClick = handleCardClick;
        this._setLike = handleLike;
        this._removeLike = handleRemoveLike;
        this._deleteCard = handleCardDelete;
    }

    _getTemplate() {
        return document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.cards__item')
            .cloneNode(true);
    }

    _setEventListeners() {
        this._likeBtn.addEventListener('click', () => {
            if (this._likeBtn.classList.contains('cards__like_active')) {
                this._removeLike(this._cardId);
            } else {
                this._setLike(this._cardId);
            }
        });
        this._deleteBtn.addEventListener('click', () => {
            this._deleteCard(this._cardId);
        })
        this._imageCard.addEventListener('click', () => {
            this._handleCardClick(this._title, this._image);
        })
    }

    deleteCard() {
        this._element.remove();
    }

    checkIsLiked() {
        if (this._likes.some((user) => {
            return this._userId === user._id;
        })) {
            this._likeBtn.classList.add('cards__like_active')
        }
    }

    likeHandler(data) {
        this._likes = data.likes;
        this._likeNumber.textContent = this._likes.length;
        this._likeBtn.classList.toggle('cards__like_active');
    }

    _isCardOwner() {
        if(!(this._ownerId === this._userId)){
            this._deleteBtn.remove();
        }
    }

    generateCard() {
        this._element = this._getTemplate();
        this._deleteBtn = this._element.querySelector('.cards__delete');
        this._likeBtn = this._element.querySelector('.cards__like');
        this._likeNumber = this._element.querySelector('.cards__like-number');
        this._imageCard = this._element.querySelector('.cards__img');
        this._likeNumber.textContent = this._likes.length;

        this._imageCard.src = this._image;
        this._imageCard.alt = this._title;

        this._element.querySelector('.cards__title').textContent = this._title;
        this._setEventListeners();
        this.checkIsLiked();
        this._isCardOwner();

        return this._element;
    }
}