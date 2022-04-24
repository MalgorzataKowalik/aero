import style from "./css/index.css"
import Logo from "./images/logo.png"
import LogoLong from "./images/logo_long.png"
import closeIcon from "./images/close.png"
const sum = require('./sum').sum;

console.log(sum(10,5));

// set logo
const logoWrapper = document.querySelector('.logo>picture');
const mainLogoLong = document.createElement("source");
mainLogoLong.srcset = LogoLong;
mainLogoLong.media = "(min-width: 600px)";
logoWrapper.appendChild(mainLogoLong);
const mainLogo = new Image();
mainLogo.src = Logo;
mainLogo.alt = "logo";
logoWrapper.appendChild(mainLogo);
// set icon
const closeImg = document.querySelector('.close-img');
closeImg.src = closeIcon
// -----

const windowInnerWidth = window.innerWidth
const windowInnerHeight = window.innerHeight

const wrapperSearch = document.querySelector('.search-pannel')
const wrapperOptions = document.querySelector('.options-pannel')
const wrapperWeather = document.querySelector('.wrapper.weather')

const searchFieldOrigin = document.querySelector('.search.pannel-field.origin')
const searchFieldDestination = document.querySelector('.search.pannel-field.destination')
const searchFieldDate = document.querySelector('.search.pannel-field.date')
const searchFieldPassengers = document.querySelector('.search.pannel-field.passengers')

const optionsFields = document.querySelectorAll('.options.pannel-field')
const optionsFieldOrigin = document.querySelector('.options.pannel-field.origin')
const optionsFieldDestination = document.querySelector('.options.pannel-field.destination')
const optionsFieldPassengers = document.querySelector('.options.pannel-field.passengers')

const btnAccept = document.querySelector('.btn.accept')
const btnClose = document.querySelector('.btn.close')

// wrapperOptions.style.height = wrapperSearch.offsetHeight

function searchPannelVisibility() {
  if (windowInnerWidth <= 800) {
    wrapperSearch.style.display = 'none'
  }
}
function onOption() {
  wrapperOptions.style.height = wrapperSearch.offsetHeight + 'px';
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
  // optionsFieldDestination.style.display = 'block'
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