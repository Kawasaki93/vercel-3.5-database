// Importar las funciones necesarias de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, set, onValue, get } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

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
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Función para probar la conexión con Firebase
function testFirebaseConnection() {
    console.log('Iniciando prueba de Firebase...');
    const statusDiv = document.getElementById('firebaseStatus');
    if (!statusDiv) {
        console.error('No se encontró el elemento firebaseStatus');
        return;
    }
    
    statusDiv.textContent = 'Probando conexión...';
    console.log('Intentando escribir en Firebase...');
    
    const testRef = ref(database, 'test');
    set(testRef, {
        timestamp: new Date().toISOString(),
        message: 'Test de conexión'
    })
    .then(() => {
        console.log('Escritura exitosa, intentando leer...');
        return get(testRef);
    })
    .then((snapshot) => {
        const data = snapshot.val();
        console.log('Datos leídos:', data);
        if (data) {
            statusDiv.textContent = '✅ Conexión exitosa!';
            statusDiv.style.color = 'green';
        } else {
            throw new Error('No se pudieron leer los datos');
        }
    })
    .catch((error) => {
        console.error('Error en la prueba:', error);
        statusDiv.textContent = '❌ Error de conexión: ' + error.message;
        statusDiv.style.color = 'red';
    });
}

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM cargado, inicializando Firebase...');
    
    // Agregar el evento click al botón de prueba
    const testButton = document.getElementById('testFirebaseBtn');
    if (testButton) {
        testButton.addEventListener('click', testFirebaseConnection);
    }
}); 