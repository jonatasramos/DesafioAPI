exports.id = "main";
exports.modules = {

/***/ "./src/server/index.ts":
/*!*****************************!*\
  !*** ./src/server/index.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nvar __importStar = (this && this.__importStar) || function (mod) {\r\n    if (mod && mod.__esModule) return mod;\r\n    var result = {};\r\n    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];\r\n    result[\"default\"] = mod;\r\n    return result;\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar cors_1 = __importDefault(__webpack_require__(/*! cors */ \"cors\"));\r\nvar express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\r\nvar dotenv = __importStar(__webpack_require__(/*! dotenv */ \"dotenv\"));\r\nvar helmet_1 = __importDefault(__webpack_require__(/*! helmet */ \"helmet\"));\r\nvar routes_1 = __importDefault(__webpack_require__(/*! ../routes/ */ \"./src/routes/index.ts\"));\r\nvar app = express_1.default();\r\ndotenv.config();\r\nif (!process.env.PORT) {\r\n    console.log(\"Erro na porta da aplicação.\");\r\n    process.exit(1);\r\n}\r\nvar PORT = +process.env.PORT;\r\napp.use(helmet_1.default());\r\napp.use(cors_1.default());\r\napp.use(express_1.default.json());\r\nvar server = app.listen(PORT, function () {\r\n    console.log(\"Rodando na porta \" + PORT);\r\n});\r\napp.use(\"/api\", routes_1.default);\r\napp.use(function (req, res, next) {\r\n    res.setHeader('Access-Control-Allow-Origin', '*');\r\n    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');\r\n    res.setHeader('Access-Control-Allow-Headers', 'content-type');\r\n    res.setHeader('Content-Type', 'application/json');\r\n    res.setHeader('Access-Control-Allow-Credentials', \"true\");\r\n});\r\n// Routes.get('/products', productCRUD.getProductList);\r\n// Routes.post('/products', productCRUD.createProduct);\r\n// Routes.post('/updateproduct', productCRUD.updateroduct);\r\n// Routes.post('/deleteproduct', productCRUD.deleteproduct);\r\n\n\n//# sourceURL=webpack:///./src/server/index.ts?");

/***/ })

};