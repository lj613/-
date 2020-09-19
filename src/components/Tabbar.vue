<template>
  <div class="nav">
    <!-- 声明式导航 -->
    <ul>
      <router-link to="/film" tag="li" activeClass="tabactive">
        <span class="iconfont icon-movie"></span>电影
      </router-link>
      <router-link to="/cinema" tag="li" activeClass="tabactive">
        <span class="iconfont icon-cinema"></span>影院
      </router-link>
      <router-link to="/information" tag="li" activeClass="tabactive">
        <span class="iconfont icon-message"></span>咨讯
      </router-link>
      <router-link to="/center" tag="li" activeClass="tabactive">
        <span class="iconfont icon-my"></span>我的
      </router-link>
    </ul>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.tabactive {
  color: #ff5f16;
}
.nav {
  margin-top: 40px;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background-color: white;
  z-index: 9;
}
.nav ul {
  width: 100%;
  display: flex;
  height: 50px;
  justify-content: space-between;
  align-items: center;
}
ul li {
  /* border: 1px solid pink; */
  flex: 1;
  font-size: 12px;
  height: 40px;
  /* line-height:50px; */
  text-align: center;
  display: flex;
  flex-direction: column;
  color: #797d82;
}
ul li .iconfont {
  margin-top: 3px;
  font-size: 20px;
}
ul .iconfont.icon-my {
  font-weight: 700;
}
</style>