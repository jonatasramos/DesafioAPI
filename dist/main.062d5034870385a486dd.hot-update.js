exports.id = "main";
exports.modules = {

/***/ "./src/controller/UserController.ts":
/*!******************************************!*\
  !*** ./src/controller/UserController.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nvar __generator = (this && this.__generator) || function (thisArg, body) {\r\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\r\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\r\n    function verb(n) { return function (v) { return step([n, v]); }; }\r\n    function step(op) {\r\n        if (f) throw new TypeError(\"Generator is already executing.\");\r\n        while (_) try {\r\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\r\n            if (y = 0, t) op = [op[0] & 2, t.value];\r\n            switch (op[0]) {\r\n                case 0: case 1: t = op; break;\r\n                case 4: _.label++; return { value: op[1], done: false };\r\n                case 5: _.label++; y = op[1]; op = [0]; continue;\r\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\r\n                default:\r\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\r\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\r\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\r\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\r\n                    if (t[2]) _.ops.pop();\r\n                    _.trys.pop(); continue;\r\n            }\r\n            op = body.call(thisArg, _);\r\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\r\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\r\n    }\r\n};\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar UserModel_1 = __importDefault(__webpack_require__(/*! ../models/UserModel */ \"./src/models/UserModel.ts\"));\r\n/**\r\n * Class Controller de atutenticações de usuários\r\n *\r\n * @author Jônatas Ramos\r\n */\r\nvar UserController = /** @class */ (function () {\r\n    function UserController() {\r\n    }\r\n    /**\r\n     * Busca um usuário no banco de dados\r\n     *\r\n     * @return {User} user\r\n     */\r\n    UserController.prototype.getUser = function (user) {\r\n        return __awaiter(this, void 0, void 0, function () {\r\n            return __generator(this, function (_a) {\r\n                try {\r\n                    return [2 /*return*/, UserModel_1.default.find({\r\n                            login: user.login,\r\n                            password: user.password\r\n                        })];\r\n                }\r\n                catch (error) {\r\n                    return [2 /*return*/, { 'error': true, 'message': 'Usuário não encontrado!' }];\r\n                }\r\n                return [2 /*return*/];\r\n            });\r\n        });\r\n    };\r\n    ;\r\n    return UserController;\r\n}());\r\nexports.default = new UserController;\r\n\n\n//# sourceURL=webpack:///./src/controller/UserController.ts?");

/***/ }),

/***/ "./src/models/UserModel.ts":
/*!*********************************!*\
  !*** ./src/models/UserModel.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar mongoose_1 = __webpack_require__(/*! mongoose */ \"mongoose\");\r\nvar mongoose_2 = __importDefault(__webpack_require__(/*! mongoose */ \"mongoose\"));\r\nvar mongoose_auto_increment_1 = __importDefault(__webpack_require__(/*! mongoose-auto-increment */ \"mongoose-auto-increment\"));\r\n/**\r\n * Schema model user\r\n */\r\nvar UserModel = new mongoose_1.Schema({\r\n    id: {\r\n        type: mongoose_1.Schema.Types.Number,\r\n        required: true,\r\n        unique: true,\r\n        min: 1\r\n    },\r\n    login: {\r\n        type: mongoose_1.Schema.Types.String, required: true\r\n    },\r\n    password: {\r\n        type: mongoose_1.Schema.Types.String, required: true\r\n    }\r\n});\r\nmongoose_auto_increment_1.default.initialize(mongoose_2.default.connection);\r\nUserModel.plugin(mongoose_auto_increment_1.default.plugin, {\r\n    model: \"letter\",\r\n    field: \"id\",\r\n    startAt: 1,\r\n});\r\nvar userModel = mongoose_2.default.model(\"user\", UserModel, \"user\");\r\nexports.default = userModel;\r\n\n\n//# sourceURL=webpack:///./src/models/UserModel.ts?");

/***/ }),

