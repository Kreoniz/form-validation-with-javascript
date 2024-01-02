const form = document.querySelector('#form');

const email = document.querySelector('#email');
const emailError = document.querySelector('#email + span.error');
const country = document.querySelector('#country');
const countryError = document.querySelector('#country + span.error');
const zip = document.querySelector('#zip');
const zipError = document.querySelector('#zip + span.error');
const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirm-password');

const submitBtn = document.querySelector('#submit-btn');

const zipRegExp = /^\d{6}$/;

function checkEmailValidity(node) {
  if (node.value.length === 0) {
    node.setCustomValidity('Empty field');
    return 'You should enter an email address.';
  } if (node.validity.valueMissing) {
    node.setCustomValidity('Empty field');
    return 'You should enter an email address.';
  } else if (node.validity.typeMismatch) {
    node.setCustomValidity('Invalid email address');
    return 'You should enter a valid email address.';
  } else {
    node.setCustomValidity('');
    return 'valid';
  }
}

email.addEventListener("input", () => {
  const message = checkEmailValidity(email);
  emailError.textContent = message !== 'valid' ? message : '';
});

function checkCountryValidity(node) {
  if (node.value.length === 0) {
    node.setCustomValidity('Empty field');
    return 'You should enter a country name.';
  } else if (node.validity.valueMissing) {
    node.setCustomValidity('Empty field');
    return 'You should enter a country name.';
  } else {
    node.setCustomValidity('');
    return 'valid';
  }
}

country.addEventListener("input", () => {
  const message = checkCountryValidity(country);
  countryError.textContent = message !== 'valid' ? message : '';
});

function checkZipValidity(node) {
  if (node.value.length === 0) {
    node.setCustomValidity('Empty field');
    return 'You should enter a ZIP code.';
  } else if (node.validity.valueMissing) {
    node.setCustomValidity('Empty field');
    return 'You should enter a ZIP code.';
  } else if (!zipRegExp.test(node.value)) {
    node.setCustomValidity('Invalid ZIP code');
    return 'ZIP code should consist of 6 digits';
  } else {
    node.setCustomValidity('');
    return 'valid';
  }
}

zip.addEventListener("input", () => {
  const message = checkZipValidity(zip);
  zipError.textContent = message !== 'valid' ? message : '';
});

form.addEventListener('submit', (e) => {
  const emailPassed = checkEmailValidity(email);
  const countryPassed = checkCountryValidity(country);
  const zipPassed = checkZipValidity(zip);

  console.log(emailPassed);
  if (emailPassed !== 'valid') {
    emailError.textContent = emailPassed;
  } if (countryPassed !== 'valid') {
    countryError.textContent = countryPassed;
  } if (zipPassed !== 'valid') {
    zipError.textContent = zipPassed;
  } else {
    console.log('submitted');
  }
});
