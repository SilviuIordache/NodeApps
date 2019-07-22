const routes = [
  { path: '/media', component: mediaItems },
  { path: '/media/add', component: mediaForm },
  { path: '/media/edit', component: mediaForm },
  { path: '/media/:id', component: getDetailedView },
  { path: '/publishers', component: publishersView }
];

const router = new VueRouter({
  routes // short for `routes: routes`
});