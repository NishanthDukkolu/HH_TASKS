
const $ = id => document.getElementById(id);

// Regexes
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/; // min 8, at least one letter & number

const form = $('practiceForm');
const fullName = $('fullName');
const email = $('email');
const password = $('password');
const confirmPassword = $('confirmPassword');
const phone = $('phone');
const age = $('age');
const agree = $('agree');

const errors = {
  fullName: $('fullNameError'),
  email: $('emailError'),
  password: $('passwordError'),
  confirm: $('confirmError'),
  phone: $('phoneError'),
  age: $('ageError'),
  agree: $('agreeError'),
  formSuccess: $('formSuccess')
};

function showError(element, message) {
  element.textContent = message;
  element.classList.add('show');
}
function hideError(element) {
  element.classList.remove('show');
}

// Validation
function validateFullName() {
  const val = fullName.value.trim();
  if (!val || val.length < 2) {
    showError(errors.fullName, 'Name is required (min 2 characters).');
    return false;
  }
  hideError(errors.fullName);
  return true;
}

function validateEmail() {
  const val = email.value.trim();
  if (!val) {
    showError(errors.email, 'Email is required.');
    return false;
  }
  if (!emailRegex.test(val)) {
    showError(errors.email, 'Enter a valid email address.');
    return false;
  }
  hideError(errors.email);
  return true;
}

function validatePassword() {
  const val = password.value;
  if (!val) {
    showError(errors.password, 'Password is required.');
    return false;
  }
  if (!passwordRegex.test(val)) {
    showError(errors.password, 'Password must be 8+ chars and include a number and a letter.');
    return false;
  }
  hideError(errors.password);
  return true;
}

function validateConfirm() {
  const p = password.value;
  const c = confirmPassword.value;
  if (p !== c) {
    showError(errors.confirm, 'Passwords do not match.');
    return false;
  }
  hideError(errors.confirm);
  return true;
}

function validatePhone() {
  const val = phone.value.trim();
  if (!val) {
    hideError(errors.phone);
    return true; // optional
  }
  if (!/^\d{10}$/.test(val)) {
    showError(errors.phone, 'Phone must be 10 digits (numbers only).');
    return false;
  }
  hideError(errors.phone);
  return true;
}

function validateAge() {
  const val = age.value;
  if (!val) {
    hideError(errors.age);
    return true; 
  }
  const num = Number(val);
  if (!Number.isFinite(num) || num < 0 || num > 120) {
    showError(errors.age, 'Age must be between 0 and 120.');
    return false;
  }
  hideError(errors.age);
  return true;
}

function validateAgree() {
  if (!agree.checked) {
    showError(errors.agree, 'You must accept the terms.');
    return false;
  }
  hideError(errors.agree);
  return true;
}

fullName.addEventListener('input', validateFullName);
email.addEventListener('input', validateEmail);
password.addEventListener('input', () => {
  validatePassword();
  validateConfirm();
});
confirmPassword.addEventListener('input', validateConfirm);
phone.addEventListener('input', validatePhone);
age.addEventListener('input', validateAge);
agree.addEventListener('change', validateAgree);

// Submit
form.addEventListener('submit', function (e) {
  e.preventDefault();

  const ok =
    validateFullName() &&
    validateEmail() &&
    validatePassword() &&
    validateConfirm() &&
    validatePhone() &&
    validateAge() &&
    validateAgree();

  if (!ok) {
    errors.formSuccess.classList.remove('show');
    const firstError = document.querySelector('.error.show');
    if (firstError) {
      const field = firstError.previousElementSibling;
      if (field && typeof field.focus === 'function') field.focus();
    }
    return;
  }

  errors.formSuccess.textContent = 'Form is valid — submitting (simulated)!';
  errors.formSuccess.classList.add('show');

  const data = {
    fullName: fullName.value.trim(),
    email: email.value.trim(),
    phone: phone.value.trim(),
    age: age.value ? Number(age.value) : null
  };
  console.log('Form submit payload (demo):', data);


});


