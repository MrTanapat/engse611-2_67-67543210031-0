// ประกาศตัวแปรสำหรับเก็บข้อมูล Todo
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// เลือก Elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTask');
const todoList = document.getElementById('todoList');
const clearCompletedBtn = document.getElementById('clearCompleted');
const clearAllBtn = document.getElementById('clearAll');

// แสดงรายการ Todo
function renderTodos() {
  todoList.innerHTML = '';
  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    if (todo.completed) {
      li.classList.add('completed');
    }

    li.innerHTML = `
      <span>${todo.text}</span>
      <div class="task-actions">
        <button class="toggle" data-index="${index}">${todo.completed ? '↩️' : '✓'}</button>
        <button class="delete" data-index="${index}">🗑️</button>
      </div>
    `;

    todoList.appendChild(li);
  });
  saveTodos();
}

// เพิ่ม Todo ใหม่
addTaskBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    const newTodo = {
      text: taskText,
      completed: false,
    };
    todos.push(newTodo);
    taskInput.value = '';
    renderTodos();
  }
});

// ลบ Todo ที่เลือก
todoList.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete')) {
    const index = e.target.getAttribute('data-index');
    todos.splice(index, 1);
    renderTodos();
  }

  // เปลี่ยนสถานะของ Todo เป็น completed หรือกลับกัน
  if (e.target.classList.contains('toggle')) {
    const index = e.target.getAttribute('data-index');
    todos[index].completed = !todos[index].completed;
    renderTodos();
  }
});

// ล้าง Todo ที่ทำเสร็จแล้ว
clearCompletedBtn.addEventListener('click', () => {
  todos = todos.filter(todo => !todo.completed);
  renderTodos();
});

// ล้าง Todo ทั้งหมด
clearAllBtn.addEventListener('click', () => {
  todos = [];
  renderTodos();
});

// บันทึก Todo ลงใน localStorage
function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

// เริ่มต้นการแสดงผลเมื่อโหลดหน้า
renderTodos();
