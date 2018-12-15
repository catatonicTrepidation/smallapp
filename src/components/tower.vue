<template>
    <a-entity class="tower">
        <a-box v-bind:src="towerTexture" depth="1" height="8" width="1" position="-3 -0.5 -3"></a-box>
    </a-entity>
</template>

<script>
export default {
    data() {
        console.log('--tower data--');
        return {
            desc: "tower",
            towerTexture: "../static/images/tower.png"
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