const Home = () => import('../pages/home.vue')
const Index = () => import('../pages/index.vue')
const SmallHouse = () => import('../pages/small-house.vue')

const routes = [
  { path: '/', component: Index },
  { path: '/small-house', component: SmallHouse},
]

export {routes}