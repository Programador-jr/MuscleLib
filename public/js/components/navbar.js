function createNavbar() {
    const navbar = document.createElement('nav');
    navbar.className = 'navbar navbar-expand-lg navbar-light bg-light fixed-top';

    const container = document.createElement('div');
    container.className = 'container-fluid';

    // Logo substituindo o h1
    const logo = document.createElement('a');
    logo.href = ''; // Pode ser alterado para a rota principal
    logo.className = 'navbar-brand';
    
    const logoImg = document.createElement('img');
    logoImg.src = '/images/logo.png'; // Caminho para o logo
    logoImg.alt = 'Logo';
    logoImg.className = 'logo-img'; // Adicione esta classe para customizar o estilo via CSS
    logo.appendChild(logoImg);

    // Placeholder para a barra de pesquisa
    const searchPlaceholder = document.createElement('div');
    searchPlaceholder.className = 'search-placeholder mx-auto'; // Centraliza o espaço para a barra de pesquisa
    searchPlaceholder.id = 'search-placeholder'; // Adicione um ID para facilitar a localização

    // Botão de cores
    const colorButton = document.createElement('button');
    colorButton.className = "palette-btn btn btn-outline-secondary ms-2";
    colorButton.onclick = toggleColorOptions;

    const colorIcon = document.createElement('i');
    colorIcon.className = 'fas fa-palette';
    colorButton.appendChild(colorIcon);

    // Botão de mudar o tema
    const themeToggle = document.createElement('button');
    themeToggle.id = 'theme-toggle';
    themeToggle.className = 'btn btn-outline-secondary';

    const themeIcon = document.createElement('i');
    themeIcon.id = 'theme-icon';
    themeIcon.className = 'fas fa-sun'; // Ícone do sol por padrão (modo claro)
    themeToggle.appendChild(themeIcon);

    // Adicionar logo, placeholder da barra de pesquisa, botão de tema e botão de cores ao container
    container.appendChild(logo);
    container.appendChild(searchPlaceholder);
    container.appendChild(themeToggle);
    container.appendChild(colorButton);

    // Adicionar container ao navbar
    navbar.appendChild(container);

    // Inserir a navbar no body
    document.body.insertBefore(navbar, document.body.firstChild);
}

// Chamar a função para criar a navbar
createNavbar();
