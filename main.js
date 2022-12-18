const nameN = document.querySelector(".name");
const form1 = document.querySelector(".form1")
const todoTitle = document.querySelector(".title");
const todoTask = document.querySelector('.task');
const categories = document.querySelector('.cate');

const numberOfTasks = document.querySelector(".numberOfTasks span");
const noTask = document.querySelector(".notask")
const noCategory = document.querySelector(".category")


const home = document.querySelector(".home");
const addingTask = document.querySelector(".addingTask");
const viewingTask = document.querySelector(".viewingTask");

const addTask = document.querySelector(".addTask");
const cancelBtnA = document.querySelector(".cancelBtnA ");
const cancelBtnB = document.querySelector(".cancelBtnB ");



window.addEventListener('load', () => {
    nameN.value = localStorage.getItem('username')|| 'Your name...';
    todos = JSON.parse(localStorage.getItem('todos')) || [];
    numberOfTasks.textContent = todos.length;

    if (todos.length) {
        noTask.classList.remove("displayBlock")
    } else {
        noTask.classList.add("displayBlock")
    }


    addTask.addEventListener('click', () => {
        home.classList.toggle('displayNone');
        addingTask.classList.toggle('displayBlock')
    })
    cancelBtnA.addEventListener('click', () => {
        addingTask.classList.toggle('displayNone');
        home.classList.toggle('displayNone');
        location.reload()
    })
    cancelBtnB.addEventListener('click', (e) => {
        e.preventDefault()
        viewingTask.classList.toggle('displayNone');
        home.classList.toggle('displayNone');
        location.reload()
    })


    nameN.addEventListener('click', () => {
        nameN.removeAttribute("readonly");
    })
    nameN.addEventListener('blur', () => {
        username = nameN.value;
        localStorage.setItem('username', username);
        nameN.value = username;
        nameN.setAttribute("readonly", '');
    })

    form1.addEventListener('submit', (e) => {
        e.preventDefault();
        todo = {
            title: todoTitle.value,
            task: todoTask.value,
            category: categories.querySelector('input[type="radio"]:checked').value
        }


        todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(todos));

        todoTitle.value = '';
        todoTask.value = '';
        location.reload()

        addingTask.classList.toggle('displayNone');
        home.classList.toggle('displayNone');




    })
    renderCards()
    function renderCards() {
        const container = document.querySelector(".taskList")
        todos.forEach(td => {
            const taskCard = document.createElement('div');
            taskCard.classList.add("taskCard");

            const task = document.createElement('p');
            task.classList.add('taskTitile');
            task.textContent = `${td.title}`

            const actions = document.createElement('div');
            actions.classList.add("action");

            const viewBtn = document.createElement('button');
            viewBtn.classList.add('viewBtn');
            viewBtn.textContent = 'view';

            const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('deleteBtn');
            deleteBtn.textContent = 'delete'

            actions.append(viewBtn, deleteBtn)
            taskCard.append(task, actions)

            container.append(taskCard)


            deleteBtn.addEventListener('click', () => {
                todos = todos.filter(tt => tt != td);
                localStorage.setItem('todos', JSON.stringify(todos));
                location.reload()
            })

            const headding = document.querySelector('.viewTask2');
            if (td.category === 'personal') {
                taskCard.classList.add("taskCardPersonal");
                headding.classList.add("headdingP");
            } else if (td.category === 'school') {
                taskCard.classList.add("taskCardSchool")
                headding.classList.add("headdingS");
            } else if (td.category === 'work') {
                taskCard.classList.add("taskCardWork")
                headding.classList.add("headdingW");
            }

            viewBtn.addEventListener('click', () => {
                home.classList.add('displayNone');
                viewingTask.classList.add('displayBlock')


                const taskTitile2 = document.querySelector('.title2');
                const taskTodo2 = document.querySelector('.task2');
                const editBtn = document.querySelector('.editBtn');

                headding.textContent = td.category;
                taskTitile2.value = td.title;
                taskTodo2.value = td.task;

                editBtn.addEventListener('click', (e) => {
                    e.preventDefault()
                    if (editBtn.textContent === 'Edit') {
                        editBtn.textContent = 'Save'
                        cancelBtnB.textContent = 'Cancel'
                        taskTitile2.removeAttribute('readonly');
                        taskTodo2.removeAttribute('readonly');
                    } else if (editBtn.textContent === 'Save') {
                        editBtn.textContent = 'Edit'
                        taskTitile2.setAttribute('readonly', "");
                        taskTodo2.setAttribute('readonly', "");

                        td.title = taskTitile2.value;
                        td.task = taskTodo2.value;
                        localStorage.setItem('todos', JSON.stringify(todos));
                        location.reload()
                    }
                })

            })



        })
    }




})
