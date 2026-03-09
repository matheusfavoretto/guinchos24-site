const whatsappNumber = '5519988604840';

const brinquedos = [
  { nome: 'Pula-Pula Médio', preco: 180, icone: '🎠', categoria: 'Infláveis', descricao: 'Ideal para aniversários menores e festas em casa.' },
  { nome: 'Pula-Pula Grande', preco: 250, icone: '🎉', categoria: 'Infláveis', descricao: 'Mais espaço para as crianças se divertirem com segurança.' },
  { nome: 'Piscina de Bolinhas', preco: 160, icone: '🟡', categoria: 'Infantil', descricao: 'Clássico infantil para entreter os pequenos durante a festa.' },
  { nome: 'Tobogã Inflável', preco: 320, icone: '🛝', categoria: 'Infláveis', descricao: 'Diversão radical e visual incrível para festas animadas.' },
  { nome: 'Cama Elástica', preco: 220, icone: '🤸', categoria: 'Infláveis', descricao: 'Uma das atrações favoritas em festas infantis.' },
  { nome: 'Castelo Inflável', preco: 280, icone: '🏰', categoria: 'Infláveis', descricao: 'Brinquedo colorido e chamativo para várias idades.' },
  { nome: 'Futebol de Sabão', preco: 450, icone: '⚽', categoria: 'Especiais', descricao: 'Perfeito para festas grandes e eventos super divertidos.' },
  { nome: 'Pebolim', preco: 140, icone: '🎮', categoria: 'Jogos', descricao: 'Ótima opção para crianças maiores e adultos.' },
  { nome: 'Air Game', preco: 170, icone: '🏒', categoria: 'Jogos', descricao: 'Jogo competitivo que faz sucesso em qualquer festa.' },
  { nome: 'Mesa de Ping Pong', preco: 150, icone: '🏓', categoria: 'Jogos', descricao: 'Diversão garantida para crianças e convidados.' },
  { nome: 'Tombo Legal', preco: 210, icone: '😄', categoria: 'Especiais', descricao: 'Brinquedo recreativo divertido e diferente para animar o evento.' },
  { nome: 'Kid Play', preco: 390, icone: '🧸', categoria: 'Infantil', descricao: 'Estrutura completa para festas infantis maiores.' },
  { nome: 'Cavalinho Pula-Pula', preco: 120, icone: '🐴', categoria: 'Infantil', descricao: 'Ótimo para crianças pequenas e área kids.' },
  { nome: 'Escorregador Infantil', preco: 135, icone: '🌈', categoria: 'Infantil', descricao: 'Ideal para festas em casa e espaços menores.' },
  { nome: 'Circuito Inflável', preco: 520, icone: '🚀', categoria: 'Infláveis', descricao: 'Atração maior para festas com bastante movimento.' },
  { nome: 'Cama Elástica Premium', preco: 300, icone: '💥', categoria: 'Infláveis', descricao: 'Versão maior para eventos com mais crianças.' },
  { nome: 'Mesa de Totó Infantil', preco: 130, icone: '🕹️', categoria: 'Jogos', descricao: 'Diversão simples e rápida para complementar a festa.' },
  { nome: 'Basquete Eletrônico', preco: 195, icone: '🏀', categoria: 'Jogos', descricao: 'Excelente opção para festas com brincadeiras competitivas.' },
  { nome: 'Centopeia Inflável', preco: 340, icone: '🐛', categoria: 'Infláveis', descricao: 'Brinquedo visual e divertido para atrair as crianças.' },
  { nome: 'Área Baby Play', preco: 260, icone: '👶', categoria: 'Infantil', descricao: 'Espaço pensado para crianças menores com segurança.' }
];

const cardsContainer = document.getElementById('cardsContainer');
const brinquedoSelect = document.getElementById('brinquedo');
const retiradaInput = document.getElementById('retirada');
const devolucaoInput = document.getElementById('devolucao');
const resumoReserva = document.getElementById('resumoReserva');
const form = document.getElementById('reservaForm');
const buscaInput = document.getElementById('busca');

