exports.id = "main";
exports.modules = {

/***/ "./src/models/LetterModel.ts":
/*!***********************************!*\
  !*** ./src/models/LetterModel.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar mongoose_1 = __webpack_require__(/*! mongoose */ \"mongoose\");\r\nvar mongoose_2 = __importDefault(__webpack_require__(/*! mongoose */ \"mongoose\"));\r\nvar mongoose_auto_increment_1 = __importDefault(__webpack_require__(/*! mongoose-auto-increment */ \"mongoose-auto-increment\"));\r\nvar schemaOptions = {\r\n    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },\r\n};\r\n/**\r\n * Schema model Letter\r\n */\r\nvar LetterModel = new mongoose_1.Schema({\r\n    id: {\r\n        type: mongoose_1.Schema.Types.Number,\r\n        required: true,\r\n        unique: true,\r\n        min: 1\r\n    },\r\n    sender_name: {\r\n        type: mongoose_1.Schema.Types.String, required: true\r\n    },\r\n    sender_adress: {\r\n        type: mongoose_1.Schema.Types.String, required: true\r\n    },\r\n    text: {\r\n        type: mongoose_1.Schema.Types.String, required: true\r\n    },\r\n    status: {\r\n        type: mongoose_1.Schema.Types.Number, required: true\r\n    }\r\n}, schemaOptions);\r\nmongoose_auto_increment_1.default.initialize(mongoose_2.default.connection);\r\nLetterModel.plugin(mongoose_auto_increment_1.default.plugin, {\r\n    model: \"letter\",\r\n    field: \"id\",\r\n    startAt: 1,\r\n});\r\nvar letterModel = mongoose_2.default.model(\"letter\", LetterModel, \"letter\");\r\nexports.default = letterModel;\r\n\n\n//# sourceURL=webpack:///./src/models/LetterModel.ts?");

/***/ })

};