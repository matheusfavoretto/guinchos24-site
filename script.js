let distanciaKM = 0
let precoKM = 6
let taxaSaida = 50

function usarLocalizacao(){

if(navigator.geolocation){

navigator.geolocation.getCurrentPosition(function(pos){

let lat = pos.coords.latitude
let lng = pos.coords.longitude

document.getElementById("origem").value = lat + "," + lng

})

}

}

function calcular(){

let origem = document.getElementById("origem").value
let destino = document.getElementById("destino").value

if(origem == "" || destino == ""){
alert("Preencha os locais")
return
}

let service = new google.maps.DistanceMatrixService()

service.getDistanceMatrix({

origins:[origem],
destinations:[destino],
travelMode:"DRIVING"

}, function(response,status){

let distancia = response.rows[0].elements[0].distance.value

distanciaKM = distancia / 1000

let valor = taxaSaida + (distanciaKM * precoKM)

valor = valor.toFixed(2)

document.getElementById("resultado").innerHTML =
"Distância: "+distanciaKM.toFixed(1)+" km <br> Valor estimado: R$ "+valor

})

}

function enviarWhatsapp(){

let origem = document.getElementById("origem").value
let destino = document.getElementById("destino").value

let valor = taxaSaida + (distanciaKM * precoKM)

valor = valor.toFixed(2)

let mensagem =
"Olá, preciso de um guincho.%0A"+
"Local: "+origem+"%0A"+
"Destino: "+destino+"%0A"+
"Distância: "+distanciaKM.toFixed(1)+" km%0A"+
"Valor estimado: R$ "+valor

window.open("https://wa.me/5519988604840?text="+mensagem)
}
