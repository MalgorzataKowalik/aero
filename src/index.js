import style from "./css/index.css"
import Logo from "./images/logo.png"
import LogoLong from "./images/logo_long.png"
import closeIcon from "./images/close.png"
const lightOrange = '#e9af8b'
const darkBlue = '#01395e'
const lightBlue = '#43a9c7'

const wrapperSearch = document.querySelector('.search-pannel');
const wrapperOptions = document.querySelector('.options-pannel');
const wrapperWeather = document.querySelector('.wrapper.weather');
const wrapperLogin = document.querySelector('.login-pannel');

const searchFieldOrigin = document.querySelector('.search.pannel-field.origin');
const searchFieldDestination = document.querySelector('.search.pannel-field.destination');
const searchFieldDate = document.querySelector('.search.pannel-field.date');
const searchFieldPassengers = document.querySelector('.search.pannel-field.passengers');

const originDataField = searchFieldOrigin.querySelector('.origin.data');
const destinationDataField = searchFieldDestination.querySelector('.destination.data');
const dateDataField = searchFieldDate.querySelector('.date.data');
const passengersDataField = searchFieldPassengers.querySelector('.passengers.data');
const totalPriceElement = document.querySelector('.price>span');

const optionsFields = [...document.querySelectorAll('.options.pannel-field'), document.querySelector('.calendar')];
const optionsFieldOrigin = document.querySelector('.options.pannel-field.origin');
const optionsFieldDestination = document.querySelector('.options.pannel-field.destination');
const optionsFieldDate = document.querySelector('.calendar');
const optionsFieldPassengers = document.querySelector('.options.pannel-field.passengers');

const optionOrigin = document.querySelector('.option.data.origin');
const optionsDestination = [...document.querySelectorAll('.option.data.destination')];

const optionsPassengersContainer = document.querySelector('.passengers-container');
const optionsPassengersSign = [...optionsPassengersContainer.querySelectorAll('.fas')];
const optionsPassengersAmount = [...optionsPassengersContainer.querySelectorAll('.passenger-amount')];
const optionsPassengersAcceptBtn = document.querySelector('.accept-passengers');

const loginForm = document.getElementById('form');
const loginUsernameInput = document.getElementById('username');
const loginUsernameDiv = document.querySelector(".form-control.username");
const loginPasswordInput = document.getElementById('password');
const loginPasswordDiv = document.querySelector(".form-control.password");
const loginErrorText = document.querySelector(".login-error-text");

const airplaneSection = document.querySelector(".airplane");
const availableSeats = [...document.querySelectorAll('.seat')];

const btnLogin = document.querySelector('.btn.login');
const btnOrder = document.querySelector('.btn.order');
const btnLoginAccept = document.querySelector('.btn.login-accept');
const btnSeats = document.querySelector('.btn.seats');
const btnsWrapper = document.querySelector('#buttons-wrapper');

const prevMonthArrow = document.querySelector(".prev")
const nextMonthArrow = document.querySelector(".next")

let origin;
let destination;
let flightDate;
let adults = 1;
let children = 0;
let infants = 0;
let login = false;
let accepted = false
let selectedSeats = []
let ticketPrice = 0
let totalPrice = 0

const date = new Date();


function searchPannelVisibility() {
  if (window.innerWidth <= 800) {
    wrapperSearch.style.display = 'none'
  }
}
function onOption() {
  airplaneSection.style.display = 'none'
  wrapperOptions.style.display = 'block';
  searchPannelVisibility();
  optionsFields.forEach(option => option.style.display = 'none')
}

function onOrigin() {
  onOption()
  optionsFieldOrigin.style.display = 'block'
}

function onDestination() {
  onOption()
  optionsFieldDestination.style.display = 'block'
}

function onDate() {
  onOption()
  optionsFieldDate.style.display = 'block'
}

function onPassengers() {
  onOption()
  optionsFieldPassengers.style.display = 'block'
}

function onOptionOrigin(event) {
  origin = event.target.innerText
  if (destination) setTotalPrice()
  originDataField.innerText = origin
  setColor(searchFieldOrigin, 'valid', false)
  closeOptions()
}

function onOptionDestination(event) {
  destination = event.target.innerText
  ticketPrice = Number(event.target.dataset.price)
  if (origin) setTotalPrice()
  destinationDataField.innerText = destination
  setColor(searchFieldDestination, 'valid', false)
  closeOptions()
}

