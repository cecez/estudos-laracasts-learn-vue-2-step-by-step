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
                  <div class="w-1/2">{{ titulo }}</div>
                  <div><input
                      @input="$emit('update:pontos', $event.target.value)"
                      :value="pontos"
                      class="min-w-full" type="number" min="0" :max="max" :step="step"></div>
                </div>
          </div>
      </div>
    `
});

Vue.component('jogador', {
    computed: {
        total() {
            return this.jogadas.reduce((ac, atual) => parseInt(ac.pontos) + parseInt(atual.pontos));
        }
    },
    data() {
        return {
            jogadas: [
                { titulo: 'Um', pontos: 0, max: 6, step: 1 },
                { titulo: 'Dois', pontos: 0, max: 10, step: 2 },
            ],
            um: 0,
            dois: 0,
            tres: 0,
            quatro: 0,
            cinco: 0,
            seis: 0,
            trinca: 0,
            quadra: 0,
            full_house: 0,
            sequencia: 0,
            general: 0
        }
    },
    methods: {
        removeJogador(indice) {
            EventDispatcher.fire('removerJogador', indice);
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
                        min="0"
                        :max="jogada.max"
                        :step="jogada.step"
                        :pontos.sync="jogada.pontos"
                    >
                    </jogada>

                  <div class="table-row">
                    <div class="table-cell bg-gray-200 text-gray-700 px-4 py-2 text-sm">
                      <div class="flex">
                        <div class="w-1/2">Três</div>
                        <div><input type="number" v-model="tres" class="min-w-full" min="0" max="15" step="3"></div>
                      </div>
                    </div>
                  </div>

                  <div class="table-row">
                    <div class="table-cell bg-gray-200 text-gray-700 px-4 py-2 text-sm">
                      <div class="flex">
                        <div class="w-1/2">Quatro</div>
                        <div><input type="number" v-model="quatro" class="min-w-full" min="0" max="20" step="4"></div>
                      </div>
                    </div>
                  </div>

                  <div class="table-row">
                    <div class="table-cell bg-gray-200 text-gray-700 px-4 py-2 text-sm">
                      <div class="flex">
                        <div class="w-1/2">Cinco</div>
                        <div><input type="number" v-model="cinco" class="min-w-full" min="0" max="25" step="5"></div>
                      </div>
                    </div>
                  </div>

                  <div class="table-row">
                    <div class="table-cell bg-gray-200 text-gray-700 px-4 py-2 text-sm">
                      <div class="flex">
                        <div class="w-1/2">Seis</div>
                        <div><input type="number" v-model="seis" class="min-w-full" min="0" max="30" step="6"></div>
                      </div>
                    </div>
                  </div>

                  <div class="table-row">
                    <div class="table-cell bg-gray-200 text-gray-700 px-4 py-2 text-sm">
                      <div class="flex">
                        <div class="w-1/2">Trinca</div>
                        <div><input type="number" v-model="trinca" class="min-w-full" min="0" max="20" step="20"></div>
                      </div>
                    </div>
                  </div>

                  <div class="table-row">
                    <div class="table-cell bg-gray-200 text-gray-700 px-4 py-2 text-sm">
                      <div class="flex">
                        <div class="w-1/2">Quadra</div>
                        <div><input type="number" v-model="quadra" class="min-w-full" min="0" max="30" step="30"></div>
                      </div>
                    </div>
                  </div>

                  <div class="table-row">
                    <div class="table-cell bg-gray-200 text-gray-700 px-4 py-2 text-sm">
                      <div class="flex">
                        <div class="w-1/2">Full House</div>
                        <div><input type="number" v-model="full_house" class="min-w-full" min="0" max="25" step="25"></div>
                      </div>
                    </div>
                  </div>

                  <div class="table-row">
                    <div class="table-cell bg-gray-200 text-gray-700 px-4 py-2 text-sm">
                      <div class="flex">
                        <div class="w-1/2">Sequência</div>
                        <div><input type="number" v-model="sequencia" class="min-w-full" min="0" max="40" step="40"></div>
                      </div>
                    </div>
                  </div>

                  <div class="table-row">
                    <div class="table-cell bg-gray-200 text-gray-700 px-4 py-2 text-sm">
                      <div class="flex">
                        <div class="w-1/2">General</div>
                        <div><input type="number" v-model="general" class="min-w-full" min="0" max="50" step="50"></div>
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