<template>
  <div class="msite">
    <header-top :title="address.name">
      <router-link to="/search" class="header_search" slot="left">
        <i class="iconfont icon-sousuo"></i>
      </router-link>
      <router-link class="header_login" slot="right" :to="userInfo._id ? '/profile': '/login'">
        <span class="header_login_text" v-if="!userInfo._id">
          登录|注册
        </span>
        <span class="header_login_text" v-else>
           <i class="iconfont icon-person"></i>
        </span>
      </router-link>
    </header-top>
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container">
        <div class="swiper-wrapper" v-if="categorys.length">
          <div class="swiper-slide" v-for="(categorys,index) in dbcategorys" :key="index">
            <a href="javascript:" class="link_to_food" v-for="(category,index) in categorys" :key="index">
              <div class="food_container">
                <img :src="baseImageUrl + category.image_url">
              </div>
              <span>{{category.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <shop-list/>
    </div>
  </div>
</template>

<script>
  import HeaderTop from "@/components/HeaderTop/HeaderTop"
  import ShopList from "@/components/ShopList/ShopList"

  import Swiper from "swiper"
  import 'swiper/dist/css/swiper.min.css'

  import {mapState} from "vuex"
	export default {
		name: "MSite",
    data () {
      return {
        baseImageUrl: 'https://fuss10.elemecdn.com'
      }
    },
    components:{
		  HeaderTop,
      ShopList
    },
    mounted (){
      this.$store.dispatch('getCategorys')
      this.$store.dispatch('getShops')
    },
    computed :{
      ...mapState(['address','categorys',"userInfo"]),

      dbcategorys (){
        const {categorys} = this
        const arr= []
        let minArr = []
        categorys.forEach(category =>{
          if (minArr.length === 8) {
            minArr = []
          }
          if (minArr.length ===0){
            arr.push(minArr)
          }
          minArr.push(category)
        })
        return arr
      }
    },
    watch :{
		  categorys (value){
		    //界面更新立即调用
        this.$nextTick(()=>{
          new Swiper('.swiper-container',{
            loop:true,
            pagination: {
              el: '.swiper-pagination',
            }
          })
        })
      }
    }
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .msite
    width 100%
    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #f69
    .msite_shop_list
      top-border-1px(#e4e4e4)
      margin-top 10px
      background #fff
      .shop_header
        padding 10px 10px 0
        .shop_icon
          margin-left 5px
          color #999
        .shop_header_title
          color #999
          font-size 14px
          line-height 20px

</style>
