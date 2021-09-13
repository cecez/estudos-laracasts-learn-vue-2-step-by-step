class Errors {
    constructor() {
        this.errors = {};
    }

    any() {
        return Object.keys(this.errors).length > 0;
    }

    clear(field) {
        if (field) {
            delete this.errors[field];
            return;
        }

        this.errors = {};
    }

    get(field) {
        if (this.errors[field]) {
            return this.errors[field][0];
        }
    }

    has(field) {
        return this.errors.hasOwnProperty(field);
    }

    record(errors) {
        this.errors = errors;
    }
}

class Form {
    constructor(data) {
        this.originalData = data;
        this.errors = new Errors();

        for (let field in data) {
            this[field] = data[field];
        }
    }

    data() {
        let data = Object.assign({}, this);

        delete data.originalData;
        delete data.errors;

        return data;
    }

    reset() {
        for (let field in this.originalData) {
            this[field] = '';
        }
    }

    submit(requestType, url) {
        axios[requestType](url, this.data())
            .then(this.onSuccess.bind(this))
            .catch(this.onFail.bind(this));
    }

    onSuccess(response) {
        alert(response.data.message);
        this.errors.clear();
        this.reset();
    }

    onFail(error) {
        this.errors.record(error.response.data.errors);
    }
}

new Vue({
    el: '#app',

    data: {
        form: new Form({
            name: '',
            description: ''
        })
    },

    methods: {
        onSubmit() { this.form.submit('post', '/projects'); }
    }
});
