import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '@/store/index'

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
      ),
    beforeEnter: (to, from, next) => {
      // ked id zo storu nenajde, otvori notFound stranku
      const heroes = [...store.state.searchResults, ...store.state.favorites]
      let nieco = +to.params.id
      const exists = heroes.find(hero => hero.id === nieco)
      //   console.log(+to.params.id)
      if (exists) {
        next()
      } else {
        next({ name: 'notFound' })
      }
    }
  },
  {
    path: '/favorite',
    name: 'Favorite',
    component: () =>
      import(/* webpackChunkName: "favorite" */ '../views/Favorite.vue')
  },
  {
    path: '/notfound',
    name: 'notFound',
    component: () =>
      import(/* webpackChunkName: "notFound" */ '../views/notFound.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
