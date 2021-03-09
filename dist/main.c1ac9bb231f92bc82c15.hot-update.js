exports.id = "main";
exports.modules = {

/***/ "./src/routes/index.ts":
/*!*****************************!*\
  !*** ./src/routes/index.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\n/**\r\n * Importa todas as rotas do sistema\r\n *\r\n * @author Jônatas Ramos\r\n */\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nvar express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\r\nvar router = express_1.default.Router();\r\n// Routes\r\nvar letter = __webpack_require__(/*! ./letter */ \"./src/routes/letter.ts\");\r\n//Rota para status da api\r\nrouter.get('/api_status', function (req, res) {\r\n    res.json({\r\n        status: \"ok\"\r\n    });\r\n});\r\n/**\r\n * Rota de Cartas.\r\n */\r\nrouter.use('/letter', letter);\r\nmodule.exports = router;\r\n\n\n//# sourceURL=webpack:///./src/routes/index.ts?");

/***/ }),

/***/ "./src/routes/letter.ts":
/*!******************************!*\
  !*** ./src/routes/letter.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\n/**\r\n * Manipulação das rotas de Cartas\r\n *\r\n * @author Jônatas Ramos\r\n */\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nvar express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\r\nvar router = express_1.default.Router();\r\n//Rota para status da api\r\nrouter.get('/create', function (req, res) {\r\n    res.json({\r\n        status: \"ok\"\r\n    });\r\n});\r\nmodule.exports = router;\r\n\n\n//# sourceURL=webpack:///./src/routes/letter.ts?");

/***/ }),

/***/ "./src/server/index.ts":
/*!*****************************!*\
  !*** ./src/server/index.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nvar __importStar = (this && this.__importStar) || function (mod) {\r\n    if (mod && mod.__esModule) return mod;\r\n    var result = {};\r\n    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];\r\n    result[\"default\"] = mod;\r\n    return result;\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar cors_1 = __importDefault(__webpack_require__(/*! cors */ \"cors\"));\r\nvar express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\r\nvar dotenv = __importStar(__webpack_require__(/*! dotenv */ \"dotenv\"));\r\nvar helmet_1 = __importDefault(__webpack_require__(/*! helmet */ \"helmet\"));\r\nvar productCRUD = __importStar(__webpack_require__(/*! ../product-crud-mongo */ \"./src/product-crud-mongo.ts\"));\r\nvar index_1 = __importDefault(__webpack_require__(/*! ../routes/index */ \"./src/routes/index.ts\"));\r\nvar Routes = express_1.default.Router();\r\ndotenv.config();\r\nif (!process.env.PORT) {\r\n    console.log(\"Erro na porta da aplicação.\");\r\n    process.exit(1);\r\n}\r\nvar PORT = parseInt(process.env.PORT, 10);\r\nvar app = express_1.default();\r\napp.use(helmet_1.default());\r\napp.use(cors_1.default());\r\napp.use(express_1.default.json());\r\nvar server = app.listen(PORT, function () {\r\n    console.log(\"Listening on port \" + PORT);\r\n});\r\napp.use(\"/api\", index_1.default);\r\napp.use(function (req, res, next) {\r\n    res.setHeader('Access-Control-Allow-Origin', '*');\r\n    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');\r\n    res.setHeader('Access-Control-Allow-Headers', 'content-type');\r\n    res.setHeader('Content-Type', 'application/json');\r\n    res.setHeader('Access-Control-Allow-Credentials', \"true\");\r\n});\r\n// Send message for default URL\r\nRoutes.get('/', function (req, res) { return res.send('Welcome to default response of Product API'); });\r\nRoutes.get('/products', productCRUD.getProductList);\r\nRoutes.post('/products', productCRUD.createProduct);\r\nRoutes.post('/updateproduct', productCRUD.updateroduct);\r\nRoutes.post('/deleteproduct', productCRUD.deleteproduct);\r\n\n\n//# sourceURL=webpack:///./src/server/index.ts?");

/***/ })

};