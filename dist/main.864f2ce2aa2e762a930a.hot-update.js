exports.id = "main";
exports.modules = {

/***/ "./src/routes/AuthenticateRoute.ts":
/*!*****************************************!*\
  !*** ./src/routes/AuthenticateRoute.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar express_1 = __webpack_require__(/*! express */ \"express\");\r\nvar UserController_1 = __importDefault(__webpack_require__(/*! ../controller/UserController */ \"./src/controller/UserController.ts\"));\r\nvar Validations_1 = __webpack_require__(/*! ../services/Validations */ \"./src/services/Validations.ts\");\r\nvar express_validation_1 = __webpack_require__(/*! express-validation */ \"express-validation\");\r\n/**\r\n * Classe responsável pelas rotas das autenticações\r\n *\r\n * @author Jônatas Ramos\r\n */\r\nvar AuthenticateRoute = /** @class */ (function () {\r\n    function AuthenticateRoute() {\r\n        this.router = express_1.Router();\r\n        this.init();\r\n    }\r\n    /**\r\n    * Responsável por gerar o token\r\n    *\r\n    * @param {Request} req request\r\n    * @param {Response} res respose\r\n    */\r\n    AuthenticateRoute.prototype.getToken = function (req, res) {\r\n        try {\r\n            UserController_1.default.getUser(req.body).then(function (user) {\r\n                res.json({ id: user[0]._id });\r\n            });\r\n        }\r\n        catch (error) {\r\n            res.json({\r\n                'error': true,\r\n                'message': 'Erro ao autenticar usuário.'\r\n            });\r\n        }\r\n    };\r\n    /**\r\n   * Inicia as rotas\r\n   */\r\n    AuthenticateRoute.prototype.init = function () {\r\n        this.router.post('/token', express_validation_1.validate(Validations_1.validateUser, {}, { abortEarly: true }), this.getToken);\r\n    };\r\n    return AuthenticateRoute;\r\n}());\r\nvar userRouter = new AuthenticateRoute;\r\nuserRouter.init();\r\nexports.default = userRouter.router;\r\n\n\n//# sourceURL=webpack:///./src/routes/AuthenticateRoute.ts?");

/***/ }),

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