import Vue from 'vue'
import Router from 'vue-router'


import MSite from '@/pages/MSite/MSite'
import Order from '@/pages/Order/Order'
import Profile from '@/pages/Profile/Profile'
import Search from '@/pages/Search/Search'
import Login from '@/pages/Login/Login'
import Shop from '@/pages/Shop/Shop'
import ShopGoods from '@/pages/Shop/ShopGoods/ShopGoods'
import ShopInfo from '@/pages/Shop/ShopInfo/ShopInfo'
import ShopRatings from '@/pages/Shop/ShopRatings/ShopRatings'


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
      path: '/shop',
      component: Shop,
      children: [
        {
          path: '/shop/goods',
          component: ShopGoods
        },
        {
          path: '/shop/ratings',
          component: ShopRatings
        },
        {
          path: '/shop/info',
          component: ShopInfo
        },
        {
          path: '',
          redirect: '/shop/goods'
        },
      ]
    },
    {
      path:"/",
      redirect:"/msite"
    }
  ]
})
