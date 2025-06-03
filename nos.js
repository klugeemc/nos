let indice = 0;
const slides = document.querySelectorAll(".slide");

function mostrarSlide(i) {
  slides.forEach((slide) => slide.classList.remove("ativo"));
  slides[i].classList.add("ativo");
}

function mudarSlide(direcao) {
  indice = (indice + direcao + slides.length) % slides.length;
  mostrarSlide(indice);
}

function tempoDesde(dataInicialStr, elementoId) {
  const dataInicial = new Date(dataInicialStr);

  function atualizar() {
    const agora = new Date();
    let diferenca = agora - dataInicial;

    if (diferenca < 0) {
      document.getElementById(elementoId).textContent = "A data ainda não chegou!";
      return;
    }

    const segundo = 1000;
    const minuto = segundo * 60;
    const hora = minuto * 60;
    const dia = hora * 24;
    const mes = dia * 30.44; // Aproximação
    const ano = dia * 365.25;

    const anos = Math.floor(diferenca / ano);
    diferenca %= ano;

    const meses = Math.floor(diferenca / mes);
    diferenca %= mes;

    const dias = Math.floor(diferenca / dia);
    diferenca %= dia;

    const horas = Math.floor(diferenca / hora);
    diferenca %= hora;

    const minutos = Math.floor(diferenca / minuto);
    diferenca %= minuto;

    const segundos = Math.floor(diferenca / segundo);

    document.getElementById(elementoId).textContent =
      `${anos} anos, ${meses} meses, ${dias} dias, ${horas}h ${minutos}min ${segundos}s`;
  }
 
  setInterval(atualizar, 1000);
  atualizar();
}
 tempoDesde("2022-10-31T13:00:00", "tempo2");
 tempoDesde("2022-12-31T17:00:00", "tempo1");
 document.getElementById('botaoInicio').addEventListener('click', function() {
    document.getElementById('capa').classList.add('hidden');
    document.querySelector('.conteudo-principal').classList.remove('hidden');
    criarConfete();
});

// 2. Motivos de Amor
const motivos = [
    "Porque tu tem o melhor abraço do mundo",
    "Porque tu me faz ser uma pessoa melhor",
    "Porque tu é a melhor pessoa q eu já conheci",
   "Porque tu é lindo di bonito",
   "Porque tu me mima muito (mesmo eu não querendo)",
   "Porque tu cuida de mim",
   "Porque tu simplesmente é tu",
   "Porque tu é incrivel com todo mundo",
   "Porque tu beija gostosinho",
   "Só aceita que eu te amo fedorento"
];

// Variável para controlar o motivo atual
let motivoIndex = 0;

// Função para mostrar o próximo motivo
function mostrarProximoMotivo() {
    const elementoMotivo = document.getElementById('motivoAtual');
    
    // Efeito de fade out
    elementoMotivo.style.opacity = '0';
    
    setTimeout(() => {
        // Atualiza o texto
        elementoMotivo.textContent = motivos[motivoIndex];
        
        // Avança para o próximo motivo (ou volta ao primeiro)
        motivoIndex = (motivoIndex + 1) % motivos.length;
        
        // Efeito de fade in
        elementoMotivo.style.opacity = '1';
    }, 500);
}

// Evento do botão
document.getElementById('botaoMotivo').addEventListener('click', mostrarProximoMotivo);

// Mostra o primeiro motivo ao carregar a página
window.addEventListener('load', function() {
    mostrarProximoMotivo();
});
// 3. Mapa de Lugares Especiais
function iniciarMapa() {
    const mapa = L.map('mapa').setView([-29.711185689356896, -53.71712859451384], 13); // Coordenadas de exemplo (São Paulo)
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);

    // Adicione marcadores para lugares especiais
    L.marker([-29.711185689356896, -53.71712859451384]).addTo(mapa)
        .bindPopup('Onde nos conhecemos <3')
        .openPopup();
}

// 4. Jogo dos Corações
let pontuacao = 0;

function criarCoracao() {
    const coracao = document.createElement('div');
    coracao.className = 'coracao';
    coracao.innerHTML = '❤️';
    coracao.style.left = Math.random() * 95 + '%';
    coracao.style.top = Math.random() * 95 + '%';
    coracao.style.fontSize = (30 + Math.random() * 20) + 'px';
    
    coracao.addEventListener('click', function() {
        pontuacao++;
        document.getElementById('pontuacao').textContent = pontuacao;
        coracao.remove();
    });
    
    document.getElementById('areaJogo').appendChild(coracao);
    
    setTimeout(() => {
        if (coracao.parentNode) coracao.remove();
    }, 2000);
}

setInterval(criarCoracao, 800);

// 5. Efeito de Confete
function criarConfete() {
    const cores = ['#ff6b6b', '#ffa3a3', '#ffd166', '#06d6a0', '#118ab2'];
    for (let i = 0; i < 100; i++) {
        const confete = document.createElement('div');
        confete.style.position = 'fixed';
        confete.style.width = '10px';
        confete.style.height = '10px';
        confete.style.backgroundColor = cores[Math.floor(Math.random() * cores.length)];
        confete.style.left = Math.random() * 100 + 'vw';
        confete.style.top = '-10px';
        confete.style.borderRadius = '50%';
        document.body.appendChild(confete);
        
        const animacao = confete.animate([
            { top: '-10px', opacity: 1 },
            { top: '100vh', opacity: 0 }
        ], {
            duration: 2000 + Math.random() * 3000,
            easing: 'cubic-bezier(0.1, 0.8, 0.9, 1)'
        });
        
        animacao.onfinish = () => confete.remove();
    }
}

// Iniciar mapa quando a página carregar
window.onload = iniciarMapa;