webpackHotUpdate("static/development/pages/index.js",{

/***/ "./components/Responsive.js":
/*!**********************************!*\
  !*** ./components/Responsive.js ***!
  \**********************************/
/*! exports provided: Row, Column */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Row", function() { return Row; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Column", function() { return Column; });
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");

var sizes = {
  lg: 992,
  md: 768,
  sm: 576
};
var media = Object.keys(sizes).reduce(function (acc, label) {
  acc[label] = function () {
    return Object(styled_components__WEBPACK_IMPORTED_MODULE_0__["css"])(["@media (max-width:", "em){", "}"], sizes[label] / 16, styled_components__WEBPACK_IMPORTED_MODULE_0__["css"].apply(void 0, arguments));
  };

  return acc;
}, {});

function getWidthString(span) {
  if (!span) return '';
  var width = span / 12 * 100;
  return "width: ".concat(width, "%");
}

var Row = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].div.withConfig({
  displayName: "Responsive__Row",
  componentId: "sc-19u8vpe-0"
})(["&::after{content:'';clear:both;display:table;}"]);
var Column = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].div.withConfig({
  displayName: "Responsive__Column",
  componentId: "sc-19u8vpe-1"
})(["float:left;background-color:", ";", ";"], function (props) {
  return props.backgroundColor ? props.backgroundColor : '#ff0000';
}, function (_ref) {
  var xs = _ref.xs;
  return xs ? getWidthString(xs) : 'width: 100%';
}); // @media (max-width: 992px) {
//   ${({lg}) => lg && getWidthString(lg)}
// }
// @media (max-width: 768px) {
//   ${({md}) => md && getWidthString(md)}
// }
// @media (max-width: 576px) {
//   ${({sm}) => sm && getWidthString(sm)}
// }
//
// ${media.lg`${({lg}) => lg && getWidthString(lg)}`};
// ${media.md`${({md}) => md && getWidthString(md)}`};
// ${media.sm`${({sm}) => sm && getWidthString(sm)}`};
//
// @media (min-width: 576px) {
//   ${({ sm }) => sm && getWidthString(sm)};
// }
//
// @media (min-width: 768px) {
//   ${({ md }) => md && getWidthString(md)};
// }
// @media (min-width: 992px) {
//   ${({ lg }) => lg && getWidthString(lg)};
// }

/***/ })

})
//# sourceMappingURL=index.js.14dd284eabb174cc2b7b.hot-update.js.map