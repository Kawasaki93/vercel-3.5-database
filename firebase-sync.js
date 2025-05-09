import { db, auth } from './firebase-config.js';
import { 
    collection, 
    doc, 
    setDoc, 
    getDoc, 
    onSnapshot,
    serverTimestamp 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

class FirebaseSync {
    constructor() {
        this.isAuthenticated = false;
        this.userId = null;
        this.setupAuthListener();
    }

    setupAuthListener() {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                this.isAuthenticated = true;
                this.userId = user.uid;
                await this.syncAllData();
                this.setupRealtimeListeners();
            } else {
                this.isAuthenticated = false;
                this.userId = null;
            }
        });
    }

    async syncAllData() {
        if (!this.isAuthenticated) return;

        const userData = {
            sunbeds: {
                colors: JSON.parse(localStorage.getItem('sunbeds') || '{}'),
                customers: JSON.parse(localStorage.getItem('customers') || '{}')
            },
            rows: {
                fila0: JSON.parse(localStorage.getItem('fila0') || '{}'),
                fila1: JSON.parse(localStorage.getItem('fila1') || '{}'),
                fila2: JSON.parse(localStorage.getItem('fila2') || '{}'),
                fila3: JSON.parse(localStorage.getItem('fila3') || '{}'),
                fila4: JSON.parse(localStorage.getItem('fila4') || '{}'),
                fila8: JSON.parse(localStorage.getItem('fila8') || '{}'),
                zonalibre1: JSON.parse(localStorage.getItem('zonalibre1') || '{}'),
                zonalibre2: JSON.parse(localStorage.getItem('zonalibre2') || '{}'),
                clon10A: JSON.parse(localStorage.getItem('clon10A') || '{}'),
                clon0: JSON.parse(localStorage.getItem('clon0') || '{}')
            },
            payments: {
                history: JSON.parse(localStorage.getItem('paymentHistory') || '[]'),
                totalEfectivo: localStorage.getItem('totalEfectivo') || '0',
                totalTarjeta: localStorage.getItem('totalTarjeta') || '0',
                totalGeneral: localStorage.getItem('totalGeneral') || '0'
            },
            lastSync: serverTimestamp()
        };

        try {
            await setDoc(doc(db, 'users', this.userId), userData);
            console.log('Datos sincronizados exitosamente');
        } catch (error) {
            console.error('Error al sincronizar datos:', error);
        }
    }

    setupRealtimeListeners() {
        if (!this.isAuthenticated) return;

        const userRef = doc(db, 'users', this.userId);
        onSnapshot(userRef, (doc) => {
            if (doc.exists()) {
                const data = doc.data();
                
                // Actualizar datos de hamacas
                if (data.sunbeds) {
                    localStorage.setItem('sunbeds', JSON.stringify(data.sunbeds.colors));
                    localStorage.setItem('customers', JSON.stringify(data.sunbeds.customers));
                }

                // Actualizar datos de filas
                if (data.rows) {
                    Object.entries(data.rows).forEach(([key, value]) => {
                        localStorage.setItem(key, JSON.stringify(value));
                    });
                }

                // Actualizar datos de pagos
                if (data.payments) {
                    localStorage.setItem('paymentHistory', JSON.stringify(data.payments.history));
                    localStorage.setItem('totalEfectivo', data.payments.totalEfectivo);
                    localStorage.setItem('totalTarjeta', data.payments.totalTarjeta);
                    localStorage.setItem('totalGeneral', data.payments.totalGeneral);
                }

                console.log('Datos actualizados desde Firebase');
            }
        });
    }

    async forceSync() {
        if (this.isAuthenticated) {
            await this.syncAllData();
        }
    }

    // Registro de usuario
    async registerUser(email, password) {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log('Usuario registrado:', userCredential.user);
            return userCredential.user;
        } catch (error) {
            console.error('Error en el registro:', error);
            throw error;
        }
    }

    // Inicio de sesión
    async loginUser(email, password) {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log('Usuario conectado:', userCredential.user);
            return userCredential.user;
        } catch (error) {
            console.error('Error en el inicio de sesión:', error);
            throw error;
        }
    }

    // Cierre de sesión
    async logoutUser() {
        try {
            await signOut(auth);
            console.log('Usuario desconectado');
        } catch (error) {
            console.error('Error en el cierre de sesión:', error);
            throw error;
        }
    }
}

// Exportar una instancia única
export const firebaseSync = new FirebaseSync(); 