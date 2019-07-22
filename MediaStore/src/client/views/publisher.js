Vue.component('entry-table', {
  data: function () {
    return {
      entries: []
    }
  },
  created: function(){
    this.getPublisherEntries(this.$route.query.name);
  },
  methods: {
    getPublisherEntries: function(name) {
      let url = '/publisher?';

      if (name) {
        url += 'name=' + name;
      }
      axios(url)
        .then ( (res) => {
          this.entries = res.data;
      });
    }
  },
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
      <entry v-for="entry in entries"
        :id = "entry.id"
        :title = "entry.title"
        :key= "entry.id">
      </entry>
    </tbody>
  </table>
  `
})

const publishersView = Vue.component('publishersView', {
  template: `
  <article class="container">
    <div class="row">
      <div class="col col-md-2">
        <filter-bar></filter-bar>
      </div> 
      <div class="col col-md-10">
        <entry-table></entry-table>
      </div> 
    </div> 
  </article>
  `
})