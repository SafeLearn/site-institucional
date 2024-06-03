// const { json } = require("body-parser");

function criarCard(maquina) {
    return `
        <img src="./imagens/icons-dash/icons8-imac-96.png" alt="">
        <div class="descricao">
        <p>Código Máquina: ${maquina.id}</p>
        <p>Nome máquina: ${maquina.nome}</p>
    `
}

let data = [];
let perPage = 5;
const state = {
    page: 1,
    perPage,
    totalPage: 1,
    maxVisibleButtons: 5
}

 const html = {
    get(element){
        return document.querySelector(element);
    }
 }

const controls = {
    next() {
        state.page++;

        const lastPage = state.page > state.totalPage
        if (lastPage) {
            state.page--;
        }
        update();
    },
    prev() {
        state.page--;

        if (state.page < 1) {
            state.page++;
        }
        update();
    },
    goTo(page) {
        if(page < 1){
            page = 1;
        }

        state.page = +page;

        if (page > state.totalPage) {
            state.page = state.totalPage
        }
        update();
    },
    createListeners(){
        html.get('.comeco').addEventListener('click', ()=> {
            controls.goTo(1);
        });

        html.get('.ultimo').addEventListener('click', ()=> {
            controls.goTo(state.totalPage);
        });

        html.get('.proximo').addEventListener('click', ()=> {
            controls.next();
        });

        html.get('.volta').addEventListener('click', ()=> {
            controls.prev();
        });
    }
}

const list = {
    create(item) {
        const div = document.createElement('div');
        div.addEventListener("click", () =>
            window.location.href = "monitoramento-maquina.html"
        );
        div.classList.add('item-lista');
        div.innerHTML = item;

        html.get('.lista').appendChild(div)
    },
    update() {
        html.get('.lista').innerHTML = "";

        let page = state.page - 1;
        let start = page * state.perPage;
        let end = start + state.perPage;
        
        const paginatedItems = data.slice(start, end);
        paginatedItems.forEach((maquina) => list.create(criarCard(maquina)));
    }
}

const buttons = {
    create(numeros){
        const button = document.createElement('div');
        button.innerHTML = numeros;

        if(state.page == numeros){
            button.classList.add('active')
        }

        button.addEventListener('click', (event) => {
            const page = event.target.innerText;
            controls.goTo(page);
        });

        html.get('.paginacao .numeros').appendChild(button)
    },
    update() {
        html.get('.paginacao .numeros').innerHTML = "";
        const {maxLeft, maxRigth} = buttons.calculateMaxVisible();

        for(let page = maxLeft; page <= maxRigth; page++){
            buttons.create(page);
        }
    },
    calculateMaxVisible(){
        const { maxVisibleButtons} = state;
        let maxLeft = (state.page - Math.floor(maxVisibleButtons / 2));
        let maxRigth = (state.page + Math.floor(maxVisibleButtons / 2));

        if (maxLeft < 1) {
            maxLeft = 1;
            maxRigth = maxVisibleButtons;
        }

        if (maxRigth > state.totalPage) {
            maxLeft = state.totalPage - (maxVisibleButtons - 1);
            maxRigth = state.totalPage

            if(maxLeft < 1){
                maxLeft = 1
            }
        }

        return {maxLeft, maxRigth}
    }
}

function update() {
    list.update();
    buttons.update();
}

/*function search(){
    const searchTerm = document.getElementById("procurar-maquina").value.toLowerCase();
    listaElement.innerHTML = "";

    data.forEach(htmlString => {
        const tempElement = document.createElement('div');
        tempElement.innerHTML = htmlString;

        const descricao = tempElement.querySelector('.descricao').textContent.toLowerCase(); 
        if (descricao.includes(searchTerm)) { 
            list.create(htmlString); 
        }
    });
}

let listaElement;*/

function init() {
    fetch(`/maquina/buscar/${sessionStorage.ID_INSTITUICAO}`).then(resposta => {
        if(!resposta.ok){
            throw new Error(`Erro na solicitação fetch: ${resposta.status} ${resposta.statusText}`);
        }
        return resposta.json();
    }).then(json => {
        console.log("Dados recebidos: ", json);
        data = json;
        state.totalPage = Math.ceil(data.length / state.perPage);
        update();
        controls.createListeners(); 
    })
    .catch(error => {
        console.error("Erro ao buscar dados:", error);
    });
}

init();