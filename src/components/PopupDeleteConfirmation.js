import { Popup } from "./Popup.js";

export class PopupDeleteConfirmation extends Popup {
    constructor(selector, {handleSubmitForm}) {
        super(selector);
        this._popupForm = this._popup.querySelector('.popup__form');
        this._handleSubmitForm = handleSubmitForm;
        this._cardId = '';
    }

    open(cardId) {
        this._cardId = cardId;
        super.open();
    }

    setEventListeners() {
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleSubmitForm(this._cardId);
        });
        super.setEventListeners();
    }
}