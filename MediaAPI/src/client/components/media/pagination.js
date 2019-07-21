Vue.component('pagination-bar', {
  mounted: function() {
    this.resetPagination();
  },
  template: `
    <nav aria-label="pagination-label">
        <ul class="pagination">
          
          <li class="page-item" 
          :class="{disabled: parseInt($route.query.page || 0)<=0}">
            <router-link 
              class="page-link" 
              :to="{ 
                path: '/media', 
                query: { page: parseInt($route.query.page || 0) - 1}}">
                  Prev
            </router-link>
          </li>

          <li class="page-item disabled">  
            <div class="page-link"> Page: {{$route.query.page || 0}} </div>  
          </li>

          <li  class="page-item">
            <router-link 
              class="page-link" 
              :to="{ 
                path: '/media', 
                query: { page: parseInt($route.query.page || 0) + 1}}">
                Next
            </router-link>
          </li>

        </ul>
      </nav>
    `
});

