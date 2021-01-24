<template>
    <div class="scroll-to-menu">
        <b-icon icon="circle-fill" scale="1" @click.prevent="scrollTo('#section-1')">
            <a href="#section-1"></a>
        </b-icon>

        <b-icon icon="circle-fill" scale="1" @click.prevent="scrollTo('#section-2')">
            <a href="#section-2"></a>
        </b-icon>
    </div>
</template>

<script>
    export default {
        methods: {
            scrollTo(section) {
                let el = document.querySelector(section) 
                el.scrollIntoView({behavior: "smooth"})
            }
        },
    }
</script>

<style lang="scss" scoped>
    .scroll-to-menu {
        position: fixed;
        z-index: 10000;	
        right: 1em;
        top: 45%;

        display: grid;
        grid-gap: 2em;
    }
</style>