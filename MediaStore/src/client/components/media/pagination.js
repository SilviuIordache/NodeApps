Vue.component('pagination-bar', {
  props: ['pagesPerQuery', 'queryCount'],
  template: `
    <nav aria-label="pagination-label">
        <ul class="pagination">
          
          <li class="page-item" 
          :class="{disabled: parseInt($route.query.page || 0)<=0}">

            <router-link class="page-link" 
              :to="{ path: '/media', query: { 
                        page: parseInt($route.query.page || 0) - 1,
                        ord: $route.query.ord,
                        name: $route.query.name}}">
                <div> Prev </div>
            </router-link>
          </li>


          <li class="page-item disabled">  
            <div class="page-link"> Pg: {{$route.query.page || 0}} /  {{pagesPerQuery}} </div>  
          </li>


          <li  class="page-item" :class="{disabled: parseInt($route.query.page) === pagesPerQuery}">
            <router-link  class="page-link" 
              :to="{ path: '/media', query: { 
                      page: parseInt($route.query.page || 0) + 1,
                      ord: $route.query.ord,
                      name: $route.query.name}}">
              <div> Next </div>
            </router-link>
          </li>

        </ul>

        <div> {{ queryCount }} results </div>
      </nav>
    `
});

