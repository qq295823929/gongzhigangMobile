<template>
  <div id="app">
    <transition :name="transformName">
        <router-view></router-view>
    </transition>
  </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: 'App',
        data() {
            return {
                transitionName: ''
            }
        },
        computed: {
            ...mapGetters([
                'transformName'
            ])
        },
        components: {},
        watch: {}
    }
</script>
<style lang="scss" scoped>
  #app {
    height: 100%;
    width: 100%;
    position: relative;
    overflow-x: hidden;
    font-size: .32rem;
  }
</style>
