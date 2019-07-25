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
    this.getTopPublishers(this.$route.query);
  },
  beforeRouteUpdate: function (to, from, next) {
    this.getTopPublishers(to.query);
    next();
  },
  methods: {
    getTopPublishers: function (query) {
      let url = `/publisher/top?elemPerPage=${this.elemPerPage}`;
      if (query.page)  url += '&page=' + query.page;
      axios(url)
      .then((res) => {
        this.publishers = res.data.items;
        this.publisherCount = res.data.count[0].count;
        this.pagesPerQuery = parseInt(this.publisherCount/this.elemPerPage);
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
        <publisher-list :publishers="validPublishers"
                        :elemPerPage="elemPerPage">
        </publisher-list>
      </div>

    </div> 
  </article>
  `
})