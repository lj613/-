<template>
  <div class="film-header">
    <ul>
      <router-link to="/film/now" tag="li" activeClass="active">正在热映</router-link>
      <router-link to="/film/com" tag="li" activeClass="active">即将上映</router-link>
    </ul>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.film-header {
  margin-top: 50px;
  width: 100%;
  height: 40px;
  font-size: 0;
  box-sizing: border-box;
}
.film-header ul {
  width: 100%;
  display: flex;
  height: 40px;
  box-sizing: border-box;
  font-size: 0;
}
ul li {
  flex: 1;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 14px;
  box-sizing: border-box;
  background-color: #fff;
}

.active {
  color: plum;
  border-bottom: 2px solid plum;
}
.fixed {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 40px;
  z-index: 4;
}
</style>