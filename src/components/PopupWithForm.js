import Popup from "./Popup";

export default class PopupWithForm extends Popup {
    constructor(selector, submitCallback) {
        super(selector);
        this._popup = document.querySelector(selector);
        this._form = this._popup.querySelector('.form');
        this._inputList = this._form.querySelectorAll('.popup__input');
        this._submitBtn = this._form.querySelector('.popup__submit');
        this._submitBtnTextDefault = this._submitBtn.textContent;
        this._handleFormSubmit = submitCallback;
    }

    _getInputValues() {
        this._inputValues = {};
        this._inputList.forEach((input) => {
            this._inputValues[input.name] = input.value;
        })
        return this._inputValues;
    }

    close() {
        super.close();
        this._form.reset();
    }

    loading(isLoading) {
        if (isLoading) {
            this._submitBtn.textContent = 'Сохранение...'
        } else {
            this._submitBtn.textContent = this._submitBtnTextDefault;
        }
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (event) => {
            event.preventDefault();
            this._handleFormSubmit(this._getInputValues())
        })
    }
}