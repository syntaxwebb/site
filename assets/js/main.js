
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initCurrentYear();
    initFormValidation();
    initProjectModals();
    initSmoothScroll();
    initFloatingButtons();
    initSocialCards();
    initCarousel();
});

function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
        
        document.addEventListener('click', function(event) {
            if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }
}

function initCurrentYear() {
    const yearElements = document.querySelectorAll('#current-year');
    const currentYear = new Date().getFullYear();
    
    yearElements.forEach(element => {
        element.textContent = currentYear;
    });
}

function initFormValidation() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                simulateFormSubmission();
            }
        });
        
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearError(this);
            });
        });
    }
}

function validateForm() {
    const form = document.getElementById('contact-form');
    const inputs = form.querySelectorAll('input, textarea');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.getAttribute('name');
    const errorElement = document.getElementById(`${fieldName}-error`);
    
    clearError(field);
    
    if (!value) {
        showError(field, errorElement, 'Este campo é obrigatório.');
        return false;
    }
    
    switch(fieldName) {
        case 'email':
            if (!isValidEmail(value)) {
                showError(field, errorElement, 'Por favor, insira um e-mail válido.');
                return false;
            }
            break;
        case 'name':
            if (value.length < 2) {
                showError(field, errorElement, 'O nome deve ter pelo menos 2 caracteres.');
                return false;
            }
            break;
        case 'subject':
            if (value.length < 5) {
                showError(field, errorElement, 'O assunto deve ter pelo menos 5 caracteres.');
                return false;
            }
            break;
        case 'message':
            if (value.length < 10) {
                showError(field, errorElement, 'A mensagem deve ter pelo menos 10 caracteres.');
                return false;
            }
            break;
    }
    
    return true;
}

function showError(field, errorElement, message) {
    field.style.borderColor = '#EF4444';
    if (errorElement) {
        errorElement.textContent = message;
    }
}

function clearError(field) {
    field.style.borderColor = '#D1D5DB';
    const fieldName = field.getAttribute('name');
    const errorElement = document.getElementById(`${fieldName}-error`);
    if (errorElement) {
        errorElement.textContent = '';
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function simulateFormSubmission() {
    const form = document.getElementById('contact-form');
    const successMessage = document.getElementById('form-success');
    
    setTimeout(function() {
        form.style.display = 'none';
        successMessage.style.display = 'block';
        successMessage.scrollIntoView({ behavior: 'smooth' });
    }, 1000);
}


function initProjectModals() {
    const modal = document.getElementById('project-modal');
    const modalClose = document.querySelector('.modal-close');
    const detailButtons = document.querySelectorAll('[data-project]');
    
    if (modal && modalClose) {
        modalClose.addEventListener('click', function() {
            closeModal(modal);
        });
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.style.display === 'flex') {
                closeModal(modal);
            }
        });
        
        detailButtons.forEach(button => {
            button.addEventListener('click', function() {
                const projectId = this.getAttribute('data-project');
                openProjectModal(modal, projectId);
            });
        });
    }
}

const projects = {
    1: {
        title: 'PAPO COM INGLÊS',
        description: 'Plataforma educacional completa para ensino de inglês',
        fullDescription: 'Desenvolvemos uma plataforma educacional completa para a escola de idiomas Papo com Inglês, incluindo área do aluno personalizada, sistema de agendamento de aulas, materiais interativos e painel administrativo.',
        features: [
            'Área do aluno personalizada',
            'Sistema de agendamento de aulas',
            'Materiais interativos',
            'Integração com ferramentas de ensino'
        ],
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'MySQL'],
        liveUrl: 'https://papocomingles.github.io/site'
    },

    2: {
        title: 'A.K.A.S.A.D.O.K',
        description: 'Portfólio visual profissional',
        fullDescription: 'Criamos um portfólio artístico imersivo para o artista A.K.A.S.A.D.O.K, com galeria interativa, biografia, cronologia da carreira e integração com redes sociais.',
        features: [
            'Galeria de obras interativa',
            'Biografia detalhada',
            'Linha do tempo da carreira',
            'Integração com redes sociais',
            'Formulário para comissionamentos'
        ],
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'Grid Layout', 'Flexbox'],
        liveUrl: 'https://akasadokk.github.io/site'
    },

    3: {
        title: 'SO TRICK DE RESPEITO',
        description: 'Plataforma moderna voltada à cultura do skate.',
        fullDescription: 'Desenvolvemos um site completo para a marca So Trick de Respeito, com área de lançamentos, galeria de produtos, vitrine promocional e destaque para a identidade da cultura skate.',
        features: [
            'Vitrine de produtos',
            'Galeria de fotos e vídeos',
            'Sessão de lançamentos',
            'Design inspirado na cultura skate',
            'Página institucional'
        ],
        technologies: ['HTML5', 'CSS3', 'JavaScript'],
        liveUrl: 'https://caskdev.github.io/sotrickderespeito'
    },

    4: {
        title: 'IMW - MIKAIL',
        description: 'Site institucional completo para o ministério.',
        fullDescription: 'Criamos o site institucional da IMW Mikail com páginas de eventos, galeria, mensagens, área de contato e estrutura pensada para facilitar a comunicação com a comunidade.',
        features: [
            'Agenda de eventos',
            'Galeria de imagens',
            'Área de mensagens',
            'Página institucional',
            'Formulário de contato'
        ],
        technologies: ['HTML5', 'CSS3', 'JavaScript'],
        liveUrl: 'https://imwmikail.github.io/site'
    },

    5: {
        title: 'PORTFÓLIO - SYNTAXTEAM',
        description: 'Portfólio profissional para apresentação da equipe.',
        fullDescription: 'Desenvolvemos o portfólio oficial da SyntaxTeam, com apresentação dos projetos, identidade visual, processos internos e estrutura pensada para fortalecer a marca da equipe.',
        features: [
            'Lista de projetos',
            'Identidade visual aplicada',
            'Sessão de serviços',
            'Demonstração de cases',
            'Layout moderno e responsivo'
        ],
        technologies: ['HTML5', 'CSS3', 'JavaScript'],
        liveUrl: 'https://caskdev.github.io/SYNTAXTEAM'
    }
};

