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

Vue.component('content-and-pagination', {
  props: ['mediaItems'],
  template: `
  <div>
    <pagination-bar></pagination-bar>
    <media-list :mediaItems='mediaItems'></media-list>
    <pagination-bar></pagination-bar>
  </div>
  `
});

const mediaItems = Vue.component('mediaItems', {
  created: function () {
    // change order event listener
    this.$on('filter-bar:orderChanged',
      (ord) => {
        // this.ord gets value from event listener
        this.ord = ord;
        this.getMediaItems(this.$route.params.page);
      })
  },
  mounted: function () {
    //get mediaItems
    
    this.getMediaItems(this.$route.params.page, this.$route.query.name);

  },
  data: function () {
    return {
      ord: 'asc',
      mediaItems: [],
      elemPerPage: 5
    };
  },
  beforeRouteUpdate: function (to, from, next) {
    this.getMediaItems(to.params.page, to.query.name);
    window.scrollTo(0, 0);
    next();
  },
  methods: {
    getMediaItems: function (page, name) {
      let url = `/media?ord=${this.ord}&elemPerPage=${this.elemPerPage}`;

      if (page) {
        url += '&page=' + page;
      }

      if (name) {
        url += '&name=' + name;
      }
      axios(url)
        .then((resp) => {
          this.mediaItems = resp.data;
        });
    },
  },
  template: `
    <article class="container">
      <div class="row">
        <div class="col col-md-2">
          <filter-bar></filter-bar>
        </div> 
        <div class="col col-md-10">
          <content-and-pagination :mediaItems='mediaItems'></content-and-pagination>
        </div> 
      </div> 
    </article>
  `
})
