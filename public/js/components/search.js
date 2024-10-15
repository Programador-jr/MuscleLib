// Função para criar uma barra de pesquisa e colocá-la no placeholder
function createSearchBar() {
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';

    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Pesquisar exercícios...';
    searchInput.className = 'search-input';

    const searchIcon = document.createElement('i');
    searchIcon.className = 'fas fa-search search-icon'; // Ícone do Font Awesome

    searchContainer.appendChild(searchInput);
    searchContainer.appendChild(searchIcon);

    // Insere a barra de pesquisa dentro da navbar, entre o logo e o botão de tema
    const navbar = document.querySelector('.navbar .container-fluid');
    const themeToggleButton = document.querySelector('#theme-toggle');

    // Coloca a barra de pesquisa entre o logo e o botão de alternar tema
    navbar.insertBefore(searchContainer, themeToggleButton);

    // Cria um elemento para exibir a mensagem de "não encontrado" e sugestões
    const messageContainer = document.createElement('div');
    messageContainer.className = 'search-message';
    searchContainer.appendChild(messageContainer);

    // Adiciona o evento de pesquisa
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        filterExercises(query, messageContainer, searchInput); // Passa o container da mensagem e o campo de input como argumento
    });
}

// Função para filtrar exercícios
function filterExercises(query, messageContainer, searchInput) {
    const exercises = document.querySelectorAll('.exercise-card'); // Seleciona todos os cards de exercício
    let exercisesFound = false;

    exercises.forEach(exercise => {
        const name = exercise.querySelector('h3').textContent.toLowerCase();
        const category = exercise.querySelector('p:nth-of-type(1)').textContent.toLowerCase();
        const force = exercise.querySelector('p:nth-of-type(2)').textContent.toLowerCase();
        const equipment = exercise.querySelector('p:nth-of-type(3)').textContent.toLowerCase();
        const primaryMuscles = exercise.querySelector('p:nth-of-type(4)').textContent.toLowerCase();
        const secondaryMuscles = exercise.querySelector('p:nth-of-type(5)').textContent.toLowerCase();

        if (
            name.includes(query) ||
            category.includes(query) ||
            force.includes(query) ||
            equipment.includes(query) ||
            primaryMuscles.includes(query) ||
            secondaryMuscles.includes(query)
        ) {
            exercise.style.display = 'block'; // Mostra o exercício se a consulta corresponder
            exercisesFound = true;
        } else {
            exercise.style.display = 'none'; // Esconde o exercício se não corresponder
        }
    });

    // Se nenhum exercício for encontrado, exibe a mensagem e sugere alternativas
    if (!exercisesFound && query.length > 0) {
        messageContainer.style.display = 'block'; // Mostra o container da mensagem
        messageContainer.innerHTML = `Exercício não encontrado. Talvez você quis dizer: <br>`;

        // Aqui você pode chamar a função da API para buscar sugestões
        getSuggestions(query, messageContainer, searchInput); // Função para buscar sugestões
    } else {
        messageContainer.style.display = 'none'; // Esconde a mensagem se encontrar exercícios
    }
}

// Função para buscar sugestões na API
async function getSuggestions(query, messageContainer, searchInput) {
    try {
        const response = await fetch(`https://libapi.vercel.app/api/exercises/search?query=${query}`);
        const data = await response.json();

        // Limita o número de sugestões exibidas (por exemplo, 5)
        const maxSuggestions = 5;

        if (data.suggestions && data.suggestions.length > 0) {
            data.suggestions.slice(0, maxSuggestions).forEach(suggestion => {
                const suggestionElement = document.createElement('div');
                suggestionElement.className = 'suggestion-item';
                suggestionElement.textContent = suggestion;

                // Evento de clique na sugestão
                suggestionElement.addEventListener('click', () => {
                    searchInput.value = suggestion; // Coloca a sugestão no campo de pesquisa
                    messageContainer.style.display = 'none'; // Esconde a lista de sugestões
                    filterExercises(suggestion.toLowerCase(), messageContainer, searchInput); // Filtra os exercícios com base na sugestão
                });

                messageContainer.appendChild(suggestionElement);
            });
        } else {
            messageContainer.innerHTML += "Nenhuma sugestão encontrada."; // Se não houver sugestões
        }
    } catch (error) {
        console.error('Erro ao buscar sugestões:', error);
    }
}

// Chama a função para criar a barra de pesquisa quando a página carrega
createSearchBar();
