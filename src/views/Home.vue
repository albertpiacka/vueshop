<template>
    <div class="home">
        <div class="home-content">
            This is home page
        </div>
    </div>
</template>

<script>
    import { data } from '../data'

    export default {
        name: 'home',
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
    .home {
        position: relative;
        background-color: #fff;
        height: 100vh;
        background: url('../assets/background/image-1.png') no-repeat center 3em;
        background-attachment: fixed;

        .home-content {
            z-index: 1;
            position: relative;
        }
    }
</style>