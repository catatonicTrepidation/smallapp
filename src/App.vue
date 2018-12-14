<template>
    <a-scene>
        <a-sphere position="-2 1 1" src="../static/images/sky.png"></a-sphere>
        <a-sphere position="1 1 1" v-bind:src = "imgurl"></a-sphere>
        <a-sphere v-bind:position="custompos">{{desc}}</a-sphere>
        <!-- Sky id="Sky" -->
        <a-sky ref="sky"
             id="image-360"
             radius="10"
             src="../static/images/sky.png"></a-sky>
        </a-sky>
    </a-scene>
</template>

<script>
export default {
    data() {
        console.log('in data');
        return {
            desc: "sphere",
            custompos: "1 2 3",
            imgurl: "../static/images/sky.png"
        }
    },
}

</script>