import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/heroes/:id',
    name: 'hero-page',
    component: () =>
      import(
        /* webpackChunkName: "hero-page" */ '../components/Heroes/hero-page.vue'
      )
    // beforeEnter: (to, from, next) => {
    //   const exists = this.$store.searchResults.find(
    //     hero => hero.id === to.params.id
    //   )
    //   if (exists) {
    //     next()
    //   } else {
    //     next({ name: 'notFound' })
    //   }
    // }
  },
  {
    path: '/favorite',
    name: 'Favorite',
    component: () =>
      import(/* webpackChunkName: "favorite" */ '../views/Favorite.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
