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
                                        <div :id="`price-${item.id}`">€ {{item.selectedPrice}}</div>
                                    </div>

                                    <div class="package">
                                        <b-form-select v-model="item.selected" :options="item.options" :id="`select-${item.id}`"
                                        @change="setPrice(item)"
                                        >
                                        </b-form-select>
                                    </div>
                                </div>

                                <b-icon icon="cart-check" @click="addToCart(item)" :id="`quickshop-tooltip-${item.id}`"></b-icon>

                                <b-tooltip :target="`quickshop-tooltip-${item.id}`" triggers="hover">
                                    Quick-add to basket
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
    import AllMixins from '../mixins/AllMixins'
    import DataMixin from '../mixins/DataMixin'

    export default {
        name: 'coffee',
        mixins: [AllMixins, DataMixin],

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
                item['selectedPrice'] = (item.price * item.selected).toFixed(2)
                item['options'] = [
                    { value: null, text: 'Select' },
                    { value: '0.25', text: '250gr' },
                    { value: '1', text: '1000gr' },
                ] 
            })
        },

        methods: {
            addToCart(item){
                let id = this.getDB('basket').length + 1

                let obj = {
                    id: id,
                    name: item.name,
                    quantity: 1,
                    package: `${item.selected * 1000}gr`,
                    price: ((item.price * Number(item.selected)) * 1).toFixed(2)
                }

                this.pushToDB('basket', obj)

                item.selected = '0.25'

                this.$root.$emit('flash', 'Item added to cart')
            },
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
        }
    }
</style>