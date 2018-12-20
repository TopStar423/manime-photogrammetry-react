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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./components/Aws.js":
/*!***************************!*\
  !*** ./components/Aws.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var aws_amplify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aws-amplify */ "aws-amplify");
/* harmony import */ var aws_amplify__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(aws_amplify__WEBPACK_IMPORTED_MODULE_0__);

aws_amplify__WEBPACK_IMPORTED_MODULE_0___default.a.configure({
  Auth: {
    // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
    identityPoolId: 'us-west-2:821b6b82-5993-4344-9128-b335590b8e83',
    // REQUIRED - Amazon Cognito Region
    region: 'us-west-2',
    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: 'us-west-2_bJo7xSO7y',
    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: '3rqrh33m3v3clqntomkpil81h6',
    // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
    mandatorySignIn: false
  },
  Storage: {
    bucket: 'mani-me-react-native-userfiles-1',
    region: 'us-west-1'
  },
  API: {
    endpoints: [{
      name: "LambdaDDB",
      endpoint: "https://9r8dtkpky7.execute-api.us-west-1.amazonaws.com/default",
      service: "lambda",
      region: "us-west-1"
    }, {
      name: "LambdaPayment",
      endpoint: "https://d1d6vzzpgk.execute-api.us-west-1.amazonaws.com/Live",
      service: "lambda",
      region: "us-west-1"
    }, {
      name: "LambdaRDS",
      endpoint: "https://2ehwnnicy0.execute-api.us-west-1.amazonaws.com/default",
      service: "lambda",
      region: "us-west-1"
    }]
  }
});
/* harmony default export */ __webpack_exports__["default"] = (aws_amplify__WEBPACK_IMPORTED_MODULE_0___default.a);

/***/ }),

/***/ "./components/BoardBody.js":
/*!*********************************!*\
  !*** ./components/BoardBody.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_theme__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/theme */ "./utils/theme.js");
/* harmony import */ var _Row__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Row */ "./components/Row.js");
/* harmony import */ var aws_amplify__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! aws-amplify */ "aws-amplify");
/* harmony import */ var aws_amplify__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(aws_amplify__WEBPACK_IMPORTED_MODULE_4__);


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






var BoardJsx =
/*#__PURE__*/
function (_React$Component) {
  _inherits(BoardJsx, _React$Component);

  function BoardJsx(props) {
    var _this;

    _classCallCheck(this, BoardJsx);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BoardJsx).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getOrders", function (groupOrderId) {
      var userInit = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      aws_amplify__WEBPACK_IMPORTED_MODULE_4__["API"].get('LambdaRDS', "/orders/read/".concat(groupOrderId), userInit).then(function (ordersResponse) {
        if (ordersResponse && ordersResponse.rows) {
          _this.setState({
            orders: ordersResponse.rows
          });

          console.log(ordersResponse.rows);
        }
      }).catch(function (err) {
        console.log(err.stack);
      });
    });

    _this.state = {
      orders: []
    };
    return _this;
  }

  _createClass(BoardJsx, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.getOrders('c7938ff0-f832-11e8-ae6e-ff8724e0fb43');
    }
  }, {
    key: "render",
    // comments: ""
    // datecreated: "2018-11-05T02:09:21.000Z"
    // deliverydate: "2004-10-19T08:23:54.000Z"
    // discount: 0
    // grouporderid: "c7938ff0-f832-11e8-ae6e-ff8724e0fb43"
    // listedprice: 0
    // naillength: "2MM"
    // nailproductid: "1"
    // nailshape: "BALLERINA"
    // orderid: "c7ceeb40-f832-11e8-ae6e-ff8724e0fb43"
    // orderstatus: "Order Received"
    // userid: null
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, this.state.orders.map(function (order) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Row__WEBPACK_IMPORTED_MODULE_3__["default"], {
          key: order.orderid
        }, order.orderid);
      }));
    }
  }]);

  return BoardJsx;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

;
/* harmony default export */ __webpack_exports__["default"] = (BoardJsx);

/***/ }),

/***/ "./components/Layout.js":
/*!******************************!*\
  !*** ./components/Layout.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_system__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-system */ "styled-system");
/* harmony import */ var styled_system__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_system__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils_theme__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/theme */ "./utils/theme.js");
/* harmony import */ var _Sidebar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Sidebar */ "./components/Sidebar.js");


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }





