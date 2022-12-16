// Добавление переменных
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-button');
const addButton = profile.querySelector('.profile__add-button');
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
const popupTemplate = document.querySelector('#popupPic').content;

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

function popupAddFormSubmit (evt) {
    evt.preventDefault(); 
    const cloneElement = elementTemplate.querySelector('.elements__item').cloneNode(true);
    cloneElement.querySelector('.elements__title').textContent = popupAddTitle.value;
    cloneElement.querySelector('.elements__image').src = popupAddPic.value;
    cloneElement.querySelector('.elements__image').alt = popupAddTitle.value;
    elementsContainer.prepend(cloneElement); 

    cloneElement.querySelector('.elements__image').addEventListener('click', function(evt) {
        const clonePopup = popupTemplate.querySelector('.popup__container').cloneNode(true);
        clonePopup.querySelector('.popup__image').src = popupAddPic.value;
        clonePopup.querySelector('.popup__image').alt = popupAddTitle.value;
        clonePopup.querySelector('.popup__title').textContent = popupAddTitle.value;
        popupOpenPic.append(clonePopup);
        openPopup(popupOpenPic);

        clonePopup.querySelector('.popup__close').addEventListener('click', function() {
            closePopup(popupOpenPic);
            const trashPopup = clonePopup.querySelector('.popup__close').closest('.popup__container_type_picture');
            trashPopup.remove();
        });
    });

    cloneElement.querySelector('.elements__like-button').addEventListener('click', function(evt) {
        evt.target.classList.toggle('elements__like-button_active');
    });

    cloneElement.querySelector('.elements__trash').addEventListener('click', function() {
        const trashElement = cloneElement.querySelector('.elements__trash').closest('.elements__item');
        trashElement.remove();
    });

    closePopup(popupAdd);
}

// Скрипты

for (let i = 0; i < initialCards.length; i++) {
    const cloneElement = elementTemplate.querySelector('.elements__item').cloneNode(true);
    cloneElement.querySelector('.elements__image').src = initialCards[i].link;
    cloneElement.querySelector('.elements__image').alt = initialCards[i].name;
    cloneElement.querySelector('.elements__title').textContent = initialCards[i].name;

    cloneElement.querySelector('.elements__image').addEventListener('click', function(evt) {
        const clonePopup = popupTemplate.querySelector('.popup__container').cloneNode(true);
        clonePopup.querySelector('.popup__image').src = initialCards[i].link;
        clonePopup.querySelector('.popup__image').alt = initialCards[i].name;
        clonePopup.querySelector('.popup__title').textContent = initialCards[i].name;
        popupOpenPic.append(clonePopup);
        openPopup(popupOpenPic);

        clonePopup.querySelector('.popup__close').addEventListener('click', function() {
            closePopup(popupOpenPic);
            const trashPopup = clonePopup.querySelector('.popup__close').closest('.popup__container_type_picture');
            trashPopup.remove();
        });
    });
    
    cloneElement.querySelector('.elements__like-button').addEventListener('click', function(evt) {
        evt.target.classList.toggle('elements__like-button_active');
    });

    cloneElement.querySelector('.elements__trash').addEventListener('click', function() {
        const trashElement = cloneElement.querySelector('.elements__trash').closest('.elements__item');
        trashElement.remove();
    });

    elementsContainer.append(cloneElement); 
};

editButton.addEventListener('click', function() {
    openPopup(popupProfile);
    popupProfileName.value = profileName.textContent;
    popupProfileJob.value = profileJob.textContent;
});

popupProfileCloseButton.addEventListener('click', function() {
    closePopup(popupProfile);
})

popupProfileForm.addEventListener('submit', popupProfileFormSubmit);

addButton.addEventListener('click', function() {
    openPopup(popupAdd);
    popupAddTitle.value = '';
    popupAddPic.value = '';
});

popupAddCloseButton.addEventListener('click', function() {
    closePopup(popupAdd);
})

popupAddForm.addEventListener('submit', popupAddFormSubmit);
