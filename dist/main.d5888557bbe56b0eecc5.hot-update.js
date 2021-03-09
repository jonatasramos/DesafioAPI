exports.id = "main";
exports.modules = {

/***/ "./src/services/Validations.ts":
/*!*************************************!*\
  !*** ./src/services/Validations.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar express_validation_1 = __webpack_require__(/*! express-validation */ \"express-validation\");\r\n/**\r\n * Arquivo responsável pelas validações do sistema\r\n *\r\n * @author Jônatas Ramos\r\n */\r\n/**\r\n * Item com a validação de cartas\r\n */\r\nexports.validateLetter = {\r\n    body: express_validation_1.Joi.object({\r\n        sender_name: express_validation_1.Joi.string()\r\n            .required()\r\n            .empty()\r\n            .min(3)\r\n            .messages({\r\n            \"string.base\": \"\\\"sender_name\\\" deve ser do tipo 'text'\",\r\n            \"string.empty\": \"\\\"sender_name\\\" n\\u00E3o deve ser vazio\",\r\n            \"string.min\": \"\\\"sender_name\\\" n\\u00E3o deve ter o valor menor que {#limit}\",\r\n            \"any.required\": \"\\\"sender_name\\\" \\u00E9 obrigat\\u00F3rio\"\r\n        }),\r\n        sender_adress: express_validation_1.Joi.string()\r\n            .required()\r\n            .empty()\r\n            .min(3)\r\n            .messages({\r\n            \"string.base\": \"\\\"sender_adress\\\" deve ser do tipo 'text'\",\r\n            \"string.empty\": \"\\\"sender_adress\\\" n\\u00E3o deve ser vazio\",\r\n            \"string.min\": \"\\\"sender_adress\\\" n\\u00E3o deve ter o valor menor que {#limit}\",\r\n            \"any.required\": \"\\\"sender_adress\\\" \\u00E9 obrigat\\u00F3rio\"\r\n        }),\r\n        text: express_validation_1.Joi.string()\r\n            .required()\r\n            .empty()\r\n            .min(10)\r\n            .messages({\r\n            \"string.base\": \"\\\"text\\\" deve ser do tipo 'text'\",\r\n            \"string.empty\": \"\\\"text\\\" n\\u00E3o deve ser vazio\",\r\n            \"string.min\": \"\\\"text\\\" n\\u00E3o deve ter o valor menor que {#limit}\",\r\n            \"any.required\": \"\\\"text\\\" \\u00E9 obrigat\\u00F3rio\"\r\n        }),\r\n        status: express_validation_1.Joi.number()\r\n            .required()\r\n            .empty()\r\n            .min(0)\r\n            .max(1)\r\n            .messages({\r\n            \"string.base\": \"\\\"status\\\" 'number'\",\r\n            \"string.empty\": \"\\\"status\\\" n\\u00E3o deve ser vazio\",\r\n            \"string.min\": \"\\\"status\\\" n\\u00E3o deve ter o valor menor que {#limit}\",\r\n            \"string.max\": \"\\\"status\\\" n\\u00E3o deve ter o valor maior que {#limit}\",\r\n            \"any.required\": \"\\\"status\\\" \\u00E9 obrigat\\u00F3rio\"\r\n        }),\r\n    })\r\n};\r\n\n\n//# sourceURL=webpack:///./src/services/Validations.ts?");

/***/ })

};