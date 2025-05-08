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
firebase.initializeApp(firebaseConfig);

// Referencias a la base de datos
const db = firebase.firestore();
const sunbedsRef = db.collection('sunbeds');
const calculatorRef = db.collection('calculator');
const customersRef = db.collection('customers');

// Exportar las referencias para uso en otros archivos
window.db = db;
window.sunbedsRef = sunbedsRef;
window.calculatorRef = calculatorRef;
window.customersRef = customersRef; 