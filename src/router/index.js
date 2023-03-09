const Index = () => import('../pages/index.vue')
const Biography = () => import('../pages/biography.vue')
const Dopus = () => import('../pages/3Dopus.vue')
const SmallHouse = () => import('../pages/small-house.vue')

const routes = [
  { path: '/', component: Index },
  { path: '/biography', component: Biography},
  { path: '/dopus', component: Dopus,children:[
    { path: '', component: SmallHouse},
  ]},
  
]

export {routes}