<template>
  <div>
    <div class="goods">
      <!--左侧滚动-->
      <div class="menu-wrapper">
        <ul>
          <li class="menu-item" :class="{current: index===currentIndex}" v-for="(good,index) in goods" :key="index" @click="clickMenu(index)">
            <span class="text bottom-border-1px">
              <img class="icon" :src="good.icon" v-if="good.icon">
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>
      <!--右侧滚动-->
      <div class="foods-wrapper" ref="foodsList">
        <ul>
          <li class="food-list-hook" v-for="(good,index) in goods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="(food,index) in good.foods" :key="index" @click="showFood(food)">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率 {{food.rating}}%</span></div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <count :food="food"/>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <ShopCar/>
    </div>
    <food-detail :food="food" ref="food"/>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import {mapState} from "vuex"
  import Count from "@/components/Count/Count"
  import FoodDetail from "@/components/FoodDetail/FoodDetail"
  import ShopCar from "@/components/ShopCar/ShopCar"

  export default {
    name: "ShopGoods",
    data (){
      return {
        scrollY: 0, // 右侧滑动的Y轴坐标 (滑动过程时实时变化)
        tops: [], // 所有右侧分类li的top组成的数组  (列表第一次显示后就不再变化)
        food: {}, // 需要显示的food
      }
    },
    mounted() {
      this.$store.dispatch("getShopGoods",()=>{
        this.$nextTick(()=>{
          this._initScroll()
          this._initTops()
        })
      })

    },
    methods :{
      //非事件相关的回调函数  用_标识出来
      _initScroll() {
        const menuScroll = new BScroll(".menu-wrapper",{
          click:true
        })
        this.foodScroll = new BScroll(".foods-wrapper",{
          probeType : 2, // 1，2，3 惯性滑动
          click:true
        })
        ///右侧列表绑定监听
        this.foodScroll.on("scroll",({x, y})=>{
          this.scrollY = Math.abs(y)
        })

        this.foodScroll.on('scrollEnd', ({x, y}) => {
          this.scrollY = Math.abs(y)
        })
      },
      _initTops() {
        const tops = []
        let top = 0
        tops.push(top)

        const lis = this.$refs.foodsList.querySelectorAll(".food-list-hook")
        Array.prototype.slice.call(lis).forEach(li=>{
          top += li.clientHeight
          tops.push(top)
        })
        this.tops = tops
      },
      clickMenu(index) {
        const scrollY = this.tops[index]
        this.scrollY = scrollY
        this.foodScroll.scrollTo(0, -scrollY, 300)
      },
      showFood(food){
        //设置与显示
        this.food = food
        this.$refs.food.toggleShow()
      }
    },
    computed :{
      ...mapState(["goods"]),
      currentIndex(){
        const {scrollY,tops} = this
        const index = tops.findIndex((top, index) => {
          return scrollY >= top && scrollY < tops[index + 1]
        })

        return index
      }
    },
    components :{
      Count,
      FoodDetail,
      ShopCar
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"
  .goods
    display: flex
    position: absolute
    top: 195px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f5
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: #6699ff
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
