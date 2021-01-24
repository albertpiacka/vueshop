<template>
    <transition name="slideDown" mode="out-in">
        <div class="checkout">
            <div class="shipping-info">
                <h1>Shipping information</h1>
                <input class="shadow" v-model="name" type="text" name="name" placeholder="Your name">
                <input class="shadow" v-model="adress" type="text" name="adress" placeholder="City, street 123">
                <input class="shadow" v-model="phone" type="text" name="phone" placeholder="+421 123 123 123">
            </div>

            <div class="payment">
                <h1>Payment</h1>
                <div class="payment-wrapper">
                    <div class="input-wrapper">
                        <input class="shadow" v-model="acc" type="text" name="acc-num" placeholder="Card number">
                        <input class="shadow" v-model="cvv" type="password" name="cvv" placeholder="CVV">
                        <input class="shadow" v-model="date" type="text" name="date" placeholder="MM/YY">
                    </div>
                </div>
            </div>

            <div class="place-order">
                <router-link to="/ordered">
                    <b-button pill variant="primary" size="lg" @click="order">Place order</b-button>
                </router-link>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        data() {
            return {
                data: {
                    name: null,
                    adress: null,
                    phone: null,
                    acc: null,
                    cvv: null,
                    date: null,
                }
            }
        },

        methods: {
            order(){
                this.name = null
                this.adress = null
                this.phone = null
                this.acc = null
                this.cvv = null
                this.date = null

                localStorage.setItem('basket', '')
            }
        },
    }
</script>

<style lang="scss" scoped>
    h1 {
        border-bottom: 4px solid $color-primary;
        text-align: right;
        font-weight: 900;
        padding: 1em 0;
    } 

    .checkout {
        background: url('../assets/background/image-9.png') no-repeat center 3em;
        background-attachment: fixed;
    }

    .shipping-info, .payment {
        display: grid;
        grid-template-columns: 1fr;
        width: 50%;
        margin: 1em auto;
        grid-gap: 1em;

        @media screen and (max-width: 500px){
            width: 90%;
        }

        input {
            padding: .5em;
            border-radius: 2em;
            outline: none;
            border: none;
        }
    }   

    .payment {
        padding: 2em 0;
        .payment-wrapper {
            position: relative;
            margin: auto;

            .input-wrapper {
                display: flex;
                border-radius: 2em;
                flex-wrap: wrap;
                padding: 2em;
                width: 100%;
                grid-gap: 1em;
                background: url('../assets/background/card.png') no-repeat;
                background-size: cover;

                input {
                    max-width: 100%;
                    margin: .5em 0;
                }

                input:nth-of-type(1){
                    flex: 2;
                }

                input:nth-of-type(2){
                    flex: 1;
                }

                input:nth-of-type(3){
                    flex: 1;
                }


            }
        }
    }

    .place-order {
        width: 50%;
        padding: 2em;
        margin: 1em auto;

        text-align: center;

        @media screen and (max-width: 500px){
            width: 90%;
        }
    }
</style>