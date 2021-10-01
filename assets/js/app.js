/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/ts-loader/index.js??clonedRuleSet-1!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[5].use[0]!./src/test.vue?vue&type=script&lang=ts":
/*!*********************************************************************************************************************************************************************!*\
  !*** ./node_modules/ts-loader/index.js??clonedRuleSet-1!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[5].use[0]!./src/test.vue?vue&type=script&lang=ts ***!
  \*********************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nvar vue_1 = __webpack_require__(/*! vue */ \"./node_modules/vue/index.js\");\r\n// import { initializeApp } from \"firebase/app\";\r\nvar auth_repository_1 = __webpack_require__(/*! ./model/auth.repository */ \"./src/model/auth.repository.ts\");\r\nvar item_repository_1 = __webpack_require__(/*! ./model/item.repository */ \"./src/model/item.repository.ts\");\r\nvar item_use_case_1 = __webpack_require__(/*! ./model/item.use-case */ \"./src/model/item.use-case.ts\");\r\n// import * as admin from 'firebase-admin';\r\nexports[\"default\"] = (0, vue_1.defineComponent)({\r\n    setup: function () {\r\n        var login = function () {\r\n            auth_repository_1.AuthRepository.signIn();\r\n        };\r\n        var register = function () {\r\n            auth_repository_1.AuthRepository.signUp();\r\n        };\r\n        var itemName = (0, vue_1.ref)();\r\n        var itemPrice = (0, vue_1.ref)();\r\n        var items = (0, vue_1.ref)();\r\n        item_repository_1.ItemRepository.getItem(\"userID\").then(function (value) {\r\n            console.log(value);\r\n            items.value = value;\r\n        });\r\n        var registerItem = function () {\r\n            (0, item_use_case_1.saveItem)(itemName.value, itemPrice.value);\r\n            alert('新規登録完了');\r\n        };\r\n        var updateItem = function (a, b) {\r\n            console.log(items.value, a, b);\r\n            // console.log(items.value[a].name,b)\r\n            // console.log(a,b)\r\n            // saveItem()\r\n        };\r\n        // let updateItem = ()=>{\r\n        //   saveItem(itemName.value,itemPrice.value,id)\r\n        //   alert('登録完了')\r\n        // }\r\n        var get = function () {\r\n            item_repository_1.ItemRepository.getItem(\"userID\").then(function (value) {\r\n                items.value = value;\r\n            });\r\n        };\r\n        return {\r\n            items: items,\r\n            login: login,\r\n            register: register,\r\n            registerItem: registerItem,\r\n            itemName: itemName,\r\n            itemPrice: itemPrice,\r\n            get: get,\r\n            updateItem: updateItem\r\n        };\r\n    },\r\n});\r\n\n\n//# sourceURL=webpack://buy-list/./src/test.vue?./node_modules/ts-loader/index.js??clonedRuleSet-1!./node_modules/vue-loader/dist/index.js??ruleSet%5B1%5D.rules%5B5%5D.use%5B0%5D");

/***/ }),

