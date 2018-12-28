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
    }, {
      name: "LambdaRDSClient",
      endpoint: "https://2ehwnnicy0.execute-api.us-west-1.amazonaws.com/development",
      service: "lambda",
      region: "us-west-1"
    }, {
      name: "LambdaRDSClientNoncritical",
      endpoint: "https://seet0wnvr7.execute-api.us-west-1.amazonaws.com/default",
      service: "lambda",
      region: "us-west-1"
    }, {
      name: "LambdaRDSCompany",
      endpoint: "https://bems9o4jfe.execute-api.us-west-1.amazonaws.com/default",
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
/* harmony import */ var _Box__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Box */ "./components/Box.js");
/* harmony import */ var _Row__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Row */ "./components/Row.js");
/* harmony import */ var aws_amplify__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! aws-amplify */ "aws-amplify");
/* harmony import */ var aws_amplify__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(aws_amplify__WEBPACK_IMPORTED_MODULE_5__);


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






var ORDERS_COLUMN_DESCRIPTION = ['Order ID', 'Group Order ID', 'Nail Product ID', 'Nail Length', 'Nail Shape', 'Order Status', 'Date Created'];
var GROUP_ORDERS_COLUMN_DESCRIPTION = ['Group Order ID', 'User ID', 'Group Order Status', 'Insurance', 'Shipping Address', 'Subtotal', 'Taxes'];
var USERS_COLUMN_DESCRIPTION = ['User ID', 'First Name', 'Last Name', 'Email', 'Total Orders', 'Fitted', 'Date Created', 'Date Last Login', 'Description', 'Subscription'];
var ORDER_REVIEWS_COLUMN_DESCRIPTION = ['Review ID', 'Order ID', 'Finger Name', 'Review Description', 'Category 1', 'Category 2', 'Category 3'];
var SHIPPING_ADDRESSES_COLUMN_DESCRIPTION = ['Shipping Address ID', 'User ID', 'Name', 'Address Line 1', 'Address Line 2', 'City', 'Zip Code', 'State', 'Country', 'Latitude', 'Longitude'];
var PAYMENTS_COLUMN_DESCRIPTION = ['Payment ID', 'User ID', 'Name', 'Last 4', 'Refunded', 'Paid', 'Address Line 1', 'Address Line 2', 'City', 'Zip Code', 'State', 'Country'];
var DESIGNERS_COLUMN_DESCRIPTION = ['Designer ID', 'First Name', 'Last Name', 'Total Reviews', 'Total Designs', 'Profile Picture', 'Description', 'Location', 'Url 1', 'Url 2', 'Url 3', 'Url 4', 'Url 5', 'Url 6'];
var NAIL_PRODUCTS_COLUMN_DESCRIPTION = ['Nail Product ID', 'Date Created', 'Description', 'Designer ID', 'Name', 'Price', 'Total Hates', 'Total Likes', 'Total Manime', 'Total Purchases', 'Visible', 'Pic Url 1', 'Pic Url 2', 'Pic Url 3', 'Pic Url 4', 'Pic Url 5'];
var NAIL_CATEGORIES_COLUMN_DESCRIPTION = ['Category ID', 'Category Name'];
var NAIL_PRODUCT_CATEGORIES_COLUMN_DESCRIPTION = ['Nail Product ID', 'Category ID'];
var ORDERS_COLUMN_PROPERTIES = ['orderid', 'grouporderid', 'nailproductid', 'naillength', 'nailshape', 'orderstatus', 'datecreated'];
var BoardBody = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.div.withConfig({
  displayName: "BoardBody",
  componentId: "sc-1mlz8qv-0"
})(["display:flex;flex:1 0 auto;flex-direction:column;overflow-x:auto;background-color:#fafafa;"]); // BoardBodyContents needs table prop

var BoardBodyContainer = styled_components__WEBPACK_IMPORTED_MODULE_1___default()(_Box__WEBPACK_IMPORTED_MODULE_3__["default"]).withConfig({
  displayName: "BoardBody__BoardBodyContainer",
  componentId: "sc-1mlz8qv-1"
})(["display:flex;flex-direction:column;flex:1 0 100%;width:", "px;background-color:transparent;"], function (props) {
  var numColumns = props.table.length;
  var width = props.theme.space[_Row__WEBPACK_IMPORTED_MODULE_4__["MX_ROW"]] * 2 + (props.theme.space[_Row__WEBPACK_IMPORTED_MODULE_4__["ML_ROW_ITEM"]] + _Row__WEBPACK_IMPORTED_MODULE_4__["ROW_ITEM_WIDTH"]) * numColumns;
  return width;
});
var BoardBodyContents = styled_components__WEBPACK_IMPORTED_MODULE_1___default()(_Box__WEBPACK_IMPORTED_MODULE_3__["default"]).withConfig({
  displayName: "BoardBody__BoardBodyContents",
  componentId: "sc-1mlz8qv-2"
})(["display:flex;flex-direction:column;flex:1 0 auto;height:1px;min-height:1px;overflow-y:auto;overflow-x:hidden;width:100%;"]);

