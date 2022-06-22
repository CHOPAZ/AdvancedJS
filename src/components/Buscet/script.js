import {GET_BUSKET_GOODS} from '../../Constants/script.js';
import {service, serviceWhithBody} from '../../Srvises/script.js';

export default Vue.component('basket', { 
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
            @del="deletGood"
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
      addGood(id) {
        serviceWhithBody(GET_BUSKET_GOODS, "POST", {
          id
        }).then((data) => {
          this.bascketList = data;
          return data;
        })
      },
      deletGood(id) {
        serviceWhithBody(GET_BUSKET_GOODS, "DELETE", {
          id
        }).then((data) => {
          this.bascketList = data;
          return data;
        })
      }
    }
  })