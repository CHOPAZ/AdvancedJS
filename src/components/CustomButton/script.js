export default Vue.component('custom-button', {
    template: `
      <button class="cart-button" type="button" @click="$emit('click')">
        <slot></slot>
      </button>
    `
  })