var BoardJsx =
/*#__PURE__*/
function (_React$Component) {
  _inherits(BoardJsx, _React$Component);

  function BoardJsx(props) {
    var _this;

    _classCallCheck(this, BoardJsx);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BoardJsx).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getEndpoint", function (id) {
      var endpoint = 'LambdaRDSCompany';
      if (id == 'orders' || id == 'grouporders' || id == 'users') endpoint = 'LambdaRDSClient';else if (id == 'shippingaddresses' || id == 'revieworders' || id == 'payments') endpoint = 'LambdaRDSClientNoncritical';
      return endpoint;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getData", function (endpoint, tableName) {
      var userInit = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      aws_amplify__WEBPACK_IMPORTED_MODULE_5__["API"].get(endpoint, "/".concat(tableName, "/read"), userInit).then(function (ordersResponse) {
        if (ordersResponse && ordersResponse.rows && _this._mounted) {
          _this.setState({
            orders: ordersResponse.rows
          });

          console.log(ordersResponse.rows);
        }
      }).catch(function (err) {
        console.log(err.stack);
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "selectField", function (index) {
      _this.setState({
        selectedField: index
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "updateField", function (index, propertyName, propertyValue) {
      var _orders = _this.state.orders;
      _orders[index][propertyName] = propertyValue;

      _this.setState({
        orders: _orders
      });
    });

    _this.state = {
      orders: [],
      numColumns: 0,
      selectedField: -1
    };
    return _this;
  }

  _createClass(BoardJsx, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._mounted = true;
      var endpoint = this.getEndpoint(this.props.id);
      this.getData(endpoint, this.props.id);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.props.id !== prevProps.id) {
        var endpoint = this.getEndpoint(this.props.id);
        this.getData(endpoint, this.props.id);
        this.selectField(-1);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._mounted = false;
    }
  }, {
    key: "render",
    // this.updateField(i, 'orderid', 'TEST')
    value: function render() {
      var _this2 = this;

      var table = this.props.id == 'orders' ? ORDERS_COLUMN_DESCRIPTION : this.props.id == 'grouporders' ? GROUP_ORDERS_COLUMN_DESCRIPTION : this.props.id == 'users' ? USERS_COLUMN_DESCRIPTION : this.props.id == 'revieworders' ? ORDER_REVIEWS_COLUMN_DESCRIPTION : this.props.id == 'shippingaddresses' ? SHIPPING_ADDRESSES_COLUMN_DESCRIPTION : this.props.id == 'payments' ? PAYMENTS_COLUMN_DESCRIPTION : this.props.id == 'designers' ? DESIGNERS_COLUMN_DESCRIPTION : this.props.id == 'nailproducts' ? NAIL_PRODUCTS_COLUMN_DESCRIPTION : this.props.id == 'categories' ? NAIL_CATEGORIES_COLUMN_DESCRIPTION : this.props.id == 'nailproductstocategory' ? NAIL_PRODUCT_CATEGORIES_COLUMN_DESCRIPTION : [];
      var tableProps = ORDERS_COLUMN_PROPERTIES;
      var data = this.state.orders;
      var numAttr = table.length; // <RowItem onClick={() => this.selectField((i*numAttr)+1)}>{item.grouporderid}</RowItem>
      // <RowItem onClick={() => this.selectField((i*numAttr)+2)}>{item.nailproductid}</RowItem>
      // <RowItem onClick={() => this.selectField((i*numAttr)+3)} selected={this.state.selectedField == (i*numAttr) + 3 ? true : false}>{item.naillength}</RowItem>
      // <RowItem onClick={() => this.selectField((i*numAttr)+4)} selected={this.state.selectedField == (i*numAttr) + 4 ? true : false}>{item.nailshape}</RowItem>
      // <RowItem onClick={() => this.selectField((i*numAttr)+5)} selected={this.state.selectedField == (i*numAttr) + 5 ? true : false}>{item.orderstatus}</RowItem>
      // <RowItem onClick={() => this.selectField((i*numAttr)+6)} selected={this.state.selectedField == (i*numAttr) + 6 ? true : false}>{item.datecreated}</RowItem>

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(BoardBody, {
        width: 1
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(BoardBodyContainer, {
        table: table
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Row__WEBPACK_IMPORTED_MODULE_4__["RowJsx"], {
        table: table,
        description: true
      }, table.map(function (item) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Row__WEBPACK_IMPORTED_MODULE_4__["RowItemJsx"], null, item);
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(BoardBodyContents, null, this.props.id == 'orders' && data.map(function (item, i) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Row__WEBPACK_IMPORTED_MODULE_4__["RowJsx"], {
          table: table
        }, tableProps.map(function (rowItem, j) {
          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Row__WEBPACK_IMPORTED_MODULE_4__["RowItemJsx"], {
            i: i * numAttr + j,
            propertyName: ORDERS_COLUMN_PROPERTIES[j],
            updateField: _this2.updateField,
            onClick: function onClick() {
              return _this2.selectField(i * numAttr + j);
            },
            selected: _this2.state.selectedField == i * numAttr + j ? true : false
          }, item[ORDERS_COLUMN_PROPERTIES[j]]);
        }));
      }), this.props.id == 'grouporders' && data.map(function (item, i) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Row__WEBPACK_IMPORTED_MODULE_4__["RowJsx"], {
          table: table
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Row__WEBPACK_IMPORTED_MODULE_4__["RowItemJsx"], {
          onClick: function onClick() {
            return _this2.selectField(i * numAttr + 0);
          }
        }, item.grouporderid), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Row__WEBPACK_IMPORTED_MODULE_4__["RowItemJsx"], {
          onClick: function onClick() {
            return _this2.selectField(i * numAttr + 1);
          }
        }, item.userid), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Row__WEBPACK_IMPORTED_MODULE_4__["RowItemJsx"], {
          onClick: function onClick() {
            return _this2.selectField(i * numAttr + 2);
          },
          selected: _this2.state.selectedField == i * numAttr + 2 ? true : false
        }, item.grouporderstatus), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Row__WEBPACK_IMPORTED_MODULE_4__["RowItemJsx"], {
          onClick: function onClick() {
            return _this2.selectField(i * numAttr + 3);
          },
          selected: _this2.state.selectedField == i * numAttr + 3 ? true : false
        }, item.insurance), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Row__WEBPACK_IMPORTED_MODULE_4__["RowItemJsx"], {
          onClick: function onClick() {
            return _this2.selectField(i * numAttr + 4);
          },
          selected: _this2.state.selectedField == i * numAttr + 4 ? true : false
        }, item.shippingaddress), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Row__WEBPACK_IMPORTED_MODULE_4__["RowItemJsx"], {
          onClick: function onClick() {
            return _this2.selectField(i * numAttr + 5);
          },
          selected: _this2.state.selectedField == i * numAttr + 5 ? true : false
        }, item.subtotal), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Row__WEBPACK_IMPORTED_MODULE_4__["RowItemJsx"], {
          onClick: function onClick() {
            return _this2.selectField(i * numAttr + 6);
          },
          selected: _this2.state.selectedField == i * numAttr + 6 ? true : false
        }, item.taxes));
      }), this.props.id == 'users' && data.map(function (item, i) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Row__WEBPACK_IMPORTED_MODULE_4__["RowJsx"], {
          table: table
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Row__WEBPACK_IMPORTED_MODULE_4__["RowItemJsx"], {
          onClick: function onClick() {
            return _this2.selectField(i * numAttr + 0);
          }
        }, item.userid), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Row__WEBPACK_IMPORTED_MODULE_4__["RowItemJsx"], {
          onClick: function onClick() {
            return _this2.selectField(i * numAttr + 1);
          },
          selected: _this2.state.selectedField == i * numAttr + 1 ? true : false
        }, item.firstname), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Row__WEBPACK_IMPORTED_MODULE_4__["RowItemJsx"], {
          onClick: function onClick() {
            return _this2.selectField(i * numAttr + 2);
          },
          selected: _this2.state.selectedField == i * numAttr + 2 ? true : false
        }, item.lastname), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Row__WEBPACK_IMPORTED_MODULE_4__["RowItemJsx"], {
          onClick: function onClick() {
            return _this2.selectField(i * numAttr + 3);
          },
          selected: _this2.state.selectedField == i * numAttr + 3 ? true : false
        }, item.email), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Row__WEBPACK_IMPORTED_MODULE_4__["RowItemJsx"], {
          onClick: function onClick() {
            return _this2.selectField(i * numAttr + 4);
          },
          selected: _this2.state.selectedField == i * numAttr + 4 ? true : false
        }, item.totalorders), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Row__WEBPACK_IMPORTED_MODULE_4__["RowItemJsx"], {
          onClick: function onClick() {
            return _this2.selectField(i * numAttr + 5);
          },
          selected: _this2.state.selectedField == i * numAttr + 5 ? true : false
        }, item.fitted ? 'Fitted' : 'Not Fitted'), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Row__WEBPACK_IMPORTED_MODULE_4__["RowItemJsx"], {
          onClick: function onClick() {
            return _this2.selectField(i * numAttr + 6);
          },
          selected: _this2.state.selectedField == i * numAttr + 6 ? true : false
        }, item.datecreated), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Row__WEBPACK_IMPORTED_MODULE_4__["RowItemJsx"], {
          onClick: function onClick() {
            return _this2.selectField(i * numAttr + 7);
          },
          selected: _this2.state.selectedField == i * numAttr + 7 ? true : false
        }, item.datelastlogin), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Row__WEBPACK_IMPORTED_MODULE_4__["RowItemJsx"], {
          onClick: function onClick() {
            return _this2.selectField(i * numAttr + 8);
          },
          selected: _this2.state.selectedField == i * numAttr + 8 ? true : false
        }, item.description), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Row__WEBPACK_IMPORTED_MODULE_4__["RowItemJsx"], {
          onClick: function onClick() {
            return _this2.selectField(i * numAttr + 9);
          },
          selected: _this2.state.selectedField == i * numAttr + 9 ? true : false
        }, item.subscription));
      }), this.props.id == 'revieworders' && data.map(function (item, i) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Row__WEBPACK_IMPORTED_MODULE_4__["RowJsx"], {
          table: table
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Row__WEBPACK_IMPORTED_MODULE_4__["RowItemJsx"], {
          onClick: function onClick() {
            return _this2.selectField(i * numAttr + 0);
          }
        }, item.reviewid), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Row__WEBPACK_IMPORTED_MODULE_4__["RowItemJsx"], {
          onClick: function onClick() {
            return _this2.selectField(i * numAttr + 1);
          }
        }, item.orderid), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Row__WEBPACK_IMPORTED_MODULE_4__["RowItemJsx"], {
          onClick: function onClick() {
            return _this2.selectField(i * numAttr + 2);
          },
          selected: _this2.state.selectedField == i * numAttr + 2 ? true : false
        }, item.fingername), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Row__WEBPACK_IMPORTED_MODULE_4__["RowItemJsx"], {
          onClick: function onClick() {
            return _this2.selectField(i * numAttr + 3);
          },
          selected: _this2.state.selectedField == i * numAttr + 3 ? true : false
        }, item.reviewdescription), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Row__WEBPACK_IMPORTED_MODULE_4__["RowItemJsx"], {
          onClick: function onClick() {
            return _this2.selectField(i * numAttr + 4);
          },
          selected: _this2.state.selectedField == i * numAttr + 4 ? true : false
        }, item.category1), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Row__WEBPACK_IMPORTED_MODULE_4__["RowItemJsx"], {
          onClick: function onClick() {
            return _this2.selectField(i * numAttr + 5);
          },
          selected: _this2.state.selectedField == i * numAttr + 5 ? true : false
        }, item.category2), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Row__WEBPACK_IMPORTED_MODULE_4__["RowItemJsx"], {
          onClick: function onClick() {
            return _this2.selectField(i * numAttr + 6);
          },
          selected: _this2.state.selectedField == i * numAttr + 6 ? true : false
        }, item.category3));
      }), this.props.id == 'shippingaddresses' && data.map(function (item, i) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Row__WEBPACK_IMPORTED_MODULE_4__["RowJsx"], {
          table: table
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Row__WEBPACK_IMPORTED_MODULE_4__["RowItemJsx"], {
          onClick: function onClick() {
            return _this2.selectField(i * numAttr + 0);
          }
        }, item.shippingaddressid));
      }), this.props.id == 'payments' && data.map(function (item, i) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Row__WEBPACK_IMPORTED_MODULE_4__["RowJsx"], {
          table: table
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Row__WEBPACK_IMPORTED_MODULE_4__["RowItemJsx"], {
          onClick: function onClick() {
            return _this2.selectField(i * numAttr + 0);
          }
        }, item.paymentid));
      }), this.props.id == 'designers' && data.map(function (item, i) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Row__WEBPACK_IMPORTED_MODULE_4__["RowJsx"], {
          table: table
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Row__WEBPACK_IMPORTED_MODULE_4__["RowItemJsx"], {
          onClick: function onClick() {
            return _this2.selectField(i * numAttr + 0);
          }
        }, item.designerid));
      }), this.props.id == 'nailproducts' && data.map(function (item, i) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Row__WEBPACK_IMPORTED_MODULE_4__["RowJsx"], {
          table: table
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Row__WEBPACK_IMPORTED_MODULE_4__["RowItemJsx"], {
          onClick: function onClick() {
            return _this2.selectField(i * numAttr + 0);
          }
        }, item.nailproductid), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Row__WEBPACK_IMPORTED_MODULE_4__["RowItemJsx"], {
          onClick: function onClick() {
            return _this2.selectField(i * numAttr + 1);
          },
          selected: _this2.state.selectedField == i * numAttr + 1 ? true : false
        }, item.datecreated), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Row__WEBPACK_IMPORTED_MODULE_4__["RowItemJsx"], {
          onClick: function onClick() {
            return _this2.selectField(i * numAttr + 2);
          },
          selected: _this2.state.selectedField == i * numAttr + 2 ? true : false
        }, item.description), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Row__WEBPACK_IMPORTED_MODULE_4__["RowItemJsx"], {
          onClick: function onClick() {
            return _this2.selectField(i * numAttr + 3);
          },
          selected: _this2.state.selectedField == i * numAttr + 3 ? true : false
        }, item.designerid), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Row__WEBPACK_IMPORTED_MODULE_4__["RowItemJsx"], {
          onClick: function onClick() {
            return _this2.selectField(i * numAttr + 4);
          },
          selected: _this2.state.selectedField == i * numAttr + 4 ? true : false
        }, item.name), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Row__WEBPACK_IMPORTED_MODULE_4__["RowItemJsx"], {
          onClick: function onClick() {
            return _this2.selectField(i * numAttr + 5);
          },
          selected: _this2.state.selectedField == i * numAttr + 5 ? true : false
        }, item.price), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Row__WEBPACK_IMPORTED_MODULE_4__["RowItemJsx"], {
          onClick: function onClick() {
            return _this2.selectField(i * numAttr + 6);
          },
          selected: _this2.state.selectedField == i * numAttr + 6 ? true : false
        }, item.totalhates), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Row__WEBPACK_IMPORTED_MODULE_4__["RowItemJsx"], {
          onClick: function onClick() {
            return _this2.selectField(i * numAttr + 7);
          },
          selected: _this2.state.selectedField == i * numAttr + 7 ? true : false
        }, item.totallikes), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Row__WEBPACK_IMPORTED_MODULE_4__["RowItemJsx"], {
          onClick: function onClick() {
            return _this2.selectField(i * numAttr + 8);
          },
          selected: _this2.state.selectedField == i * numAttr + 8 ? true : false
        }, item.totalmanime), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Row__WEBPACK_IMPORTED_MODULE_4__["RowItemJsx"], {
          onClick: function onClick() {
            return _this2.selectField(i * numAttr + 9);
          },
          selected: _this2.state.selectedField == i * numAttr + 9 ? true : false
        }, item.totalpurchases), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Row__WEBPACK_IMPORTED_MODULE_4__["RowItemJsx"], {
          onClick: function onClick() {
            return _this2.selectField(i * numAttr + 10);
          },
          selected: _this2.state.selectedField == i * numAttr + 10 ? true : false
        }, item.visible), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Row__WEBPACK_IMPORTED_MODULE_4__["RowItemJsx"], {
          onClick: function onClick() {
            return _this2.selectField(i * numAttr + 11);
          },
          selected: _this2.state.selectedField == i * numAttr + 11 ? true : false
        }, item.picuri1), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Row__WEBPACK_IMPORTED_MODULE_4__["RowItemJsx"], {
          onClick: function onClick() {
            return _this2.selectField(i * numAttr + 12);
          },
          selected: _this2.state.selectedField == i * numAttr + 12 ? true : false
        }, item.picuri2), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Row__WEBPACK_IMPORTED_MODULE_4__["RowItemJsx"], {
          onClick: function onClick() {
            return _this2.selectField(i * numAttr + 13);
          },
          selected: _this2.state.selectedField == i * numAttr + 13 ? true : false
        }, item.picuri3), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Row__WEBPACK_IMPORTED_MODULE_4__["RowItemJsx"], {
          onClick: function onClick() {
            return _this2.selectField(i * numAttr + 14);
          },
          selected: _this2.state.selectedField == i * numAttr + 14 ? true : false
        }, item.picuri4), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Row__WEBPACK_IMPORTED_MODULE_4__["RowItemJsx"], {
          onClick: function onClick() {
            return _this2.selectField(i * numAttr + 15);
          },
          selected: _this2.state.selectedField == i * numAttr + 15 ? true : false
        }, item.picuri5));
      }), this.props.id == 'categories' && data.map(function (item, i) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Row__WEBPACK_IMPORTED_MODULE_4__["RowJsx"], {
          table: table
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Row__WEBPACK_IMPORTED_MODULE_4__["RowItemJsx"], {
          onClick: function onClick() {
            return _this2.selectField(i * numAttr + 0);
          }
        }, item.categoryid), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Row__WEBPACK_IMPORTED_MODULE_4__["RowItemJsx"], {
          onClick: function onClick() {
            return _this2.selectField(i * numAttr + 1);
          },
          selected: _this2.state.selectedField == i * numAttr + 1 ? true : false
        }, item.name));
      }), this.props.id == 'nailproductstocategory' && data.map(function (item, i) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Row__WEBPACK_IMPORTED_MODULE_4__["RowJsx"], {
          table: table
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Row__WEBPACK_IMPORTED_MODULE_4__["RowItemJsx"], {
          onClick: function onClick() {
            return _this2.selectField(i * numAttr + 0);
          }
        }, item.nailproductid), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Row__WEBPACK_IMPORTED_MODULE_4__["RowItemJsx"], {
          onClick: function onClick() {
            return _this2.selectField(i * numAttr + 1);
          }
        }, item.categoryid));
      }))));
    }
  }]);

  return BoardJsx;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

