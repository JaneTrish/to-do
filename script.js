const textInput = document.getElementById('text-input');
const list = document.querySelector('.list-container');
const form = document.querySelector('.form');
const submitBtn = document.querySelector('.submit-btn');
const clearBtn = document.querySelector('.clear-btn');

//array that holds tasks
let toDo = [];

// add event listener to the form
form.addEventListener('submit', createTask);
//event listener for clear button
clearBtn.addEventListener('click', clearList);
//get items from local storage on every reload of the page
document.addEventListener('DOMContentLoaded', getLocalStorage);
//event listener to remove one element
list.addEventListener('click', removeItem);

//create a task
function createTask(e) {
  e.preventDefault();
  const newTask = textInput.value;
  if (newTask === '') {
    return;
  }

  const task = {
    taskName: newTask,
    taskId: Date.now(),
    edit: false,
  };
  toDo.push(task);
  taskDOM(task);
  setLocalStorage(toDo);

  clearBtn.style.display = 'block';
  textInput.value = '';
}

// add task to the DOM
function taskDOM(task) {
  const article = document.createElement('article');
  article.classList.add('list-item');
  article.setAttribute('data-id', task.taskId);
  article.innerHTML = `<label class="label" for=${task.taskId}><input type="checkbox" id=${task.taskId}  class="checkbox"/><span>${task.taskName}</span></label><button class="remove-btn btn">remove</button>`;
  list.appendChild(article);
}

//clear the whole list
function clearList() {
  while (list.firstChild && toDo.length > 0) {
    list.removeChild(list.firstChild);
    toDo.pop(toDo.length - 1);
  }
  localStorage.clear();
  // console.log(toDo);
  clearBtn.style.display = 'none';
  textInput.value = '';
}

//remove one element from the list
function removeItem(e) {
  if (e.target.classList.contains('remove-btn')) {
    const taskToRemove = e.target.parentElement;
    const idToRemove = e.target.parentElement.dataset.id;
    // find index to remove item from the array
    const index = toDo.findIndex((item) => item.taskId === Number(idToRemove));
    toDo.splice(index, 1);
    //remove item from the local storage
    setLocalStorage(toDo);
    if (toDo.length === 0) {
      localStorage.clear();
      clearBtn.style.display = 'none';
    }
    //remove element from the DOM
    list.removeChild(taskToRemove);
  }
}

//add to local storage
function setLocalStorage(list) {
  localStorage.setItem('toDo', JSON.stringify(list));
}

//get from local storage
function getLocalStorage() {
  const list = localStorage.getItem('toDo');
  if (!list) {
    return;
  }
  toDo = JSON.parse(list);
  toDo.forEach((task) => taskDOM(task));
  clearBtn.style.display = 'block';
}
