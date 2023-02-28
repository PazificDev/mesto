import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(selector, {handleSubmitForm}) {
        super(selector);
        this._handleSubmitForm = handleSubmitForm;
        this._popupForm = this._popup.querySelector('.popup__form');
        this._inputList = Array.from(this._popupForm.querySelectorAll('.popup__input'));
    }

    open() {
        this._buttonText = this._submitButton.textContent;
        super.open();
    }

    renderLoading (isLoading) {
        
        if(isLoading) {
            this._submitButton.textContent = 'Сохранение...';
        } else {
            this._submitButton.textContent = this._buttonText;
        }
      }

    _getInputValues() {
        const inputValues = {};
        this._inputList.forEach((item) => {
            inputValues[item.name] = item.value;
        })
        return inputValues;
    }

    setEventListeners() {
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.renderLoading(true);
            this._handleSubmitForm(this._getInputValues());
        });

        super.setEventListeners();
    }


    close() {
        this._popupForm.reset();
        super.close();
    }
}