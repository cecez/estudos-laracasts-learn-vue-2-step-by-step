conjuntoDeJogadores = [];

Vue.component('jogador', {
    computed: {
        total() {
            return parseInt(this.um) +
                parseInt(this.dois) +
                parseInt(this.tres) +
                parseInt(this.quatro) +
                parseInt(this.cinco) +
                parseInt(this.seis);
        }
    },
    data() {
        return {
            um: 0,
            dois: 0,
            tres: 0,
            quatro: 0,
            cinco: 0,
            seis: 0
        }
    },
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
                        <div class="table-cell bg-gray-200 text-gray-700 px-4 py-2 text-sm">
                            <div class="flex">
                                <div class="w-1/2">Um</div>
                                <div><input class="w-1/2" type="number" v-model="um"></div>
                            </div>
                        </div>
                    </div>
                    <div class="table-row">
                        <div class="table-cell bg-gray-200 text-gray-700 px-4 py-2 text-sm">
                            <div class="flex">
                                <div class="w-1/2">Dois</div>
                                <div><input class="w-1/2" type="number" v-model="dois"></div>
                            </div>
                        </div>
                    </div>
                    <div class="table-row">
                        <div class="table-cell bg-gray-200 text-gray-700 px-4 py-2 text-sm">
                            <div class="flex">
                                <div class="w-1/2">Total</div>
                                <div class="w-1/2">{{ this.total }}</div>
                            </div>
                        </div>
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