var Container = styled_components__WEBPACK_IMPORTED_MODULE_2___default.a.div.withConfig({
  displayName: "Layout__Container",
  componentId: "sc-1ln4gt-0"
})(["display:flex;flex-direction:row;margin:0;padding:0;height:", "px;"], function (props) {
  return props.height;
});
var Box = styled_components__WEBPACK_IMPORTED_MODULE_2___default.a.div.withConfig({
  displayName: "Layout__Box",
  componentId: "sc-1ln4gt-1"
})(["", " ", " ", " ", " ", " ", " ", " ", " ", " ", " position:", ";"], styled_system__WEBPACK_IMPORTED_MODULE_1__["space"], styled_system__WEBPACK_IMPORTED_MODULE_1__["width"], styled_system__WEBPACK_IMPORTED_MODULE_1__["fontSize"], styled_system__WEBPACK_IMPORTED_MODULE_1__["color"], styled_system__WEBPACK_IMPORTED_MODULE_1__["height"], styled_system__WEBPACK_IMPORTED_MODULE_1__["justifyContent"], styled_system__WEBPACK_IMPORTED_MODULE_1__["display"], styled_system__WEBPACK_IMPORTED_MODULE_1__["alignItems"], styled_system__WEBPACK_IMPORTED_MODULE_1__["fontFamily"], styled_system__WEBPACK_IMPORTED_MODULE_1__["fontWeight"], function (props) {
  return props.position;
});
var MenuItem = styled_components__WEBPACK_IMPORTED_MODULE_2___default()(Box).withConfig({
  displayName: "Layout__MenuItem",
  componentId: "sc-1ln4gt-2"
})(["font-family:sans-serif;font-weight:200;background:transparent;&:hover{background:rgba(255,255,255,.1);}"]);
var Header = styled_components__WEBPACK_IMPORTED_MODULE_2___default()(Box).withConfig({
  displayName: "Layout__Header",
  componentId: "sc-1ln4gt-3"
})(["box-shadow:0 1px 3px 0 rgba(0,0,0,0.15);"]); // const LayoutJsx = ({ before, ...props }) => (
//   <ThemeProvider theme={theme}>
//     <Container>
//       { !before &&
//         <Box width={1/5} height={1}>
//           Sidemenu
//         </Box>
//       }
//       <Box width={1}>
//         <Box width={1} bg='blacks.7' color='white' height={2} display='flex' alignItems='center'>
//           Orders
//         </Box>
//         {props.children}
//       </Box>
//     </Container>
//   </ThemeProvider>
// );

var Layout =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Layout, _React$Component);

  function Layout(props) {
    var _this;

    _classCallCheck(this, Layout);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Layout).call(this, props));
    _this.state = {
      width: 0,
      height: 0
    };
    _this.updateWindowDimensions = _this.updateWindowDimensions.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(Layout, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.updateWindowDimensions();
      window.addEventListener('resize', this.updateWindowDimensions);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this.updateWindowDimensions);
    }
  }, {
    key: "updateWindowDimensions",
    value: function updateWindowDimensions() {
      this.setState({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          before = _this$props.before,
          props = _objectWithoutProperties(_this$props, ["before"]);

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(styled_components__WEBPACK_IMPORTED_MODULE_2__["ThemeProvider"], {
        theme: _utils_theme__WEBPACK_IMPORTED_MODULE_3__["theme"]
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Container, {
        height: this.state.height
      }, !before && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Box, {
        width: 1 / 4,
        py: 2,
        height: "100%",
        bg: "blacks.11"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(MenuItem, {
        py: 1,
        px: 3,
        color: "whites.11",
        fontSize: 1
      }, "ORDERS"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(MenuItem, {
        py: 1,
        px: 3,
        color: "whites.11",
        fontSize: 1
      }, "NAIL PRODUCTS"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(MenuItem, {
        py: 1,
        px: 3,
        color: "whites.11",
        fontSize: 1
      }, "NAIL CATEGORIES"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(MenuItem, {
        py: 1,
        px: 3,
        color: "whites.11",
        fontSize: 1
      }, "GROUP ORDERS"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(MenuItem, {
        py: 1,
        px: 3,
        color: "whites.11",
        fontSize: 1
      }, "ORDER REVIEWS")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Box, {
        width: 1,
        height: "100%",
        bg: "whites.7"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Header, {
        width: 1,
        bg: "whites.9",
        color: "blacks.2",
        height: 2,
        display: "flex",
        alignItems: "center"
      }), props.children)));
    }
  }]);

  return Layout;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (Layout);

/***/ }),

/***/ "./components/Row.js":
/*!***************************!*\
  !*** ./components/Row.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_system__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-system */ "styled-system");
/* harmony import */ var styled_system__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_system__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils_theme__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/theme */ "./utils/theme.js");


