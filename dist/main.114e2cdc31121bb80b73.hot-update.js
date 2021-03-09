exports.id = "main";
exports.modules = {

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __importStar = (this && this.__importStar) || function (mod) {\r\n    if (mod && mod.__esModule) return mod;\r\n    var result = {};\r\n    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];\r\n    result[\"default\"] = mod;\r\n    return result;\r\n};\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\n/**\r\n * Arquivo responsável por executar as configurações do servidor\r\n *\r\n * @author Jônatas Ramos\r\n */\r\nvar http = __importStar(__webpack_require__(/*! http */ \"http\"));\r\nvar App_1 = __importDefault(__webpack_require__(/*! ./services/App */ \"./src/services/App.ts\"));\r\nvar Database_1 = __importDefault(__webpack_require__(/*! ./services/Database */ \"./src/services/Database.ts\"));\r\nvar express_validation_1 = __webpack_require__(/*! express-validation */ \"./node_modules/express-validation/lib/index.js\");\r\nvar PORT = process.env.PORT || 8080;\r\nApp_1.default.set('port', PORT);\r\nApp_1.default.use(function (err, req, res, next) {\r\n    if (err instanceof express_validation_1.ValidationError) {\r\n        return res.status(err.statusCode).json(err);\r\n    }\r\n    return res.status(500).json(err);\r\n});\r\nvar server = http.createServer(App_1.default);\r\nserver.listen(PORT);\r\nserver.on('error', onError);\r\nserver.on('listening', onListening);\r\n// Executa a conexxão com o banco de dados\r\nDatabase_1.default.connect();\r\n/**\r\n * Tratamento de erros\r\n *\r\n * @param error\r\n */\r\nfunction onError(error) {\r\n    if (error.syscall !== 'listen')\r\n        throw error;\r\n    console.error(\"ERROR: \" + error.code);\r\n    process.exit(1);\r\n}\r\n/**\r\n * Configurações ao rodar o server\r\n */\r\nfunction onListening() {\r\n    var addr = server.address();\r\n    console.log(\"rodado na porta: \" + addr.port);\r\n}\r\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ })

};