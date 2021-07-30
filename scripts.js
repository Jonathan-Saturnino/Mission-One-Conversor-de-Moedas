let botao = document.getElementById("botao")
let select = document.getElementById("select-moedas")


async function converterMoedas() {
    // Essa é uma função assíncrona que busca a cotação das moedas a cada 30 segundos nesse endereço: https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL

    let moedas = await fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL").then(function (RespostaDoServidor) {
        return RespostaDoServidor.json()

    })
    let dolar = moedas.USDBRL.high     //esta pegando a cotação do dolar na alta, use o "console.log (moedas)" abaixo pra mudar o parametro
    let euro = moedas.EURBRL.high


    console.log(dolar)
    console.log(euro)
    console.log(moedas)
    // O comando "console.log (variavel ou evento)" é util pra monitorar se a aplicação esta funcionando como se espera.



    let inputValorEmReais = Number(document.getElementById("input").value) // ESSA TAG NUMBER CONVERTE TODOS OS DADOS DE CARACTERE PRA NUMERO, A variavel "inputValorEmReais" recebe o valor do campo "input" que é onde se digita o valor em reais a ser convertido.
    let inputMoedas = document.getElementById("input-moedas") // esse comando pega o local do campo onde esta o valor em dolares antes de converter, abaixo da moeda americana.
    let textoReal = document.getElementById("texto-real") // esse comando pega o local do campo onde esta o valor em reais antes de converter, abaixo da moeda brasileira.

    if (select.value === "US$ Dólar Americano") {
        let ValorEmDolares = inputValorEmReais / dolar //pega o valor em reais e divide pelo valor corrente do dolar e atribui a variavel dos valor em dolares
        inputMoedas.innerHTML = ValorEmDolares.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) // troca os dados do campo que input moedas pelo valor em dolar ja convertido da variavel ValorEmDolares
    }
    if (select.value === "€ Euro") {
        let ValorEmEuros = inputValorEmReais / euro
        inputMoedas.innerHTML = ValorEmEuros.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })
    }

    textoReal.innerHTML = inputValorEmReais.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) // troca os dados do campo que input real pelo valor em dolar ja convertido da variavel inputValorEmReais

}

// Essa função é responsavel por trocar a bandeira e o nome das moedas
function trocaDeMoeda() {
    let textoMoedas = document.getElementById("texto-moedas")
    let bandeiraMoedas = document.getElementById("bandeira-moedas")

    if (select.value === "US$ Dólar Americano") {
        textoMoedas.innerHTML = "Dólar Americano"
        bandeiraMoedas.src = "./img/Bandeira_EUA.png"

    }
    if (select.value === "€ Euro") {
        textoMoedas.innerHTML = "Euro"
        bandeiraMoedas.src = "./img/Bandeira_Euro.png"

    }
    converterMoedas()
}

//evento que "ouve" o click do botão de converter
botao.addEventListener("click", converterMoedas)
//evento que "ouve" a troca do seletor de moedas
select.addEventListener("change", trocaDeMoeda)

