let basketStorage = localStorage.getItem("basket")

if(!basketStorage){
    localStorage.setItem("basket", '');
}

import Vue from 'vue'
import App from './App.vue'
import router from './router'

import AOS from 'aos';
import 'aos/dist/aos.css'; 
AOS.init();

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.config.productionTip = false

new Vue({
	router,
	render: h => h(App)
}).$mount('#app')
