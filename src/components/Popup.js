export class Popup {
    constructor(selector) {
        this._popupSelector = document.querySelector(selector);
    }

    open() {
        this._popupSelector.classList.add('popup_opened');
        this.setEventListeners();
        document.addEventListener('keydown', (evt) => {
            this._handleEscClose(evt);
        });
    }

    close() {
        this._popupSelector.classList.remove('popup_opened');
        document.removeEventListener('keydown', (evt) => {
            this._handleEscClose(evt);
        });
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners() {
        this._popupSelector.addEventListener('click', (evt) => {
            if (evt.target === evt.currentTarget) {
                this.close();
            }
        });

        this._popupSelector.querySelector('.popup__close').addEventListener('click', () => {
            this.close();
        } );
    }
}