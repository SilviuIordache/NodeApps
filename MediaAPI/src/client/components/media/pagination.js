Vue.component('pagination-bar', {
  template: `
    <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item" :class="{disabled: parseInt($route.params.page || 0)==0}">
            <router-link class="page-link" 
              :to="{ path: '/page/' + (parseInt($route.params.page || 0) - 1) + '?name=' + ($route.query.name || '')}">
              Previous
            </router-link>
          </li>

          <li class="page-item">
            <router-link class="page-link" :to="{ path: '/page/0'  + '?name=' + ($route.query.name || '')}">
              0
            </router-link>
          </li>

          <li class="page-item">
            <router-link class="page-link" :to="{ path: '/page/0'  + '?name=' + ($route.query.name || '')}">
              1
            </router-link>
          </li>

          <li class="page-item">
            <router-link class="page-link" :to="{ path: '/page/0'  + '?name=' + ($route.query.name || '')}">
              2
            </router-link>
          </li>

          <router-link class="page-link" 
            :to="{ path: '/page/' + (parseInt($route.params.page || 0) + 1) + '?name=' + ($route.query.name || '')}"">
            Next
          </router-link>

        </ul>
      </nav>
    `
});
