const routes = [
  { path: '/', component: mediaItems },
  { path: '/addItem', component: addMedia },
  { path: '/id/:id', component: getDetailedView},
  { path: '/page/:page', component: mediaItems }
];

const router = new VueRouter({
  routes // short for `routes: routes`
});