const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close');
const popup = document.querySelector('.popup');
const submitButton = document.querySelector('.popup__submit');
const likeForm = document.querySelectorAll('.elements__item');

editButton.addEventListener('click', function(event) {
    event.preventDefault();
    popup.classList.add('popup_opened');
    const nameContainer = document.querySelector('.profile__name');
    const nameEdit = document.querySelector('.popup__name');
    nameEdit.value = nameContainer.innerHTML;
    const aboutContainer = document.querySelector('.profile__description');
    const aboutEdit = document.querySelector('.popup__about');
    aboutEdit.value = aboutContainer.innerHTML;
});

let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__name');
let jobInput = formElement.querySelector('.popup__about');

function handleFormSubmit (evt) {
    evt.preventDefault(); 
    let editName = nameInput.value;
    let editJob = jobInput.value;
    let nameContainer = document.querySelector('.profile__name');
    let aboutContainer = document.querySelector('.profile__description');
    nameContainer.textContent = editName;
    aboutContainer.textContent = editJob;
    popup.classList.remove('popup_opened');
}

formElement.addEventListener('submit', handleFormSubmit);


closeButton.addEventListener('click', function(event) {
    event.preventDefault();
    popup.classList.remove('popup_opened');
})