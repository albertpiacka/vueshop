<template>
    <transition name="slideDown" mode="out-in">
        <div class="basket" data-aos="fade-down">
            <div class="basket-wrapper">
                <div class="basket-heading">
                    <h1>Your basket</h1>
                </div>

                <div class="basket-content">
                    <ul v-if="basket.length > 0">
                        <transition-group name="fade">
                            <li v-for="item in basket" :key="item.id">
                                <b-icon icon="circle-fill"></b-icon>
                                <div class="item-wrapper">
                                    <div>
                                        <div class="item-info">
                                            <h3 v-if="item.package">{{ item.name }},</h3>
                                            <h3 v-if="!item.package">{{ item.name }}</h3>
                                            <div class="package">{{ item.package }}</div>
                                        </div>

                                        <div class="price">
                                            <div>€ {{ item.price }}</div>
                                        </div>
                                    </div>

                                    <div class="controls-wrapper">
                                        <b-icon icon="x-square" scale="1.5" @click="removeItem(item)"></b-icon>
                                        <div class="quantity">{{ item.quantity }}</div>

                                        <div class="quantity-controls">
                                            <b-icon icon="arrow-up-short" scale="2" @click="addQuantity(item)"></b-icon>
                                            <b-icon icon="arrow-down-short" scale="2" @click="lowerQuantity(item)"></b-icon>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </transition-group>
                    </ul>

                    <div class="empty" v-if="basket.length == 0">
                        <h2>Basket is empty</h2>
                    </div>
                </div>

                <div class="delivery">
                    <h1>Delivery</h1>
                    <h3>It's free!</h3>
                </div>

                <div class="total">
                    <h1>Total</h1>
                    <h3>€ {{price}}</h3>
                    <h5>tax € {{tax}}</h5>
                </div>

                <div class="checkout">
                    <router-link to="/checkout">
                        <b-button variant="primary" pill v-if="basket.length > 0">
                            Proceed to checkout
                        </b-button>
                    </router-link>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import DataMixin from '../mixins/DataMixin'
    export default {
        name: 'basket',
        mixins: [DataMixin],

        data() {
            return {
                basket: [],
            }
        },

        mounted () {
            this.basket = this.getDB('basket')
        },

        methods: {
            removeItem(item) {
                this.removeFromDB('basket', item)

                this.basket = this.basket.filter(i => i.id !== item.id)
            },
        },

        computed: {
            price() {
                let total = 0
                this.basket.forEach(item => {
                    total += Number(item.price * item.quantity)
                }) 

                return total.toFixed(2)
            },

            tax(){
                return (this.price * 0.2).toFixed(2)
            }
        },
    }
</script>

<style lang="scss" scoped>
    .basket {
        position: relative;
        background-color: $color-secondary;
        min-height: 100vh;
        background: url('../assets/background/image-8.png') no-repeat center 3em;
        background-attachment: fixed;

        .basket-wrapper {
            width: 50%;
            margin: 1em auto;

            @media screen and (max-width: 500px){
                width: 90%;
            }
        }

        h1 {
            border-bottom: 4px solid $color-primary;
            text-align: right;
            font-weight: 900;
            padding: 1em 0;
        } 

        .basket-content {
            z-index: 1;
            position: relative;
            padding: .5em;
            background-color: $color-secondary;
        }

        .empty {
            h2 {
                text-align: right;
                font-weight: 100;
            }
        }

        ul {
            padding: 0;
        }

        li {
            list-style: none;
            display: grid;
            grid-template-columns: 1fr 10fr;
            margin: 1em 0;

            .bi-circle-fill {
                align-self: center;
            }
        }

        .item-wrapper {
            display: grid;
            grid-template-columns: 1fr 1fr;

            .item-info {
                display: flex;
                column-gap: 1em;

                h3 {
                    margin: 0;
                    align-self: center;
                    font-size: 1.5em;
                    font-weight: 700;
                    @media screen and (max-width: 360px){
                        font-size: 1em;
                    }
                }

                .package {
                    align-self: center;
                }
            }
        }

        .controls-wrapper {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            align-items: center;
            justify-items: end;

            .quantity-controls {
                display: grid;
                grid-gap: 1em;
            }
        }

        .delivery {
            h3 {
                text-align: right;
                background: #fff;
                padding: .5em;
                font-weight: 700;
            }
        }

        .total {
            text-align: right;
            h3 {
                animation: animatedNum 0.5s linear infinite;
                font-size: 3em;
            }
        }

        .checkout {
            padding: 2em 0;
            text-align: right;
        }
    }
</style>