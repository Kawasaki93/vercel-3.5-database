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
    return set(elementRef, data)
        .then(() => console.log(`✅ Datos sincronizados en ${path}`))
        .catch(error => console.error(`❌ Error al sincronizar ${path}:`, error));
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
            console.log(`Sincronizando hamaca ${id} con paso ${step}`);
            syncElementToFirebase(`sunbeds/${id}`, { step: step });
        }
    });

    // Sincronizar visibilidad de filas
    for (let i = 0; i <= 8; i++) {
        const isVisible = localStorage.getItem(`fila${i}_visible`);
        if (isVisible !== null) {
            console.log(`Sincronizando fila ${i} con visibilidad ${isVisible}`);
            syncElementToFirebase(`filas/${i}`, { visible: isVisible === 'true' });
        }
    }

    // Sincronizar historial
    const historial = localStorage.getItem('historial');
    if (historial) {
        try {
            const historialData = JSON.parse(historial);
            console.log('Sincronizando historial:', historialData);
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
            console.log('Sincronizando totales:', totalData);
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
        console.log('Datos de clientes recibidos:', data);
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
        console.log('Datos de hamacas recibidos:', data);
        if (data) {
            Object.keys(data).forEach(id => {
                const step = data[id].step;
                const key = 'sunbed_color' + id;
                localStorage.setItem(key, step);
                const sunbed = $(`#${id}`);
                if (sunbed.length) {
                    console.log(`Actualizando hamaca ${id} con paso ${step}`);
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
        console.log('Datos de filas recibidos:', data);
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
        console.log('Datos de historial recibidos:', data);
        if (data) {
            localStorage.setItem('historial', JSON.stringify(data));
            updateHistorialUI(data);
        }
    });

    // Cargar totales
    const totalsRef = ref(database, 'totals');
    onValue(totalsRef, (snapshot) => {
        const data = snapshot.val();
        console.log('Datos de totales recibidos:', data);
        if (data) {
            localStorage.setItem('total_sold', JSON.stringify(data));
            updateTotalsUI(data);
        }
    });
}

// Función para actualizar el color de una hamaca
function updateSunbedColor(sunbed, step) {
    console.log(`Actualizando color de hamaca ${sunbed.attr('id')} con paso ${step}`);
    
    // Primero removemos todas las clases de step
    sunbed.removeClass('step1 step2 step3 step4 step5 step6');
    
    // Luego añadimos la clase correspondiente al step actual
    if (step) {
        sunbed.addClass(`step${step}`);
        console.log(`Añadida clase step${step}`);
    }
    
    // Actualizamos el atributo data-step
    sunbed.attr('data-step', step);
}

// Función para actualizar la visibilidad de una fila
function updateFilaVisibility(filaNum, isVisible) {
    console.log(`Actualizando visibilidad de fila ${filaNum} a ${isVisible}`);
    const fila = $(`.sunbed[data-fila="${filaNum}"]`);
    if (fila.length) {
        if (isVisible) {
            fila.show();
        } else {
            fila.hide();
        }
    } else {
        console.warn(`No se encontraron elementos para la fila ${filaNum}`);
    }
}

// Función para actualizar la UI del historial
function updateHistorialUI(historial) {
    console.log('Actualizando UI del historial:', historial);
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
    console.log('Actualizando UI de totales:', totalSold);
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
        console.log(`Cambio en nombre de cliente ${id}: ${value}`);
        const key = 'customer_name' + id;
        localStorage.setItem(key, value);
        syncElementToFirebase(`customers/${id}`, { name: value });
    });

    // Variables para el doble click
    let lastClickTime = 0;
    let lastClickId = null;

    // Escuchar cambios en los colores de las hamacas
    $(document).on('click', '.sunbed', function(e) {
        e.preventDefault();
        const id = $(this).attr('id');
        const currentTime = new Date().getTime();
        const currentStep = $(this).attr('data-step') || '1';
        
        // Solo procesar si es un doble click
        if (currentTime - lastClickTime < 300 && lastClickId === id) {
            // Es un doble click, avanzar dos pasos
            const nextStep = ((parseInt(currentStep) + 2) % 6) + 1;
            console.log(`Doble click en hamaca ${id}: de ${currentStep} a ${nextStep}`);
            const key = 'sunbed_color' + id;
            localStorage.setItem(key, nextStep);
            updateSunbedColor($(this), nextStep);
            syncElementToFirebase(`sunbeds/${id}`, { step: nextStep });
        }
        
        lastClickTime = currentTime;
        lastClickId = id;
    });

    // Escuchar cambios en la visibilidad de filas
    $('.button').on('click', function() {
        const buttonText = $(this).text();
        if (buttonText.startsWith('Fila')) {
            const filaNum = buttonText.replace('Fila', '');
            const isVisible = localStorage.getItem(`fila${filaNum}_visible`) !== 'true';
            console.log(`Cambio en visibilidad de fila ${filaNum}: ${isVisible}`);
            localStorage.setItem(`fila${filaNum}_visible`, isVisible);
            updateFilaVisibility(filaNum, isVisible);
            syncElementToFirebase(`filas/${filaNum}`, { visible: isVisible });
        }
    });

    // Escuchar cambios en el historial
    window.addToHistorial = function(item) {
        console.log('Agregando al historial:', item);
        const historial = JSON.parse(localStorage.getItem('historial') || '[]');
        historial.push(item);
        localStorage.setItem('historial', JSON.stringify(historial));
        syncElementToFirebase('historial', historial);
    };

    // Escuchar cambios en los totales
    window.updateTotals = function(totals) {
        console.log('Actualizando totales:', totals);
        localStorage.setItem('total_sold', JSON.stringify(totals));
        syncElementToFirebase('totals', totals);
    };

    // Forzar una sincronización inicial
    syncWithFirebase();
}); 