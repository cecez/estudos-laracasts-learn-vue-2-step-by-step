<template>
    <div class="container">
        <div class="columns">
            <div class="column">
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
import moment from 'moment';
import Status from "../models/Status";

export default {
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
    }
}
</script>

<style scoped>

</style>
