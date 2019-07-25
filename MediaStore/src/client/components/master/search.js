Vue.component('search', {
  props: ['path'],
  data: function (){
    return {
      searchData: ''
    }
  },
  methods: {  
    searchStart: function () {
        router.push({
          path: this.path,
          query: {
            name: this.searchData
          }
        });
    }
  },
  template:   `
  <div class = "row">
    <div class="search-bar mb-3 col-6" @keyup.enter="searchStart" >
      <input class="form-control" 
            type="text" 
            placeholder="Search" 
            aria-label="Search" 
            v-model="searchData">
    </div>
  </div>
  `
})