<template>
  <div class="movie">
    <ul v-if="comingList.length"
      v-infinite-scroll="loadMore"
      infinite-scroll-distance="10"
      infinite-scroll-disabled="loading"
      infinite-scroll-immediate-check="false"
    >
      <li
        v-for="data in comingList"
        :key="data.filmId"
        @click="handleClick(data.isPresale,data.filmId)"
      >
        <img :src="data.poster" />
        <div class="info">
          <div class="name-box">
            <span class="name">{{data.name}}</span>
            <span class="item">{{data.item.name}}</span>
          </div>
          <span
            v-if="data.actors"
            class="actors label line-ellipsis"
          >主演：{{data.actors | actorfilter}}</span>
          <span v-else class="actors label">暂无主演</span>
          <div class="detail-box">
            <span class="label">上映日期: {{ data.premiereAt | formatDate}}</span>
          </div>
        </div>
        <div v-if="data.isPresale" class="buy">预购</div>
      </li>
    </ul>
    <div v-show="isShow">正在加载中...</div>
    <div style="height:50px"></div>
  </div>
</template>
<script>
import Vue from "vue";
import { MessageBox } from "mint-ui";
import axios from "axios";
import { InfiniteScroll } from "mint-ui";
Vue.use(InfiniteScroll);

Vue.filter("actorfilter", function(item) {
  var newlist = item.map(item => item.name);
  return newlist.join(" ");
});
export default {
  data() {
    return {
      comingList: [],
      total: 0,
      loading: false,
      current: 1,
      isShow: true,
      prevCityId: -1
    };
  },
  filters: {
    formatDate: function(value) {
      let date = new Date(value * 1000);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      return y + "年" + MM + "月" + d + "日";
    }
  },
  methods: {
    handleClick(data, id) {
      if (!data) {
        MessageBox({
          title: "提示",
          message: "该影片目前还没有排期，到首页看其他电影吧",
          showCancelButton: true
        }).then(res => {
          console.log(res);
          if (res === "confirm") {
            // console.log("回到首页");
            this.$router.push(`/film/nowplaying`);
          }
        });
      }
      this.$router.push({
        name: "detail",
        params: { id: id }
      });
    },
    loadMore() {
      // console.log("到底了");
      this.loading = true;
      this.current++;
      if (this.comingList.length === this.total) {
        this.isShow = false;
        return;
      }
      var cityId = this.$store.state.city.id;
      axios({
        url: `https://m.maizuo.com/gateway?cityId=${cityId}&pageNum=${this.current}&pageSize=10&type=2&k=5314021`,
        headers: {
          "X-Client-Info":
            '{"a":"3000","ch":"1002","v":"5.0.4","e":"159903732863861868724225","bc":"110100"}',
          "X-Host": "mall.film-ticket.film.list"
        }
      }).then(res => {
        // console.log(res.data);
        // console.log(res.data.data.films);
        this.comingList = [...this.comingList, ...res.data.data.films];
        this.loading = false;
      });
    }
  },
  activated(){
  // mounted() {
    var cityId = this.$store.state.city.id;
    if (this.prevCityId === cityId) {
      return;
    }
    // console.log(2222);
    axios({
      url: `https://m.maizuo.com/gateway?cityId=${cityId}&pageNum=1&pageSize=10&type=2`,
      // url:"https://m.maizuo.com/gateway?cityId=440700&pageNum=1&pageSize=10&type=2&k=2970708",
      headers: {
        "X-Client-Info":
          '{"a":"3000","ch":"1002","v":"5.0.4","e":"159903732863861868724225","bc":"440700"}',
        "X-Host": "mall.film-ticket.film.list"
      }
    }).then(res => {
      // console.log(res);
      this.comingList = res.data.data.films;
      this.total = res.data.data.total;
      this.prevCityId = cityId;
    });
  }
};
</script>
<style scoped>
.movie ul {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
}
.movie ul li {
  width: 100%;
  display: flex;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  box-sizing: border-box;
}
li img {
  width: 80px;
  margin-right: 15px;
}
.movie .info {
  flex: 1;
  font-size: 12px;
  color: #797d82;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.movie .info .name-box {
  margin-top: 8px;
}
.movie .info .name {
  color: #191a1b;
  font-size: 16px;
  font-weight: 500;
  line-height: 22px;
}
.movie .info .item {
  margin-left: 3px;
  font-size: 9px;
  color: #fff;
  background-color: #d2d6dc;
  height: 14px;
  line-height: 14px;
  padding: 0 2px;
  border-radius: 2px;
}
.movie .info .score-box,
.movie .info .detail-box {
  margin-top: 4px;
}
.movie .info .label {
  font-size: 13px;
  color: #797d82;
}
.movie .info .score-box .score {
  color: #ffb232;
  font-size: 14px;
}
.movie .info .actors {
  margin-top: 4px;
}
.line-ellipsis {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.movie li .buy {
  line-height: 25px;
  height: 25px;
  width: 50px;
  color: #ffb232;
  font-size: 13px;
  text-align: center;
  border-radius: 2px;
  margin-top: 35px;
  margin-left: 5px;
  border: 1px solid #ffb232;
}
</style>