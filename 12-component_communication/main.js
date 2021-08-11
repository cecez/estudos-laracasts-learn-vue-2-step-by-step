Vue.component('coupon', {
    methods: { handleCouponApplied() { this.$emit('applied'); } },
    template: '<input placeholder="Digite seu cupom." @blur="handleCouponApplied">'
});

new Vue({
    data() { return { couponApplied: false } },
    el: '#root',
    methods: { onCouponApplied() { this.couponApplied = true; } }
})