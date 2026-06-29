// ==========================================
// Romantic Dating Proposal Website - JavaScript
// ==========================================

// Initialize EmailJS (Replace with your actual service ID)
emailjs.init("YOUR_EMAILJS_PUBLIC_KEY");

// Global State
const state = {
    date: null,
    time: null,
    food: null,
    message: null,
    currentPage: 1
};

// DOM Elements
const pages = {
    1: document.getElementById('page1'),
    2: document.getElementById('page2'),
    3: document.getElementById('page3'),
    4: document.getElementById('page4'),
    final: document.getElementById('finalPage')
};

const gateAnimation = document.getElementById('gateAnimation');
const gateDoor = document.getElementById('gateDoor');
const panda = document.getElementById('panda');
const bgMusic = document.getElementById('bgMusic');
const muteBtn = document.getElementById('muteBtn');
const muteIcon = document.getElementById('muteIcon');

// ==========================================
// Background Music Control
// ==========================================
let isMuted = true;

muteBtn.addEventListener('click', () => {
    if (isMuted) {
        bgMusic.play().catch(e => console.log('Audio play failed:', e));
        muteIcon.textContent = '🔊';
        isMuted = false;
    } else {
        bgMusic.pause();
        muteIcon.textContent = '🔇';
        isMuted = true;
    }
});

// ==========================================
// Flying NO Button Logic
// ==========================================
const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');

function moveNoButton() {
    const maxX = window.innerWidth - noBtn.offsetWidth - 20;
    const maxY = window.innerHeight - noBtn.offsetHeight - 20;
    
    const randomX = Math.max(20, Math.random() * maxX);
    const randomY = Math.max(20, Math.random() * maxY);
    
    noBtn.style.position = 'fixed';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
    noBtn.style.transition = 'all 0.3s ease-out';
    noBtn.style.zIndex = '1000';
}

noBtn.addEventListener('mouseover', moveNoButton);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveNoButton();
});
noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    moveNoButton();
});

// ==========================================
// YES Button - Start the Journey
// ==========================================
yesBtn.addEventListener('click', () => {
    // Play music on first interaction
    if (isMuted) {
        bgMusic.play().catch(e => console.log('Audio play failed:', e));
        muteIcon.textContent = '🔊';
        isMuted = false;
    }
    
    playGateAnimation(() => {
        showPage(2);
    });
});

// ==========================================
// Panda Gate Animation
// ==========================================
function playGateAnimation(callback) {
    gateAnimation.classList.remove('hidden');
    gateAnimation.classList.add('flex');
    
    // Reset animation
    gateDoor.style.transform = 'scaleY(1)';
    panda.style.transform = 'translateX(0) translateX(-50%)';
    panda.style.opacity = '1';
    
    // Step 1: Panda walks to gate
    setTimeout(() => {
        panda.style.transform = 'translateX(80px) translateX(-50%)';
    }, 500);
    
    // Step 2: Gate opens
    setTimeout(() => {
        gateDoor.style.transform = 'scaleY(0)';
    }, 1500);
    
    // Step 3: Panda enters gate
    setTimeout(() => {
        panda.style.transform = 'translateX(120px) translateX(-50%)';
        panda.style.opacity = '0';
    }, 2500);
    
    // Step 4: Hide animation and show next page
    setTimeout(() => {
        gateAnimation.classList.add('hidden');
        gateAnimation.classList.remove('flex');
        if (callback) callback();
    }, 3500);
}

// ==========================================
// Page Navigation
// ==========================================
function showPage(pageNum) {
    // Hide all pages
    Object.values(pages).forEach(page => {
        page.classList.add('hidden');
    });
    
    // Show target page
    if (pages[pageNum]) {
        pages[pageNum].classList.remove('hidden');
        pages[pageNum].classList.add('fade-in');
        state.currentPage = pageNum;
    }
}

// ==========================================
// Page 2: Date and Time Selection
// ==========================================
const datePicker = document.getElementById('datePicker');
const timeChips = document.querySelectorAll('.time-chip');
const page2Next = document.getElementById('page2Next');

// Set minimum date to today
const today = new Date().toISOString().split('T')[0];
datePicker.min = today;

