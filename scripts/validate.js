const showInputError = (form, input, errorMessage, config) => {
    const errorElement = form.querySelector(`.${input.id}-error`);
    input.classList.add(config.errorInput);
    errorElement.classList.add(config.errorMessage);
    errorElement.textContent = errorMessage;
}

const hideInputError = (form, input, config) => {
    const errorElement = form.querySelector(`.${input.id}-error`);
    input.classList.remove(config.errorInput);
    errorElement.classList.remove(config.errorMessage);
    errorElement.textContent = '';
}

const disableButton = (button, config) => {
    button.disabled = 'disabled';
    button.classList.add(config.submitDisabled);
}

const enableButton = (button, config) => {
    button.disabled = false;
    button.classList.remove(config.submitDisabled);
}

const checkInputValidity = (form, input, config) => {
    console.log(input);
    if (!input.validity.valid) {
        showInputError(form, input, input.validationMessage, config)
    } else {
        hideInputError(form, input, config)
    }
}

const toggleSubmitButton = (button, isActive, config) => {
    if (!isActive) {
        disableButton(button, config);
    } else {
        enableButton(button, config);
    }
}

const setEventValidityListeners = (form, config) => {
    const inputList = Array.from(form.querySelectorAll(config.input));
    const submitButton = form.querySelector('.popup__submit');

    toggleSubmitButton(submitButton, form.checkValidity(), config);
    console.log(form.checkValidity());

    inputList.forEach((input) => {
        input.addEventListener('input', () => {
            checkInputValidity(form, input, config);
            toggleSubmitButton(submitButton, form.checkValidity(), config);
        })
    })
}

const enableValidation = (config) => {
    const formList = document.querySelectorAll(config.form);
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (event) => {
            event.preventDefault();
        })
        setEventValidityListeners(formElement, config);
    })
}

enableValidation(validationSelectorsConfig);