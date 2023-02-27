export class Card {
    constructor({link, name, likes, ownerId, cardId, handleCardClick, handleCardDelete}, templateSelector) {
        this._link = link;
        this._name = name;
        this._likes = likes;
        this._ownerId = ownerId;
        this._cardId = cardId;
        this._handleCardClick = handleCardClick;
        this._handleCardDelete = handleCardDelete;
        this._templateSelector = templateSelector;
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._templateSelector).content.querySelector('.elements__item').cloneNode(true);
        
        return cardElement;
    }

    _handleLikeItem() {
        this._likeButton.classList.toggle('elements__like-button_active');
    }

    _handleTrashVisibility() {
        if (this._ownerId === '5e83cf8ac6a8d60b29f4563c') {
            this._trash.classList.add('elements__trash_visible')
        }
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
            this._handleCardDelete(this._cardId);
            this._handleTrashItem();
        });
    }

    generateCard() {
        this._element = this._getTemplate();
        this._trash = this._element.querySelector('.elements__trash')
        this._cardImage = this._element.querySelector('.elements__image');
        this._cardTitle = this._element.querySelector('.elements__title');
        this._likeButton = this._element.querySelector('.elements__like-button');
        this._likeCounter = this._element.querySelector('.elements__like-counter');
        this._handleTrashVisibility();
        this._setEventListeners();

        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._cardTitle.textContent = this._name;
        this._likeCounter.textContent = this._likes.length;

        return this._element;
    }
};