function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }




var Box = styled_components__WEBPACK_IMPORTED_MODULE_2___default.a.div.withConfig({
  displayName: "Row__Box",
  componentId: "sc-8qukng-0"
})(["", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " position:", ";"], styled_system__WEBPACK_IMPORTED_MODULE_1__["space"], styled_system__WEBPACK_IMPORTED_MODULE_1__["width"], styled_system__WEBPACK_IMPORTED_MODULE_1__["fontSize"], styled_system__WEBPACK_IMPORTED_MODULE_1__["color"], styled_system__WEBPACK_IMPORTED_MODULE_1__["height"], styled_system__WEBPACK_IMPORTED_MODULE_1__["justifyContent"], styled_system__WEBPACK_IMPORTED_MODULE_1__["display"], styled_system__WEBPACK_IMPORTED_MODULE_1__["alignItems"], styled_system__WEBPACK_IMPORTED_MODULE_1__["fontFamily"], styled_system__WEBPACK_IMPORTED_MODULE_1__["fontWeight"], styled_system__WEBPACK_IMPORTED_MODULE_1__["boxShadow"], function (props) {
  return props.position;
});
var Row = styled_components__WEBPACK_IMPORTED_MODULE_2___default()(Box).withConfig({
  displayName: "Row",
  componentId: "sc-8qukng-1"
})(["display:flex;align-items:center;font-family:sans-serif;font-weight:200;background:transparent;&:hover{background:rgba(255,255,255,.1);}"]);

var RowJsx = function RowJsx(_ref) {
  var before = _ref.before,
      props = _objectWithoutProperties(_ref, ["before"]);

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Row, {
    fontSize: 2,
    p: 2,
    m: 3,
    boxShadow: 1,
    height: 1
  }, props.children);
};

/* harmony default export */ __webpack_exports__["default"] = (RowJsx);

/***/ }),

/***/ "./components/Sidebar.js":
/*!*******************************!*\
  !*** ./components/Sidebar.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ "next/link");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);



var Sidebar = function Sidebar() {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_1___default.a, {
    href: "/"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", null, "Home")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_1___default.a, {
    href: "/about"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", null, "About")));
};

/* harmony default export */ __webpack_exports__["default"] = (Sidebar);

/***/ }),

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/link */ "next/link");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_Layout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/Layout */ "./components/Layout.js");
/* harmony import */ var isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! isomorphic-unfetch */ "isomorphic-unfetch");
/* harmony import */ var isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _components_Aws__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/Aws */ "./components/Aws.js");
/* harmony import */ var _components_BoardBody__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/BoardBody */ "./components/BoardBody.js");



function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }




 // import { withAuthenticator } from 'aws-amplify-react';



var PostLink = function PostLink(props) {
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_2___default.a, {
    as: "/p/".concat(props.id),
    href: "/post?title=".concat(props.title)
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", null, props.title)));
};

var Index = function Index(props) {
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_Layout__WEBPACK_IMPORTED_MODULE_3__["default"], {
    before: false
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_BoardBody__WEBPACK_IMPORTED_MODULE_6__["default"], null));
}; // <p>Index</p>
// <ul>
//   <PostLink id="hello" title="Hello"/>
//   <PostLink id="learn" title="Learn"/>
//   <PostLink id="deploy" title="Deploy"/>
// </ul>
// <h1>Shows</h1>
// <ul>
//   {props.shows.map(({show}) => (
//     <li key={show.id}>
//       <Link as={`/p/${show.id}`} href={`/post?id=${show.id}`}>
//         <a>{show.name}</a>
//       </Link>
//     </li>
//   ))}
// </ul>


