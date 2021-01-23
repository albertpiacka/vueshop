<template>
    <transition name="slideDown">
        <div v-show="show" class="quickview" v-if="this.item" :style="`background: ${item.color}`">
            <div class="quickview-header">
                <div class="wrapper">
                    <router-link :to="`coffee-${this.item.id}`">{{ this.item.name }}</router-link>
                    <b-icon icon="x-circle" scale="1.5" @click="toggleView"></b-icon>
                </div>

                <div class="roast" v-show="coffee">
                    <div class="roast-title">
                        roast
                    </div>
                    <b-form-rating :value="this.item.roast" show-value readonly
                        icon-empty="circle"
                        icon-half="circle-half"
                        icon-full="circle-fill"
                        size="lg"
                    >
                    </b-form-rating>
                </div>
            </div>

            <div class="quickview-body coffee-body" v-show="coffee">
                <div class="geography" data-aos="fade-right" data-aos-delay="100">
                    <h2>Geography</h2>
                    <h3>{{this.item.geography}}</h3>
                </div>

                <div class="flavors" data-aos="fade-right" data-aos-delay="200">
                    <h2>Flavors</h2>
                    <h3>{{this.item.flavors}}</h3>
                </div>

                <div class="processing" data-aos="fade-right" data-aos-delay="300">
                    <h2>Processing</h2>
                    <h3>{{this.item.processing}}</h3>
                </div>

                <div class="rating" data-aos="fade-right" data-aos-delay="400">
                    <h2>Rating</h2>
                    <h1>{{this.item.rating}}/100</h1>
                </div>
            </div>

            <div class="quickview-body accessory-body" v-show="accessory">
                <b-img :src="returnImg(this.item.name)" fluid-grow :alt="this.item.name" data-aos="fade-down" v-if="accessory"></b-img>
                
                <div class="description">
                    <h2>Description</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
            </div>

            <div class="quickview-footer">
                <div class="add-to-basket">
                    <div class="wrapper">
                        <div class="package">
                            <b-form-select v-model="selected" :options="options" v-show="coffee"></b-form-select>

                            <div class="quantity">
                                <div class="quantity-title">
                                    Quantity
                                </div>
                                <div class="quantity-value">
                                    {{quantity}}
                                </div>
                                <div class="quantity-controls">
                                    <b-icon icon="arrow-up-short" scale="2" @click="addQuantity"></b-icon>
                                    <b-icon icon="arrow-down-short" scale="2" @click="lowerQuantity"></b-icon>
                                </div>
                            </div>

                            <div class="price">
                               € {{price}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <b-button variant="primary" pill @click="addToCart">
                Add to cart
                <b-icon icon="cart-check"></b-icon>
            </b-button>
        </div>
    </transition>
</template>

<script>
    export default {
        data() {
            return {
                item: null,
                show: false,

                coffee: false,
                accessory: false,

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
            this.$root.$on('quickview', data => {
                this.item = data.obj
                this.toggleView()

                if(data.type == 'coffee'){
                    this.coffee = true
                    this.accessory = false
                    this.selected = '0.25'
                } else if(data.type == 'accessory'){
                    this.coffee = false
                    this.accessory = true
                    this.selected = 1
                }
            })

            window.addEventListener('keydown', e => {
                if(e.key == 'Escape' && this.show == true){
                    this.toggleView()
                }
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

            toggleView() {
                let content = document.querySelector('.content')

                if(this.show == false){
                    this.show = true
                    content.style.filter = "blur(5px)"
                    content.style.transition = "all .5s ease"
                } else {
                    this.show = false
                    content.style.filter = "blur(0px)"
                    content.style.transition = "all .5s ease"
                }
            },

            returnImg(name) {
                var images = require.context('../assets/accessories', false, /\.jpg$/)
                return images('./' + name + ".jpg")
            },

            addToCart(){
                var existing = localStorage.getItem('basket')

                existing = existing ? existing.split(',') : []

                var obj = {
                    id: (Math.random()*1000).toFixed(0),
                    name: this.item.name,
                    quantity: this.quantity,
                    package: this.item == 'coffee' ? (this.selected * 1000).toString() + 'gr' : null,
                    price: ((this.item.price * Number(this.selected)) * this.quantity).toFixed(2)
                }

                existing.push(JSON.stringify([obj]));

                localStorage.setItem('basket', existing.toString())

                this.selected = '0.25'
                this.quantity = 1

                this.$root.$emit('flash', 'Item added to cart')
            }
        },

        computed: {
            price() {
                if(this.selected){
                    return ((this.item.price * this.selected) * this.quantity).toFixed()
                } else return (this.item.price * this.quantity).toFixed()
            }
        },
    }
</script>

<style lang="scss" scoped>
    .quickview {
        width: 70%;
        position: fixed;
        max-height: 90vh;
        overflow: auto;
        z-index: 100;
        top: 2em;
        left: 15%;
        padding: 1em;
        border-radius: 2em;

        @media screen and (max-width: 500px){
            width: 90%;
            left: 5%;
        }
        
        .quickview-header {
            padding: 1em 0;
            a {
                color: $color-secondary;
                font-weight: 800;
                letter-spacing: .1em;
                text-transform: uppercase;
                text-decoration: none;
                text-shadow: 4px 5px 7px $color-shadow;
            }

            .wrapper {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }       
            
            .roast {
                .b-rating {
                    width: 40%;
                    .b-icon {
                        width: 2em !important;
                    }
                }
            }
        }

        .coffee-body {
            padding: 1em;

            h2 {
                font-size: 1.5em;
            }

            h3 {
                font-size: 1.2em;
            }

            .rating {
                h1 {
                    font-weight: 100;
                    font-size: 1.5em;
                }
            }
        }

        h2, p {
            color: $color-secondary;
        }

        .accessory-body {
            display: grid;
            grid-template-columns: 1fr;
            grid-gap: 1em;

            img {
                border-radius: 1em;
            }
        }

        .quickview-footer {
            .wrapper {
                display: flex;
                justify-content: space-between;
            }

            .package {
                padding: 1em 0;
                color: $color-secondary;

                .custom-select {
                    max-width: 6em;
                    border-radius: 1em;
                    margin: .1em 0;
                }

                .quantity {
                    display: grid;
                    grid-template-columns: 2fr 1fr 3fr;
                    grid-gap: 1em;
                    align-items: center;

                    .quantity-title {
                        font-size: 2em;
                        font-weight: 600;
                        text-decoration: underline;

                        @media screen and (max-width: 500px){
                            font-size: 1em;
                        }
                    }

                    .quantity-controls {
                        .b-icon {
                            margin: .3em;
                        }
                    }
                }

                .price {
                    font-size: 3em;
                }
            }
        }

        .btn-primary {
            float: right;
        }
    }
</style>