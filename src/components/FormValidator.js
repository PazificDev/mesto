export class FormValidator {
    constructor(validationConfig, formElement) {
        this._form = formElement;
        this._inputSelector = validationConfig.inputSelector;
        this._submitButton = this._form.querySelector(validationConfig.submitButtonSelector);
        this._inactiveButtonClass = validationConfig.inactiveButtonClass;
        this._inputErrorClass = validationConfig.inputErrorClass;
        this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    }

    _showInputError = (inputElement) => {
        const errorElement  = this._form.querySelector(`.${inputElement.id}-error`);
        errorElement.textContent = inputElement.validationMessage;
        inputElement.classList.add(this._inputErrorClass);
    }

    _hideInputError = (inputElement) => {
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        errorElement.textContent = '';
        inputElement.classList.remove(this._inputErrorClass);
    }

    hideInputErrors() {
        this._inputList.forEach((item) => {
            this._hideInputError(item);
        });
    }
        
    _checkValidity = (inputElement) => {
        if (inputElement.validity.valid) {
            this._hideInputError(inputElement);
        } else {
            this._showInputError(inputElement);
        }
    }

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => !inputElement.validity.valid);
    }
    
    toggleSubmitButton() {
        if (this._hasInvalidInput()) {
            this._submitButton.classList.add(this._inactiveButtonClass);
            this._submitButton.disabled = true;
        } else {
            this._submitButton.classList.remove(this._inactiveButtonClass);
            this._submitButton.disabled = false;
        }
    }
    
    _setEventListeners() {
        this.toggleSubmitButton();
    
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkValidity(inputElement);
                this.toggleSubmitButton();
            })
        })
    }

    enableValidation() {
        this._setEventListeners();
    }
    
};