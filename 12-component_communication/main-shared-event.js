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

Vue.component('coupon', {
    methods: {
        emitCouponApplied() {
            EventDispatcher.fire('couponApplied');
        }
    },
    template: '<input placeholder="Digite seu cupom." @blur="this.emitCouponApplied">',
});

new Vue({
    created() {
        EventDispatcher.listen('couponApplied', () => this.couponApplied = true);
    },
    data: { couponApplied: false },
    el: '#root'
})