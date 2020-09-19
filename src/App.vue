<template>
  <div id="app">
     <!-- 路由容器 -->
     <router-view></router-view>
    <tabbar v-show="isTabbarShow"></tabbar>
    <!-- <tabbar v-show="isShow"></tabbar> -->

  </div>
</template>
<script>
// import axios from 'axios'
import tabbar from '@/components/Tabbar'
import {mapState} from 'vuex'
export default {
  data() {
    return {
    }
  },
  components:{
    tabbar
  },

  mounted() {
  
  },
  // computed: {
  //   isShow(){
  //     return this.$store.state.isTabbarShow
  //   }
  // },
  // 可修改为下面写法
  computed: {
    ...mapState(["isTabbarShow"])
  },
  
}
</script>
<style >
*{
  margin: 0;
  padding: 0;
}
html{
  width: 100%;
  height: 100%;
}
li{
  list-style: none;
}
</style>
