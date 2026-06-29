// ============================================
// Import Firebase functions
// ============================================
import { saveDateSubmission } from './firebase.js';

// ============================================
// Global state to store user selections
// ============================================
const dateData = {
    date: null,
    time: null,
    food: null,
    message: ''
};

// ============================================
// DOM Elements
// ============================================
const steps = {
    step1: document.getElementById('step1'),
    step2: document.getElementById('step2'),
    step3: document.getElementById('step3'),
    step4: document.getElementById('step4'),
    step5: document.getElementById('step5'),
    step6: document.getElementById('step6')
};

// ============================================
// Initialize date picker with minimum date (today)
// ============================================
function initializeDatePicker() {
    const datePicker = document.getElementById('datePicker');
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // Format as YYYY-MM-DD for input
    const minDate = tomorrow.toISOString().split('T')[0];
    datePicker.min = minDate;
}

// ============================================
// Step navigation function with smooth transitions
// ============================================
function goToStep(currentStep, nextStep) {
    // Hide current step
    steps[currentStep].classList.remove('active');
    
    // Show next step after a short delay for smooth transition
    setTimeout(() => {
        steps[nextStep].classList.add('active');
    }, 100);
}

// ============================================
// Step 1: YES button handler
// ============================================
document.getElementById('yesBtn').addEventListener('click', () => {
    goToStep('step1', 'step2');
});

// ============================================
// Step 2: Date picker and next button
// ============================================
const datePicker = document.getElementById('datePicker');
const dateNextBtn = document.getElementById('dateNextBtn');

datePicker.addEventListener('change', (e) => {
    dateData.date = e.target.value;
});

dateNextBtn.addEventListener('click', () => {
    if (!dateData.date) {
        alert('Please select a date 💕');
        return;
    }
    goToStep('step2', 'step3');
});

// ============================================
// Step 3: Time selection
// ============================================
const timeButtons = document.querySelectorAll('.time-btn');
const timeNextBtn = document.getElementById('timeNextBtn');

timeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove selected class from all buttons
        timeButtons.forEach(b => b.classList.remove('selected'));
        // Add selected class to clicked button
        btn.classList.add('selected');
        // Store selected time
        dateData.time = btn.dataset.time;
    });
});

timeNextBtn.addEventListener('click', () => {
    if (!dateData.time) {
        alert('Please select a time 💕');
        return;
    }
    goToStep('step3', 'step4');
});

// ============================================
// Step 4: Food selection
// ============================================
const foodButtons = document.querySelectorAll('.food-btn');
const foodNextBtn = document.getElementById('foodNextBtn');

foodButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove selected class from all buttons
        foodButtons.forEach(b => b.classList.remove('selected'));
        // Add selected class to clicked button
        btn.classList.add('selected');
        // Store selected food
        dateData.food = btn.dataset.food;
    });
});

foodNextBtn.addEventListener('click', () => {
    if (!dateData.food) {
        alert('Please select a food option 💕');
        return;
    }
    goToStep('step4', 'step5');
});

// ============================================
// Step 5: Message input (optional)
// ============================================
const messageInput = document.getElementById('messageInput');
const messageNextBtn = document.getElementById('messageNextBtn');

messageInput.addEventListener('input', (e) => {
    dateData.message = e.target.value;
});

messageNextBtn.addEventListener('click', () => {
    goToStep('step5', 'step6');
    // Display confirmation and save data
    displayConfirmation();
    saveToFirestore();
});

// ============================================
// Step 6: Display confirmation details
// ============================================
function displayConfirmation() {
    // Format date for display
    const dateObj = new Date(dateData.date);
    const formattedDate = dateObj.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    document.getElementById('confirmDate').textContent = formattedDate;
    document.getElementById('confirmTime').textContent = dateData.time;
    document.getElementById('confirmFood').textContent = dateData.food;
    
    // Handle optional message
    const messageDetail = document.getElementById('messageDetail');
    if (dateData.message && dateData.message.trim()) {
        document.getElementById('confirmMessage').textContent = dateData.message;
        messageDetail.style.display = 'flex';
    } else {
        messageDetail.style.display = 'none';
    }
    
    // Launch confetti animation
    launchConfetti();
}

// ============================================
// Save data to Firebase Firestore
// ============================================
async function saveToFirestore() {
    try {
        // Add timestamp to data
        const submissionData = {
            ...dateData,
            timestamp: new Date().toISOString()
        };
        
        // Call the save function from firebase.js
        await saveDateSubmission(submissionData);
        console.log('Data saved successfully!');
    } catch (error) {
        console.error('Error saving data:', error);
    }
}

// ============================================
// Confetti Animation
// ============================================
function launchConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Confetti particles
    const particles = [];
    const colors = ['#FFB6C1', '#FF9AAB', '#FF69B4', '#FF1493', '#FFC0CB', '#FFD700'];
    
    // Create particles
    for (let i = 0; i < 150; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            size: Math.random() * 10 + 5,
            color: colors[Math.floor(Math.random() * colors.length)],
            speedY: Math.random() * 3 + 2,
            speedX: Math.random() * 2 - 1,
            rotation: Math.random() * 360,
            rotationSpeed: Math.random() * 5 - 2.5
        });
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach((particle, index) => {
            // Update position
            particle.y += particle.speedY;
            particle.x += particle.speedX;
            particle.rotation += particle.rotationSpeed;
            
            // Reset particle if it goes off screen
            if (particle.y > canvas.height) {
                particle.y = -20;
                particle.x = Math.random() * canvas.width;
            }
            
            // Draw particle
            ctx.save();
            ctx.translate(particle.x, particle.y);
            ctx.rotate(particle.rotation * Math.PI / 180);
            ctx.fillStyle = particle.color;
            ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
            ctx.restore();
        });
        
        // Continue animation for 5 seconds
        if (Date.now() - startTime < 5000) {
            requestAnimationFrame(animate);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }
    
    const startTime = Date.now();
    animate();
}

// ============================================
// Handle window resize for confetti canvas
// ============================================
window.addEventListener('resize', () => {
    const canvas = document.getElementById('confettiCanvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// ============================================
// Initialize on page load
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initializeDatePicker();
    
    // Add heart emojis to background
    const heartsBackground = document.querySelector('.hearts-background');
    const heartEmojis = ['❤️', '💕', '💖', '💗', '💓', '💝', '💘', '💞'];
    
    document.querySelectorAll('.heart').forEach(heart => {
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    });
});
