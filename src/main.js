import { createApp } from 'vue'
import * as VueRouter from 'vue-router';
import './style.css'
import App from './App.vue'
import {routes} from './router/index'
const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})
const app = createApp(App)

app.use(router)
app.mount('#app')
