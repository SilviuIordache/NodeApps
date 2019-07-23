Vue.component('search', {
  props: ['redirPath'],
  data: function (){
    return {
      searchData: ''
    }
  },
  methods: {  
    searchStart: function () {
        router.push({
          path: this.redirPath,
          query: {
            name: this.searchData
          }
        });
    }
  },
  template: 
  `
  <div @keyup.enter="searchStart" class="search-bar mb-3">
    <input class="form-control" 
            type="text" 
            placeholder="Search" 
            aria-label="Search" 
            v-model="searchData">
  </div>
  `
})