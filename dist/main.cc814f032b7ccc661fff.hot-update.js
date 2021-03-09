exports.id = "main";
exports.modules = {

/***/ "./src/services/Database.ts":
/*!**********************************!*\
  !*** ./src/services/Database.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar mongodb_1 = __webpack_require__(/*! mongodb */ \"mongodb\");\r\nvar Database = /** @class */ (function () {\r\n    function Database() {\r\n        this.mongoClient = mongodb_1.MongoClient;\r\n        this.uri = process.env.MONGO;\r\n    }\r\n    Database.prototype.connect = function () {\r\n        var client = this.mongoClient(this.uri, { useNewUrlParser: true, useUnifiedTopology: true });\r\n        client.connect(function (c) {\r\n            // const collection = client.db(\"test\").collection(\"devices\");\r\n            console.log('Conectado com banco de dados!');\r\n            // perform actions on the collection object\r\n            client.close();\r\n        });\r\n    };\r\n    return Database;\r\n}());\r\nexports.default = new Database;\r\n\n\n//# sourceURL=webpack:///./src/services/Database.ts?");

/***/ })

};