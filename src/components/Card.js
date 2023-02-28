export class Card {
    constructor({link, name, likes, user,  ownerId, cardId, handleCardClick, handleCardDelete, setCardLikes, removeCardLikes}, templateSelector) {
        this._link = link;
        this._name = name;
        this._likes = likes;
        this._user = user;
        this._ownerId = ownerId;
        this._cardId = cardId;
        this._handleCardClick = handleCardClick;
        this._handleCardDelete = handleCardDelete;
        this._setCardLikes = setCardLikes;
        this._removeLikeItem = removeCardLikes;
        this._templateSelector = templateSelector;
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._templateSelector).content.querySelector('.elements__item').cloneNode(true);
        
        return cardElement;
    }

    _checkOwnerLike() {
        this._likes.forEach(item => {
            if (item._id === this._user) {
                this._likeButton.classList.add('elements__like-button_active');
                this._isLiked = true;
            }
        });
    }

    _handleTrashVisibility() {
        if (this._ownerId === this._user) {
            this._trash.classList.add('elements__trash_visible')
        }
    }

    _handleTrashItem() {
        this._element.remove();
    }
    
    _setEventListeners() {
        this._cardImage.addEventListener('click', this._handleCardClick);

        this._likeButton.addEventListener('click', () => {
            if (!this._isLiked) {
                this._setCardLikes(this._cardId);
                this._isLiked = !this._isLiked;
            } else {
                this._removeLikeItem(this._cardId);
                this._isLiked = !this._isLiked;
            }
                
            
        });

        this._element.querySelector('.elements__trash').addEventListener('click', () => {
            this._handleCardDelete(this._cardId);
        });
    }

    addLike(data) {
        this._likeCounter.textContent = data.likes.length;
        this._likeButton.classList.add('elements__like-button_active');
    } 

    removeLike(data) {
        this._likeCounter.textContent = data.likes.length;
        this._likeButton.classList.remove('elements__like-button_active');
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
        this._checkOwnerLike();

        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._cardTitle.textContent = this._name;
        this._likeCounter.textContent = this._likes.length;

        return this._element;
    }
};

