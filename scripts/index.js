import {Card} from './Card.js';
import { validationConfig, initialCards } from './data.js';
import { FormValidator } from './FormValidator.js';


const profile = document.querySelector('.profile');
const buttonOpenEditProfilePopup = profile.querySelector('.profile__edit-button');
const buttonOpenAddCardPopup = profile.querySelector('.profile__add-button');
const profileName = profile.querySelector('.profile__name');
const profileJob = profile.querySelector('.profile__job');
const popupProfile = document.querySelector('.popup_type_editInfo');
const popupProfileName = popupProfile.querySelector('.popup__input_edit_name');
const popupProfileJob = popupProfile.querySelector('.popup__input_edit_about');
const popupProfileCloseButton = popupProfile.querySelector('.popup__close');
const popupProfileForm = popupProfile.querySelector('.popup__form');
const popupAdd = document.querySelector('.popup_type_addPic');
const popupAddTitle = document.querySelector('.popup__input_edit_title');
const popupAddPic = document.querySelector('.popup__input_edit_pic');
const popupAddCloseButton = popupAdd.querySelector('.popup__close');
const popupAddForm = popupAdd.querySelector('.popup__form');
const popupAddButton = popupAddForm.querySelector('.popup__button');
const elementsContainer = document.querySelector('.elements');
export const popupOpenPic = document.querySelector('.popup_type_openPicture');
export const popupOpenPicTitle = popupOpenPic.querySelector('.popup__title');
export const popupOpenPicImage = popupOpenPic.querySelector('.popup__image');
const closeButtonOpenImagePopup = popupOpenPic.querySelector('.popup__close');
const addInputList = [popupAddTitle, popupAddPic];

// Функции

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

function closePopup(popupName) {
    popupName.classList.remove('popup_opened');
    popupName.removeEventListener('click', closePopupWithOverlay);
    document.removeEventListener('keydown', closePopupWithEsc);
}

function submitEditProfileForm (evt) {
    evt.preventDefault(); 
    profileName.textContent = popupProfileName.value;
    profileJob.textContent = popupProfileJob.value;
    closePopup(popupProfile);
}

function submitAddCardForm(evt) {
    evt.preventDefault(); 
    const card = new Card(popupAddPic.value, popupAddTitle.value, '#element');
    const cardElement = card.generateCard();
    elementsContainer.prepend(cardElement); 
    closePopup(popupAdd);
}

// initialCards.forEach(item => {
//     const card = new Card(item.link, item.name, '#element');
//     const cardElement = card.generateCard();
//     document.querySelector('.elements').append(cardElement);
// });

// Скрипты

const profileFormValidation = new FormValidator(validationConfig, popupProfileForm);
profileFormValidation.enableValidation();

const addFormValidation = new FormValidator(validationConfig, popupAddForm);
addFormValidation.enableValidation();

buttonOpenEditProfilePopup.addEventListener('click', function() {
    openPopup(popupProfile);
    profileFormValidation.hideInputError(popupProfileName);
    profileFormValidation.hideInputError(popupProfileJob);
    popupProfileName.value = profileName.textContent;
    popupProfileJob.value = profileJob.textContent;
});

popupProfileCloseButton.addEventListener('click', function() {
    closePopup(popupProfile);
})

popupProfileForm.addEventListener('submit', submitEditProfileForm);

buttonOpenAddCardPopup.addEventListener('click', function() {
    popupAddForm.reset();
    addFormValidation.toggleSubmitButton();
    addFormValidation.hideInputError(popupAddPic);
    addFormValidation.hideInputError(popupAddTitle);
    openPopup(popupAdd);
});

popupAddCloseButton.addEventListener('click', function() {
    closePopup(popupAdd);
})

popupAddForm.addEventListener('submit', submitAddCardForm);

closeButtonOpenImagePopup.addEventListener('click', function() {
    closePopup(popupOpenPic);
});

