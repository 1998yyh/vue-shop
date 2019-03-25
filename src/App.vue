<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
    <FooterGuide v-show="$route.meta.show"/>
  </div>
</template>

<script>
  import FooterGuide from "@/components/FooterGuide/FooterGuide"
  import {mapActions} from 'vuex'
  export default {
    name: 'App',
    components :{
      FooterGuide
    },
    mounted (){
      this.getAddress()
      this.getUserInfo()
    },
    methods: {
      ...mapActions(['getAddress', 'getUserInfo'])
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .app
    width 100%
    height 100%
    background #f5f5f5
</style>
