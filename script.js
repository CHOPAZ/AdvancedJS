const API_URL = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";
const RECEIVE_GOODS = `${API_URL}/catalogData.json`;
const GET_BUSKET_GOODS = `${API_URL}/getBasket.json`;



function service (url) {
  return fetch(url)
  .then((res) => res.json());
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
      </div>
    `
  })
  Vue.component('basket', { 
    template: `
      <div class="basket-list">
        <div class="basket-card">
          <div class="basket-card__header">
            <h1 class="basket-card__header__title">Корзина</h1>
            <div class="basket-card__header__delete-icon" @click="$emit('close')">
            </div>
          </div>
          <div class="basket-card__content">
            <div class="goods-list">
              <slot></slot>
            </div>
          </div>
        </div>
      </div>
    `
  })
  Vue.component('actions-input', {
    template: `
      <input 
        type="text" 
        class="search-input"
        v-bind:value="iternalValue"
        @input="$emit('input', $event.target.value)"
        placeholder="Поиск">
    `
  })

  const app = new Vue({
    el: '#root',
    data: {
      list: [],
      searchValue: '',
      isVisibleCard: false,
      bascketList: []
    },
    mounted() {
      service(RECEIVE_GOODS).then((data) => {
        this.list = data;
        return data;
      })
      service(GET_BUSKET_GOODS).then((data) => {
        this.bascketList = data.contents;
        return data.contents;
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