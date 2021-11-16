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

conjuntoDeJogadores = [];

Vue.component('jogada', {
    props: ['titulo', 'max', 'step', 'pontos'],
    template: `
      <div class="table-row">
          <div class="table-cell bg-gray-200 text-gray-700 px-4 py-2 text-sm">
                <div class="flex">
                  <div class="w-1/3">
                    <input type="checkbox">
                  </div>
                  <div class="w-1/3">{{ titulo }}</div>
                  <div class="w-1/3">
                    <input
                      @input="$emit('update:pontos', $event.target.value)"
                      :value="pontos"
                      class="min-w-full" type="number" min="0" :max="max" :step="step">
                  </div>
                </div>
          </div>
      </div>
    `
});

Vue.component('jogador', {
    computed: {
        total() {
            return this.jogadas.reduce((ac, atual) => parseInt(ac) + parseInt(atual.pontos), 0);
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
    props: ['nome', 'indice'],
    template: `
        <div>
            <div class="table w-full">
                <div class="table-row-group">
                    <div class="table-row">
                        <div class="table-cell bg-gray-400 text-gray-700 px-4 py-2 text-sm">
                          <div class="flex">
                            <slot></slot>
                            <div><button @click="removeJogador(indice)">Remover</button></div>
                          </div>
                        </div>
                    </div>
                  
                    <jogada
                        v-for="(jogada, index) in this.jogadas"
                        :key="index"
                        :titulo="jogada.titulo"
                        :max="jogada.max"
                        :step="jogada.step"
                        :pontos.sync="jogada.pontos"
                    >
                    </jogada>
                  
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
        <jogador 
            v-for="(jogador, index) in this.jogadores" 
            :key="index"
            :nome="jogador.nome"
            :indice="index"
        >
          {{ jogador.nome }}
        </jogador>
      </div>`,

    created() {
        EventDispatcher.listen('removerJogador', function (indice) {
            conjuntoDeJogadores.splice(indice, 1);
        });
    },

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
            if (nome !== "") {
                conjuntoDeJogadores.push({nome: nome})
            }
        }
    }
})