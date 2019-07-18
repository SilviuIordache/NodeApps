// Define a new component called navigation
Vue.component('navigation', {
  data: function (){
    return {
      searchData: '',
      searchWords: [],
      mediaItems: []
    }
  },
  methods: {  
    searchStart: function () {
      // grab input and split it by space ' ' and store it into an array
      this.searchWords = this.searchData.split(' ');

      // do search stuff
      console.log(`starting search with words: ${this.searchWords}`);

        // http://localhost:3000/media/search?field=Dragnea&page=0
        // join key words in a string
        this.searchWords = this.searchWords.join('%20');

        console.log(`search keys after join: ${this.searchWords}`);

        // attach the words to the path
        axios(`/media/search?name=${this.searchWords}&page=${$route.}`)
        .then((resp) => {
          // update the media items view
          this.mediaItems = resp.data;
        });
        
        console.log(`data: ${this.mediaItems}`);

      // clear search input
      this.searchData = ''
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
          <input class="form-control" type="text" placeholder="Search" aria-label="Search" v-model="searchData">
        </div>

        <a class="nav-item nav-link" href="#/"> 
          Media 
        </a>

        <a class="nav-item nav-link" href="#/addItem"> 
          (+) New 
        </a>
      </div>
    </nav>
    `
});

