import style from "./css/index.css"
import Logo from "./images/logo.png"
import LogoLong from "./images/logo_long.png"
import closeIcon from "./images/close.png"
const lightOrange = '#e9af8b'
const darkBlue = '#01395e'
const lightBlue = '#43a9c7'

const wrapperSearch = document.querySelector('.search-pannel');
const wrapperOptions = document.querySelector('.options-pannel');
const wrapperWeather = document.querySelector('.weather-pannel');
const wrapperLogin = document.querySelector('.login-pannel');
const wrapperSumup = document.querySelector('.sumup-pannel');

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

const weatherOriginDiv = document.querySelector('.weather.origin');
const weatherOriginP = document.querySelector('.weather.origin>p');
const weatherOriginImg = document.querySelector('.weather.origin>img');
const weatherDestinationDiv = document.querySelector('.weather.destination');
const weatherDestinationP = document.querySelector('.weather.destination>p');
const weatherDestinationImg = document.querySelector('.weather.destination>img');

const airplaneSection = document.querySelector(".airplane");
const availableSeats = [...document.querySelectorAll('.seat')];

const sumupId = document.getElementById('sumup-id');
const sumupOrigin = document.getElementById('sumup-origin');
const sumupDestination = document.getElementById('sumup-destination');
const sumupDate = document.getElementById('sumup-date');
const sumupPassengers = document.getElementById('sumup-passengers');
const sumupSeats = document.getElementById('sumup-seats');
const sumupPrice = document.getElementById('sumup-price');

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
let username = ''
let ordered = false
let selectedSeats = []
let ticketPrice = 0
let totalPrice = 0
let flightId = ''

const date = new Date();


function searchPannelVisibility() {
  if (window.innerWidth <= 800) {
    wrapperSearch.style.display = 'none'
    wrapperWeather.style.display = 'none'
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
  sessionStorage.setItem('origin', origin)
  if (destination) setTotalPrice()
  originDataField.innerText = origin
  const params = {"lat": event.target.dataset.lat, "long": event.target.dataset.long}
  sessionStorage.setItem('originParams', JSON.stringify(params))
  showOriginWeather(params)
  closeOptions()
}

function showOriginWeather(params) {
  const weather = fetchWeather(params)
  weather.then(obj => {
    weatherOriginP.innerText = `${origin} ${Math.round(obj.temperature)}${String.fromCharCode(176)}C`
    weatherOriginImg.src = `http://openweathermap.org/img/wn/${obj.icon}@2x.png`
  })
  wrapperWeather.style.display = 'block'
  weatherOriginDiv.style.display = 'flex'
}

function onOptionDestination(event) {
  destination = event.target.innerText
  sessionStorage.setItem('destination', destination)
  ticketPrice = Number(event.target.dataset.price)
  if (origin) setTotalPrice()
  destinationDataField.innerText = destination
  const params = {"lat": event.target.dataset.lat, "long": event.target.dataset.long}
  sessionStorage.setItem('destinationParams', JSON.stringify(params))
  showDestinationWeather(params)
  closeOptions()
}

function showDestinationWeather(params) {
  const weather = fetchWeather(params)
  weather.then(obj => {
    weatherDestinationP.innerText = `${destination} ${Math.round(obj.temperature)}${String.fromCharCode(176)}C`
    weatherDestinationImg.src = `http://openweathermap.org/img/wn/${obj.icon}@2x.png`
  })
  wrapperWeather.style.display = 'block'
  weatherDestinationDiv.style.display = 'flex'
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
    sessionStorage.setItem('flightDate', flightDate)
    const daysDivs = [...document.querySelectorAll('.days>div')];
    daysDivs.forEach(day => day.classList.remove('chosen'))
    event.target.classList.add('chosen')
    sessionStorage.setItem('flightDateDiv', JSON.stringify({day, month, year}))
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
  sessionStorage.setItem('passengers', JSON.stringify({adults, children, infants}))

  if (origin && destination) setTotalPrice()

  let adultsTip = adults > 1 ? 's' : ''
  let childrenTip = children > 1 ? 'ren' : ''
  let infantsTip = infants > 1 ? 's' : ''
  let text = `${adults} Adult${adultsTip}${children > 0 ? (', ' + children + ' Child' + childrenTip) : ''}${infants > 0 ? (', ' + infants + ' Infant' + infantsTip) : ''}`
  passengersDataField.innerText = text
  sessionStorage.setItem('passengersText', text)
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
  wrapperWeather.style.display = 'block'
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
    localStorage.setItem("loginState", login)
  }
  checkOrderAvailability()
}

