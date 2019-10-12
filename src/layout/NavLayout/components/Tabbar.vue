<template>
  <div class="jy-tab-bar">
    <van-tabbar
      route
      v-model="active"
      active-color="#07c160"
      inactive-color="#000"
    >
      <van-tabbar-item icon="home-o" :to="{name:'OaWork'}" replace>OA办公</van-tabbar-item>
      <van-tabbar-item icon="contact" :to="{name:'Contact'}" replace>联系人</van-tabbar-item>
<!--      <van-tabbar-item icon="friends-o" :to="{name:'FlowPath'}" replace>流程申请</van-tabbar-item>-->
      <van-tabbar-item icon="user-o" :to="{name:'Mine'}" replace>我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
    export default {
        name: 'Tabbar',
        data() {
            return {
                active: ""
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .jy-tab-bar {
      z-index: 99;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
  }
</style>