/***/ "./src/routes/AuthenticateRoute.ts":
/*!*****************************************!*\
  !*** ./src/routes/AuthenticateRoute.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar express_1 = __webpack_require__(/*! express */ \"express\");\r\nvar UserController_1 = __importDefault(__webpack_require__(/*! ../controller/UserController */ \"./src/controller/UserController.ts\"));\r\nvar Validations_1 = __webpack_require__(/*! ../services/Validations */ \"./src/services/Validations.ts\");\r\nvar express_validation_1 = __webpack_require__(/*! express-validation */ \"express-validation\");\r\n/**\r\n * Classe responsável pelas rotas das autenticações\r\n *\r\n * @author Jônatas Ramos\r\n */\r\nvar AuthenticateRoute = /** @class */ (function () {\r\n    function AuthenticateRoute() {\r\n        this.router = express_1.Router();\r\n        this.init();\r\n    }\r\n    /**\r\n    * Responsável por gerar o token\r\n    *\r\n    * @param {Request} req request\r\n    * @param {Response} res respose\r\n    */\r\n    AuthenticateRoute.prototype.getToken = function (req, res) {\r\n        try {\r\n            UserController_1.default.getUser(req.body).then(function (user) {\r\n                res.json(user);\r\n            });\r\n        }\r\n        catch (error) {\r\n            res.json({\r\n                'error': true,\r\n                'message': 'Erro ao autenticar usuário.'\r\n            });\r\n        }\r\n    };\r\n    /**\r\n   * Inicia as rotas\r\n   */\r\n    AuthenticateRoute.prototype.init = function () {\r\n        this.router.post('/token', express_validation_1.validate(Validations_1.validateUser, {}, { abortEarly: true }), this.getToken);\r\n    };\r\n    return AuthenticateRoute;\r\n}());\r\nvar userRouter = new AuthenticateRoute;\r\nuserRouter.init();\r\nexports.default = userRouter.router;\r\n\n\n//# sourceURL=webpack:///./src/routes/AuthenticateRoute.ts?");

/***/ }),

/***/ "./src/routes/index.ts":
/*!*****************************!*\
  !*** ./src/routes/index.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\n/**\r\n * Importa todas as rotas do sistema\r\n *\r\n * @author Jônatas Ramos\r\n */\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nvar express_1 = __webpack_require__(/*! express */ \"express\");\r\nvar LetterRoute_1 = __importDefault(__webpack_require__(/*! ./LetterRoute */ \"./src/routes/LetterRoute.ts\"));\r\nvar AuthenticateRoute_1 = __importDefault(__webpack_require__(/*! ./AuthenticateRoute */ \"./src/routes/AuthenticateRoute.ts\"));\r\nvar router = express_1.Router();\r\n//Rota para status da api\r\nrouter.get('/api_status', function (req, res) {\r\n    res.json({\r\n        status: \"ok\"\r\n    });\r\n});\r\n/**\r\n * Rota de Cartas\r\n */\r\nrouter.use('/letter', LetterRoute_1.default);\r\n/**\r\n * Rota Autenticação\r\n */\r\nrouter.use('/auth', AuthenticateRoute_1.default);\r\nmodule.exports = router;\r\n\n\n//# sourceURL=webpack:///./src/routes/index.ts?");

/***/ }),

/***/ "./src/services/App.ts":
/*!*****************************!*\
  !*** ./src/services/App.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nvar __importStar = (this && this.__importStar) || function (mod) {\r\n    if (mod && mod.__esModule) return mod;\r\n    var result = {};\r\n    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];\r\n    result[\"default\"] = mod;\r\n    return result;\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\r\nvar bodyParser = __importStar(__webpack_require__(/*! body-parser */ \"body-parser\"));\r\nvar cors_1 = __importDefault(__webpack_require__(/*! cors */ \"cors\"));\r\nvar dotenv = __importStar(__webpack_require__(/*! dotenv */ \"dotenv\"));\r\nvar helmet_1 = __importDefault(__webpack_require__(/*! helmet */ \"helmet\"));\r\nvar routes_1 = __importDefault(__webpack_require__(/*! ../routes/ */ \"./src/routes/index.ts\"));\r\n/**\r\n * Classe App para configurações do server\r\n *\r\n * @author Jonatas Ramos\r\n */\r\nvar App = /** @class */ (function () {\r\n    function App() {\r\n        this.express = express_1.default();\r\n        this.middleware();\r\n        this.routes();\r\n        this.headers();\r\n        dotenv.config();\r\n    }\r\n    /**\r\n     * Definições de middler\r\n     */\r\n    App.prototype.middleware = function () {\r\n        this.express.use(helmet_1.default());\r\n        this.express.use(cors_1.default());\r\n        this.express.use(bodyParser.json());\r\n        this.express.use(bodyParser.urlencoded({ extended: false }));\r\n    };\r\n    /**\r\n     * Definições de header\r\n     */\r\n    App.prototype.headers = function () {\r\n        this.express.use(function (req, res, next) {\r\n            res.setHeader('Access-Control-Allow-Origin', '*');\r\n            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');\r\n            res.setHeader('Access-Control-Allow-Headers', 'content-type');\r\n            res.setHeader('Content-Type', 'application/json');\r\n            res.setHeader('Access-Control-Allow-Credentials', \"true\");\r\n        });\r\n    };\r\n    /**\r\n     * Definições de rotas\r\n     */\r\n    App.prototype.routes = function () {\r\n        // Rotas da api\r\n        this.express.use(\"/api\", routes_1.default);\r\n    };\r\n    return App;\r\n}());\r\nexports.default = new App().express;\r\n\n\n//# sourceURL=webpack:///./src/services/App.ts?");

/***/ })

};