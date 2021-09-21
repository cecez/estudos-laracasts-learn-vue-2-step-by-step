import axios from "axios";
import Vue from "vue";

window.Vue = Vue;
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