function formatMoney(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function diffDays(start, end) {
  const ms = end.getTime() - start.getTime();
  return Math.ceil(ms / (1000 * 60 * 60 * 24));
}

function renderCards(lista = brinquedos) {
  if (!lista.length) {
    cardsContainer.innerHTML = `
      <article class="card">
        <div class="card-top">
          <div class="card-icon">🔎</div>
          <h4>Nenhum brinquedo encontrado</h4>
          <p>Tente buscar por outro nome ou categoria.</p>
        </div>
      </article>
    `;
    return;
  }

  cardsContainer.innerHTML = lista.map((item) => {
    const indexOriginal = brinquedos.findIndex((b) => b.nome === item.nome);
    return `
      <article class="card">
        <div class="card-top">
          <div class="card-icon">${item.icone}</div>
          <span class="badge-mini">${item.categoria}</span>
          <h4>${item.nome}</h4>
          <p>${item.descricao}</p>
        </div>
        <div class="card-bottom">
          <div class="price-line">
            <strong>${formatMoney(item.preco)}</strong>
            <small>Até 2 dias</small>
          </div>
          <button class="primary-btn" type="button" onclick="selecionarBrinquedo(${indexOriginal})">Escolher</button>
        </div>
      </article>
    `;
  }).join('');
}

function preencherSelect() {
  brinquedos.forEach((item, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = `${item.nome} - ${formatMoney(item.preco)}`;
    brinquedoSelect.appendChild(option);
  });
}

window.selecionarBrinquedo = function(index) {
  brinquedoSelect.value = index;
  document.getElementById('reserva').scrollIntoView({ behavior: 'smooth' });
  atualizarResumo();
};

function atualizarResumo() {
  const brinquedoIndex = brinquedoSelect.value;
  const retirada = retiradaInput.value;
  const devolucao = devolucaoInput.value;

  if (brinquedoIndex === '' || !retirada || !devolucao) {
    resumoReserva.innerHTML = `
      <h4>Resumo do pedido</h4>
      <p>Selecione um brinquedo e informe as datas para calcular os valores.</p>
    `;
    return;
  }

  const item = brinquedos[brinquedoIndex];
  const start = new Date(`${retirada}T12:00:00`);
  const end = new Date(`${devolucao}T12:00:00`);

  if (end < start) {
    resumoReserva.innerHTML = `
      <h4>Resumo do pedido</h4>
      <p>A data de devolução não pode ser antes da retirada.</p>
    `;
    return;
  }

  const dias = diffDays(start, end) + 1;
  const valorBase = item.preco;
  const diasExtras = Math.max(0, dias - 2);
  const taxaExtra = diasExtras * (valorBase * 0.10);
  const total = valorBase + taxaExtra;
  const reserva = total * 0.40;
  const restante = total * 0.60;

  resumoReserva.innerHTML = `
    <h4>Resumo do pedido</h4>
    <div class="resumo-list">
      <div class="resumo-line"><span>Brinquedo</span><strong>${item.nome}</strong></div>
      <div class="resumo-line"><span>Categoria</span><strong>${item.categoria}</strong></div>
      <div class="resumo-line"><span>Período</span><strong>${dias} dia(s)</strong></div>
      <div class="resumo-line"><span>Valor base</span><strong>${formatMoney(valorBase)}</strong></div>
      <div class="resumo-line"><span>Dias extras</span><strong>${diasExtras}</strong></div>
      <div class="resumo-line"><span>Taxa extra</span><strong>${formatMoney(taxaExtra)}</strong></div>
      <div class="resumo-line resumo-total"><span>40% na reserva</span><strong>${formatMoney(reserva)}</strong></div>
      <div class="resumo-line"><span>60% na devolução</span><strong>${formatMoney(restante)}</strong></div>
      <div class="resumo-line resumo-total"><span>Total</span><strong>${formatMoney(total)}</strong></div>
    </div>
  `;
}

brinquedoSelect.addEventListener('change', atualizarResumo);
retiradaInput.addEventListener('change', atualizarResumo);
devolucaoInput.addEventListener('change', atualizarResumo);

buscaInput.addEventListener('input', () => {
  const termo = buscaInput.value.trim().toLowerCase();
  const filtrados = brinquedos.filter((item) =>
    item.nome.toLowerCase().includes(termo) ||
    item.categoria.toLowerCase().includes(termo) ||
    item.descricao.toLowerCase().includes(termo)
  );
  renderCards(filtrados);
});

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const telefone = document.getElementById('telefone').value.trim();
  const brinquedoIndex = brinquedoSelect.value;
  const retirada = retiradaInput.value;
  const devolucao = devolucaoInput.value;
  const observacoes = document.getElementById('mensagem').value.trim();

  if (!nome || !telefone || brinquedoIndex === '' || !retirada || !devolucao) {
    alert('Preencha todos os campos obrigatórios.');
    return;
  }

  const item = brinquedos[brinquedoIndex];
  const start = new Date(`${retirada}T12:00:00`);
  const end = new Date(`${devolucao}T12:00:00`);

  if (end < start) {
    alert('A data de devolução não pode ser antes da retirada.');
    return;
  }

  const dias = diffDays(start, end) + 1;
  const diasExtras = Math.max(0, dias - 2);
  const taxaExtra = diasExtras * (item.preco * 0.10);
  const total = item.preco + taxaExtra;
  const reserva = total * 0.40;
  const restante = total * 0.60;

  const mensagem = `Olá! Quero alugar um brinquedo para festa infantil.%0A%0A` +
    `👤 Nome: ${encodeURIComponent(nome)}%0A` +
    `📞 Telefone: ${encodeURIComponent(telefone)}%0A` +
    `🎈 Brinquedo: ${encodeURIComponent(item.nome)}%0A` +
    `🧩 Categoria: ${encodeURIComponent(item.categoria)}%0A` +
    `📅 Retirada: ${encodeURIComponent(retirada)}%0A` +
    `📆 Devolução: ${encodeURIComponent(devolucao)}%0A` +
    `🗓️ Período total: ${encodeURIComponent(`${dias} dia(s)`)}%0A` +
    `💰 Valor base: ${encodeURIComponent(formatMoney(item.preco))}%0A` +
    `➕ Dias extras: ${encodeURIComponent(String(diasExtras))}%0A` +
    `⚠️ Taxa extra: ${encodeURIComponent(formatMoney(taxaExtra))}%0A` +
    `💳 40% na reserva: ${encodeURIComponent(formatMoney(reserva))}%0A` +
    `📦 60% na devolução: ${encodeURIComponent(formatMoney(restante))}%0A` +
    `✅ Total do aluguel: ${encodeURIComponent(formatMoney(total))}%0A` +
    `📝 Observações: ${encodeURIComponent(observacoes || 'Sem observações')}`;

  window.open(`https://wa.me/${whatsappNumber}?text=${mensagem}`, '_blank');
});

const hoje = new Date().toISOString().split('T')[0];
retiradaInput.min = hoje;
devolucaoInput.min = hoje;
retiradaInput.addEventListener('change', () => {
  devolucaoInput.min = retiradaInput.value;
});

renderCards();
preencherSelect();
