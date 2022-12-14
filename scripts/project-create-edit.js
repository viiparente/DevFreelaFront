// Pega os parametros da URL
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

//se tiver o parametro na url (?id=0) e edit, se nao e create
// Type: 'create' || 'edit' 
const screenType = params.id ? 'edit' : 'create';

function createOrEdit() {
    // Inicia a massa de dados (payload)
    let payload = {
        title: document.querySelector("#title").value,
        totalCost: document.querySelector("#totalCost").value,
        description: document.querySelector("#description").value,
        idClient: localStorage.getItem("idClient")
    }

    // Enviar para API enviando como (templates string)
    fetch(`https://630bdb2883986f74a7b7871c.mockapi.io/api/projects${screenType === 'edit' ? ('/' + params.id) : ''}`, {
        method: screenType === 'edit' ? 'PUT' : 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(response => {
        Swal.fire({
            title: 'Bom Trabalho!',
            text: screenType === 'edit' ? 'Editado com sucesso!' : 'Cadastrado com sucesso!',
            icon: 'success',
            confirmButtonText: 'Ok!'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = "list.html";
            }
        })
    })
    .catch(error =>{
        Swal.fire(
            'Algo de errado...',
            'Erro no Servidor!',
            'error'
        )
    })
}

window.onload = function() {
    setScreenTypeTexts();
    fillInputs();
}

function fillInputs() {
    if(screenType === 'edit'){
        fetch(`https://630bdb2883986f74a7b7871c.mockapi.io/api/projects/${params.id}`)
        .then(response => response.json())
        .then(project => {
            document.querySelector("#title").value = project.title;
            document.querySelector("#totalCost").value = project.totalCost;
            document.querySelector("#description").value = project.description;
        })
    }
}

function setScreenTypeTexts(){
    // MODO CRIAR
    if(screenType == 'create') {
        document.querySelector('#main-title').innerText = "Vamos cadastrar seu novo projeto!";
        document.querySelector('#action-button').innerText = "Cadastrar";
    }

    // MODO EDITAR
    if(screenType == 'edit') {
        document.querySelector('#main-title').innerText = "Editar projeto";
        document.querySelector('#action-button').innerText = "Salvar";
    }
}
