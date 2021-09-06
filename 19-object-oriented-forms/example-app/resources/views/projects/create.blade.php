<html>

<head>
    <title>Criar projeto</title>
</head>

<body>

@include('projects.list')

<form action="/projects" method="POST">
    @csrf

    <input name="name" type="text" id="name" placeholder="Nome do projeto">

    <input name="description" type="text" id="description" placeholder="Descrição do projeto">

    <button>Criar</button>

</form>

</body>
</html>
