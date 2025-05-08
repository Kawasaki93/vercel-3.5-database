if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then((reg) => {
      console.log("Service Worker registrado", reg);
    }).catch((err) => {
      console.error("Error al registrar el Service Worker", err);
    });
  });
}



let variable1;
for (var x = 1; x < 126; x++) {
  let cloned_element = $(".sunbed").first().clone();
  cloned_element.attr("id", "clon_" + x);

  if (x === 10) {
    cloned_element.find(".sunbed_name").html(82); // Asigna 85 al clon número 10
} else if (x === 9) {
    cloned_element.find(".sunbed_name").html(83); // Asigna 84 al clon número 9
} else if (x === 8) {
    cloned_element.find(".sunbed_name").html(82); // Asigna 83 al clon número 8
} else if (x === 11) {
    cloned_element.find(".sunbed_name").html(81); // Asigna 82 al clon número 11
} else if (x === 12) {
    cloned_element.find(".sunbed_name").html(80); // Asigna 81 al clon número 12
} else if (x === 19) {
    cloned_element.find(".sunbed_name").html(77); // Asigna 80 al clon número 13
} else if (x === 14) {
    cloned_element.find(".sunbed_name").html(79); // Asigna 79 al clon número 14
} else if (x === 20) {
    cloned_element.find(".sunbed_name").html(76); // Asigna 78 al clon número 20
} else if (x === 16 || x === 17 || x === 18) {
    cloned_element.find(".sunbed_name").html("M"); // Cambia el contenido de los clones 17, 18 y 19 a "X"
} else if (x === 21) {
    cloned_element.find(".sunbed_name").html(75); // Asigna 77 al clon número 21
} else if (x === 22) {
    cloned_element.find(".sunbed_name").html(74); // Asigna 76 al clon número 22
} else if (x === 23) {
    cloned_element.find(".sunbed_name").html(73); // Asigna 75 al clon número 23
} else if (x === 24) {
    cloned_element.find(".sunbed_name").html(72); // Asigna 73 al clon número 24
} else if (x === 25) {
    cloned_element.find(".sunbed_name").html(71); // Asigna 72 al clon número 25
} else if (x === 26) {
    cloned_element.find(".sunbed_name").html(70); // Asigna 71 al clon número 26
} else if (x === 27) {
    cloned_element.find(".sunbed_name").html(70); // Asigna 70 al clon número 27
} else if (x === 28) {
    cloned_element.find(".sunbed_name").html("69C"); // Asigna 69C al clon número 28
} else if (x === 29) {
    cloned_element.find(".sunbed_name").html("69B"); // Asigna 69B al clon número 29
} else if (x === 30) {
    cloned_element.find(".sunbed_name").html("69A"); // Asigna 69A al clon número 30
} else if (x === 31) {
    cloned_element.find(".sunbed_name").html(69); // Asigna 69 al clon número 31
} else if (x === 32) {
    cloned_element.find(".sunbed_name").html(68); // Asigna 68 al clon número 32
} else if (x === 33) {
    cloned_element.find(".sunbed_name").html(67); // Asigna 67 al clon número 33
} else if (x === 34) {
    cloned_element.find(".sunbed_name").html(66); // Asigna 66 al clon número 34
} else if (x === 35) {
    cloned_element.find(".sunbed_name").html(65); // Asigna 65 al clon número 35
} else if (x === 36) {
    cloned_element.find(".sunbed_name").html(64); // Asigna 64 al clon número 36
} else if (x === 37) {
    cloned_element.find(".sunbed_name").html(63); // Asigna 63 al clon número 37
} else if (x === 38) {
    cloned_element.find(".sunbed_name").html(62); // Asigna 62 al clon número 38
} else if (x === 39) {
    cloned_element.find(".sunbed_name").html(61); // Asigna 62 al clon número 38
} else if (x === 40) {
    cloned_element.find(".sunbed_name").html(60); // Asigna 62 al clon número 38
} else if (x === 42) {
    cloned_element.find(".sunbed_name").html("59C"); // Asigna 59C al clon número 39
} else if (x === 43) {
    cloned_element.find(".sunbed_name").html("59B"); // Asigna 59B al clon número 40
} else if (x === 44) {
    cloned_element.find(".sunbed_name").html("59A"); // Asigna 59A al clon número 41
}  else if (x === 45) {
    cloned_element.find(".sunbed_name").html(59); // Asigna 59 al clon número 45
} else if (x === 46) {
    cloned_element.find(".sunbed_name").html(58); // Asigna 58 al clon número 46
} else if (x === 47) {
    cloned_element.find(".sunbed_name").html(57); // Asigna 57 al clon número 47
} else if (x === 48) {
    cloned_element.find(".sunbed_name").html(56); // Asigna 56 al clon número 48
}  else if (x === 49) {
    cloned_element.find(".sunbed_name").html(55); // Asigna 55 al clon número 49
} else if (x === 50) {
    cloned_element.find(".sunbed_name").html(54); // Asigna 54 al clon número 50
} else if (x === 51) {
    cloned_element.find(".sunbed_name").html(53); // Asigna 53 al clon número 51
} else if (x === 52) {
    cloned_element.find(".sunbed_name").html(52); // Asigna 52 al clon número 52
} else if (x === 53) {
    cloned_element.find(".sunbed_name").html(51); // Asigna 51 al clon número 53
} else if (x === 54) {
    cloned_element.find(".sunbed_name").html(50); // Asigna 50 al clon número 54
} else if (x === 56) {
    cloned_element.find(".sunbed_name").html("49C");
} else if (x === 57) {
    cloned_element.find(".sunbed_name").html("49B");
} else if (x === 58) {
    cloned_element.find(".sunbed_name").html("49A");
} else if (x === 59) {
    cloned_element.find(".sunbed_name").html(49);
}  else if (x === 60) {
    cloned_element.find(".sunbed_name").html(48);
} else if (x === 61) {
    cloned_element.find(".sunbed_name").html(47);
} else if (x === 62) {
    cloned_element.find(".sunbed_name").html(46);
} else if (x === 63) {
    cloned_element.find(".sunbed_name").html(45);
}else if (x === 64) {
    cloned_element.find(".sunbed_name").html(44);
} else if (x === 65) {
    cloned_element.find(".sunbed_name").html(43);
} else if (x === 66) {
    cloned_element.find(".sunbed_name").html(42);
} else if (x === 67) {
    cloned_element.find(".sunbed_name").html(41);
} else if (x === 68) {
    cloned_element.find(".sunbed_name").html(40);
} else if (x === 70) {
    cloned_element.find(".sunbed_name").html("39C");
} else if (x === 71) {
    cloned_element.find(".sunbed_name").html("39B");
} else if (x === 72) {
    cloned_element.find(".sunbed_name").html("39A");
} else if (x === 73) {
    cloned_element.find(".sunbed_name").html("39");
} else if (x === 74) {
    cloned_element.find(".sunbed_name").html(38);
} else if (x === 75) {
    cloned_element.find(".sunbed_name").html(37);
} else if (x === 76) {
    cloned_element.find(".sunbed_name").html(36);
} else if (x === 77) {
    cloned_element.find(".sunbed_name").html(35);
} else if (x === 78) {
    cloned_element.find(".sunbed_name").html(34);
} else if (x === 79) {
    cloned_element.find(".sunbed_name").html(33);
} else if (x === 80) {
    cloned_element.find(".sunbed_name").html(32);
} else if (x === 81) {
    cloned_element.find(".sunbed_name").html(31);
} else if (x === 82) {
    cloned_element.find(".sunbed_name").html(30);
} else if (x === 84) {
    cloned_element.find(".sunbed_name").html("29C");
} else if (x === 85) {
    cloned_element.find(".sunbed_name").html("29B");
} else if (x === 86) {
    cloned_element.find(".sunbed_name").html("29A");
} else if (x === 87) {
    cloned_element.find(".sunbed_name").html(29);
} else if (x === 88) {
    cloned_element.find(".sunbed_name").html(28);
}  else if (x === 89) {
    cloned_element.find(".sunbed_name").html(27);
} else if (x === 90) {
    cloned_element.find(".sunbed_name").html(26);
} else if (x === 91) {
    cloned_element.find(".sunbed_name").html(25);
} else if (x === 92) {
    cloned_element.find(".sunbed_name").html(24);
} else if (x === 93) {
    cloned_element.find(".sunbed_name").html(23);
} else if (x === 94) {
    cloned_element.find(".sunbed_name").html(22);
} else if (x === 95) {
    cloned_element.find(".sunbed_name").html(21);
}  else if (x === 96) {
    cloned_element.find(".sunbed_name").html(20);
} else if (x === 98) {
    cloned_element.find(".sunbed_name").html("19C");
} else if (x === 99) {
    cloned_element.find(".sunbed_name").html("19B");
} else if (x === 100) {
    cloned_element.find(".sunbed_name").html("19A");
} else if (x === 101) {
    cloned_element.find(".sunbed_name").html(19);
} else if (x === 102) {
    cloned_element.find(".sunbed_name").html(18);
} else if (x === 103) {
    cloned_element.find(".sunbed_name").html(17);
}  else if (x === 104) {
    cloned_element.find(".sunbed_name").html(16);
} else if (x === 105) {
    cloned_element.find(".sunbed_name").html(15);
} else if (x === 106) {
    cloned_element.find(".sunbed_name").html(14);
} else if (x === 107) {
    cloned_element.find(".sunbed_name").html(13);
} else if (x === 108) {
    cloned_element.find(".sunbed_name").html(12);
} else if (x === 109) {
    cloned_element.find(".sunbed_name").html(11);
} else if (x === 110) {
    cloned_element.find(".sunbed_name").html(10);
} else if (x === 111) {
    cloned_element.find(".sunbed_name").html("10A");
}    
  else if (x === 112) {
    cloned_element.find(".sunbed_name").html("9D");
} else if (x === 113) {
    cloned_element.find(".sunbed_name").html("9C");
} else if (x === 114) {
    cloned_element.find(".sunbed_name").html("9B");
} else if (x === 115) {
    cloned_element.find(".sunbed_name").html("9A");
} else if (x === 116) {
    cloned_element.find(".sunbed_name").html(9);
} else if (x === 117) {
    cloned_element.find(".sunbed_name").html(8);
} else if (x === 118) {
    cloned_element.find(".sunbed_name").html(7);
} else if (x === 119) {
    cloned_element.find(".sunbed_name").html(6);
} else if (x === 120) {
    cloned_element.find(".sunbed_name").html(5);
} else if (x === 121) {
    cloned_element.find(".sunbed_name").html(4);
} else if (x === 122) {
    cloned_element.find(".sunbed_name").html(3);
} else if (x === 123) {
    cloned_element.find(".sunbed_name").html(2);
} else if (x === 124) {
    cloned_element.find(".sunbed_name").html(1);
} else if (x === 125) {
    cloned_element.find(".sunbed_name").html(0);



}


  $(".beach_wrapper").append(cloned_element);
}

