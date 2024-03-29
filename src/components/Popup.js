export class Popup {
    constructor(selector) {
        this._popup = document.querySelector(selector);
        this._submitButton = this._popup.querySelector('.popup__button')
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners() {
        this._popup.addEventListener('mousedown', (evt) => {
            if (evt.target === evt.currentTarget) {
                this.close();
            }
        });

        this._popup.querySelector('.popup__close').addEventListener('click', () => {
            this.close();
        } );
    }
}