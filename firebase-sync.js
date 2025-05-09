import { db, auth } from './firebase-config.js';
import { 
    collection, 
    doc, 
    setDoc, 
    getDoc, 
    onSnapshot,
    serverTimestamp,
    runTransaction
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
        this.lastLocalVersion = 0;
        this.syncInProgress = false;
        this.lastSunbedUpdate = 0;
        this.setupAuthListener();
    }

    setupAuthListener() {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                this.isAuthenticated = true;
                this.userId = user.uid;
                await this.initializeSync();
                this.setupRealtimeListeners();
            } else {
                this.isAuthenticated = false;
                this.userId = null;
            }
        });
    }

    async initializeSync() {
        if (!this.isAuthenticated) return;

        try {
            const userRef = doc(db, 'users', this.userId);
            const userDoc = await getDoc(userRef);
            
            if (userDoc.exists()) {
                const data = userDoc.data();
                this.lastLocalVersion = data.version || 0;
                await this.mergeData(data);
            } else {
                await this.syncAllData();
            }
        } catch (error) {
            console.error('Error al inicializar sincronización:', error);
        }
    }

    async mergeData(serverData) {
        // Función específica para fusionar colores de hamacas
        const mergeSunbedColors = (local, server) => {
            const result = { ...local };
            const currentTime = Date.now();

            // Asegurarse de que los datos locales tengan timestamps
            Object.keys(result).forEach(key => {
                if (!result[key].timestamp) {
                    result[key].timestamp = currentTime;
                }
            });

            // Fusionar con datos del servidor
            for (const key in server) {
                const serverColor = server[key];
                const localColor = result[key];

                // Si el color del servidor es más reciente o no existe localmente
                if (!localColor || serverColor.timestamp > localColor.timestamp) {
                    result[key] = serverColor;
                }
            }

            return result;
        };

        // Función para comparar y fusionar datos generales
        const mergeObjects = (local, server) => {
            const result = { ...local };
            for (const key in server) {
                if (server[key] && typeof server[key] === 'object') {
                    result[key] = mergeObjects(local[key] || {}, server[key]);
                } else if (!local[key] || server[key] > local[key]) {
                    result[key] = server[key];
                }
            }
            return result;
        };

        try {
            // Fusionar datos de hamacas con manejo especial de colores
            const localSunbeds = JSON.parse(localStorage.getItem('sunbeds') || '{}');
            const serverSunbeds = serverData.sunbeds?.colors || {};
            const mergedSunbeds = mergeSunbedColors(localSunbeds, serverSunbeds);
            localStorage.setItem('sunbeds', JSON.stringify(mergedSunbeds));

            // Fusionar datos de clientes
            const localCustomers = JSON.parse(localStorage.getItem('customers') || '{}');
            const mergedCustomers = mergeObjects(localCustomers, serverData.sunbeds?.customers || {});
            localStorage.setItem('customers', JSON.stringify(mergedCustomers));

            // Fusionar datos de filas
            if (serverData.rows) {
                Object.entries(serverData.rows).forEach(([key, value]) => {
                    const localRow = JSON.parse(localStorage.getItem(key) || '{}');
                    const mergedRow = mergeObjects(localRow, value);
                    localStorage.setItem(key, JSON.stringify(mergedRow));
                });
            }

            // Fusionar datos de pagos
            if (serverData.payments) {
                const localHistory = JSON.parse(localStorage.getItem('paymentHistory') || '[]');
                const serverHistory = serverData.payments.history || [];
                const mergedHistory = [...new Set([...localHistory, ...serverHistory])];
                localStorage.setItem('paymentHistory', JSON.stringify(mergedHistory));

                // Actualizar totales solo si son más recientes
                if (serverData.payments.totalEfectivo > localStorage.getItem('totalEfectivo')) {
                    localStorage.setItem('totalEfectivo', serverData.payments.totalEfectivo);
                }
                if (serverData.payments.totalTarjeta > localStorage.getItem('totalTarjeta')) {
                    localStorage.setItem('totalTarjeta', serverData.payments.totalTarjeta);
                }
                if (serverData.payments.totalGeneral > localStorage.getItem('totalGeneral')) {
                    localStorage.setItem('totalGeneral', serverData.payments.totalGeneral);
                }
            }

            console.log('Datos fusionados exitosamente');
        } catch (error) {
            console.error('Error al fusionar datos:', error);
        }
    }

    async syncAllData() {
        if (!this.isAuthenticated || this.syncInProgress) return;

        this.syncInProgress = true;
        try {
            const userRef = doc(db, 'users', this.userId);
            
            await runTransaction(db, async (transaction) => {
                const userDoc = await transaction.get(userRef);
                const currentVersion = userDoc.exists() ? userDoc.data().version || 0 : 0;
                
                if (currentVersion > this.lastLocalVersion) {
                    await this.mergeData(userDoc.data());
                }

                // Preparar datos de hamacas con timestamps
                const sunbedsData = JSON.parse(localStorage.getItem('sunbeds') || '{}');
                const currentTime = Date.now();
                Object.keys(sunbedsData).forEach(key => {
                    if (!sunbedsData[key].timestamp) {
                        sunbedsData[key].timestamp = currentTime;
                    }
                });

                const userData = {
                    sunbeds: {
                        colors: sunbedsData,
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
                    version: currentVersion + 1,
                    lastSync: serverTimestamp()
                };

                transaction.set(userRef, userData);
                this.lastLocalVersion = currentVersion + 1;
            });

            console.log('Datos sincronizados exitosamente');
        } catch (error) {
            console.error('Error al sincronizar datos:', error);
        } finally {
            this.syncInProgress = false;
        }
    }

    setupRealtimeListeners() {
        if (!this.isAuthenticated) return;

        const userRef = doc(db, 'users', this.userId);
        onSnapshot(userRef, async (doc) => {
            if (doc.exists() && !this.syncInProgress) {
                const data = doc.data();
                if (data.version > this.lastLocalVersion) {
                    await this.mergeData(data);
                    this.lastLocalVersion = data.version;
                    console.log('Datos actualizados desde Firebase');
                }
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