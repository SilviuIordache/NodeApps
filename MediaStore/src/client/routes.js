const routes = [
  { path: '/media', component: mediaLibrary },
  { path: '/media/add', component: mediaForm },
  { path: '/media/edit', component: mediaForm },
  { path: '/media/:id', component: getDetailedView },
  //{ path: '/publisher', component: publishersView },
  { path: '/publisher/top', component: publisherView },
];

const router = new VueRouter({
  routes // short for `routes: routes`
});