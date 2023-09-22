
var conteudo =  document.getElementById("jogo")

var btn = document.createElement("button")

var text = document.createElement("p")
var input = document.createElement("input")
var mostraVidas = document.createElement("p")
var espaço = document.createElement("br")
var textVidas = document.createElement("p")

var textHistorico = document.createElement("p")

var NumeroSecreto
var maiorNumero
var menorNumero
var vidas = 0

var estage = "defalt"

var historico = []

input.type = "number"
input.required = "required"
input.focus()


text.innerText = "Jogo Descobrir Número Secreto"

btn.innerText = "Começar"

conteudo.appendChild(text)
conteudo.appendChild(textVidas)


btn.addEventListener("click", function(){

   
    if(estage === "defalt"){

        tema(defalt)

        for(i=0; i < historico.length; i++){

            historico.pop()
        }
        
        textHistorico.innerText = ""     

        estage = defalt()

    }
    else if(estage === "maior"){
        
        estage = maior()
        input.value = ''

    }
    else if(estage === "menor"){

        estage = menor()
        input.value = ''

    }
    else if(estage === "vidas"){
        
        estage = vidasDefine()
        input.value = ''

        NumeroSecreto = gerarNumeroSecreto(maiorNumero, menorNumero)


    }
    else if(estage === "verifica"){

        textVidas.innerText = "Vidas "+ vidas
        input.placeholder = "Jogar"

        if(input.value != Number(NumeroSecreto) && input.value != '' && vidas > 0){
            
            estage = chances(input.value)

            historico.push({"numero": Number(input.value), "proximidade": quenteFrio(input.value)})
           
            a = document.createTextNode(" "+historico[historico.length -1].numero+" - "+ historico[historico.length -1].proximidade +" ")
            textHistorico.append(a)
            
            
            input.value = ''
            
        }
        else if(Number(vidas) <= 0 && input.value != Number(NumeroSecreto)){
            conteudo.removeChild(input)

            historico.push({"numero": Number(input.value), "proximidade": quenteFrio(input.value)})

            a = document.createTextNode(" "+historico[historico.length -1].numero+" - "+ historico[historico.length -1].proximidade +" ")
            textHistorico.append(a)

            tema("gameOver")
            text.innerHTML = "<p> <h1>Game Over </h1>" +
                     "<br> Você perdeu o número era " + NumeroSecreto + " </p>"
            estage = "defalt"
            btn.innerText = "Novo Jogo"
            input.value = ''
        }
        else if(input.value === ''){
            text.innerText = "Insira Um número"
        }
        else{

            tema("win")
            conteudo.removeChild(input)
            text.innerHTML = "<p><h1> Congratulations HEHEHE</h1> " +
                     "<br> Você descobriu o número era " + NumeroSecreto + " </p>"
            estage = "defalt"
            btn.innerText = "Novo Jogo"
            input.value = ''
        }

    }
})


conteudo.appendChild(btn)
conteudo.appendChild(textHistorico)
textHistorico.classList.add("historico")




function defalt(){

    btn.innerText = "Next"
    text.innerHTML = "<p> Digite número maior e em seguinda o número menor " +
                     "<br> Os números definirão a variação onde o número secreto sera gerado </p>"

    conteudo.appendChild(input)
    conteudo.appendChild(espaço)
    conteudo.appendChild(btn)

    input.placeholder = "Número Maior"

    return "maior"

}

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

function contarVidas(vida){
    vidas = vidas - vida
    return vidas
}

function gerarNumeroSecreto(maiorNumero, menorNumero){

    var min = Math.ceil(Number(menorNumero))
    var max = Math.floor(Number(maiorNumero))

    return Math.floor(Math.random() * (max - min + 1) + min)

}

function chances(inp){

   

    play = quenteFrio(inp)
    if(inp > Number(maiorNumero) || inp < Number(menorNumero)){
        text.innerText = "Número Invalido!"
        return "verifica"
    }else{
        if(play === "FRIO"){
            btn.placeholder = "Tente Outra Vez"
            vidas = contarVidas(1)
            text.innerHTML = "<p>Tá Longe</p><h1>Frio</h1>"
            return "verifica"
        }else{
            btn.placeholder = "Tente Outra Vez"
            vidas = contarVidas(1)
            text.innerHTML = "<p>Tá Perto</p><h1>Quente</h1> "
            return "verifica"
        }
    }

}

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
 function quente(){
    document.body.style.backgroundColor = "red"
    document.body.style.color = "#fff"
 }

function frio(){
    document.body.style.backgroundColor = "blue"
    document.body.style.color = "#fff"
}
    
function tema(statusTema){

    if(statusTema === "defalt"){
        document.body.style.backgroundColor = "#fff"
        document.body.style.color = "#000"
    }
    else if (statusTema === "gameOver"){

        document.body.style.backgroundColor = "#000"
        document.body.style.color = "#fff"

    }else if (statusTema === "win"){

            document.body.style.backgroundColor = "yellow"
            document.body.style.color = "#ccc"

    }else{

        document.body.style.backgroundColor = "#fff"
        document.body.style.color = "#000"
    }

}
       
    


