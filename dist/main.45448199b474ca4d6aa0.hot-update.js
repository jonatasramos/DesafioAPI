exports.id = "main";
exports.modules = {

/***/ "./src/routes/AuthenticateRoute.ts":
/*!*****************************************!*\
  !*** ./src/routes/AuthenticateRoute.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar express_1 = __webpack_require__(/*! express */ \"express\");\r\nvar UserController_1 = __importDefault(__webpack_require__(/*! ../controller/UserController */ \"./src/controller/UserController.ts\"));\r\nvar Validations_1 = __webpack_require__(/*! ../services/Validations */ \"./src/services/Validations.ts\");\r\nvar express_validation_1 = __webpack_require__(/*! express-validation */ \"express-validation\");\r\n/**\r\n * Classe responsável pelas rotas das autenticações\r\n *\r\n * @author Jônatas Ramos\r\n */\r\nvar AuthenticateRoute = /** @class */ (function () {\r\n    function AuthenticateRoute() {\r\n        this.router = express_1.Router();\r\n        this.init();\r\n    }\r\n    /**\r\n    * Responsável por gerar o token\r\n    *\r\n    * @param {Request} req request\r\n    * @param {Response} res respose\r\n    */\r\n    AuthenticateRoute.prototype.getToken = function (req, res) {\r\n        try {\r\n            UserController_1.default.getUser(req.body).then(function (user) {\r\n                var id = user[0]._id;\r\n                res.json({});\r\n            });\r\n        }\r\n        catch (error) {\r\n            res.json({\r\n                'error': true,\r\n                'message': 'Erro ao autenticar usuário.'\r\n            });\r\n        }\r\n    };\r\n    /**\r\n   * Inicia as rotas\r\n   */\r\n    AuthenticateRoute.prototype.init = function () {\r\n        this.router.post('/token', express_validation_1.validate(Validations_1.validateUser, {}, { abortEarly: true }), this.getToken);\r\n    };\r\n    return AuthenticateRoute;\r\n}());\r\nvar userRouter = new AuthenticateRoute;\r\nuserRouter.init();\r\nexports.default = userRouter.router;\r\n\n\n//# sourceURL=webpack:///./src/routes/AuthenticateRoute.ts?");

/***/ })

};