<template>
    <div class="single-coffee">
        <div class="adress">
            <router-link to="/coffee">coffee</router-link>
            > {{this.filteredItem.name}}
        </div>
        <div class="single-coffee-header">
            <svg viewBox="0 0 357 174" fill="none" xmlns="http://www.w3.org/2000/svg" data-aos="fade-right">
                <path d="M6.03518 30.8555C-37.9648 -27.1445 204.758 11.711 292.379 38.8555C380 66 372 92 303 143C234 194 9.03523 174.855 16.0352 134.855C23.0351 94.8554 50.0352 88.8555 6.03518 30.8555Z" :fill="`${this.filteredItem.color}`"/>
            </svg>

            <div :key="this.$route.params.id" class="single-coffee-basics" data-aos="fade-down">
                <div class="title">
                    {{this.filteredItem.name}}
                </div>

                <div class="roast">
                    <div class="roast-title">
                        Roast
                    </div>
                    <b-form-rating :value="this.filteredItem.roast" show-value readonly
                        icon-empty="circle"
                        icon-half="circle-half"
                        icon-full="circle-fill"
                    >
                    </b-form-rating>
                </div>
            </div>
        </div>

        <div class="single-coffee-body">
            <div class="geography" data-aos="fade-right" data-aos-delay="100">
                <h2>Geography</h2>
                <h3>{{this.filteredItem.geography}}</h3>
            </div>

            <div class="flavors" data-aos="fade-right" data-aos-delay="200">
                <h2>Flavors</h2>
                <h3>{{this.filteredItem.flavors}}</h3>
            </div>

            <div class="processing" data-aos="fade-right" data-aos-delay="300">
                <h2>Processing</h2>
                <h3>{{this.filteredItem.processing}}</h3>
            </div>

            <div class="rating" data-aos="fade-right" data-aos-delay="400">
                <h2>Rating</h2>
                <h1>{{this.filteredItem.rating}}/100</h1>
            </div>

            <div class="package" data-aos="fade-right" data-aos-delay="500">
                <h2>Package</h2>
                <b-form-select v-model="selected" :options="options"></b-form-select>
            </div>

            <div class="price" data-aos="fade-right" data-aos-delay="600">
                € {{returnPrice(this.filteredItem.price)}}
            </div>

            <div class="add-to-basket" data-aos="fade-right" data-aos-delay="700">
                <div class="quantity">
                    <div class="quantity-body">
                        <h3>quantity</h3>
                        <transition name="contentFade" mode="out-in">
                            <div class="quantity-val">
                                {{quantity}}
                            </div>
                        </transition>
                    </div>
                    <div class="quantity-controls">
                        <b-icon icon="arrow-up-short" @click="addQuantity"></b-icon>
                        <b-icon icon="arrow-down-short" @click="lowerQuantity"></b-icon>
                    </div>
                </div>
        
                <b-button variant="primary" pill @click="addToCart">
                    Add to cart
                    <b-icon icon="cart-check"></b-icon>
                </b-button>

                <div class="description">
                    <h3>Description</h3>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { data } from '../data'

    export default {
        name: 'SingleCoffee',

        data() {
            return {
                items: [],
                quantity: 1,
                selected: '0.25',
                options: [
                    { value: null, text: 'Select' },
                    { value: '0.25', text: '250gr' },
                    { value: '1', text: '1000gr' },
                ]
            }
        },

        mounted () {
            data[0].forEach(obj => {
                this.items.push(obj)
            })
        },

        methods: {
            addQuantity() {
                if(this.quantity <= 4){
                    this.quantity++
                }
            },

            lowerQuantity() {
                if(this.quantity >=2){
                    this.quantity--
                }
            },

            returnPrice(price){
                return (price * Number(this.selected)).toFixed(2)
            },

            addToCart(){
                var existing = localStorage.getItem('basket')

                existing = existing ? existing.split(',') : []

                let obj = {
                    id: (Math.random()*1000).toFixed(0),
                    name: this.filteredItem.name,
                    quantity: this.quantity,
                    package: (this.selected * 1000).toString() + 'gr',
                    price: ((this.filteredItem.price * Number(this.selected)) * this.quantity).toFixed(2)
                }

                existing.push(JSON.stringify([obj]));

                localStorage.setItem('basket', existing.toString())

                this.selected = '0.25'
                this.quantity = 1

                this.$root.$emit('flash', 'Item added to cart')
            }
        },

        computed: {
            filteredItem() {
                return this.items.filter(item => item.id == this.$route.params.id)[0] 
            }
        },
    }
</script>

<style lang="scss" scoped>
    .single-coffee {
        position: relative;
        background-color: $color-secondary;
        min-height: 150vh;
        background: url('../assets/background/image-3.png') no-repeat center 3em;
        background-attachment: fixed;

        .single-coffee-header {
            position: relative;
            width: 60%;
            margin: auto;

            @media screen and (max-width: 500px){
                width: 100%;
            }

             .single-coffee-basics {
                position: absolute;
                top: 2em;
                left: 5em;
                color: $color-primary;
                font-weight: 800;
                letter-spacing: .1em;
                text-transform: uppercase;
                text-shadow: 4px 5px 7px $color-shadow;

                .roast-title {
                    text-shadow: none;
                    font-weight: 300;
                    padding-top: 1em;
                }

                .b-rating {
                    padding-left: 0;
                }

                @media screen and (max-width: 310px){
                    font-size: 0.8em;
                }
            }

            svg {
                width: 100%;
            }
        }

        .single-coffee-body {
            padding: 1em 5em;
            @media screen and (max-width: 500px){
                padding: 1em;
            }
            h2 {
                font-weight: 900;
                color: $color-primary;
            }

            h3 {
                font-weight: 100;
            }

            .rating, .package {
                h1 {
                    font-weight: 100;
                }
            }

            .package {
                .custom-select {
                    max-width: 6em;
                    border-radius: 1em;
                    margin: .1em 0;
                }
            }

            .price {
                padding: 1em 0;
                font-size: 2em;
                font-weight: 100;
                letter-spacing: .2em;
            }

            .b-rating {
                padding: 0;
                width: 30%;
            }

            .quantity {
                margin: 1em 0;
                display: flex;
                flex-direction: row;

                .quantity-body {
                    display: flex;
                    h3 {
                        align-self: center;
                        margin: 0;
                        margin-right: .5em;
                    }

                    .quantity-val {
                        align-self: center;
                        font-size: 2em;
                    }
                }

                .quantity-controls {
                    display: flex;
                    .b-icon {
                        font-size: 2em;
                        align-self: center;
                    }
                }
            }

            .description {
                margin: 2em 0;
                h3 {
                    padding: 1em 0;
                }
            }
        }
    }
</style>