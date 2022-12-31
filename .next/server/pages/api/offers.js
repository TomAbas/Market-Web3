"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/offers";
exports.ids = ["pages/api/offers"];
exports.modules = {

/***/ "@supabase/supabase-js":
/*!****************************************!*\
  !*** external "@supabase/supabase-js" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("@supabase/supabase-js");

/***/ }),

/***/ "(api)/./src/config/constants.ts":
/*!*********************************!*\
  !*** ./src/config/constants.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"APTOS_FAUCET_URL\": () => (/* binding */ APTOS_FAUCET_URL),\n/* harmony export */   \"APTOS_FAUCET_URL_TEST\": () => (/* binding */ APTOS_FAUCET_URL_TEST),\n/* harmony export */   \"APTOS_NODE_URL\": () => (/* binding */ APTOS_NODE_URL),\n/* harmony export */   \"APTOS_NODE_URL_TEST\": () => (/* binding */ APTOS_NODE_URL_TEST),\n/* harmony export */   \"MARKET_ADDRESS\": () => (/* binding */ MARKET_ADDRESS),\n/* harmony export */   \"MARKET_COINT_TYPE\": () => (/* binding */ MARKET_COINT_TYPE),\n/* harmony export */   \"MARKET_NAME\": () => (/* binding */ MARKET_NAME),\n/* harmony export */   \"NFT_STORAGE_KEY\": () => (/* binding */ NFT_STORAGE_KEY),\n/* harmony export */   \"SUPABASE_KEY\": () => (/* binding */ SUPABASE_KEY),\n/* harmony export */   \"SUPABASE_URL\": () => (/* binding */ SUPABASE_URL)\n/* harmony export */ });\nconst NFT_STORAGE_KEY = \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDM4ZUYzYTI4REYzZDI2MkQyMzNhNUVFNjUyMDIwN2MwNzEwYUQ2QzAiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2NzI4ODkyNTQ2OSwibmFtZSI6ImFwdG9zIn0.XSHtBRDa_u4SViKFqC4kCAUDSDF1ir_MKz4aCZ1e7-c\";\nconst SUPABASE_KEY = \"\";\nconst SUPABASE_URL = \"\";\nconst MARKET_NAME = \"\";\nconst MARKET_ADDRESS = \"\";\nconst MARKET_COINT_TYPE = \"\";\nconst APTOS_NODE_URL = \"https://fullnode.testnet.aptoslabs.com/v1/\";\nconst APTOS_FAUCET_URL = \"https://faucet.testnet.aptoslabs.com/v1/\";\nconst APTOS_NODE_URL_TEST = \"https://fullnode.testnet.aptoslabs.com\";\nconst APTOS_FAUCET_URL_TEST = \"https://faucet.testnet.aptoslabs.com\";\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvY29uZmlnL2NvbnN0YW50cy50cy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQU8sTUFBTUEsZUFBZSxHQUFHQyw4T0FBdUMsQ0FBRTtBQUNqRSxNQUFNRyxZQUFZLEdBQUdILEVBQW9DLENBQUU7QUFDM0QsTUFBTUssWUFBWSxHQUFHTCxFQUFvQyxDQUFFO0FBRTNELE1BQU1PLFdBQVcsR0FBR1AsRUFBbUMsQ0FBRTtBQUN6RCxNQUFNUyxjQUFjLEdBQUdULEVBQXNDLENBQUU7QUFDL0QsTUFBTVcsaUJBQWlCLEdBQUdYLEVBQXdDLENBQUU7QUFFcEUsTUFBTWEsY0FBYyxHQUFHYiw0Q0FBc0MsQ0FBRTtBQUMvRCxNQUFNZSxnQkFBZ0IsR0FBR2YsMENBQXdDLENBQUU7QUFFbkUsTUFBTWlCLG1CQUFtQixHQUFHakIsd0NBQTJDLENBQUU7QUFDekUsTUFBTW1CLHFCQUFxQixHQUNoQ25CLHNDQUE2QyxDQUFFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXB0b3MtbWFya2V0LWludGVyZmFjZS8uL3NyYy9jb25maWcvY29uc3RhbnRzLnRzPzYxYzkiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IE5GVF9TVE9SQUdFX0tFWSA9IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX05GVF9TVE9SQUdFX0tFWSE7XG5leHBvcnQgY29uc3QgU1VQQUJBU0VfS0VZID0gcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfU1VQQUJBU0VfS0VZITtcbmV4cG9ydCBjb25zdCBTVVBBQkFTRV9VUkwgPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19TVVBBQkFTRV9VUkwhO1xuXG5leHBvcnQgY29uc3QgTUFSS0VUX05BTUUgPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19NQVJLRVRfTkFNRSE7XG5leHBvcnQgY29uc3QgTUFSS0VUX0FERFJFU1MgPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19NQVJLRVRfQUREUkVTUyE7XG5leHBvcnQgY29uc3QgTUFSS0VUX0NPSU5UX1RZUEUgPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19NQVJLRVRfQ09JTl9UWVBFITtcblxuZXhwb3J0IGNvbnN0IEFQVE9TX05PREVfVVJMID0gcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfQVBUT1NfTk9ERV9VUkwhO1xuZXhwb3J0IGNvbnN0IEFQVE9TX0ZBVUNFVF9VUkwgPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19BUFRPU19GQVVDRVRfVVJMITtcblxuZXhwb3J0IGNvbnN0IEFQVE9TX05PREVfVVJMX1RFU1QgPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19BUFRPU19OT0RFX1VSTF9URVNUITtcbmV4cG9ydCBjb25zdCBBUFRPU19GQVVDRVRfVVJMX1RFU1QgPVxuICBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19BUFRPU19GQVVDRVRfVVJMX1RFU1QhO1xuIl0sIm5hbWVzIjpbIk5GVF9TVE9SQUdFX0tFWSIsInByb2Nlc3MiLCJlbnYiLCJORVhUX1BVQkxJQ19ORlRfU1RPUkFHRV9LRVkiLCJTVVBBQkFTRV9LRVkiLCJORVhUX1BVQkxJQ19TVVBBQkFTRV9LRVkiLCJTVVBBQkFTRV9VUkwiLCJORVhUX1BVQkxJQ19TVVBBQkFTRV9VUkwiLCJNQVJLRVRfTkFNRSIsIk5FWFRfUFVCTElDX01BUktFVF9OQU1FIiwiTUFSS0VUX0FERFJFU1MiLCJORVhUX1BVQkxJQ19NQVJLRVRfQUREUkVTUyIsIk1BUktFVF9DT0lOVF9UWVBFIiwiTkVYVF9QVUJMSUNfTUFSS0VUX0NPSU5fVFlQRSIsIkFQVE9TX05PREVfVVJMIiwiTkVYVF9QVUJMSUNfQVBUT1NfTk9ERV9VUkwiLCJBUFRPU19GQVVDRVRfVVJMIiwiTkVYVF9QVUJMSUNfQVBUT1NfRkFVQ0VUX1VSTCIsIkFQVE9TX05PREVfVVJMX1RFU1QiLCJORVhUX1BVQkxJQ19BUFRPU19OT0RFX1VSTF9URVNUIiwiQVBUT1NfRkFVQ0VUX1VSTF9URVNUIiwiTkVYVF9QVUJMSUNfQVBUT1NfRkFVQ0VUX1VSTF9URVNUIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./src/config/constants.ts\n");

