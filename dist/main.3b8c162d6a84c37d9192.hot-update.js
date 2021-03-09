exports.id = "main";
exports.modules = {

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __importStar = (this && this.__importStar) || function (mod) {\r\n    if (mod && mod.__esModule) return mod;\r\n    var result = {};\r\n    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];\r\n    result[\"default\"] = mod;\r\n    return result;\r\n};\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\n/**\r\n * Arquivo responsável por executar as configurações do servidor\r\n *\r\n * @author Jônatas Ramos\r\n */\r\nvar http = __importStar(__webpack_require__(/*! http */ \"http\"));\r\nvar App_1 = __importDefault(__webpack_require__(/*! ./services/App */ \"./src/services/App.ts\"));\r\nvar Database_1 = __importDefault(__webpack_require__(/*! ./services/Database */ \"./src/services/Database.ts\"));\r\nvar express_validation_1 = __webpack_require__(/*! express-validation */ \"express-validation\");\r\nvar PORT = process.env.PORT || 8080;\r\nApp_1.default.set('port', PORT);\r\nApp_1.default.use(function (err, req, res, next) {\r\n    // Retora o erro das validações\r\n    if (err instanceof express_validation_1.ValidationError) {\r\n        return res.status(err.statusCode).json(err);\r\n    }\r\n    return res.status(500).json(err);\r\n});\r\nvar server = http.createServer(App_1.default);\r\nserver.listen(PORT);\r\nserver.on('error', onError);\r\nserver.on('listening', onListening);\r\n// Executa a conexxão com o banco de dados\r\nDatabase_1.default.connect();\r\n/**\r\n * Tratamento de erros\r\n *\r\n * @param error\r\n */\r\nfunction onError(error) {\r\n    if (error.syscall !== 'listen')\r\n        throw error;\r\n    console.log(\"ERROR: \" + error.code);\r\n    process.exit(1);\r\n}\r\n/**\r\n * Configurações ao rodar o server\r\n */\r\nfunction onListening() {\r\n    var addr = server.address();\r\n    console.log(\"Server rodado na porta: \" + addr.port);\r\n}\r\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ }),

/***/ "./src/services/App.ts":
/*!*****************************!*\
  !*** ./src/services/App.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nvar __importStar = (this && this.__importStar) || function (mod) {\r\n    if (mod && mod.__esModule) return mod;\r\n    var result = {};\r\n    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];\r\n    result[\"default\"] = mod;\r\n    return result;\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\r\nvar bodyParser = __importStar(__webpack_require__(/*! body-parser */ \"body-parser\"));\r\nvar cors_1 = __importDefault(__webpack_require__(/*! cors */ \"cors\"));\r\nvar dotenv = __importStar(__webpack_require__(/*! dotenv */ \"dotenv\"));\r\nvar helmet_1 = __importDefault(__webpack_require__(/*! helmet */ \"helmet\"));\r\nvar routes_1 = __importDefault(__webpack_require__(/*! ../routes/ */ \"./src/routes/index.ts\"));\r\ndotenv.config({\r\n    path:  false ? undefined : \".env\"\r\n}); /**\r\n * Classe App para configurações do server\r\n *\r\n * @author Jonatas Ramos\r\n */\r\nvar App = /** @class */ (function () {\r\n    function App() {\r\n        this.express = express_1.default();\r\n        this.middleware();\r\n        this.routes();\r\n        this.headers();\r\n        dotenv.config();\r\n    }\r\n    /**\r\n     * Definições de middler\r\n     */\r\n    App.prototype.middleware = function () {\r\n        this.express.use(helmet_1.default());\r\n        this.express.use(cors_1.default());\r\n        this.express.use(bodyParser.json());\r\n        this.express.use(bodyParser.urlencoded({ extended: false }));\r\n    };\r\n    /**\r\n     * Definições de header\r\n     */\r\n    App.prototype.headers = function () {\r\n        this.express.use(function (req, res, next) {\r\n            res.setHeader('Access-Control-Allow-Origin', '*');\r\n            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');\r\n            res.setHeader('Access-Control-Allow-Headers', 'content-type');\r\n            res.setHeader('Content-Type', 'application/json');\r\n            res.setHeader('Access-Control-Allow-Credentials', \"true\");\r\n        });\r\n    };\r\n    /**\r\n     * Definições de rotas\r\n     */\r\n    App.prototype.routes = function () {\r\n        // Rotas da api\r\n        this.express.use(\"/api\", routes_1.default);\r\n    };\r\n    return App;\r\n}());\r\nexports.default = new App().express;\r\n\n\n//# sourceURL=webpack:///./src/services/App.ts?");

/***/ })

};