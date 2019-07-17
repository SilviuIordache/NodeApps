const routes = [
  { path: '/', component: mediaItems },
  { path: '/addItem', component: addMedia },
];

const router = new VueRouter({
  routes // short for `routes: routes`
});