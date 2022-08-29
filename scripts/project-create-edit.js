window.onload = function() {
    // Type: 'create' || 'edit'
    const screenType = 'create';

    // MODO CRIAR
    if(screenType == 'create') {
        document.querySelector('#main-title').innerText = "Vamos cadastrar seu novo projeto!";
        document.querySelector('#action-button').innerText = "Cadastrar";
    }

    // // MODO EDITAR
    // if(screenType == 'edit') {
    //     document.querySelector('#main-title').innerText = "Editar projeto";
    //     document.querySelector('#action-button').innerText = "Salvar";
    // }

    // Metodo de cadastrar
    // Construir a massa dados do payload
    // Enviar os dados para a API e redirecionar para a listagem
}

function cadastrar() {
    // Inicia a massa de dados (payload)
    let payload = {
        title: document.querySelector("#title").value,
        totalCost: document.querySelector("#totalCost").value,
        description: document.querySelector("#description").value,
        idClient: "1"
    }

    // Enviar para API
    fetch("https://630bdb2883986f74a7b7871c.mockapi.io/api/projects", {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(response => {
        alert('Cadastrado com sucesso!');
    })
}