<template>
    <a-scene>
        <a-sphere v-on:click="clickTest" position="-2 1 1" src="../static/images/ball2.png"></a-sphere>
        <a-sphere v-bind:position="randpos" v-bind:src = "ballsrc"></a-sphere>
        <a-sphere color="#141edc" v-on:click="getRandPos" v-bind:position="custompos">{{desc}}</a-sphere>

        <!-- custom tower obj -->
        <tower></tower>

        <a-sky ref="sky"
             id="image-360"
             radius="10"
             src="../static/images/sky.png"></a-sky>
        </a-sky>
        <a-camera>
            <a-cursor id="cursor"></a-cursor>
        </a-camera>
    </a-scene>
</template>

<script>
import tower from './components/tower.vue'

export default {
    components: {
        tower
    },
    data() {
        console.log('in data');
        return {
            desc: "sphere",
            custompos: "1 2 3",
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
        }
    }


    
}

</script>