Vue.component('publisher-list', {
  props: ['publishers'],
  template: `
    <table class="table">

      <thead class="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">name</th>
          <th scope="col">type</th>
          <th scope="col">publications</th>
          <th scope="col">first</th>
          <th scope="col">last</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(publisher, index) in publishers"
          :index = "index"
          :_id = "publisher._id"
          :mediaType = "publisher.mediaType"
          :key= "publisher._id">
            <th scope="row"> {{ index }}</th>
            <td> {{ publisher._id }} </td>
            <td> {{ publisher.mediaType }} </td>
            <td> {{ publisher.count }} </td>
            <td> {{ publisher.minYear }} </td>
            <td> {{ publisher.maxYear }} </td>
        </tr>
      </tbody>
    </table>
  `
})