<template>
    <div class="about">
        <div class="about-content">
            This is about page
        </div>
    </div>
</template>

<script>
    import { data } from '../data'

    export default {
        name: 'about',
        data() {
            return {
                items: [],
            }
        },
        mounted () {
            data[0].forEach(obj => {
                this.items.push(obj)
            })
        },
    }
</script>

<style lang="scss" scoped>
    .about {
        position: relative;
        background-color: #fff;
        height: 100vh;
        background: url('../assets/background/image-7.png') no-repeat center 3em;
        background-attachment: fixed;

        .about-content {
            z-index: 1;
            position: relative;
        }
    }
</style>