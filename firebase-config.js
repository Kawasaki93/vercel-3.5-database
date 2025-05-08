// Importar las funciones necesarias de Firebase
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

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
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Exportar las referencias necesarias
export { db };

// Referencias a la base de datos
const sunbedsRef = db.collection('sunbeds');
const operationsRef = db.collection('operations');
const historyRef = db.collection('history'); 