import { db } from './firebase-config.js';
import { collection, doc, setDoc, getDocs, query, orderBy, limit, serverTimestamp } from 'firebase/firestore';

// Script para inicializar los datos en Firebase
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar las sunbeds en Firebase
    $('.sunbed').each(function() {
        const sunbedId = $(this).attr('id');
        const sunbedName = $(this).find('.sunbed_name').text();
        
        // Crear documento en la colección sunbeds
        setDoc(doc(db, 'sunbeds', sunbedId), {
            name: sunbedName,
            colorStep: 1,
            circleColorStep: 1,
            customerName: '',
            comments: '',
            createdAt: serverTimestamp()
        }, { merge: true });
    });

    // Cargar datos existentes
    loadExistingData();
});

async function loadExistingData() {
    try {
        // Cargar datos de las sunbeds
        const sunbedsSnapshot = await getDocs(collection(db, 'sunbeds'));
        sunbedsSnapshot.forEach((doc) => {
            const data = doc.data();
            const sunbed = document.getElementById(doc.id);
            if (sunbed) {
                // Aplicar color
                if (data.colorStep) {
                    for (let i = 1; i <= 6; i++) {
                        sunbed.classList.remove('step' + i);
                    }
                    sunbed.classList.add('step' + data.colorStep);
                    sunbed.dataset.actualStep = data.colorStep;
                }

                // Aplicar nombre del cliente
                const customerInput = sunbed.querySelector('.customer_name');
                if (customerInput && data.customerName) {
                    customerInput.value = data.customerName;
                }
            }
        });

        // Cargar historial de operaciones
        const operationsQuery = query(
            collection(db, 'operations'),
            orderBy('fecha', 'desc'),
            limit(50)
        );
        
        const operationsSnapshot = await getDocs(operationsQuery);
        const historial = document.getElementById('historial');
        historial.innerHTML = ''; // Limpiar historial existente

        operationsSnapshot.forEach((doc) => {
            const data = doc.data();
            const li = document.createElement('li');
            li.textContent = `Hamaca ${data.hamaca} - Total: €${data.total} - Recibido: €${data.recibido} - Cambio: €${data.cambio} - Método: ${data.metodo} - ${new Date(data.fecha).toLocaleString()}`;
            historial.appendChild(li);
        });
    } catch (error) {
        console.error("Error al cargar datos:", error);
    }
} 