/***/ }),

/***/ "(api)/./src/pages/api/offers.ts":
/*!*********************************!*\
  !*** ./src/pages/api/offers.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var _utils_supabase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/supabase */ \"(api)/./src/utils/supabase.ts\");\n\nasync function handler(req, res) {\n    let { data: offers , error  } = await _utils_supabase__WEBPACK_IMPORTED_MODULE_0__.supabase.from(\"offers\").select(\"id,buyer,seller,price,status,createAt,updateAt,token:tokens(*)\").eq(\"status\", \"ongoing\");\n    if (error) {\n        return res.status(500).json(error);\n    } else {\n        return res.status(200).json(offers);\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvcGFnZXMvYXBpL29mZmVycy50cy5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUNnRDtBQUVqQyxlQUFlQyxPQUFPLENBQ25DQyxHQUFtQixFQUNuQkMsR0FBb0IsRUFDcEI7SUFDQSxJQUFJLEVBQUVDLElBQUksRUFBRUMsTUFBTSxHQUFFQyxLQUFLLEdBQUUsR0FBRyxNQUFNTiwwREFDN0IsQ0FBQyxRQUFRLENBQUMsQ0FDZFEsTUFBTSxDQUFDLGdFQUFnRSxDQUFDLENBQ3hFQyxFQUFFLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQztJQUMxQixJQUFJSCxLQUFLLEVBQUU7UUFDVCxPQUFPSCxHQUFHLENBQUNPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsSUFBSSxDQUFDTCxLQUFLLENBQUMsQ0FBQztJQUNyQyxPQUFPO1FBQ0wsT0FBT0gsR0FBRyxDQUFDTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQ04sTUFBTSxDQUFDLENBQUM7SUFDdEMsQ0FBQztBQUNILENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcHRvcy1tYXJrZXQtaW50ZXJmYWNlLy4vc3JjL3BhZ2VzL2FwaS9vZmZlcnMudHM/NjQ2MCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0QXBpUmVxdWVzdCwgTmV4dEFwaVJlc3BvbnNlIH0gZnJvbSBcIm5leHRcIjtcbmltcG9ydCB7IHN1cGFiYXNlIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3N1cGFiYXNlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIGhhbmRsZXIoXG4gIHJlcTogTmV4dEFwaVJlcXVlc3QsXG4gIHJlczogTmV4dEFwaVJlc3BvbnNlXG4pIHtcbiAgbGV0IHsgZGF0YTogb2ZmZXJzLCBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcIm9mZmVyc1wiKVxuICAgIC5zZWxlY3QoXCJpZCxidXllcixzZWxsZXIscHJpY2Usc3RhdHVzLGNyZWF0ZUF0LHVwZGF0ZUF0LHRva2VuOnRva2VucygqKVwiKVxuICAgIC5lcShcInN0YXR1c1wiLCBcIm9uZ29pbmdcIik7XG4gIGlmIChlcnJvcikge1xuICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbihlcnJvcik7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKG9mZmVycyk7XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJzdXBhYmFzZSIsImhhbmRsZXIiLCJyZXEiLCJyZXMiLCJkYXRhIiwib2ZmZXJzIiwiZXJyb3IiLCJmcm9tIiwic2VsZWN0IiwiZXEiLCJzdGF0dXMiLCJqc29uIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./src/pages/api/offers.ts\n");

