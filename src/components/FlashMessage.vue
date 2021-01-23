<template>
    <transition name="slideDown">
        <div v-if="show" class="flash-message">
            {{message}}
        </div>
    </transition>
</template>

<script>
    export default {
        data() {
            return {
                message: null,
                show: false,
            }
        },

        mounted () {
            this.$root.$on('flash', msg => {
                this.message = msg
                this.show = true
                setTimeout(() => {
                    this.show = false
                }, 2000);
            })
        },
    }
</script>

<style lang="scss" scoped>
    .flash-message {
        position: fixed;
        top: 1em;
        width: 40%;
        left: 30%;
        background: #a09f9c;
        text-align: center;
        color: $color-secondary;
        padding: 1em;
        border-radius: 2em;
        z-index: 110;

        @media screen and (max-width: 500px){
            width: 80%;
            left: 10%;
        }
    }
</style>