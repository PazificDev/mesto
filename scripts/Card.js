import { openPopup } from './utils.js'
import { popupOpenPic, popupOpenPicImage, popupOpenPicTitle } from './data.js';

export class Card {
    constructor(link, name, templateSelector) {
        this._link = link;
        this._name = name;
        this._templateSelector = templateSelector;
    }

    _getTemplate() {
        const cardElement = document
        .querySelector(this._templateSelector).content.querySelector('.elements__item').cloneNode(true);
        
        return cardElement;
    }

    _handleOpenPopup() {
        popupOpenPicImage.src = this._link;
        popupOpenPicImage.alt = this._name;
        popupOpenPicTitle.textContent = this._name;
        openPopup(popupOpenPic);
    }

    _handleLikeItem() {
        this._element.querySelector('.elements__like-button').classList.toggle('elements__like-button_active');
    }

    _handleTrashItem() {
        this._element.remove();
    }
    
    _setEventListeners() {
        this._element.querySelector('.elements__image').addEventListener('click', () => {
            this._handleOpenPopup();
        });

        this._element.querySelector('.elements__like-button').addEventListener('click', () => {
            this._handleLikeItem();
        });

        this._element.querySelector('.elements__trash').addEventListener('click', () => {
            this._handleTrashItem();
        });
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        this._element.querySelector('.elements__image').src = this._link;
        this._element.querySelector('.elements__image').alt = this._name;
        this._element.querySelector('.elements__title').textContent = this._name;

        return this._element;
    }
};