//CLONES------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//CLONES COLOR NARANJA
$("#clon_126,#clon_127,#clon_128,#clon_129,#clon_130,#clon_131,#clon_132,#clon_133,#clon_134,#clon_135,#clon_136,#clon_137,#clon_138,#clon_139,#clon_140,#clon_141,#clon_142,#clon_143,#clon_144,#clon_145,#clon_146,#clon_147,#clon_148,#clon_149,#clon_150,#clon_151,#clon_152,#clon_153,#clon_154,#clon_155,#clon_156,#clon_157,#clon_158,#clon_159,#clon_160,#clon_161,#clon_162,#clon_163,#clon_164,#clon_165,#clon_166,#clon_167,#clon_168,#clon_169,#clon_170,#clon_171,#clon_172,#clon_173,#clon_174,#clon_175,#clon_176,#clon_177,#clon_178,#clon_179,#clon_180,#clon_181,#clon_182,#clon_183,#clon_184,#clon_185,#clon_186,#clon_187,#clon_188,#clon_189,#clon_190,#clon_191,#clon_199").addClass('especiales');
//CLONES DESCONECTADOS GENERALES
$("#clon_1,#clon_2,#clon_3,#clon_4,#clon_5,#clon_6,#clon_7,#clon_8,#clon_11,#clon_13,#clon_27,#clon_41,#clon_55,#clon_69,#clon_83,#clon_97").addClass('desconectadosgeneral');
//CLON 10A y CLON 0
$("#clon_111").addClass("clon10A")
$("#clon_125").addClass("clon0")
//CLONES DESCONECTADOS FILA 0
$("#clon_112,#clon_113,#clon_114,#clon_115,#clon_116,#clon_117,#clon_118,#clon_119,#clon_120,#clon_121,#clon_122,#clon_123,#clon_124").addClass("desconectadosFila0");
//CLONES DESCONECTADOS FILA 1
$("#clon_98,#clon_99,#clon_100,#clon_101,#clon_102,#clon_103,#clon_104,#clon_105,#clon_106,#clon_106,#clon_107,#clon_108,#clon_109,#clon_110").addClass("desconectadosFila1");
//CLONES DESCONECTADOS FILA 2
$("#clon_84,#clon_85,#clon_86,#clon_87,#clon_88,#clon_89,#clon_90,#clon_91,#clon_92,#clon_93,#clon_94,#clon_95,#clon_96").addClass("desconectadosFila2");
//CLONES DESCONECTADOS FILA 3
$("#clon_70,#clon_71,#clon_72,#clon_73,#clon_74,#clon_75,#clon_76,#clon_77,#clon_78,#clon_79,#clon_80,#clon_81,#clon_82").addClass("desconectadosFila3");
//CLONES DESCONECTADOS FILA 4
$("#clon_56,#clon_57,#clon_58,#clon_59,#clon_60,#clon_61,#clon_62,#clon_63,#clon_64,#clon_65,#clon_66,#clon_67,#clon_68").addClass("desconectadosFila4");
//CLONES DESCONECTADOS FILA 8
$("#clon_9,#clon_10,#clon_11,#clon_12").addClass("desconectadosfila8");

