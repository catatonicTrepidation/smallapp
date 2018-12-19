import 'aframe';
// import 'aframe-layout-component';
import 'networked-aframe';
// import 'aframe-animation-component';
// import 'aframe-src-fit-component';
// import 'aframe-asset-on-demand-component';
// import 'aframe-input-mapping-component';
// import 'aframe-teleport-controls';
// import 'aframe-extras';
// import 'aframe-gui';
// import 'aframe-html-shader';

import Vue from 'vue'

import App from './App.vue'

// ignoredElements for Firefox
Vue.config.ignoredElements = ['a-scene', 'a-assets', 'a-entity', 'a-sphere', 'a-sky', 'a-plane', 'a-camera', 'a-cursor', 'a-box'];

var app = new Vue({
    el: "#app",
    render: h => h(App)
});