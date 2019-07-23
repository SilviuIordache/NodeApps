const topPublishersView = Vue.component('topPublishersView', {
  data: function () {
    return {
      publishers: [],
      publisherCount: 0,
      elemPerPage: 10,
      pagesPerQuery: 0
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
  beforeRouteUpdate: function (to, from, next) {
    this.getTopPublishers(to.query.page);
    next();
  },
  methods: {
    getTopPublishers: function (page) {

      this.getPublisherCount( () => {
        this.pagesPerQuery = this.publisherCount/this.elemPerPage;
      })

      let url = `/publisher/top?elemPerPage=${this.elemPerPage}`;
      if (page)  url += '&page=' + page;
      axios(url)
      .then((res) => {
        this.publishers = res.data;
      })
    },
    getPublisherCount: function (done) {

      let url = `/publisher/count`;
      axios(url)
        .then( (res) => {
          this.publisherCount = res.data[0].count;
          done();
        })
    },

  },
  template: `
  <article class="container">
    <div class="col">

      <div class="row">
        <pagination-bar :pagesPerQuery = 'pagesPerQuery'  
                :queryCount = 'publisherCount'
                :searchPath= "'/publisher/top'"> 
        </pagination-bar>
      </div>

      <div class="row">
        <publisher-list :publishers="validPublishers"></publisher-list>
      </div>

    </div> 
  </article>
  `
})