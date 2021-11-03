conjuntoDeJogadores = [];

Vue.component('jogador', {
    template: `
        <div>
            <div class="table w-full">
                <div class="table-row-group">
                    <div class="table-row">
                        <div class="table-cell bg-gray-400 text-gray-700 px-4 py-2 text-sm">
                            <slot></slot>
                        </div>
                    </div>
                    <div class="table-row">
                        <div class="table-cell bg-gray-200 text-gray-700 px-4 py-2 text-sm">Um</div>
                    </div>
                </div>
            </div>
        </div>
    `,
});

Vue.component('jogadores', {
    template: `
      <div class="flex">
        <jogador v-for="(jogador, index) in this.jogadores" :key="index">
          {{ jogador.nome }}
        </jogador>
      </div>`,

    data() {
        return {
            jogadores: conjuntoDeJogadores
        }
    }
});



new Vue({
    data: {  },
    el: '#root',
    methods: {
        novoJogador() {
            const nome = prompt("Qual o nome do jogador?")
            const novoJogador = { nome: nome }

            conjuntoDeJogadores.push(novoJogador)
        }
    }
})