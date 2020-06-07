fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados").then(function(res) { console.log(res) })

fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados").then(function(res) { console.log(res.json()) })

fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados").then(function(res) { return res.json() }).then( function(data){ console.log(data)})


function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( (res) => { return res.json()})
    //.then( res => res.json() )  forma simplificada do código acima
    .then( states => {
        states.sort( compare );

        
        for ( const state of states ){
            //ufSelect.innerHTML = ufSelect.innerHTML + `<option value="1">Valor</option>`
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        } 
    })
}

function compare( a, b ) {
    if ( a.nome < b.nome ){
      return -1;
    }
    if ( a.nome > b.nome ){
      return 1;
    }
    return 0;
}

populateUFs()


function getCities(event) {
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value> Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json() )
    .then( cities => {
        cities.sort( compare );
        

        for ( const city of cities ){
            //ufSelect.innerHTML = ufSelect.innerHTML + `<option value="1">Valor</option>`
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        } 

        citySelect.disabled = false
    })
}


document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

// itens de coleta
// pegar todos os li's

const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {
    
    const itemLi = event.target
    
    //add or remove a class with js
    itemLi.classList.toggle("selected")
    
    const itemId = itemLi.dataset.id

    // verificar se existem itens selecionados, se sim
    //pegar itens selecionados
    // se já estiver selecionado, tirar da seleçao
    // (js simplificado)
    // const alreadySelected = selectedItems.findIndex( item => item == itemId )

    const alreadySelected = selectedItems.findIndex( function(item) {
        const itemFound = item == itemId //isso será true ou false
        return itemFound
    })

    // se não estiver, adicionar à seleção,
    if( alreadySelected >= 0 ) {
        //tirar da seleção
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId   //false se já estava selec
            return itemIsDifferent
        })
        
        selectedItems = filteredItems
    } else {    
        // se não estiver, adicionar à seleção
        selectedItems.push(itemId)
    }

    // atualizar o campo escondido com os itens selecionados (linha81)
    collectedItems.value = selectedItems

}