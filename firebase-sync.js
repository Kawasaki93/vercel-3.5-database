// Importar las funciones necesarias de Firebase
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBRuwdtVYdx6MMM7D46oVp3MSqV0eNAluA",
  authDomain: "playa-juan.firebaseapp.com",
  databaseURL: "https://playa-juan-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "playa-juan",
  storageBucket: "playa-juan.firebasestorage.app",
  messagingSenderId: "795761135002",
  appId: "1:795761135002:web:37df0ff598265a7237fe23",
  measurementId: "G-R0Y9P5S77S"
};

// Inicializar Firebase
const database = window.initializeFirebase(firebaseConfig);

// Función para sincronizar localStorage con Firebase
function syncWithFirebase() {
    // Sincronizar nombres de clientes
    $("input.customer_name").each(function() {
        const id = $(this).closest(".sunbed").attr('id');
        const key = 'customer_name' + id;
        const value = localStorage.getItem(key);
        
        if (value) {
            database.ref('customers/' + id).set({
                name: value
            });
        }
    });

    // Sincronizar colores de hamacas
    $(".sunbed").each(function() {
        const id = $(this).attr('id');
        const key = 'sunbed_color' + id;
        const value = localStorage.getItem(key);
        
        if (value) {
            database.ref('sunbeds/' + id).set({
                color: value
            });
        }
    });

    // Sincronizar historial
    const historial = localStorage.getItem('historial');
    if (historial) {
        database.ref('historial').set(JSON.parse(historial));
    }

    // Sincronizar totales
    const totalSold = localStorage.getItem('total_sold');
    if (totalSold) {
        database.ref('totals').set({
            totalSold: totalSold
        });
    }
}

// Función para cargar datos desde Firebase
function loadFromFirebase() {
    // Cargar nombres de clientes
    database.ref('customers').on('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
            Object.keys(data).forEach(id => {
                const key = 'customer_name' + id;
                localStorage.setItem(key, data[id].name);
            });
        }
    });

    // Cargar colores de hamacas
    database.ref('sunbeds').on('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
            Object.keys(data).forEach(id => {
                const key = 'sunbed_color' + id;
                localStorage.setItem(key, data[id].color);
            });
        }
    });

    // Cargar historial
    database.ref('historial').on('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
            localStorage.setItem('historial', JSON.stringify(data));
        }
    });

    // Cargar totales
    database.ref('totals').on('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
            localStorage.setItem('total_sold', data.totalSold);
        }
    });
}

// Función para probar la conexión con Firebase
function testFirebaseConnection() {
    const statusDiv = document.getElementById('firebaseStatus');
    statusDiv.textContent = 'Probando conexión...';
    
    // Intentar escribir un dato de prueba
    database.ref('test').set({
        timestamp: new Date().toISOString(),
        message: 'Test de conexión'
    })
    .then(() => {
        // Si la escritura es exitosa, intentar leer
        return database.ref('test').once('value');
    })
    .then((snapshot) => {
        const data = snapshot.val();
        if (data) {
            statusDiv.textContent = '✅ Conexión exitosa!';
            statusDiv.style.color = 'green';
            console.log('Datos de prueba:', data);
        } else {
            throw new Error('No se pudieron leer los datos');
        }
    })
    .catch((error) => {
        statusDiv.textContent = '❌ Error de conexión: ' + error.message;
        statusDiv.style.color = 'red';
        console.error('Error:', error);
    });
}

// Sincronizar cada 5 minutos
setInterval(syncWithFirebase, 300000);

// Cargar datos al iniciar
document.addEventListener('DOMContentLoaded', loadFromFirebase); 