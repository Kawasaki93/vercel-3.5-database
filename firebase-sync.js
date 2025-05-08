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

// Función para sanitizar una clave
function sanitizeKey(key) {
    return key.replace(/[.#$\/\[\]]/g, '_');
}

// Función para sanitizar un objeto
function sanitizeData(data) {
    if (typeof data !== 'object' || data === null) {
        return data;
    }

    if (Array.isArray(data)) {
        return data.map(item => sanitizeData(item));
    }

    const sanitized = {};
    for (const [key, value] of Object.entries(data)) {
        const sanitizedKey = sanitizeKey(key);
        sanitized[sanitizedKey] = typeof value === 'object' ? sanitizeData(value) : value;
    }
    return sanitized;
}

// Función para sincronizar un elemento específico con Firebase
function syncElementToFirebase(key, data) {
    console.log(`Sincronizando ${key} con datos:`, data);
    const sanitizedKey = sanitizeKey(key);
    const sanitizedData = sanitizeData(data);
    const elementRef = ref(database, `app_data/${sanitizedKey}`);
    return set(elementRef, sanitizedData)
        .then(() => console.log(`✅ Datos sincronizados en ${sanitizedKey}`))
        .catch(error => console.error(`❌ Error al sincronizar ${sanitizedKey}:`, error));
}

// Función para sincronizar todo el localStorage con Firebase
function syncAllLocalStorageToFirebase() {
    console.log('Sincronizando todo el localStorage con Firebase...');
    
    // Obtener todas las claves del localStorage
    const allKeys = Object.keys(localStorage);
    const dataToSync = {};
    
    allKeys.forEach(key => {
        try {
            // Intentar parsear el valor como JSON
            const value = JSON.parse(localStorage.getItem(key));
            dataToSync[key] = value;
        } catch (e) {
            // Si no es JSON, guardar como string
            dataToSync[key] = localStorage.getItem(key);
        }
    });
    
    console.log('Datos a sincronizar:', dataToSync);
    
    // Sincronizar todos los datos a Firebase
    return syncElementToFirebase('all_data', dataToSync);
}

// Función para cargar datos desde Firebase
function loadFromFirebase() {
    console.log('Cargando datos desde Firebase...');
    
    // Cargar todos los datos del localStorage
    const localStorageRef = ref(database, 'app_data/all_data');
    onValue(localStorageRef, (snapshot) => {
        const data = snapshot.val();
        console.log('Datos recibidos de Firebase:', data);
        
        if (data) {
            Object.keys(data).forEach(key => {
                try {
                    const value = data[key];
                    if (typeof value === 'object') {
                        localStorage.setItem(key, JSON.stringify(value));
                    } else {
                        localStorage.setItem(key, value);
                    }
                } catch (e) {
                    console.error(`Error al guardar ${key} en localStorage:`, e);
                }
            });
            
            // Actualizar la UI
            updateUIWithLoadedData();
        }
    });
}

// Función para actualizar la UI con los datos cargados
function updateUIWithLoadedData() {
    console.log('Actualizando UI con datos cargados...');
    
    // Actualizar nombres de clientes
    $("input.customer_name").each(function() {
        const id = $(this).closest(".sunbed").attr('id');
        const value = localStorage.getItem('customer_name' + id);
        if (value) {
            $(this).val(value);
        }
    });

    // Actualizar colores de hamacas
    $(".sunbed").each(function() {
        const id = $(this).attr('id');
        const step = localStorage.getItem('sunbed_color' + id);
        if (step) {
            console.log(`Actualizando color de hamaca ${id} con paso ${step}`);
            updateSunbedColor($(this), step);
        }
    });

    // Actualizar visibilidad de filas
    for (let i = 0; i <= 8; i++) {
        const isVisible = localStorage.getItem(`fila${i}_visible`);
        if (isVisible !== null) {
            updateFilaVisibility(i, isVisible === 'true');
        }
    }
}

// Función para actualizar el color de una hamaca
function updateSunbedColor(sunbed, step) {
    console.log(`Actualizando color de hamaca ${sunbed.attr('id')} con paso ${step}`);
    
    // Remover todas las clases de step existentes
    for (let i = 1; i <= 6; i++) {
        sunbed.removeClass('step' + i);
    }
    
    // Añadir la nueva clase
    sunbed.addClass('step' + step);
    
    // Actualizar el atributo data-step
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
    }
}

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM cargado, inicializando Firebase...');
    
    // Cargar datos iniciales desde Firebase
    loadFromFirebase();

    // Escuchar cambios en los inputs de clientes
    $(document).on('change', 'input.customer_name', function() {
        const id = $(this).closest(".sunbed").attr('id');
        const value = $(this).val();
        console.log(`Cambio en nombre de cliente ${id}: ${value}`);
        const key = 'customer_name' + id;
        localStorage.setItem(key, value);
        syncElementToFirebase(key, value);
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
            syncElementToFirebase(key, nextStep);
            updateSunbedColor($(this), nextStep);
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
            const key = `fila${filaNum}_visible`;
            localStorage.setItem(key, isVisible);
            syncElementToFirebase(key, isVisible);
            updateFilaVisibility(filaNum, isVisible);
        }
    });

    // Sincronizar cada 2 segundos
    setInterval(syncAllLocalStorageToFirebase, 2000);
}); 