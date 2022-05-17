import style from "./css/index.css"
import Logo from "./images/logo.png"
import LogoLong from "./images/logo_long.png"
import closeIcon from "./images/close.png"

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

const btnLogin = document.querySelector('.btn.login');
const btnAccept = document.querySelector('.btn.accept');
const btnClose = document.querySelector('.btn.close');

const prevMonthArrow = document.querySelector(".prev")
const nextMonthArrow = document.querySelector(".next")

let origin;
let destination;
let adults = 1;
let children = 0;
let infants = 0;

const date = new Date();


function searchPannelVisibility() {
  if (window.innerWidth <= 800) {
    wrapperSearch.style.display = 'none'
  }
}
function onOption() {
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
  originDataField.innerText = origin
  closeOptions()
}

function onOptionDestination(event) {
  destination = event.target.innerText
  destinationDataField.innerText = destination
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
      // console.log(num)
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
      }
    }
  })

  if (children > 0 && infants > 0) {
    btnAccept.style.marginTop = '0'
  } else {
    btnAccept.style.marginTop = '14px'
  }

  let adultsTip = adults > 1 ? 's' : ''
  let childrenTip = children > 1 ? 'ren' : ''
  let infantsTip = infants > 1 ? 's' : ''
  let text = `${adults} Adult${adultsTip}${children > 0 ? (', ' + children + ' Child' + childrenTip) : ''}${infants > 0 ? (', ' + infants + ' Infant' + infantsTip) : ''}`
  passengersDataField.innerText = text
}

function onOptionsClose(event) {
  if (wrapperOptions.style.display == 'block') {
    if (event.target.closest('.btn.close')) {
      closeOptions()
    }
    if (window.innerWidth <= 800 && !event.target.closest(".main-container")) {
      closeOptions()
    }
  }
  if (wrapperLogin.style.display == 'block') {
    if (event.target.closest('.btn.close')) {
      closeLogin()
    }
    if (window.innerWidth <= 800 && !event.target.closest(".main-container") && !event.target.closest(".login")) {
      closeLogin()
    }
  }``
}

function closeOptions() {
  wrapperOptions.style.display = 'none';
  wrapperSearch.style.display = 'grid'
}

function closeLogin() {
  wrapperLogin.style.display = 'none';
  wrapperSearch.style.display = 'grid'
}

function onLoginButton() {
  wrapperLogin.style.display = 'block'
  searchPannelVisibility();
}


document.addEventListener('click', onOptionsClose)
searchFieldOrigin.addEventListener('click', onOrigin)
searchFieldDestination.addEventListener('click', onDestination)
searchFieldDate.addEventListener('click', onDate)
searchFieldPassengers.addEventListener('click', onPassengers)
optionOrigin.addEventListener('click', onOptionOrigin)
optionsDestination.forEach(option => option.addEventListener('click', onOptionDestination))
optionsPassengersSign.forEach(sign => sign.addEventListener('click', onOptionPassenger))
optionsPassengersAcceptBtn.addEventListener('click', closeOptions)
btnLogin.addEventListener('click', onLoginButton)

prevMonthArrow.addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
})
nextMonthArrow.addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
});

renderCalendar()
