import VueRouter from "vue-router";

import About from "./views/About";
import Home from "./views/Home";

let routes = [
    { path: '/', component: Home },
    { path: '/about', component: About },
]

export default new VueRouter({
    routes
});
