const publisherView = Vue.component('publisher-view', {
  data: function () {
    return {
      publishers: [],
      publisherCount: 0,
      elemPerPage: 10,
      pagesPerQuery: 0,
      reqFinished: true,
      t0: 0,
      t1: 0,
      reqTime: 0
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
      this.t0 = new Date();
      this.reqFinished = false;
      let url = `/publisher/top?elemPerPage=${this.elemPerPage}`;

      if (query.page)  url += '&page=' + query.page;
      if (query.name)  url += '&name=' + query.name;

      axios(url)
      .then((res) => {
        this.t1 = new Date();
        this.reqTime = this.t1 - this.t0;
        this.publishers = res.data[0].publishers[0].publishers;
        this.publisherCount = res.data[0].total[0].total;
        this.pagesPerQuery = parseInt(this.publisherCount/this.elemPerPage);
        this.reqFinished = true;
      })
    },
  },
  template: `
  <article class="container">

  <div class="row">

        <div class="col-2">
          <filter-bar></filter-bar>
        </div>

        <div class="col-10">
          <div class="col-6">
            <search :path="'/publisher/top'">
            </search>
            <pagination-bar :pagesPerQuery = 'pagesPerQuery'  
                            :queryCount = 'publisherCount'
                            :searchPath= "'/publisher/top'"
                            :elemPerPage="elemPerPage"
                            :reqTime="reqTime"> 
            </pagination-bar>   
          </div>

          <div class="row">
            <publisher-list :publishers="publishers"
                            :elemPerPage="elemPerPage"
                            :reqFinished="reqFinished">
            </publisher-list>
          </div>
      </div>
  </div>

  

  </article>
  `
})