//FILA ZONA LIBRE EXTRA 1 Y 2
$("#clon_14,#clon_15,#clon_28,#clon_29,#clon_42,#clon_43,#clon_56,#clon_57,#clon_70,#clon_71").addClass("Zonalibre")
$("#clon_84,#clon_85,#clon_98,#clon_99,#clon_112,#clon_113").addClass("Zonalibre2")
//CLONES MAGNETA CARPA
$("#sunbed,#clon_16,#clon_17,#clon_18").addClass('intocables');
//CLONES CON FORMA DE SOMBRILLA RECTANGULO REDONDO
$("#clon_83,#clon_84,#clon_85,#clon_89,#clon_90,#clon_91,#clon_92,#clon_93,#clon_97,#clon_98,#clon_99,#clon_100,#clon_101,#clon_102,#clon_103,#clon_104,#clon_105,#clon_106,#clon_107,#clon_108,#clon_109,#clon_110,#clon_111,#clon_112,#clon_113,#clon_114,#clon_115,#clon_116,#clon_117,#clon_118,#clon_119,#clon_120,#clon_121,#clon_122,#clon_123,#clon_124,#clon_125,#clon_186,#clon_187,#clon_188,#clon_189,#clon_190,#clon_191").addClass('primerafila');
//DE LA 1ª FILA Del 84 al 95.
//DE la 2º FILA del 72 al 83
//DE la 3º FILA DEL 60 AL 70
//DE LA 4º FILA DEL 48 AL 58
//DE LA 5ª FILA DEL 36 AL 46
//DE LA 6ª FILA DEL 24 AL 34
//DE LA 7ª FILA DEL 12 AL 22
//DE LA 8ª FILA DEL 1 AL 10

