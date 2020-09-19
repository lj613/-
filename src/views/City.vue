<template>
  <div class="city_body">
    <Header title="城市" ref="myheader">
      <template v-slot:left>
        <div class="left">
          <span class="iconfont icon-cross" @click="clickHandle"></span>
        </div>
      </template>
    </Header>
    <mt-index-list class="city-container" ref="cityList">
      <div class="city_hot">
        <h2>热门城市</h2>
        <ul class="clearfix">
          <li
            v-for="hotcity in hotcitys"
            :key="hotcity.cityId"
            @click="handleToCity(hotcity.name,hotcity.cityId)"
          >{{hotcity.name}}</li>
        </ul>
      </div>
      <mt-index-section :index="item.index" v-for="item in cities" :key="item.index">
        <div
          v-for="city in item.list"
          :key="city.cityId"
          @click="handleToCity(city.name,city.cityId)"
        >
          <!-- mt-cell 不支持点击事件 -->
          <mt-cell :title="city.name"></mt-cell>
        </div>
      </mt-index-section>
    </mt-index-list>
  </div>
</template>
<script>
import axios from "axios";
import Header from "@/components/Header";

export default {
  data() {
    return {
      cities: [],
      hotcitys: []
    };
  },
  components: {
    Header
  },
  mounted() {
    var cities = window.localStorage.getItem("cities");
    var hotcitys = window.localStorage.getItem("hotcitys");
    if (cities && hotcitys) {
      this.cities = JSON.parse(cities);
      this.hotcitys = JSON.parse(hotcitys);
      // console.log("hhhhh");
    } else {
      axios({
        url: "https://m.maizuo.com/gateway?",
        headers: {
          "X-Client-Info":
            '{"a":"3000","ch":"1002","v":"5.0.4","e":"159903732863861868724225","bc":"110100"}',
          "X-Host": "mall.film-ticket.city.list"
        }
      }).then(res => {
        // console.log(res.data);
        var citysData = res.data.data.cities;
        var { newList, hotcitys } = this.handleCity(citysData);
        this.cities = newList;
        this.hotcitys = hotcitys;
        //本地存储存储的类型是字符串类型
        window.localStorage.setItem("cities", JSON.stringify(newList));
        window.localStorage.setItem("hotcitys", JSON.stringify(hotcitys));
        // console.log(this.hotcitys);
      });
    }
  },
  methods: {
    handleCity(cities) {
      //   console.log(cities);
      var letterArr = [];
      for (var i = 65; i < 91; i++) {
        letterArr.push(String.fromCharCode(i));
      }
      //   console.log(letterArr)
      var newList = [];
      for (var j = 0; j < letterArr.length; j++) {
        var arr = cities.filter(
          item => item.pinyin.substring(0, 1) === letterArr[j].toLowerCase()
        );
        var hotcitys = cities.filter(item => item.isHot);
        //   console.log(arr);
        if (arr.length > 0) {
          newList.push({
            index: letterArr[j],
            list: arr
          });
        }
      }
      //   console.log(newList);
      // return newList;
      return {
        newList,
        hotcitys
      };
    },
    handleToCity(nm, id) {
      // console.log("1111");
      this.$store.commit("city/CITY_INFO", { nm, id });
      window.localStorage.setItem("nowNm", nm);
      window.localStorage.setItem("nowId", id);
      this.$router.back();
    },
    clickHandle() {
      this.$router.push("/film/now");
    }
  },
  beforeMount() {
    this.$store.commit("HideTabbar", false);
  },
  beforeDestroy() {
    this.$store.commit("ShowTabbar", true);
  }
};
</script>
<style scoped>
.city-container {
  margin-top: 55px;
}
.icon-cross {
  font-size: 18px;
}
.city_body .city_hot {
  padding: 5px;
}
.city_body .city_hot h2 {
  padding-left: 15px;
  line-height: 30px;
  font-size: 14px;
  background: #f0f0f0;
  font-weight: normal;
}
.city_body .city_hot ul li {
  float: left;
  background: #fff;
  width: 29%;
  height: 33px;
  margin-top: 15px;
  margin-left: 3%;
  padding: 0 4px;
  border: 1px solid #e6e6e6;
  border-radius: 3px;
  line-height: 33px;
  text-align: center;
  box-sizing: border-box;
}
</style>