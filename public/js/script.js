let currentPage = 0;
const exercisesPerPage = 50;
let loading = false; // Para prevenir múltiplos carregamentos simultâneos
const apiBaseUrl = 'https://libapi.vercel.app/api/exercises?lang=pt';

// Função para buscar exercícios
async function fetchExercises(page = 0, limit = exercisesPerPage) {
    try {
        loading = true; // Impede múltiplas chamadas simultâneas
        const response = await fetch(`${apiBaseUrl}&page=${page}&limit=${limit}`);
            if (!response.ok) {
                throw new Error(`Erro na resposta da API: ${response.statusText}`);
            }

        const exercises = await response.json();
        
        if (exercises.length > 0) {
            displayExercises(exercises);
            currentPage++; // Incrementa a página
        }
        
        loading = false; // Libera para próxima chamada
    } catch (err) {
        console.error('Erro ao buscar exercícios:', err);
            // alert('Ocorreu um erro ao buscar os exercicíos. Tente novamente mais tarde.');
        loading = false; // Libera a chamada caso ocorra erro
    }
}

// Função para verificar se o elemento está parcialmente visível na janela de visualização
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top < window.innerHeight * 0.85 && // Se a parte superior estiver 85% visível na tela
        rect.bottom > 0 // Se a parte inferior ainda não tiver passado da tela
    );
}

// Função para exibir os exercícios
function displayExercises(exercises) {
    const container = document.getElementById('exercises-container');

    exercises.forEach((exercise, index) => {
        const exerciseCard = document.createElement('div');
        exerciseCard.className = 'exercise-card';

        // Verifica se há imagens e usa ambas
        if (exercise.images && exercise.images.length > 0) {
            const img = document.createElement('img');
            img.src = `/exercises/${exercise.images[0]}`; // Usa a primeira imagem inicialmente
            img.alt = exercise.name;
            exerciseCard.appendChild(img);

            // Alternar imagens
            let currentIndex = 0;
            setInterval(() => {
                currentIndex = (currentIndex + 1) % exercise.images.length;
                img.src = `/exercises/${exercise.images[currentIndex]}`; // Atualiza a imagem
            }, 1500); // Muda a imagem a cada 1,5 segundo (1500 milissegundos)
        }

        // Adiciona o nome do exercício
        const name = document.createElement('h3');
        name.textContent = exercise.name;
        exerciseCard.appendChild(name);

        // Adiciona o nível e categoria
        const details = document.createElement('p');
        details.textContent = `Nível: ${exercise.level} | Categoria: ${exercise.category}`;
        exerciseCard.appendChild(details);

        // Adiciona a força
        const force = document.createElement('p');
        force.textContent = `Força: ${exercise.force}`;
        exerciseCard.appendChild(force);

        // Adiciona o equipamento (se houver)
        const equipment = document.createElement('p');
        equipment.textContent = `Equipamento: ${exercise.equipment || 'Nenhum'}`;
        exerciseCard.appendChild(equipment);

        // Adiciona os músculos principais
        const primaryMuscles = document.createElement('p');
        primaryMuscles.textContent = `Músculo Principal: ${exercise.primaryMuscles.join(', ')}`;
        exerciseCard.appendChild(primaryMuscles);

        // Adiciona os músculos secundários (se houver)
        const secondaryMuscles = document.createElement('p');
        secondaryMuscles.textContent = `Músculos Secundários: ${exercise.secondaryMuscles && Array.isArray(exercise.secondaryMuscles) && exercise.secondaryMuscles.length > 0 ? exercise.secondaryMuscles.join(', ') : 'Nenhum'}`;
        exerciseCard.appendChild(secondaryMuscles);

        // Adiciona as instruções em um colapso
        const collapseId = `collapseInstructions-${index}`;

        const collapseButton = document.createElement('button');
        collapseButton.className = 'collapse-btn btn btn-primary collapse-toggle d-flex justify-content-between align-items-center';
        collapseButton.type = 'button';
        collapseButton.setAttribute('data-bs-toggle', 'collapse');
        collapseButton.setAttribute('data-bs-target', `#${collapseId}`);
        collapseButton.innerHTML = `Mostrar Instruções <i class="collapse-icon fas fa-plus"></i>`; // Ícone do Font Awesome
        exerciseCard.appendChild(collapseButton);

        const collapseDiv = document.createElement('div');
        collapseDiv.className = 'collapse';
        collapseDiv.id = collapseId;

        const instructions = document.createElement('div');
        instructions.className = 'card card-body';

        if (exercise.instructions && Array.isArray(exercise.instructions)) {
            exercise.instructions.forEach(step => {
                const p = document.createElement('p');
                p.textContent = step;
                instructions.appendChild(p);
            });
        }

        collapseDiv.appendChild(instructions);
        exerciseCard.appendChild(collapseDiv);

        // Função para alternar ícone de + para x
        collapseButton.addEventListener('click', () => {
            const icon = collapseButton.querySelector('.collapse-icon');
            if (collapseDiv.classList.contains('show')) {
                icon.classList.replace('fa-minus', 'fa-plus'); // Alterna para o ícone de +
            } else {
                icon.classList.replace('fa-plus', 'fa-minus'); // Alterna para o ícone de x
            }
        });

        // Evento do Bootstrap para detectar quando o colapso abrir ou fechar
        collapseDiv.addEventListener('shown.bs.collapse', () => {
            const icon = collapseButton.querySelector('.collapse-icon');
            icon.classList.replace('fa-plus', 'fa-minus'); // Ícone de colapso aberto
        });

        collapseDiv.addEventListener('hidden.bs.collapse', () => {
            const icon = collapseButton.querySelector('.collapse-icon');
            icon.classList.replace('fa-minus', 'fa-plus'); // Ícone de colapso fechado
        });


        // Adiciona o card ao container
        container.appendChild(exerciseCard);
           

        // Função para revelar o card quando ele entra parcialmente na visualização
        function reveal() {
            if (isElementInViewport(exerciseCard)) {
                exerciseCard.classList.add('show');
            }
        }

        // Verifica se o card está visível no carregamento
        reveal();

        // Adiciona um event listener para rolar
        window.addEventListener('scroll', reveal);
    });
}

// Função para carregar mais exercícios conforme a rolagem
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 && !loading) {
        fetchExercises(currentPage); // Carrega a próxima página
    }
});

document.addEventListener('searchResults', (e) => {
    const exercises = e.detail; // Exercícios retornados
    const container = document.getElementById('exercises-container');
    container.innerHTML = ''; // Limpa os exercícios atuais para exibir os resultados da pesquisa
    displayExercises(exercises);
});

document.addEventListener('clearSearchResults', () => {
    const container = document.getElementById('exercises-container');
    container.innerHTML = ''; // Limpa os resultados da pesquisa
    currentPage = 0; // Reseta a paginação para a primeira página
    fetchExercises(0); // Carrega os exercícios da primeira página
});


// Carrega a primeira página de exercícios ao carregar o site
fetchExercises();
