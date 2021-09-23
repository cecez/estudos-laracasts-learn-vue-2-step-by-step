import axios from "axios";
import Vue from "vue";
import VueRouter from "vue-router";

window.Vue = Vue;
Vue.use(VueRouter);
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
