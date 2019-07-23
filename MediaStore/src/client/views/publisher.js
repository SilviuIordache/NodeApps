const publishersView = Vue.component('publishersView', {
  data: function () {
    return {
      entries: []
    }
  },
  created: function () {
    this.getPublisherEntries('Sesame Workshop,');
  },
  beforeRouteUpdate: function (to, from, next) {
    this.getPublisherEntries(to.query.name);
    window.scrollTo(0, 0);
    next();
  },
  methods: {
    getPublisherEntries: function (name) {
      let url = '/publisher?';
      if (name)   url += 'name=' + name; 

      axios(url)
        .then((res) => {
          //grabbing what I need from the res obj
          if (res.data.length > 0) {
            this.entries = res.data[0].publications;
          } else {
            this.entries = [{id: '-', title: 'no results'}];
          }
        });
    }
  },
  template: `
    <article class="container">
      <div class="row">

        <div class="col col-md-2">
          <filter-bar></filter-bar>
        </div> 

        <div class="col col-md-10">
          <div class="col">

            <div class="row">
              <search :redirPath="'/publisher'"> </search>
            </div>

            <div class="row">
              <entry-list :entries='entries'></entry-list>
            </div>

          </div>
        </div> 

      </div> 
    </article>
  `
})