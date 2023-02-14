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
        this._likeButton.classList.toggle('elements__like-button_active');
    }

    _handleTrashItem() {
        this._element.remove();
    }
    
    _setEventListeners() {
        this._cardImage.addEventListener('click', this._handleCardClick);

        this._likeButton.addEventListener('click', () => {
            this._handleLikeItem();
        });

        this._element.querySelector('.elements__trash').addEventListener('click', () => {
            this._handleTrashItem();
        });
    }

    generateCard() {
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector('.elements__image');
        this._cardTitle = this._element.querySelector('.elements__title');
        this._likeButton = this._element.querySelector('.elements__like-button');
        this._setEventListeners();

        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._cardTitle.textContent = this._name;

        return this._element;
    }
};

