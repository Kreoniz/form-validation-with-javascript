const form = document.querySelector('#form');

const email = document.querySelector('#email');
const emailError = document.querySelector('#email + span.error');
const country = document.querySelector('#country');
const countryError = document.querySelector('#country + span.error');
const zip = document.querySelector('#zip');
const zipError = document.querySelector('#zip + span.error');
const password = document.querySelector('#password');
const passwordError = document.querySelector('#password-error');
const confirmPassword = document.querySelector('#confirm-password');
const confirmPasswordError = document.querySelector('#confirm-password-error');

const submitBtn = document.querySelector('#submit-btn');

const zipRegExp = /^\d{6}$/;

function checkEmailValidity(node, errorNode) {
  let message = 'valid';
  if (node.value.length === 0) {
    message = 'You should enter an email address.';
  } else if (node.validity.typeMismatch) {
    message = 'You should enter a valid email address.';
  }

  if (message === 'valid') {
    node.classList.remove('invalid');
    errorNode.classList.remove('active');
    return '';
  } else {
    node.classList.add('invalid');
    errorNode.classList.add('active');
    return message;
  }
}

email.addEventListener("input", () => {
  const message = checkEmailValidity(email, emailError);
  emailError.textContent = message;
});

function checkCountryValidity(node, errorNode) {
  let message = 'valid';
  if (node.value.length === 0) {
    message = 'You should enter a country name.';
  }

  if (message === 'valid') {
    node.classList.remove('invalid');
    errorNode.classList.remove('active');
    return '';
  } else {
    node.classList.add('invalid');
    errorNode.classList.add('active');
    return message;
  }
}

country.addEventListener("input", () => {
  const message = checkCountryValidity(country, countryError);
  countryError.textContent = message;
});

function checkZipValidity(node, errorNode) {
  let message = 'valid';
  if (node.value.length === 0) {
    message = 'You should enter a ZIP code.';
  }  else if (!zipRegExp.test(node.value)) {
    message = 'ZIP code should consist of 6 digits';
  }

  if (message === 'valid') {
    node.classList.remove('invalid');
    errorNode.classList.remove('active');
    return '';
  } else {
    node.classList.add('invalid');
    errorNode.classList.add('active');
    return message;
  }
}

zip.addEventListener("input", () => {
  const message = checkZipValidity(zip, zipError);
  zipError.textContent = message;
});

function checkPasswordValidity() {
  let message = 'valid';
  if (password.value.length === 0) {
    message = 'You should enter a password.';
  } else if (password.value.length < 8) {
    message = 'Password should be at least 8 characters long.';
  } else if (!/(.*[0-9]){2,}/.test(password.value)) {
    message = 'Password should contain at least 2 digits.';
  }

  if (message === 'valid') {
    password.classList.remove('invalid');
    passwordError.classList.remove('active');
    passwordError.textContent = '';
  } else {
    password.classList.add('invalid');
    passwordError.classList.add('active');
    passwordError.textContent = message;
  }

  return message;
}

function checkPasswordSimilarity() {
  if (checkPasswordValidity(password) === 'valid') {
    if (password.value === confirmPassword.value) {
      confirmPasswordError.textContent = '';
      confirmPassword.classList.remove('invalid');
      confirmPasswordError.classList.remove('active');
      return true;
    } else {
      confirmPasswordError.textContent = 'Passwords differ.';
      confirmPassword.classList.add('invalid');
      confirmPasswordError.classList.add('active');
      return false;
    }
  }
}

password.addEventListener("input", () => {
  checkPasswordValidity();
  checkPasswordSimilarity();
});

confirmPassword.addEventListener("input", () => {
  checkPasswordSimilarity();
});

form.addEventListener('submit', (e) => {
  const emailPassed = checkEmailValidity(email, emailError);
  const countryPassed = checkCountryValidity(country, countryError);
  const zipPassed = checkZipValidity(zip, zipError);
  const passwordPassed = checkPasswordValidity();

  if (emailPassed !== 'valid') {
    emailError.textContent = emailPassed;
  } if (countryPassed !== 'valid') {
    countryError.textContent = countryPassed;
  } if (zipPassed !== 'valid') {
    zipError.textContent = zipPassed;
  } if (passwordPassed !== 'valid') {
    passwordError.textContent = passwordPassed;
  } else if (!checkPasswordSimilarity()) {
    confirmPasswordError.textContent = 'Passwords differ.';
  } else {
    form.classList.add('hidden');
    document.querySelector('.confetti').classList.remove('hidden');
  }
});
