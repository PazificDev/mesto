import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector);
        this._cardImage = this._popup.querySelector('.popup__image');
        this._cardTitle = this._popup.querySelector('.popup__title');
    }

    open(link, name) {
        this._cardTitle.textContent = name;
        this._cardImage.src = link;
        this._cardImage.alt = name;
        super.open();
    }

}