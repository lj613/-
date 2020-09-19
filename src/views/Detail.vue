<template>
  <div class="film" v-if="filminfo">
    <div class="img-box">
      <img :src="filminfo.poster" class="poster" alt />
    </div>
    <div class="goback" @click="goBack">
      <span class="iconfont icon-back"></span>
    </div>

    <div class="film-detail">
      <div class="col">
        <div class="film-name">
          <span class="name">{{filminfo.name}}</span>
          <span class="item">{{filminfo.filmType.name}}</span>
        </div>
        <div class="film-grade" v-if="filminfo.grade">
          <span class="grade">{{filminfo.grade}}</span>
          <span class="grade-text">分</span>
        </div>
      </div>
      <div class="film-category grey-text">{{filminfo.category}}</div>
      <div class="film-premiere-time grey-text">{{filminfo.premiereAt | formatDate}} 上映</div>
      <div class="film-nation-runtime grey-text">{{filminfo.nation}} | {{filminfo.runtime}}分钟</div>
      <div class="film-synopsis grey-text hidde">
        <!-- 东京都内发生了三起杀人事件。警方从所有案发现场都遗留有的无法解释的数列推断出这是一系列带有预告信息的连环杀人案，
        并就此展开了侦查。警视厅搜查一课的精英刑警新田浩介 （ 木村拓哉 饰）破译出该数字预示着下一次作案的场所，
        他由此推测东京柯尔特西亚酒店将会成为第4起命案现场。然而凶手是谁却毫无线索。警方因此决定潜入东京柯尔
        特西亚进行调查，新田则要扮作前台人员追查凶手。受命指导他的是东京柯尔特西亚的优秀前台员工山岸尚美
        （ 长泽雅美 饰）。面对接连出现的来历不明的住客，作为刑警的新田“以逮捕犯人为第一要务”，试图剥下来客的“假面”，
        而作为酒店工作人员的尚美则从“以确保客人的安全为第一要务”的原则出发，希望保护来客的“假面”，两人势如水火。
        新田和尚美因为彼此的立场差异数次发生冲突，然而随着潜伏调查的推进，他们逐渐理解了彼此作为专业人士的价值观，
        两人之间开始萌生出不可思议的信赖关系...... -->
        {{filminfo.synopsis}}
      </div>
    </div>
    <div class="actors">
      <div class="actors-title-bar">
        <span class="actors-title-text">演职人员</span>
      </div>
      <div class="actors-list-bar" v-if="filminfo.actors">
        <swiper perview="4">
        <!-- <swiper > -->
          <swiper-slide class="actors-slide" v-for="(item,index) in filminfo.actors" :key="index">
            <img :src="item.avatarAddress" alt />
            <p class="actors-name">{{item.name}}</p>
            <p class="actors-role">{{item.role}}</p>
          </swiper-slide>
        </swiper>
      </div>
      <div v-else class="none">暂无演职人员</div>

    </div>

    <div class="photos">
      <div class="photos-title-bar">
        <span class="photos-title-text">剧照</span>
      </div>
      <div class="photos-list-bar">
        <swiper perview="3">
          <swiper-slide class="photos-slide" v-for="(item,index) in filminfo.photos" :key="index">
            <img :src="item" alt />
          </swiper-slide>
        </swiper>
      </div>
    </div>

    <a href="#">
      <div class="goSchedule">
        选座购票
      </div>
    </a>
  </div>
