const routes = [
  { path: '/', component: mediaComp },
  { path: '/addItem', component: addMedia },
];

const router = new VueRouter({
  routes // short for `routes: routes`
});