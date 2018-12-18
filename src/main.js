import 'aframe'
import Vue from 'vue'

import App from './App.vue'

// ignoredElements for Firefox
Vue.config.ignoredElements = ['a-scene', 'a-assets', 'a-entity', 'a-sphere', 'a-sky', 'a-plane', 'a-camera', 'a-cursor', 'a-box'];

var app = new Vue({
    el: "#app",
    render: h => h(App)
});