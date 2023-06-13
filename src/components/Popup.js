export default class Popup {
    constructor(selector) {
        this._popup = document.querySelector(selector);
        this._closeButton = this._popup.querySelector('.popup__close');
        this._escClose = this._handleEscClose.bind(this);
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._escClose);
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._escClose)
    }

    _handleEscClose(event) {
        if (event.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners() {
        this._closeButton.addEventListener('click', () => {
            this.close();
        })
        this._popup.addEventListener('click', (event) => {
            if (event.target === event.currentTarget) {
                this.close();
            }
        })
    }
}