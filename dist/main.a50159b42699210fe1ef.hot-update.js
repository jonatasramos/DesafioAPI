exports.id = "main";
exports.modules = {

/***/ "./src/routes/index.ts":
/*!*****************************!*\
  !*** ./src/routes/index.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\n/**\r\n * Importa todas as rotas do sistema\r\n *\r\n * @author Jônatas Ramos\r\n */\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nvar express_1 = __webpack_require__(/*! express */ \"express\");\r\nvar LetterRoute_1 = __importDefault(__webpack_require__(/*! ./LetterRoute */ \"./src/routes/LetterRoute.ts\"));\r\nvar AuthenticateRoute_1 = __importDefault(__webpack_require__(/*! ./AuthenticateRoute */ \"./src/routes/AuthenticateRoute.ts\"));\r\nvar Jwt_1 = __importDefault(__webpack_require__(/*! ../services/Jwt */ \"./src/services/Jwt.ts\"));\r\nvar router = express_1.Router();\r\n/**\r\n * Rota para status da api\r\n *\r\n * @param {Request} req request\r\n * @param {Response} res response\r\n */\r\nrouter.get('/api_status', Jwt_1.default.auth, function (req, res) {\r\n    res.json({\r\n        status: \"ok\"\r\n    });\r\n});\r\nrouter.get('/docs', function (req, res) {\r\n    console.log('aqui');\r\n    res.sendFile('src/docs/index.html', { root: '../../' });\r\n});\r\n/**\r\n * Rota de Cartas\r\n */\r\nrouter.use('/letter', LetterRoute_1.default);\r\n/**\r\n * Rota Autenticação\r\n */\r\nrouter.use('/auth', AuthenticateRoute_1.default);\r\nmodule.exports = router;\r\n\n\n//# sourceURL=webpack:///./src/routes/index.ts?");

/***/ }),

/***/ "./src/services/App.ts":
/*!*****************************!*\
  !*** ./src/services/App.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nvar __importStar = (this && this.__importStar) || function (mod) {\r\n    if (mod && mod.__esModule) return mod;\r\n    var result = {};\r\n    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];\r\n    result[\"default\"] = mod;\r\n    return result;\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\r\nvar bodyParser = __importStar(__webpack_require__(/*! body-parser */ \"body-parser\"));\r\nvar cors_1 = __importDefault(__webpack_require__(/*! cors */ \"cors\"));\r\nvar dotenv = __importStar(__webpack_require__(/*! dotenv */ \"dotenv\"));\r\nvar helmet_1 = __importDefault(__webpack_require__(/*! helmet */ \"helmet\"));\r\nvar routes_1 = __importDefault(__webpack_require__(/*! ../routes/ */ \"./src/routes/index.ts\"));\r\ndotenv.config({\r\n    path:  false ? undefined : \".env\"\r\n});\r\n/**\r\n * Classe App para configurações do server\r\n *\r\n * @author Jonatas Ramos\r\n */\r\nvar App = /** @class */ (function () {\r\n    function App() {\r\n        this.express = express_1.default();\r\n        this.middleware();\r\n        this.routes();\r\n        this.headers();\r\n        dotenv.config();\r\n    }\r\n    /**\r\n     * Definições de middler\r\n     */\r\n    App.prototype.middleware = function () {\r\n        this.express.use(helmet_1.default());\r\n        this.express.use(cors_1.default());\r\n        this.express.use(bodyParser.json());\r\n        this.express.use(bodyParser.urlencoded({ extended: false }));\r\n    };\r\n    /**\r\n     * Definições de header\r\n     */\r\n    App.prototype.headers = function () {\r\n        this.express.use(function (req, res, next) {\r\n            res.setHeader('Access-Control-Allow-Origin', '*');\r\n            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');\r\n            res.setHeader('Access-Control-Allow-Headers', 'content-type');\r\n            res.setHeader('Content-Type', 'application/json');\r\n            res.setHeader('Access-Control-Allow-Credentials', \"true\");\r\n        });\r\n    };\r\n    /**\r\n     * Definições de rotas\r\n     */\r\n    App.prototype.routes = function () {\r\n        // Rotas da api\r\n        this.express.use(\"/api\", routes_1.default);\r\n    };\r\n    return App;\r\n}());\r\nexports.default = new App().express;\r\n\n\n//# sourceURL=webpack:///./src/services/App.ts?");

/***/ })

};