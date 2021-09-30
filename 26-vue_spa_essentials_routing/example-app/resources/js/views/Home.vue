<template>
    <div class="container">
        <div class="columns">
            <div class="column">
                <add-to-stream @completed="addStatus"></add-to-stream>

                <div class="message" v-for="status in statuses">
                    <div class="message-header">
                        <p>{{ status.user.name }} disse ...</p>
                        <p>{{ status.created_at | ago }}</p>
                    </div>
                    <div class="message-body" v-text="status.body"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AddToStream from "../components/AddToStream";
import moment from 'moment';
import Status from "../models/Status";

export default {
    components: { AddToStream },

    data() {
        return {
            statuses: []
        }
    },
    name: "Home",
    created() {
        // busca dados por requisição assíncrona
        Status
            .all()
            .then(({data}) => this.statuses = data) // equivale a .then((response => this.statuses = response.data)

    },

    filters: {
        ago(date) {
            return moment(date).fromNow();
        }
    },

    methods: {
        addStatus(status) {
            this.statuses.unshift(status);

            alert('Status adicionado');

            window.scrollTo(0, 0);
        }
    }
}
</script>

<style scoped>

</style>
