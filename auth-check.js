import { auth } from './firebase-config.js';

// Función para verificar la autenticación
export function checkAuth() {
    return new Promise((resolve, reject) => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                resolve(user);
            } else {
                window.location.href = 'login.html';
                reject('No autenticado');
            }
        });
    });
}

// Función para verificar si el usuario está en la página de login
export function checkLoginPage() {
    return new Promise((resolve) => {
        auth.onAuthStateChanged((user) => {
            if (user && window.location.pathname.includes('login.html')) {
                window.location.href = 'index.html';
            }
            resolve();
        });
    });
} 