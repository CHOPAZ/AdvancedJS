import { RECEIVE_GOODS } from "../Constants/script.js";
import { service } from "../Srvises/script.js";


export default window.onload = () => {

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