/***/ }),

/***/ "(api)/./src/utils/supabase.ts":
/*!*******************************!*\
  !*** ./src/utils/supabase.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"supabase\": () => (/* binding */ supabase)\n/* harmony export */ });\n/* harmony import */ var _supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @supabase/supabase-js */ \"@supabase/supabase-js\");\n/* harmony import */ var _supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _config_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../config/constants */ \"(api)/./src/config/constants.ts\");\n\n\nconst supabase = (0,_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__.createClient)(_config_constants__WEBPACK_IMPORTED_MODULE_1__.SUPABASE_URL, _config_constants__WEBPACK_IMPORTED_MODULE_1__.SUPABASE_KEY);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvdXRpbHMvc3VwYWJhc2UudHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFxRDtBQUNZO0FBRTFELE1BQU1HLFFBQVEsR0FBR0gsbUVBQVksQ0FBQ0UsMkRBQVksRUFBRUQsMkRBQVksQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXB0b3MtbWFya2V0LWludGVyZmFjZS8uL3NyYy91dGlscy9zdXBhYmFzZS50cz9kNGU4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZUNsaWVudCB9IGZyb20gXCJAc3VwYWJhc2Uvc3VwYWJhc2UtanNcIjtcbmltcG9ydCB7IFNVUEFCQVNFX0tFWSwgU1VQQUJBU0VfVVJMIH0gZnJvbSBcIi4uL2NvbmZpZy9jb25zdGFudHNcIjtcblxuZXhwb3J0IGNvbnN0IHN1cGFiYXNlID0gY3JlYXRlQ2xpZW50KFNVUEFCQVNFX1VSTCwgU1VQQUJBU0VfS0VZKTtcbiJdLCJuYW1lcyI6WyJjcmVhdGVDbGllbnQiLCJTVVBBQkFTRV9LRVkiLCJTVVBBQkFTRV9VUkwiLCJzdXBhYmFzZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./src/utils/supabase.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./src/pages/api/offers.ts"));
module.exports = __webpack_exports__;

})();