function renderCalendar() {
  date.setDate(1);

  const monthDays = document.querySelector(".days");

  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();

  const prevLastDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDate();

  const firstDayIndex = date.getDay();

  const lastDayIndex = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDay();

  const nextDays = 7 - lastDayIndex;

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  document.querySelector(".date h1").innerHTML = months[date.getMonth()];

  // document.querySelector(".date p").innerHTML = new Date().toDateString();

  let days = "";

  let dayIdx
  firstDayIndex === 0 ? dayIdx = 7 : dayIdx = firstDayIndex
  for (let x = dayIdx; x > 1; x--) {
    days += `<div class="prev-date">${prevLastDay - x + 2}</div>`;
  }

  for (let i = 1; i <= lastDay; i++) {
    if (
      (i < new Date().getDate() &&
      date.getMonth() === new Date().getMonth()) ||
      (date.getMonth() < new Date().getMonth() && date.getFullYear() == new Date().getFullYear()) ||
      (date.getFullYear() < new Date().getFullYear())
    ) {
      days += `<div class="past-days">${i}</div>`;
    } else {
      days += `<div class="possible-days" data-month="${date.getMonth()}" data-year="${date.getFullYear()}" data-day="${i}">${i}</div>`;
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="next-date">${j}</div>`;
  }
  monthDays.innerHTML = days;

  const optionsDatePossibleDays = [...document.querySelectorAll('.possible-days')];
  optionsDatePossibleDays.forEach(day => day.addEventListener('click', onOptionDate))
};

function onOptionDate(event) {
    let day = event.target.dataset.day
    let month = event.target.dataset.month
    let year = event.target.dataset.year
    dateDataField.innerText = `${day < 10 ? '0' + day : day}/${month < 9 ? '0' + (+month + 1) : (month + 1)}/${year}`
    flightDate = dateDataField.innerText
    setColor(searchFieldDate, 'valid', false)
    const daysDivs = [...document.querySelectorAll('.days>div')];
    daysDivs.forEach(day => day.classList.remove('chosen'))
    event.target.classList.add('chosen')
    closeOptions()
}

function onOptionPassenger(event) {
  let type = event.target.dataset.type
  let sign = event.target.dataset.sign
  optionsPassengersAmount.map(item => {
    if (item.classList.contains(type)) {
      let num = +(item.innerText)
      if (sign === 'plus' && num < 10) {
        if (type === 'adults') {
          ++adults
          item.innerText = adults
        }
        if (type === 'children') {
          ++children
          item.innerText = children
        }
        if (type === 'infants') {
          if (infants < adults) {
            ++infants
          }
          item.innerText = infants
        }
      }
      else if (sign === 'minus' && num > 0) {
        if (type === 'adults' && num > 1 && adults > infants) {
          --adults
          item.innerText = adults
        }
        if (type === 'children') {
          --children
          item.innerText = children
        }
        if (type === 'infants') {
          --infants
          item.innerText = infants
        }
        if (selectedSeats.length > 0) {
          const deletedSeat = selectedSeats.pop()
          deletedSeat.style.fill = lightBlue
        }
      }
    }
  })
  if (origin && destination) setTotalPrice()

  if (children > 0 && infants > 0 && (adults > 9 || children > 9)) {
    btnsWrapper.style.marginTop = '0'
  } else {
    btnsWrapper.style.marginTop = '14px'
  }

  let adultsTip = adults > 1 ? 's' : ''
  let childrenTip = children > 1 ? 'ren' : ''
  let infantsTip = infants > 1 ? 's' : ''
  let text = `${adults} Adult${adultsTip}${children > 0 ? (', ' + children + ' Child' + childrenTip) : ''}${infants > 0 ? (', ' + infants + ' Infant' + infantsTip) : ''}`
  passengersDataField.innerText = text
  checkOrderAvailability()
}

function onWrapperClose(event) {
  if (wrapperOptions.style.display == 'block') {
    if (event.target.closest('.btn.close-options')) {
      closeOptions()
    }
    if (window.innerWidth <= 800 && !event.target.closest(".main-container")) {
      closeOptions()
    }
  }
  if (wrapperLogin.style.display == 'block') {
    if (event.target.closest('.btn.close-login')) {
      closeLogin()
    }
    if (window.innerWidth <= 800 && !event.target.closest(".main-container") && !event.target.closest(".login")) {
      closeLogin()
    }
  }
  if (airplaneSection.style.display == 'block') {
    if (event.target.closest('.btn.close-seats')) {
      closeSeats()
    }
    if (window.innerWidth <= 800 && !event.target.closest(".main-container")) {
      closeSeats()
    }
  }
}

function closeOptions() {
  wrapperOptions.style.display = 'none';
  wrapperSearch.style.display = 'grid';
  checkOrderAvailability()
}

function closeSeats() {
  airplaneSection.style.display = 'none';
  wrapperSearch.style.display = 'grid'
}

function setColor(target, validator, isForm) {
  if (validator == 'valid') {
    target.style.backgroundColor = "#fff";
    if (isForm) {
      target.classList.remove('empty')
      target.parentElement.style.backgroundColor = "#fff";
    }
  } else if (validator == 'invalid') {
    target.style.backgroundColor = lightOrange;
    if (isForm) {
      target.classList.add('empty')
      target.parentElement.style.backgroundColor = lightOrange;
    }
  }
}

function closeLogin() {
  wrapperLogin.style.display = 'none';
  wrapperSearch.style.display = 'grid';
  loginForm.reset()
  loginErrorText.style.display = 'none';
  setColor(loginPasswordInput, 'valid', true)
  setColor(loginUsernameInput, 'valid', true)
}

function onLoginButton() {
  if (login == false) {
    wrapperLogin.style.display = 'block'
    searchPannelVisibility();
  }
  else {
    btnLogin.innerText = 'Login'
    login = false
  }
}

function onLoginAcceptButton(event) {
  event.preventDefault();
  const username = loginUsernameInput.value;
  const password = loginPasswordInput.value;
  if (loginUsernameInput.value == "") {
    setColor(loginUsernameInput, 'invalid', true)
  }
  if (loginPasswordInput.value == "") {
    setColor(loginPasswordInput, 'invalid', true)
  }

  fetch(`https://gist.githubusercontent.com/MalgorzataKowalik/039b073fd0fa4da4e19aeecd4f09e5b5/raw/4a95f8643267a967a4402f4887a17459a9939c13/passwords.json`)
  .then(res => res.json())
  .then(data => {
    const users = data.users
    users.forEach(user => {
      if (username == user.username && password == user.password) {
        btnLogin.innerText = 'Logout';
        login = true;
        checkOrderAvailability()
        closeLogin()
      }
      else if (username != '' && password != '') {
        loginErrorText.style.display = 'block'
      }
    })
  })
}

function onEmptyValue(event) {
  if (event.target.value == "") {
    setColor(this, 'invalid', true)
  } 
  else {
    setColor(this, 'valid', true)
    loginErrorText.style.display = 'none'
  }
}

// function onOrderButton() {
//   let originSet = checkIfValueSet(origin, searchFieldOrigin)
//   let destinationSet = checkIfValueSet(destination, searchFieldDestination)
//   let flightDateSet = checkIfValueSet(flightDate, searchFieldDate)
//   if (originSet && destinationSet && flightDateSet) {
//     closeOptions()
//     accepted = true
//     if (login == false) {
//       wrapperLogin.style.display = 'block'
//       searchPannelVisibility();
//     }
//   }
// }

function checkOrderAvailability() {
  let originSet = checkIfValueSet(origin)
  let destinationSet = checkIfValueSet(destination)
  let flightDateSet = checkIfValueSet(flightDate)
  let seatsSet = (selectedSeats.length == adults + children)
  if (originSet && destinationSet && flightDateSet && seatsSet && login) {
    btnOrder.disabled = false
  }
  else {
    btnOrder.disabled = true
  }
}

function onSeatsButton() {
  closeOptions()
  searchPannelVisibility();
  airplaneSection.style.display = 'block'
}

function checkIfValueSet(item) {
  if (item == undefined) {
    return false
  } else {
    return true
  };
}

function onSeat(e) {
  if (!this.classList.contains('selected')) {
    if (selectedSeats.length < adults + children) {
      this.classList.add('selected')
      e.target.style.fill = darkBlue
      selectedSeats.push(this)
    }
  }
  else {
    e.target.style.fill = lightBlue
    this.classList.remove('selected')
    selectedSeats.forEach((seat, index) => {
      if (seat.parentElement.id == this.parentElement.id) {
        selectedSeats.splice(index, 1)
      }
    })
  }
  checkOrderAvailability()
}

function setTotalPrice() {
  totalPrice = Math.round(ticketPrice * (adults + 0.8 * children))
  totalPriceElement.textContent = totalPrice
}

document.addEventListener('click', onWrapperClose)
searchFieldOrigin.addEventListener('click', onOrigin)
searchFieldDestination.addEventListener('click', onDestination)
searchFieldDate.addEventListener('click', onDate)
searchFieldPassengers.addEventListener('click', onPassengers)
optionOrigin.addEventListener('click', onOptionOrigin)
optionsDestination.forEach(option => option.addEventListener('click', onOptionDestination))
optionsPassengersSign.forEach(sign => sign.addEventListener('click', onOptionPassenger))
optionsPassengersAcceptBtn.addEventListener('click', closeOptions)
btnLogin.addEventListener('click', onLoginButton)
btnLoginAccept.addEventListener('click', onLoginAcceptButton)
loginUsernameInput.addEventListener('input', onEmptyValue)
loginPasswordInput.addEventListener('input', onEmptyValue)
// btnOrder.addEventListener('click', onOrderButton)
btnSeats.addEventListener('click', onSeatsButton)
availableSeats.forEach(seat => seat.addEventListener('click', onSeat))

prevMonthArrow.addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
})
nextMonthArrow.addEventListener('click', () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
});

renderCalendar()
