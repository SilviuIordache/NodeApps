const topPublishersView = Vue.component('topPublishersView', {
  data: function () {
    return {
      publishers: []
    }
  },
  created: function () {
    this.getTopPublishers();
  },
  methods: {
    getTopPublishers: function (limit) {
      let url = '/publisher/top?';
      if (limit) url += 'limit=' + limit;
      axios(url)
      .then((res) => {
        this.publishers = res.data;
      })
    }
  },
  template: `
  <article class="container">
    <div class="row">
      <publisher-list :publishers="publishers"></publisher-list>
    </div> 
  </article>
  `
})