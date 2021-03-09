exports.id = "main";
exports.modules = {

/***/ "./src/models/LetterModel.ts":
/*!***********************************!*\
  !*** ./src/models/LetterModel.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar mongoose_1 = __importDefault(__webpack_require__(/*! mongoose */ \"mongoose\"));\r\nvar schemaOptions = {\r\n    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },\r\n};\r\n/**\r\n * Schema model Letter\r\n */\r\nexports.Letter = new Schema({\r\n    sender_name: {\r\n        type: Schema.Types.String, required: true\r\n    },\r\n    sender_adress: {\r\n        type: Schema.Types.String, required: true\r\n    },\r\n    text: {\r\n        type: Schema.Types.String, required: true\r\n    },\r\n    status: {\r\n        type: Schema.Types.Number, required: true\r\n    }\r\n}, schemaOptions);\r\nvar letter = mongoose_1.default.model(\"letter\", exports.Letter);\r\nexports.default = letter;\r\n\n\n//# sourceURL=webpack:///./src/models/LetterModel.ts?");

/***/ })

};