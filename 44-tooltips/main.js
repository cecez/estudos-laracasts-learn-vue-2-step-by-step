Vue.directive('tooltip', {
    bind(element, bindings) {
        tippy(element, {
            content: bindings.value,
            placement: bindings.arg || 'top'
        });
    }
});

Vue.component('tooltip', {
    props: {
        name: {},
        placement: { default: 'top' }
    },
    template: `
      <div v-show="false">
        <slot></slot>
      </div>`,
    mounted() {
        document
            .querySelectorAll(`[data-tooltip-name=${this.name}]`)
            .forEach(elemento => {
                tippy(elemento, {
                    arrow: true,
                    content: this.$el.innerHTML,
                    allowHTML: true,
                    placement: this.placement
                });
            })
    }
})

new Vue({
    el: '#root',

    mounted() {
        document
            .querySelectorAll('[data-tooltip]')
            .forEach(elemento => {
                tippy(elemento, {
                    content: elemento.dataset.tooltip,
                    placement: elemento.dataset.tooltipPlacement || 'top'
                });
        });
    }
})