export default class FormValidator {
    constructor(config, formElement) {
        this._config = config;
        this._form = formElement;
        this._inputList = Array.from(this._form.querySelectorAll(this._config.formInput));
        this._submitBtn = this._form.querySelector(this._config.submitBtn);
    }

    _showInputError(input, errorMessage) {
        const errorElement = this._form.querySelector(`.${input.id}-error`);
        input.classList.add(this._config.errorInput);
        errorElement.classList.add(this._config.errorMessage);
        errorElement.textContent = errorMessage;
    }

    _hideInputError(input) {
        const errorElement = this._form.querySelector(`.${input.id}-error`);
        input.classList.remove(this._config.errorInput);
        errorElement.classList.remove(this._config.errorMessage);
        errorElement.textContent = '';
    }

    _hasInvalidInput() {
        return this._inputList.some((input) => {
            return !input.validity.valid;
        })
    }

    _checkInputValidity(input) {
        if (!input.validity.valid) {
            this._showInputError(input, input.validationMessage);
        } else {
            this._hideInputError(input);
        }
    }

    toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._submitBtn.setAttribute('disabled', 'disable');
        } else {
            this._submitBtn.removeAttribute('disabled');
        }
    }

    _setEventListeners() {
        this.toggleButtonState();

        this._inputList.forEach((input) => {
            input.addEventListener('input', () => {
                this._checkInputValidity(input);
                this.toggleButtonState();
            })
        })

        this._form.addEventListener('submit', (event) => {
            event.preventDefault();
        })
    }

    enableValidation() {
        this._setEventListeners();
    }
}