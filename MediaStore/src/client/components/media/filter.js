const filterBar = Vue.component('filter-bar', {
  data: function () {
    return {
      ord: 'asc'
    };
  },
  template: `
  <div class="border-right"> 
    <div class="sidebar-heading">Filters</div>

      <div class="btn-group" id="sort-order" role="group" aria-label="Basic example">

      <button type="button"
              class="btn btn-secondary"
              v-bind:disabled='ord === "asc" ? true : false' 
              v-on:click="ord ='asc'">
              <router-link  :to="{  
                path: '/media',
                query: { page: 0, 
                         ord: 'asc',
                         name: $route.query.name}}">
                ASC
              </router-link>
      </button>

      <button type="button" 
              class="btn btn-secondary"
              v-bind:disabled='ord === "desc" ? true : false' 
              v-on:click="ord ='desc'">
            <router-link  :to="{  
              path: '/media', 
              query: { page: 0, 
                       ord: 'desc',
                       name: $route.query.name}}">
              DESC
            </router-link>
      </button>
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