</template>
<script>
import axios from "axios";
import swiper from "./Detail/DetailSwiper";
export default {
  data() {
    return {
      id: "",
      filminfo: null
    };
  },
  components: {
    swiper
  },
   filters: {
      formatDate: function (value) {
        let date = new Date(value * 1000);
        let y = date.getFullYear();
        let MM = date.getMonth() + 1;
        MM = MM < 10 ? ('0' + MM) : MM;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        let h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        let m = date.getMinutes();
        m = m < 10 ? ('0' + m) : m;
        let s = date.getSeconds();
        s = s < 10 ? ('0' + s) : s;
        return y + '年' + MM + '月' + d + '日';
      }
    },
  methods: {
    goBack(){
       this.$router.back();
    }
  },

  beforeMount() {
    this.$store.commit("HideTabbar", false);
  },
  mounted() {
    this.id = this.$route.params.id;
    // console.log("获取详细信息：", this.$route.params.id, this.id);
    axios({
      url: `https://m.maizuo.com/gateway?filmId=${this.$route.params.id}&k=5116873`,
      headers: {
        "X-Client-Info":
          '{"a":"3000","ch":"1002","v":"5.0.4","e":"159903732863861868724225","bc":"310100"}',
        "X-Host": "mall.film-ticket.film.info"
      }
    }).then(res => {
      // console.log(res.data);
      console.log(res.data.data.film);
      this.filminfo = res.data.data.film;
    });
  },
  beforeDestroy() {
    this.$store.commit("ShowTabbar", true);
  }
};
</script>
<style scoped>
.film {
  width: 100%;
  height: 100%;
  background-color: #ddd;
}
.film .img-box {
  
  width: 100%;
  height: 200px;
  overflow: hidden;
}
.film .poster {
  position: relative;
  width: 100%;
}
.swiper-slide.actors-slide img {
  /* width: 60px; */
    width: 100%;
}
.swiper-slide.photos-slide img {
  /* width: 100px;
  overflow: hidden;
  display: inline-block; */
  width: 100%;
}
.goback {
  height: 30px;
  width: 30px;
  position: absolute;
  top: 5px;
  left: 5px;
  border-radius: 50%;
  background-color: red;
  text-align: center;
  line-height: 30px;
  background-color: rgb(248, 242, 242);
  background: rgba(248, 242, 242, 0.5);
}
.goback .icon-back {
  font-size: 20px;
  font-weight: 600;
}
.film .film-detail {
  padding: 15px;
  padding-top: 12px;
  background-color: #fff;
}
.film .film-detail .grey-text {
  font-size: 13px;
  color: #797d82;
  margin-top: 4px;
}
.film .film-detail .col {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.film .film-detail .film-name {
  width: 256px;
}
.film .film-detail .film-name span {
  vertical-align: middle;
}
.film .film-detail .film-name .name {
  color: #191a1b;
  font-size: 18px;
  height: 24px;
  line-height: 24px;
  margin-right: 7px;
}
.film .film-detail .film-name .item {
  font-size: 9px;
  color: #fff;
  background-color: #d2d6dc;
  height: 14px;
  line-height: 14px;
  padding: 0 2px;
  border-radius: 2px;
  display: inline-block;
}
.film .film-detail .film-grade {
  width: calc(100% - 250px);
  text-align: right;
  color: #ffb232;
}
.film .film-detail .film-grade .grade {
  font-size: 18px;
  font-style: italic;
}
.film .film-detail .film-grade .grade-text {
  font-size: 10px;
}

.film .actors {
  margin-top: 10px;
  background-color: #fff;
}
.film .actors .none{
  width: 100%;
  height: 170px;
  background-color: #fff;
  text-align: center;
  line-height: 170px;
  font-size: 14px;
    color: #bdc0c5;

}
.film .actors .actors-title-bar {
  width: 100%;
  padding: 15px;
}
.film .actors .actors-title-bar span {
  display: inline-block;
  height: 22.5px;
  line-height: 22px;
}
.film .actors .actors-name {
    padding-top: 10px;
    font-size: 12px;
    color: #191a1b;
    width: 85px;
    height: 18px;
    display: block;
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.film .actors .actors-role {
    padding-top: 5px;
    font-size: 12px;
    color: #191a1b;
    width: 85px;
    height: 18px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.film .actors .actors-title-bar .actors-title-text {
  font-size: 16px;
  text-align: left;
  color: #191a1b;
}
.film .actors .actors-list-bar {
  padding-left: 15px;
}
.film .photos {
  margin-top: 10px;
  margin-bottom: 60px;
  background-color: #fff;
}
.film .photos .photos-title-bar {
  height: 62px;
  width: 100%;
  padding: 15px;
}
.film .photos .photos-title-bar .photos-title-text {
  font-size: 16px;
  text-align: left;
  color: #191a1b;
}
.film .photos .photos-list-bar {
  padding-left: 15px;
}
.film .goSchedule {
    position: fixed;
    bottom: 0;
    left: 0;
    height: 49px;
    width: 100%;
    text-align: center;
    background-color: #ff5f16;
    color: #fff;
    font-size: 16px;
    line-height: 49px;
    z-index:99;
}
div {
  box-sizing: border-box;
}
</style>