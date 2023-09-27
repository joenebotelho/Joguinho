

// Variaveis 

var conteudo =  document.getElementById("jogo")

var btn = document.createElement("button")
var reset = document.createElement("button")

var text = document.createElement("p")
var input = document.createElement("input")
var mostraVidas = document.createElement("p")
var espaco = document.createElement("br")
var textVidas = document.createElement("p")

var textHistorico = document.createElement("p")

var NumeroSecreto
var maiorNumero
var menorNumero
var vidas = 0

var estage = "defalt"

var historico = []




// --------------------

// Define Campo de entrada de dados o INPUT

input.type = "number"
input.required = "required"

input.autofocus = true


// Define Texto Inicial de apresentação do Jogo

text.innerText = "Jogo Descobrir Número Secreto"

// Define Botão de ação do jogo

btn.innerText = "Começar"


// Adiciona conteudo ao div id "jogo"

conteudo.appendChild(text)
conteudo.appendChild(textVidas)

input.onkeydown = (event)=>{

    let key = event.key
    if(key === "Enter"){
        
        gameplay()

    }else if(key === "Enter" && reset.autofocus === true){

    }
}
// função de ação do botão

btn.addEventListener("click", ()=>{
    gameplay()
})

function gameplay(){

    // estado inicial
   
    if(estage === "defalt"){

        tema(defalt)

        textVidas.textContent = ''

        for(i=0; i < historico.length; i++){

            historico.pop()
        }
        
       
        textHistorico.innerText = "" 

        if(historico.length === 0){
            estage = defalt()
        }

        input.value = ''

        estage = defalt()

    }

    // estado de definição do numero maior

    else if(estage === "maior"){
        
        estage = maior()
        input.value = ''

    }

    // estado de definição do numero menor

    else if(estage === "menor"){

        estage = menor()
        input.value = ''

    }

    // estado de definição do numero de vidas as tentativas

    else if(estage === "vidas"){
        
        estage = vidasDefine()
        input.value = ''

        NumeroSecreto = gerarNumeroSecreto(maiorNumero, menorNumero)


    }

    // estado de definição das tentativas 

    else if(estage === "verifica"){


        // mostra quantidade de vidas

        textVidas.innerText = "Vidas " + vidas

        // texto de exibição input das tentativas 

        input.placeholder = "Jogar"

        //adiciona variaveis nesse local por algum motivo não funciona na global elas não funciona como esperado

        var esp = document.createElement("br")

        // chance defalt ou seja que se repete ao erra o numero secreto

        if(input.value != Number(NumeroSecreto) && input.value != '' && vidas > 0){
            
            estage = chances(input.value)

            historico.push({"numero": Number(input.value), "proximidade": quenteFrio(input.value)})
           

            historico.forEach(arr=>{
                item = document.createElement("span")
                item.textContent = " "+arr.numero+" - "+ arr.proximidade +" "
            });
        
            textHistorico.appendChild(item)
            textHistorico.appendChild(esp)
                        
            

            input.value = ''

          
        }

        // aqui e quando a vida acaba para o game over  

        else if(Number(vidas) >= 0 && input.value != Number(NumeroSecreto) && input.value != ''){
            
            conteudo.removeChild(input)
            conteudo.removeChild(btn)

            textHistorico.innerText = input.value
            

            tema("gameOver")
            text.innerHTML = "<p> <h1>Game Over </h1>" +
                     "<br> Você perdeu o número era " + NumeroSecreto + " </p>"
            estage = "defalt"

            reset.autofocus = true
            
            input.value = ''
            
           
        }

        // caso não insira nenhum numero 

        else if(input.value === ''){
            text.innerText = "Insira Um número"

            input.value = ''
        }

        // caso acerte o numero e vence o jogo 

        else{

            tema("win")
            conteudo.removeChild(input)
            conteudo.removeChild(btn)

            text.innerHTML = "<p><h1> Congratulations HEHEHE</h1> " +
                     "<br> Você descobriu o número era " + NumeroSecreto + " </p>"
            estage = "defalt"
            
            
            reset.autofocus = true


            textHistorico.innerText = input.value
            
            input.value = ''

            
        }
        
        input.value = ''

    }
}


// botão reset function

reset.innerText = "Reiniciar"
reset.classList.add("reset")


reset.addEventListener('click', ()=>{
    location.reload()
})



// adiciona o botão de ação ao HTML

conteudo.appendChild(btn)
conteudo.appendChild(textHistorico)


// adiciona classe para estilização do texto do vetor 

textHistorico.classList.add("historico")


// função de inicio do jogo

function defalt(){


    btn.innerText = "Next"
    text.innerHTML = "<p> Digite número maior e em seguinda o número menor " +
                     "<br> Os números definirão a variação onde o número secreto sera gerado </p>"

    conteudo.appendChild(input)
    conteudo.appendChild(espaco)
    conteudo.appendChild(btn)

    conteudo.appendChild(reset)

    input.placeholder = "Número Maior"

    return "maior"

}