/***/ "./node_modules/ts-loader/index.js??clonedRuleSet-1!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[5].use[0]!./src/test.vue?vue&type=template&id=0f72a62a&ts=true":
/*!*********************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/ts-loader/index.js??clonedRuleSet-1!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[5].use[0]!./src/test.vue?vue&type=template&id=0f72a62a&ts=true ***!
  \*********************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.render = void 0;\r\nvar vue_1 = __webpack_require__(/*! vue */ \"./node_modules/vue/index.js\");\r\nvar _hoisted_1 = /*#__PURE__*/ (0, vue_1.createElementVNode)(\"br\", null, null, -1 /* HOISTED */);\r\nvar _hoisted_2 = /*#__PURE__*/ (0, vue_1.createElementVNode)(\"br\", null, null, -1 /* HOISTED */);\r\nvar _hoisted_3 = { class: \"mb-3\" };\r\nvar _hoisted_4 = /*#__PURE__*/ (0, vue_1.createElementVNode)(\"label\", {\r\n    for: \"exampleFormControlInput1\",\r\n    class: \"form-label\"\r\n}, \"品目名\", -1 /* HOISTED */);\r\nvar _hoisted_5 = { class: \"mb-3\" };\r\nvar _hoisted_6 = /*#__PURE__*/ (0, vue_1.createElementVNode)(\"label\", {\r\n    for: \"exampleFormControlInput1\",\r\n    class: \"form-label\"\r\n}, \"価格\", -1 /* HOISTED */);\r\nvar _hoisted_7 = { class: \"table\" };\r\nvar _hoisted_8 = /*#__PURE__*/ (0, vue_1.createElementVNode)(\"thead\", null, [\r\n    /*#__PURE__*/ (0, vue_1.createElementVNode)(\"tr\", null, [\r\n        /*#__PURE__*/ (0, vue_1.createElementVNode)(\"th\", { scope: \"col\" }, \"#\"),\r\n        /*#__PURE__*/ (0, vue_1.createElementVNode)(\"th\", { scope: \"col\" }, \"名前\"),\r\n        /*#__PURE__*/ (0, vue_1.createElementVNode)(\"th\", { scope: \"col\" }, \"価格\"),\r\n        /*#__PURE__*/ (0, vue_1.createCommentVNode)(\" <th scope=\\\"col\\\">Handle</th> \")\r\n    ])\r\n], -1 /* HOISTED */);\r\nvar _hoisted_9 = { scope: \"row\" };\r\nvar _hoisted_10 = [\"onUpdate:modelValue\", \"onChange\"];\r\nvar _hoisted_11 = /*#__PURE__*/ (0, vue_1.createElementVNode)(\"div\", { class: \"container\" }, [\r\n    /*#__PURE__*/ (0, vue_1.createElementVNode)(\"div\", {\r\n        class: \"btn-group\",\r\n        role: \"group\",\r\n        \"aria-label\": \"Basic outlined example\"\r\n    }, [\r\n        /*#__PURE__*/ (0, vue_1.createElementVNode)(\"button\", {\r\n            type: \"button\",\r\n            class: \"btn btn-outline-primary\"\r\n        }, \"Left\"),\r\n        /*#__PURE__*/ (0, vue_1.createElementVNode)(\"button\", {\r\n            type: \"button\",\r\n            class: \"btn btn-outline-primary\"\r\n        }, \"Middle\"),\r\n        /*#__PURE__*/ (0, vue_1.createElementVNode)(\"button\", {\r\n            type: \"button\",\r\n            class: \"btn btn-outline-primary\"\r\n        }, \"Right\"),\r\n        /*#__PURE__*/ (0, vue_1.createElementVNode)(\"button\", {\r\n            type: \"button\",\r\n            class: \"btn btn-outline-primary\"\r\n        }, \"Right\"),\r\n        /*#__PURE__*/ (0, vue_1.createElementVNode)(\"button\", {\r\n            type: \"button\",\r\n            class: \"btn btn-outline-primary\"\r\n        }, \"Right\")\r\n    ]),\r\n    /*#__PURE__*/ (0, vue_1.createElementVNode)(\"div\", {\r\n        class: \"btn-group\",\r\n        role: \"group\",\r\n        \"aria-label\": \"Basic outlined example\"\r\n    }, [\r\n        /*#__PURE__*/ (0, vue_1.createElementVNode)(\"button\", {\r\n            type: \"button\",\r\n            class: \"btn btn-outline-primary btn-lg\"\r\n        }, \"Left\"),\r\n        /*#__PURE__*/ (0, vue_1.createElementVNode)(\"button\", {\r\n            type: \"button\",\r\n            class: \"btn btn-outline-primary btn-lg\"\r\n        }, \"Middle\"),\r\n        /*#__PURE__*/ (0, vue_1.createElementVNode)(\"button\", {\r\n            type: \"button\",\r\n            class: \"btn btn-outline-primary btn-lg\"\r\n        }, \"Right\"),\r\n        /*#__PURE__*/ (0, vue_1.createElementVNode)(\"button\", {\r\n            type: \"button\",\r\n            class: \"btn btn-outline-primary btn-lg\"\r\n        }, \"Right\"),\r\n        /*#__PURE__*/ (0, vue_1.createElementVNode)(\"button\", {\r\n            type: \"button\",\r\n            class: \"btn btn-outline-primary btn-lg\"\r\n        }, \"Right\")\r\n    ])\r\n], -1 /* HOISTED */);\r\nfunction render(_ctx, _cache, $props, $setup, $data, $options) {\r\n    return ((0, vue_1.openBlock)(), (0, vue_1.createElementBlock)(vue_1.Fragment, null, [\r\n        (0, vue_1.createElementVNode)(\"button\", {\r\n            onClick: _cache[0] || (_cache[0] =\r\n                //@ts-ignore\r\n                function () {\r\n                    var args = [];\r\n                    for (var _i = 0; _i < arguments.length; _i++) {\r\n                        args[_i] = arguments[_i];\r\n                    }\r\n                    return (_ctx.login && _ctx.login.apply(_ctx, args));\r\n                })\r\n        }, \"login\"),\r\n        (0, vue_1.createElementVNode)(\"button\", {\r\n            onClick: _cache[1] || (_cache[1] =\r\n                //@ts-ignore\r\n                function () {\r\n                    var args = [];\r\n                    for (var _i = 0; _i < arguments.length; _i++) {\r\n                        args[_i] = arguments[_i];\r\n                    }\r\n                    return (_ctx.read && _ctx.read.apply(_ctx, args));\r\n                })\r\n        }, \"read\"),\r\n        (0, vue_1.createElementVNode)(\"button\", {\r\n            onClick: _cache[2] || (_cache[2] =\r\n                //@ts-ignore\r\n                function () {\r\n                    var args = [];\r\n                    for (var _i = 0; _i < arguments.length; _i++) {\r\n                        args[_i] = arguments[_i];\r\n                    }\r\n                    return (_ctx.register && _ctx.register.apply(_ctx, args));\r\n                })\r\n        }, \"register\"),\r\n        _hoisted_1,\r\n        _hoisted_2,\r\n        (0, vue_1.createElementVNode)(\"div\", _hoisted_3, [\r\n            _hoisted_4,\r\n            (0, vue_1.withDirectives)((0, vue_1.createElementVNode)(\"input\", {\r\n                type: \"text\",\r\n                class: \"form-control\",\r\n                \"onUpdate:modelValue\": _cache[3] || (_cache[3] = function ($event) { return ((_ctx.itemName) = $event); })\r\n            }, null, 512 /* NEED_PATCH */), [\r\n                [vue_1.vModelText, _ctx.itemName]\r\n            ])\r\n        ]),\r\n        (0, vue_1.createElementVNode)(\"div\", _hoisted_5, [\r\n            _hoisted_6,\r\n            (0, vue_1.withDirectives)((0, vue_1.createElementVNode)(\"input\", {\r\n                type: \"text\",\r\n                class: \"form-control\",\r\n                \"onUpdate:modelValue\": _cache[4] || (_cache[4] = function ($event) { return ((_ctx.itemPrice) = $event); })\r\n            }, null, 512 /* NEED_PATCH */), [\r\n                [vue_1.vModelText, _ctx.itemPrice]\r\n            ])\r\n        ]),\r\n        (0, vue_1.createElementVNode)(\"button\", {\r\n            type: \"button\",\r\n            class: \"btn btn btn-primary btn-lg\",\r\n            onClick: _cache[5] || (_cache[5] =\r\n                //@ts-ignore\r\n                function () {\r\n                    var args = [];\r\n                    for (var _i = 0; _i < arguments.length; _i++) {\r\n                        args[_i] = arguments[_i];\r\n                    }\r\n                    return (_ctx.registerItem && _ctx.registerItem.apply(_ctx, args));\r\n                })\r\n        }, \"新規登録\"),\r\n        (0, vue_1.createTextVNode)(\" \" + (0, vue_1.toDisplayString)(_ctx.items) + \" \", 1 /* TEXT */),\r\n        (0, vue_1.createElementVNode)(\"table\", _hoisted_7, [\r\n            _hoisted_8,\r\n            ((0, vue_1.openBlock)(true), (0, vue_1.createElementBlock)(vue_1.Fragment, null, (0, vue_1.renderList)(_ctx.items, function (item) {\r\n                return ((0, vue_1.openBlock)(), (0, vue_1.createElementBlock)(\"tbody\", {\r\n                    key: item.id\r\n                }, [\r\n                    (0, vue_1.createElementVNode)(\"tr\", null, [\r\n                        (0, vue_1.createElementVNode)(\"th\", _hoisted_9, (0, vue_1.toDisplayString)(item.id), 1 /* TEXT */),\r\n                        (0, vue_1.createElementVNode)(\"td\", null, [\r\n                            (0, vue_1.withDirectives)((0, vue_1.createElementVNode)(\"input\", {\r\n                                \"onUpdate:modelValue\": function ($event) { return ((item.name) = $event); },\r\n                                onChange: function ($event) { return (_ctx.updateItem(item.id, item.name)); }\r\n                            }, null, 40 /* PROPS, HYDRATE_EVENTS */, _hoisted_10), [\r\n                                [vue_1.vModelText, item.name]\r\n                            ])\r\n                        ]),\r\n                        (0, vue_1.createElementVNode)(\"td\", null, (0, vue_1.toDisplayString)(item.price), 1 /* TEXT */),\r\n                        (0, vue_1.createCommentVNode)(\" <button type=\\\"button\\\" class=\\\"btn btn btn-primary btn-lg\\\" v-on:click=\\\"updateItem(item.id)\\\">test</button> \")\r\n                    ])\r\n                ]));\r\n            }), 128 /* KEYED_FRAGMENT */))\r\n        ]),\r\n        _hoisted_11\r\n    ], 64 /* STABLE_FRAGMENT */));\r\n}\r\nexports.render = render;\r\n\n\n//# sourceURL=webpack://buy-list/./src/test.vue?./node_modules/ts-loader/index.js??clonedRuleSet-1!./node_modules/vue-loader/dist/templateLoader.js??ruleSet%5B1%5D.rules%5B2%5D!./node_modules/vue-loader/dist/index.js??ruleSet%5B1%5D.rules%5B5%5D.use%5B0%5D");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nvar vue_1 = __webpack_require__(/*! vue */ \"./node_modules/vue/index.js\");\r\nvar router_1 = __webpack_require__(/*! ./router/ */ \"./src/router/index.ts\");\r\n// import {store,key} from \"./store\";\r\n// import { store, key } from './stores/store';\r\n// Import the functions you need from the SDKs you need\r\nvar app_1 = __webpack_require__(/*! firebase/app */ \"./node_modules/firebase/app/dist/index.esm.js\");\r\n// import { getAnalytics } from \"firebase/analytics\";\r\n// TODO: Add SDKs for Firebase products that you want to use\r\n// https://firebase.google.com/docs/web/setup#available-libraries\r\n// Your web app's Firebase configuration\r\n// For Firebase JS SDK v7.20.0 and later, measurementId is optional\r\nvar firebaseConfig = {\r\n    apiKey: \"AIzaSyA3ZoDiyxNZBWFgntlnBEcrFkfAgOo2RIE\",\r\n    authDomain: \"buy-list-cf.firebaseapp.com\",\r\n    projectId: \"buy-list-cf\",\r\n    storageBucket: \"buy-list-cf.appspot.com\",\r\n    messagingSenderId: \"1087310780588\",\r\n    appId: \"1:1087310780588:web:1c8d10b9943ea3d7296709\",\r\n    measurementId: \"G-0K9W3P389E\",\r\n};\r\n// Initialize Firebase\r\n(0, app_1.initializeApp)(firebaseConfig);\r\n// const analytics = getAnalytics(appF);\r\n// const app = createApp({})\r\n// createApp(App).use(router).mount(\"#app\");\r\n// app.use(router)\r\n// app.use(store, key)\r\n// app.mount('#app')\r\ndocument.addEventListener(\"DOMContentLoaded\", function () {\r\n    //   createApp(App).use(router).use(store, key).mount('#app');\r\n    // createApp().use(router).mount(\"#app\");\r\n    var app = (0, vue_1.createApp)({});\r\n    app.use(router_1.default);\r\n    app.mount(\"#app\");\r\n});\r\n\n\n//# sourceURL=webpack://buy-list/./src/index.ts?");

