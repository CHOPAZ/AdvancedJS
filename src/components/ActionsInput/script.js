export default Vue.component('actions-input', {
    template: `
      <input 
        type="text" 
        class="search-input"
        @input="$emit('input', $event.target.value)"
        placeholder="Поиск">
    `
  })