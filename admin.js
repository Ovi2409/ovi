// ============================================
// Import Firebase functions
// ============================================
import { getAllSubmissions, deleteSubmission } from './firebase.js';

// ============================================
// DOM Elements
// ============================================
const loadingState = document.getElementById('loadingState');
const emptyState = document.getElementById('emptyState');
const tableContent = document.getElementById('tableContent');
const submissionsBody = document.getElementById('submissionsBody');
const searchInput = document.getElementById('searchInput');

// ============================================
// Global state
// ============================================
let allSubmissions = [];
let filteredSubmissions = [];

// ============================================
// Format date for display
// ============================================
function formatDate(dateString) {
    if (!dateString) return 'N/A';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// ============================================
// Format timestamp for display
// ============================================
function formatTimestamp(timestamp) {
    if (!timestamp) return 'N/A';
    
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// ============================================
// Render submissions table
// ============================================
function renderSubmissions(submissions) {
    submissionsBody.innerHTML = '';
    
    if (submissions.length === 0) {
        tableContent.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }
    
    tableContent.style.display = 'block';
    emptyState.style.display = 'none';
    
    submissions.forEach(submission => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${formatDate(submission.date)}</td>
            <td>${submission.time || 'N/A'}</td>
            <td>${submission.food || 'N/A'}</td>
            <td>${submission.message || 'No message'}</td>
            <td>${formatTimestamp(submission.timestamp)}</td>
            <td>
                <button class="delete-btn" data-id="${submission.id}">Delete</button>
            </td>
        `;
        
        submissionsBody.appendChild(row);
    });
    
    // Add event listeners to delete buttons
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', handleDelete);
    });
}

// ============================================
// Load all submissions from Firebase
// ============================================
async function loadSubmissions() {
    try {
        loadingState.style.display = 'block';
        emptyState.style.display = 'none';
        tableContent.style.display = 'none';
        
        allSubmissions = await getAllSubmissions();
        filteredSubmissions = [...allSubmissions];
        
        loadingState.style.display = 'none';
        renderSubmissions(filteredSubmissions);
    } catch (error) {
        console.error('Error loading submissions:', error);
        loadingState.style.display = 'none';
        emptyState.style.display = 'block';
        emptyState.innerHTML = `
            <span class="icon">⚠️</span>
            <h3>Error loading submissions</h3>
            <p>Please check your Firebase configuration and try again.</p>
        `;
    }
}

// ============================================
// Handle delete button click
// ============================================
async function handleDelete(event) {
    const deleteBtn = event.target;
    const submissionId = deleteBtn.dataset.id;
    
    // Confirm before deletion
    if (!confirm('Are you sure you want to delete this submission?')) {
        return;
    }
    
    try {
        deleteBtn.disabled = true;
        deleteBtn.textContent = 'Deleting...';
        
        await deleteSubmission(submissionId);
        
        // Remove from local state
        allSubmissions = allSubmissions.filter(sub => sub.id !== submissionId);
        filteredSubmissions = filteredSubmissions.filter(sub => sub.id !== submissionId);
        
        // Re-render table
        renderSubmissions(filteredSubmissions);
        
        console.log('Submission deleted successfully');
    } catch (error) {
        console.error('Error deleting submission:', error);
        deleteBtn.disabled = false;
        deleteBtn.textContent = 'Delete';
        alert('Failed to delete submission. Please try again.');
    }
}

// ============================================
// Search functionality
// ============================================
function filterSubmissions(searchTerm) {
    const term = searchTerm.toLowerCase().trim();
    
    if (!term) {
        filteredSubmissions = [...allSubmissions];
    } else {
        filteredSubmissions = allSubmissions.filter(submission => {
            const date = formatDate(submission.date).toLowerCase();
            const time = (submission.time || '').toLowerCase();
            const food = (submission.food || '').toLowerCase();
            const message = (submission.message || '').toLowerCase();
            const timestamp = formatTimestamp(submission.timestamp).toLowerCase();
            
            return (
                date.includes(term) ||
                time.includes(term) ||
                food.includes(term) ||
                message.includes(term) ||
                timestamp.includes(term)
            );
        });
    }
    
    renderSubmissions(filteredSubmissions);
}

// ============================================
// Search input event listener
// ============================================
searchInput.addEventListener('input', (event) => {
    filterSubmissions(event.target.value);
});

// ============================================
// Add heart emojis to background
// ============================================
function initializeHearts() {
    const heartsBackground = document.querySelector('.hearts-background');
    const heartEmojis = ['❤️', '💕', '💖', '💗', '💓', '💝', '💘', '💞'];
    
    document.querySelectorAll('.heart').forEach(heart => {
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    });
}

// ============================================
// Initialize on page load
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initializeHearts();
    loadSubmissions();
});

// ============================================
// Optional: Auto-refresh every 30 seconds
// ============================================
// Uncomment the line below to enable auto-refresh
// setInterval(loadSubmissions, 30000);
