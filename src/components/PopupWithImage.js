import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector);
    }

    open(link, name) {
        this._popupSelector.querySelector('.popup__title').textContent = name;
        this._popupSelector.querySelector('.popup__image').src = link;
        this._popupSelector.querySelector('.popup__image').alt = name;
        super.open();
    }

}