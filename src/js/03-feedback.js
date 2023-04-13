import throttle from 'lodash.throttle';

const STORAGE_INPUT_KEY = 'feedback-form-state';

const formClient = document.querySelector('.feedback-form');
const textareaClient = document.querySelector('.feedback-form textarea');
const inputClient = document.querySelector('.feedback-form input');

formClient.addEventListener('input', throttle(onInput, 500));
formClient.addEventListener('submit', onFormSubmit);

let allInputData = {};

function onInput(evt) {
  allInputData[evt.target.name] = evt.target.value;
  localStorage.setItem(STORAGE_INPUT_KEY, JSON.stringify(allInputData));
}

function onFormSubmit(evt) {
  evt.preventDefault();
  inputClient.value === '' || textareaClient.value === ''
    ? alert('Fill in all fields!')
    : (console.log(allInputData),
      evt.currentTarget.reset(),
      localStorage.removeItem(STORAGE_INPUT_KEY),
      (allInputData = {}));
}

messageInputBefore();
function messageInputBefore() {
  const savedMessageInput = localStorage.getItem(STORAGE_INPUT_KEY);
  let parsedSavedMessageInput;

  if (savedMessageInput === null) {
    parsedSavedMessageInput = {};
  } else {
    parsedSavedMessageInput = JSON.parse(savedMessageInput);
    if (
      parsedSavedMessageInput['email'] &&
      parsedSavedMessageInput['message']
    ) {
      inputClient.value = parsedSavedMessageInput.email;
      textareaClient.value = parsedSavedMessageInput.message;
      allInputData.email = parsedSavedMessageInput.email;
      allInputData.message = parsedSavedMessageInput.message;
    } else if (parsedSavedMessageInput['email']) {
      inputClient.value = parsedSavedMessageInput.email;
      allInputData.email = parsedSavedMessageInput.email;
    } else if (parsedSavedMessageInput['message']) {
      textareaClient.value = parsedSavedMessageInput.message;
      allInputData.message = parsedSavedMessageInput.message;
    }
  }
}
