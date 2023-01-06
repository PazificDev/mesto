function showInputError(formElement, inputElement, config) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(config.inputErrorClass);
}

function hideInputError(formElement, inputElement, config) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = '';
    inputElement.classList.remove(config.inputErrorClass);
}

function checkValidity(formElement, inputElement, config) {
    if (inputElement.validity.valid) {
        hideInputError(formElement, inputElement, config);
    } else {
        showInputError(formElement, inputElement, config);
    }
}

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => !inputElement.validity.valid);
}

function toggleSubmitButton(inputList, buttonElement, config) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(config.inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(config.inactiveButtonClass);
        buttonElement.disabled = false;
    }
}

function setEventListeners(formElement, config) {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    toggleSubmitButton(inputList, buttonElement, config);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkValidity(formElement, inputElement, config);
            toggleSubmitButton(inputList, buttonElement, config);
        })
    })
}

function enableValidation(config) {
    const formList = Array.from(document.querySelectorAll(config.formSelector));

    formList.forEach((formElement) => {
        setEventListeners(formElement, config);
    });
}