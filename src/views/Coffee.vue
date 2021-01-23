<template>
    <div class="coffee">
        <div class="coffee-content">
            <div class="adress">
                coffee >
            </div>
            <div class="coffee-grid">
                <div v-for="item in items" :key="item.id">
                    <div class="coffee-box shadow-lg" data-aos="fade-down" :data-aos-delay="`${item.id}00`">
                        <div class="coffee-header" :style="`background: ${item.color}`">
                            <router-link :to="`coffee-${item.id}`">{{ item.name }}</router-link>

                            <b-icon icon="arrows-fullscreen" @click="setItem(item)" :id="`quickview-tooltip-${item.id}`"></b-icon>

                            <b-tooltip :target="`quickview-tooltip-${item.id}`" triggers="hover">
                                Quickview
                            </b-tooltip>
                        </div>
                        <div class="coffee-body-wrapper">
                            <div class="coffee-body">
                                roast
                                <b-form-rating :value="item.roast" show-value readonly
                                    icon-empty="circle"
                                    icon-half="circle-half"
                                    icon-full="circle-fill"
                                >
                                </b-form-rating>
                            </div>

                            <div class="coffee-footer">
                                <div class="wrapper">
                                    <div class="price">
                                        <div>€ {{returnPrice(item)}}</div>
                                    </div>

                                    <div class="package">
                                        <b-form-select v-model="item.selected" :options="item.options" :id="`select-${item.id}`"></b-form-select>
                                    </div>
                                </div>

                                <b-icon icon="cart-check" @click="addToCart(item)" :id="`quickshop-tooltip-${item.id}`"></b-icon>

                                <b-tooltip :target="`quickshop-tooltip-${item.id}`" triggers="hover">
                                    Quick-add to
                                </b-tooltip>
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
        name: 'coffee',

        data() {
            return {
                items: [],
            }
        },

        mounted () {
            data[0].forEach(obj => {
                this.items.push(obj)
            })

            this.items.forEach(item => {
                item['selected'] = '0.25'
                item['options'] = [
                    { value: null, text: 'Select' },
                    { value: '0.25', text: '250gr' },
                    { value: '1', text: '1000gr' },
                ] 
            })
        },

        methods: {
            addToCart(item){
                var existing = localStorage.getItem('basket')

                existing = existing ? existing.split(',') : []

                let obj = {
                    id: (Math.random()*1000).toFixed(0),
                    name: item.name,
                    quantity: 1,
                    package: `${item.selected * 1000}gr`,
                    price: ((item.price * Number(item.selected)) * 1).toFixed(2)
                }

                existing.push(JSON.stringify([obj]));

                localStorage.setItem('basket', existing.toString())

                item.selected = '0.25'

                this.$root.$emit('flash', 'Item added to cart')
            },

            returnPrice(item){
                return (item.price * Number(item.selected)).toFixed(2)
            },

            setItem(item){
                let data = {
                    obj: item,
                    type: 'coffee'
                }

                this.$root.$emit('quickview', data)
            }
        },
    }
</script>

<style lang="scss" scoped>
    .coffee {
        position: relative;
        background-color: $color-secondary;
        background: url('../assets/background/image-2.png') no-repeat center 3em;
        background-attachment: fixed;

        .coffee-content {
            z-index: 1;
            position: relative;
        }

        .coffee-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            grid-gap: 2em;
            padding: 10em;

            @media screen and (max-width: 500px){
                grid-gap: 4em;
                padding: 2em;
                grid-template-columns: 1fr;
            }

            .coffee-box {
                border-radius: 2em;
                display: grid;
                grid-template-rows: 1.5fr 2fr;
                grid-template-columns: 1fr;
                overflow: hidden;
            }

            .coffee-header {
                padding: 1em;
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

            .coffee-body-wrapper {
                padding: 1em;
                background: #fff;
            }

            .coffee-footer {
                padding: 1em;
                text-align: right;
                display: flex;
                justify-content: space-between;
                .wrapper {
                    display: flex;
                    column-gap: 1em;

                    @media screen and (max-width: 320px){
                        display: block;
                        .price {
                            text-align: left;
                            margin-bottom: .5em;
                        }
                    }
                }

                .bi-cart-check, .price {
                    align-self: center;
                }

                .package {
                    .custom-select {
                        max-width: 6em;
                        border-radius: 1em;
                        margin: .1em 0;
                    }
                }   
            }
        }
    }
</style>