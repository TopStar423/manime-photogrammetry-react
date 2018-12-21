module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./pages/test.js":
/*!***********************!*\
  !*** ./pages/test.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Section; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_scroll__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-scroll */ "react-scroll");
/* harmony import */ var react_scroll__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_scroll__WEBPACK_IMPORTED_MODULE_1__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

// React-scroll reference


var styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center'
};

var Section =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Section, _React$Component);

  function Section(props) {
    var _this;

    _classCallCheck(this, Section);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Section).call(this, props));
    _this.scrollToTop = _this.scrollToTop.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(Section, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      react_scroll__WEBPACK_IMPORTED_MODULE_1__["Events"].scrollEvent.register('begin', function () {
        console.log("begin", arguments);
      });
      react_scroll__WEBPACK_IMPORTED_MODULE_1__["Events"].scrollEvent.register('end', function () {
        console.log("end", arguments);
      });
    }
  }, {
    key: "scrollToTop",
    value: function scrollToTop() {
      react_scroll__WEBPACK_IMPORTED_MODULE_1__["animateScroll"].scrollToTop();
    }
  }, {
    key: "scrollTo",
    value: function scrollTo() {
      react_scroll__WEBPACK_IMPORTED_MODULE_1__["scroller"].scrollTo('scroll-to-element', {
        duration: 800,
        delay: 0,
        smooth: 'easeInOutQuart'
      });
    }
  }, {
    key: "scrollToWithContainer",
    value: function scrollToWithContainer() {
      var goToContainer = new Promise(function (resolve, reject) {
        react_scroll__WEBPACK_IMPORTED_MODULE_1__["Events"].scrollEvent.register('end', function () {
          resolve();
          react_scroll__WEBPACK_IMPORTED_MODULE_1__["Events"].scrollEvent.remove('end');
        });
        react_scroll__WEBPACK_IMPORTED_MODULE_1__["scroller"].scrollTo('scroll-container', {
          duration: 800,
          delay: 0,
          smooth: 'easeInOutQuart'
        });
      });
      goToContainer.then(function () {
        return react_scroll__WEBPACK_IMPORTED_MODULE_1__["scroller"].scrollTo('scroll-container-second-element', {
          duration: 800,
          delay: 0,
          smooth: 'easeInOutQuart',
          containerId: 'scroll-container'
        });
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      react_scroll__WEBPACK_IMPORTED_MODULE_1__["Events"].scrollEvent.remove('begin');
      react_scroll__WEBPACK_IMPORTED_MODULE_1__["Events"].scrollEvent.remove('end');
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("nav", {
        className: "navbar navbar-default navbar-fixed-top"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "container-fluid"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "collapse navbar-collapse",
        id: "bs-example-navbar-collapse-1"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
        className: "nav navbar-nav"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_scroll__WEBPACK_IMPORTED_MODULE_1__["Link"], {
        activeClass: "active",
        className: "test1",
        to: "test1",
        spy: true,
        smooth: true,
        duration: 500
      }, "Test 1")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_scroll__WEBPACK_IMPORTED_MODULE_1__["Link"], {
        activeClass: "active",
        className: "test2",
        to: "test2",
        spy: true,
        smooth: true,
        duration: 500
      }, "Test 2")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_scroll__WEBPACK_IMPORTED_MODULE_1__["Link"], {
        activeClass: "active",
        className: "test3",
        to: "test3",
        spy: true,
        smooth: true,
        duration: 500
      }, "Test 3")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_scroll__WEBPACK_IMPORTED_MODULE_1__["Link"], {
        activeClass: "active",
        className: "test4",
        to: "test4",
        spy: true,
        smooth: true,
        duration: 500
      }, "Test 4")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_scroll__WEBPACK_IMPORTED_MODULE_1__["Link"], {
        activeClass: "active",
        className: "test5",
        to: "test5",
        spy: true,
        smooth: true,
        duration: 500,
        delay: 1000
      }, "Test 5 ( delay )")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_scroll__WEBPACK_IMPORTED_MODULE_1__["Link"], {
        activeClass: "active",
        className: "test6",
        to: "anchor",
        spy: true,
        smooth: true,
        duration: 500
      }, "Test 6 (anchor)")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, " ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        onClick: function onClick() {
          return react_scroll__WEBPACK_IMPORTED_MODULE_1__["animateScroll"].scrollTo(100);
        }
      }, "Scroll To 100!")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, " ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        onClick: function onClick() {
          return react_scroll__WEBPACK_IMPORTED_MODULE_1__["animateScroll"].scrollToBottom();
        }
      }, "Scroll To Bottom")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, " ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        onClick: function onClick() {
          return react_scroll__WEBPACK_IMPORTED_MODULE_1__["animateScroll"].scrollMore(500);
        }
      }, "Scroll 500 More!")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, " ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        onClick: function onClick() {
          return react_scroll__WEBPACK_IMPORTED_MODULE_1__["animateScroll"].scrollMore(1000, {
            delay: 1500
          });
        }
      }, "Scroll 1000 More! ( delay ) ")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_scroll__WEBPACK_IMPORTED_MODULE_1__["Link"], {
        activeClass: "active",
        className: "test8",
        to: "same",
        spy: true,
        smooth: true,
        duration: 500
      }, "Same target")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_scroll__WEBPACK_IMPORTED_MODULE_1__["Link"], {
        activeClass: "active",
        className: "test9",
        to: "same",
        spy: true,
        smooth: true,
        duration: 500
      }, "Same target")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        className: "test1",
        to: "test1",
        onClick: function onClick() {
          return _this2.scrollTo();
        }
      }, "Scroll to element")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        className: "test1",
        to: "test1",
        onClick: function onClick() {
          return _this2.scrollToWithContainer();
        }
      }, "Scroll to element within container")))))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_scroll__WEBPACK_IMPORTED_MODULE_1__["Element"], {
        name: "test1",
        className: "element"
      }, "test 1"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_scroll__WEBPACK_IMPORTED_MODULE_1__["Element"], {
        name: "test2",
        className: "element"
      }, "test 2"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_scroll__WEBPACK_IMPORTED_MODULE_1__["Element"], {
        name: "test3",
        className: "element"
      }, "test 3"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_scroll__WEBPACK_IMPORTED_MODULE_1__["Element"], {
        name: "test4",
        className: "element"
      }, "test 4"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_scroll__WEBPACK_IMPORTED_MODULE_1__["Element"], {
        name: "test5",
        className: "element"
      }, "test 5"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        id: "anchor",
        className: "element"
      }, "test 6 (anchor)"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_scroll__WEBPACK_IMPORTED_MODULE_1__["Link"], {
        activeClass: "active",
        to: "firstInsideContainer",
        spy: true,
        smooth: true,
        duration: 250,
        containerId: "containerElement",
        style: {
          display: 'inline-block',
          margin: '20px'
        }
      }, "Go to first element inside container"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_scroll__WEBPACK_IMPORTED_MODULE_1__["Link"], {
        activeClass: "active",
        to: "secondInsideContainer",
        spy: true,
        smooth: true,
        duration: 250,
        containerId: "containerElement",
        style: {
          display: 'inline-block',
          margin: '20px'
        }
      }, "Go to second element inside container"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_scroll__WEBPACK_IMPORTED_MODULE_1__["Element"], {
        name: "test7",
        className: "element",
        id: "containerElement",
        style: {
          position: 'relative',
          height: '200px',
          overflow: 'scroll',
          marginBottom: '100px'
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_scroll__WEBPACK_IMPORTED_MODULE_1__["Element"], {
        name: "firstInsideContainer",
        style: {
          marginBottom: '200px'
        }
      }, "first element inside container"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_scroll__WEBPACK_IMPORTED_MODULE_1__["Element"], {
        name: "secondInsideContainer",
        style: {
          marginBottom: '200px'
        }
      }, "second element inside container")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_scroll__WEBPACK_IMPORTED_MODULE_1__["Element"], {
        id: "same",
        className: "element"
      }, "Two links point to this"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_scroll__WEBPACK_IMPORTED_MODULE_1__["Element"], {
        name: "scroll-to-element",
        className: "element"
      }, "Scroll to element"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_scroll__WEBPACK_IMPORTED_MODULE_1__["Element"], {
        className: "element",
        id: "scroll-container",
        style: {
          position: 'relative',
          height: '200px',
          overflow: 'scroll',
          marginBottom: '100px'
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_scroll__WEBPACK_IMPORTED_MODULE_1__["Element"], {
        name: "scroll-container-first-element",
        style: {
          marginBottom: '200px'
        }
      }, "first element inside container"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_scroll__WEBPACK_IMPORTED_MODULE_1__["Element"], {
        name: "scroll-container-second-element",
        style: {
          marginBottom: '200px'
        }
      }, "second element inside container")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        onClick: this.scrollToTop
      }, "To the top!"));
    }
  }]);

  return Section;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);


;

/***/ }),

/***/ 5:
/*!*****************************!*\
  !*** multi ./pages/test.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./pages/test.js */"./pages/test.js");


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react-scroll":
/*!*******************************!*\
  !*** external "react-scroll" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-scroll");

/***/ })

/******/ });
//# sourceMappingURL=test.js.map