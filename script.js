const form = document.querySelector('#form');

const email = document.querySelector('#email');
const emailError = document.querySelector('#email + span.error');
const country = document.querySelector('#country');
const countryError = document.querySelector('#country + span.error');
const zip = document.querySelector('#zip');
const zipError = document.querySelector('#zip + span.error');
const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirm-password');
const passwordError = document.querySelector('#password-error');

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

function checkPasswordValidity(node) {
  if (node.value.length === 0) {
    node.setCustomValidity('Empty field');
    return 'You should enter a password.';
  } else if (node.validity.valueMissing) {
    node.setCustomValidity('Empty field');
    return 'You should enter a password.';
  } else if (node.value.length < 8) {
    node.setCustomValidity('Too short');
    return 'Password should be at least 8 characters long.';
  } else if (!/(.*[0-9]){2,}/.test(node.value)) {
    node.setCustomValidity('Weak password');
    return 'Password should contain at least 2 digits.';
  } else {
    node.setCustomValidity('');
    return 'valid';
  }
}

function checkPasswordSimilarity() {
  if (checkPasswordValidity(password) === 'valid') {
    if (password.value === confirmPassword.value) {
      confirmPassword.setCustomValidity('');
      passwordError.textContent = '';
      return true;
    } else {
      confirmPassword.setCustomValidity('Passwords differ');
      passwordError.textContent = 'Passwords differ.';
      return false;
    }
  }
}

password.addEventListener("input", () => {
  const message = checkPasswordValidity(password);
  passwordError.textContent = message !== 'valid' ? message : '';
});

confirmPassword.addEventListener("input", () => {
  checkPasswordSimilarity();
});

form.addEventListener('submit', (e) => {
  const emailPassed = checkEmailValidity(email);
  const countryPassed = checkCountryValidity(country);
  const zipPassed = checkZipValidity(zip);
  const passwordPassed = checkPasswordValidity(password);

  if (emailPassed !== 'valid') {
    emailError.textContent = emailPassed;
  } if (countryPassed !== 'valid') {
    countryError.textContent = countryPassed;
  } if (zipPassed !== 'valid') {
    zipError.textContent = zipPassed;
  } if (passwordPassed !== 'valid') {
    passwordError.textContent = passwordPassed;
  } else if (!checkPasswordSimilarity()) {
    passwordError.textContent = 'Passwords differ.';
  } else {
    console.log('submitted');
  }
});
