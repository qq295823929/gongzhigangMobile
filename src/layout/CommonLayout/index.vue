<template>

  <div class="common-layout">
    <transition :name="transformName">
      <router-view class="aaaaa"></router-view>
    </transition>
  </div>

</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "index",
        data() {
            return {

            }
        },
        computed: {
            ...mapGetters([
                'transformName'
            ])
        },
    }
</script>

<style scoped>
  .common-layout {
    height: 100%;
    width: 100%;
  }

</style>
