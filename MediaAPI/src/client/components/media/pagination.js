Vue.component('pagination-bar', {
  mounted: function() {
    this.resetPagination();
  },
  data: function () {
    return {
      page: 1
    }
  },
  methods: {
    resetPagination: () => {
      this.page = 0;
    }
  },
  template: `
    <nav aria-label="Page navigation example">
        <ul class="pagination">
          
          <li v-on:click="page--" class="page-item" 
          :class="{disabled: parseInt($route.query.page || 0)==0}">
            <router-link class="page-link" :to="{ 
              path: '/media', 
              query: { page: parseInt($route.query.page || 0) - 1}}">
                Prev
            </router-link>
          </li>

          <li class="page-item">  <div class="page-link">  ... </div> </li>

          <li v-on:click="page--" class="page-item">
            <router-link class="page-link" :to="{ 
              path: '/media', 
              query: { page : this.page }}">
                {{ page - 1 }}
            </router-link>
          </li>

          <li class="page-item">
            <router-link class="page-link" :to="{ 
              path: '/media', 
              query: { page : this.page }}">
                {{ page }}
            </router-link>
          </li>

          <li v-on:click="page++" class="page-item">
            <router-link class="page-link" :to="{ 
              path: '/media', 
              query: { page: this.page}}">
                {{ page + 1 }}
            </router-link>
          </li>

          <li class="page-item">  <div class="page-link">  ... </div>  </li>

          <li v-on:click="page++" class="page-item">
            <router-link class="page-link" :to="{ 
              path: '/media', 
              query: { page: parseInt($route.query.page || 0) + 1}}">
                Next
            </router-link>
          </li>

        </ul>
      </nav>
    `
});



{/* <li class="page-item" :class="{disabled: parseInt($route.params.page || 0)==0}">
            <router-link class="page-link" 
              :to="{ path: '/page/' + (parseInt($route.params.page || 0) - 1) + '?name=' + ($route.query.name || '')}">
              Previous
            </router-link>
          </li> */}