datePicker.addEventListener('change', (e) => {
    state.date = e.target.value;
    checkPage2Complete();
});

timeChips.forEach(chip => {
    chip.addEventListener('click', () => {
        // Remove selected from all chips
        timeChips.forEach(c => c.classList.remove('selected'));
        // Add selected to clicked chip
        chip.classList.add('selected');
        state.time = chip.dataset.time;
        checkPage2Complete();
    });
});

function checkPage2Complete() {
    if (state.date && state.time) {
        page2Next.disabled = false;
    } else {
        page2Next.disabled = true;
    }
}

page2Next.addEventListener('click', () => {
    playGateAnimation(() => {
        showPage(3);
    });
});

// ==========================================
// Page 3: Food Selection
// ==========================================
const foodCards = document.querySelectorAll('.food-card');
const page3Next = document.getElementById('page3Next');

foodCards.forEach(card => {
    card.addEventListener('click', () => {
        // Remove selected from all cards
        foodCards.forEach(c => c.classList.remove('selected'));
        // Add selected to clicked card
        card.classList.add('selected');
        state.food = card.dataset.food;
        page3Next.disabled = false;
    });
});

page3Next.addEventListener('click', () => {
    playGateAnimation(() => {
        showPage(4);
    });
});

// ==========================================
// Page 4: Message and Finish
// ==========================================
const cuteMessage = document.getElementById('cuteMessage');
const finishBtn = document.getElementById('finishBtn');

finishBtn.addEventListener('click', () => {
    state.message = cuteMessage.value.trim();
    
    playGateAnimation(() => {
        showPage('final');
        displaySummary();
        startConfetti();
        sendEmail();
    });
});

// ==========================================
// Final Page: Summary
// ==========================================
function displaySummary() {
    document.getElementById('summaryDate').textContent = formatDate(state.date);
    document.getElementById('summaryTime').textContent = state.time;
    document.getElementById('summaryFood').textContent = state.food;
    document.getElementById('summaryMessage').textContent = state.message || 'No message written 💕';
}

function formatDate(dateString) {
    if (!dateString) return 'Not selected';
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// ==========================================
// EmailJS Integration
// ==========================================
async function sendEmail() {
    const emailStatus = document.getElementById('emailStatus');
    emailStatus.classList.remove('hidden', 'email-success', 'email-error');
    emailStatus.innerHTML = '<div class="loading-spinner mx-auto"></div><p class="mt-2">Sending your message...</p>';
    
    const templateParams = {
        to_email: 'mahin08muntasir09@gmail.com',
        date: state.date,
        time: state.time,
        food: state.food,
        message: state.message
    };
    
    try {
        // Replace with your actual EmailJS service ID and template ID
        await emailjs.send(
            'YOUR_EMAILJS_SERVICE_ID',
            'YOUR_EMAILJS_TEMPLATE_ID',
            templateParams
        );
        
        emailStatus.classList.add('email-success');
        emailStatus.innerHTML = '✅ Message sent successfully ❤️';
    } catch (error) {
        console.error('EmailJS Error:', error);
        emailStatus.classList.add('email-error');
        emailStatus.innerHTML = '❌ Something went wrong. Please try again.';
    }
}

// ==========================================
// Floating Hearts Animation
// ==========================================
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = ['❤️', '💕', '💖', '💗', '💓'][Math.floor(Math.random() * 5)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
    heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
    
    document.getElementById('heartsContainer').appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 7000);
}

// Create floating hearts periodically
setInterval(createFloatingHeart, 500);

// ==========================================
// Confetti Animation
// ==========================================
function startConfetti() {
    const container = document.getElementById('confettiContainer');
    const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff', '#5f27cd', '#00d2d3', '#1dd1a1'];
    
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            confetti.style.width = (Math.random() * 10 + 5) + 'px';
            confetti.style.height = (Math.random() * 10 + 5) + 'px';
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            
            container.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 4000);
        }, i * 30);
    }
}

// ==========================================
// Initialize
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // Start floating hearts immediately
    for (let i = 0; i < 5; i++) {
        setTimeout(createFloatingHeart, i * 200);
    }
    
    console.log('🌸 Romantic Dating Proposal Website Loaded 🌸');
});
