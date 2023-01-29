function closePopupWithOverlay(evt) {
    if (evt.target === evt.currentTarget) {
        closePopup(evt.target);
    }
}

function closePopupWithEsc(evt) {
    if (evt.key === 'Escape') {
        const activePopup = document.querySelector('.popup_opened');
        closePopup(activePopup);
    }
}

export function openPopup(popupName) {
    popupName.classList.add('popup_opened');
    popupName.addEventListener('click', closePopupWithOverlay);
    document.addEventListener('keydown', closePopupWithEsc);
}

export function closePopup(popupName) {
    popupName.classList.remove('popup_opened');
    popupName.removeEventListener('click', closePopupWithOverlay);
    document.removeEventListener('keydown', closePopupWithEsc);
}