//Clicking function-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



//clear localstorage
function clearClick(number) {
    localStorage.clear();
    window.location.reload();
}

//BOTONES PARA OCULTAR FILAS------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//VISIBILIDAD DE LA FILA 8--------------------------------
function toggleDesconectadosFila8() {
    var $desconectadosFila8 = $(".desconectadosfila8");
    var currentVisibility = $desconectadosFila8.css("visibility");
    var newVisibility = currentVisibility === "hidden" ? "visible" : "hidden";

    $desconectadosFila8.css("visibility", newVisibility);
    localStorage.setItem("desconectadosFila8Visibility", newVisibility);
    
    // Sincronizar con Firebase
    db.collection('visibility').doc('desconectadosfila8').set({
        visible: newVisibility === "visible"
    });
}

// Al cargar la página, restaurar el estado de visibilidad de FILA 8-------
$(document).ready(function() {
    var storedVisibility = localStorage.getItem("desconectadosFila8Visibility");
    if (storedVisibility === "visible") {
        $(".desconectadosfila8").css("visibility", "visible");
    } else if (storedVisibility === "hidden") {
        $(".desconectadosfila8").css("visibility", "hidden");
    }
});

//VISIBILIDAD DE LA FILA 4--------------------------------------
function toggledesconectadosFila4() {
    var $desconectadosFila4 = $(".desconectadosFila4");
    var currentVisibility = $desconectadosFila4.css("visibility");
    var newVisibility = currentVisibility === "hidden" ? "visible" : "hidden";

    $desconectadosFila4.css("visibility", newVisibility);
    localStorage.setItem("desconectadosFila4Visibility", newVisibility);
    
    // Sincronizar con Firebase
    db.collection('visibility').doc('desconectadosFila4').set({
        visible: newVisibility === "visible"
    });
}

// Al cargar la página, restaurar el estado de visibilidad de FILA 4-----
$(document).ready(function() {
    var storedVisibility = localStorage.getItem("desconectadosFila4Visibility");
    if (storedVisibility === "visible") {
        $(".desconectadosFila4").css("visibility", "visible");
    } else if (storedVisibility === "hidden") {
        $(".desconectadosFila4").css("visibility", "hidden");
    }
});

//VISIBILIDAD DE LA FILA 3--------------------------------------
function toggledesconectadosFila3() {
    var $desconectadosFila3 = $(".desconectadosFila3");
    var currentVisibility = $desconectadosFila3.css("visibility");
    var newVisibility = currentVisibility === "hidden" ? "visible" : "hidden";

    $desconectadosFila3.css("visibility", newVisibility);
    localStorage.setItem("desconectadosFila3Visibility", newVisibility);
    
    // Sincronizar con Firebase
    db.collection('visibility').doc('desconectadosFila3').set({
        visible: newVisibility === "visible"
    });
}

// Al cargar la página, restaurar el estado de visibilidad de FILA 3-----
$(document).ready(function() {
    var storedVisibility = localStorage.getItem("desconectadosFila3Visibility");
    if (storedVisibility === "visible") {
        $(".desconectadosFila3").css("visibility", "visible");
    } else if (storedVisibility === "hidden") {
        $(".desconectadosFila3").css("visibility", "hidden");
    }
});

//VISIBILIDAD DE LA FILA 2--------------------------------------
function toggledesconectadosFila2() {
    var $desconectadosFila2 = $(".desconectadosFila2");
    var currentVisibility = $desconectadosFila2.css("visibility");
    var newVisibility = currentVisibility === "hidden" ? "visible" : "hidden";

    $desconectadosFila2.css("visibility", newVisibility);
    localStorage.setItem("desconectadosFila2Visibility", newVisibility);
    
    // Sincronizar con Firebase
    db.collection('visibility').doc('desconectadosFila2').set({
        visible: newVisibility === "visible"
    });
}

// Al cargar la página, restaurar el estado de visibilidad de FILA 2-----
$(document).ready(function() {
    var storedVisibility = localStorage.getItem("desconectadosFila2Visibility");
    if (storedVisibility === "visible") {
        $(".desconectadosFila2").css("visibility", "visible");
    } else if (storedVisibility === "hidden") {
        $(".desconectadosFila2").css("visibility", "hidden");
    }
});




//VISIBILIDAD DE LA FILA 1-----------------------------------
function toggledesconectadosFila1() {
    var $desconectadosFila1 = $(".desconectadosFila1");
    var currentVisibility = $desconectadosFila1.css("visibility");
    var newVisibility = currentVisibility === "hidden" ? "visible" : "hidden";

    $desconectadosFila1.css("visibility", newVisibility);
    localStorage.setItem("desconectadosFila1Visibility", newVisibility);
    
    // Sincronizar con Firebase
    db.collection('visibility').doc('desconectadosFila1').set({
        visible: newVisibility === "visible"
    });
}

