<script>
// Array de versículos bíblicos
const dailyVerses = [
    { 
        text: "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.", 
        reference: "João 3:16" 
    },
    { 
        text: "O Senhor é o meu pastor; nada me faltará.", 
        reference: "Salmos 23:1" 
    },
    { 
        text: "Posso todas as coisas naquele que me fortalece.", 
        reference: "Filipenses 4:13" 
    },
    { 
        text: "Confia no Senhor de todo o teu coração e não te estribes no teu próprio entendimento.", 
        reference: "Provérbios 3:5" 
    },
    { 
        text: "Eu sou o caminho, e a verdade, e a vida. Ninguém vem ao Pai senão por mim.", 
        reference: "João 14:6" 
    },
    { 
        text: "Eu sou a ressurreição e a vida; quem crê em mim, ainda que morra, viverá.", 
        reference: "João 11:25" 
    },
    { 
        text: "Entrega o teu caminho ao Senhor; confia nele, e ele o fará.", 
        reference: "Salmos 37:5" 
    }
];

// NOVO CÓDIGO COM VERIFICAÇÃO SEGURA
let currentVerseIndex = 0;

function updateVerse(index) {
    if (index < 0) index = dailyVerses.length - 1;
    if (index >= dailyVerses.length) index = 0;
    
    currentVerseIndex = index;
    const selectedVerse = dailyVerses[currentVerseIndex];
    
    // VERIFICAR SE ELEMENTOS EXISTEM
    const verseText = document.getElementById('daily-verse-text');
    const verseRef = document.getElementById('daily-verse-reference');
    const verseCounter = document.getElementById('verse-counter');
    
    if (verseText) verseText.textContent = selectedVerse.text;
    if (verseRef) verseRef.textContent = selectedVerse.reference;
    if (verseCounter) verseCounter.textContent = `Versículo ${currentVerseIndex + 1} de ${dailyVerses.length}`;
}

function previousVerse() {
    updateVerse(currentVerseIndex - 1);
}

function nextVerse() {
    updateVerse(currentVerseIndex + 1);
}

function updateDailyVerse() {
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
    const verseIndex = dayOfYear % dailyVerses.length;
    
    updateVerse(verseIndex);
    
    // Atualizar data APENAS se elemento existir
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        dateElement.textContent = today.toLocaleDateString('pt-BR', options);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    updateDailyVerse();
    
    // VERIFICAR SE BOTÕES EXISTEM
    const prevBtn = document.getElementById('prev-verse-btn');
    const nextBtn = document.getElementById('next-verse-btn');
    
    if (prevBtn) prevBtn.addEventListener('click', previousVerse);
    if (nextBtn) nextBtn.addEventListener('click', nextVerse);
    
    // Gallery Filter - VERIFICAR SE EXISTEM
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');

                galleryItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Navegação com teclado (setas)
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') previousVerse();
        if (e.key === 'ArrowRight') nextVerse();
    });
});

// Prayer Form - VERIFICAR SE EXISTE
const prayerForm = document.querySelector('.prayer-form');
if (prayerForm) {
    prayerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const request = document.getElementById('prayer-request').value;
        const confidential = document.getElementById('confidential').checked;
        
        const message = `🙏 PEDIDO DE ORAÇÃO\n\nNome: ${name}\nEmail: ${email || 'Não informado'}\nPedido: ${request}\nConfidencial: ${confidential ? 'Sim' : 'Não'}`;
        
        const whatsappUrl = `https://wa.me/5521987860391?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        
        this.reset();
        alert('Pedido enviado! Você será redirecionado para o WhatsApp.');
    });
}

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile menu
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (mobileMenu && navLinks) {
    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}
</script>
