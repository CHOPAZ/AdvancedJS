import { GET_BUSKET_GOODS } from "../../Constants/script.js" ;
import { serviceWhithBody } from "../../Srvises/script.js";

export default Vue.component('good', {
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
        serviceWhithBody(GET_BUSKET_GOODS, "POST", {
          id: this.item.id_product
        })
      }
    }
  })