// Al cargar la página, restaurar el estado de visibilidad de FILA 1-----
$(document).ready(function() {
    var storedVisibility = localStorage.getItem("desconectadosFila1Visibility");
    if (storedVisibility === "visible") {
        $(".desconectadosFila1").css("visibility", "visible");
    } else if (storedVisibility === "hidden") {
        $(".desconectadosFila1").css("visibility", "hidden");
    }
});

//VISIBILIDAD DE LA FILA 0------------------------------------  -
function toggleDesconectadosFila0() {
    var $desconectadosFila0 = $(".desconectadosFila0");
    var currentVisibility = $desconectadosFila0.css("visibility");
    var newVisibility = currentVisibility === "hidden" ? "visible" : "hidden";

    $desconectadosFila0.css("visibility", newVisibility);
    localStorage.setItem("desconectadosFila0Visibility", newVisibility);
    
    // Sincronizar con Firebase
    db.collection('visibility').doc('desconectadosFila0').set({
        visible: newVisibility === "visible"
    });
}

// Al cargar la página, restaurar el estado de visibilidad de FILA 0------
$(document).ready(function() {
    var storedVisibility = localStorage.getItem("desconectadosFila0Visibility");
    if (storedVisibility === "visible") {
        $(".desconectadosFila0").css("visibility", "visible");
    } else if (storedVisibility === "hidden") {
        $(".desconectadosFila0").css("visibility", "hidden");
    }
});

//VISIBILIDAD DE LA ZONA LIBRE 1--------------------------------------  
function toggleZonalibre() {
    var $Zonalibre = $(".Zonalibre");
    var currentVisibility = $Zonalibre.css("visibility");
    var newVisibility = currentVisibility === "hidden" ? "visible" : "hidden";

    $Zonalibre.css("visibility", newVisibility);
    localStorage.setItem("ZonalibreVisibility", newVisibility);
    
    // Sincronizar con Firebase
    db.collection('visibility').doc('Zonalibre').set({
        visible: newVisibility === "visible"
    });
}

// Al cargar la página, restaurar el estado de visibilidad de ZONA LIBRE 1----
$(document).ready(function() {
    var storedVisibility = localStorage.getItem("ZonalibreVisibility");
    if (storedVisibility === "visible") {
        $(".Zonalibre").css("visibility", "visible");
    } else if (storedVisibility === "hidden") {
        $(".Zonalibre").css("visibility", "hidden");
    }
});

//VISIBILIDAD DE LA ZONA LIBRE 2--------------------------------------  
function toggleZonalibre2() {
    var $Zonalibre2 = $(".Zonalibre2");
    var currentVisibility = $Zonalibre2.css("visibility");
    var newVisibility = currentVisibility === "hidden" ? "visible" : "hidden";

    $Zonalibre2.css("visibility", newVisibility);
    localStorage.setItem("Zonalibre2Visibility", newVisibility);
    
    // Sincronizar con Firebase
    db.collection('visibility').doc('Zonalibre2').set({
        visible: newVisibility === "visible"
    });
}

// Al cargar la página, restaurar el estado de visibilidad de ZONA LIBRE 2----
$(document).ready(function() {
    var storedVisibility = localStorage.getItem("Zonalibre2Visibility");
    if (storedVisibility === "visible") {
        $(".Zonalibre2").css("visibility", "visible");
    } else if (storedVisibility === "hidden") {
        $(".Zonalibre2").css("visibility", "hidden");
    }
});


//VISIBILIDAD DEL CLON 10A--------------------------------------  
function toggleclon10A() {
    var $clon10A = $(".clon10A");
    var currentVisibility = $clon10A.css("visibility");
    var newVisibility = currentVisibility === "hidden" ? "visible" : "hidden";

    $clon10A.css("visibility", newVisibility);
    localStorage.setItem("clon10AVisibility", newVisibility);
    
    // Sincronizar con Firebase
    db.collection('visibility').doc('clon10A').set({
        visible: newVisibility === "visible"
    });
}

// Al cargar la página, restaurar el estado de visibilidad del CLON 10A----
$(document).ready(function() {
    var storedVisibility = localStorage.getItem("clon10AVisibility");
    if (storedVisibility === "visible") {
        $(".clon10A").css("visibility", "visible");
    } else if (storedVisibility === "hidden") {
        $(".clon10A").css("visibility", "hidden");
    }
});

//VISIBILIDAD DEL CLON 0--------------------------------------  
function toggleclon0() {
    var $clon0 = $(".clon0");
    var currentVisibility = $clon0.css("visibility");
    var newVisibility = currentVisibility === "hidden" ? "visible" : "hidden";

    $clon0.css("visibility", newVisibility);
    localStorage.setItem("clon0Visibility", newVisibility);
    
    // Sincronizar con Firebase
    db.collection('visibility').doc('clon0').set({
        visible: newVisibility === "visible"
    });
}

// Al cargar la página, restaurar el estado de visibilidad del CLON 0----
$(document).ready(function() {
    var storedVisibility = localStorage.getItem("clon0Visibility");
    if (storedVisibility === "visible") {
        $(".clon0").css("visibility", "visible");
    } else if (storedVisibility === "hidden") {
        $(".clon0").css("visibility", "hidden");
    }
});