Index.getInitialProps =
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
  var res, data;
  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_4___default()('https://api.tvmaze.com/search/shows?q=batman');

        case 2:
          res = _context.sent;
          _context.next = 5;
          return res.json();

        case 5:
          data = _context.sent;
          console.log("Show data fetched. Count: ".concat(data.length));
          return _context.abrupt("return", {
            shows: data
          });

        case 8:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, this);
}));
/* harmony default export */ __webpack_exports__["default"] = (Index);

/***/ }),

/***/ "./utils/theme.js":
/*!************************!*\
  !*** ./utils/theme.js ***!
  \************************/
/*! exports provided: theme */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "theme", function() { return theme; });
var theme = {
  breakpoints: [720, 840, 960, 1024, 1280, 1440],
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fontSizes: [8, 10, 12, 14, 16, 20, 24, 36, 48, 80, 96],
  fontWeights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
  lineHeights: {
    solid: 1,
    title: 1.25,
    copy: 1.5
  },
  letterSpacings: {
    normal: 'normal',
    tracked: '0.1em',
    tight: '-0.05em',
    mega: '0.25em'
  },
  fonts: {
    serif: 'athelas, georgia, times, serif',
    sansSerif: '-apple-system, BlinkMacSystemFont, "avenir next", avenir, "helvetica neue", helvetica, ubuntu, roboto, noto, "segoe ui", arial, sans-serif'
  },
  borders: [0, '1px solid', '2px solid', '4px solid', '8px solid', '16px solid', '32px solid'],
  radii: [0, 2, 4, 16, 9999, '100%'],
  width: [16, 32, 64, 128, 256],
  heights: [16, 32, 64, 128, 256],
  maxWidths: [16, 32, 64, 128, 256, 512, 768, 1024, 1536],
  colors: {
    black: '#000',
    'near-black': '#111',
    'dark-gray': '#333',
    'mid-gray': '#555',
    gray: ' #777',
    silver: '#999',
    'light-silver': '#aaa',
    'moon-gray': '#ccc',
    'light-gray': '#eee',
    'near-white': '#f4f4f4',
    white: '#fff',
    transparent: 'transparent',
    blacks: ['rgba(0,0,0,.0125)', 'rgba(0,0,0,.025)', 'rgba(0,0,0,.05)', 'rgba(0,0,0,.1)', 'rgba(0,0,0,.2)', 'rgba(0,0,0,.3)', 'rgba(0,0,0,.4)', 'rgba(0,0,0,.5)', 'rgba(0,0,0,.6)', 'rgba(0,0,0,.7)', 'rgba(0,0,0,.8)', 'rgba(0,0,0,.9)'],
    whites: ['rgba(255,255,255,.0125)', 'rgba(255,255,255,.025)', 'rgba(255,255,255,.05)', 'rgba(255,255,255,.1)', 'rgba(255,255,255,.2)', 'rgba(255,255,255,.3)', 'rgba(255,255,255,.4)', 'rgba(255,255,255,.5)', 'rgba(255,255,255,.6)', 'rgba(255,255,255,.7)', 'rgba(255,255,255,.8)', 'rgba(255,255,255,.9)']
  },
  shadows: ['0 1px 3px 0 rgba(0,0,0,0.05)', '0 1px 3px 0 rgba(0,0,0,0.10)', '0 1px 3px 0 rgba(0,0,0,0.15)', '0 1px 3px 0 rgba(0,0,0,0.20)']
};

/***/ }),

/***/ 3:
/*!******************************!*\
  !*** multi ./pages/index.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./pages/index.js */"./pages/index.js");


/***/ }),

/***/ "@babel/runtime/regenerator":
/*!*********************************************!*\
  !*** external "@babel/runtime/regenerator" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/regenerator");

/***/ }),

/***/ "aws-amplify":
/*!******************************!*\
  !*** external "aws-amplify" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("aws-amplify");

/***/ }),

/***/ "isomorphic-unfetch":
/*!*************************************!*\
  !*** external "isomorphic-unfetch" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("isomorphic-unfetch");

/***/ }),

/***/ "next/link":
/*!****************************!*\
  !*** external "next/link" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next/link");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "styled-components":
/*!************************************!*\
  !*** external "styled-components" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("styled-components");

/***/ }),

/***/ "styled-system":
/*!********************************!*\
  !*** external "styled-system" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("styled-system");

/***/ })

/******/ });
//# sourceMappingURL=index.js.map