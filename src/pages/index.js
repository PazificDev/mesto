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
const profileName = profile.querySelector('.profile__name');
const profileJob = profile.querySelector('.profile__job');
const popupProfile = document.querySelector('.popup_type_editInfo');
const popupProfileName = popupProfile.querySelector('.popup__input_edit_name');
const popupProfileJob = popupProfile.querySelector('.popup__input_edit_about');
const popupProfileForm = popupProfile.querySelector('.popup__form');
const popupAdd = document.querySelector('.popup_type_addPic');
const popupAddForm = popupAdd.querySelector('.popup__form');

// Скрипты

const profileFormValidation = new FormValidator(validationConfig, popupProfileForm);
profileFormValidation.enableValidation();

const addFormValidation = new FormValidator(validationConfig, popupAddForm);
addFormValidation.enableValidation();

const cardList = new Section({
    items: initialCards,
    renderer: (cardItem) => {
        const card = new Card({
            link: cardItem.link,
            name: cardItem.name,
            handleCardClick: () => {
                const popup = new PopupWithImage('.popup_type_openPicture');
                popup.open(cardItem.link, cardItem.name);
            }
        },
        '#element');
        const cardElement = card.generateCard();
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
        const card = new Card({
            link: item.picEdit,
            name: item.titleEdit,
            handleCardClick: () => {
                const popup = new PopupWithImage('.popup_type_openPicture');
                popup.open(item.picEdit, item.titleEdit);
            }
        },
        '#element');
        const cardElement = card.generateCard();
        cardList.setItem(cardElement);
        handlePopupAddPic.close();
    }
})

const handlePopupProfile = new PopupWithForm('.popup_type_editInfo', {
    handleSubmitForm: (item) => {
        userInfo.setUserInfo(item);
        handlePopupProfile.close();
    }
})

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
