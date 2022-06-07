const API_URL = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";
const RECEIVE_GOODS = `${API_URL}/catalogData.json`;
const GET_BUSKET_GOODS = `${API_URL}/getBasket.json`;



function service (url) {
  return fetch(url)
  .then((res) => res.json());
}

window.onload = () => {
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