/***/ }),

/***/ "./src/model/auth.repository.ts":
/*!**************************************!*\
  !*** ./src/model/auth.repository.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\n//repository\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.AuthRepository = void 0;\r\nvar auth_1 = __webpack_require__(/*! firebase/auth */ \"./node_modules/firebase/auth/dist/index.esm.js\");\r\n// const auth = getAuth();\r\nfunction signUp() {\r\n    (0, auth_1.createUserWithEmailAndPassword)((0, auth_1.getAuth)(), \"n.kubo@gmail.com\", \"111111\")\r\n        .then(function (userCredential) {\r\n        // Signed in\r\n        var user = userCredential.user;\r\n        console.log(user);\r\n    })\r\n        .catch(function (error) {\r\n        var errorCode = error.code;\r\n        var errorMessage = error.message;\r\n        console.log(errorCode, errorMessage);\r\n        // ..\r\n    });\r\n}\r\nfunction signIn() {\r\n    (0, auth_1.signInWithEmailAndPassword)((0, auth_1.getAuth)(), \"n.kubo@gmail.com\", \"111111\")\r\n        .then(function (userCredential) {\r\n        // Signed in\r\n        var user = userCredential.user;\r\n        console.log(user.uid);\r\n        // ...\r\n    })\r\n        .catch(function (error) {\r\n        var errorCode = error.code;\r\n        var errorMessage = error.message;\r\n        console.log(errorCode, errorMessage);\r\n    });\r\n}\r\nexports.AuthRepository = {\r\n    signUp: signUp,\r\n    signIn: signIn,\r\n};\r\n\n\n//# sourceURL=webpack://buy-list/./src/model/auth.repository.ts?");

