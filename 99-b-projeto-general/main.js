conjuntoDeJogadores = [];

Vue.component('jogador', {
    computed: {
        total() {
            return parseInt(this.um) +
                parseInt(this.dois) +
                parseInt(this.tres) +
                parseInt(this.quatro) +
                parseInt(this.cinco) +
                parseInt(this.seis) +
                parseInt(this.trinca) +
                parseInt(this.quadra) +
                parseInt(this.full_house) +
                parseInt(this.sequencia) +
                parseInt(this.general);
        }
    },
    data() {
        return {
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
                                <div><input class="min-w-full" type="number" v-model="um" min="0" max="6" step="1"></div>
                            </div>
                        </div>
                    </div>
                  
                    <div class="table-row">
                        <div class="table-cell bg-gray-200 text-gray-700 px-4 py-2 text-sm">
                            <div class="flex">
                                <div class="w-1/2">Dois</div>
                                <div><input class="min-w-full" type="number" v-model="dois" min="0" max="10" step="2"></div>
                            </div>
                        </div>
                    </div>

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
            if (nome !== "") {
                conjuntoDeJogadores.push({nome: nome})
            }
        }
    }
})