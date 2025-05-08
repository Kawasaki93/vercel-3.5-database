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
    
    // Intentar escribir un dato de prueba
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

// Función para sincronizar localStorage con Firebase
function syncWithFirebase() {
    // Sincronizar nombres de clientes
    $("input.customer_name").each(function() {
        const id = $(this).closest(".sunbed").attr('id');
        const key = 'customer_name' + id;
        const value = localStorage.getItem(key);
        
        if (value) {
            const customerRef = ref(database, 'customers/' + id);
            set(customerRef, {
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
            const sunbedRef = ref(database, 'sunbeds/' + id);
            set(sunbedRef, {
                color: value
            });
        }
    });

    // Sincronizar historial
    const historial = localStorage.getItem('historial');
    if (historial) {
        const historialRef = ref(database, 'historial');
        set(historialRef, JSON.parse(historial));
    }

    // Sincronizar totales
    const totalSold = localStorage.getItem('total_sold');
    if (totalSold) {
        const totalsRef = ref(database, 'totals');
        set(totalsRef, {
            totalSold: totalSold
        });
    }
}

// Función para cargar datos desde Firebase
function loadFromFirebase() {
    // Cargar nombres de clientes
    const customersRef = ref(database, 'customers');
    onValue(customersRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            Object.keys(data).forEach(id => {
                const key = 'customer_name' + id;
                localStorage.setItem(key, data[id].name);
            });
        }
    });

    // Cargar colores de hamacas
    const sunbedsRef = ref(database, 'sunbeds');
    onValue(sunbedsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            Object.keys(data).forEach(id => {
                const key = 'sunbed_color' + id;
                localStorage.setItem(key, data[id].color);
            });
        }
    });

    // Cargar historial
    const historialRef = ref(database, 'historial');
    onValue(historialRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            localStorage.setItem('historial', JSON.stringify(data));
        }
    });

    // Cargar totales
    const totalsRef = ref(database, 'totals');
    onValue(totalsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            localStorage.setItem('total_sold', data.totalSold);
        }
    });
}

// Sincronizar cada 5 minutos
setInterval(syncWithFirebase, 300000);

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM cargado, inicializando Firebase...');
    loadFromFirebase();
    
    // Agregar el evento click al botón de prueba
    const testButton = document.getElementById('testFirebaseBtn');
    if (testButton) {
        testButton.addEventListener('click', testFirebaseConnection);
    } else {
        console.error('No se encontró el botón de prueba de Firebase');
    }
}); 