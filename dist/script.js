/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/script.js":
/*!***********************!*\
  !*** ./src/script.js ***!
  \***********************/
/***/ (() => {

eval("const API_URL = \"http://localhost:8000/\";\r\nconst RECEIVE_GOODS = `${API_URL}goods.json`;\r\nconst GET_BUSKET_GOODS = `${API_URL}basket`;\r\nconst GOODS = `${API_URL}goods`;\r\n\r\n\r\n\r\nfunction service (url) {\r\n  return fetch(url)\r\n  .then((res) => res.json());\r\n}\r\n\r\nfunction serviceWhithBody(url = \"\", method = \"POST\", body = {}) {\r\n  return fetch (\r\n    url,\r\n    {\r\n      method,\r\n      headers: {\r\n        'Content-type': 'application/json; charset=UTF-8'\r\n      },\r\n      body: JSON.stringify(body)\r\n    }\r\n  ).then((res) => res.json())\r\n}\r\n\r\nwindow.onload = () => {\r\n  Vue.component('custom-button', {\r\n    template: `\r\n      <button class=\"cart-button\" type=\"button\" @click=\"$emit('click')\">\r\n        <slot></slot>\r\n      </button>\r\n    `\r\n  })\r\n  Vue.component('good', {\r\n    props: [\r\n      'item'\r\n    ],\r\n    template: `\r\n      <div class=\"goods-item\">\r\n        <h3>{{item.product_name}}</h3>\r\n        <p>{{item.price}}</p>\r\n        <div>\r\n          <custom-button @click=\"addGood\">Добавить</custom-button>\r\n        </div>\r\n      </div>\r\n    `,\r\n    methods: {\r\n      addGood() {\r\n        serviceWhithBody(GET_BUSKET_GOODS, \"POST\", {\r\n          id: this.item.id_product\r\n        })\r\n      }\r\n    }\r\n  })\r\n  Vue.component('basket', { \r\n    data() {\r\n      return {\r\n        bascketList: []\r\n      }\r\n    },\r\n    template: `\r\n      <div class=\"basket-list\">\r\n        <div class=\"basket-card\">\r\n          <div class=\"basket-card__header\">\r\n            <h1 class=\"basket-card__header__title\">Корзина</h1>\r\n            <div class=\"basket-card__header__delete-icon\" @click=\"$emit('close')\">\r\n            </div>\r\n          </div>\r\n          <div class=\"basket-card__content\">\r\n            <basket-item \r\n            v-for=\"item in bascketList\" \r\n            :item=\"item\"\r\n            @add=\"addGood\"\r\n            @del=\"deletGood\"\r\n            ></basket-item>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    `,\r\n    mounted() {\r\n      service(GET_BUSKET_GOODS).then((data) => {\r\n        this.bascketList = data;\r\n        return data;\r\n      })\r\n    },\r\n    methods: {\r\n      addGood(id) {\r\n        serviceWhithBody(GET_BUSKET_GOODS, \"POST\", {\r\n          id\r\n        }).then((data) => {\r\n          this.bascketList = data;\r\n          return data;\r\n        })\r\n      },\r\n      deletGood(id) {\r\n        serviceWhithBody(GET_BUSKET_GOODS, \"DELETE\", {\r\n          id\r\n        }).then((data) => {\r\n          this.bascketList = data;\r\n          return data;\r\n        })\r\n      }\r\n    }\r\n  })\r\n  Vue.component('actions-input', {\r\n    template: `\r\n      <input \r\n        type=\"text\" \r\n        class=\"search-input\"\r\n        @input=\"$emit('input', $event.target.value)\"\r\n        placeholder=\"Поиск\">\r\n    `\r\n  })\r\n  Vue.component('basket-item', {\r\n    props: [\r\n      'item'\r\n    ],\r\n    template: `\r\n      <div class=\"basket-item\">\r\n        <div class=\"basket-item_goods\">\r\n          <span class=\"basket-item__title\">{{item.product_name}}</span>\r\n          <span class=\"basket-item__price\">{{item.price}} р.</span>\r\n        </div>\r\n        <div class=\"basket-item__count\">\r\n          <span> {{item.count}}шт.</span>\r\n          <button class=\"basket-item__button\" @click=\"$emit('add', item.id_product)\">Добавить</button>\r\n          <button class=\"basket-item__button\" @click=\"$emit('del', item.id_product)\">Удалить</button>\r\n        </div>\r\n      </div>\r\n    `\r\n  })\r\n\r\n  const app = new Vue({\r\n    el: '#root',\r\n    data: {\r\n      list: [],\r\n      searchValue: '',\r\n      isVisibleCard: false,\r\n    },\r\n    mounted() {\r\n      service(RECEIVE_GOODS).then((data) => {\r\n        this.list = data;\r\n        return data;\r\n      })\r\n    },\r\n    computed: {\r\n      costAllgoods() {\r\n        return this.list.reduce((currentValue, {price}) => \r\n        currentValue + price\r\n        , 0 ); \r\n      },\r\n      filteredItems() {\r\n        return this.list.filter(({product_name}) => {\r\n          return new RegExp(this.searchValue, 'gui').test(product_name);\r\n        })\r\n      }\r\n    },\r\n    methods: {\r\n      basketGoods() {\r\n        this.isVisibleCard = !this.isVisibleCard\r\n      }\r\n    }\r\n\r\n  })\r\n}\n\n//# sourceURL=webpack://advancedjs/./src/script.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/script.js"]();
/******/ 	
/******/ })()
;