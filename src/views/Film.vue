<template>
  <div>
    <Header title="电影" ref="myheader">
      <template v-slot:left>
        <div class="left">
          <span class="name" @click="clickToCity">{{$store.state.city.nm}}</span>
          <span class="iconfont icon-dropdown"></span>
        </div>
      </template>
    </Header>
    <filmheader :class="isFixed?'fixed':''"></filmheader>
    <keep-alive>
    <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
import swiper from "@/views/Film/Swiper";
import filmheader from "@/views/Film/FilmHeader";
import axios from "axios";
import { Indicator } from "mint-ui";
import Header from "@/components/Header";

export default {
  data() {
    return {
      swiperlist: [],
      isFixed: false
    };
  },
  components: {
    swiper,
    filmheader,
    Header
  },
  mounted() {
    Indicator.open({
      text: "加载中...",
      spinnerType: "fading-circle"
    });
    axios({
      url: "https://m.maizuo.com/gateway?type=2&cityId=310100",
      headers: {
        "X-Client-Info":
          '{"a":"3000","ch":"1002","v":"5.0.4","e":"159903732863861868724225","bc":"310100"}',
        "X-Host": "mall.cfg.common-banner"
      }
    }).then(res => {
      // console.log(res.data);
      this.swiperlist = res.data.data;
      // console.log(this.swiperlist);
      Indicator.close();
    });

    window.onscroll = this.handleScroll;
  },
  beforeDestroy() {
    window.onscroll = null;
  },
  methods: {
    handleScroll() {
      // console.log(this.$refs.myheader.$el.clientHeight);
      if (
        document.documentElement.scrollTop >= this.$refs.myheader.$el.clientHeight
      ) {
        // console.log("fixed");
        this.isFixed = true;
      } else {
        // console.log("unfixed");
        this.isFixed = false;
      }
    },

    clickToCity() {
      this.$router.push(`/city`);
    }
  }
};
</script>
<style scoped>
</style>