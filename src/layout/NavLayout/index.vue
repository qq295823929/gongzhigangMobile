<template>
  <div class="app-wrap">
<!--    <Navbar></Navbar>-->
   <transition :name="transitionName">
    <keep-alive>
      <router-view class="child-view"></router-view>
    </keep-alive>
   </transition>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
    import Tabbar from "@/layout/NavLayout/components/Tabbar"
    import Navbar from "@/layout/NavLayout/components/Navbar"
    export default {
        name: 'NavLayout',
        data(){
            return {
                transitionName:''
            }
        },
        components: {
            Tabbar,
            Navbar
        },
        watch:{
            $route(to,from){
                let fromIndex=from.meta.index;
                let toIndex=to.meta.index;
                console.log(from);
                if(from.name===null){
                    this.transitionName='';
                    return false
                }
                if(fromIndex>toIndex){      //如果去往的index小于当前index,说明要往左
                    this.transitionName='fold-right';
                }else{    //说明要往右
                    this.transitionName='fold-left';
                }
            }
        }
    }
</script>

<style scoped>
  .app-wrap{
    height: 100%;
    width: 100%;
    position: relative;
    overflow-x: hidden;
    overflow-y: auto;
  }

</style>
