<template>
    <div class="container">
        <div class="columns">
            <div class="column">
                <div class="message" v-for="seguidor in seguidores">
                    <div class="message-header">
                        <p><img :src="seguidor.avatar_url" :alt="seguidor.login" style="width: 150px"></p>
                        <p>Seguidor: {{ seguidor.login }}</p>
                    </div>
                    <div class="message-body">
                        <a :href="seguidor.html_url" target="_blank">{{ seguidor.html_url }}</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            seguidores: []
        }
    },
    name: "Home",
    created() {
        // busca dados por requisição assíncrona
        axios
            .get('https://api.github.com/users/cecez/followers')
            .then(({data}) => this.seguidores = data) // equivale a .then((response => this.seguidores = response.data)

    }
}
</script>

<style scoped>

</style>
