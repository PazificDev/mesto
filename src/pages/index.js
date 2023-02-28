import './index.css'
import '../index.html'

import { validationConfig } from '../data.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupDeleteConfirmation } from '../components/PopupDeleteConfirmation.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api';


const profile = document.querySelector('.profile');
const buttonOpenEditProfilePopup = profile.querySelector('.profile__edit-button');
const buttonOpenAddCardPopup = profile.querySelector('.profile__add-button');
const popupProfile = document.querySelector('.popup_type_editInfo');
const popupProfileName = popupProfile.querySelector('.popup__input_edit_name');
const popupProfileJob = popupProfile.querySelector('.popup__input_edit_about');
const popupProfileForm = document.forms.editForm;
const popupAddForm = document.forms.addForm;
const popupChangePhoto = document.forms.photoForm;
const buttonOpenChangePhoto = profile.querySelector('.profile__photo-edit-button');
let userId = '';

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-60',
    headers: {
      authorization: '55929426-0584-4e05-bc00-25d08953ba88',
      'Content-Type': 'application/json'
    }
});

const cardList = new Section({
    renderer: (cardItem) => {
        const cardElement = createCard(cardItem);
        cardList.setItem(cardElement);
    }
},
'.elements');

const userInfo = new UserInfo({
    name: '.profile__name' ,
    about: '.profile__job',
    avatar: '.profile__photo'
});


Promise.all([api.getUserData(), api.getInitialCards()])
.then(([data, initialCards]) => {
    userId = data._id;
    userInfo.setUserInfo(data);
    userInfo.setUserAvatar(data);
    cardList.renderItems(initialCards);
})
.catch(err => {
    alert(err);
});

const profilePhotoFormValidation = new FormValidator(validationConfig, popupChangePhoto);
profilePhotoFormValidation.enableValidation();

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
        likes: item.likes,
        user: userId,
        ownerId: item.owner._id,
        cardId: item._id,
        handleCardClick: () => {
            popupWithImage.open(item.link, item.name);
        },
        handleCardDelete: (cardId) => {
            handlePopupDeleteCard.open(cardId, card);
        },
        setCardLikes: (cardId) => {
            api.putCardLike(cardId)
            .then((data) => {
                card.addLike(data);
            })
            .catch((err) => {
                alert(err);
            })
        },
        removeCardLikes: (cardId) => {
            api.deleteCardLike(cardId)
            .then((data) => {
                card.removeLike(data);
            })
            .catch((err) => {
                alert(err);
            })
        }
    },
    '#element');
    const cardElement = card.generateCard();

    return cardElement;
}

const handlePopupAddPic = new PopupWithForm('.popup_type_addPic', {
    handleSubmitForm: (item) => {
        api.postNewCard(item)
        .then((data) => {
            const cardElement = createCard(data);
            cardList.setItem(cardElement);
            handlePopupAddPic.close();
        })
        .catch((err) => {
            alert(err);
        })
        .finally(() => {
            handlePopupAddPic.renderLoading(false);
        })
        
    }
})

handlePopupAddPic.setEventListeners();

const handlePopupProfile = new PopupWithForm('.popup_type_editInfo', {
    handleSubmitForm: (item) => {
        api.patchUserInfo(item)
        .then((data) => {
            userInfo.setUserInfo(data);
            handlePopupProfile.close();
        })
        .catch((err) => {
            alert(err);
        })
        .finally(() => {
            handlePopupProfile.renderLoading(false);
        })
    }
})

handlePopupProfile.setEventListeners();

const handlePopupChangePhoto = new PopupWithForm('.popup_type_editPhoto', {
    handleSubmitForm: (item) => {
        api.patchUserPhoto(item)
        .then((data) => {
            userInfo.setUserAvatar(data);
            handlePopupChangePhoto.close();
        })
        .catch((err) => {
            alert(err);
        })
        .finally(() => {
            handlePopupChangePhoto.renderLoading(false);
        })
    }
})

handlePopupChangePhoto.setEventListeners();

const handlePopupDeleteCard = new PopupDeleteConfirmation('.popup_type_deleteCard', {
    handleSubmitForm: (cardId, card) => {
        api.deleteCard(cardId)
        .then(() => {
            card.handleTrashItem();
            handlePopupDeleteCard.close();
        })
        .catch((err) => {
            alert(err);
        });
    }
})

handlePopupDeleteCard.setEventListeners();

buttonOpenEditProfilePopup.addEventListener('click', function() {
    profileFormValidation.toggleSubmitButton();
    profileFormValidation.hideInputErrors();
    const currentInfo = userInfo.getUserInfo();
    popupProfileName.value = currentInfo.name;
    popupProfileJob.value = currentInfo.about;
    handlePopupProfile.open();
});

buttonOpenAddCardPopup.addEventListener('click', function() {
    addFormValidation.toggleSubmitButton();
    addFormValidation.hideInputErrors();
    handlePopupAddPic.open();
});

buttonOpenChangePhoto.addEventListener('click', function() {
    profilePhotoFormValidation.toggleSubmitButton();
    profilePhotoFormValidation.hideInputErrors();
    handlePopupChangePhoto.open();
})
