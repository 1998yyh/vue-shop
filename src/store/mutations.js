import Vue from "vue"
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RESET_USER_INFO,
  RECEIVE_GOODS,
  RECEIVE_INFO,
  RECEIVE_RATINGS,
  ADD_FOOD_COUNT,
  REDUCE_FOOD_COUNT,
  CLEAR_CAR,
  RECEIVE_SEARCH_SHOPS
} from "./mutation-types"

export default {
  [RECEIVE_ADDRESS] (state,{address}){
    state.address = address
  },
  [RECEIVE_CATEGORYS] (state,{categorys}){
    state.categorys = categorys
  },
  [RECEIVE_SHOPS] (state,{shops}){
    state.shops = shops
  },
  [RECEIVE_USER_INFO] (state,{userInfo}){
    state.userInfo = userInfo
  },
  [RESET_USER_INFO] (state){
    state.userInfo = {}
  },
  [RECEIVE_INFO](state, {info}) {
    state.info = info
  },

  [RECEIVE_RATINGS](state, {ratings}) {
    state.ratings = ratings
  },

  [RECEIVE_GOODS](state, {goods}) {
    state.goods = goods
  },
  [ADD_FOOD_COUNT](state,{food}){
    if (!food.count){
      Vue.set(food,'count',1)
      state.shopCar.push(food)
    }else{
      food.count++
    }
  },
  [REDUCE_FOOD_COUNT](state,{food}){
    if (food.count){
      food.count--
      if(food.count === 0){
        state.shopCar.splice(state.shopCar.indexOf(food), 1)
      }
    }
  },
  [CLEAR_CAR](state){
    state.shopCar.forEach(food=>food.count = 0)
    state.shopCar = []
  },
  [RECEIVE_SEARCH_SHOPS](state, {searchShops}) {
    state.searchShops = searchShops
  },



}
