import Vue from 'vue'
import Vuex from 'vuex'
import city from './city'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //自定义的共享状态
    //控制tabbar的显示与隐藏
    isTabbarShow: true,
  },
  mutations: {    //唯一修改状态的位置
    HideTabbar(state, data) {
      // console.log("HideTabbar");
      state.isTabbarShow = data;
    },
    ShowTabbar(state, data) {
      state.isTabbarShow = data;
    },
    
  },
  actions: {  //异步处理
  
  },
  modules: {
    city

  }
})
