<template>
    <div class="single-item">
        <div class="adress">
            <router-link to="/accessories">accessories</router-link>
                > {{this.filteredItem.name}}
        </div>
        
        <div class="single-item-grid">
            <b-img :src="returnImg(this.filteredItem.name)" fluid-grow :alt="this.filteredItem.name" data-aos="fade-down"></b-img>

            <div class="single-item-description">
                <div class="name" data-aos="fade-right" data-aos-delay="100">
                    <h1>
                        {{this.filteredItem.name}}
                    </h1>
                </div>
                
                <div class="price" data-aos="fade-right" data-aos-delay="200">
                    € {{price}}
                </div>

                <div class="add-to-basket" data-aos="fade-right" data-aos-delay="300">
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
    </div>
</template>

<script>
    import { data } from '../data'
    import DataMixin from '../mixins/DataMixin'

    export default {
        name: 'SingleItem',
        mixins: [DataMixin],
        data() {
            return {
                items: [],
                quantity: 1,
            }
        },

        mounted () {
            data[1].forEach(obj => {
                this.items.push(obj)
            })
        },

        methods: {
            returnImg(name) {
                var images = require.context('../assets/accessories', false, /\.jpg$/)
                return images('./' + name + ".jpg")
            },

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

            addToCart(){
                let id = this.getDB('basket').length + 1

                let obj = {
                    id: id,
                    name: this.filteredItem.name,
                    quantity: this.quantity,
                    price: (this.filteredItem.price * this.quantity).toFixed(2)
                }

                this.pushToDB('basket', obj)

                this.quantity = 1

                this.$root.$emit('flash', 'Item added to cart')
            }
        },

        computed: {
            filteredItem() {
                return this.items.filter(item => item.id == this.$route.params.id)[0] 
            },

            price() {
                if(this.selected){
                    return ((this.filteredItem.price * this.selected) * this.quantity).toFixed()
                } else return (this.filteredItem.price * this.quantity).toFixed()
            }
        },
        
    }
</script>

<style lang="scss" scoped>
    .single-item {
        position: relative;
        background-color: $color-secondary;
        background: url('../assets/background/image-6.png') no-repeat center 3em;
        background-attachment: fixed;

        .single-item-grid {
            padding: 1em;
            display: grid;
            grid-template-columns: 1fr;
            grid-gap: 1em;

            img {
                max-width: 70%;
                margin: 1em auto;
                border-radius: 1em;

                @media screen and (max-width: 500px){
                    max-width: 95%;
                }
            }

            .single-item-description {
                padding: 1em;

                h1 {
                    margin-top: 1em;
                    color: $color-hover-primary;
                    -webkit-text-stroke: 1px darken($color-hover-primary, 20%);
                    font-weight: 800;
                    font-size: 4em;
                }

                .price {
                    padding: 1em 0;
                    font-size: 2em;
                    font-weight: 100;
                    letter-spacing: .2em;
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

                .btn-primary {
                    background-color: #F5AD03 !important;
                    border: #F5AD03 !important;
                    &:focus {
                        box-shadow: 0 0 0 0.2rem #e9ab19;
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
    }
</style>