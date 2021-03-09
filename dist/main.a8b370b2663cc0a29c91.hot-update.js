exports.id = "main";
exports.modules = {

/***/ "./src/routes/LetterRoute.ts":
/*!***********************************!*\
  !*** ./src/routes/LetterRoute.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nvar __generator = (this && this.__generator) || function (thisArg, body) {\r\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\r\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\r\n    function verb(n) { return function (v) { return step([n, v]); }; }\r\n    function step(op) {\r\n        if (f) throw new TypeError(\"Generator is already executing.\");\r\n        while (_) try {\r\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\r\n            if (y = 0, t) op = [op[0] & 2, t.value];\r\n            switch (op[0]) {\r\n                case 0: case 1: t = op; break;\r\n                case 4: _.label++; return { value: op[1], done: false };\r\n                case 5: _.label++; y = op[1]; op = [0]; continue;\r\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\r\n                default:\r\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\r\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\r\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\r\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\r\n                    if (t[2]) _.ops.pop();\r\n                    _.trys.pop(); continue;\r\n            }\r\n            op = body.call(thisArg, _);\r\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\r\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\r\n    }\r\n};\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar express_1 = __webpack_require__(/*! express */ \"express\");\r\nvar LetterController_1 = __importDefault(__webpack_require__(/*! ../controller/LetterController */ \"./src/controller/LetterController.ts\"));\r\n/**\r\n * Classe responsável pelas rotas das cartas\r\n *\r\n * @author Jônatas Ramos\r\n */\r\nvar LetterRoute = /** @class */ (function () {\r\n    function LetterRoute() {\r\n        this.router = express_1.Router();\r\n        this.init();\r\n    }\r\n    /**\r\n     * Pegas todas as cartas cadastradas\r\n     *\r\n     * @param {Request} req request\r\n     * @param {Response} res respose\r\n     */\r\n    LetterRoute.prototype.get = function (req, res) {\r\n        var id = req.body.id;\r\n        if (id) {\r\n            LetterController_1.default.getById(id).then(function (letter) {\r\n                res.json(letter);\r\n            });\r\n        }\r\n        else {\r\n            LetterController_1.default.get().then(function (letter) {\r\n                res.json(letter);\r\n            });\r\n        }\r\n    };\r\n    /**\r\n     * Cria uma nova carta\r\n     *\r\n     * @param {Request} req request\r\n     * @param {Response} res respose\r\n     */\r\n    LetterRoute.prototype.create = function (req, res) {\r\n        return __awaiter(this, void 0, void 0, function () {\r\n            return __generator(this, function (_a) {\r\n                LetterController_1.default.create();\r\n                res.json({\r\n                    status: \"ok\"\r\n                });\r\n                return [2 /*return*/];\r\n            });\r\n        });\r\n    };\r\n    /**\r\n     * Atualiza um ou mais itens da carta\r\n     *\r\n     * @param {Request} req request\r\n     * @param {Response} res respose\r\n     */\r\n    LetterRoute.prototype.update = function (req, res) {\r\n        return __awaiter(this, void 0, void 0, function () {\r\n            return __generator(this, function (_a) {\r\n                res.json({\r\n                    status: \"ok\"\r\n                });\r\n                return [2 /*return*/];\r\n            });\r\n        });\r\n    };\r\n    /**\r\n     * Exclui uma carta\r\n     *\r\n     * @param {Request} req request\r\n     * @param {Response} res respose\r\n     */\r\n    LetterRoute.prototype.destroy = function (req, res) {\r\n        return __awaiter(this, void 0, void 0, function () {\r\n            return __generator(this, function (_a) {\r\n                res.json({\r\n                    status: \"ok\"\r\n                });\r\n                return [2 /*return*/];\r\n            });\r\n        });\r\n    };\r\n    /**\r\n     * Inicia as rotas\r\n     */\r\n    LetterRoute.prototype.init = function () {\r\n        this.router.get('/', this.get);\r\n        this.router.post('/create', this.create);\r\n        this.router.put('/update', this.update);\r\n        this.router.delete('/destroy', this.destroy);\r\n    };\r\n    return LetterRoute;\r\n}());\r\nvar letterRouter = new LetterRoute;\r\nletterRouter.init();\r\nexports.default = letterRouter.router;\r\n\n\n//# sourceURL=webpack:///./src/routes/LetterRoute.ts?");

/***/ })

};