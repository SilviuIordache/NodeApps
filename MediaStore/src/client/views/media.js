  const mediaLibrary = Vue.component('media-library', {
  data: function () {
    return {
      ord: 'asc',
      mediaItems: [],
      queryCount: 0,
      elemPerPage: 10,
      pagesPerQuery: 0,
      reqFinished: true,
      t0: 0,
      t1: 0,
      reqTime: 0
    };
  },
  created: function () {
    // get all db items in ascending order
    this.getMediaItems(this.$route.query);

    // change order event listener
    this.$on('filter-bar:orderChanged',
      (ord) => {
        // this.ord gets value from event listener
        this.ord = ord;
        this.getMediaItems(this.$route.query);
      })
  },
  beforeRouteUpdate: function (to, from, next) {
    this.getMediaItems(to.query);
    window.scrollTo(0, 0);
    next();
  },
  methods: {
    getMediaItems: function (query) {
      this.t0 = new Date();
      this.reqFinished = false;
      let url = `/media?&elemPerPage=${this.elemPerPage}`;

      if (query.page)  url += '&page=' + query.page;
      if (query.name)  {
        url += '&name=' + query.name;
        if(query.field)
          url += '&field=' + query.field;
      }
      if (query.ord) {
        url +='&ord=' + query.ord;
      } else {
        url +='&ord=asc'
      }
      axios(url)
        .then((res) => {
          this.t1 = new Date();
          this.reqTime = this.t1 - this.t0;
          this.mediaItems = res.data.items;
          this.queryCount = res.data.count;
          this.pagesPerQuery = parseInt(this.queryCount/this.elemPerPage)
          this.reqFinished = true;
        });
    },
  },
  template: `
    <article class="container">
      <div class="row">
        <div class="col col-md-2">  <filter-bar :path="'/media'"></filter-bar>    </div> 
        <div class="col col-md-10">

          <div class="row">
            <div class="col-6">
              <search :path="'/media'"> </search>
              <pagination-bar :pagesPerQuery = 'pagesPerQuery' 
                              :queryCount = 'queryCount'
                              :path= "'/media'"
                              :elemPerPage="elemPerPage"
                              :reqTime="reqTime"> 
              </pagination-bar>
            </div>

            <div class="col-6 ">
              <router-link v-bind:to="'/media/add'">
                <button type="button" class="btn btn-primary float-right">
                  (+) Add
                </button>
              </router-link>   
            </div>
          </div>

          <media-list :mediaItems='mediaItems'
                      :reqFinished='reqFinished'> 
          </media-list>

          <pagination-bar :pagesPerQuery = 'pagesPerQuery' 
                              :queryCount = 'queryCount'
                              :path= "'/media'"
                              :elemPerPage="elemPerPage"
                              :reqTime="reqTime"> 
          </pagination-bar>

        </div>
      </div> 
    </article>
  `
})

