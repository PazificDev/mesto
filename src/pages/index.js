import './index.css'

import { validationConfig, initialCards } from '../data.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';


const profile = document.querySelector('.profile');
const buttonOpenEditProfilePopup = profile.querySelector('.profile__edit-button');
const buttonOpenAddCardPopup = profile.querySelector('.profile__add-button');
const popupProfile = document.querySelector('.popup_type_editInfo');
const popupProfileName = popupProfile.querySelector('.popup__input_edit_name');
const popupProfileJob = popupProfile.querySelector('.popup__input_edit_about');
const popupProfileForm = document.forms.editForm;
const popupAddForm = document.forms.addForm;

const profileFormValidation = new FormValidator(validationConfig, popupProfileForm);
profileFormValidation.enableValidation();

const addFormValidation = new FormValidator(validationConfig, popupAddForm);
addFormValidation.enableValidation();

const popupWithImage = new PopupWithImage('.popup_type_openPicture');
popupWithImage.setEventListeners();

function createCard(item) {
    const card = new Card({
        link: item.link,
        name: item.name,
        handleCardClick: () => {
            popupWithImage.open(item.link, item.name);
        }
    },
    '#element');
    const cardElement = card.generateCard();

    return cardElement;
}

const cardList = new Section({
    items: initialCards,
    renderer: (cardItem) => {
        const cardElement = createCard(cardItem);
        cardList.setItem(cardElement);
    }
},
'.elements');

cardList.renderItems();

const userInfo = new UserInfo({
    name: '.profile__name' ,
    info: '.profile__job'
});

const handlePopupAddPic = new PopupWithForm('.popup_type_addPic', {
    handleSubmitForm: (item) => {
        const cardElement = createCard(item);
        cardList.setItem(cardElement);
        handlePopupAddPic.close();
    }
})

handlePopupAddPic.setEventListeners();

const handlePopupProfile = new PopupWithForm('.popup_type_editInfo', {
    handleSubmitForm: (item) => {
        userInfo.setUserInfo(item);
        handlePopupProfile.close();
    }
})

handlePopupProfile.setEventListeners();

buttonOpenEditProfilePopup.addEventListener('click', function() {
    profileFormValidation.hideInputErrors();
    const currentInfo = userInfo.getUserInfo();
    popupProfileName.value = currentInfo.name;
    popupProfileJob.value = currentInfo.info;
    handlePopupProfile.open();
});

buttonOpenAddCardPopup.addEventListener('click', function() {
    addFormValidation.toggleSubmitButton();
    addFormValidation.hideInputErrors();
    handlePopupAddPic.open();
});
