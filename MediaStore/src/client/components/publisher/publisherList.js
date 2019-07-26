Vue.component('publisher-list', {
  props: ['publishers', 'elemPerPage', 'reqFinished'],
  template: `
    <table class="table" v-if="reqFinished">

      <thead class="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">name</th>
          <th scope="col">publications</th>
          <th scope="col">first</th>
          <th scope="col">last</th>
        </tr>
      </thead>

      <tbody >
        <tr v-for="(publisher, index) in publishers"
          :index = "index"
          :key= "publisher._id">

            <th scope="row"> 
              {{ index + elemPerPage * ($route.query.page || 0) }}
            </th>

            <td> 
              <router-link class="nav-item nav-link" :to="{ 
                path: '/media',
                query: {
                  field: 'Publisher',
                  name: publisher.pubName 
              }}">
                {{ publisher.pubName }} 
              </router-link>
            </td>
            
            <td> {{ publisher.count }} </td>
            <td> {{ publisher.minYear }} </td>
            <td> {{ publisher.maxYear }} </td>
        </tr>
      </tbody>
    </table>

    <div v-else >
      <div class="text-center">
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  `
})