/***/ }),

/***/ "./src/model/id.value.ts":
/*!*******************************!*\
  !*** ./src/model/id.value.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\n//value object\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.createID = void 0;\r\nfunction createID() {\r\n    var today = new Date;\r\n    var day = today.toLocaleString().replace(/:/g, \"\").replace(/\\//g, \"\").replace(/ /g, \"\");\r\n    return day;\r\n}\r\nexports.createID = createID;\r\n\n\n//# sourceURL=webpack://buy-list/./src/model/id.value.ts?");

/***/ }),

/***/ "./src/model/item.model.ts":
/*!*********************************!*\
  !*** ./src/model/item.model.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\n//entity\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.changeItem = exports.createItem = void 0;\r\nvar id_value_1 = __webpack_require__(/*! ./id.value */ \"./src/model/id.value.ts\");\r\nvar MIN_NAME = 0;\r\nvar MAX_NAME = 10;\r\nvar MIN_PRICE = 0;\r\nvar MAX_PRICE = 9999;\r\nfunction createItem(name, price) {\r\n    if (name.length <= MIN_NAME || name.length >= MAX_NAME)\r\n        throw new Error(\"name should be \" + MIN_NAME + \" to \" + MAX_NAME);\r\n    if (price <= MIN_PRICE || price >= MAX_PRICE)\r\n        throw new Error(\"price should be \" + MIN_PRICE + \" to \" + MAX_PRICE);\r\n    var id = (0, id_value_1.createID)();\r\n    return {\r\n        _tag: 'Item',\r\n        id: id,\r\n        name: name,\r\n        price: price\r\n    };\r\n}\r\nexports.createItem = createItem;\r\nfunction changeItem(id, name, price) {\r\n    if (name.length <= MIN_NAME || name.length >= MAX_NAME)\r\n        throw new Error(\"name should be \" + MIN_NAME + \" to \" + MAX_NAME);\r\n    if (price <= MIN_PRICE || price >= MAX_PRICE)\r\n        throw new Error(\"price should be \" + MIN_PRICE + \" to \" + MAX_PRICE);\r\n    return {\r\n        _tag: 'Item',\r\n        id: id,\r\n        name: name,\r\n        price: price\r\n    };\r\n}\r\nexports.changeItem = changeItem;\r\n\n\n//# sourceURL=webpack://buy-list/./src/model/item.model.ts?");

