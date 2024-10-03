// Função para criar uma barra de pesquisa
function createSearchBar() {
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';

    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Pesquisar exercícios...';
    searchInput.className = 'search-input';

    const searchIcon = document.createElement('i'); // Cria um elemento para o ícone
    searchIcon.className = 'fas fa-search search-icon'; // Adiciona a classe do Font Awesome


    searchContainer.appendChild(searchInput);
    searchContainer.appendChild(searchIcon);
    const parentContainer = document.getElementById('search-container');
    parentContainer.appendChild(searchContainer); // Insere a barra de pesquisa na navbar

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        filterExercises(query);
    });
}

// Função para filtrar exercícios
function filterExercises(query) {
    const exercises = document.querySelectorAll('.exercise-card'); // Seleciona todos os cards de exercício
    exercises.forEach(exercise => {
        const name = exercise.querySelector('h3').textContent.toLowerCase();
        const category = exercise.querySelector('p:nth-of-type(1)').textContent.toLowerCase();  // Categoria
        const force = exercise.querySelector('p:nth-of-type(2)').textContent.toLowerCase();    // Força
        const equipment = exercise.querySelector('p:nth-of-type(3)').textContent.toLowerCase();// Equipamento
        const primaryMuscles = exercise.querySelector('p:nth-of-type(4)').textContent.toLowerCase(); // Músculo Principal
        const secondaryMuscles = exercise.querySelector('p:nth-of-type(5)').textContent.toLowerCase(); // Músculos Secundários

        if (name.includes(query) || category.includes(query) || force.includes(query) || equipment.includes(query) || primaryMuscles.includes(query) || secondaryMuscles.includes(query)) {
            exercise.style.display = 'block'; // Mostra o exercício se a consulta corresponder a qualquer campo
        } else {
            exercise.style.display = 'none'; // Esconde o exercício se não corresponder
        }
    });
}

// Chamar a função para criar a barra de pesquisa ao carregar o script
createSearchBar();
