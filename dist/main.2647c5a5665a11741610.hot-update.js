exports.id = "main";
exports.modules = {

/***/ "./src/services/Validations.ts":
/*!*************************************!*\
  !*** ./src/services/Validations.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar express_validation_1 = __webpack_require__(/*! express-validation */ \"./node_modules/express-validation/lib/index.js\");\r\n/**\r\n * Classe responsável pelas validações do sistema\r\n *\r\n * @author Jônatas Ramos\r\n */\r\nvar Validation = /** @class */ (function () {\r\n    function Validation() {\r\n    }\r\n    Validation.validateLetter = function () {\r\n        var letter = {\r\n            body: express_validation_1.Joi.object({\r\n                sender_name: express_validation_1.Joi.string()\r\n                    .regex(/^[a-zA-Z]+$/)\r\n                    .required()\r\n                    .message('Preencha o campo sender_name corretamente!'),\r\n                sender_adress: express_validation_1.Joi.string()\r\n                    .required()\r\n                    .message('Preencha o campo sender_adress corretamente!'),\r\n                text: express_validation_1.Joi.string()\r\n                    .required()\r\n                    .message('Preencha o campo text corretamente!'),\r\n                status: express_validation_1.Joi.number()\r\n                    .required()\r\n                    .message('Preencha o campo status corretamente!')\r\n            })\r\n        };\r\n        express_validation_1.validate(letter);\r\n    };\r\n    return Validation;\r\n}());\r\nexports.Validation = Validation;\r\n\n\n//# sourceURL=webpack:///./src/services/Validations.ts?");

/***/ })

};