/***/ }),

/***/ "./src/model/item.repository.ts":
/*!**************************************!*\
  !*** ./src/model/item.repository.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nvar __generator = (this && this.__generator) || function (thisArg, body) {\r\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\r\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\r\n    function verb(n) { return function (v) { return step([n, v]); }; }\r\n    function step(op) {\r\n        if (f) throw new TypeError(\"Generator is already executing.\");\r\n        while (_) try {\r\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\r\n            if (y = 0, t) op = [op[0] & 2, t.value];\r\n            switch (op[0]) {\r\n                case 0: case 1: t = op; break;\r\n                case 4: _.label++; return { value: op[1], done: false };\r\n                case 5: _.label++; y = op[1]; op = [0]; continue;\r\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\r\n                default:\r\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\r\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\r\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\r\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\r\n                    if (t[2]) _.ops.pop();\r\n                    _.trys.pop(); continue;\r\n            }\r\n            op = body.call(thisArg, _);\r\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\r\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\r\n    }\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.ItemRepository = void 0;\r\nvar firestore_1 = __webpack_require__(/*! firebase/firestore */ \"./node_modules/firebase/firestore/dist/index.esm.js\");\r\n// export interface ItemRepository{\r\n//   item:Array<Item>\r\n// }\r\nvar itemRepository = {};\r\nfunction newSaveItem(item, userId) {\r\n    (0, firestore_1.setDoc)((0, firestore_1.doc)((0, firestore_1.getFirestore)(), \"users/\", userId, \"items\", item.id), {\r\n        name: item.name,\r\n        price: item.price,\r\n    });\r\n}\r\n// function saveItem(){\r\n// }\r\nfunction findItem(item, userId) {\r\n    return __awaiter(this, void 0, void 0, function () {\r\n        var querySnapshot;\r\n        return __generator(this, function (_a) {\r\n            switch (_a.label) {\r\n                case 0: return [4 /*yield*/, (0, firestore_1.getDocs)((0, firestore_1.collection)((0, firestore_1.getFirestore)(), \"users\", userId, \"items\", item.id))];\r\n                case 1:\r\n                    querySnapshot = _a.sent();\r\n                    querySnapshot.forEach(function (doc) {\r\n                        console.log(doc.id + \" => \" + doc.data());\r\n                        return doc;\r\n                    });\r\n                    return [2 /*return*/];\r\n            }\r\n        });\r\n    });\r\n}\r\nfunction getItem(userId) {\r\n    return __awaiter(this, void 0, void 0, function () {\r\n        var querySnapshot;\r\n        return __generator(this, function (_a) {\r\n            switch (_a.label) {\r\n                case 0: return [4 /*yield*/, (0, firestore_1.getDocs)((0, firestore_1.collection)((0, firestore_1.getFirestore)(), \"users\", userId, \"items\"))];\r\n                case 1:\r\n                    querySnapshot = _a.sent();\r\n                    querySnapshot.forEach(function (doc) {\r\n                        var item = {\r\n                            _tag: 'Item',\r\n                            id: doc.id,\r\n                            name: doc.data().name,\r\n                            price: doc.data().price\r\n                        };\r\n                        // console.log(itemRepository)\r\n                        // itemRepository[item.id].push(item)\r\n                        itemRepository[item.id] = item;\r\n                    });\r\n                    return [2 /*return*/, itemRepository];\r\n            }\r\n        });\r\n    });\r\n}\r\n// function deleteItem(){\r\n// }\r\nexports.ItemRepository = {\r\n    newSaveItem: newSaveItem,\r\n    findItem: findItem,\r\n    getItem: getItem,\r\n    itemRepository: itemRepository\r\n};\r\n\n\n//# sourceURL=webpack://buy-list/./src/model/item.repository.ts?");

