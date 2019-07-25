const filterBar = Vue.component('filter-bar', {
  props: ['path'],
  data: function () {
    return {
      ord: 'asc'
    };
  },
  template: `
  <div class="border-right"> 
    <div class="sidebar-heading">FILTERS</div>

      <div class="btn-group" id="sort-order" role="group">
        <button type="button"  
          class="btn btn-secondary"
          v-bind:disabled='ord === "asc" ? true : false' 
          @click="ord ='asc'
                  $router .push({ path,  
                                  query: { 
                                      page: 0, 
                                      ord: 'asc',
                                      name: $route.query.name
                                  }})">
            <div>ASC</div>
        </button>

        <button type="button"  
          class="btn btn-secondary"
          v-bind:disabled='ord === "desc" ? true : false' 
          @click="ord ='desc'
                  $router .push({ path,  
                                  query: { 
                                      page: 0, 
                                      ord: 'desc',
                                      name: $route.query.name
                                  }})">
            <div>DESC</div>
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