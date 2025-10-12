
const inputBox = document.getElementById('newTask');
const addBtn = document.getElementById('addBtn');
const listBox = document.getElementById('taskList');
const totalTasks = document.getElementById('count');
const leftTasks = document.getElementById('leftCount');
const filterBtns = document.querySelectorAll('.filters button');
const clearDoneBtn = document.getElementById('clearCompleted');
const exportBtn = document.getElementById('export');


let allTasks = [];
let currentView = 'all';


function makeId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

function loadFromLocal() {
  const data = localStorage.getItem('tasks');
  if (data) {
    allTasks = JSON.parse(data);
  }
}


function saveToLocal() {
  localStorage.setItem('tasks', JSON.stringify(allTasks));
}


function addNewTask(text) {
  if (text.trim() === '') return;
  const newTask = {
    id: makeId(),
    text: text.trim(),
    done: false
  };
  allTasks.unshift(newTask);
  saveToLocal();
  showTasks();
}


function deleteTask(id) {
  allTasks = allTasks.filter(task => task.id !== id);
  saveToLocal();
  showTasks();
}

function toggleTaskDone(id) {
  const task = allTasks.find(t => t.id === id);
  if (task) {
    task.done = !task.done;
  }
  saveToLocal();
  showTasks();
}


function editTaskText(id, newText) {
  const task = allTasks.find(t => t.id === id);
  if (task) {
    task.text = newText.trim();
  }
  saveToLocal();
  showTasks();
}

// Display tasks on screen
function showTasks() {
  listBox.innerHTML = '';

  let tasksToShow = allTasks;
  if (currentView === 'active') {
    tasksToShow = allTasks.filter(t => !t.done);
  } else if (currentView === 'completed') {
    tasksToShow = allTasks.filter(t => t.done);
  }

  if (tasksToShow.length === 0) {
    listBox.innerHTML = '<div class="no-tasks">No tasks yet ✨</div>';
  } else {
    tasksToShow.forEach(task => {
      const li = document.createElement('li');
      li.className = 'task' + (task.done ? ' completed' : '');

      // Checkbox
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = task.done;
      checkbox.addEventListener('change', () => toggleTaskDone(task.id));

      // Task text
      const textDiv = document.createElement('div');
      textDiv.className = 'title';
      const textInput = document.createElement('input');
      textInput.type = 'text';
      textInput.value = task.text;
      textInput.addEventListener('change', () => editTaskText(task.id, textInput.value));
      textInput.addEventListener('keydown', e => {
        if (e.key === 'Enter') textInput.blur();
      });
      textDiv.appendChild(textInput);

      
      const infoDiv = document.createElement('div');
      infoDiv.className = 'info';
      const delBtn = document.createElement('button');
      delBtn.textContent = 'Delete';
      delBtn.addEventListener('click', () => deleteTask(task.id));
      infoDiv.appendChild(delBtn);

     
      li.appendChild(checkbox);
      li.appendChild(textDiv);
      li.appendChild(infoDiv);

      // Add to list
      listBox.appendChild(li);
    });
  }

  // Update counts
  totalTasks.textContent = allTasks.length + (allTasks.length === 1 ? ' task' : ' tasks');
  leftTasks.textContent = allTasks.filter(t => !t.done).length + ' left';

  // Highlight active filter
  filterBtns.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === currentView);
  });
}

// Button events
addBtn.addEventListener('click', () => {
  addNewTask(inputBox.value);
  inputBox.value = '';
  inputBox.focus();
});

// Add on pressing Enter key
inputBox.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    addNewTask(inputBox.value);
    inputBox.value = '';
  }
});

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    currentView = btn.dataset.filter;
    showTasks();
  });
});

// Clear all completed tasks
clearDoneBtn.addEventListener('click', () => {
  allTasks = allTasks.filter(t => !t.done);
  saveToLocal();
  showTasks();
});

exportBtn.addEventListener('click', () => {
  const data = JSON.stringify(allTasks, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'tasks.json';
  document.body.appendChild(a);
  a.click();
  a.remove();

  URL.revokeObjectURL(url);
});


loadFromLocal();
showTasks();


