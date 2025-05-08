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

// Función para sincronizar un elemento específico con Firebase
function syncElementToFirebase(id, type, value) {
    console.log(`Sincronizando ${type} ${id} con valor:`, value);
    const elementRef = ref(database, `${type}/${id}`);
    set(elementRef, { value: value });
}

// Función para sincronizar localStorage con Firebase
function syncWithFirebase() {
    console.log('Iniciando sincronización completa...');
    
    // Sincronizar nombres de clientes
    $("input.customer_name").each(function() {
        const id = $(this).closest(".sunbed").attr('id');
        const key = 'customer_name' + id;
        const value = localStorage.getItem(key);
        
        if (value) {
            syncElementToFirebase(id, 'customers', value);
        }
    });

    // Sincronizar colores de hamacas
    $(".sunbed").each(function() {
        const id = $(this).attr('id');
        const key = 'sunbed_color' + id;
        const value = localStorage.getItem(key);
        
        if (value) {
            syncElementToFirebase(id, 'sunbeds', value);
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
    console.log('Cargando datos desde Firebase...');
    
    // Cargar nombres de clientes
    const customersRef = ref(database, 'customers');
    onValue(customersRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            Object.keys(data).forEach(id => {
                const key = 'customer_name' + id;
                const value = data[id].value;
                localStorage.setItem(key, value);
                // Actualizar UI
                const input = $(`#${id} input.customer_name`);
                if (input.length) {
                    input.val(value);
                }
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
                const value = data[id].value;
                localStorage.setItem(key, value);
                // Actualizar UI
                const sunbed = $(`#${id}`);
                if (sunbed.length) {
                    sunbed.attr('data-step', value);
                    sunbed.css('background-color', getColorForStep(value));
                }
            });
        }
    });

    // Cargar historial
    const historialRef = ref(database, 'historial');
    onValue(historialRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            localStorage.setItem('historial', JSON.stringify(data));
            // Actualizar UI del historial
            updateHistorialUI(data);
        }
    });

    // Cargar totales
    const totalsRef = ref(database, 'totals');
    onValue(totalsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            localStorage.setItem('total_sold', data.totalSold);
            // Actualizar UI de totales
            updateTotalsUI(data.totalSold);
        }
    });
}

// Función para actualizar la UI del historial
function updateHistorialUI(historial) {
    const historialList = $('#historial');
    historialList.empty();
    
    if (Array.isArray(historial)) {
        historial.forEach(item => {
            historialList.append(`<li>${item}</li>`);
        });
    }
}

// Función para actualizar la UI de totales
function updateTotalsUI(totalSold) {
    $('#totalEfectivo').text(totalSold.efectivo || '0.00');
    $('#totalTarjeta').text(totalSold.tarjeta || '0.00');
    $('#totalGeneral').text(totalSold.general || '0.00');
}

// Función para obtener el color según el paso
function getColorForStep(step) {
    const colors = {
        0: '#ffffff',
        1: '#ff0000',
        2: '#00ff00',
        3: '#0000ff',
        4: '#ffff00',
        5: '#ff00ff',
        6: '#00ffff'
    };
    return colors[step] || '#ffffff';
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

    // Escuchar cambios en los inputs de clientes
    $(document).on('change', 'input.customer_name', function() {
        const id = $(this).closest(".sunbed").attr('id');
        const value = $(this).val();
        const key = 'customer_name' + id;
        localStorage.setItem(key, value);
        syncElementToFirebase(id, 'customers', value);
    });

    // Escuchar cambios en los colores de las hamacas
    $(document).on('click', '.sunbed', function() {
        const id = $(this).attr('id');
        const step = $(this).attr('data-step');
        const key = 'sunbed_color' + id;
        localStorage.setItem(key, step);
        syncElementToFirebase(id, 'sunbeds', step);
    });
}); 