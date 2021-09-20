let dadosCompartilhados = {
    user: {
        name: "João das Pedras"
    }
}

new Vue({
    data: {
        meuDado: true,
        compartilhado: dadosCompartilhados
    },
    el: '#one'
});

new Vue({
    data: {
        dado: "dado",
        compartilhado: dadosCompartilhados
    },
    el: '#two'
});