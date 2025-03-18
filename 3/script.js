const tabButtons = document.querySelectorAll('.tab-btn');

tabButtons.forEach(button => {
  button.addEventListener('click', function() {
    // Remove active class from all buttons and panes
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    
    document.querySelectorAll('.tab-pane').forEach(pane => {
      pane.classList.remove('active');
    });
    
    // Add active class to current button and corresponding pane
    this.classList.add('active');
    const tabId = this.getAttribute('data-tab');
    document.getElementById(tabId).classList.add('active');
  });
});


/* Slid Bar*/
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let slideInterval;

function showSlide(index) {
  // จัดการกับดัชนีที่ไม่ถูกต้อง
  if (index < 0) {
    currentSlide = slides.length - 1;
  } else if (index >= slides.length) {
    currentSlide = 0;
  } else {
    currentSlide = index;
  }
  
  // ลบคลาส active จากทุกสไลด์และจุด
  slides.forEach(slide => {
    slide.classList.remove('active');
  });
  
  dots.forEach(dot => {
    dot.classList.remove('active');
  });
  
  // เพิ่มคลาส active ให้กับสไลด์และจุดปัจจุบัน
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}

// เพิ่ม event listeners
document.querySelector('.next').addEventListener('click', () => {
  showSlide(currentSlide + 1); // เปลี่ยนเป็นสไลด์ถัดไป
  resetTimer();
});

document.querySelector('.prev').addEventListener('click', () => {
  showSlide(currentSlide - 1); // เปลี่ยนเป็นสไลด์ก่อนหน้า
  resetTimer();
});

dots.forEach(dot => {
  dot.addEventListener('click', function() {
    const slideIndex = parseInt(this.getAttribute('data-index'));
    showSlide(slideIndex); // เปลี่ยนไปยังสไลด์ที่เลือกจาก dot
    resetTimer();
  });
});

// ตั้งค่าสไลด์อัตโนมัติ
function startSlideTimer() {
  slideInterval = setInterval(() => {
    showSlide(currentSlide + 1); // เลื่อนสไลด์ถัดไปทุก ๆ 3 วินาที
  }, 3000);
}

function resetTimer() {
  clearInterval(slideInterval); // หยุดตัวจับเวลาเดิม
  startSlideTimer(); // เริ่มต้นตัวจับเวลาใหม่
}

// เริ่มต้นสไลด์อัตโนมัติเมื่อโหลดหน้า
startSlideTimer();


// Todo-List
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