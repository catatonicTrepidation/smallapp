import 'aframe'
import Vue from 'vue'

import App from './App.vue'
import Sky from './sky.png'
console.log(Sky);

var app = new Vue({
    el: "#app",
    render: h => h(App)
});