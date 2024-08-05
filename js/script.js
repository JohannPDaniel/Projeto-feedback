document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card-painel');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    let currentIndex = 0;

    cards.forEach((card) => {
        card.addEventListener('click', () => {
            card.classList.toggle('flip');
        });
    });

    function updateCardVisibility() {
        cards.forEach((card, index) => {
            card.style.display = (index === currentIndex) ? 'block' : 'none';
        });
    }

    leftArrow.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCardVisibility();
        }
    });

    rightArrow.addEventListener('click', () => {
        if (currentIndex < cards.length - 1) {
            currentIndex++;
            updateCardVisibility();
        }
    });

    updateCardVisibility();
});

document.addEventListener('DOMContentLoaded', function() {
    let fileInput = document.getElementById('fileInput');
    let button = document.getElementById('button-addon1');
    let textInput = document.getElementById('form-file');

    button.addEventListener('click', function() {
        fileInput.click();
    });

    fileInput.addEventListener('change', function() {
        let fileName = fileInput.files.length > 0 ? fileInput.files[0].name : 'Coloque aqui a sua foto';
        textInput.value = fileName;
    });

    let form = document.getElementById('modalFormContent');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); 
        alert('Formulário enviado com sucesso!');
        
        let modal = bootstrap.Modal.getInstance(document.getElementById('modalForm'));
        modal.hide();
        form.reset();
    });

    form.addEventListener('reset', function() {
        textInput.value = 'Coloque aqui a sua foto';
    });
});

document.getElementById('form-modal').addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('form-nome').value;
    const idade = document.getElementById('form-idade').value;
    const titulo = document.getElementById('form-titulo').value;
    const descricao = document.getElementById('form-descricao').value;
    const fileInput = document.getElementById('fileInput');
    const foto = URL.createObjectURL(fileInput.files[0]);

    document.getElementById('nomePessoa').textContent = nome;
    document.getElementById('idadePessoa').textContent = `${idade} anos`;
    document.getElementById('titulo').value = titulo;
    document.getElementById('descricao').value = descricao;

    const fotoPessoa = document.getElementById('fotoPessoa');
    fotoPessoa.style.backgroundImage = `url(${foto})`;
    fotoPessoa.style.backgroundSize = 'cover';
    fotoPessoa.style.backgroundPosition = 'bottom top';
    fotoPessoa.style.backgroundRepeat = 'no-repeat';

    const modal = bootstrap.Modal.getInstance(document.getElementById('modalForm'));
    modal.hide();
    document.getElementById('form-modal').reset();
});
