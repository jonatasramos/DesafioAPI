exports.id = "main";
exports.modules = {

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __importStar = (this && this.__importStar) || function (mod) {\r\n    if (mod && mod.__esModule) return mod;\r\n    var result = {};\r\n    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];\r\n    result[\"default\"] = mod;\r\n    return result;\r\n};\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar http = __importStar(__webpack_require__(/*! http */ \"http\"));\r\nvar App_1 = __importDefault(__webpack_require__(/*! ./services/App */ \"./src/services/App.ts\"));\r\nvar PORT = process.env.PORT || 8080;\r\nApp_1.default.set('port', PORT);\r\nvar server = http.createServer(App_1.default);\r\nserver.listen(PORT);\r\nserver.on('error', onError);\r\nserver.on('listening', onListening);\r\nfunction onError(error) {\r\n    if (error.syscall !== 'listen')\r\n        throw error;\r\n    console.error(\"ERROR: \" + error.code);\r\n    process.exit(1);\r\n}\r\nfunction onListening() {\r\n    var addr = server.address();\r\n    console.log(\"rodado na porta: \" + addr.port);\r\n}\r\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ }),

/***/ "./src/services/App.ts":
/*!*****************************!*\
  !*** ./src/services/App.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __importStar = (this && this.__importStar) || function (mod) {\r\n    if (mod && mod.__esModule) return mod;\r\n    var result = {};\r\n    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];\r\n    result[\"default\"] = mod;\r\n    return result;\r\n};\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar express = __importStar(__webpack_require__(/*! express */ \"express\"));\r\nvar bodyParser = __importStar(__webpack_require__(/*! body-parser */ \"body-parser\"));\r\nvar cors_1 = __importDefault(__webpack_require__(/*! cors */ \"cors\"));\r\nvar helmet_1 = __importDefault(__webpack_require__(/*! helmet */ \"helmet\"));\r\n/**\r\n * Classe App para configurações do server\r\n *\r\n * @author Jonatas Ramos\r\n */\r\nvar App = /** @class */ (function () {\r\n    function App() {\r\n        this.express = express();\r\n        this.middleware();\r\n        this.routes();\r\n        this.headers();\r\n    }\r\n    /**\r\n     * Definições de middler\r\n     */\r\n    App.prototype.middleware = function () {\r\n        this.express.use(helmet_1.default());\r\n        this.express.use(cors_1.default());\r\n        this.express.use(bodyParser.json());\r\n        this.express.use(bodyParser.urlencoded({ extended: false }));\r\n    };\r\n    /**\r\n     * Definições de header\r\n     */\r\n    App.prototype.headers = function () {\r\n        this.express.use(function (req, res, next) {\r\n            res.setHeader('Access-Control-Allow-Origin', '*');\r\n            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');\r\n            res.setHeader('Access-Control-Allow-Headers', 'content-type');\r\n            res.setHeader('Content-Type', 'application/json');\r\n            res.setHeader('Access-Control-Allow-Credentials', \"true\");\r\n        });\r\n    };\r\n    /**\r\n     * Definições de rotas\r\n     */\r\n    App.prototype.routes = function () {\r\n        var router = express.Router();\r\n        router.get('/', function (req, res, next) {\r\n            res.json({\r\n                message: 'Hello World!'\r\n            });\r\n        });\r\n        this.express.use('/', router);\r\n    };\r\n    return App;\r\n}());\r\nexports.default = new App().express;\r\n\n\n//# sourceURL=webpack:///./src/services/App.ts?");

/***/ })

};