// Define a new component called navigation
Vue.component('navigation', {
  data: function (){
    return {
      searchData: ''
    }
  },
  methods: {  
    searchStart: function () {
        router.push({
          path: '/media',
          query: {
            name: this.searchData
          }
        });
    }
  },
  template: `
    <nav class="navbar navbar-light bg-light fixed-top">

      <a class="navbar-brand" href="https://installeranalytics.com">
        <img width="32" height="32" 
          src="https://installeranalytics.com/common/images/Installer_Analytics_Logo_No_Text.svg"/>
      </a>

      <div class="nav justify-content-end">
        <div @keyup.enter="searchStart()" class="search-bar mb-3">
          <input class="form-control" 
                 type="text" 
                 placeholder="Search" 
                 aria-label="Search" 
                 v-model="searchData">
        </div>

        <a class="nav-item nav-link" href="#/media/"> 
          Media 
        </a>

        <a class="nav-item nav-link" href="#/publishers/"> 
          Publishers 
        </a>

        <a class="nav-item nav-link" href="#/media/add"> 
          (+) New 
        </a>
      </div>
    </nav>
    `
});

