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
    props: true,
    component: () =>
      import(
        /* webpackChunkName: "hero-page" */ '../components/Heroes/hero-page.vue'
      ),
    beforeEnter: (to, from, next) => {
      const exists = this.$store.searchResults.find(
        hero => hero.id === to.params.id
      )
      if (exists) {
        next()
      } else {
        next({ name: 'notFound' })
      }
    }
  }
  //   {
  //     path: "/about",
  //     name: "About",
  //     // route level code-splitting
  //     // this generates a separate chunk (about.[hash].js) for this route
  //     // which is lazy-loaded when the route is visited.
  //     component: () =>
  //       import(/* webpackChunkName: "about" */ "../views/About.vue")
  //   }
]

const router = new VueRouter({
  routes
})

export default router
