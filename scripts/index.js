// Добавление переменных
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
const elementTemplate = document.querySelector('#element').content;
const popupOpenPic = document.querySelector('.popup_type_openPicture');
const popupOpenPicTitle = popupOpenPic.querySelector('.popup__title');
const popupOpenPicImage = popupOpenPic.querySelector('.popup__image');
const closeButtonOpenImagePopup = popupOpenPic.querySelector('.popup__close');

// Функции

function openPopup (popupName) {
    popupName.classList.add('popup_opened');
}

function closePopup (popupName) {
    popupName.classList.remove('popup_opened');
}

function popupProfileFormSubmit (evt) {
    evt.preventDefault(); 
    profileName.textContent = popupProfileName.value;
    profileJob.textContent = popupProfileJob.value;
    closePopup(popupProfile);
}

function createCard(title, src, alt) {
    const cloneElement = elementTemplate.querySelector('.elements__item').cloneNode(true);
    const cloneElementTitle = cloneElement.querySelector('.elements__title');
    const cloneElementImage = cloneElement.querySelector('.elements__image');
    cloneElementTitle.textContent = title;
    cloneElementImage.src = src;
    cloneElementImage.alt = alt;

    cloneElementImage.addEventListener('click', function(evt) {
        popupOpenPicImage.src = src;
        popupOpenPicImage.alt = alt;
        popupOpenPicTitle.textContent = title;
        openPopup(popupOpenPic);
    });

    cloneElement.querySelector('.elements__like-button').addEventListener('click', function(evt) {
        evt.target.classList.toggle('elements__like-button_active');
    });

    cloneElement.querySelector('.elements__trash').addEventListener('click', function() {
        const trashElement = cloneElement.querySelector('.elements__trash').closest('.elements__item');
        trashElement.remove();
    });

    return cloneElement;
};

function popupAddFormSubmit (evt) {
    evt.preventDefault(); 
    const newCard = createCard(popupAddTitle.value, popupAddPic.value, popupAddTitle.value);
    elementsContainer.prepend(newCard); 

    closePopup(popupAdd);
}

// Скрипты

for (let i = 0; i < initialCards.length; i++) {
    const newCard = createCard(initialCards[i].name, initialCards[i].link, initialCards[i].name)
    elementsContainer.append(newCard); 
};

buttonOpenEditProfilePopup.addEventListener('click', function() {
    openPopup(popupProfile);
    popupProfileName.value = profileName.textContent;
    popupProfileJob.value = profileJob.textContent;
});

popupProfileCloseButton.addEventListener('click', function() {
    closePopup(popupProfile);
})

popupProfileForm.addEventListener('submit', popupProfileFormSubmit);

buttonOpenAddCardPopup.addEventListener('click', function() {
    openPopup(popupAdd);
    popupAddForm.reset();
});

popupAddCloseButton.addEventListener('click', function() {
    closePopup(popupAdd);
})

popupAddForm.addEventListener('submit', popupAddFormSubmit);

closeButtonOpenImagePopup.addEventListener('click', function() {
    closePopup(popupOpenPic);
});
