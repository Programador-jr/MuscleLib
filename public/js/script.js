// Função para buscar exercícios
async function fetchExercises() {
    try {
        const response = await fetch('/api/exercises'); // Faz a requisição para sua API
        const exercises = await response.json(); // Converte a resposta em JSON

        displayExercises(exercises); // Função que renderiza os exercícios no front-end
    } catch (error) {
        console.error('Erro ao buscar exercícios:', error);
    }
}

// Função para exibir os exercícios
function displayExercises(exercises) {
    const container = document.getElementById('exercises-container');
    container.innerHTML = ''; // Limpa o container antes de adicionar novos exercícios

    exercises.forEach(exercise => {
        // Cria um elemento de card para cada exercício
        const exerciseCard = document.createElement('div');
        exerciseCard.className = 'exercise-card';

        // Verifica se há imagens e usa a primeira disponível
        if (exercise.images && exercise.images.length > 0) {
            const img = document.createElement('img');
            img.src = `/exercises/${exercise.images[0]}`; // Usa o caminho correto para a imagem 
            img.alt = exercise.name;
            exerciseCard.appendChild(img);
        }

        // Adiciona o nome do exercício
        const name = document.createElement('h3');
        name.textContent = exercise.name;
        exerciseCard.appendChild(name);

        // Adiciona o nível e categoria
        const details = document.createElement('p');
        details.textContent = `${exercise.level} | ${exercise.category}`;
        exerciseCard.appendChild(details);

        container.appendChild(exerciseCard); // Adiciona o card ao container
    });
}

// Chama a função para buscar e exibir os exercícios
fetchExercises();
