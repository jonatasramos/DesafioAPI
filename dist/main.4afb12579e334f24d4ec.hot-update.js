exports.id = "main";
exports.modules = {

/***/ "./src/routes/letter.route.ts":
/*!************************************!*\
  !*** ./src/routes/letter.route.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\n/**\r\n * Manipulação das rotas de Cartas\r\n *\r\n * @author Jônatas Ramos\r\n */\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nvar express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\r\nvar router = express_1.default.Router();\r\n//Rota para status da api\r\nrouter.get('/create', function (req, res) {\r\n    res.json({\r\n        status: \"ok\"\r\n    });\r\n});\r\nmodule.exports = router;\r\n\n\n//# sourceURL=webpack:///./src/routes/letter.route.ts?");

/***/ })

};