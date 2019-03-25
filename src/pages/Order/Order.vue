<template>
  <div class="order">
    <HeaderTop title="订单列表"></HeaderTop>
    <section class="order_no_login" v-if="!userInfo._id">
      <img src="./images/person.png">
      <h3>登录后查看外卖订单</h3>
      <router-link to="/login" tag="button">立即登陆</router-link>
    </section>
    <section class="food-list-wrap" v-else>
      <ul class="food-list">
        <li v-for="(food,index) in shopCar" :key="index">
          <img :src="food.image" alt="">
          <p>{{food.name}}</p>
          <Count :food="food"/>
        </li>
      </ul>
    </section>
    <section class="settle" v-if="userInfo._id && shopCar.length">
      <mt-button type="danger" class="toSettle" @click="pay">结算</mt-button>
    </section>
  </div>
</template>

<script>
  import HeaderTop from "@/components/HeaderTop/HeaderTop"
  import Count from "@/components/Count/Count"
  import { mapState,mapGetters } from "vuex"
  import { Toast } from "mint-ui"
	export default {
		name: "MSite",
    components :{
      HeaderTop,
      Count
    },
    computed :{
      ...mapState(["userInfo","shopCar"]),
      ...mapGetters(["totalPrice"])
    },
    methods: {
		  pay() {
		    const { totalPrice } = this
        Toast(`共计${totalPrice}元`)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .order  //订单
    width 100%
    .order_no_login
      padding-top 140px
      width 60%
      margin 0 auto
      text-align center
      >img
        display block
        width 100%
        height 30%
      >h3
        padding 10px 0
        font-size 17px
        color #6a6a6a
      >button
        display inline-block
        background #f69
        font-size 14px
        color #fff
        border 0
        outline none
        border-radius 5px
        padding 10px 20px
    .food-list-wrap
      padding-top 80px
      .food-list  
        width 98%
        
        margin 0 auto
        li
          margin-top 1px
          box-sizing border-box
          display: flex
          justify-content space-between
          align-items center
          width 100%
          padding 5px
          border-bottom 1px solid gray
          &:first-child
            border-top 1px solid gray
          img
            display inline-block
            width 50px
            height 50px
          p
            max-width 120px
            overflow hidden
            white-space nowrap
            text-overflow: ellipsis
            display inline-block
            font-size 16px
            line-height 30px
            color #666
    .settle
      margin-bottom 100px
      .toSettle
        margin-top 20px
        text-align center
        width 100%
        height 40px
        line-height 40px
</style>
