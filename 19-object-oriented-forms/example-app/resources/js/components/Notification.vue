<template>
    <div class="notification">
        <h1>{{ message }}</h1>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                message: 'Olá garela!'
            }
        }
    }
</script>

<style lang="scss">
    .notification {
        background-color: lightblue;
        color: white;
    }
</style>
