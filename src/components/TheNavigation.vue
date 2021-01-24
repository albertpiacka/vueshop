<template>
    <div>
        <div class="nav-controls">
            <div class="navbar-wrapper">
                <div>
                    <b-icon icon="text-left" scale="2" aria-hidden="true" 
                        v-show="!menu && this.$route.meta !== 'back'" 
                        @click="toggleMenu"
                    >
                    </b-icon>

                    <b-icon icon="x-circle" scale="2" aria-hidden="true" 
                        v-if="menu" 
                        @click="toggleMenu"
                    >
                    </b-icon>

                    <b-icon icon="arrow-left-square" scale="2" aria-hidden="true" 
                        v-if="!menu && this.$route.meta == 'back'"
                        @click="$router.go(-1)"
                    >
                    </b-icon>
                </div>
                 
                <router-link to="/basket" class="basket-link">
                    <b-icon icon="handbag" scale="2" @click="hideContent"></b-icon>
                </router-link>
            </div>
        </div>

        <transition name="fade">
            <div class="menu" v-if="menu">
                <div class="overlay"></div>
                <ul class='menu-list'>
                    <li data-aos="fade-right" data-aos-delay="100" @click="toggleMenu">
                        <router-link to="/">Home</router-link>
                    </li>

                    <li data-aos="fade-right" data-aos-delay="200" @click="toggleMenu">
                        <router-link to="/coffee">Coffee</router-link>
                    </li>

                    <li data-aos="fade-right" data-aos-delay="300" @click="toggleMenu">
                        <router-link to="/accessories">Accessories</router-link>
                    </li>

                    <li data-aos="fade-right" data-aos-delay="400" @click="toggleMenu">
                        <router-link to="/about">About</router-link>
                    </li>
                </ul>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                menu: false,
            }
        },

        mounted () {
            window.addEventListener('keydown', e => {
                if(e.key == 'Escape' && this.menu == true){
                    this.toggleMenu()
                }
            })
        },

        methods: {
            toggleMenu() {
                let content = document.querySelector('.content')
                let quickview = document.querySelector('.quickview')

                this.hideContent()

                if(this.menu == false){
                    this.menu = true
                    content.style.filter = "blur(2px)"
                    content.style.transition = "all .5s ease"

                    quickview.style.filter = "blur(2px)"
                    quickview.style.transition = "all .5s ease"
                } else {
                    this.menu = false
                    content.style.filter = "blur(0px)"
                    content.style.transition = "all .5s ease"

                    quickview.style.filter = "blur(0px)"
                    quickview.style.transition = "all .5s ease"
                }
            },

            hideContent(){
                this.$root.$emit('hide-content')
            },
        },
    }
</script>

<style lang="scss" scoped>
    .basket-link {
        color: $color-primary;
        text-decoration: none;
        &:hover {
            color: $color-primary;
        }
    }

    .nav-controls {
        position: fixed;
        width: 100%;
        z-index: 101;
    }

    .navbar-wrapper {
        position: relative;
        width: 100%;
        z-index: 101;
        display: flex;
        flex-direction: row;
        background-color: transparent;
        padding: 1.5em;
        justify-content: space-between;

        .bi-handbag-fill {
            align-self: center;
        }
    }

    .menu {
        .overlay {
            position: fixed;
            z-index: 10;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
        }

        .menu-list {
            position: fixed;
            z-index: 101;
            width: 30%;
            padding: 0;
            list-style: none;
            text-align: center;
            left: 35%;
            top: 5em;
            border-right: 2px solid $color-primary;
            padding: 0 2em;

            @media screen and (max-width: 500px){
                width: 90%;
                left: 5%;
            }

            li {
                padding: 1em 0;
                font-weight: 500;
                font-size: 1.5em;
            }

            a {
                color: $color-primary;
                text-decoration: none;
                transition: color .3s ease;
                &:hover {
                    color: $color-hover-secondary;
                }
            }
        }
    }
</style>