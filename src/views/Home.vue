<template> 
    <div class="home">
        <div id="section-1">
            <h1 data-aos="fade-down">ROASTED</h1>
            <div class="bestsellers">
                <h2>OUR BESTSELLERS</h2>
                <div class="coffee-grid">   
                    <div v-for="item in items.slice(2, 5)" :key="item.id">
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
                                            <b-form-select v-model="item.selected" :options="item.options" :id="`select-${item.id}`">
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

        <div id="section-2">
            <img src="../assets/background/bean.png" alt="coffee-bean" data-aos="fade-up">

            <div class="values-wrapper shadow">
                <h3 data-aos="fade-right" data-aos-delay="100">Sustainable</h3>
                <h3 data-aos="fade-right" data-aos-delay="200">Organic</h3>
                <h1 data-aos="fade-right" data-aos-delay="300">Delicious</h1>
            </div>
        </div>
    </div>
</template>

<script>
    import { data } from '../data'
    import VueMixins from '../mixins/VueMixins'

    export default {
        name: 'home',
        mixins: [VueMixins],

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
    }
</script>

<style lang="scss" scoped>
    .home {
        position: relative;
        background-color: $color-secondary;
        background: url('../assets/background/image-1.png') no-repeat center 3em;
        background-attachment: fixed;

        #section-1 {
            z-index: 1;
            position: relative;
            padding: 2em;

            @media screen and (max-width: 500px){
                padding: 1em;

            }

            h1 {
                font-size: 4em;
                box-shadow: inset 0 -30px 0px 0px #FFC500;
                display: inline-block;
                align-self: baseline;
            }

            .bestsellers {
                margin: 5em 0;

                h2 {
                    margin: 1em 0;
                }
            }

            .coffee-grid {
                display: grid;
                grid-gap: 1em;
                grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            }
        }

        #section-2 {
            padding: 4em 2em;
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-gap: 1em;

            @media screen and (max-width: 600px){
                grid-template-columns: 1fr;
            }

            img {
                margin: 1em auto;
            }

            .values-wrapper {
                align-self: center;
                background: #fff;
                padding: 1em;
                border-radius: 2em;
                h3 {
                    font-weight: 100;
                }

                h1 {
                    font-weight: 200;
                }
            }
        }
    }
</style>