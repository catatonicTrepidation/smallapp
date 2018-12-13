<template>
    <a-scene>
        <!-- <a-sphere position="-2 1 1"></a-sphere> -->
        <a-sphere position="1 1 1" v-bind:src = "imgurl"></a-sphere>
        <a-sphere v-bind:position="custompos">{{desc}}</a-sphere>
        <!-- Sky id="Sky" -->
        <a-sky ref="sky"
             id="image-360"
             radius="10"
             src="https://i.imgur.com/wEe1WvE.png"></a-sky>
        </a-sky>
    </a-scene>
</template>

<script>
export default {
    data() {
        console.log('in data');
        return {
            desc: sphere,
            custompos: "1 2 3",
            imgurl: "https://i.imgur.com/wEe1WvE.png"
        }
    },
}
</script>