; // <Box height='100px' display='flex' flexDirection='row'>
//   <Box flex='0 0 auto' height='100%' border='1px solid' width='250px'></Box>
//   <Box flex='0 0 auto' height='100%' border='1px solid' width='250px'></Box>
//   <Box flex='0 0 auto' height='100%' border='1px solid' width='250px'></Box>
//   <Box flex='0 0 auto' height='100%' border='1px solid' width='250px'></Box>
//   <Box flex='0 0 auto' height='100%' border='1px solid' width='250px'></Box>
//   <Box flex='0 0 auto' height='100%' border='1px solid' width='250px'></Box>
//   <Box flex='0 0 auto' height='100%' border='1px solid' width='250px'></Box>
// </Box>
// <Box display='flex' flexDirection='row' p={2} m={3}>
//   { table.map((item) => <RowItem mx={2} description={true} fontSize={1}>{item}</RowItem>) }
// </Box>
//   {
//     this.state.orders.map((order) =>
//       <RowJsx key={order.orderid}>
//         <RowItem mx={2} fontSize={1}>{order.grouporderid}</RowItem>
//         <RowItem mx={2} fontSize={1}>{order.orderid}</RowItem>
//         <RowItem mx={2} fontSize={1}>{order.nailproductid}</RowItem>
//         <RowItem mx={2} fontSize={1}>{order.naillength}</RowItem>
//         <RowItem mx={2} fontSize={1}>{order.nailshape}</RowItem>
//         <RowItem mx={2} fontSize={1}>{order.orderstatus}</RowItem>
//         <RowItem mx={2} fontSize={1}>{order.datecreated}</RowItem>
//       </RowJsx>
//     )
//   }

