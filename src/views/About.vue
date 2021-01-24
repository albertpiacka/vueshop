<template>
    <transition name="slideDown" mode="out-in">
        <div class="wrapper">
            <div class="about">
                <div class="animation-container">
                    <div class="about-content shadow">
                        <div class="content-wrapper">
                            <h1>About</h1>
                            <p>
                                This website is minimalistic single page application project built using Vue.js and developed by me - Albert :-) <br> Feel free to use any of the code! Link is below.
                            </p>
                        </div>

                        <div class="links-wrapper">
                            <a href="https://github.com/albertpiacka">
                                <b-icon icon="github"></b-icon>
                            </a>

                            <a href="https://www.facebook.com/albert.piacka">
                                <b-icon icon="facebook"></b-icon>
                            </a>

                            <a href="https://www.instagram.com/albert_piacka/">
                                <b-icon icon="instagram"></b-icon>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import { data } from '../data'

    export default {
        name: 'about',
        data() {
            return {
                items: [],
            }
        },
        mounted () {
            data[0].forEach(obj => {
                this.items.push(obj)
            })

            const card = document.querySelector(".about-content")
            const container = document.querySelector(".animation-container")
            const title = document.querySelector(".content-wrapper h1")
            const p = document.querySelector(".content-wrapper p")
            const svg = document.querySelectorAll(".links-wrapper svg")

            //Moving Animation Event
            container.addEventListener("mousemove", (e) => {
                let xAxis = (window.innerWidth / 2 - e.pageX) / 25;
                let yAxis = (window.innerHeight / 2 - e.pageY) / 25;
                card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
            });

            //Animate In
            container.addEventListener("mouseenter", () => {
                card.style.transition = "none";
                //Popout
                title.style.transform = "translateZ(50px)";
                p.style.transform = "translateZ(30px)";
                svg.forEach(el => {
                    el.style.transform = "translateZ(30px)";
                })
            });

            //Animate Out
            container.addEventListener("mouseleave", () => {
                card.style.transition = "all 0.5s ease";
                card.style.transform = `rotateY(0deg) rotateX(0deg)`;
                //Popback
                title.style.transform = "translateZ(0px)";
                p.style.transform = "translateZ(0px)";
                svg.forEach(el => {
                    el.style.transform = "translateZ(0px)";
                })
            });
        },
    }
</script>

<style lang="scss" scoped>
    .wrapper {
        perspective: 1000px;
    }

    .about {
        position: relative;
        background-color: $color-secondary;
        height: 100vh;
        background: url('../assets/background/image-7.png') no-repeat center 3em;
        background-attachment: fixed;

        .animation-container {
            width: 50%;
            margin: 1em auto;

            @media screen and (max-width: 600px){
                width: 90%;
            }

            @media screen and (min-width: 1000px){
                width: 40%;
            }

            @media screen and (min-width: 1300px){
                width: 30%;
            }
        }

        .about-content {
            z-index: 1;
            position: relative;
            width: 100%;
            height: 70vh;
            padding: 1em;
            border-radius: 2em;
            transform-style: preserve-3d;
    
            background: $color-dim;
            backdrop-filter: blur(40px);
            border: solid 2px transparent;
            background-clip: padding-box;
            box-shadow: 10px 10px 10px  rgba(46, 54, 68, 0.03);

            @media screen and (max-width: 500px) {
                height: auto;
            }

            .content-wrapper {
                display: grid;
                grid-template-columns: 1fr 4fr;

                h1 {
                    position: relative;
                    color: $color-dim-text;
                    -webkit-text-emphasis-style: double-circle;
                    writing-mode: vertical-rl;
                    font-size: 3em;
                    transition: all 0.75s ease-out;
                }

                p {
                    color: #948e8e;
                    text-align: justify;
                    transition: all 0.75s ease-out;
                }
            }

            .links-wrapper {
                display: grid;
                grid-gap: 1em;
                padding: 1em;
                margin: 1em;

                a {
                    color: $color-dim-text;
                }

                svg {
                    transition: all .75s ease-out;
                    &:hover {
                        transform: scale(1.2);
                    }
                }
            }
        }
    }
</style>