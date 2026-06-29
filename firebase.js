// ============================================
// Firebase Firestore Configuration
// ============================================
// IMPORTANT: Replace the config object below with your own Firebase project configuration
// Get your config from: https://console.firebase.google.com/
// Go to Project Settings > General > Your apps > Web app > SDK setup and configuration
// ============================================

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { 
    getFirestore, 
    collection, 
    addDoc, 
    getDocs, 
    query, 
    orderBy, 
    deleteDoc, 
    doc 
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

// Firebase configuration - REPLACE WITH YOUR OWN CONFIG
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// ============================================
// Initialize Firebase
// ============================================
let db;
let initialized = false;

function initializeFirebase() {
    try {
        const app = initializeApp(firebaseConfig);
        db = getFirestore(app);
        initialized = true;
        console.log('Firebase initialized successfully');
    } catch (error) {
        console.error('Error initializing Firebase:', error);
        console.warn('Please update firebase.js with your Firebase configuration');
    }
}

// ============================================
// Save date submission to Firestore
// ============================================
async function saveDateSubmission(data) {
    try {
        if (!initialized) {
            initializeFirebase();
        }
        
        if (!initialized) {
            console.error('Firebase not initialized. Please check your configuration.');
            return null;
        }
        
        // Save to 'dateSubmissions' collection
        const docRef = await addDoc(collection(db, 'dateSubmissions'), data);
        console.log('Document written with ID:', docRef.id);
        return docRef.id;
    } catch (error) {
        console.error('Error adding document:', error);
        throw error;
    }
}

// ============================================
// Get all date submissions from Firestore
// ============================================
async function getAllSubmissions() {
    try {
        if (!initialized) {
            initializeFirebase();
        }
        
        if (!initialized) {
            console.error('Firebase not initialized. Please check your configuration.');
            return [];
        }
        
        // Query all submissions, ordered by timestamp (newest first)
        const q = query(
            collection(db, 'dateSubmissions'),
            orderBy('timestamp', 'desc')
        );
        
        const querySnapshot = await getDocs(q);
        const submissions = [];
        
        querySnapshot.forEach((doc) => {
            submissions.push({
                id: doc.id,
                ...doc.data()
            });
        });
        
        return submissions;
    } catch (error) {
        console.error('Error getting documents:', error);
        throw error;
    }
}

// ============================================
// Delete a submission by ID
// ============================================
async function deleteSubmission(id) {
    try {
        if (!initialized) {
            initializeFirebase();
        }
        
        if (!initialized) {
            console.error('Firebase not initialized. Please check your configuration.');
            return false;
        }
        
        await deleteDoc(doc(db, 'dateSubmissions', id));
        console.log('Document deleted with ID:', id);
        return true;
    } catch (error) {
        console.error('Error deleting document:', error);
        throw error;
    }
}

// ============================================
// Export functions for use in other files
// ============================================
// Make functions available globally for script.js
window.saveDateSubmission = saveDateSubmission;
window.getAllSubmissions = getAllSubmissions;
window.deleteSubmission = deleteSubmission;

// Also export as ES modules for admin.js
export {
    saveDateSubmission,
    getAllSubmissions,
    deleteSubmission
};

// ============================================
// Auto-initialize on load
// ============================================
initializeFirebase();
