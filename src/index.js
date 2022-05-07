import style from "./css/index.css"
import Logo from "./images/logo.png"
import LogoLong from "./images/logo_long.png"
import closeIcon from "./images/close.png"

// delete -----
const sum = require('./sum').sum;
// ------------

const wrapperSearch = document.querySelector('.search-pannel')
const wrapperOptions = document.querySelector('.options-pannel')
const wrapperWeather = document.querySelector('.wrapper.weather')

const searchFieldOrigin = document.querySelector('.search.pannel-field.origin')
const searchFieldDestination = document.querySelector('.search.pannel-field.destination')
const searchFieldDate = document.querySelector('.search.pannel-field.date')
const searchFieldPassengers = document.querySelector('.search.pannel-field.passengers')

const optionsFields = [...document.querySelectorAll('.options.pannel-field'), document.querySelector('.calendar')]
const optionsFieldOrigin = document.querySelector('.options.pannel-field.origin')
const optionsFieldDestination = document.querySelector('.options.pannel-field.destination')
const optionsFieldDate = document.querySelector('.calendar')
const optionsFieldPassengers = document.querySelector('.options.pannel-field.passengers')

const btnAccept = document.querySelector('.btn.accept')
const btnClose = document.querySelector('.btn.close')

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

function onOptionsClose(event) {
  if (event.target.closest('.btn.close')) {
    wrapperOptions.style.display = 'none';
    wrapperSearch.style.display = 'grid'
  }
  if (windowInnerWidth <= 800 && !event.target.closest(".main-container")) {
    wrapperOptions.style.display = 'none';
    wrapperSearch.style.display = 'grid'
  }
}


document.addEventListener('click', onOptionsClose)
searchFieldOrigin.addEventListener('click', onOrigin)
searchFieldDestination.addEventListener('click', onDestination)
searchFieldDate.addEventListener('click', onDate)
searchFieldPassengers.addEventListener('click', onPassengers)