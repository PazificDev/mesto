const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close');
const popup = document.querySelector('.popup');
const submitButton = document.querySelector('.popup__submit');
const nameContainer = document.querySelector('.profile__name');
const nameEdit = document.querySelector('.popup__input_edit_name');
const aboutContainer = document.querySelector('.profile__description');
const aboutEdit = document.querySelector('.popup__input_edit_about');
let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__input_edit_name');
let jobInput = formElement.querySelector('.popup__input_edit_about');

editButton.addEventListener('click', function() {
    popup.classList.add('popup_opened');
    nameEdit.value = nameContainer.textContent;
    aboutEdit.value = aboutContainer.textContent;
});

closeButton.addEventListener('click', function() {
    popup.classList.remove('popup_opened');
});

function handleFormSubmit (evt) {
    evt.preventDefault(); 
    nameContainer.textContent = nameInput.value;
    aboutContainer.textContent = jobInput.value;
    popup.classList.remove('popup_opened');
}

formElement.addEventListener('submit', handleFormSubmit);

