// Define a new component called navigation
Vue.component('navigation', {
  template: `
    <nav class="navbar navbar-light bg-light fixed-top">
      <a class="navbar-brand" href="https://installeranalytics.com">
        <img width="32" height="32" 
          src="https://installeranalytics.com/common/images/Installer_Analytics_Logo_No_Text.svg"/>
      </a>
      <div class="nav justify-content-end">
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

