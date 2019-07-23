// Define a new component called navigation
Vue.component('navigation', {
  template: `
    <nav class="navbar navbar-light bg-light fixed-top">

      <a class="navbar-brand" href="https://installeranalytics.com">
        <img width="32" height="32" 
          src="https://installeranalytics.com/common/images/Installer_Analytics_Logo_No_Text.svg"/>
      </a>

      <div class="nav justify-content-end">

        <router-link class="nav-item" :to="{ path: '/media'}">
          <a class="nav-link">  MEDIA  </a>
        </router-link>

        <router-link class="nav-item" :to="{ path: '/publisher/top'}">
          <a class="nav-link">  PUBLISHERS  </a>
        </router-link>

        <router-link class="nav-item" :to="{ path: '/author'}">
          <a class="nav-link"">  AUTHOR  </a>
        </router-link>

      </div>
    </nav>
    `
});

