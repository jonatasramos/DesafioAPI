exports.id = "main";
exports.modules = {

/***/ "./src/services/Validations.ts":
/*!*************************************!*\
  !*** ./src/services/Validations.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar express_validation_1 = __webpack_require__(/*! express-validation */ \"express-validation\");\r\n/**\r\n * Arquivo responsável pelas validações do sistema\r\n *\r\n * @author Jônatas Ramos\r\n */\r\n/**\r\n * Item com a validação criação de cartas\r\n */\r\nexports.validateLetterCreate = {\r\n    body: express_validation_1.Joi.object({\r\n        sender_name: express_validation_1.Joi.string()\r\n            .required()\r\n            .empty()\r\n            .min(3),\r\n        sender_adress: express_validation_1.Joi.string()\r\n            .required()\r\n            .empty()\r\n            .min(3),\r\n        text: express_validation_1.Joi.string()\r\n            .required()\r\n            .empty()\r\n            .min(10),\r\n        status: express_validation_1.Joi.number()\r\n            .required()\r\n            .empty()\r\n            .min(0)\r\n            .max(1),\r\n    })\r\n};\r\n/**\r\n * Item com a validação atualização de cartas\r\n */\r\nexports.validateLetterUpdate = {\r\n    body: express_validation_1.Joi.object({\r\n        id: express_validation_1.Joi.number()\r\n            .required()\r\n            .empty(),\r\n        sender_name: express_validation_1.Joi.string()\r\n            .required()\r\n            .empty()\r\n            .min(3),\r\n        sender_adress: express_validation_1.Joi.string()\r\n            .required()\r\n            .empty()\r\n            .min(3),\r\n        text: express_validation_1.Joi.string()\r\n            .required()\r\n            .empty()\r\n            .min(10),\r\n        status: express_validation_1.Joi.number()\r\n            .required()\r\n            .empty()\r\n            .min(0)\r\n            .max(1),\r\n    })\r\n};\r\n/**\r\n * Item com a validação atualização de cartas\r\n */\r\nexports.validateLetterDelete = {\r\n    body: express_validation_1.Joi.object({\r\n        id: express_validation_1.Joi.number()\r\n            .required()\r\n            .empty()\r\n    })\r\n};\r\n\n\n//# sourceURL=webpack:///./src/services/Validations.ts?");

/***/ })

};