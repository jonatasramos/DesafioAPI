exports.id = "main";
exports.modules = {

/***/ "./src/routes/index.ts":
/*!*****************************!*\
  !*** ./src/routes/index.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\n/**\r\n * Importa todas as rotas do sistema\r\n *\r\n * @author Jônatas Ramos\r\n */\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nvar express_1 = __webpack_require__(/*! express */ \"express\");\r\nvar LetterRoute_1 = __importDefault(__webpack_require__(/*! ./LetterRoute */ \"./src/routes/LetterRoute.ts\"));\r\nvar AuthenticateRoute_1 = __importDefault(__webpack_require__(/*! ./AuthenticateRoute */ \"./src/routes/AuthenticateRoute.ts\"));\r\nvar router = express_1.Router();\r\n//Rota para status da api\r\nrouter.get('/api_status', function (req, res) {\r\n    res.json({\r\n        status: \"ok\"\r\n    });\r\n});\r\n/**\r\n * Rota de Cartas\r\n */\r\nrouter.use('/letter', LetterRoute_1.default);\r\n/**\r\n * Rota Autenticação\r\n */\r\nrouter.use('/auth', AuthenticateRoute_1.default);\r\nmodule.exports = router;\r\n\n\n//# sourceURL=webpack:///./src/routes/index.ts?");

/***/ })

};