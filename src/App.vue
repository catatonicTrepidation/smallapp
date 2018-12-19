<template>
    <a-scene networked-scene="
      room: dev;
      debug: true;
      adapter: easyrtc;
        ">

        <a-assets class="aframe-assets">

            <a-sky id="sky" src="../static/images/sky.png"></a-sky>

        </a-assets>

        <a-sphere v-on:click="clickTest" position="-3 -1 1" src="../static/images/ball2.png"></a-sphere>
        <a-sphere v-bind:position="randpos" v-bind:src = "ballsrc"></a-sphere>
        <a-sphere color="#141edc" v-on:click="getRandPos" v-bind:position="custompos"></a-sphere>

        <!-- custom tower obj -->
        <tower></tower>

        <a-sky src="#sky" radius="10"></a-sky>
        
        <a-camera>
            <a-cursor id="cursor"></a-cursor>
        </a-camera>
    </a-scene>
</template>



<script>
import easyrtc from '../static/easyrtc/easyrtc.js';
import socketIO from 'socket.io-client';


import tower from './components/tower.vue'

import randaframe from '../static/aframe-randomizer-components.min.js'

export default {
    components: {
        tower
    },
    data() {
        console.log('in data');
        return {
            desc: "sphere",
            custompos: "1 3 3",
            ballsrc: "../static/images/ball.png"
        }
    },
    computed: {
        randpos: function() {
            return [1, this.getRandomInt(-2,6), 1].join(' ');
        }
    },
    methods: {
        clickTest: function (event) {
            console.log("Clicked!");
            if (event) {
                console.log(event.target.tagName);
            }
        },
        getRandPos: function (event) {
            this.custompos = [this.getRandomInt(-2,2), this.getRandomInt(0,3), this.getRandomInt(-2,2)].join(' ');
        },
        getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
        },


        addFloatingOrbs() {
            // trying out this way of adding objects
        var frag = this.fragmentFromString(`
            <a-entity position="-5 0 -5">
                <a-sphere color="#1edc14" radius="0.5" position="-1 -1 -1"></a-sphere>
                <a-sphere color="#dc141e" radius="0.5" position="1 -1 -1"></a-sphere>
                <a-sphere color="#141edc" radius="0.5" position="0 -1 1"></a-sphere>
                <a-sphere color="#115656" radius="0.5" position="0 1 0"></a-sphere>
            </a-entity>
        `);
        document.getElementsByTagName('a-scene')[0].appendChild(frag);
    },

    createAvatarTemplate() {
                var frag = this.fragmentFromString(`
            <!-- Avatar -->
            <template id="avatar-template" v-pre>
                <a-entity class="avatar">
                    <a-sphere class="head"
                    color="#309FF0"
                    scale="0.45 0.5 0.4"
                    ></a-sphere>
                    <a-entity class="face"
                    position="0 0.05 0"
                    >
                    <a-sphere class="eye"
                        color="#efefef"
                        position="0.16 0.1 -0.35"
                        scale="0.12 0.12 0.12"
                    >
                        <a-sphere class="pupil"
                        color="#000"
                        position="0 0 -1"
                        scale="0.2 0.2 0.2"
                        ></a-sphere>
                    </a-sphere>
                    <a-sphere class="eye2"
                        color="#efefef"
                        position="-0.16 0.1 -0.35"
                        scale="0.12 0.12 0.12"
                    >
                        <a-sphere class="pupil"
                        color="#000"
                        position="0 0 -1"
                        scale="0.2 0.2 0.2"
                        ></a-sphere>
                    </a-sphere>
                    </a-entity>
                </a-entity>
            </template>
        `);
        document.getElementsByClassName('aframe-assets')[0].appendChild(frag);
    },

    addAvatarSchema() {
        //Define custom schema for syncing avatar color, set by random-color
        NAF.schemas.add({
            template: '#avatar-template',
            components: [
            'position',
            'rotation',
            {
                selector: '.head',
                component: 'material',
                property: 'color'
            },
            {
                selector: '.eye',
                component: 'material',
                property: 'color'
            },
            {
                selector: '.eye2',
                component: 'material',
                property: 'color'
            }
            ]
        });
    },

    createNetworkedPlayer() {
        var frag = this.fragmentFromString(`
        <!-- Player -->
        <a-entity id="player" networked="template:#avatar-template;attachTemplateToLocal:false;" camera="userHeight: 1.6" wasd-controls look-controls>
            <a-sphere class="head"
            visible="false"
            random-color
            >
            <a-sphere class="eye"
            visible="false"
            random-color
            >
            <a-sphere class="eye2"
            visible="false"
            random-color
            >
            </a-sphere>
            </a-sphere>
        </a-entity>
        `);
        document.getElementsByTagName('a-scene')[0].appendChild(frag);
    },


    fragmentFromString(strHTML) {
            return document.createRange().createContextualFragment(strHTML);
      }
    },

    mounted () {
        this.addFloatingOrbs(); // this probably doesn't need to be called from here, but i kinda just wanted to test it, i guess
        this.createAvatarTemplate();
        this.addAvatarSchema();
        this.createNetworkedPlayer();
    }
    
}

</script>