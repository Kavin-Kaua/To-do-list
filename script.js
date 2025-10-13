function btn() {
    // Seleciona o campo de input onde o usuário digita a tarefa
    // ex: <input class="input" type="text" placeholder="Digite uma tarefa">
    
    const input = document.querySelector('.input')

    // Pega o texto digitado e remove espaços em branco no início e fim
    // ex: "  Estudar JavaScript  " vira "Estudar JavaScript"
    const task = input.value.trim()

    // Seleciona a div que contém a lista de tarefas
    // ex: <div class="div-list" style="display: none">
    const divList = document.querySelector('.div-list')

    // Seleciona a lista onde as tarefas serão adicionadas
    // ex: <ul id="task-list"></ul>
    const taskList = document.getElementById('task-list')

    // Verifica se o usuário digitou alguma coisa (não está vazio)
    // ex: "Estudar JavaScript" !== '' retorna true
    if (task !== '') {
        // Cria um novo item de lista
        // ex: <li></li>
        const li = document.createElement('li')

        // Cria um checkbox para marcar a tarefa como concluída
        // ex: <input type="checkbox" class="task-checkbox">
        const checkbox = document.createElement('input')
        checkbox.type = 'checkbox'
        checkbox.className = 'task-checkbox'

        // Cria um span para mostrar o texto da tarefa
        // ex: <span class="task-text">Estudar JavaScript</span>
        const taskText = document.createElement('span')
        taskText.textContent = task
        taskText.className = 'task-text'

        // Cria um botão para remover a tarefa
        // ex: <button class="remove-btn">🗑</button>
        const removeBtn = document.createElement('button')
        removeBtn.textContent = '🗑'
        removeBtn.className = 'remove-btn'

        const editBtn = document.createElement('button')
        editBtn.textContent = '📝'
        editBtn.className = 'edit-btn'
        editBtn.style.background = 'none'

        // Define o que acontece quando clica no botão de remover
        // ex: remove a tarefa da lista e verifica se ainda há outras tarefas
        removeBtn.onclick = function () {
            li.remove()
            checkTasksVisibility()
        }

        // 📝 botão editar
        editBtn.onclick = function () {
            const editInput = document.createElement('input')
            editInput.type = 'text'
            editInput.value = taskText.textContent
            editInput.className = 'edit-input'

            // substitui o texto pelo campo de edição
            li.replaceChild(editInput, taskText)
            editInput.focus()

            // salva ao pressionar Enter
            editInput.addEventListener('keydoen', e => {
                if (e.key === 'Enter') {
                    saveEdit()
                }
            })

            // salva ao clicar fora
            editInput.addEventListener('blur', saveEdit)

            function saveEdit() {
                const newText = editInput.value.trim()
                if (newText !== '') {
                    taskText.textContent = newText
                }
                li.replaceChild(taskText, editInput)
            }

        }

        // Adiciona todos os elementos dentro do item da lista
        // ex: <li><checkbox><span>texto</span><button>🗑</button></li>
        li.appendChild(editBtn)
        li.appendChild(checkbox)
        li.appendChild(taskText)
        li.appendChild(removeBtn)
        

        // Adiciona o item completo na lista de tarefas
        // ex: coloca a <li> dentro de <ul id="task-list">
        taskList.appendChild(li)

        // Torna a div da lista visível (já que agora tem pelo menos uma tarefa)
        // ex: muda de display: none para display: block
        if (divList) {
            divList.style.display = 'block'
        }

        // Limpa o campo de input para o usuário digitar a próxima tarefa
        // ex: o input fica vazio novamente
        input.value = ''
    }
}

// Função que verifica se deve mostrar ou esconder a lista de tarefas
function checkTasksVisibility() {
    // Seleciona a lista de tarefas
    // ex: <ul id="task-list">
    const taskList = document.getElementById('task-list')

    // Seleciona o container principal da lista
    // ex: <div id="div-list">
    const divList = document.getElementById('div-list')

    // Se não há nenhuma tarefa na lista (lista está vazia)
    // ex: taskList.children.length === 0 significa que não há <li> dentro de <ul>
    if (taskList.children.length === 0) {
        // Esconde o container da lista
        // ex: muda para display: none
        if (divList) {
            divList.style.display = 'none'
        }
    }
}

// Função que configura o evento do Enter no campo de input
function setupEnterKeyListener() {
    // Seleciona o mesmo campo de input usado na função btn()
    // ex: <input class="input" type="text" placeholder="Digite uma tarefa">
    const input = document.querySelector('.input')

    // Verifica se o input foi encontrado na página
    // ex: se existe <input class="input"> no HTML
    if (input) {
        // Adiciona um "ouvidor" de evento para quando uma tecla é pressionada
        // ex: detecta quando usuário pressiona qualquer tecla dentro do input
        input.addEventListener('keydown', function (event) {
            // Verifica se a tecla pressionada foi Enter
            // ex: event.key === 'Enter' retorna true quando usuário aperta Enter
            if (event.key === 'Enter') {
                // Previne o comportamento padrão da tecla Enter
                // ex: impede que a página seja recarregada ou formulário seja enviado
                event.preventDefault()

                // Chama a mesma função que o botão "Adicionar" usa
                // ex: executa btn() como se o usuário tivesse clicado no botão
                btn()
            }
        })
    }
}

// Configura o evento do Enter quando a página terminar de carregar
// ex: garante que o HTML já esteja pronto antes de tentar encontrar o input
window.addEventListener('load', function () {
    // Chama a função que configura o listener do Enter
    // ex: ativa a funcionalidade de pressionar Enter para adicionar tarefas
    setupEnterKeyListener()
})