/***/ }),

/***/ "./src/model/item.use-case.ts":
/*!************************************!*\
  !*** ./src/model/item.use-case.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\n//entity\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.saveItem = void 0;\r\nvar item_model_1 = __webpack_require__(/*! ./item.model */ \"./src/model/item.model.ts\");\r\nvar item_repository_1 = __webpack_require__(/*! ./item.repository */ \"./src/model/item.repository.ts\");\r\n//品目登録\r\nfunction saveItem(name, price, id) {\r\n    //idなければ、新規登録、idあれば更新\r\n    if (!id) {\r\n        var item = (0, item_model_1.createItem)(name, price);\r\n        console.log(item);\r\n        item_repository_1.ItemRepository.newSaveItem(item, 'userID');\r\n        var allItem = item_repository_1.ItemRepository.getItem('userID');\r\n        return allItem;\r\n    }\r\n    if (id) {\r\n        var item = (0, item_model_1.changeItem)(id, name, price);\r\n        item_repository_1.ItemRepository.newSaveItem(item, 'userID');\r\n        var allItem = item_repository_1.ItemRepository.getItem('userID');\r\n        return allItem;\r\n    }\r\n}\r\nexports.saveItem = saveItem;\r\n\n\n//# sourceURL=webpack://buy-list/./src/model/item.use-case.ts?");

