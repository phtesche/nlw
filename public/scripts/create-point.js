//Criando uma função para trazer as coleçoes de array 
function populateUFs() {
    //contante para que as informaçoes sejam inseridas na caixa 
    const UFSelect = document.querySelector("[name=UF]")

    //Promessa de busca com resultados
    //Resutados = 27 Estados Brasileiros 
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    //converter esses dados em json 
    .then( res => res.json() )
    //arow function para o array de estados buscados
    .then( states => {
        //Estrutura de repetição 
        //para cada estado de ESTADOS(UF)
        for ( const state of states) { 
            //Pege o seu valor e some a voce mesmo 
            //adicionando opções na caixa de select 
            //realizando a opção pelo id e nome do estado
            UFSelect.innerHTML += `<option value="${state.nome}">${state.nome}</option>`
        }

        
    })
}
//chamando de função 
populateUFs()

//criando uma função pra pegar as cidades
//pegando evento dentro da função (event)
function getCities(event) {
    //criando constant para seletor da cidade
    const citySelect = document.querySelector("[name=city]")
    //input para conversão do valor  
    const stateInput = document.querySelector("[name=states]")
    //Contante para o valor da URL 
    const ufValue = event.target.value

    // Valor do input sera atualizado sempre que rolar o evento citySelect
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    //cont para api de cidades por UF
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    //limpando o campo de busca 
    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    //desbloquear a caixa de cidade para seleção 
    citySelect.disabled = false

    //Criando promessa e conversão de dados e adicionando valores dentro do select
    fetch(url)
    .then( res => res.json() )
    .then( cities => {
        
        
        for ( const city of cities ) { 
            citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
        }


    })
}

document
    .querySelector("[name=UF]")
    .addEventListener("change", getCities ) 


//Itens de coleta 
//Pegar todos os LI 

const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

//atualizar o campo escontido com os itens selecionados 
const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event){
    const itemLi = event.target
    
    //adicionar ou remover uma class com JS
    itemLi.classList.toggle("selected")

    const itemId = event.target.dataset.id

    //verificar itens selecionados 
    //se sim, pegar itens selecionados 
    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId //resultado boorleano 
        return itemFound
    })

    //se ja estiver selecionado
    if( alreadySelected >= 0 ) {
        //remover da seleção
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })
        selectedItems = filteredItems
    } else {
        //se não tiver selecionado adicionar a seleção 
        selectedItems.push(itemId)
    }

    collectedItems.value = selectedItems
    
}