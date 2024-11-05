// Inicializa o EmailJS
emailjs.init("3Mh5ts5ZbOQyBvg1Q"); // Substitua "jF4C2HRsXDuzYS4Pa" pelo seu ID da EmailJS

// Função para validar o nome (apenas letras e espaços)
function validarNome(nome) {
    const regexNome = /^[A-Za-z\s]+$/;
    return regexNome.test(nome);
}

// Função para validar o e-mail
function validarEmail(email) {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexEmail.test(email);
}

// Função para enviar e-mail de confirmação do agendamento
function enviarEmailAgendamento(agendamento) {
    emailjs.send("service_y5q9sxl", "template_f7zhrwp", {
        nome: agendamento.nome,
        email: agendamento.email
    }, "3Mh5ts5ZbOQyBvg1Q")
    .then(function(response) {
        console.log("E-mail enviado com sucesso!", response.status, response.text);
        alert("Agendamento realizado e e-mail de confirmação enviado!");
    }, function(error) {
        console.error("Erro ao enviar o e-mail", error);
        alert("Erro ao enviar e-mail de confirmação.");
    });
}

// Função para carregar agendamentos do LocalStorage
function carregarAgendamentos() {
    const agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
    const tabela = document.querySelector('#tabelaAgendamentos tbody');
    tabela.innerHTML = '';

    agendamentos.forEach((agendamento, index) => {
        const row = tabela.insertRow();
        row.innerHTML = `
            <td>${agendamento.nome}</td>
            <td>${agendamento.email}</td>
            <td>
                <button onclick="editarAgendamento(${index})">Editar</button>
                <button onclick="deletarAgendamento(${index})">Excluir</button>
            </td>
        `;
    });
}

// Função para agendar um serviço (Create)
function agendarServico() {
    const nome = document.getElementById('nome').value.toUpperCase();
    const email = document.getElementById('email').value;
    
    // Verificar se os campos estão preenchidos e válidos
    if (!nome || !email) {
        alert('Por favor, preencha todos os campos.');
        return;
    }
    if (!validarNome(nome)) {
        alert('O nome deve conter apenas letras.');
        return;
    }
    if (!validarEmail(email)) {
        alert('Por favor, insira um e-mail válido.');
        return;
    }

    const agendamento = { nome, email };
    const agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
    agendamentos.push(agendamento);
    localStorage.setItem('agendamentos', JSON.stringify(agendamentos));

    carregarAgendamentos();
    limparFormulario();

    // Envia o e-mail de confirmação
    enviarEmailAgendamento(agendamento);

    // Redireciona para outra página após o agendamento (substitua 'pagina-destino.html' pelo caminho desejado)
    redirecionarPagina("trilha_do_quiz.html");
}

// Função para limpar o formulário após o agendamento
function limparFormulario() {
    document.getElementById('nome').value = '';
    document.getElementById('email').value = '';
}

// Função para editar um agendamento
function editarAgendamento(index) {
    const agendamentos = JSON.parse(localStorage.getItem('agendamentos'));
    const agendamento = agendamentos[index];

    document.getElementById('nome').value = agendamento.nome;
    document.getElementById('email').value = agendamento.email;

    deletarAgendamento(index); // Remove o agendamento antigo para ser atualizado
}

// Função para deletar um agendamento
function deletarAgendamento(index) {
    const agendamentos = JSON.parse(localStorage.getItem('agendamentos'));
    agendamentos.splice(index, 1);
    localStorage.setItem('agendamentos', JSON.stringify(agendamentos));
    carregarAgendamentos();
}

function redirecionarPagina(url) {
    window.location.href = url;
}


// Carrega os agendamentos ao abrir a página
carregarAgendamentos();