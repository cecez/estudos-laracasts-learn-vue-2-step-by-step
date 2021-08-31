new Vue({
    data: {
        seguidores: []
    },
    el: '#root',
    mounted() {
        axios
            .get('https://api.github.com/users/cecez/followers')
            .then(response => this.seguidores = response.data);
    }
});