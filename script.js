let distanciaKM = 0
let precoKM = 6
let taxaSaida = 50
let mapa
let direcoesService
let direcoesRenderer

function iniciarMapa(){
  if(typeof google === "undefined" || !google.maps){
    return
  }

  mapa = new google.maps.Map(document.getElementById("mapa"), {
    zoom: 8,
    center: { lat: -23.2000, lng: -47.2860 }
  })

  direcoesService = new google.maps.DirectionsService()
  direcoesRenderer = new google.maps.DirectionsRenderer()
  direcoesRenderer.setMap(mapa)
}

function usarLocalizacao(){
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(pos){
      let lat = pos.coords.latitude
      let lng = pos.coords.longitude
      document.getElementById("origem").value = lat + "," + lng
    }, function(){
      alert("Não foi possível obter sua localização.")
    })
  }else{
    alert("Seu navegador não suporta geolocalização.")
  }
}

function calcular(){
  let origem = document.getElementById("origem").value
  let destino = document.getElementById("destino").value

  if(origem === "" || destino === ""){
    alert("Preencha origem e destino.")
    return
  }

  if(typeof google === "undefined" || !google.maps){
    alert("A API do Google Maps não foi carregada. Troque SUA_CHAVE_GOOGLE por sua chave real.")
    return
  }

  let service = new google.maps.DistanceMatrixService()

  service.getDistanceMatrix({
    origins:[origem],
    destinations:[destino],
    travelMode:"DRIVING"
  }, function(response,status){
    if(status !== "OK" || !response.rows[0].elements[0].distance){
      document.getElementById("resultado").innerHTML = "Não foi possível calcular a rota. Verifique os endereços."
      return
    }

    let elemento = response.rows[0].elements[0]

    if(elemento.status !== "OK"){
      document.getElementById("resultado").innerHTML = "Não foi possível calcular a rota. Tente um endereço mais completo."
      return
    }

    let distancia = elemento.distance.value
    distanciaKM = distancia / 1000

    let valor = taxaSaida + (distanciaKM * precoKM)
    valor = valor.toFixed(2)

    document.getElementById("resultado").innerHTML =
      "Distância estimada: " + distanciaKM.toFixed(1) + " km<br>Valor estimado: R$ " + valor

    mostrarRota(origem, destino)
  })
}

function mostrarRota(origem, destino){
  if(!direcoesService || !direcoesRenderer){
    return
  }

  direcoesService.route({
    origin: origem,
    destination: destino,
    travelMode: google.maps.TravelMode.DRIVING
  }, function(result, status){
    if(status === "OK"){
      direcoesRenderer.setDirections(result)
    }
  })
}

function enviarWhatsapp(){
  let origem = document.getElementById("origem").value
  let destino = document.getElementById("destino").value

  if(origem === "" || destino === ""){
    alert("Preencha origem e destino antes de enviar.")
    return
  }

  let valor = taxaSaida + (distanciaKM * precoKM)
  valor = valor.toFixed(2)

  let mensagem =
    "Olá, preciso de um guincho.%0A" +
    "Origem: " + origem + "%0A" +
    "Destino: " + destino + "%0A" +
    "Distância estimada: " + distanciaKM.toFixed(1) + " km%0A" +
    "Valor estimado: R$ " + valor + "%0A" +
    "Pode me atender agora?"

  window.open("https://wa.me/5519988604840?text=" + mensagem, "_blank")
}
