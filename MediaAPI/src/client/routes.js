const routes = [
  { path: '/', component: mediaComp },
  { path: '/addItem', component: addMediaComp },
];

const router = new VueRouter({
  routes // short for `routes: routes`
});