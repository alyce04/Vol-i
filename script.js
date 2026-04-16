// ==========================================================================
// GESTÃO DE DADOS (Conteúdo Dinâmico)
// ==========================================================================

// 1. Dados para os Cards (Estrelas)
const playersData = [
    { name: 'Giba', title: 'Lenda do Vôlei', description: 'Um dos maiores ponteiros da história. Bicampeão olímpico e tricampeão mundial.', img: 'https://placecats.com/400/400?random=1' },
    { name: 'Sheilla', title: 'Maior Pontuadora', description: 'Oposta histórica da seleção feminina. Bicampeã olímpica.', img: 'https://placecats.com/400/400?random=2' },
    { name: 'Bruninho', title: 'Maestro da Quadra', description: 'Levantador campeão olímpico e mundial, conhecido por sua inteligência e precisão.', img: 'https://placecats.com/400/400?random=3' }
];

// 2. Dados para o Carrossel
const carouselData = [
    { src: 'https://placecats.com/800/450?random=10', alt: 'Momento de celebração', captionTitle: 'Ouro Olímpico', captionDesc: 'A conquista do ouro em 2016.' },
    { src: 'https://placecats.com/800/450?random=11', alt: 'Torcida vibrante', captionTitle: 'Força da Torcida', captionDesc: 'A energia das arquibancadas empurra o time.' },
    { src: 'https://placecats.com/800/450?random=12', alt: 'Lance de defesa', captionTitle: 'Defesa Implacável', captionDesc: 'O líbero se joga para salvar a bola.' }
];

// ==========================================================================
// RENDERIZAÇÃO DINÂMICA (Conectando os dados ao HTML)
// ==========================================================================
function renderPlayers() {
    const container = document.getElementById('players-container');
    if (!container) return;
    container.innerHTML = ''; // Limpa o container
    playersData.forEach(player => {
        const card = document.createElement('article');
        card.className = 'player-card';
        // Preenche o card com os dados do objeto 'player'
        card.innerHTML = `
            <img src="${player.img}" alt="${player.name}" class="player-img">
            <h3>${player.name}</h3>
            <p><strong>${player.title}</strong></p>
            <p>${player.description}</p>
        `;
        container.appendChild(card);
    });
}

// ==========================================================================
// COMPONENTES: CARROSSEL
// ==========================================================================
let currentSlideIndex = 0;
function updateCarousel() {
    const slideContainer = document.getElementById('carousel-slide');
    const dotsContainer = document.getElementById('carousel-dots');
    if (!slideContainer || !dotsContainer) return;

    const item = carouselData[currentSlideIndex];
    // Atualiza o conteúdo do slide
    slideContainer.innerHTML = `
        <img src="${item.src}" alt="${item.alt}">
        <div class="carousel-caption">
            <h3>${item.captionTitle}</h3>
            <p>${item.captionDesc}</p>
        </div>
    `;

    // Atualiza os dots de navegação
    dotsContainer.innerHTML = '';
    carouselData.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = `dot ${index === currentSlideIndex ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Ir para slide ${index + 1}`);
        dot.setAttribute('role', 'tab');
        dot.onclick = () => goToSlide(index);
        dotsContainer.appendChild(dot);
    });
}

function changeSlide(direction) {
    currentSlideIndex = (currentSlideIndex + direction + carouselData.length) % carouselData.length;
    updateCarousel();
}

function goToSlide(index) {
    currentSlideIndex = index;
    updateCarousel();
}

// ==========================================================================
// COMPONENTES: ACORDEÃO
// ==========================================================================
function initAccordion() {
    const headers = document.querySelectorAll('.accordion-header');
    headers.forEach(header => {
        header.addEventListener('click', function() {
            const contentId = this.getAttribute('aria-controls');
            const content = document.getElementById(contentId);
            const isExpanded = this.getAttribute('aria-expanded') === 'true';

            // Alterna o estado do acordeão
            this.setAttribute('aria-expanded', !isExpanded);
            content.hidden = isExpanded; // Se estava expandido, esconde; se estava escondido, mostra
            this.querySelector('.accordion-icon').textContent = isExpanded ? '+' : '−';
        });
    });
}

// ==========================================================================
// ACESSIBILIDADE
// ==========================================================================
let currentFontSize = 100; // 100% é o padrão
function increaseFont() {
    currentFontSize = Math.min(currentFontSize + 10, 150); // Máximo 150%
    document.documentElement.style.fontSize = `${currentFontSize}%`;
}
function decreaseFont() {
    currentFontSize = Math.max(currentFontSize - 10, 80); // Mínimo 80%
    document.documentElement.style.fontSize = `${currentFontSize}%`;
}
function toggleContrast() {
    document.body.classList.toggle('high-contrast');
    // Atualiza o aria-label do botão para dar feedback ao leitor de tela
    const btn = document.querySelector('button[onclick="toggleContrast()"]');
    const isHighContrast = document.body.classList.contains('high-contrast');
    btn.setAttribute('aria-label', isHighContrast ? 'Desativar alto contraste' : 'Alternar alto contraste');
}

// ==========================================================================
// SCROLL REVEAL (Animação de Entrada)
// ==========================================================================
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Pode parar de observar depois que a animação já foi disparada
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 }); // 10% do elemento visível

    revealElements.forEach(el => observer.observe(el));
}

// ==========================================================================
// INICIALIZAÇÃO GERAL (Quando a página carrega)
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    renderPlayers();      // Renderiza os cards
    updateCarousel();     // Renderiza o carrossel
    initAccordion();      // Inicializa a lógica do acordeão
    initScrollReveal();   // Inicializa as animações de entrada

    // Ajusta o aria-label inicial do botão de contraste
    const contrastBtn = document.querySelector('button[onclick="toggleContrast()"]');
    if(contrastBtn) contrastBtn.setAttribute('aria-label', 'Alternar alto contraste');
});
