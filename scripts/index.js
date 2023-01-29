import { openPopup, closePopup } from './utils.js';
import { validationConfig, initialCards, popupOpenPic, popupOpenPicTitle, popupOpenPicImage } from './data.js';
import { Card } from './Card.js';
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
const elementsContainer = document.querySelector('.elements');
const buttonClosePopupImage = popupOpenPic.querySelector('.popup__close');

// Функции

function submitEditProfileForm (evt) {
    evt.preventDefault(); 
    profileName.textContent = popupProfileName.value;
    profileJob.textContent = popupProfileJob.value;
    closePopup(popupProfile);
}

function renderCards(link, name, selector) {
    const card = new Card(link, name, selector);
    const cardElement = card.generateCard();

    return cardElement;
}

function submitAddCardForm(evt) {
    evt.preventDefault(); 
    elementsContainer.prepend(renderCards(popupAddPic.value, popupAddTitle.value, '#element')); 
    closePopup(popupAdd);
}

// Скрипты

const profileFormValidation = new FormValidator(validationConfig, popupProfileForm);
profileFormValidation.enableValidation();

const addFormValidation = new FormValidator(validationConfig, popupAddForm);
addFormValidation.enableValidation();

initialCards.forEach(item => { 
    document.querySelector('.elements').append(renderCards(item.link, item.name, '#element')); 
}); 

buttonOpenEditProfilePopup.addEventListener('click', function() {
    openPopup(popupProfile);
    profileFormValidation.hideInputErrors();
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
    addFormValidation.hideInputErrors();
    openPopup(popupAdd);
});

popupAddCloseButton.addEventListener('click', function() {
    closePopup(popupAdd);
})

popupAddForm.addEventListener('submit', submitAddCardForm);

buttonClosePopupImage.addEventListener('click', function() {
    closePopup(popupOpenPic);
});

