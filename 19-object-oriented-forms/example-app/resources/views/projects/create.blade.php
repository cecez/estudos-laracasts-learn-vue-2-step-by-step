<html>
    <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
        <title>Criar projeto</title>
    </head>
<body>

    @include('projects.list')

    <div id="app">
        <form action="/projects" method="POST" @submit.prevent="onSubmit" @keydown="form.errors.clear($event.target.name)">
            @csrf

            <input name="name" type="text" id="name" placeholder="Nome do projeto" v-model="form.name">

            <span class="help is-danger" v-if="form.errors.has('name')" v-text="form.errors.get('name')"></span>

            <input name="description" type="text" id="description" placeholder="Descrição do projeto" v-model="form.description">

            <span class="help is-danger" v-if="form.errors.has('description')" v-text="form.errors.get('description')"></span>

            <button :disabled="form.errors.any()">Criar</button>

        </form>
    </div>



    <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script src="/js/app.js"></script>

</body>
</html>
