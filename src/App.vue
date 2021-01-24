<template>
  <div id="app">
    <the-navigation v-show="this.$route.meta !== 'ordered'"></the-navigation>
    <flash-message></flash-message>
    <quick-view></quick-view>
    <scroll-to v-show="this.$route.meta == 'home'"></scroll-to>
    
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
import ScrollTo from './components/ScrollTo'

export default {
  name: 'App',
  components: {
    TheNavigation,
    FlashMessage,
    QuickView,
    ScrollTo,
  }
}
</script>

<style src="@/assets/scss/main.scss" lang="scss"></style>