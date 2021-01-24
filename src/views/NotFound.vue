<template>
    <div class="not-found">
        <h1>Whoops, seems like you are lost!</h1>
        <router-link to="/">
            <b-button pill variant="primary">Go back home <b-icon icon="house"></b-icon></b-button>
        </router-link>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
    .not-found {
        height: 100vh;
        background: url('../assets/background/image-11.png') no-repeat center 3em;
        background-attachment: fixed;
        padding: 2em;
    }
</style>