<template>
  <div id="app">
    <the-navigation v-show="this.$route.meta !== 'ordered'"></the-navigation>
    <flash-message></flash-message>
    <quick-view></quick-view>
    
    <div class="content" data-aos="fade-up">
        <transition name="contentFade" mode="out-in">
          <router-view :key="$route.path"/>
        </transition>
    </div>
  </div>
</template>

<script>
import TheNavigation from './components/TheNavigation.vue'
import FlashMessage from './components/FlashMessage.vue'
import QuickView from './components/QuickView'
import  DataMixin  from './mixins/DataMixin'

export default {
  name: 'App',
  mixins: [DataMixin],
  components: {
    TheNavigation,
    FlashMessage,
    QuickView,
  },

  mounted () {
    this.createDB()
  },
}
</script>

<style src="@/assets/scss/main.scss" lang="scss"></style>