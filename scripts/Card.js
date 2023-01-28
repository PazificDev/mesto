import { openPopup, popupOpenPic, popupOpenPicImage, popupOpenPicTitle } from './index.js'
import { initialCards } from './data.js';

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
        const trashElement = this._element.querySelector('.elements__trash').closest('.elements__item');
        trashElement.remove();
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

initialCards.forEach(item => {
    const card = new Card(item.link, item.name, '#element');
    const cardElement = card.generateCard();
    document.querySelector('.elements').append(cardElement);
})

// Я не понял почему, но если отрисовывать начальные карточки в index.js (70 строка) - возникает ошибка в консоли, что использование Card до определения невозможно, хотя Card я экспортирую первой же строчкой в index.js. А вот с отрисовкой карточек через попап добавления проблем не возникло.