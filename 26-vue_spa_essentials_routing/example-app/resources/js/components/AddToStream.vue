<template>
    <div class="message">
        <div class="message-header">Adicionar status</div>
        <div class="message-body">
            <form
                @keydown="form.errors.clear()"
                @submit.prevent="onSubmit">
                <p class="control">
                    <textarea class="textarea" v-model="form.body"></textarea>
                    <span
                        class="help is-danger"
                        v-show="form.errors.has('body')"
                        v-text="form.errors.get('body')"
                    ></span>
                </p>
                <p class="control">
                    <button
                        class="button is-primary"
                        :disabled="form.errors.any()"
                    >Enviar</button>
                </p>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: new Form({ body: '' })
        }
    },
    methods: {
        onSubmit() {
            this
                .form
                .post('/statuses')
                .then(status => this.$emit('completed', status))
                .catch(error => console.log(error));
        }
    },
    name: "AddToStream.vue"
}
</script>

<style scoped>

</style>