/***/ }),

/***/ "./src/router/index.ts":
/*!*****************************!*\
  !*** ./src/router/index.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\n// import { createRouter, createWebHistory, RouteRecordRaw,createWebHashHistory } from \"vue-router\";\r\nvar vue_router_1 = __webpack_require__(/*! vue-router */ \"./node_modules/vue-router/dist/vue-router.esm-bundler.js\");\r\nvar test_vue_1 = __webpack_require__(/*! ../test.vue */ \"./src/test.vue\");\r\nvar routes = [\r\n    {\r\n        path: \"/\",\r\n        // name: \"top\",\r\n        component: test_vue_1.default,\r\n    },\r\n    {\r\n        path: \"/test\",\r\n        // name: \"top\",\r\n        component: test_vue_1.default,\r\n    },\r\n];\r\nvar router = (0, vue_router_1.createRouter)({\r\n    //createWebHistoryを以下に変更することにより、リロード時404エラーなくなった\r\n    history: (0, vue_router_1.createWebHashHistory)(),\r\n    routes: routes,\r\n});\r\nexports[\"default\"] = router;\r\n\n\n//# sourceURL=webpack://buy-list/./src/router/index.ts?");

/***/ }),

/***/ "./src/test.vue":
/*!**********************!*\
  !*** ./src/test.vue ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"__esModule\": () => (/* reexport safe */ _test_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_1__.__esModule),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _test_vue_vue_type_template_id_0f72a62a_ts_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./test.vue?vue&type=template&id=0f72a62a&ts=true */ \"./src/test.vue?vue&type=template&id=0f72a62a&ts=true\");\n/* harmony import */ var _test_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./test.vue?vue&type=script&lang=ts */ \"./src/test.vue?vue&type=script&lang=ts\");\n/* harmony import */ var C_Users_kubomitsu_Desktop_buy_list_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ \"./node_modules/vue-loader/dist/exportHelper.js\");\n\n\n\n\n;\nconst __exports__ = /*#__PURE__*/(0,C_Users_kubomitsu_Desktop_buy_list_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_test_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_1__[\"default\"], [['render',_test_vue_vue_type_template_id_0f72a62a_ts_true__WEBPACK_IMPORTED_MODULE_0__.render],['__file',\"src/test.vue\"]])\n/* hot reload */\nif (false) {}\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);\n\n//# sourceURL=webpack://buy-list/./src/test.vue?");

