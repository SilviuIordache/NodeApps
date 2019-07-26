const publisherView = Vue.component('publisher-view', {
  data: function () {
    return {
      publishers: [],
      publisherCount: 0,
      elemPerPage: 10,
      pagesPerQuery: 0,
      reqFinished: true
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
      this.reqFinished = false;
      let url = `/publisher/top?elemPerPage=${this.elemPerPage}`;

      if (query.page)  url += '&page=' + query.page;
      if (query.name)  url += '&name=' + query.name;

      axios(url)
      .then((res) => {
        this.publishers = res.data[0].publishers[0].publishers;
        this.publisherCount = res.data[0].total[0].total;
        this.pagesPerQuery = parseInt(this.publisherCount/this.elemPerPage);
        this.reqFinished = true;
      })
    },
  },
  template: `
  <article class="container">
    <div class="col">

      <div class="col-6">
        <search :path="'/publisher/top'"></search>
        <pagination-bar :pagesPerQuery = 'pagesPerQuery'  
                        :queryCount = 'publisherCount'
                        :searchPath= "'/publisher/top'"> 
        </pagination-bar>   
      </div>

      <div class="row">
        <publisher-list :publishers="publishers"
                        :elemPerPage="elemPerPage"
                        :reqFinished="reqFinished">
        </publisher-list>
      </div>

    </div> 
  </article>
  `
})