function onLoginAcceptButton(event) {
  event.preventDefault();
  const usernameVal = loginUsernameInput.value;
  const passwordVal = loginPasswordInput.value;
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
      if (usernameVal == user.username && passwordVal == user.password) {
        btnLogin.innerText = 'Logout';
        login = true;
        username = usernameVal
        checkOrderAvailability()
        closeLogin()
        localStorage.setItem("loginState", login)
        localStorage.setItem('user', usernameVal)
      }
      else if (usernameVal != '' && passwordVal != '') {
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

function onOrderButton() {
  wrapperOptions.style.display = 'none';
  wrapperSearch.style.display = 'none';
  airplaneSection.style.display = 'none';
  wrapperWeather.style.display = 'none'
  wrapperSumup.style.display = 'block';
  if (flightId == '') {
    flightId = (Math.round(Math.random() * 100000)).toString()
  }
  sessionStorage.setItem('flightId', flightId)
  sumupId.innerText = flightId;
  sumupOrigin.innerText = origin;
  sumupDestination.innerText = destination;
  sumupDate.innerText = flightDate;
  sumupPassengers.innerText = passengersDataField.innerText
  const selectedSeatsParentId = selectedSeats.map(seat => seat.parentElement.id)
  sumupSeats.innerText = selectedSeatsParentId.join(', ');
  sumupPrice.innerText = totalPrice + '$';
  sessionStorage.setItem('orderState', true)
  document.addEventListener('click', onOrderClose)
  return false
}

function onOrderClose(event) {
  if (event.target.closest('.btn.sumup') || event.target.closest('.btn.login')) {
    sessionStorage.clear()
    location.reload();
    document.removeEventListener('click', onOrderClose);
   }
}

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
  if (!e.target.classList.contains('selected')) {
    if (selectedSeats.length < adults + children) {
      e.target.classList.add('selected')
      e.target.style.fill = darkBlue
      selectedSeats.push(e.target)
    }
  }
  else {
    e.target.style.fill = lightBlue
    e.target.classList.remove('selected')
    selectedSeats.forEach((seat, index) => {
      if (seat.parentElement.id == e.target.parentElement.id) {
        selectedSeats.splice(index, 1)
      }
    })
  }
  const selectedSeatsParentId = selectedSeats.map(seat => seat.parentElement.id)
  sessionStorage.setItem('selectedSeatsParentId', JSON.stringify(selectedSeatsParentId))
  checkOrderAvailability()
}

function setTotalPrice() {
  totalPrice = Math.round(ticketPrice * (adults + 0.8 * children))
  totalPriceElement.textContent = totalPrice
}

function fetchWeather(params) {
  let weather
  return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${params.lat}&lon=${params.long}&appid=207177da157001d0d25c027d33988ec4&units=metric`)
        .then((response) => response.json())
        .then((data) => {
          const weather = {
            "name": data.name, 
            "temperature": data.main.temp, 
            "description": data.weather[0].description,
            "icon": data.weather[0].icon
          };
          return weather
        })
  // return weather
}

function setInitials() {
  let savedLoginState = localStorage.getItem('loginState')
  if (savedLoginState == 'true') {
    let savedUser = localStorage.getItem('user')
    if (savedUser) {
      fetch(`https://gist.githubusercontent.com/MalgorzataKowalik/039b073fd0fa4da4e19aeecd4f09e5b5/raw/4a95f8643267a967a4402f4887a17459a9939c13/passwords.json`)
      .then(res => res.json())
      .then(data => {
        const users = data.users;
        users.forEach(user => {
          if (savedUser == user.username) {
            btnLogin.innerText = 'Logout';
            login = true;
            username = savedUser;
            checkOrderAvailability()
          }
        })
      })
    };
  }
  let savedOrigin = sessionStorage.getItem('origin');
  if (savedOrigin != null) {
    origin = savedOrigin;
    if (destination) setTotalPrice();
    originDataField.innerText = origin;
    let savedOriginParams = JSON.parse(sessionStorage.getItem('originParams'))
    showOriginWeather(savedOriginParams)
  }
  let savedDestination = sessionStorage.getItem('destination');
  if (savedDestination != null) {
    destination = savedDestination;
    let cityElement = document.querySelector(`[data-city='${savedDestination}']`);
    ticketPrice = Number(cityElement.dataset.price);
    if (origin) setTotalPrice();
    destinationDataField.innerText = destination;
    let savedDestinationParams = JSON.parse(sessionStorage.getItem('destinationParams'))
    showDestinationWeather(savedDestinationParams)
  }
  let savedFlightDate = sessionStorage.getItem('flightDate');
  if (savedFlightDate != null) {
    flightDate = savedFlightDate
    dateDataField.innerText = flightDate
  }
  let savedFlightDateDiv = JSON.parse(sessionStorage.getItem('flightDateDiv'));
  if (savedFlightDateDiv != null) {
    date.setMonth(savedFlightDateDiv.month);
    renderCalendar();
    let flightDateDiv= document.querySelector(`[data-day='${savedFlightDateDiv.day}']`);
    flightDateDiv.classList.add('chosen')
  }
  let savedPassengersText = sessionStorage.getItem('passengersText');
  if (savedPassengersText != null) {
    passengersDataField.innerText = savedPassengersText
  }
  let savedPassengers = JSON.parse(sessionStorage.getItem('passengers'));
  if (savedPassengers != null) {
    adults = savedPassengers.adults;
    children = savedPassengers.children;
    infants = savedPassengers.infants;
    let adultsElement = document.querySelector('.passenger-amount.adults');
    let childrenElement = document.querySelector('.passenger-amount.children');
    let infantsElement = document.querySelector('.passenger-amount.infants');
    adultsElement.innerText = adults
    childrenElement.innerText = children
    infantsElement.innerText = infants
  }
  if (origin && destination) setTotalPrice()
  let savedSelectedSeatsParentId = JSON.parse(sessionStorage.getItem('selectedSeatsParentId'));
  if (savedSelectedSeatsParentId != null) {
    if (savedSelectedSeatsParentId.length <= adults + children) {
      savedSelectedSeatsParentId.forEach(parentId => {
        let seat = document.querySelector(`#${parentId}>rect`)
        seat.classList.add('selected');
        seat.style.fill = darkBlue
        selectedSeats.push(seat)
      })
    }
  }
  checkOrderAvailability()
  let savedFlightId = sessionStorage.getItem('flightId');
  if (savedFlightId != null) {
    flightId = savedFlightId;
  }
  let savedOrderState = sessionStorage.getItem('orderState')
  if (savedOrderState == 'true') onOrderButton()
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
btnOrder.addEventListener('click', onOrderButton)
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
setInitials()

