import Errors from "./Errors";

class Form {
    constructor(data) {
        this.originalData = data;
        this.errors = new Errors();

        for (let field in data) {
            this[field] = data[field];
        }
    }

    data() {
        let data = {};

        for (let property in this.originalData) {
            data[property] = this[property];
        }

        return data;
    }

    reset() {
        this.errors.clear();
        for (let field in this.originalData) {
            this[field] = '';
        }
    }

    submit(requestType, url) {
        return new Promise((resolve, reject) => {
            axios[requestType](url, this.data())
                .then(response => {
                    this.onSuccess(response.data);

                    resolve(response.data);
                })
                .catch(error => {
                    this.onFail(error.response.data);

                    reject(error.response.data);
                });
        });



    }

    onSuccess(data) {
        alert(data.message);

        this.reset();
    }

    onFail(errors) {
        this.errors.record(errors.errors);
    }
}

export default Form;
