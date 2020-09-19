import Vue from 'vue'
import VueRouter from 'vue-router'
import Center from '@/views/Center'
import Film from '@/views/Film'
import Comingsoon from '@/views/Film/Comingsoon'
import Nowplaying from '@/views/Film/Nowplaying'
import Cinema from '@/views/Cinema'
import Detail from '@/views/Detail'
import Information from '@/views/Information'
import Login from '@/views/Login'
import City from '@/views/City'


Vue.use(VueRouter)
const auth = {
  isLogin() {
    // return false;
    return true;
  }
}

const routes = [
  {
    path: '/film',
    name: 'film',
    component: Film,
    children: [
      {
        path: 'now',
        component: Nowplaying
      },
      {
        path: 'com',
        component: Comingsoon
      },
      {
        path: '',
        redirect: '/film/now'
      }
    ]

  },
  {
    path: '/cinema',
    name: 'cinema',
    component: Cinema,

  },
  {
    path: '/information',
    name: 'information',
    component: Information
  },
  {
    path: '/center',
    name: 'center',
    component: Center
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/city',
    name: 'city',
    component: City
  },
  {
    //动态路由
    path: '/detail/:id',
    name: 'detail',
    component: Detail
  },
  {
    path: '*',
    redirect: '/film'

  },
  // {
  //   path: '/cinema',
  //   name: 'cinema',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  // mode:'history',
  routes
})

//全局守卫
// router.beforeEach((to,from,next) => {
//   if(to.path === '/center'){
//     console.log("盘查")
//     if(auth.isLogin()){
//       next();
//     }else{
//       next("/login");
//     }
//   }else{
//     next();
//   }
// })
export default router
