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

// Función para sincronizar un elemento específico con Firebase
function syncElementToFirebase(path, data) {
    console.log(`Sincronizando ${path} con datos:`, data);
    const elementRef = ref(database, path);
    set(elementRef, data);
}

// Función para sincronizar localStorage con Firebase
function syncWithFirebase() {
    console.log('Iniciando sincronización completa...');
    
    // Sincronizar nombres de clientes
    $("input.customer_name").each(function() {
        const id = $(this).closest(".sunbed").attr('id');
        const value = $(this).val();
        if (value) {
            syncElementToFirebase(`customers/${id}`, { name: value });
        }
    });

    // Sincronizar colores de hamacas
    $(".sunbed").each(function() {
        const id = $(this).attr('id');
        const step = $(this).attr('data-step');
        if (step) {
            syncElementToFirebase(`sunbeds/${id}`, { step: step });
        }
    });

    // Sincronizar visibilidad de filas
    for (let i = 0; i <= 8; i++) {
        const isVisible = localStorage.getItem(`fila${i}_visible`);
        if (isVisible) {
            syncElementToFirebase(`filas/${i}`, { visible: isVisible === 'true' });
        }
    }

    // Sincronizar historial
    const historial = localStorage.getItem('historial');
    if (historial) {
        try {
            const historialData = JSON.parse(historial);
            syncElementToFirebase('historial', historialData);
        } catch (e) {
            console.error('Error al parsear historial:', e);
        }
    }

    // Sincronizar totales
    const totalSold = localStorage.getItem('total_sold');
    if (totalSold) {
        try {
            const totalData = JSON.parse(totalSold);
            syncElementToFirebase('totals', totalData);
        } catch (e) {
            console.error('Error al parsear totales:', e);
        }
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
                const value = data[id].name;
                const key = 'customer_name' + id;
                localStorage.setItem(key, value);
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
                const step = data[id].step;
                const key = 'sunbed_color' + id;
                localStorage.setItem(key, step);
                const sunbed = $(`#${id}`);
                if (sunbed.length) {
                    sunbed.attr('data-step', step);
                    updateSunbedColor(sunbed, step);
                }
            });
        }
    });

    // Cargar visibilidad de filas
    const filasRef = ref(database, 'filas');
    onValue(filasRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            Object.keys(data).forEach(filaNum => {
                const isVisible = data[filaNum].visible;
                localStorage.setItem(`fila${filaNum}_visible`, isVisible);
                updateFilaVisibility(filaNum, isVisible);
            });
        }
    });

    // Cargar historial
    const historialRef = ref(database, 'historial');
    onValue(historialRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            localStorage.setItem('historial', JSON.stringify(data));
            updateHistorialUI(data);
        }
    });

    // Cargar totales
    const totalsRef = ref(database, 'totals');
    onValue(totalsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            localStorage.setItem('total_sold', JSON.stringify(data));
            updateTotalsUI(data);
        }
    });
}

// Función para actualizar el color de una hamaca
function updateSunbedColor(sunbed, step) {
    const colors = {
        0: '#ffffff',
        1: '#ff0000',
        2: '#00ff00',
        3: '#0000ff',
        4: '#ffff00',
        5: '#ff00ff',
        6: '#00ffff'
    };
    sunbed.css('background-color', colors[step] || '#ffffff');
}

// Función para actualizar la visibilidad de una fila
function updateFilaVisibility(filaNum, isVisible) {
    const fila = $(`.sunbed[data-fila="${filaNum}"]`);
    if (isVisible) {
        fila.show();
    } else {
        fila.hide();
    }
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
    }

    // Escuchar cambios en los inputs de clientes
    $(document).on('change', 'input.customer_name', function() {
        const id = $(this).closest(".sunbed").attr('id');
        const value = $(this).val();
        const key = 'customer_name' + id;
        localStorage.setItem(key, value);
        syncElementToFirebase(`customers/${id}`, { name: value });
    });

    // Escuchar cambios en los colores de las hamacas
    $(document).on('click', '.sunbed', function() {
        const id = $(this).attr('id');
        const step = $(this).attr('data-step');
        const key = 'sunbed_color' + id;
        localStorage.setItem(key, step);
        syncElementToFirebase(`sunbeds/${id}`, { step: step });
    });

    // Escuchar cambios en la visibilidad de filas
    $('.button').on('click', function() {
        const buttonText = $(this).text();
        if (buttonText.startsWith('Fila')) {
            const filaNum = buttonText.replace('Fila', '');
            const isVisible = localStorage.getItem(`fila${filaNum}_visible`) !== 'true';
            localStorage.setItem(`fila${filaNum}_visible`, isVisible);
            syncElementToFirebase(`filas/${filaNum}`, { visible: isVisible });
        }
    });

    // Escuchar cambios en el historial
    window.addToHistorial = function(item) {
        const historial = JSON.parse(localStorage.getItem('historial') || '[]');
        historial.push(item);
        localStorage.setItem('historial', JSON.stringify(historial));
        syncElementToFirebase('historial', historial);
    };

    // Escuchar cambios en los totales
    window.updateTotals = function(totals) {
        localStorage.setItem('total_sold', JSON.stringify(totals));
        syncElementToFirebase('totals', totals);
    };
}); 