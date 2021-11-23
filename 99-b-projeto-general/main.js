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

Vue.component('jogada', {
    data() {
        return {
            inativa: false
        }
    },
    props: ['titulo', 'max', 'step', 'pontos'],
    template: `
                <div class="flex">
                  <div class="">
                    <input type="checkbox" v-model="inativa">
                  </div>
                  <div class="ml-2 mr-2 w-full">
                    <span v-bind:class="{ 'font-bold' : inativa }">{{ titulo }}</span>
                  </div>
                  <div class="">
                    <input
                      @input="$emit('update:pontos', $event.target.value)"
                      :value="pontos"
                      :disabled="inativa"
                      class="min-w-full" type="number" min="0" :max="max" :step="step">
                  </div>
                </div>
    `
});

Vue.component('jogador', {
    computed: {
        total() {
            somaTotal = this.jogadas.reduce((ac, atual) => parseInt(ac) + parseInt(atual.pontos), 0);
            this.$emit('update:pontuacao', somaTotal)
            return somaTotal;
        },
        classeHeader() {
            if (this.colocacao === 1) {
                return 'bg-yellow-300';
            } else if (this.colocacao === 2) {
                return 'bg-gray-300'
            } else if (this.colocacao === 3) {
                return 'bg-orange-600';
            }
            return 'bg-green-300';
        },
        classeBody() {
            if (this.colocacao === 1) {
                return 'bg-yellow-200';
            } else if (this.colocacao === 2) {
                return 'bg-gray-200'
            } else if (this.colocacao === 3) {
                return 'bg-orange-500';
            }
            return 'bg-green-200';
        }
    },
    data() {
        return {
            jogadas: [
                { titulo: 'Um', pontos: 0, max: 5, step: 1 },
                { titulo: 'Dois', pontos: 0, max: 10, step: 2 },
                { titulo: 'Três', pontos: 0, max: 15, step: 3 },
                { titulo: 'Quatro', pontos: 0, max: 20, step: 4 },
                { titulo: 'Cinco', pontos: 0, max: 25, step: 5 },
                { titulo: 'Seis', pontos: 0, max: 30, step: 6 },
                { titulo: 'Trinca', pontos: 0, max: 20, step: 20 },
                { titulo: 'Quadra', pontos: 0, max: 30, step: 30 },
                { titulo: 'Full house', pontos: 0, max: 25, step: 25 },
                { titulo: 'Sequência', pontos: 0, max: 40, step: 40 },
                { titulo: 'General', pontos: 0, max: 50, step: 50 },
            ],
        }
    },
    methods: {
        removeJogador(indice) {
            if (confirm('Tem certeza que deseja remover?')) {
                EventDispatcher.fire('removerJogador', indice);
            }
        }
    },
    props: ['nome', 'indice', 'pontuacao', 'colocacao'],
    template: `
        <div>
            <div class="table w-full">
                <div class="table-row-group">
                    <div class="table-row">
                        <div
                            v-bind:class="this.classeHeader"
                            class="table-cell px-4 py-2 text-sm"
                        >
                          <div class="flex justify-between">
                            <slot></slot>
                            <div><button 
                                class="bg-white ml-2 p-1 rounded text-black"
                                @click="removeJogador(indice)"
                            >Remover</button></div>
                          </div>
                        </div>
                    </div>

                    <div 
                        v-for="(jogada, index) in this.jogadas"
                        :class="classeBody"
                        class="table-row"
                    >
                        <div class="table-cell px-4 py-2 text-sm">
                          <jogada
                              :key="index"
                              :titulo="jogada.titulo"
                              :max="jogada.max"
                              :step="jogada.step"
                              :pontos.sync="jogada.pontos"
                          >
                          </jogada>  
                        </div>
                    </div>
                  
                    
                  
                    <div class="table-row">
                        <div
                            v-bind:class="this.classeHeader"
                            class="table-cell px-4 py-2 text-sm"
                        >
                            <div class="flex justify-between">
                                <div>Total</div>
                                <div>
                                  {{ this.total }}
                                </div>
                            </div>
                        </div>
                    </div>

                      <div class="table-row">
                        <div
                            v-bind:class="this.classeHeader"
                            class="table-cell  px-4 py-2 text-sm"
                        >
                          <div class="flex justify-between">
                            <div>Colocação</div>
                            <div>
                              {{ this.colocacao }}
                            </div>
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
        <jogador 
            v-for="(jogador, indice) in this.jogadores" 
            :colocacao="colocacaoDoJogador(jogador.identificador)"
            :key="indice"
            :nome="jogador.nome"
            :indice="indice"
            :pontuacao.sync="jogador.pontuacao"
        >
          {{ jogador.nome }}
        </jogador>
      </div>`,

    computed: {
        jogadoresOrdenadosPorPontuacao() {
            // ordena array de objetos pela pontuacao
            return [...this.jogadores].sort(comparaPontuacaoDosJogadores);
        }
    },

    created() {
        EventDispatcher.listen('removerJogador', function (indice) {
            conjuntoDeJogadores.splice(indice, 1);
        });
    },

    data() {
        return {
            jogadores: conjuntoDeJogadores,
        }
    },

    methods: {
        colocacaoDoJogador(identificador) {
            // busca colocação pelo identificador
            return this.jogadoresOrdenadosPorPontuacao.findIndex(x => x.identificador === identificador) + 1;
        }
    }
});



new Vue({
    data() {
        return {
            indiceJogadores: 0
        }
    },
    el: '#root',
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