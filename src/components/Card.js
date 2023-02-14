export class Card {
    constructor({link, name, handleCardClick}, templateSelector) {
        this._link = link;
        this._name = name;
        this._handleCardClick = handleCardClick;
        this._templateSelector = templateSelector;
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._templateSelector).content.querySelector('.elements__item').cloneNode(true);
        
        return cardElement;
    }

    _handleLikeItem() {
        this._element.querySelector('.elements__like-button').classList.toggle('elements__like-button_active');
    }

    _handleTrashItem() {
        this._element.remove();
    }
    
    _setEventListeners() {
        this._element.querySelector('.elements__image').addEventListener('click', this._handleCardClick);

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

