let currentPage = 0;
const exercisesPerPage = 50;
let loading = false; // Para prevenir múltiplos carregamentos simultâneos

// Função para buscar exercícios
async function fetchExercises(page = 0, limit = exercisesPerPage) {
    try {
        loading = true; // Impede múltiplas chamadas simultâneas
        const response = await fetch(`/api/exercises?page=${page}&limit=${limit}`);
        const exercises = await response.json();
        
        if (exercises.length > 0) {
            displayExercises(exercises);
            currentPage++; // Incrementa a página
        }
        
        loading = false; // Libera para próxima chamada
    } catch (error) {
        console.error('Erro ao buscar exercícios:', error);
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

    exercises.forEach(exercise => {
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

        // Adiciona as instruções passo a passo
        const instructions = document.createElement('ol');
        if (exercise.instructions && Array.isArray(exercise.instructions)) {
            exercise.instructions.forEach(step => {
                const li = document.createElement('li');
                li.textContent = step;
                instructions.appendChild(li);
            });
        }
        exerciseCard.appendChild(instructions);

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

// Carrega a primeira página de exercícios ao carregar o site
fetchExercises();
