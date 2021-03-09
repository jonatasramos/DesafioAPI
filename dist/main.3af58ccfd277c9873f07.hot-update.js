exports.id = "main";
exports.modules = {

/***/ "./src/services/Validations.ts":
/*!*************************************!*\
  !*** ./src/services/Validations.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar express_validation_1 = __webpack_require__(/*! express-validation */ \"./node_modules/express-validation/lib/index.js\");\r\n/**\r\n * Arquivo responsável pelas validações do sistema\r\n *\r\n * @author Jônatas Ramos\r\n */\r\n/**\r\n * Item com a validação de cartas\r\n */\r\nexports.validateLetter = {\r\n    body: express_validation_1.Joi.object({\r\n        sender_name: express_validation_1.Joi.string()\r\n            .regex(/^[a-zA-Z]+$/)\r\n            .required()\r\n            .empty()\r\n            .min(3)\r\n            .messages({\r\n            \"string.base\": \"\\\"username\\\" should be a type of 'text'\",\r\n            \"string.empty\": \"\\\"username\\\" cannot be an empty field\",\r\n            \"string.min\": \"\\\"username\\\" should have a minimum length of {#limit}\",\r\n            \"any.required\": \"\\\"username\\\" is a required field\"\r\n        }),\r\n        sender_adress: express_validation_1.Joi.string()\r\n            .required()\r\n            .empty()\r\n            .min(3)\r\n            .messages({\r\n            \"string.base\": \"\\\"username\\\" should be a type of 'text'\",\r\n            \"string.empty\": \"\\\"username\\\" cannot be an empty field\",\r\n            \"string.min\": \"\\\"username\\\" should have a minimum length of {#limit}\",\r\n            \"any.required\": \"\\\"username\\\" is a required field\"\r\n        }),\r\n        text: express_validation_1.Joi.string()\r\n            .required()\r\n            .empty()\r\n            .min(10)\r\n            .messages({\r\n            \"string.base\": \"\\\"username\\\" should be a type of 'text'\",\r\n            \"string.empty\": \"\\\"username\\\" cannot be an empty field\",\r\n            \"string.min\": \"\\\"username\\\" should have a minimum length of {#limit}\",\r\n            \"any.required\": \"\\\"username\\\" is a required field\"\r\n        }),\r\n        status: express_validation_1.Joi.number()\r\n            .required()\r\n            .empty()\r\n            .min(1)\r\n            .max(1)\r\n            .messages({\r\n            \"string.base\": \"\\\"username\\\" should be a type of 'text'\",\r\n            \"string.empty\": \"\\\"username\\\" cannot be an empty field\",\r\n            \"string.min\": \"\\\"username\\\" should have a minimum length of {#limit}\",\r\n            \"any.required\": \"\\\"username\\\" is a required field\"\r\n        }),\r\n    })\r\n};\r\n\n\n//# sourceURL=webpack:///./src/services/Validations.ts?");

/***/ })

};