//VISIBILIDAD DE LOS CIRCULOS---------------

  // Variable para controlar la visibilidad de los círculos
  let circlesVisible = true;

  // Comprobar el estado guardado en localStorage al cargar la página
  window.onload = function() {
    // Verificamos si hay un estado guardado en localStorage
    const savedState = localStorage.getItem('circlesVisible');
    if (savedState !== null) {
      circlesVisible = savedState === 'true'; // Convertirlo a un valor booleano
    }

    // Actualizar la visibilidad de los círculos según el estado guardado
    const circles = document.querySelectorAll('.circle');
    circles.forEach(circle => {
      circle.style.display = circlesVisible ? 'block' : 'none';
    });

    // Restaurar el color de los círculos desde localStorage
    document.querySelectorAll('.circle').forEach(circle => {
      const savedColorStep = localStorage.getItem('circle_color_' + circle.id);
      if (savedColorStep) {
        circle.classList.add('step' + savedColorStep); // Aplicar la clase de color guardada
      }
    });
  };

  // Función para alternar la visibilidad de los círculos y guardar el estado
  function toggleCircles() {
    const circles = document.querySelectorAll('.circle');
    circles.forEach(circle => {
      circle.style.display = circlesVisible ? 'none' : 'block';
    });

    // Guardar el nuevo estado en localStorage
    circlesVisible = !circlesVisible;
    localStorage.setItem('circlesVisible', circlesVisible); // Guardamos el estado
  }

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var SunbedController = function() {
    return {
        init: function() {
            this.bind_listeners();
            this.setupFirebaseListeners();
            this.restore_customers_name();
            this.restore_sunbeds_colors();
            this.restore_circles_colors();
            this.retreive_prices();
            this.restore_comments();
            this.restore_total_sold();
            this.restore_visibility();
        },

        setupFirebaseListeners: function() {
            // Escuchar cambios en las hamacas
            sunbedsRef.onSnapshot((snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    const data = change.doc.data();
                    const sunbedId = change.doc.id;
                    
                    if (change.type === "modified") {
                        // Actualizar color
                        if (data.color) {
                            $(`#${sunbedId}`).removeClass().addClass('sunbed step' + data.color);
                            $(`#${sunbedId}`).data('actual-step', data.color);
                        }
                        
                        // Actualizar nombre del cliente
                        if (data.customerName) {
                            $(`#${sunbedId} input.customer_name`).val(data.customerName);
                        }
                    }
                });
            });

            // Escuchar cambios en la calculadora
            calculatorRef.onSnapshot((snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    const data = change.doc.data();
                    if (change.type === "modified") {
                        totalEfectivo = data.totalEfectivo || 0;
                        totalTarjeta = data.totalTarjeta || 0;
                        this.update_prices();
                    }
                });
            });

            // Escuchar cambios en la visibilidad
            db.collection('visibility').onSnapshot((snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    const data = change.doc.data();
                    const section = change.doc.id;
                    
                    if (data.visible !== undefined) {
                        $(`.${section}`).css("visibility", data.visible ? "visible" : "hidden");
                    }
                });
            });

            // Escuchar cambios en los círculos
            db.collection('circles').onSnapshot((snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    const data = change.doc.data();
                    const circleId = change.doc.id;
                    
                    if (change.type === "modified" || change.type === "added") {
                        const circle = $(`#${circleId}`);
                        if (circle.length) {
                            // Eliminar clases anteriores
                            for (let i = 0; i < 3; i++) {
                                circle.removeClass('step' + i);
                            }
                            // Añadir nueva clase
                            circle.addClass('step' + data.color);
                            circle.data('actual-step', data.color);
                        }
                    }
                });
            });
        },

        bind_listeners: function() {
            $("input.customer_name").keyup(function () {
                var text = $(this).val();
                var target_id = $(this).closest(".sunbed").attr('id');
                
                // Guardar en localStorage
                let target_key = 'customer_name' + target_id;
                localStorage.setItem(target_key, text);
                
                // Sincronizar con Firebase
                sunbedsRef.doc(target_id).update({
                    customerName: text
                });
            });

            $("#comments").keyup(function() {
                let actual_value = $(this).val();
                localStorage.setItem('comments', actual_value);
                calculatorRef.doc('comments').set({
                    text: actual_value
                });
            });
        },

        restore_customers_name: function() {
            $("input.customer_name").each(function () {
                let actual_id = $(this).closest(".sunbed").attr('id');
                let target_key = 'customer_name' + actual_id;

                let target_value = localStorage.getItem(target_key);

                if (target_value) {
                    $(this).val(target_value);
                }
            });
        },

        restore_sunbeds_colors: function() {
            $(".sunbed").each(function() {
                let actual_id = $(this).attr('id'),
                    target_key = 'sunbed_color' + actual_id;

                let target_step = localStorage.getItem(target_key);
                if (target_step) {
                    $(this).addClass('step' + target_step);
                    $(this).data('actual-step', target_step);
                }

            });
        },

        restore_circles_colors: function() {
            // Restaurar colores de círculos desde Firebase
            db.collection('circles').get().then((snapshot) => {
                snapshot.forEach((doc) => {
                    const data = doc.data();
                    const circleId = doc.id;
                    const circle = $(`#${circleId}`);
                    
                    if (circle.length) {
                        // Eliminar clases anteriores
                        for (let i = 0; i < 3; i++) {
                            circle.removeClass('step' + i);
                        }
                        // Añadir nueva clase
                        circle.addClass('step' + data.color);
                        circle.data('actual-step', data.color);
                    }
                });
            });
        },

        retreive_prices: function() {
            shopping_cart = 0;
            total_sold = 0;

            var saved_total = localStorage.getItem('total_sold');
            if (saved_total) {
                total_sold = parseInt(saved_total);
            }

            var saved_shopping_cart = localStorage.getItem('shopping_cart');
            if (saved_shopping_cart) {
                shopping_cart = parseInt(saved_shopping_cart);
            }

            this.update_prices();
        },

        update_prices: function() {
            $("#shopping_cat_value").html(shopping_cart);
            $("#total_price_value").html(total_sold);
            
            // Sincronizar con Firebase
            calculatorRef.doc('totals').set({
                shoppingCart: shopping_cart,
                totalSold: total_sold,
                totalEfectivo: totalEfectivo,
                totalTarjeta: totalTarjeta
            });
        },

        reset_local_storage_except_customers: function () {           
    Object.keys(localStorage).forEach(function (local_key) {
        // Solo eliminar si NO es customer_name y NO es visibilidad de fila o zona libre
        if (
            !local_key.includes('customer_name') &&
            !local_key.includes('Visibility')
        ) {
            localStorage.removeItem(local_key);
        }
    });

    window.location.reload();
},



        restore_comments: function () {
            var old_comments = localStorage.getItem('comments');
            if (old_comments) {
                $("#comments").val(old_comments);
            }
        },


        restore_total_sold: function(){
            localStorage.getItem(total_sold);
            localStorage.removeItem(total_sold);
        },

        restore_visibility: function() {
            // Restaurar visibilidad desde Firebase
            db.collection('visibility').get().then((snapshot) => {
                snapshot.forEach((doc) => {
                    const data = doc.data();
                    const section = doc.id;
                    if (data.visible !== undefined) {
                        $(`.${section}`).css("visibility", data.visible ? "visible" : "hidden");
                    }
                });
            });
        }
    };
}();

