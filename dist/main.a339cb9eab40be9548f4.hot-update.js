exports.id = "main";
exports.modules = {

/***/ "./src/controller/LetterController.ts":
/*!********************************************!*\
  !*** ./src/controller/LetterController.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nvar __generator = (this && this.__generator) || function (thisArg, body) {\r\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\r\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\r\n    function verb(n) { return function (v) { return step([n, v]); }; }\r\n    function step(op) {\r\n        if (f) throw new TypeError(\"Generator is already executing.\");\r\n        while (_) try {\r\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\r\n            if (y = 0, t) op = [op[0] & 2, t.value];\r\n            switch (op[0]) {\r\n                case 0: case 1: t = op; break;\r\n                case 4: _.label++; return { value: op[1], done: false };\r\n                case 5: _.label++; y = op[1]; op = [0]; continue;\r\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\r\n                default:\r\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\r\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\r\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\r\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\r\n                    if (t[2]) _.ops.pop();\r\n                    _.trys.pop(); continue;\r\n            }\r\n            op = body.call(thisArg, _);\r\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\r\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\r\n    }\r\n};\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar LetterModel_1 = __importDefault(__webpack_require__(/*! ../models/LetterModel */ \"./src/models/LetterModel.ts\"));\r\n/**\r\n * Class Controller de cartas\r\n *\r\n * @author Jônatas Ramos\r\n */\r\nvar LetterController = /** @class */ (function () {\r\n    function LetterController() {\r\n    }\r\n    // private db: any = LetterModel;\r\n    /**\r\n     * Pegas todas as cartas do sistema\r\n     *\r\n     * @return {Object} cards\r\n     */\r\n    LetterController.prototype.get = function () {\r\n        return __awaiter(this, void 0, void 0, function () {\r\n            return __generator(this, function (_a) {\r\n                LetterModel_1.default.find(function (err, result) {\r\n                    if (err) {\r\n                        return [];\r\n                    }\r\n                    else {\r\n                        return result;\r\n                    }\r\n                });\r\n                return [2 /*return*/];\r\n            });\r\n        });\r\n    };\r\n    ;\r\n    /**\r\n     * Retorna uma carta pelo id\r\n     *\r\n     * @param {Number} id\r\n     * @return {Object} letter\r\n     */\r\n    // public async getById(id:number): Promise<Letter[]> {\r\n    // };\r\n    /**\r\n     * Cria uma nova carta\r\n     *\r\n     * @param {Object} letter\r\n     * @return {Object} new_letter\r\n     */\r\n    LetterController.prototype.create = function (letter) {\r\n        return __awaiter(this, void 0, void 0, function () {\r\n            var letter_1;\r\n            return __generator(this, function (_a) {\r\n                try {\r\n                    letter_1 = new LetterModel_1.default({\r\n                        sender_name: 'Jonatas',\r\n                        sender_adress: 'Rua Reforma agraria',\r\n                        text: 'Carta para o papai noel',\r\n                        status: 1,\r\n                    });\r\n                    letter_1.save(function (err, result) {\r\n                        console.log(err);\r\n                    });\r\n                }\r\n                catch (error) {\r\n                    // return {error: error};\r\n                }\r\n                return [2 /*return*/];\r\n            });\r\n        });\r\n    };\r\n    /**\r\n     * Atualiza uma carta\r\n     *\r\n     * @param {Object} letter\r\n     * @return {String} status\r\n     */\r\n    LetterController.prototype.update = function (letter) {\r\n        return __awaiter(this, void 0, void 0, function () {\r\n            return __generator(this, function (_a) {\r\n                return [2 /*return*/];\r\n            });\r\n        });\r\n    };\r\n    /**\r\n     * Remove uma carta do banco de dados\r\n     *\r\n     * @param {Object} id\r\n     * @return {String} status\r\n     */\r\n    LetterController.prototype.destroy = function (id) {\r\n        return __awaiter(this, void 0, void 0, function () {\r\n            return __generator(this, function (_a) {\r\n                return [2 /*return*/];\r\n            });\r\n        });\r\n    };\r\n    return LetterController;\r\n}());\r\nexports.default = new LetterController;\r\n\n\n//# sourceURL=webpack:///./src/controller/LetterController.ts?");

/***/ })

};