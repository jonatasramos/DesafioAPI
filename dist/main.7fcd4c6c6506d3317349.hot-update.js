exports.id = "main";
exports.modules = {

/***/ "./src/controller/LetterController.ts":
false,

/***/ "./src/models/LetterModel.ts":
false,

/***/ "./src/routes/LetterRoute.ts":
/*!***********************************!*\
  !*** ./src/routes/LetterRoute.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("throw new Error(\"Module parse failed: The keyword 'yield' is reserved (62:8)\\nFile was processed with these loaders:\\n * ./node_modules/ts-loader/index.js\\nYou may need an additional loader to handle the result of these loaders.\\n|     LetterRoute.prototype.get = function (req, res) {\\n|         console.log(LetterController_1.default.get());\\n>         yield LetterController_1.default.get().then(function (letter) {\\n|             console.log(letter);\\n|             res.json(letter);\");\n\n//# sourceURL=webpack:///./src/routes/LetterRoute.ts?");

/***/ }),

/***/ "./src/routes/index.ts":
/*!*****************************!*\
  !*** ./src/routes/index.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\n/**\r\n * Importa todas as rotas do sistema\r\n *\r\n * @author Jônatas Ramos\r\n */\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nvar express_1 = __webpack_require__(/*! express */ \"express\");\r\nvar LetterRoute_1 = __importDefault(__webpack_require__(/*! ./LetterRoute */ \"./src/routes/LetterRoute.ts\"));\r\nvar router = express_1.Router();\r\n//Rota para status da api\r\nrouter.get('/api_status', function (req, res) {\r\n    res.json({\r\n        status: \"ok\"\r\n    });\r\n});\r\n/**\r\n * Rota de Cartas\r\n */\r\nrouter.use('/letter', LetterRoute_1.default);\r\nmodule.exports = router;\r\n\n\n//# sourceURL=webpack:///./src/routes/index.ts?");

/***/ })

};