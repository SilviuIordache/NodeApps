Vue.component('entry-list', {
  props: ['entries'],
  template: `
    <table class="table">
    <thead class="thead-dark">
      <tr>
        <th scope="col">#</th>
        <th scope="col">id</th>
        <th scope="col">Title</th>
      </tr>
    </thead>
    <tbody>
      <entry v-for="(entry, index) in entries"
        :index = "index"
        :id = "entry.id"
        :title = "entry.title"
        :key= "entry.id">
      </entry>
    </tbody>
  </table>
  `
})