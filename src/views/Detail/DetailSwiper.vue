<template>
  <div>
    <swiper :options="swiperOptions" ref="mySwiper">
      <slot></slot>
    </swiper>
  </div>
</template>
<script>
export default {
  props:["perview"],
  name: "MySwiper",
  data() {
    return {
      swiperOptions: {
        slidesPerView: this.perview,
        spaceBetween: 10,
        freeMode: true,
        // pagination: {
        //   el: ".swiper-pagination"
        // },
        // speed: 1000,
        // loop: true,
        // autoplay: {
        //   delay: 3000
        // }
      }
    };
  },
  mounted(){
    // new Swiper
  }
 
};
</script>

<style  scoped>
.swiper-slide img {
  /* width: 100%; */
}
</style>