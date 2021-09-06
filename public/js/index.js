import '@babel/polyfill';
import { displayMap } from './mapBox';
import { login, logout } from './login';
import { updateSettings } from './updateSettings';
import { bookTour } from './stripe';

// DOM ELEMENT
const mapBox = document.getElementById('map');
const logOutBtn = document.getElementById('logout');
const loginForm = document.querySelector('.form--loggin');
const updateDataBtn = document.querySelector('#update');
const updatePassword = document.querySelector('#updatePassword');
const bookTourBtn = document.getElementById('book-tour');

// MAPBOX HANDLER

if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}

// LOGIN FORM HANDLER
if (loginForm)
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });

// LOGOUT HANDLER
if (logOutBtn) {
  logOutBtn.addEventListener('click', logout);
}

// UPDATE SETTINGS HANDLER
if (updateDataBtn)
  updateDataBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.querySelector('input[name="name"]').value);
    form.append('email', document.querySelector('input[name="email"]').value);
    form.append('photo', document.getElementById('photo').files[0]);

    // console.log(form.getAll('photo'));
    updateSettings(form, 'settings');
  });

// UPDATE PASSWORD HANDLER
if (updatePassword)
  updatePassword.addEventListener('click', (e) => {
    e.preventDefault();
    const passwordCurrent = document.querySelector(
      'input[name="passwordCurrent"]'
    ).value;
    const password = document.querySelector('input[name="password"]').value;
    const passwordConfirm = document.querySelector(
      'input[name="passwordConfirm"]'
    ).value;

    updateSettings({ passwordCurrent, password, passwordConfirm }, 'password');
  });

if (bookTourBtn)
  bookTourBtn.addEventListener('click', (e) => {
    bookTourBtn.textContent = 'Processing...';
    const id = bookTourBtn.dataset.tourId;
    bookTour(id);
  });