// Agrega un evento de clic al botón "Fila 8"
$("#fila8_btn").click(function () {
    // Cambia la visibilidad de los clones del 6 al 10
    for (var x = 6; x <= 10; x++) {
        $("#clon_" + x).css("visibility", "hidden");
    }
});

SunbedController.init();

//CALCuLadora--------------------------------

let totalEfectivo = 0;
let totalTarjeta = 0;

function calcularCambio() {
    const hamaca = document.getElementById('hamaca').value;
    const totalSelect = parseFloat(document.getElementById('totalSelect').value);
    const totalManual = parseFloat(document.getElementById('totalManual').value);
    const recibidoSelect = parseFloat(document.getElementById('recibidoSelect').value);
    const recibidoManual = parseFloat(document.getElementById('recibidoManual').value);
    const metodo = document.getElementById('pago').value;

    const total = totalManual || totalSelect;
    const recibido = recibidoManual || recibidoSelect;

    if (isNaN(total) || isNaN(recibido)) {
        alert("Por favor, introduce montos válidos.");
        return;
    }

    const cambio = recibido - total;
    document.getElementById('resultado').textContent = `Cambio: €${cambio.toFixed(2)}`;

    const historial = document.getElementById('historial');
    const li = document.createElement('li');

    const fechaObj = new Date();
    const dia = String(fechaObj.getDate()).padStart(2, '0');
    const mes = String(fechaObj.getMonth() + 1).padStart(2, '0');
    const anio = fechaObj.getFullYear();
    const horas = String(fechaObj.getHours()).padStart(2, '0');
    const minutos = String(fechaObj.getMinutes()).padStart(2, '0');
    const fecha = `${dia}/${mes}/${anio} ${horas}:${minutos}`;

    li.textContent = `Hamaca ${hamaca} - Total: €${total.toFixed(2)} - Recibido: €${recibido.toFixed(2)} - Cambio: €${cambio.toFixed(2)} - Método: ${metodo} - ${fecha}`;
    historial.insertBefore(li, historial.firstChild);

    if (metodo === 'efectivo') {
        totalEfectivo += total;
    } else {
        totalTarjeta += total;
    }

    document.getElementById('totalEfectivo').textContent = totalEfectivo.toFixed(2);
    document.getElementById('totalTarjeta').textContent = totalTarjeta.toFixed(2);
    document.getElementById('totalGeneral').textContent = (totalEfectivo + totalTarjeta).toFixed(2);

    // Guardar en localStorage
    let datosHistorial = JSON.parse(localStorage.getItem("historial")) || [];
    datosHistorial.push({
        fecha,
        hamaca: hamaca || "-",
        total: total.toFixed(2),
        recibido: recibido.toFixed(2),
        cambio: cambio.toFixed(2),
        metodo
    });
    localStorage.setItem("historial", JSON.stringify(datosHistorial));

    let operaciones = JSON.parse(localStorage.getItem("operaciones")) || [];
    operaciones.push({
        fecha,
        hamaca: hamaca || "-",
        pagado: total.toFixed(2),
        devuelto: ""
    });
    localStorage.setItem("operaciones", JSON.stringify(operaciones));

    // Sincronizar con Firebase
    calculatorRef.doc('transactions').collection('history').add({
        fecha,
        hamaca: hamaca || "-",
        total: total.toFixed(2),
        recibido: recibido.toFixed(2),
        cambio: cambio.toFixed(2),
        metodo,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });

    calculatorRef.doc('totals').set({
        totalEfectivo: totalEfectivo,
        totalTarjeta: totalTarjeta,
        totalGeneral: totalEfectivo + totalTarjeta,
        lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true });
}