/***/ }),

/***/ "./src/test.vue?vue&type=script&lang=ts":
/*!**********************************************!*\
  !*** ./src/test.vue?vue&type=script&lang=ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* reexport safe */ _node_modules_ts_loader_index_js_clonedRuleSet_1_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_5_use_0_test_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_0__[\"default\"]),\n/* harmony export */   \"__esModule\": () => (/* reexport safe */ _node_modules_ts_loader_index_js_clonedRuleSet_1_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_5_use_0_test_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_0__.__esModule)\n/* harmony export */ });\n/* harmony import */ var _node_modules_ts_loader_index_js_clonedRuleSet_1_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_5_use_0_test_vue_vue_type_script_lang_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/ts-loader/index.js??clonedRuleSet-1!../node_modules/vue-loader/dist/index.js??ruleSet[1].rules[5].use[0]!./test.vue?vue&type=script&lang=ts */ \"./node_modules/ts-loader/index.js??clonedRuleSet-1!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[5].use[0]!./src/test.vue?vue&type=script&lang=ts\");\n \n\n//# sourceURL=webpack://buy-list/./src/test.vue?");

/***/ }),

/***/ "./src/test.vue?vue&type=template&id=0f72a62a&ts=true":
/*!************************************************************!*\
  !*** ./src/test.vue?vue&type=template&id=0f72a62a&ts=true ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"__esModule\": () => (/* reexport safe */ _node_modules_ts_loader_index_js_clonedRuleSet_1_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_5_use_0_test_vue_vue_type_template_id_0f72a62a_ts_true__WEBPACK_IMPORTED_MODULE_0__.__esModule),\n/* harmony export */   \"render\": () => (/* reexport safe */ _node_modules_ts_loader_index_js_clonedRuleSet_1_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_5_use_0_test_vue_vue_type_template_id_0f72a62a_ts_true__WEBPACK_IMPORTED_MODULE_0__.render)\n/* harmony export */ });\n/* harmony import */ var _node_modules_ts_loader_index_js_clonedRuleSet_1_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_5_use_0_test_vue_vue_type_template_id_0f72a62a_ts_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/ts-loader/index.js??clonedRuleSet-1!../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../node_modules/vue-loader/dist/index.js??ruleSet[1].rules[5].use[0]!./test.vue?vue&type=template&id=0f72a62a&ts=true */ \"./node_modules/ts-loader/index.js??clonedRuleSet-1!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[5].use[0]!./src/test.vue?vue&type=template&id=0f72a62a&ts=true\");\n\n\n//# sourceURL=webpack://buy-list/./src/test.vue?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"assets/js/app": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkIds[i]] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkbuy_list"] = self["webpackChunkbuy_list"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["assets/js/vendor"], () => (__webpack_require__("./src/index.ts")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;