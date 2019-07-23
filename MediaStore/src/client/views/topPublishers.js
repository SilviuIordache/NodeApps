const topPublishersView = Vue.component('topPublishersView', {
  data: function () {
    return {
      publishers: []
    }
  },
  computed: {
    validPublishers: function() {
      //we filter out the publisher named '-' (entries with no publisher)
        return this.publishers.filter( (pub) => {
          if (pub.pubName != '-') return pub;
        })
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
      <publisher-list :publishers="validPublishers"></publisher-list>
    </div> 
  </article>
  `
})