function procesarDevolucion() {
    const hamaca = document.getElementById('hamaca').value;
    const totalSelect = parseFloat(document.getElementById('totalSelect').value);
    const totalManual = parseFloat(document.getElementById('totalManual').value);
    const metodo = document.getElementById('pago').value;

    const total = totalManual || totalSelect;

    if (isNaN(total)) {
        alert("Por favor, introduce un monto válido.");
        return;
    }

    const devolucion = total;
    document.getElementById('resultado').textContent = `Devolución: €${devolucion.toFixed(2)}`;

    const historial = document.getElementById('historial');
    const li = document.createElement('li');

    const fechaObj = new Date();
    const dia = String(fechaObj.getDate()).padStart(2, '0');
    const mes = String(fechaObj.getMonth() + 1).padStart(2, '0');
    const anio = fechaObj.getFullYear();
    const horas = String(fechaObj.getHours()).padStart(2, '0');
    const minutos = String(fechaObj.getMinutes()).padStart(2, '0');
    const fecha = `${dia}/${mes}/${anio} ${horas}:${minutos}`;

    li.textContent = `Devolución Hamaca ${hamaca} - Total: €${total.toFixed(2)} - Devolución: €${devolucion.toFixed(2)} - Método: ${metodo} - ${fecha}`;
    historial.insertBefore(li, historial.firstChild);

    if (metodo === 'efectivo') {
        totalEfectivo -= total;
    } else {
        totalTarjeta -= total;
    }

    document.getElementById('totalEfectivo').textContent = totalEfectivo.toFixed(2);
    document.getElementById('totalTarjeta').textContent = totalTarjeta.toFixed(2);
    document.getElementById('totalGeneral').textContent = (totalEfectivo + totalTarjeta).toFixed(2);

    // Guardar en localStorage
    let datosHistorial = JSON.parse(localStorage.getItem("historial")) || [];
    datosHistorial.push({
        fecha,
        hamaca: hamaca || "-",
        total: total.toFixed(2),
        devolucion: devolucion.toFixed(2),
        metodo
    });
    localStorage.setItem("historial", JSON.stringify(datosHistorial));

    let operaciones = JSON.parse(localStorage.getItem("operaciones")) || [];
    operaciones.push({
        fecha,
        hamaca: hamaca || "-",
        pagado: "",
        devuelto: devolucion.toFixed(2)
    });
    localStorage.setItem("operaciones", JSON.stringify(operaciones));

    // Sincronizar con Firebase
    calculatorRef.doc('transactions').collection('history').add({
        fecha,
        hamaca: hamaca || "-",
        total: total.toFixed(2),
        devolucion: devolucion.toFixed(2),
        metodo,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });

    calculatorRef.doc('totals').set({
        totalEfectivo: totalEfectivo,
        totalTarjeta: totalTarjeta,
        totalGeneral: totalEfectivo + totalTarjeta,
        lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true });
}

function reiniciarCalculadora() {
    document.getElementById('hamaca').value = '';
    document.getElementById('totalSelect').selectedIndex = 0;
    document.getElementById('totalManual').value = '';
    document.getElementById('recibidoSelect').selectedIndex = 0;
    document.getElementById('recibidoManual').value = '';
    document.getElementById('pago').selectedIndex = 0;
    document.getElementById('resultado').textContent = '';

    totalEfectivo = 0;
    totalTarjeta = 0;

    document.getElementById('totalEfectivo').textContent = '0.00';
    document.getElementById('totalTarjeta').textContent = '0.00';
    document.getElementById('totalGeneral').textContent = '0.00';

    const historial = document.getElementById('historial');
    historial.innerHTML = '';

    localStorage.removeItem('historial');

    // Sincronizar con Firebase
    calculatorRef.doc('totals').set({
        totalEfectivo: 0,
        totalTarjeta: 0,
        totalGeneral: 0,
        lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
    });
}

function toggleHistorial() {
    const historialContainer = document.getElementById('historialContainer');
    historialContainer.style.display = historialContainer.style.display === 'none' ? 'block' : 'none';
}

function descargarHistorial() {
    let datosHistorial = JSON.parse(localStorage.getItem("historial")) || [];

    const resumenDiario = {};
    const resumenMensual = {};

    datosHistorial.forEach(entry => {
        // Manejo correcto para fechas en formato DD/MM/YYYY
        let [dia, mes, anioHora] = entry.fecha.split('/');
        let [anio] = anioHora.split(' ');
        let fecha = new Date(`${anio}-${mes}-${dia}`);
