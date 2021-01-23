<template>
    <div class="ordered">
        <h1>Thank you for your order!</h1>
        <router-link to="/">
            <b-button pill variant="primary">Go back home <b-icon icon="house"></b-icon></b-button>
        </router-link>

        <b-button pill variant="outline-success" id="order-tooltip">Track your order <b-icon icon="truck"></b-icon></b-button>

        <b-tooltip target="order-tooltip" triggers="hover">
            #{{key}}
        </b-tooltip>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                key: null,
            }
        },

        mounted () {
            this.key = this.makeid(5)
        },

        methods: {
            makeid(length) {
                var result           = '';
                var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                var charactersLength = characters.length;
                for ( var i = 0; i < length; i++ ) {
                    result += characters.charAt(Math.floor(Math.random() * charactersLength));
                }
                return result.toUpperCase();
            }
        },
    }
</script>

<style lang="scss" scoped>
    .ordered {
        height: 100vh;
        background: url('../assets/background/image-10.png') no-repeat center 3em;
        background-attachment: fixed;
        padding: 2em;

        h1 {
            font-size: 3em;
            font-weight: 700;
            color: $color-hover-secondary;
        }

        .btn-outline-success {
            display: block;
            margin-top: 1em;
        }
    }
</style>