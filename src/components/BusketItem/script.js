export default Vue.component('basket-item', {
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
          <button class="basket-item__button" @click="$emit('del', item.id_product)">Удалить</button>
        </div>
      </div>
    `
  })