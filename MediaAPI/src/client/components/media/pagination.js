Vue.component('pagination-bar', {
  mounted: function() {
    this.resetPagination();
  },
  data: function () {
    return {
      curPage: 1,
    }
  },
  methods: {
    resetPagination: () => {
      this.curPage = 0;
    },
  },
  template: `
    <nav aria-label="pagination-label">
        <ul class="pagination">
          
          <li v-on:click="curPage--" class="page-item" 
          :class="{disabled: parseInt($route.query.page || 0)<=0}">
            <router-link class="page-link" :to="{ 
              path: '/media', 
              query: { page: parseInt($route.query.page || 0) - 1}}">
                Prev
            </router-link>
          </li>

          <li class="page-item disabled">  
            <div class="page-link"> ... </div> 
          </li>

          <li v-on:click="curPage--" class="page-item">
            <router-link class="page-link" :to="{ 
              path: '/media', 
              query: { page : this.page }}">
                {{ curPage - 1 }}
            </router-link>
          </li>

          <li class="page-item">
            <router-link class="page-link" :to="{ 
              path: '/media', 
              query: { page : this.page }}">
                {{ curPage }}
            </router-link>
          </li>

          <li v-on:click="curPage++" class="page-item">
            <router-link class="page-link" :to="{ 
              path: '/media', 
              query: { page: this.page}}">
                {{ curPage + 1 }}
            </router-link>
          </li>

          
          <li class="page-item disabled">  
            <div class="page-link">  ... </div>  
          </li>

          <li v-on:click="curPage++" class="page-item">
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


{/* <li v-on:click="page--" class="page-item">
            <router-link class="page-link" :to="{ 
              path: '/media', 
              query: { page : this.page }}">
                {{ curPage - 1 }}
            </router-link>
          </li>

          <li class="page-item">
            <router-link class="page-link" :to="{ 
              path: '/media', 
              query: { page : this.page }}">
                {{ curPage }}
            </router-link>
          </li>

          <li v-on:click="page++" class="page-item">
            <router-link class="page-link" :to="{ 
              path: '/media', 
              query: { page: this.page}}">
                {{ curPage + 1 }}
            </router-link>
          </li> */}

