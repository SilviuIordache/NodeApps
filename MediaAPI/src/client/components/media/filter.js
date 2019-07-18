const filterBar = Vue.component('filter-bar', {
  props: ['mediaItems'],
  data: function () {
    return {
      ord: 'asc'
    };
  },
  template: `
  <div class="border-right"> 
    <div class="sidebar-heading">Filters</div>
      <div class="btn-group" id="sort-order" role="group" aria-label="Basic example">
      <button v-bind:disabled='ord === "asc" ? true : false' v-on:click="changeOrder('asc')"  type="button" class="btn btn-secondary">asc</button>
      <button v-bind:disabled='ord === "desc" ? true : false' v-on:click="changeOrder('desc')" type="button" class="btn btn-secondary">desc</button>
    </div>
  </div>
  `,
  methods: {
    changeOrder: function (ord) {
      // emit event
      this.ord = ord;
      this.$parent.$emit('filter-bar:orderChanged', ord);
    }
  }
})