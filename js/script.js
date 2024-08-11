document.addEventListener('DOMContentLoaded', () => {
    setupFileInput();
    setupFormSubmission();
    setupCardCreation();  
    checkInitialCardState(); 
    setupCardFlip(); 
    setupNavigation(); 
});

function setupFileInput() {
    const fileInput = document.getElementById('fileInput');
    const button = document.getElementById('button-addon1');
    const textInput = document.getElementById('form-file');

    button.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', () => {
        const fileName = fileInput.files.length > 0 ? fileInput.files[0].name : 'Coloque aqui a sua foto';
        textInput.value = fileName;
    });
}

function setupFormSubmission() {
    const form = document.getElementById('form-modal');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        updateCardContent(); 
        closeModal(); 
        form.reset(); 
    });

    form.addEventListener('reset', () => {
        resetFileInput();
    });
}

function updateCardContent() {
    const nome = document.getElementById('form-nome').value;
    const idade = document.getElementById('form-idade').value;
    const titulo = document.getElementById('form-titulo').value;
    const descricao = document.getElementById('form-descricao').value;
    const fileInput = document.getElementById('fileInput');

    if (fileInput.files.length === 0) {
        alert("Por favor, selecione uma imagem.");
        return;
    }

    const foto = URL.createObjectURL(fileInput.files[0]);

    const lastCard = document.querySelector('.card-container .card-painel:last-child');
    lastCard.querySelector('#nomePessoa').textContent = nome;
    lastCard.querySelector('#idadePessoa').textContent = `${idade} anos`;

    lastCard.querySelector('#titulo-form').value = titulo;
    lastCard.querySelector('#descricao-form').value = descricao;

    lastCard.querySelector('.btn-success').textContent = "Responda o formulário";

    const fotoPessoa = lastCard.querySelector('.foto-pessoa');
    fotoPessoa.style.backgroundImage = `url(${foto})`;
    fotoPessoa.style.backgroundSize = 'cover';
    fotoPessoa.style.backgroundPosition = 'center';
    fotoPessoa.style.backgroundRepeat = 'no-repeat';

    lastCard.style.display = 'block'; 
}


function closeModal() {
    const modalElement = document.getElementById('modalForm');
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();
}

function resetFileInput() {
    document.getElementById('form-file').value = 'Coloque aqui a sua foto';
}

function setupCardCreation() {
    const sphereContainer = document.getElementById('sphere-container');
    sphereContainer.addEventListener('click', (event) => {
        event.preventDefault();
        hideMessage();
        createNewCard();
        updateCardVisibility();
    });
}
let currentIndex = 0;
function createNewCard() {
    const cardHTML = `
        <div class="card-painel">
            <div class="card-face card-front d-flex flex-column justify-content-start">
                <div class="foto-pessoa rounded-4"></div>
                <div class="d-flex flex-column mt-2">
                    <span class="info-card" id="nomePessoa">Nome da Pessoa</span>
                    <span class="info-card" id="idadePessoa">Idade</span>
                    <button type="button" class="btn btn-success info-card my-3" data-bs-toggle="modal"
                        data-bs-target="#modalForm">Responda o formulário</button>
                </div>
            </div>
            <div class="card-face card-back">
                <input type="text" id="titulo-form" class="form-control form-control-md" placeholder="Título"
                    aria-label="Disabled input example" disabled>
                <textarea id="descricao-form" class="form-control descricao-form" placeholder="Descrição" disabled></textarea>
            </div>
        </div>
    `;

    const cardContainer = document.querySelector('.card-container');
    
    cardContainer.innerHTML += cardHTML;
    
    const cards = document.querySelectorAll('.card-painel');
    currentIndex = cards.length - 1;
    
    updateCardVisibility();
    
    function updateCardVisibility() {
        cards.forEach((card, index) => {
            card.style.display = (index === currentIndex) ? 'block' : 'none';
        });
    }
}

function setupNavigation() {
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');

    leftArrow.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--; 
            updateCardVisibility();
        }
    });

    rightArrow.addEventListener('click', () => {
        const cards = document.querySelectorAll('.card-painel');
        if (currentIndex < cards.length - 1) {
            currentIndex++; 
            updateCardVisibility();
        }
    });

    updateCardVisibility();

    function updateCardVisibility() {
        const cards = document.querySelectorAll('.card-painel');
        cards.forEach((card, index) => {
            card.style.display = (index === currentIndex) ? 'block' : 'none';
        });
    }
}

function updateCardVisibility() {
    const cards = document.querySelectorAll('.card-painel');
    cards.forEach((card, index) => {
        card.style.display = (index === currentIndex) ? 'block' : 'none';
    });
}



function hideMessage() {
    const messageElement = document.getElementById('no-cards-message');
    if (messageElement) {
        messageElement.style.display = 'none';
    }
}

function checkInitialCardState() {
    const cardContainer = document.querySelector('.card-container');
    if (cardContainer.children.length === 0) {
        document.getElementById('no-cards-message').style.display = 'block';
    } else {
        document.getElementById('no-cards-message').style.display = 'none';
    }
}

function setupCardFlip() {
    document.addEventListener('click', (event) => {
        const card = event.target.closest('.card-painel');
        if (card) {
            card.classList.toggle('flip');
        }
    });
}
