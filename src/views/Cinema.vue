<template>
  <div id="cinema">
    <Header title="影院">
      <template v-slot:left>
        <div class="left">
          <span class="name" @click="clickToCity">{{$store.state.city.nm}}</span>
          <span class="iconfont icon-dropdown"></span>
        </div>
      </template>
      <template v-slot:right>
        <div class="right">
          <span class="iconfont icon-search"></span>
        </div>
      </template>
    </Header>
    <div class="cinema-list" :style="mystyle">
      <ul>
        <li v-for="data in datalist" :key="data.cinemaId">
          <div class="title-box flex">
            <span class="title line-ellipsis">{{data.name}}</span>
            <div class="price">
              ￥{{data.lowPrice}}
              <span>起</span>
            </div>
          </div>
          <div class="address-box flex">
            <span class="address line-ellipsis">{{data.address}}</span>
            <div class="distance">距离未知</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import BScroll from "better-scroll";
import Header from "@/components/Header";
export default {
  data() {
    return {
      datalist: [],
      mystyle: {
        height: "0px",
        prevCityId: -1
      }
    };
  },
  components: {
    Header
  },
  methods: {
    clickToCity(){
         this.$router.push(`/city`)
    }
  },
  mounted() {
    // console.log(document.documentElement.clientHeight)
    this.mystyle.height = document.documentElement.clientHeight - 50 + "px";
    // var cityId = localStorage.getItem("cityId");
    var cityId = this.$store.state.city.id;
    if (this.prevCityId === cityId) {
      return;
    }
    // console.log(cityId);
    axios({
      // url: `https://m.maizuo.com/gateway?cityId=${cityId}&ticketFlag=1&k=9963454`,
      url: `https://m.maizuo.com/gateway?cityId=${cityId}&ticketFlag=1&k=9656793`,
      headers: {
        "X-Client-Info":
          '{"a":"3000","ch":"1002","v":"5.0.4","e":"159903732863861868724225","bc":"440700"}',
        "X-Host": "mall.film-ticket.cinema.list"
      }
    }).then(res => {
      // console.log(res.data);
      this.datalist = res.data.data.cinemas;
      this.prevCityId = cityId;

      this.$nextTick(() => {
        new BScroll(".cinema-list", {
        // new BScroll("#cinema", {
          scrollbar: {
            // fade: true,
            fade: false,
            interactive: false,
          },
             mouseWheel: true

        });
      });
    });
  }
};
</script>
<style scoped>

.cinema-list {
  margin-top: 50px;
  /* height: 500px; */
  overflow: hidden;
  position: relative;
}
.cinema-list ul {
  margin: 0 10px;
}
.cinema-list li {
  height: 80px;
  border-bottom: 1px solid #eee;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.cinema-list li .title-box {
  margin-bottom: 5px;
}

.cinema-list li .title-box .price {
  font-size: 15px;
  color: #ff5f16;
}
.cinema-list li .title-box .title {
  max-width: 80%;
  font-size: 15px;
  color: #191a1b;
}
.cinema-list li .address-box {
}
.cinema-list li .address-box .address {
  max-width: 80%;
  font-size: 12px;
  color: #797d82;
}
.cinema-list li .address-box .distance {
  font-size: 11px;
  color: #797d82;
  font-weight: 400;
}
.cinema-list li .flex {
  display: flex;
  justify-content: space-between;
}
.line-ellipsis {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.address {
  font-size: 12px;
}
</style>