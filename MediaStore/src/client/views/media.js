Vue.component('media-list', {
  props: ['mediaItems'],
  template: `
    <div class="row">
      <media 
        v-for="media in mediaItems"
        :_id ="media._id" 
        :UsageClass="media.UsageClass" 
        :CheckoutType="media.CheckoutType" 
        :MaterialType="media.MaterialType" 
        :CheckoutYear="media.CheckoutYear"
        :Checkouts="media.Checkouts" 
        :Title="media.Title"
        :Creator="media.Creator" 
        :Subjects="media.Subjects"  
        :Publisher="media.Publisher" 
        :PublicationYear="media.PublicationYear"
        :key="media._id"> 
      </media>
    </div>
  `
});

const mediaLibrary = Vue.component('media-library', {
  data: function () {
    return {
      ord: 'asc',
      mediaItems: [],
      queryCount: 0,
      elemPerPage: 10,
      pagesPerQuery: 0
    };
  },
  created: function () {
    // get all db items in ascending order
    this.getMediaItems(
      this.$route.query.page,
      this.$route.query.name,
      this.$route.query.ord);

    // change order event listener
    this.$on('filter-bar:orderChanged',
      (ord) => {
        // this.ord gets value from event listener
        this.ord = ord;
        this.getMediaItems(
          this.$route.query.page, 
          null, 
          this.ord);
      })
  },
  beforeRouteUpdate: function (to, from, next) {
    this.getMediaItems(
      to.query.page, 
      to.query.name,
      to.query.ord);
    window.scrollTo(0, 0);
    next();
  },
  methods: {
    getMediaItems: function (page, name, ord) {

      // calculate total pages, then in the callback, the elements per page;
      this.getMediaCount(name, () => {
        this.calcPagesPerQuery(this.queryCount, this.elemPerPage); 
      });
        
      let url = `/media?&elemPerPage=${this.elemPerPage}`;
      if (page)  url += '&page=' + page;
      if (name)  url += '&name=' + name;
      if (ord) {
        url +='&ord=' + ord;
      } else {
        url +='&ord=asc'
      }
      axios(url)
        .then((resp) => {
          this.mediaItems = resp.data;
        });
    },
    getMediaCount: function (name, done) {
      let url = `media/count?`;
      if (name) url += `&name=` + name;
      axios(url)
        .then( (resp) => {
          this.queryCount = resp.data;
          done();
        })
    },
    calcPagesPerQuery: function( qCount, elPerPag) {
      this.pagesPerQuery = parseInt(qCount / elPerPag);
    }
  },
  template: `
    <article class="container">
      <div class="row">
        <div class="col col-md-2">  <filter-bar></filter-bar>    </div> 
        <div class="col col-md-10">

          <div class="row">

            <div class="col-4">
              <media-search></media-search>
              <pagination-bar :pagesPerQuery = 'pagesPerQuery' :queryCount = 'queryCount'> 
              </pagination-bar>
            </div>

            <div class="col-8 ">
              <router-link v-bind:to="'/media/add'">
                <button type="button" class="btn btn-primary float-right" >
                  (+) Add
                </button>
              </router-link>   
            </div>

          </div>

          <media-list :mediaItems='mediaItems'> </media-list>

          <pagination-bar :pagesPerQuery = 'pagesPerQuery'  :queryCount = 'queryCount'> 
          </pagination-bar>

        </div>
      </div> 
    </article>
  `
})

