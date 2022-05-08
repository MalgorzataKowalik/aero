import style from "./css/index.css"
import Logo from "./images/logo.png"
import LogoLong from "./images/logo_long.png"
import closeIcon from "./images/close.png"

// delete -----
const renderCalendar = require('./calendar').renderCalendar;
// ------------

const wrapperSearch = document.querySelector('.search-pannel');
const wrapperOptions = document.querySelector('.options-pannel');
const wrapperWeather = document.querySelector('.wrapper.weather');

const searchFieldOrigin = document.querySelector('.search.pannel-field.origin');
const searchFieldDestination = document.querySelector('.search.pannel-field.destination');
const searchFieldDate = document.querySelector('.search.pannel-field.date');
const searchFieldPassengers = document.querySelector('.search.pannel-field.passengers');

const originDataField = searchFieldOrigin.querySelector('.origin.data');
const destinationDataField = searchFieldDestination.querySelector('.destination.data');
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

const btnAccept = document.querySelector('.btn.accept');
const btnClose = document.querySelector('.btn.close');

let origin;
let destination;
let date;
let adults = 1;
let children = 0;
let infants = 0;


function searchPannelVisibility() {
  if (window.innerWidth <= 800) {
    wrapperSearch.style.display = 'none'
  }
  console.log()
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
  let adultsTip = adults > 1 ? 's' : ''
  let childrenTip = children > 1 ? 'ren' : ''
  let infantsTip = infants > 1 ? 's' : ''
  let text = `${adults} Adult${adultsTip}${children > 0 ? (', ' + children + ' Child' + childrenTip) : ''}${infants > 0 ? (', ' + infants + ' Infant' + infantsTip) : ''}`
  passengersDataField.innerText = text
}

function onOptionsClose(event) {
  if (event.target.closest('.btn.close')) {
    closeOptions()
  }
  if (window.innerWidth <= 800 && !event.target.closest(".main-container")) {
    closeOptions()
  }
}

function closeOptions() {
  wrapperOptions.style.display = 'none';
  wrapperSearch.style.display = 'grid'
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