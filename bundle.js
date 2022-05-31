/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),
/* 2 */
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),
/* 4 */
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),
/* 5 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),
/* 6 */
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),
/* 7 */
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),
/* 8 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(11);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(12), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Lato:wght@300&family=Marmelad&display=swap);"]);
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "* {\r\n  margin: 0;\r\n  padding: 0;\r\n  box-sizing: border-box;\r\n}\r\n\r\nhtml {\r\n  font-size: 10px;\r\n  font-family: 'Lato', sans-serif;\r\n}\r\n\r\nbody {\r\n  width: 100%;\r\n  height: 870px;\r\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\r\n  background-repeat: no-repeat;\r\n  background-size: cover;\r\n  background-position: center;\r\n}\r\n\r\nnav {\r\n  width: 100%;\r\n  padding: 2vh 6vw;\r\n  background: rgba(255, 255, 255, 0.4);\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n}\r\n\r\n.logo {\r\n  max-width: 50%;\r\n  display: flex;\r\n  justify-content: flex-start;\r\n  align-items: center;\r\n}\r\n\r\n.logo img {\r\n  height: 50px;\r\n  width: auto;\r\n  margin-right: 10px;\r\n}\r\n\r\n.logo h1 {\r\n  font-family: 'Marmelad', sans-serif;\r\n  color: #01395e;\r\n  font-size: 2.4rem;\r\n}\r\n\r\n.btn {\r\n  border: none;\r\n  border-radius: 20px;\r\n  width: 120px;\r\n  height: 40px;\r\n  background-color: #01395e;\r\n  color: #fff;\r\n  font-family: 'Lato', sans-serif;\r\n  font-size: 1.7rem;\r\n}\r\n\r\n.hover-pointer:hover {\r\n  cursor: pointer;\r\n}\r\n\r\n.main-container {\r\n  width: 88vw;\r\n  position: absolute;\r\n  top: 100px;\r\n  left: 6vw;\r\n}\r\n\r\n.wrapper {\r\n  background-color: rgba(255, 255, 255, 0.4);\r\n  width: 100%;\r\n  height: 400px;\r\n  padding: 18px 20px;\r\n  border-radius: 20px;\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n}\r\n\r\n.search-pannel, .form {\r\n  display: grid;\r\n  grid-template-columns: 1fr;\r\n  grid-gap: 10px;\r\n}\r\n\r\n.pannel-field, .form-control {\r\n  background-color: #fff;\r\n  border-radius: 20px;\r\n  padding: 5px 4vw;\r\n  width: 100%;\r\n}\r\n\r\n.price {\r\n  margin: 0 auto;\r\n  font-size: 1.7rem;\r\n  font-weight: normal;\r\n}\r\n\r\n#buttons-wrapper {\r\n  margin: 0 auto ;\r\n  text-align: center;\r\n}\r\n\r\n#buttons-wrapper>button {\r\n  margin-bottom: 5px;\r\n}\r\n\r\n.btn.order {\r\n  background-color: #ca7641;\r\n}\r\n\r\n.btn:disabled {\r\n  background-color: #8b8b8b;\r\n  cursor: auto;\r\n}\r\n\r\n.pannel-field>.field-title, .form-control>label {\r\n  font-size: 1.4rem;\r\n  color: #555\r\n}\r\n\r\n.pannel-field>.data {\r\n  font-size: 1.7rem;\r\n  margin: 5px 0;\r\n}\r\n\r\n.options-pannel {\r\n  display: none;\r\n  justify-content: center;\r\n  align-items: flex-start;\r\n}\r\n\r\n.options.pannel-field {\r\n  display: none;\r\n}\r\n\r\n.close {\r\n  width: 30px;\r\n  height: 30px;\r\n  border-radius: 15px;\r\n  position: absolute;\r\n  top: -10px;\r\n  right: -10px;\r\n}\r\n\r\n.close-img {\r\n  width: 14px;\r\n  height: 14px;\r\n  position: absolute;\r\n  top: 50%;\r\n  left: 50%;\r\n  transform: translate(-50%, -50%);\r\n}\r\n\r\n.close.close-seats {\r\n  top: 0;\r\n  right: 0;\r\n}\r\n\r\n.option.origin:hover, .option.destination:hover {\r\n  cursor: pointer;\r\n  font-weight: 600;\r\n}\r\n\r\n/* calendar start*/\r\n\r\n.calendar {\r\n  padding: 0;\r\n  background-color: #fff;\r\n  border-radius: 20px;\r\n  width: 100%;\r\n  display: none;\r\n}\r\n\r\n.month {\r\n  width: 100%;\r\n  height: 4rem;\r\n  background-color: #01395e;\r\n  color: #fff;\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  padding: 0 2rem;\r\n  text-align: center;\r\n  border-radius: 20px 20px 0 0;\r\n}\r\n\r\n.month i {\r\n  font-size: 2.5rem;\r\n  cursor: pointer;\r\n}\r\n\r\n.month h1 {\r\n  line-height: 4rem;\r\n  font-size: 1.7rem;\r\n  font-weight: 400;\r\n  text-transform: uppercase;\r\n  letter-spacing: 0.2rem;\r\n}\r\n\r\n.weekdays {\r\n  width: 100%;\r\n  height: 4rem;\r\n  padding: 0 0.4rem;\r\n  display: flex;\r\n  align-items: center;\r\n}\r\n\r\n.weekdays div {\r\n  font-size: 1.4rem;\r\n  font-weight: 400;\r\n  letter-spacing: 0.1rem;\r\n  width: calc((86vw - 42px) / 7);\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n\r\n.days {\r\n  width: 100%;\r\n  display: flex;\r\n  flex-wrap: wrap;\r\n  justify-content: center;\r\n  padding: 0.2rem;\r\n}\r\n\r\n.days div {\r\n  font-size: 1.3rem;\r\n  margin: calc(1vw / 14);\r\n  width: calc((86vw - 54px) / 7);\r\n  height: calc((366px - 36px - 10px - 8rem) / 6);\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n  transition: background-color 0.2s;\r\n}\r\n\r\n.days div:hover:not(.prev-date):not(.next-date):not(.past-days), .days .chosen {\r\n  background-color: #01395e;\r\n  cursor: pointer;\r\n  color: #fff;\r\n}\r\n\r\n.prev-date,\r\n.next-date {\r\n  opacity: 0;\r\n}\r\n\r\n.past-days {\r\n  color: #bbb;\r\n}\r\n/* calendar end*/\r\n\r\n.passengers-container {\r\n  margin: 15px 0;\r\n  display: grid;\r\n  grid-template-columns: 1fr repeat(3, 15%);\r\n  grid-column-gap: 0px;\r\n  grid-row-gap: 10px;\r\n  font-size: 1.7rem\r\n}\r\n\r\n.passengers-container>* {\r\n  align-self: center\r\n}\r\n\r\n.passenger-type-info {\r\n  font-size: 1.2rem;\r\n  color: #777\r\n}\r\n\r\n.passenger-amount, .passenger-sign {\r\n  margin: 0 auto;\r\n  color: #01395e;\r\n}\r\n\r\n.passenger-amount {\r\n  font-size: 2rem;\r\n  font-weight: bold;\r\n}\r\n\r\n.accept-passengers {\r\n  grid-area: 4 / 1 / 5 / 5;\r\n  margin: 15px auto 0;\r\n}\r\n\r\n.weather-pannel {\r\n  top: 410px;\r\n  height: auto;\r\n  padding: 10px 20px;\r\n  display: none;\r\n}\r\n\r\n.weather-pannel div {\r\n  padding: 0 4vw;\r\n  font-size: 1.7rem;\r\n  display: none;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n\r\n.weather-pannel div.origin {\r\n  margin-bottom: 10px;\r\n}\r\n\r\n.weather-pannel img {\r\n  height: 40px;\r\n  width: 40px;\r\n}\r\n\r\n.login-pannel {\r\n  background-color: #01395e;\r\n  display: none;\r\n}\r\n\r\n.form-control>input {\r\n  border: none;\r\n  font-size: 1.7rem;\r\n  font-family: 'Lato', sans-serif;\r\n  width: 100%;\r\n  margin: 5px 0;\r\n  outline: none;\r\n}\r\n\r\n.login-accept {\r\n  margin: 14px auto 0;\r\n  background-color: #206797\r\n}\r\n\r\n.login-error-text {\r\n  margin: 20px auto;\r\n  font-size: 1.6rem;\r\n  color: #ca7641;\r\n  text-align: center;\r\n  display: none;\r\n}\r\n\r\n.sumup-pannel {\r\n  z-index: 10;\r\n  font-size: 1.7rem;\r\n  display: none;\r\n}\r\n\r\n.sumup.pannel-field {\r\n  padding: 10px 4vw;\r\n  display: flex;\r\n  flex-direction: column;\r\n}\r\n\r\nh3.sumup {\r\n  margin: 6px 0;\r\n}\r\n\r\np.sumup {\r\n  margin: 3px 0;\r\n}\r\n\r\n.btn.sumup {\r\n  margin: 14px auto 0;\r\n  align-self: center;\r\n}\r\n\r\n.airplane {\r\n  width: 100%;\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  overflow-y: scroll;\r\n  display: none;\r\n}\r\n\r\n#airplane-svg {\r\n  height: 750px;\r\n  width: 100%;\r\n  margin: 0 auto;\r\n}\r\n\r\n.seat:hover {\r\n  cursor: pointer;\r\n}\r\n\r\ninput:-webkit-autofill {\r\n  -webkit-box-shadow: 0 0 0px 1000px #fff inset;\r\n}\r\n\r\ninput.empty:-webkit-autofill {\r\n  -webkit-box-shadow: 0 0 0px 1000px #e9af8b inset;\r\n}\r\n\r\n@media only screen and (max-width: 1400px) and (min-width: 800px) {\r\n  html {\r\n    font-size: 8px;\r\n  }\r\n}\r\n\r\n@media only screen and (min-width: 800px) {\r\n  body {\r\n    height: 100vh;\r\n  }\r\n  nav {\r\n    padding: 2vh 3vw;\r\n  }\r\n\r\n  .logo img {\r\n    height: 60px;\r\n  }\r\n\r\n  .logo h1 {\r\n    font-size: 2.8rem;\r\n  }\r\n\r\n  .btn-login {\r\n    border-radius: 25px;\r\n    width: 150px;\r\n    height: 50px;\r\n    font-size: 2rem;\r\n  }\r\n\r\n  .main-container {\r\n    top: 150px;\r\n  }\r\n\r\n  .wrapper {\r\n    width: 20vw;\r\n    padding: 18px 1.2vw;\r\n    border-radius: 25px;\r\n  }\r\n  \r\n  .pannel-field, .form-control {\r\n    border-radius: 25px;\r\n    padding: 5px 1.8vw;\r\n  }\r\n\r\n  .calendar {\r\n    padding: 0;\r\n    border-radius: 25px;\r\n  }\r\n\r\n  .weekdays div {\r\n    width: calc((20vw - 2.4vw - 2px) / 7);\r\n  }\r\n\r\n  .days div {\r\n    margin: 0.1rem;\r\n    width: calc((20vw - 2.4vw - 2px - 2rem) / 7);\r\n    height: calc((366px - 36px - 16px - 8rem) / 6);\r\n  }\r\n\r\n  .search-pannel {\r\n    left: 0;\r\n  }\r\n\r\n  .options-pannel {\r\n    left: 20.5vw;\r\n  }\r\n\r\n  .weather-pannel div {\r\n    padding: 0 1.2vw;\r\n  }\r\n\r\n  .login-pannel {\r\n    left: 68vw;\r\n  }\r\n\r\n  .sumup-pannel {\r\n    left: 50%;\r\n    transform: translateX(-50%);\r\n  }\r\n\r\n  .sumup.pannel-field {\r\n    padding: 10px 1.8vw;\r\n  }\r\n\r\n  .airplane {\r\n    width: 20vw;\r\n    left: 20.5vw;\r\n    overflow-y: auto;\r\n  }\r\n\r\n  #airplane-svg {\r\n    height: 700px;\r\n  }\r\n}", "",{"version":3,"sources":["webpack://./src/css/index.css"],"names":[],"mappings":"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","sourcesContent":["@import url('https://fonts.googleapis.com/css2?family=Lato:wght@300&family=Marmelad&display=swap');\r\n\r\n* {\r\n  margin: 0;\r\n  padding: 0;\r\n  box-sizing: border-box;\r\n}\r\n\r\nhtml {\r\n  font-size: 10px;\r\n  font-family: 'Lato', sans-serif;\r\n}\r\n\r\nbody {\r\n  width: 100%;\r\n  height: 870px;\r\n  background-image: url('../images/background_image.jpg');\r\n  background-repeat: no-repeat;\r\n  background-size: cover;\r\n  background-position: center;\r\n}\r\n\r\nnav {\r\n  width: 100%;\r\n  padding: 2vh 6vw;\r\n  background: rgba(255, 255, 255, 0.4);\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n}\r\n\r\n.logo {\r\n  max-width: 50%;\r\n  display: flex;\r\n  justify-content: flex-start;\r\n  align-items: center;\r\n}\r\n\r\n.logo img {\r\n  height: 50px;\r\n  width: auto;\r\n  margin-right: 10px;\r\n}\r\n\r\n.logo h1 {\r\n  font-family: 'Marmelad', sans-serif;\r\n  color: #01395e;\r\n  font-size: 2.4rem;\r\n}\r\n\r\n.btn {\r\n  border: none;\r\n  border-radius: 20px;\r\n  width: 120px;\r\n  height: 40px;\r\n  background-color: #01395e;\r\n  color: #fff;\r\n  font-family: 'Lato', sans-serif;\r\n  font-size: 1.7rem;\r\n}\r\n\r\n.hover-pointer:hover {\r\n  cursor: pointer;\r\n}\r\n\r\n.main-container {\r\n  width: 88vw;\r\n  position: absolute;\r\n  top: 100px;\r\n  left: 6vw;\r\n}\r\n\r\n.wrapper {\r\n  background-color: rgba(255, 255, 255, 0.4);\r\n  width: 100%;\r\n  height: 400px;\r\n  padding: 18px 20px;\r\n  border-radius: 20px;\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n}\r\n\r\n.search-pannel, .form {\r\n  display: grid;\r\n  grid-template-columns: 1fr;\r\n  grid-gap: 10px;\r\n}\r\n\r\n.pannel-field, .form-control {\r\n  background-color: #fff;\r\n  border-radius: 20px;\r\n  padding: 5px 4vw;\r\n  width: 100%;\r\n}\r\n\r\n.price {\r\n  margin: 0 auto;\r\n  font-size: 1.7rem;\r\n  font-weight: normal;\r\n}\r\n\r\n#buttons-wrapper {\r\n  margin: 0 auto ;\r\n  text-align: center;\r\n}\r\n\r\n#buttons-wrapper>button {\r\n  margin-bottom: 5px;\r\n}\r\n\r\n.btn.order {\r\n  background-color: #ca7641;\r\n}\r\n\r\n.btn:disabled {\r\n  background-color: #8b8b8b;\r\n  cursor: auto;\r\n}\r\n\r\n.pannel-field>.field-title, .form-control>label {\r\n  font-size: 1.4rem;\r\n  color: #555\r\n}\r\n\r\n.pannel-field>.data {\r\n  font-size: 1.7rem;\r\n  margin: 5px 0;\r\n}\r\n\r\n.options-pannel {\r\n  display: none;\r\n  justify-content: center;\r\n  align-items: flex-start;\r\n}\r\n\r\n.options.pannel-field {\r\n  display: none;\r\n}\r\n\r\n.close {\r\n  width: 30px;\r\n  height: 30px;\r\n  border-radius: 15px;\r\n  position: absolute;\r\n  top: -10px;\r\n  right: -10px;\r\n}\r\n\r\n.close-img {\r\n  width: 14px;\r\n  height: 14px;\r\n  position: absolute;\r\n  top: 50%;\r\n  left: 50%;\r\n  transform: translate(-50%, -50%);\r\n}\r\n\r\n.close.close-seats {\r\n  top: 0;\r\n  right: 0;\r\n}\r\n\r\n.option.origin:hover, .option.destination:hover {\r\n  cursor: pointer;\r\n  font-weight: 600;\r\n}\r\n\r\n/* calendar start*/\r\n\r\n.calendar {\r\n  padding: 0;\r\n  background-color: #fff;\r\n  border-radius: 20px;\r\n  width: 100%;\r\n  display: none;\r\n}\r\n\r\n.month {\r\n  width: 100%;\r\n  height: 4rem;\r\n  background-color: #01395e;\r\n  color: #fff;\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  padding: 0 2rem;\r\n  text-align: center;\r\n  border-radius: 20px 20px 0 0;\r\n}\r\n\r\n.month i {\r\n  font-size: 2.5rem;\r\n  cursor: pointer;\r\n}\r\n\r\n.month h1 {\r\n  line-height: 4rem;\r\n  font-size: 1.7rem;\r\n  font-weight: 400;\r\n  text-transform: uppercase;\r\n  letter-spacing: 0.2rem;\r\n}\r\n\r\n.weekdays {\r\n  width: 100%;\r\n  height: 4rem;\r\n  padding: 0 0.4rem;\r\n  display: flex;\r\n  align-items: center;\r\n}\r\n\r\n.weekdays div {\r\n  font-size: 1.4rem;\r\n  font-weight: 400;\r\n  letter-spacing: 0.1rem;\r\n  width: calc((86vw - 42px) / 7);\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n\r\n.days {\r\n  width: 100%;\r\n  display: flex;\r\n  flex-wrap: wrap;\r\n  justify-content: center;\r\n  padding: 0.2rem;\r\n}\r\n\r\n.days div {\r\n  font-size: 1.3rem;\r\n  margin: calc(1vw / 14);\r\n  width: calc((86vw - 54px) / 7);\r\n  height: calc((366px - 36px - 10px - 8rem) / 6);\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n  transition: background-color 0.2s;\r\n}\r\n\r\n.days div:hover:not(.prev-date):not(.next-date):not(.past-days), .days .chosen {\r\n  background-color: #01395e;\r\n  cursor: pointer;\r\n  color: #fff;\r\n}\r\n\r\n.prev-date,\r\n.next-date {\r\n  opacity: 0;\r\n}\r\n\r\n.past-days {\r\n  color: #bbb;\r\n}\r\n/* calendar end*/\r\n\r\n.passengers-container {\r\n  margin: 15px 0;\r\n  display: grid;\r\n  grid-template-columns: 1fr repeat(3, 15%);\r\n  grid-column-gap: 0px;\r\n  grid-row-gap: 10px;\r\n  font-size: 1.7rem\r\n}\r\n\r\n.passengers-container>* {\r\n  align-self: center\r\n}\r\n\r\n.passenger-type-info {\r\n  font-size: 1.2rem;\r\n  color: #777\r\n}\r\n\r\n.passenger-amount, .passenger-sign {\r\n  margin: 0 auto;\r\n  color: #01395e;\r\n}\r\n\r\n.passenger-amount {\r\n  font-size: 2rem;\r\n  font-weight: bold;\r\n}\r\n\r\n.accept-passengers {\r\n  grid-area: 4 / 1 / 5 / 5;\r\n  margin: 15px auto 0;\r\n}\r\n\r\n.weather-pannel {\r\n  top: 410px;\r\n  height: auto;\r\n  padding: 10px 20px;\r\n  display: none;\r\n}\r\n\r\n.weather-pannel div {\r\n  padding: 0 4vw;\r\n  font-size: 1.7rem;\r\n  display: none;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n\r\n.weather-pannel div.origin {\r\n  margin-bottom: 10px;\r\n}\r\n\r\n.weather-pannel img {\r\n  height: 40px;\r\n  width: 40px;\r\n}\r\n\r\n.login-pannel {\r\n  background-color: #01395e;\r\n  display: none;\r\n}\r\n\r\n.form-control>input {\r\n  border: none;\r\n  font-size: 1.7rem;\r\n  font-family: 'Lato', sans-serif;\r\n  width: 100%;\r\n  margin: 5px 0;\r\n  outline: none;\r\n}\r\n\r\n.login-accept {\r\n  margin: 14px auto 0;\r\n  background-color: #206797\r\n}\r\n\r\n.login-error-text {\r\n  margin: 20px auto;\r\n  font-size: 1.6rem;\r\n  color: #ca7641;\r\n  text-align: center;\r\n  display: none;\r\n}\r\n\r\n.sumup-pannel {\r\n  z-index: 10;\r\n  font-size: 1.7rem;\r\n  display: none;\r\n}\r\n\r\n.sumup.pannel-field {\r\n  padding: 10px 4vw;\r\n  display: flex;\r\n  flex-direction: column;\r\n}\r\n\r\nh3.sumup {\r\n  margin: 6px 0;\r\n}\r\n\r\np.sumup {\r\n  margin: 3px 0;\r\n}\r\n\r\n.btn.sumup {\r\n  margin: 14px auto 0;\r\n  align-self: center;\r\n}\r\n\r\n.airplane {\r\n  width: 100%;\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  overflow-y: scroll;\r\n  display: none;\r\n}\r\n\r\n#airplane-svg {\r\n  height: 750px;\r\n  width: 100%;\r\n  margin: 0 auto;\r\n}\r\n\r\n.seat:hover {\r\n  cursor: pointer;\r\n}\r\n\r\ninput:-webkit-autofill {\r\n  -webkit-box-shadow: 0 0 0px 1000px #fff inset;\r\n}\r\n\r\ninput.empty:-webkit-autofill {\r\n  -webkit-box-shadow: 0 0 0px 1000px #e9af8b inset;\r\n}\r\n\r\n@media only screen and (max-width: 1400px) and (min-width: 800px) {\r\n  html {\r\n    font-size: 8px;\r\n  }\r\n}\r\n\r\n@media only screen and (min-width: 800px) {\r\n  body {\r\n    height: 100vh;\r\n  }\r\n  nav {\r\n    padding: 2vh 3vw;\r\n  }\r\n\r\n  .logo img {\r\n    height: 60px;\r\n  }\r\n\r\n  .logo h1 {\r\n    font-size: 2.8rem;\r\n  }\r\n\r\n  .btn-login {\r\n    border-radius: 25px;\r\n    width: 150px;\r\n    height: 50px;\r\n    font-size: 2rem;\r\n  }\r\n\r\n  .main-container {\r\n    top: 150px;\r\n  }\r\n\r\n  .wrapper {\r\n    width: 20vw;\r\n    padding: 18px 1.2vw;\r\n    border-radius: 25px;\r\n  }\r\n  \r\n  .pannel-field, .form-control {\r\n    border-radius: 25px;\r\n    padding: 5px 1.8vw;\r\n  }\r\n\r\n  .calendar {\r\n    padding: 0;\r\n    border-radius: 25px;\r\n  }\r\n\r\n  .weekdays div {\r\n    width: calc((20vw - 2.4vw - 2px) / 7);\r\n  }\r\n\r\n  .days div {\r\n    margin: 0.1rem;\r\n    width: calc((20vw - 2.4vw - 2px - 2rem) / 7);\r\n    height: calc((366px - 36px - 16px - 8rem) / 6);\r\n  }\r\n\r\n  .search-pannel {\r\n    left: 0;\r\n  }\r\n\r\n  .options-pannel {\r\n    left: 20.5vw;\r\n  }\r\n\r\n  .weather-pannel div {\r\n    padding: 0 1.2vw;\r\n  }\r\n\r\n  .login-pannel {\r\n    left: 68vw;\r\n  }\r\n\r\n  .sumup-pannel {\r\n    left: 50%;\r\n    transform: translateX(-50%);\r\n  }\r\n\r\n  .sumup.pannel-field {\r\n    padding: 10px 1.8vw;\r\n  }\r\n\r\n  .airplane {\r\n    width: 20vw;\r\n    left: 20.5vw;\r\n    overflow-y: auto;\r\n  }\r\n\r\n  #airplane-svg {\r\n    height: 700px;\r\n  }\r\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 9 */
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),
/* 10 */
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 11 */
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    options = {};
  }

  if (!url) {
    return url;
  }

  url = String(url.__esModule ? url.default : url); // If url is already wrapped in quotes, remove them

  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }

  if (options.hash) {
    url += options.hash;
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }

  return url;
};

/***/ }),
/* 12 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "images/background_image.jpg";

/***/ }),
/* 13 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "images/logo.png";

/***/ }),
/* 14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "images/logo_long.png";

/***/ }),
/* 15 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "images/close.png";

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "/aero/";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			0: 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _images_logo_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(13);
/* harmony import */ var _images_logo_long_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(14);
/* harmony import */ var _images_close_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(15);




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


})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map