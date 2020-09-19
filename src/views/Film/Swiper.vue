<template>
  <div class="hhh">
    <swiper :options="swiperOptions" ref="mySwiper"  v-if="swiperlist.length">
      <!-- slides -->
      <swiper-slide v-for="(item,index) in swiperlist" :key="index">
          <img :src="item.imgUrl" alt />
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>
<script>
export default {
  name: "MySwiper",
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: ".swiper-pagination"
        },
        speed: 1000,
        loop: true,
        autoplay: {
          delay: 3000
        }
      }
    };
  },
  props: {
    swiperlist: {
      type: Array,
      required: true
    }
  }
};
</script>

<style  scoped>

</style>