function openProjectModal(modal, projectId) {
    const modalBody = modal.querySelector('.modal-body');
    
    const project = projects[projectId];
    
    if (project) {
        modalBody.innerHTML = `
            <h2>${project.title}</h2>
            <p class="modal-description">${project.fullDescription}</p>
            
            <h3>Funcionalidades Principais</h3>
            <ul class="modal-features">
                ${project.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
            
            <h3>Tecnologias Utilizadas</h3>
            <div class="modal-tech">
                ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
            
            <div class="modal-actions">
                <a href="${project.liveUrl}" class="btn btn-primary" target="_blank">Ver SITE</a>
                <button class="btn btn-outline modal-close">Fechar</button>
            </div>
        `;
        
        modalBody.querySelector('.modal-close').addEventListener('click', function() {
            closeModal(modal);
        });
        
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

document.addEventListener('DOMContentLoaded', function() {
    initProjectModals();
});

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#' && href.startsWith('#')) {
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

function initFloatingButtons() {
    const floatingButtons = document.querySelectorAll('.floating-btn');
    
    floatingButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

function initSocialCards() {
    const socialCards = document.querySelectorAll('.social-card');
    
    socialCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

function initCarousel() {
    const carouselSlide = document.querySelector('.carousel-slide');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const dotsContainer = document.querySelector('.carousel-dots');
    
    if (!carouselSlide || !carouselItems.length || !prevBtn || !nextBtn) {
        return;
    }
    
    let currentIndex = 0;
    const totalItems = carouselItems.length;
    
    carouselItems.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.classList.add('carousel-dot');
        dot.setAttribute('aria-label', `Ir para imagem ${index + 1}`);
        if (index === 0) dot.classList.add('active');
        
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
        
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.carousel-dot');
    
    function updateCarousel() {
        carouselSlide.style.transform = `translateX(-${currentIndex * 20}%)`;
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        updateCarousel();
    }
    
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    let autoPlay = setInterval(nextSlide, 5000);
    
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', () => {
            clearInterval(autoPlay);
        });
        
        carouselContainer.addEventListener('mouseleave', () => {
            autoPlay = setInterval(nextSlide, 5000);
        });
    }
}

if ('IntersectionObserver' in window) {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    const elementsToAnimate = document.querySelectorAll('.benefit-card, .service-card, .project-card, .testimonial-card, .process-step, .value-card, .why-us-card');
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
}

const style = document.createElement('style');
style.textContent = `
    .benefit-card, .service-card, .project-card, .testimonial-card, 
    .process-step, .value-card, .why-us-card {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .benefit-card.animate-in, .service-card.animate-in, .project-card.animate-in, 
    .testimonial-card.animate-in, .process-step.animate-in, .value-card.animate-in, 
    .why-us-card.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .tech-tag {
        display: inline-block;
        background-color: var(--light-gray);
        color: var(--graphite);
        padding: 6px 12px;
        border-radius: 20px;
        font-size: 0.875rem;
        margin-right: 8px;
        margin-bottom: 8px;
        font-weight: 500;
    }
    
    .modal-features {
        margin-bottom: 20px;
    }
    
    .modal-features li {
        margin-bottom: 8px;
        position: relative;
        padding-left: 24px;
    }
    
    .modal-features li::before {
        content: '✓';
        position: absolute;
        left: 0;
        color: var(--green);
        font-weight: bold;
        font-size: 1.1rem;
    }
    
    .modal-tech {
        margin-bottom: 25px;
    }
    
    .modal-actions {
        margin-top: 30px;
        display: flex;
        gap: 12px;
        flex-wrap: wrap;
    }
    
    @media (max-width: 768px) {
        .modal-actions {
            flex-direction: column;
        }
        
        .modal-actions .btn {
            width: 100%;
        }
    }
`;

document.head.appendChild(style);