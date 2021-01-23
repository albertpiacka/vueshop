<template>
    <div class="accessories">
        <div class="accesories-content">
            <div class="adress">
                accessories > 
            </div>
            <div class="accessories-grid">
                <div v-for="item in items" :key="item.id">
                    <div class="accessories-box shadow-lg" data-aos="fade-down" :data-aos-delay="`${item.id}00`">
                        <div class="accessories-header" :style="`background: ${item.color}`">
                            <router-link :to="`accessories-${item.id}`">{{ item.name }}</router-link>

                            <b-icon icon="arrows-fullscreen" @click="setItem(item)" :id="`quickview-tooltip-${item.id}`"></b-icon>

                            <b-tooltip :target="`quickview-tooltip-${item.id}`" triggers="hover">
                                Quickview
                            </b-tooltip>
                        </div>
                        <div class="accessories-body-wrapper">
                            <div class="accessories-body">
                                <b-img :src="returnImg(item.name)" fluid-grow :alt="item.name"></b-img>
                            </div>

                            <div class="accessories-footer">
                                <div class="price">€ {{item.price}}</div>
                                <b-icon icon="cart-check" @click="addToCart(item)"></b-icon>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { data } from '../data'

    export default {
        name: 'accessories',
        data() {
            return {
                items: [],
            }
        },

        methods: {
            returnImg(name) {
                var images = require.context('../assets/accessories', false, /\.jpg$/)
                return images('./' + name + ".jpg")
            },

            addToCart(item){
                var existing = localStorage.getItem('basket')

                existing = existing ? existing.split(',') : []

                let obj = {
                    id: (Math.random()*1000).toFixed(0),
                    name: item.name,
                    quantity: 1,
                    price: item.price.toFixed(2)
                }

                existing.push(JSON.stringify([obj]));

                localStorage.setItem('basket', existing.toString())

                this.$root.$emit('flash', 'Item added to cart')
            },

            setItem(item){
                let data = {
                    obj: item,
                    type: 'accessory'
                }

                this.$root.$emit('quickview', data)
            }
        },

        mounted () {
            data[1].forEach(obj => {
                this.items.push(obj)
            })
        },
    }
</script>

<style lang="scss" scoped>
    .accessories {
        position: relative;
        background-color: #fff;
        background: url('../assets/background/image-5.png') no-repeat center 3em;
        background-attachment: fixed;

        .accessories-content {
            z-index: 1;
            position: relative;
        }

        .accessories-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            grid-gap: 2em;
            padding: 10em;

            @media screen and (max-width: 500px){
                grid-gap: 4em;
                padding: 2em;
                grid-template-columns: 1fr;
            }

            .accessories-box {
                border-radius: 2em;
                overflow: hidden;
            }

            .accessories-header {
                padding: 1em;
                background: $color-hover-secondary;
                display: flex;
                justify-content: space-between;

                a {
                    color: $color-secondary;
                    font-weight: 800;
                    letter-spacing: .1em;
                    text-transform: uppercase;
                    text-decoration: none;
                    text-shadow: 4px 5px 7px $color-shadow;
                }

                .bi-arrows-fullscreen {
                    color: $color-secondary;
                    transition: all .3s;
                    &:hover {
                        transform: scale(1.05);
                    }
                }
            }

            .accessories-body-wrapper {
                padding: 1em;
                background: #fff;

                img {
                    border-radius: 1em;
                }
            }

            .accessories-footer {
                padding: 1em;
                text-align: right;
                display: flex;
                justify-content: space-between;
                .bi-cart-check {
                    align-self: center;
                }
            }
        }
    }
</style>