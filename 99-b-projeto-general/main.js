
// Wrapper para emitir e ouvir eventos "globais"
window.EventDispatcher = new class {
    constructor() {
        this.vue = new Vue();
    }

    fire(event, data = null) {
        this.vue.$emit(event, data);
    }

    listen(event, callback) {
        this.vue.$on(event, callback);
    }
};

function comparaPontuacaoDosJogadores(a, b) {
    if (a.pontuacao < b.pontuacao) { return 1; }
    if (a.pontuacao > b.pontuacao ) { return -1; }
    return 0;
}

conjuntoDeJogadores = [];


new Vue({
    data() {
        return {
            indiceJogadores: 0
        }
    },
    el: '#root',
    components: {
        'jogadores': ComponenteJogadores
    },
    methods: {
        novoJogador() {
            const nome = prompt("Qual o nome do jogador?")
            if (nome !== "") {
                this.indiceJogadores++;
                conjuntoDeJogadores.push({ nome: nome, pontuacao: 0, identificador: this.indiceJogadores })
            }
        }
    }
})