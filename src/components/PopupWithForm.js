import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(selector, {handleSubmitForm}) {
        super(selector);
        this._handleSubmitForm = handleSubmitForm;
        this._popupForm = this._popupSelector.querySelector('.popup__form');
        this._inputList = Array.from(this._popupForm.querySelectorAll('.popup__input'));
    }

    _getInputValues() {
         let inputValues = {};
        this._inputList.forEach((item) => {
            inputValues[item.name] = item.value;
        })
        console.log(inputValues)
        return inputValues;
    }

    setEventListeners() {
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleSubmitForm(this._getInputValues());
        });

        super.setEventListeners();
    }

    close() {
        this._popupForm.reset();
        super.close();
    }
}