// função do Numero Maior a ser definido pelo INPUT


function maior(){

    
    if(input.value !='' && input.value > 2){
        text.innerHTML = "<p> Agora o menor número " +
                     "<br> Os números definirão a variação onde o número secreto sera gerado </p>"
        maiorNumero = input.value
        input.placeholder = "Numero Menor"
       
        return "menor"
    }
    else if(input.value === ''){
        text.innerText = "Insira Um número"
        input.placeholder = "Número Maior"

        return "maior"
    }
    else{
        text.innerText = "Número invalido! tente outra vez"
        input.placeholder = "Número Maior"
       
        return "maior"
    }

}

// função do Numero Menor a ser definido pelo INPUT

function menor(){
    
    if(input.value !='' && input.value > 0 && input.value < Number(maiorNumero) ){
        menorNumero = input.value
        
        text.innerHTML = "<p> Digite a quantidade de Vidas " +
        "<br> Isso definira a quantidade de tentativas no jogo </p>"
        
        input.placeholder = "Quantidade de vidas"
       
        return "vidas"
    }
    else if(input.value === ''){
        text.innerText = "Insira Um número"
        input.placeholder = "Número Menor"
      
        return "menor"
    }
    else{
        text.innerText = "Número invalido! tente outra vez"
        input.placeholder = "Número Menor"
      
        return "menor"
    }
}

// função do Numero de Vidas a ser definido pelo INPUT

function vidasDefine(){
    
    if(input.value !='' && input.value > 0){
        vidas = input.value
        input.placeholder = "Primeira Tentativa"
        vidas = contarVidas(1)
        btn.innerText = "Verifica"
      
        return "verifica"
        
    }else{
        text.innerText = "Número de Vidas Invalido! tente outra vez"
        input.placeholder = "Quantidade de vidas"
      
        return "vidas"
    }

}

// função para contar vidas

function contarVidas(vida){
    vidas = vidas - vida
    return vidas
}

// função para gerar numero aleatorio definidos pelos valores maior e menor 
// obetidos pelas função Maior e Menor
// define variavel numero secreto aleatoria entre os 2 valores


function gerarNumeroSecreto(maiorNumero, menorNumero){

    var min = Math.ceil(Number(menorNumero))
    var max = Math.floor(Number(maiorNumero))

    return Math.floor(Math.random() * (max - min + 1) + min)

}

// função de game player que define as ações de descobrir o numero secreto
// retorna se ta frio ou querte 
// conta as vidas perdidas 

function chances(inp){

    play = quenteFrio(inp)
    if(inp > Number(maiorNumero) || inp < Number(menorNumero)){
        text.innerText = "Número Invalido!"
        return "verifica"
    }else{
        if(play === "FRIO"){
            input.placeholder = "Tente Outra Vez"
            vidas = contarVidas(1)
            text.innerHTML = "<p>Tá Longe</p><h1>Frio</h1>"
            return "verifica"
        }else{
            input.placeholder = "Tente Outra Vez"
            vidas = contarVidas(1)
            text.innerHTML = "<p>Tá Perto</p><h1>Quente</h1> "
            return "verifica"
        }
    }

}

// função que define se esta perto ou lonje do numero secreto 
// define se um numero esta frio ou quete 
// seta decordo com a procimidade do numero


function quenteFrio(valor){

    if(valor > NumeroSecreto){
        saida = valor - NumeroSecreto
        if(saida < 2){
            quente()
            return 'QUENTE'
        }else{
            frio()
            return 'FRIO'
        }
        
    }else{
        saida = NumeroSecreto - valor
        if(saida < 2){
            quente()
            return 'QUENTE'
        }else{
            frio()
            return 'FRIO'
        }
    }

}

// função de tema quente 

function quente(){
    document.body.style.backgroundColor = "red"
    document.body.style.color = "#fff"
 }

 // função de tema frio

function frio(){
    document.body.style.backgroundColor = "blue"
    document.body.style.color = "#fff"
}

// função de temas variados 
    
function tema(statusTema){

    // tema defalt padrão

    if(statusTema === "defalt"){
        document.body.style.backgroundColor = "#fff"
        document.body.style.color = "#000"
    }

    // tema game over 

    else if (statusTema === "gameOver"){

        document.body.style.backgroundColor = "#000"
        document.body.style.color = "#fff"
    }
    
    // tema venceu

    else if (statusTema === "win"){

            document.body.style.backgroundColor = "yellow"
            document.body.style.color = "#000"
    }
    // redefine tema padrão caso não seja referenciado nenhum
    else{

        document.body.style.backgroundColor = "#fff"
        document.body.style.color = "#000"
    }

}
       
    