/* harmony default export */ __webpack_exports__["default"] = (BoardJsx);

/***/ }),

/***/ "./components/Box.js":
/*!***************************!*\
  !*** ./components/Box.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var styled_system__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-system */ "styled-system");
/* harmony import */ var styled_system__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_system__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_1__);


var Box = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.div.withConfig({
  displayName: "Box",
  componentId: "sc-8x1mub-0"
})(["", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", ""], styled_system__WEBPACK_IMPORTED_MODULE_0__["space"], styled_system__WEBPACK_IMPORTED_MODULE_0__["height"], styled_system__WEBPACK_IMPORTED_MODULE_0__["width"], styled_system__WEBPACK_IMPORTED_MODULE_0__["fontSize"], styled_system__WEBPACK_IMPORTED_MODULE_0__["color"], styled_system__WEBPACK_IMPORTED_MODULE_0__["display"], styled_system__WEBPACK_IMPORTED_MODULE_0__["alignSelf"], styled_system__WEBPACK_IMPORTED_MODULE_0__["justifySelf"], styled_system__WEBPACK_IMPORTED_MODULE_0__["alignItems"], styled_system__WEBPACK_IMPORTED_MODULE_0__["justifyContent"], styled_system__WEBPACK_IMPORTED_MODULE_0__["flex"], styled_system__WEBPACK_IMPORTED_MODULE_0__["flexWrap"], styled_system__WEBPACK_IMPORTED_MODULE_0__["flexDirection"], styled_system__WEBPACK_IMPORTED_MODULE_0__["flexBasis"], styled_system__WEBPACK_IMPORTED_MODULE_0__["background"], styled_system__WEBPACK_IMPORTED_MODULE_0__["backgroundImage"], styled_system__WEBPACK_IMPORTED_MODULE_0__["backgroundSize"], styled_system__WEBPACK_IMPORTED_MODULE_0__["backgroundRepeat"], styled_system__WEBPACK_IMPORTED_MODULE_0__["borderRadius"], styled_system__WEBPACK_IMPORTED_MODULE_0__["borderColor"], styled_system__WEBPACK_IMPORTED_MODULE_0__["borders"], styled_system__WEBPACK_IMPORTED_MODULE_0__["boxShadow"], styled_system__WEBPACK_IMPORTED_MODULE_0__["opacity"], styled_system__WEBPACK_IMPORTED_MODULE_0__["overflow"], styled_system__WEBPACK_IMPORTED_MODULE_0__["position"], styled_system__WEBPACK_IMPORTED_MODULE_0__["zIndex"], styled_system__WEBPACK_IMPORTED_MODULE_0__["top"], styled_system__WEBPACK_IMPORTED_MODULE_0__["left"], styled_system__WEBPACK_IMPORTED_MODULE_0__["bottom"], styled_system__WEBPACK_IMPORTED_MODULE_0__["right"], styled_system__WEBPACK_IMPORTED_MODULE_0__["fontFamily"], styled_system__WEBPACK_IMPORTED_MODULE_0__["fontWeight"], styled_system__WEBPACK_IMPORTED_MODULE_0__["minWidth"], styled_system__WEBPACK_IMPORTED_MODULE_0__["maxWidth"], styled_system__WEBPACK_IMPORTED_MODULE_0__["minHeight"], styled_system__WEBPACK_IMPORTED_MODULE_0__["maxHeight"], styled_system__WEBPACK_IMPORTED_MODULE_0__["size"], styled_system__WEBPACK_IMPORTED_MODULE_0__["ratio"]);
/* harmony default export */ __webpack_exports__["default"] = (Box);

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
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ "next/link");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils_theme__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/theme */ "./utils/theme.js");
/* harmony import */ var _Box__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Box */ "./components/Box.js");
/* harmony import */ var _Sidebar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Sidebar */ "./components/Sidebar.js");


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
})(["display:flex;flex-direction:row;margin:0;padding:0;height:", "px;width:", "px;"], function (props) {
  return props.height;
}, function (props) {
  return props.width;
});
var MenuItem = styled_components__WEBPACK_IMPORTED_MODULE_2___default()(_Box__WEBPACK_IMPORTED_MODULE_4__["default"]).withConfig({
  displayName: "Layout__MenuItem",
  componentId: "sc-1ln4gt-1"
})(["font-family:sans-serif;font-weight:200;background:transparent;&:hover{background:rgba(255,255,255,.1);}"]);
var Header = styled_components__WEBPACK_IMPORTED_MODULE_2___default()(_Box__WEBPACK_IMPORTED_MODULE_4__["default"]).withConfig({
  displayName: "Layout__Header",
  componentId: "sc-1ln4gt-2"
})(["box-shadow:0 1px 3px 0 rgba(0,0,0,0.15);z-index:100;"]); // const LayoutJsx = ({ before, ...props }) => (
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

      var width = this.state.width; // https://s3-us-west-2.amazonaws.com/mani-me-app/menu.svg

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(styled_components__WEBPACK_IMPORTED_MODULE_2__["ThemeProvider"], {
        theme: _utils_theme__WEBPACK_IMPORTED_MODULE_3__["theme"]
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Container, {
        height: this.state.height,
        width: this.state.width
      }, !before && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Box__WEBPACK_IMPORTED_MODULE_4__["default"], {
        minWidth: [150, 200],
        height: "100%",
        bg: "blacks.11"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Box__WEBPACK_IMPORTED_MODULE_4__["default"], {
        px: 2,
        p: 2,
        width: ['100px', '120px']
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
        src: "https://s3-us-west-2.amazonaws.com/mani-me-app/manimelogo.png",
        style: {
          width: '100%',
          height: 'auto'
        }
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Box__WEBPACK_IMPORTED_MODULE_4__["default"], {
        py: 1
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_1___default.a, {
        as: "/d/orders",
        href: "/data?id=orders"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(MenuItem, {
        py: 1,
        px: 3,
        color: "whites.11",
        fontSize: 0
      }, "ORDERS")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_1___default.a, {
        as: "/d/grouporders",
        href: "/data?id=grouporders"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(MenuItem, {
        py: 1,
        px: 3,
        color: "whites.11",
        fontSize: 0
      }, "GROUP ORDERS")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_1___default.a, {
        as: "/d/users",
        href: "/data?id=users"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(MenuItem, {
        py: 1,
        px: 3,
        color: "whites.11",
        fontSize: 0
      }, "USERS")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_1___default.a, {
        as: "/d/revieworders",
        href: "/data?id=revieworders"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(MenuItem, {
        py: 1,
        px: 3,
        color: "whites.11",
        fontSize: 0
      }, "ORDER REVIEWS")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_1___default.a, {
        as: "/d/shippingaddresses",
        href: "/data?id=shippingaddresses"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(MenuItem, {
        py: 1,
        px: 3,
        color: "whites.11",
        fontSize: 0
      }, "SHIPPING ADDRESSES")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_1___default.a, {
        as: "/d/payments",
        href: "/data?id=payments"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(MenuItem, {
        py: 1,
        px: 3,
        color: "whites.11",
        fontSize: 0
      }, "PAYMENTS")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_1___default.a, {
        as: "/d/designers",
        href: "/data?id=designers"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(MenuItem, {
        py: 1,
        px: 3,
        color: "whites.11",
        fontSize: 0
      }, "DESIGNERS")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_1___default.a, {
        as: "/d/nailproducts",
        href: "/data?id=nailproducts"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(MenuItem, {
        py: 1,
        px: 3,
        color: "whites.11",
        fontSize: 0
      }, "NAIL PRODUCTS")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_1___default.a, {
        as: "/d/categories",
        href: "/data?id=categories"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(MenuItem, {
        py: 1,
        px: 3,
        color: "whites.11",
        fontSize: 0
      }, "NAIL CATEGORIES")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_1___default.a, {
        as: "/d/nailproductstocategory",
        href: "/data?id=nailproductstocategory"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(MenuItem, {
        py: 1,
        px: 3,
        color: "whites.11",
        fontSize: 0
      }, "NAIL PRODUCT CATEGORIES")))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Box__WEBPACK_IMPORTED_MODULE_4__["default"], {
        width: [width - 150, width - 200],
        height: "100%",
        bg: "whites.7",
        display: "flex",
        flexDirection: "column"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Header, {
        width: 1,
        bg: "whites.9",
        color: "blacks.2",
        height: 2,
        display: "flex",
        flex: "0 0 auto",
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
/*! exports provided: MX_ROW, ML_ROW_ITEM, ROW_ITEM_WIDTH, RowJsx, RowItemJsx */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MX_ROW", function() { return MX_ROW; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ML_ROW_ITEM", function() { return ML_ROW_ITEM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ROW_ITEM_WIDTH", function() { return ROW_ITEM_WIDTH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RowJsx", function() { return RowJsx; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RowItemJsx", function() { return RowItemJsx; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_system__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-system */ "styled-system");
/* harmony import */ var styled_system__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_system__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Box__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Box */ "./components/Box.js");


function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }




var MX_ROW = 3;
var ML_ROW_ITEM = 2;
var ROW_ITEM_WIDTH = 200; // flex: 1 0 ${(props) => {
//   const index = props.m-1;
//   let margin = 0;
//   if(index >= 0 && index < props.theme.space.length)
//     margin = props.theme.space[props.m-1];
//   return props.children.length * (ROW_ITEM_WIDTH + margin);
// }}px;

var RowItem = styled_components__WEBPACK_IMPORTED_MODULE_2___default()(_Box__WEBPACK_IMPORTED_MODULE_3__["default"]).withConfig({
  displayName: "Row__RowItem",
  componentId: "sc-8qukng-0"
})(["white-space:nowrap;overflow:hidden;font-family:sans-serif;font-weight:", ";flex:0 0 ", "px;height:80%;align-items:center;display:flex;border:", "px solid #313131;border-radius:3px;box-sizing:border-box;&:hover{}"], function (props) {
  return props.description ? 400 : 200;
}, ROW_ITEM_WIDTH, function (props) {
  return props.selected ? 1 : 0;
}); // New Row requires horizontal margins

var Row = styled_components__WEBPACK_IMPORTED_MODULE_2___default()(_Box__WEBPACK_IMPORTED_MODULE_3__["default"]).withConfig({
  displayName: "Row",
  componentId: "sc-8qukng-1"
})(["display:flex;flex-direction:row;flex:0 0 40px;align-items:center;background-color:", ";width:", "px;&:hover{box-shadow:", ";transform:", ";}"], function (props) {
  return props.description ? 'transparent' : '#ffffff';
}, function (props) {
  var numColumns = props.table.length;
  var width = (props.theme.space[ML_ROW_ITEM] + ROW_ITEM_WIDTH) * numColumns;
  return width;
}, function (props) {
  return !props.description ? '0 5px 10px 0 rgba(0,0,0,0.06)' : 'none';
}, function (props) {
  return !props.description ? 'translateY(-1px)' : 'none';
});
var Input = styled_components__WEBPACK_IMPORTED_MODULE_2___default.a.input.withConfig({
  displayName: "Row__Input",
  componentId: "sc-8qukng-2"
})(["border:none;width:100%;height:100%;&:focus{outline:none;}"]);
var RowJsx = function RowJsx(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Row, _extends({
    boxShadow: props.description ? 0 : 2,
    height: 1,
    my: 1,
    ml: MX_ROW
  }, props), props.children);
};
var RowItemJsx = function RowItemJsx(_ref) {
  var before = _ref.before,
      type = _ref.type,
      updateField = _ref.updateField,
      i = _ref.i,
      propertyName = _ref.propertyName,
      props = _objectWithoutProperties(_ref, ["before", "type", "updateField", "i", "propertyName"]);

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(RowItem, _extends({
    ml: ML_ROW_ITEM,
    pl: 1,
    fontSize: 1
  }, props), type == 'text' ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Input, {
    value: props.children
  }) : type == 'menu' ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Input, {
    value: props.children
  }) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Input, {
    value: props.children,
    onChange: function onChange(ev) {
      return updateField(i, propertyName, ev.target.value);
    }
  }));
}; // calc(100% - ${(props) => {
//   // console.log(props);
//   console.log(props.theme.space[props.mx]);
//   return 128;
// }}px);

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

/***/ "./pages/data.js":
/*!***********************!*\
  !*** ./pages/data.js ***!
  \***********************/
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







var PostLink = function PostLink(props) {
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_2___default.a, {
    as: "/p/".concat(props.id),
    href: "/post?title=".concat(props.title)
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", null, props.title)));
};

var Data = function Data(props) {
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_Layout__WEBPACK_IMPORTED_MODULE_3__["default"], {
    before: false
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_BoardBody__WEBPACK_IMPORTED_MODULE_6__["default"], props));
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


Data.getInitialProps =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(context) {
    var id;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            id = context.query.id; // console.log(`ID: ${id}`);

            return _context.abrupt("return", {
              id: id
            });

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

/* harmony default export */ __webpack_exports__["default"] = (Data);

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
  fontSizes: [9, 10, 12, 14, 16, 20, 24, 36, 48, 80, 96],
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
  shadows: ['0 1px 3px 0 rgba(0,0,0,0.00)', '0 1px 3px 0 rgba(0,0,0,0.05)', '0 1px 3px 0 rgba(0,0,0,0.10)', '0 1px 3px 0 rgba(0,0,0,0.15)', '0 1px 3px 0 rgba(0,0,0,0.20)']
};

/***/ }),

/***/ 3:
/*!*****************************!*\
  !*** multi ./pages/data.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./pages/data.js */"./pages/data.js");


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
//# sourceMappingURL=data.js.map