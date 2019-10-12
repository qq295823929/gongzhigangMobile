<template>
  <van-nav-bar left-arrow class="nav">
    <div name="search" slot="left" @click="goBack">
      -返回
    </div>
  </van-nav-bar>
</template>

<script>
    export default {
        name: "index",
        methods:{
            goBack(){
                this.$router.go(-1)
            }
        }
    }
</script>

<style scoped>
  .nav{
    background: linear-gradient(to bottom,#fff,#f9f9f9);
  }
</style>
