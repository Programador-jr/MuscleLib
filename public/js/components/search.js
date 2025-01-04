// Função para buscar exercícios na API
async function searchExercises(query) {
    try {
        const response = await fetch(`https://libapi.vercel.app/api/exercises/search?lang=pt&query=${query}`);
        if (!response.ok) {
            throw new Error(`Erro na API: ${response.statusText}`);
        }

        const data = await response.json();
        if (data.exercises && data.exercises.length > 0) {
            // Emite um evento com os resultados da pesquisa
            document.dispatchEvent(new CustomEvent('searchResults', { detail: data.exercises }));
        } else {
            console.warn('Nenhum exercício encontrado para a pesquisa:', query);
            clearSearchResults();
        }
    } catch (error) {
        console.error('Erro ao buscar exercícios:', error);
        clearSearchResults();
    }
}

// Função para limpar os resultados da pesquisa
function clearSearchResults() {
    document.dispatchEvent(new CustomEvent('clearSearchResults'));
}

// Função para criar uma barra de pesquisa e colocá-la no placeholder
function createSearchBar() {
    const searchPlaceholder = document.getElementById('search-placeholder');
    if (!searchPlaceholder) {
        console.error('Placeholder da barra de pesquisa não encontrado!');
        return;
    }

    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';

    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Pesquisar exercícios...';
    searchInput.className = 'search-input';

    const searchIcon = document.createElement('i');
    searchIcon.className = 'fas fa-search search-icon';

    searchContainer.appendChild(searchInput);
    searchContainer.appendChild(searchIcon);

    // Insere a barra de pesquisa no placeholder
    searchPlaceholder.appendChild(searchContainer);

    // Adiciona o evento de pesquisa
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim().toLowerCase();
        if (query) {
            searchExercises(query);
        } else {
            clearSearchResults();
            fetchExercises(0); // Exibe a lista padrão ao limpar a barra de pesquisa
        }
    });
}

// Chama a função para criar a barra de pesquisa quando a página carrega
createSearchBar();
