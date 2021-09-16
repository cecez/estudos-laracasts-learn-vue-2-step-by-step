import axios from "axios";
import Example from './components/Example';
import Form from "./core/Form";
import Notification from "./components/Notification";
import Vue from "vue";

window.axios = axios;
window.Form = Form;

new Vue({
    el: '#app',

    components: {
        Example, Notification
    },

    data: {
        form: new Form({
            name: '',
            description: ''
        })
    },

    methods: {
        onSubmit() {
            this.form
                .submit('post', '/projects')
                .then(data => console.log(data))
                .catch(error => console.log(error));
        }
    }
});
