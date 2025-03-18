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