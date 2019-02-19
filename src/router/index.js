import Vue from 'vue'
import Router from 'vue-router'


import MSite from '@/pages/MSite/MSite'
import Order from '@/pages/Order/Order'
import Profile from '@/pages/Profile/Profile'
import Search from '@/pages/Search/Search'
import Login from '@/pages/Login/Login'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path:"/msite",
      component:MSite,
      meta:{
        show:true
      }
    },
    {
      path:"/order",
      component:Order,
      meta:{
        show:true
      }
    },
    {
      path:"/profile",
      component:Profile,
      meta:{
        show:true
      }
    },
    {
      path:"/search",
      component:Search,
      meta:{
        show:true
      }
    },
    {
      path:"/login",
      component:Login
    },
    {
      path:"/",
      redirect:"/msite"
    }
  ]
})
