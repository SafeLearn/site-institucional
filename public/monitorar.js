const data = Array.from({ length: 30 })
.map((_,i) => `
     <img src="./imagens/icons-dash/icons8-imac-96.png" alt="">
     <div class="descricao">
     <p>IP: ${i+1}</p>
     <p>Máquina sala informática</p>
     `);

// ===================================================================

let perPage = 5;
const state = {
    page: 1,
    perPage,
    totalPage:Math.ceil(data.length / perPage),
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
            state.page--
        }
    },
    prev() {
        state.page--;

        if (state.page < 1) {
            state.page++;
        }
    },
    goTo(page) {
        if(page < 1){
            page = 1;
        }

        state.page = +page;

        if (page > state.totalPage) {
            state.page = state.totalPage
        }
    },
    createListeners(){
        html.get('.comeco').addEventListener('click', ()=> {
            controls.goTo(1);
            update();
        });

        html.get('.ultimo').addEventListener('click', ()=> {
            controls.goTo(state.totalPage);
            update();
        });

        html.get('.proximo').addEventListener('click', ()=> {
            controls.next();
            update();
        });

        html.get('.volta').addEventListener('click', ()=> {
            controls.prev();
            update();
        });
    }
}

const list = {
    create(item) {
        const div = document.createElement('div');
        div.classList.add('item-lista');
        div.innerHTML = item

        html.get('.lista').appendChild(div)
    },
    update() {
        html.get('.lista').innerHTML = "";

        let page = state.page - 1;
        let start = page * state.perPage;
        let end = start + state.perPage;
        
        const paginatedItems = data.slice(start, end);

        paginatedItems.forEach(list.create)
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
            update()
        })

        html.get('.paginacao .numeros').appendChild(button)
    },
    update() {
        html.get('.paginacao .numeros').innerHTML = "";
        const {maxLeft, maxRigth} = buttons.calculateMaxVisible()

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

function init() {
    update();
    controls.createListeners();
}

init()