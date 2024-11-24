// Função para mostrar as opções de cores
function toggleColorOptions() {
    const colorOptions = document.getElementById('color-options');
    if (colorOptions) {
        colorOptions.remove(); // Remove as opções se já estiverem visíveis
    } else {
        createColorOptions(); // Cria as opções de cor
    }
}

// Função para criar as opções de cor com botão de fechar
function createColorOptions() {
    const colorOptionsContainer = document.createElement('div');
    colorOptionsContainer.id = 'color-options';
    colorOptionsContainer.className = 'color-options';

    // Botão de fechar (X)
    const closeButton = document.createElement('button');
    closeButton.className = 'button-close';

    const closeIcon = document.createElement('i');
    closeIcon.className = 'fas fa-angle-left';
    closeButton.appendChild(closeIcon);

    closeButton.onclick = () => colorOptionsContainer.remove();

    // Adicionar o botão de fechar
    colorOptionsContainer.appendChild(closeButton);

    // Criação dos botões de cor
    const colors = ['vermelho', 'verde', 'azul', 'amarelo', 'rosa'];
    colors.forEach(color => {
        const colorButton = document.createElement('button');
        colorButton.className = `color-option btn btn-${color} m-1`;

        // Criar o <span> antes da palavra
        const spanColor = document.createElement('span');
        spanColor.className = `color-span ${color}-span`; // Classe para estilizar o <span>

        // Adicionar o <span> e o nome da cor ao botão
        colorButton.appendChild(spanColor);
        colorButton.appendChild(document.createTextNode(color.charAt(0).toUpperCase() + color.slice(1)));

        colorButton.onclick = () => changeTheme(color); // Altera o tema ao clicar
        colorOptionsContainer.appendChild(colorButton);
    });

    // Adiciona as opções de cor ao body
    document.body.appendChild(colorOptionsContainer);
}

// Função para mudar o tema e salvar no localStorage
function changeTheme(color) {
    // Remove todos os modos de cor antes de adicionar o novo
    document.body.classList.remove('vermelho-mode', 'verde-mode', 'azul-mode', 'amarelo-mode', 'rosa-mode');
    document.body.classList.add(`${color}-mode`); // Ex: 'red-mode', 'verde-mode', etc.

    // Salva a preferência no localStorage
    localStorage.setItem('themeColor', color);

    // Remove o menu de opções de cor após a seleção
    const colorOptions = document.getElementById('color-options');
    if (colorOptions) {
        colorOptions.remove();
    }
}

// Função para aplicar o tema salvo ao carregar a página
function applySavedTheme() {
    const savedTheme = localStorage.getItem('themeColor');
    const defaultTheme = 'azul';

    // Aplica o tema salvo ou o tema padrão, caso nenhum esteja salvo
    const themeToApply = savedTheme || defaultTheme;

    // Adiciona a classe correspondente ao tema
    document.body.classList.add(`${themeToApply}-mode`);

    // Salva o tema padrão no localStorage, caso ainda não exista
    if (!savedTheme) {
        localStorage.setItem('themeColor', defaultTheme);
    }
}

// Chama a função para aplicar o tema salvo ou padrão ao carregar a página
applySavedTheme();
