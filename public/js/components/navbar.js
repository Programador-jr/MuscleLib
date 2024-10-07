// Função para criar a navbar
function createNavbar() {
    const navbar = document.createElement('nav');
    navbar.className = 'navbar navbar-expand-lg navbar-light bg-light fixed-top';

    const container = document.createElement('div');
    container.className = 'container-fluid';

    // Logo substituindo o h1
    const logo = document.createElement('a');
    logo.href = '#'; // Pode ser alterado para a rota principal
    logo.className = 'navbar-brand';
    
    const logoImg = document.createElement('img');
    logoImg.src = '/images/logo.png'; // Caminho para o logo
    logoImg.alt = 'Logo';
    logoImg.className = 'logo-img'; // Adicione esta classe para customizar o estilo via CSS
    logo.appendChild(logoImg);

    // Criação da barra de pesquisa
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container mx-auto'; // Centraliza a barra de pesquisa

    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Pesquisar exercícios...';
    searchInput.className = 'search-input form-control'; // Use classes Bootstrap para estilizar

    const searchIcon = document.createElement('i');
    searchIcon.className = 'fas fa-search search-icon'; // Ícone de pesquisa

    searchContainer.appendChild(searchInput);
    searchContainer.appendChild(searchIcon);

    // Botão de mudar o tema
    const themeToggle = document.createElement('button');
    themeToggle.id = 'theme-toggle';
    themeToggle.className = 'btn btn-outline-secondary';

    const themeIcon = document.createElement('i');
    themeIcon.id = 'theme-icon';
    themeIcon.className = 'fas fa-sun'; // Ícone do sol por padrão (modo claro)
    themeToggle.appendChild(themeIcon);

    // Adicionar logo, barra de pesquisa e botão de tema ao container
    container.appendChild(logo);
    container.appendChild(searchContainer);
    container.appendChild(themeToggle);

    // Adicionar container ao navbar
    navbar.appendChild(container);

    // Inserir a navbar no body
    document.body.insertBefore(navbar, document.body.firstChild);
}

// Chamar a função para criar a navbar
createNavbar();
