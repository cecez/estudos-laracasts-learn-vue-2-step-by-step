Vue.component('tabs', {
    created() { this.tabs = this.$children; },
    data() { return { tabs: [] } },
    methods: {
        selectTab(selectedTab) {
            this.tabs.forEach(tab => {
                tab.isActive = (tab.name === selectedTab.name);
            })
        }
    },
    template: `
      <div>
          <div class="tabs">
            <ul>
              <li v-for="tab in tabs" :class="{ 'is-active': tab.isActive }">
                <a :href="tab.href" @click="selectTab(tab)">{{ tab.name }}</a>
              </li>
            </ul>
          </div>
      
          <div class="tabs-details">
            <slot></slot>
          </div>
      </div>
    `
});

Vue.component('tab', {
    computed: {
        href() {
            return '#' + this.name.toLowerCase().replace('/ /g', '-');
        }
    },
    data() { return { isActive: false } },
    mounted() { this.isActive = this.selected; },
    props: {
        name: { required: true },
        selected: { default: false }
    },
    template: `
      <div v-show="isActive">
        <slot></slot>
      </div>`
});

new Vue({
    el: '#root'
})