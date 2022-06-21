const API_URL = "http://localhost:8000/";
const RECEIVE_GOODS = `${API_URL}goods.json`;
const GET_BUSKET_GOODS = `${API_URL}basket`;
const GOODS = `${API_URL}goods`;



function service (url) {
  return fetch(url)
  .then((res) => res.json());
}

function serviceWhithBody(url = "", method = "POST", body = {}) {
  return fetch (
    url,
    {
      method,
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify(body)
    }
  ).then((res) => res.json());
}

window.onload = () => {
  Vue.component('custom-button', {
    template: `
      <button class="cart-button" type="button" @click="$emit('click')">
        <slot></slot>
      </button>
    `
  })
  Vue.component('good', {
    props: [
      'item'
    ],
    template: `
      <div class="goods-item">
        <h3>{{item.product_name}}</h3>
        <p>{{item.price}}</p>
        <div>
          <custom-button @click="addGood">Добавить</custom-button>
        </div>
      </div>
    `,
    methods: {
      addGood() {
        serviceWhithBody(GOODS, "POST", {
          id: this.item.id_product
        })
      }
    }
  })
  Vue.component('basket', { 
    data() {
      return {
        bascketList: []
      }
    },
    template: `
      <div class="basket-list">
        <div class="basket-card">
          <div class="basket-card__header">
            <h1 class="basket-card__header__title">Корзина</h1>
            <div class="basket-card__header__delete-icon" @click="$emit('close')">
            </div>
          </div>
          <div class="basket-card__content">
            <basket-item 
            v-for="item in bascketList" 
            :item="item"
            @add="addGood"
            ></basket-item>
          </div>
        </div>
      </div>
    `,
    mounted() {
      service(GET_BUSKET_GOODS).then((data) => {
        this.bascketList = data;
        return data;
      })
    },
    methods: {
      addGood(id_product) {
        serviceWhithBody(GOODS, "POST", {
          id_product
        }).then((data) => {
          this.bascketList = data;
        })
      }
    }
  })
  Vue.component('actions-input', {
    template: `
      <input 
        type="text" 
        class="search-input"
        @input="$emit('input', $event.target.value)"
        placeholder="Поиск">
    `
  })
  Vue.component('basket-item', {
    props: [
      'item'
    ],
    template: `
      <div class="basket-item">
        <div class="basket-item_goods">
          <span class="basket-item__title">{{item.product_name}}</span>
          <span class="basket-item__price">{{item.price}} р.</span>
        </div>
        <div class="basket-item__count">
          <span> {{item.count}}шт.</span>
          <button class="basket-item__button" @click="$emit('add', item.id_product)">Добавить</button>
          <button class="basket-item__button">Удалить</button>
        </div>
      </div>
    `
  })

  const app = new Vue({
    el: '#root',
    data: {
      list: [],
      searchValue: '',
      isVisibleCard: false,
    },
    mounted() {
      service(RECEIVE_GOODS).then((data) => {
        this.list = data;
        return data;
      })
    },
    computed: {
      costAllgoods() {
        return this.list.reduce((currentValue, {price}) => 
        currentValue + price
        , 0 ); 
      },
      filteredItems() {
        return this.list.filter(({product_name}) => {
          return new RegExp(this.searchValue, 'gui').test(product_name);
        })
      }
    },
    methods: {
      basketGoods() {
        this.isVisibleCard = !this.isVisibleCard
      }
    }

  })
}