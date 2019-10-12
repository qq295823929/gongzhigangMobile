<template>
    <div class="jy-nav-bar">
        <van-nav-bar :title="$route.meta.title">
            <template slot="left">
                <span style="color:#1989fa"><van-icon name="arrow-left" class="van-nav-bar__arrow" dot />
                    返回
                </span>
            </template>
        </van-nav-bar>
    </div>
</template>
<script>

export default {
    name:"Navbar",
    data () {
        return {
        }
    },
    mounted(){
        console.log(this.$route.meta.show);
    },
}
</script>
<style scoped>
    .jy-nav-bar{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 999;
    }
</style>
