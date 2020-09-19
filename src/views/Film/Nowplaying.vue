<template>
  <div class="movie">
    <ul v-if="list.length"
      v-infinite-scroll="loadMore"
      infinite-scroll-distance="10"
      infinite-scroll-disabled="loading"
      infinite-scroll-immediate-check="false"
    >
      <li v-for="item in list" :key="item.filmId" @click="changepage(item.filmId)">
        <img :src="item.poster" />
        <div class="info">
          <div class="name-box">
            <span class="name">{{item.name}}</span>
            <span class="item">{{item.item.name}}</span>
          </div>
          <div class="score-box">
            <span class="label" v-if="item.grade">观众评分</span>
            <span v-else class="label">暂无评分</span>
            <span class="score">{{item.grade}}</span>
          </div>
          <span
            v-if="item.actors"
            class="actors label line-ellipsis"
          >主演：{{item.actors | actorfilter}}</span>
          <span v-else class="actors label">暂无主演</span>
          <div class="detail-box">
            <span class="label">{{item.nation}} | {{item.runtime}} 分钟</span>
          </div>
        </div>
        <div v-if="item.isPresale" class="buy">购票</div>
      </li>
    </ul>
    <div v-show="isShow">努力加载中...</div>
    <div style="height:50px"></div>
  </div>
</template>
<script>
import axios from "axios";
import Vue from "vue";
import { InfiniteScroll } from "mint-ui";

Vue.use(InfiniteScroll);

Vue.filter("actorfilter", function(item) {
  var newlist = item.map(item => item.name);
  return newlist.join(" ");
});
export default {
  data() {
    return {
      list: [],
      total: 0,
      loading: false,
      current: 1,
      isShow: true,
      prevCityId: -1
    };
  },
  //由于有缓存时，mounted 不会再执行  使用keep-alive 激活时的生命周期  activated
  activated(){
  // mounted() {
    // console.log(111)
    var cityId = this.$store.state.city.id;
    // console.log(cityId);
    if (this.prevCityId === cityId) {
      return;
    }
    // console.log(111);

    axios({
      url: `https://m.maizuo.com/gateway?cityId=${cityId}&pageNum=1&pageSize=10&type=1`,
      // "https://m.maizuo.com/gateway?cityId=310100&pageNum=1&pageSize=10&type=1&k=9426338",
      headers: {
        "X-Client-Info":
          '{"a":"3000","ch":"1002","v":"5.0.4","e":"159903732863861868724225","bc":"310100"}',
        "X-Host": "mall.film-ticket.film.list"
      }
    }).then(res => {
      // console.log(res.data);
      this.list = res.data.data.films;
      this.total = res.data.data.total;
      this.prevCityId = cityId;
      // console.log(this.total)
    });
  },
  methods: {
    changepage(id) {
      // console.log(id);
      //   1.路径跳转
      //   this.$router.push(`/detail/${id}`)
      //2.名字跳转
      this.$router.push({
        name: "detail",
        params: { id: id }
      });
    },
    loadMore() {
      // console.log("到达底部了");
      this.loading = true;
      // console.log(this.isShow);
      this.current++;
      // console.log(this.total)
      if (this.list.length === this.total) {
        this.isShow = false;
        return;
      }
      // console.log(this.isShow);
      var cityId = this.$store.state.city.id;
      axios({
        url: `https://m.maizuo.com/gateway?cityId=${cityId}&pageNum=${this.current}&pageSize=10&type=1`,
        headers: {
          "X-Client-Info":
            '{"a":"3000","ch":"1002","v":"5.0.4","e":"159903732863861868724225","bc":"310100"}',
          "X-Host": "mall.film-ticket.film.list"
        }
      }).then(res => {
        // console.log(res.data);
        // console.log(res.data.data.films);
        this.list = [...this.list, ...res.data.data.films];
        this.loading = false;
        this.prevCityId = this.cityId;
        // console.log(this.isShow)
      });
    }
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
  color: #ff5f16;
  font-size: 13px;
  text-align: center;
  border-radius: 2px;
  margin-top: 35px;
  margin-left: 5px;
  border: 1px solid #ff5f16;
}
</style>