let xp = 0;
let stone = 0;
let gold = 250;
let fighting;
let monsterHealth;
let monsterLevel;
let level = 1;
let power = 5;
let armor = 0;
let hp = 100;
let Weapons = [];
let equippedWeapon = null;
let equippedWeaponPrice = 0;
let originalMonsterPositions = [];
let characterAnimationId;
let monsterAnimationIds = [];
let collisionCheckId = null;
let equippedWeaponPower = 0;
let characterMoveTimeoutId;
let monsterMoveTimeoutIds = [];
let currentFightingMonster = null;
let playerTurn = true;
let xpToNextLevel = 100; // Startwert für Level 1
let maxHp = 100;
let equippedHelmetPrice = 0; // Preis des ausgerüsteten Helms
let originalCharacterPosition = { left: '280px', top: '50px' };



let equippedChestPrice = 0;    // Beispiel für den Brustpanzer
let equippedShieldPrice = 0;   // Füge diese Zeile hinzu
let equippedShoesPrice = 0;

let equippedHelmet = null;
let equippedChest = null;
let equippedShield = null;
let equippedShoes = null;

let equippedHelmetArmor = 0;  // Schon deklariert
let equippedChestArmor = 0;   // Füge diese Zeile hinzu
let equippedShieldArmor = 0;  // Schon deklariert
let equippedShoesArmor = 0;   // Schon deklariert

let shuffledHelmArmor = [];
let shuffledChestArmor = [];
let shuffledShoeArmor = [];
let shuffledShields = [];

let currentDungeonMonsterIndex = 0;  // Startwert für das erste Monster
let isInDungeon = false;




const easyMonsters = [
    { name: "Ratte", level: 6, health: 38, image: "monsters/unknown.jpeg" },
    { name: "Untoter", level: 8, health: 95, image: "monsters/unknown.jpeg" },
    { name: "Skelett", level: 12, health: 128, image: "monsters/unknown.jpeg" },
    { name: "Ork", level: 15, health: 148, image: "monsters/unknown.jpeg" },
    { name: "Wildhund", level: 9, health: 104, image: "monsters/unknown.jpeg" },
    { name: "Spinne", level: 8, health: 88, image: "monsters/unknown.jpeg" },
    { name: "Auferstandener", level: 17, health: 156, image: "monsters/unknown.jpeg" },
    { name: "Barbar", level: 14, health: 135, image: "monsters/unknown.jpeg" },
    { name: "Goblin", level: 9, health: 96, image: "monsters/unknown.jpeg" },
    { name: "Streuner", level: 11, health: 118, image: "monsters/unknown.jpeg" },
];

const meduimMonsters = [
    { name: "Ork Krieger", level: 18, health: 186, image: "monsters/unknown1.jpeg" },
    { name: "Skelett Armee", level: 21, health: 198, image: "monsters/unknown1.jpeg" },
    { name: "Ritter", level: 24, health: 231, image: "monsters/unknown1.jpeg" },
    { name: "Greif", level: 29, health: 265, image: "monsters/unknown1.jpeg" },
    { name: "Untoter Wolf", level: 32, health: 297, image: "monsters/unknown1.jpeg" },
    { name: "Mumie", level: 37, health: 342, image: "monsters/unknown1.jpeg" },
    { name: "Drachling", level: 41, health: 386, image: "monsters/unknown1.jpeg" },
    { name: "Dunkel Elf", level: 45, health: 417, image: "monsters/unknown1.jpeg" },
    { name: "Golem", level: 48, health: 435, image: "monsters/unknown1.jpeg" },
    { name: "Dunkler Engel", level: 51, health: 481, image: "monsters/unknown1.jpeg" },
];

const hardMonsters = [
    { name: "Ork Häuptling", level: 53, health: 186, image: "monsters/unknown2.jpeg" },
    { name: "Untoter Ritter", level: 57, health: 198, image: "monsters/unknown2.jpeg" },
    { name: "Blut Elf", level: 62, health: 231, image: "monsters/unknown2.jpeg" },
    { name: "Riese", level: 65, health: 265, image: "monsters/unknown2.jpeg" },
    { name: "Wither Echse", level: 74, health: 297, image: "monsters/unknown2.jpeg" },
    { name: "Lava Golem", level: 78, health: 342, image: "monsters/unknown2.jpeg" },
    { name: "Skelett Drache", level: 81, health: 386, image: "monsters/unknown2.jpeg" },
    { name: "Feuer Drache", level: 89, health: 417, image: "monsters/unknown2.jpeg" },
    { name: "Dunkler Engel", level: 94, health: 435, image: "monsters/unknown2.jpeg" },
    { name: "Untoter Engel", level: 102, health: 481, image: "monsters/unknown2.jpeg" },
];

const legendMonsters = [
    { name: "Riesenschlange", level: 108, health: 492, image: "monsters/unknown3.jpeg" },
    { name: "Zyklop", level: 112, health: 521, image: "monsters/unknown3.jpeg" },
    { name: "Lava Golem", level: 119, health: 549, image: "monsters/unknown3.jpeg" },
    { name: "Schatten Drache", level: 124, health: 584, image: "monsters/unknown3.jpeg" },
    { name: "Schatten Engel", level: 128, health: 597, image: "monsters/unknown3.jpeg" },
    { name: "Hydra", level: 131, health: 673, image: "monsters/unknown3.jpeg" },
    { name: "Magma Riese", level: 137, health: 695, image: "monsters/unknown3.jpeg" },
    { name: "Feuer Drache", level: 142, health: 728, image: "monsters/unknown3.jpeg" },
    { name: "Frost Wyrm", level: 148, health: 785, image: "monsters/unknown3.jpeg" },
    { name: "Herr der Schatten", level: 150, health: 859, image: "monsters/unknown3.jpeg" },
];

const dungeonMonsters = [
    { name: "Pyrorex der Verdammte", level: 108, health: 5, image: "dungeon/boss1.jpeg", backgroundImage: "bbg/boss1.jpeg" },
    { name: "Schattenfang", level: 128, health: 5, image: "dungeon/boss2.jpg", backgroundImage: "bbg/boss2.jpeg" },
    { name: "Seraphis der gefallene Engel", level: 139, health: 5, image: "dungeon/boss3.jpg", backgroundImage: "bbg/boss3.jpeg" },
    { name: "Glazion Frostbrand", level: 157, health: 5, image: "dungeon/boss4.jpg", backgroundImage: "bbg/boss4.jpeg" },
    { name: "Noxion der Leerenbote", level: 176, health: 5, image: "dungeon/boss5.jpg", backgroundImage: "bbg/boss5.jpeg" },
    { name: "Krysalith der Helle", level: 183, health: 5, image: "dungeon/boss6.jpg", backgroundImage: "bbg/boss6.jpeg" },
    { name: "Silberwacht der Alte", level: 195, health: 5, image: "dungeon/boss7.jpg", backgroundImage: "bbg/boss7.jpeg" },
    { name: "Yggdramir Eichenherz", level: 219, health: 5, image: "dungeon/boss8.jpg", backgroundImage: "bbg/boss8.jpg" },
    { name: "Ferrus der Funkenschmied", level: 248, health: 5, image: "dungeon/boss9.jpg", backgroundImage: "bbg/boss9.jpeg" },
    { name: "Veloriya Schattenaura", level: 300, health: 5, image: "dungeon/boss10.jpg", backgroundImage: "bbg/boss10.jpeg" },
];

let dungeonMonstersArray = dungeonMonsters;  // Array für Dungeon-Monster

const randomMonster = getRandomHardMonster();

function getRandomHardMonster() {
    const randomIndex = Math.floor(Math.random() * hardMonsters.length);
    return hardMonsters[randomIndex];
}

function resetAnimations() {
    if (characterAnimationId) {
        cancelAnimationFrame(characterAnimationId);
        characterAnimationId = null;
    }

    monsterAnimationIds.forEach((id, index) => {
        if (id) {
            cancelAnimationFrame(id);
            monsterAnimationIds[index] = null;
        }
    });

    if (collisionCheckId) {
        cancelAnimationFrame(collisionCheckId);
        collisionCheckId = null;
    }

    resetMonsterTimeouts();
}


function getRandomEasyMonster() {
    const randomIndex = Math.floor(Math.random() * easyMonsters.length);
    return easyMonsters[randomIndex];
}

window.onload = function() {
    // Initialisierung der Dungeon-Etage
    
    
    var nameModal = document.getElementById("nameModal");
    nameModal.style.display = "block";
    updateArmorText();

    // Name-Eingabemodal und Event-Handler für Submit-Button
    var nameInput = document.getElementById("nameInput");
    var submitNameButton = document.getElementById("submitName");

    submitNameButton.onclick = function() {
        var playerName = nameInput.value;
        if (playerName) {
            document.getElementById("nameBox").textContent = playerName;
            document.getElementById("secondNameBox").textContent = playerName;
            nameModal.style.display = "none";
            document.getElementById("modal").style.display = "block";
        } else {
            alert("Bitte gib einen Namen ein.");
        }
    };

    // Hier kannst du den Code einfügen
    document.getElementById('headBox').removeEventListener('click', openSellArmorModal);
    document.getElementById('headBox').addEventListener('click', function() {
        openSellArmorModal('helmet');
    });

    document.getElementById('chestBox').removeEventListener('click', openSellArmorModal);
    document.getElementById('chestBox').addEventListener('click', function() {
        openSellArmorModal('chest');
    });

    document.getElementById('shoeBox').removeEventListener('click', openSellArmorModal);
    document.getElementById('shoeBox').addEventListener('click', function() {
        openSellArmorModal('shoes');
    });

    document.getElementById('shieldBox').removeEventListener('click', openSellArmorModal);
    document.getElementById('shieldBox').addEventListener('click', function() {
        openSellArmorModal('shield');
    });
    // Event-Handler für Charakterauswahl
    var charImages = document.querySelectorAll(".charImage");
    charImages.forEach(function(charImage) {
        charImage.onclick = function() {
            setCharacterImage(this.dataset.image);
            document.getElementById("modal").style.display = "none";
        };
    });
};

function setCharacterImage(imagePath) {
    var characterPicture = document.getElementById("characterPicture");
    characterPicture.style.backgroundImage = "url('" + imagePath + "')";
}

var char1 = document.getElementById("char1");
var char2 = document.getElementById("char2");
var char3 = document.getElementById("char3");
var char4 = document.getElementById("char4");
var char5 = document.getElementById("char5");
var char6 = document.getElementById("char6");
var char7 = document.getElementById("char7");
var char8 = document.getElementById("char8");

char1.onclick = function() {
    setCharacterImage("ch/ch1.jpeg");
    modal.style.display = "none";
}

char2.onclick = function() {
    setCharacterImage("ch/ch2.jpeg");
    modal.style.display = "none";
}

char3.onclick = function() {
    setCharacterImage("ch/ch3.jpeg");
    modal.style.display = "none";
}

char4.onclick = function() {
    setCharacterImage("ch/ch4.jpeg");
    modal.style.display = "none";
}

char5.onclick = function() {
    setCharacterImage("ch/ch5.jpeg");
    modal.style.display = "none";
}

char6.onclick = function() {
    setCharacterImage("ch/ch6.jpeg");
    modal.style.display = "none";
}

char7.onclick = function() {
    setCharacterImage("ch/ch7.jpeg");
    modal.style.display = "none";
}

char8.onclick = function() {
    setCharacterImage("ch/ch8.jpeg");
    modal.style.display = "none";
}

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const button4 = document.querySelector("#button4");
const button5 = document.querySelector("#button5");
const button6 = document.querySelector("#button6");
const button7 = document.querySelector("#button7");
const button8 = document.querySelector("#button8");
const button9 = document.querySelector("#button9");
const button13 = document.querySelector("#button13");
const button14 = document.querySelector("#button14");
const button15 = document.querySelector("#button15");
const button16 = document.querySelector("#button16");
const button17 = document.querySelector("#button17");

const xpText = document.querySelector("#xpText");
const goldText = document.querySelector("#goldText");
const healthText = document.querySelector("#healthText");
const textBox = document.querySelector("#textBox");
const armorText = document.querySelector("#armorText");

const tradeBox3 = document.getElementById("tradeBox3");
const tradeBox4 = document.getElementById("tradeBox4");
const tradeBox5 = document.getElementById("tradeBox5");
const tradeBox6 = document.getElementById("tradeBox6");



const monster = getRandomEasyMonster();

const weapons = [
    { name: "Schwert", basePrice: 100, basePower: 5, image: "files/sword1.jpeg" },
    { name: "Schwert", basePrice: 100, basePower: 5, image: "files/sword2.jpeg" },
    { name: "Schwert", basePrice: 100, basePower: 5, image: "files/sword3.jpeg" },
    { name: "Kriegsaxt", basePrice: 100, basePower: 5, image: "files/axe1.jpeg" },
    { name: "Kriegsaxt", basePrice: 100, basePower: 5, image: "files/axe2.jpeg" },
    { name: "Kriegsaxt", basePrice: 100, basePower: 5, image: "files/axe3.jpeg" }
];

const helmArmor = [
    { name: "Leichter Helm", basePrice: 100, baseArmor: 5, image: "files/leichterHelm.jpeg" },
    { name: "Platten Helm", basePrice: 100, baseArmor: 5, image: "files/plattenHelm.jpeg" },
    { name: "Metall Haube", basePrice: 100, baseArmor: 5, image: "files/metallHaube.jpeg" },
];

const chestArmor = [
    { name: "Leder Harnisch", basePrice: 100, baseArmor: 5, image: "files/lederHarnisch.jpeg" },
    { name: "Ketten Hemd", basePrice: 100, baseArmor: 5, image: "files/kettenHemd.jpeg" },
    { name: "Plattenbrustpanzer", basePrice: 100, baseArmor: 5, image: "files/plattenBrust.jpeg" },
];

const shoeArmor = [
    { name: "Stoffschuhe", basePrice: 100, baseArmor: 5, image: "files/stoffSchuhe.jpeg" },
    { name: "Ledertreter", basePrice: 100, baseArmor: 5, image: "files/lederSchuhe.jpeg" },
    { name: "Plattenschuhe", basePrice: 100, baseArmor: 5, image: "files/plattenSchuhe.jpeg" },
];

const shield = [
    { name: "Rundschild", basePrice: 100, baseArmor: 5, image: "files/rundSchild.jpeg" },
    { name: "Turmschild", basePrice: 100, baseArmor: 5, image: "files/turmSchild.jpeg" },
    { name: "Dreiecksschild", basePrice: 100, baseArmor: 5, image: "files/dreieckSchild.jpeg" },

];

function resetEquipment(equipmentType) {
    switch (equipmentType) {
        case "helmet":
            equippedHelmet = null;
            equippedHelmetArmor = 0;
            equippedHelmetPrice = 0;
            document.getElementById('headBox').innerHTML = `<p></p>`;

            break;
        case "shield":
            equippedShield = null;
            equippedShieldArmor = 0;
            equippedShieldPrice = 0;
            document.getElementById('shieldBox').innerHTML = "<p></p>";
            break;
        case "chest":
            equippedChest = null;
            equippedChestArmor = 0;
            equippedChestPrice = 0;
            document.getElementById('chestBox').innerHTML = "<p></p>";
            break;
        case "shoes":
            equippedShoes = null;
            equippedShoesArmor = 0;
            equippedShoesPrice = 0;
            document.getElementById('shoeBox').innerHTML = "<p></p>";
            break;
    }
};

function buyHelmet(helmet, helmetArmor, helmetPrice) {
    if (equippedHelmet !== null) {
        alert("Du hast bereits einen Helm ausgerüstet. Verkaufe ihn zuerst, um einen neuen zu kaufen.");
        return; // Beende die Funktion, wenn bereits ein Helm ausgerüstet ist.
    }
    
    if (gold >= helmetPrice) {
        gold -= helmetPrice;
        armor += helmetArmor;

        document.getElementById('goldText').textContent = gold;
        document.getElementById('armorText').textContent = armor;

        // Speichere die Helm-Daten
        equippedHelmet = helmet;
        equippedHelmetArmor = helmetArmor;
        equippedHelmetPrice = helmetPrice;

        document.getElementById('headBox').innerHTML = `
    <img src="${helmet.image}" alt="Helm" style="width: 130px; height: 130px; border-radius: 20px;">
    <p>Rüstung: ${helmetArmor}</p>
    `;
        
        closeModal();
    } else {
        alert("Nicht genug Gold!");
    }
}



function openSellArmorModal(armorType) {
    const sellArmorModal = document.getElementById("sellArmorModal");
    
    // Hier sicherstellen, dass das richtige Equipment zum Verkaufen ausgewählt ist
    let equippedArmor;
    
    switch (armorType) {
        case "helmet":
            equippedArmor = equippedHelmet;
            break;
        case "chest":
            equippedArmor = equippedChest;
            break;
        case "shoes":
            equippedArmor = equippedShoes;
            break;
        case "shield":
            equippedArmor = equippedShield;
            break;
        default:
            console.error("Ungültiger Rüstungstyp:", armorType);
            return;
    }

    // Setze den Klick-Handler für den Bestätigungs-Button, um das ausgewählte Equipment zu verkaufen
    document.getElementById("confirmSellArmorButton").onclick = function() {
        sellArmor(equippedArmor, equippedArmor.armorValue, equippedArmor.armorPrice, armorType);
    };

    // Zeige das Verkaufsmodal an
    sellArmorModal.style.display = "block";
}

function updateArmorUI() {
    if (equippedHelmet) {
        document.getElementById('headBox').innerHTML =` 
            <img id="helmetImg" src="${equippedHelmet.image}" alt="Helm" style="width: 130px; height: 130px; border-radius: 20px;">
            <p>Rüstung: ${equippedHelmetArmor}</p>
        `;
        document.getElementById('helmetImg').addEventListener('click', function() {
            openSellArmorModal('helmet');
        });
    }

    if (equippedChest) {
        document.getElementById('chestBox').innerHTML = `
            <img id="chestImg" src="${equippedChest.image}" alt="Brustpanzer" style="width: 130px; height: 130px; border-radius: 20px;">
            <p>Rüstung: ${equippedChestArmor}</p>
        `;
        document.getElementById('chestImg').addEventListener('click', function() {
            openSellArmorModal('chest');
        });
    }

    if (equippedShoes) {
        document.getElementById('shoeBox').innerHTML = `
            <img id="shoesImg" src="${equippedShoes.image}" alt="Schuhe" style="width: 130px; height: 130px; border-radius: 20px;">
            <p>Rüstung: ${equippedShoesArmor}</p>
        `;
        document.getElementById('shoesImg').addEventListener('click', function() {
            openSellArmorModal('shoes');
        });
    }

    if (equippedShield) {
        document.getElementById('shieldBox').innerHTML = `
            <img id="shieldImg" src="${equippedShield.image}" alt="Schild" style="width: 130px; height: 130px; border-radius: 20px;">
            <p>Rüstung: ${equippedShieldArmor}</p>
        `;
        document.getElementById('shieldImg').addEventListener('click', function() {
            openSellArmorModal('shield');
        });
    }
}

// Rüstung verkaufen und Box leeren
function sellArmor(armorObj, armorValue, armorPrice, armorType) {
    // Fallback auf armorValue und armorPrice, falls nicht übergeben
    let armorValueFinal = armorValue !== undefined ? armorValue : armorObj.armorValue;
    let armorPriceFinal = armorPrice !== undefined ? armorPrice : armorObj.armorPrice;

    if (!armorValueFinal || !armorPriceFinal) {
        console.error("Rüstungswert oder Preis sind undefiniert:", armorValueFinal, armorPriceFinal);
        return;
    }

    const sellPrice = Math.floor(armorPriceFinal * 0.5);  // Verkaufspreis ist die Hälfte des Kaufpreises
    gold += sellPrice;
    armor = Math.max(0, armor - armorValueFinal);  // Verhindere, dass armor negativ wird

    // Aktualisiere die Anzeige von Gold und Rüstungswert
    document.getElementById('goldText').textContent = gold;
    document.getElementById('armorText').textContent = armor;

    // Aktualisiere die Schadensreduzierung in Prozent
    updateArmorText();

    // Entferne die Rüstung aus dem Interface
    if (armorType === "helmet") {
        document.getElementById('headBox').innerHTML = "<p></p>";
        equippedHelmet = null;
    } else if (armorType === "chest") {
        document.getElementById('chestBox').innerHTML = "<p></p>";
        equippedChest = null;
    } else if (armorType === "shoes") {
        document.getElementById('shoeBox').innerHTML = "<p></p>";
        equippedShoes = null;
    } else if (armorType === "shield") {
        document.getElementById('shieldBox').innerHTML = "<p></p>";
        equippedShield = null;
    }

    closeSellArmorModal(); // Verkaufsmodal schließen
}
// Schließt das Verkaufsmodal
function closeSellArmorModal() {
    const sellArmorModal = document.getElementById("sellArmorModal");
    sellArmorModal.style.display = "none";
}








document.getElementById("buyArmorButton").onclick = function() {
    buyArmor("helmet", 5, 100, "files/leichterHelm.jpeg"); // Beispiel für den Kauf eines Helms
};

function openSellHelmetModal() {
    if (equippedHelmet) {
        var sellHelmetModal = document.getElementById("sellHelmetModal");
        sellHelmetModal.style.display = "block";
    }
};

function closeSellHelmetModal() {
    var sellHelmetModal = document.getElementById("sellHelmetModal");
    sellHelmetModal.style.display = "none";
};

function buyShield(shield, shieldArmor, shieldPrice) {
    if (gold >= shieldPrice) {  // Überprüfen, ob genug Gold vorhanden ist
        gold -= shieldPrice;  // Den Schildpreis vom Gold abziehen
        armor += shieldArmor;  // Den Schild-Rüstwert zur Gesamt-Rüstung hinzufügen

        // Gold und Rüstungswert aktualisieren
        document.getElementById('goldText').textContent = gold;
        document.getElementById('armorText').textContent = armor;

        // Den gekauften Schild in der shieldBox anzeigen
        equippedShield = shield;
        equippedShieldArmor = shieldArmor;
        equippedShieldPrice = shieldPrice;

        document.getElementById('shieldBox').innerHTML = `
            <img src="${shield.image}" alt="Schild" style="width: 130px; height: 130px; border-radius: 20px;">
            <p>Rüstung: ${shieldArmor}</p>
        `;

        closeArmorModal(); // Schließt das Modal nach erfolgreichem Kauf
    } else {
        alert("Nicht genug Gold!");  // Fehlermeldung bei unzureichendem Gold
    }
};

function buyArmor(armorType, armorValue, armorPrice, armorImage) {
    if (armorType === "helmet" && equippedHelmet !== null) {
        alert("Du hast bereits einen Helm ausgerüstet. Verkaufe ihn zuerst, um einen neuen zu kaufen.");
        return; // Beende die Funktion, wenn bereits ein Helm ausgerüstet ist.
    }
    if (armorType === "chest" && equippedChest !== null) {
        alert("Du hast bereits einen Brustpanzer ausgerüstet. Verkaufe ihn zuerst, um einen neuen zu kaufen.");
        return; // Beende die Funktion, wenn bereits ein Brustpanzer ausgerüstet ist.
    }
    if (armorType === "shoes" && equippedShoes !== null) {
        alert("Du hast bereits Schuhe ausgerüstet. Verkaufe sie zuerst, um neue zu kaufen.");
        return; // Beende die Funktion, wenn bereits Schuhe ausgerüstet sind.
    }
    if (armorType === "shield" && equippedShield !== null) {
        alert("Du hast bereits ein Schild ausgerüstet. Verkaufe es zuerst, um ein neues zu kaufen.");
        return; // Beende die Funktion, wenn bereits ein Schild ausgerüstet ist.
    }

    if (gold >= armorPrice) {  
        gold -= armorPrice;  
        armor += armorValue;  

        updateArmorText();  // Aktualisiere die Rüstungsanzeige

        document.getElementById('goldText').textContent = gold;
        document.getElementById('armorText').textContent = armor;

        // Je nach Rüstungstyp in die entsprechende Box legen
        if (armorType === "helmet") {
            equippedHelmet = { armorValue, armorPrice, armorImage };
            document.getElementById('headBox').innerHTML = `
                <img src="${armorImage}" alt="Helm" style="width: 130px; height: 130px; border-radius: 20px;">
                <p>Rüstung: ${armorValue}</p>
            `;
        } else if (armorType === "chest") {
            equippedChest = { armorValue, armorPrice, armorImage };
            document.getElementById('chestBox').innerHTML = `
                <img src="${armorImage}" alt="Brustpanzer" style="width: 130px; height: 130px; border-radius: 20px;">
                <p>Rüstung: ${armorValue}</p>
            `;
        } else if (armorType === "shoes") {
            equippedShoes = { armorValue, armorPrice, armorImage };
            document.getElementById('shoeBox').innerHTML =` 
                <img src="${armorImage}" alt="Schuhe" style="width: 130px; height: 130px; border-radius: 20px;">
                <p>Rüstung: ${armorValue}</p>
            `;
        } else if (armorType === "shield") {
            equippedShield = { armorValue, armorPrice, armorImage };
            document.getElementById('shieldBox').innerHTML = `
                <img src="${armorImage}" alt="Schild" style="width: 130px; height: 130px; border-radius: 20px;">
                <p>Rüstung: ${armorValue}</p>
            `;
        }

        closeArmorModal();  // Schließe das Rüstungsmodal nach dem Kauf
    } else {
        alert("Nicht genug Gold!");  // Fehlermeldung bei unzureichendem Gold
    }
}

function updateArmorText() {
    const armorPercentage = calculateDamageReductionPercentage(armor); 
    document.getElementById('defText').textContent = `${armorPercentage.toFixed(2)}%`; // Zeige Rüstungswert in % an
}

function calculateDamageReductionPercentage(armor) {
    const reduction = armor * 0.08; // Jede Rüstungseinheit reduziert den Schaden um 0.08 %
    return Math.min(reduction, 100); // Maximal 100 % Reduktion
}

function sellHelmet() {
    if (equippedHelmet) {
        const sellPrice = Math.floor(equippedHelmetPrice * 0.5);
        gold += sellPrice;
        armor -= equippedHelmetArmor;

        document.getElementById('goldText').textContent = gold;
        document.getElementById('armorText').textContent = armor;

        // Entferne den Helm aus der Anzeige
        document.getElementById('headBox').innerHTML = "<p></p>";

        // Setze die Helm-Daten zurück
        resetEquipment('helmet');

        closeSellHelmetModal();
    }
};




function openArmorModal(armor, armorValue, armorPrice, armorType) {
    // Sicherstellen, dass das Armor-Objekt existiert
    if (!armor || !armor.baseArmor) {
        console.error("Das übergebene Armor-Objekt ist undefiniert oder fehlerhaft:", armor);
        return;
    }

    // Elemente für das Rüstungsmodal setzen
    const armorNameElement = document.getElementById("armorName");
    const armorImageElement = document.getElementById("armorImage");
    const armorPriceElement = document.getElementById("armorPrice");
    const armorValueElement = document.getElementById("armorValue");

    if (armorNameElement && armorImageElement && armorPriceElement && armorValueElement) {
        armorNameElement.textContent = armor.name;
        armorImageElement.src = armor.image;
        armorImageElement.style.width = "130px";  // Feste Breite setzen
        armorImageElement.style.height = "130px"; // Feste Höhe setzen
        armorPriceElement.textContent = armorPrice;
        armorValueElement.textContent = armorValue;

        // Klick-Handler für das Kaufen setzen
        document.getElementById("buyArmorButton").onclick = function() {
            buyArmor(armorType, armorValue, armorPrice, armor.image);
        };

        // Den Verkaufsbutton ausblenden, da er beim Kauf eines Rüstungsteils nicht notwendig ist
        const sellButton = document.getElementById("confirmSellButton");
        if (sellButton) {
            sellButton.style.display = "none"; // Button ausblenden
        }

        document.getElementById("armorModal").style.display = "block";
    } else {
        console.error("Ein oder mehrere Elemente wurden nicht gefunden.");
    }
}


function closeSellArmorModal() {
    const sellArmorModal = document.getElementById("sellArmorModal");
    sellArmorModal.style.display = "none";
};


















function showArmor() {
    // Zufällig mischen
    const shuffledHelmArmor = shuffleArmor([...helmArmor]);
    const shuffledChestArmor = shuffleArmor([...chestArmor]);
    const shuffledShoeArmor = shuffleArmor([...shoeArmor]);
    const shuffledShields = shuffleArmor([...shield]);

    const level = parseInt(document.getElementById('levelBox').textContent);

    // Helme in Tradebox 3 einfügen
    if (shuffledHelmArmor && shuffledHelmArmor.length > 0) {
        const helm = shuffledHelmArmor[0];
        const helmArmorValue = generateArmorValue(helm.baseArmor, level);
        const helmPrice = calculateArmorPrice(helm.basePrice, helmArmorValue, helm.baseArmor);

        tradeBox3.innerHTML = `
            <img src="${helm.image}" alt="${helm.name}" style="width: 130px; height: 130px; border-radius: 20px" onclick='openArmorModal(${JSON.stringify(helm)}, ${helmArmorValue}, ${helmPrice}, "helmet")'>
            <p>${helm.name}</p>
        `;
    } else {
        console.error("shuffledHelmArmor ist leer oder nicht definiert.");
    }

    // Brustrüstungen in Tradebox 4 einfügen
    if (shuffledChestArmor && shuffledChestArmor.length > 0) {
        const chest = shuffledChestArmor[0];
        const chestArmorValue = generateArmorValue(chest.baseArmor, level);
        const chestPrice = calculateArmorPrice(chest.basePrice, chestArmorValue, chest.baseArmor);

        tradeBox4.innerHTML = `
            <img src="${chest.image}" alt="${chest.name}" style="width: 130px; height: 130px; border-radius: 20px" onclick='openArmorModal(${JSON.stringify(chest)}, ${chestArmorValue}, ${chestPrice}, "chest")'>
            <p>${chest.name}</p>
        `;
    } else {
        console.error("shuffledChestArmor ist leer oder nicht definiert.");
    }

    // Schuhe in Tradebox 5 einfügen
    if (shuffledShoeArmor && shuffledShoeArmor.length > 0) {
        const shoes = shuffledShoeArmor[0];
        const shoeArmorValue = generateArmorValue(shoes.baseArmor, level);
        const shoePrice = calculateArmorPrice(shoes.basePrice, shoeArmorValue, shoes.baseArmor);

        tradeBox5.innerHTML = `
            <img src="${shoes.image}" alt="${shoes.name}" style="width: 130px; height: 130px; border-radius: 20px" onclick='openArmorModal(${JSON.stringify(shoes)}, ${shoeArmorValue}, ${shoePrice}, "shoes")'>
            <p>${shoes.name}</p>
        `;
    } else {
        console.error("shuffledShoeArmor ist leer oder nicht definiert.");
    }

    // Schilde in Tradebox 6 einfügen
    if (shuffledShields && shuffledShields.length > 0) {
        const shieldItem = shuffledShields[0];
        const shieldArmorValue = generateArmorValue(shieldItem.baseArmor, level);
        const shieldPrice = calculateArmorPrice(shieldItem.basePrice, shieldArmorValue, shieldItem.baseArmor);

        tradeBox6.innerHTML = `
            <img src="${shieldItem.image}" alt="${shieldItem.name}" style="width: 130px; height: 130px; border-radius: 20px" onclick='openArmorModal(${JSON.stringify(shieldItem)}, ${shieldArmorValue}, ${shieldPrice}, "shield")'>
            <p>${shieldItem.name}</p>
        `;
    } else {
        console.error("shuffledShields ist leer oder nicht definiert.");
    }
}

function shuffleArmor(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function generateArmorValue(baseArmor, level) {
    const armorMultiplier = 1 + level * 0.5;
    const randomFactor = Math.random() * 0.5 + 0.75;
    return Math.floor(baseArmor * armorMultiplier * randomFactor);
}

function calculateArmorPrice(basePrice, armorValue, baseArmor) {
    const priceMultiplier = armorValue / baseArmor;
    return Math.floor(basePrice * priceMultiplier + 20);
}


function closeArmorModal() {
    var armorModal = document.getElementById("armorModal");
    if (armorModal) {
        armorModal.style.display = "none";
    } else {
        console.error("Armor modal not found!");
    }
}


button1.onclick = goBack;
button2.onclick = goShop;
button3.onclick = goAdventure;
button4.onclick = goDungeon;
button5.onclick = goPlay;
button6.onclick = reportBug;
button7.onclick = buyHP;
button8.onclick = buyStrength;
button9.onclick = buyDef;
button13.onclick = goAd1;
button14.onclick = goAd2;
button15.onclick = goAd3;
button16.onclick = goAd4;
button17.onclick = cancel;

function update(location) {
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    button4.innerText = location["button text"][3];
    button5.innerText = location["button text"][4];
    button6.innerText = location["button text"][5];
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
    button4.onclick = location["button functions"][3];
    button5.onclick = location["button functions"][4];
    button6.onclick = location["button functions"][5];
    textBox.innerText = location.text;
}

const locations = [
    {   
        name: "go back",
        "button text": ["Charakter", "Händler", "Abenteuer", "Dungeon", "Würfelspiel", "Bug Melden"],
        "button functions": [goBack, goShop, goAdventure, goDungeon, goPlay, reportBug],
        text: "Du stehst inmitten der Stadt. Besuche den Händler, jage Monster oder Stelle dich den Dungeon Bossen!"
    },
    {
        name: "goShop",
        "button text": ["Charakter", "Händler", "Abenteuer", "Dungeon", "Würfelspiel", "Bug Melden"],
        "button functions": [goBack, goShop, goAdventure, goDungeon, goPlay, reportBug],
        text: "Das ist der Händler. Kaufe oder Verkaufe deine Waffen, Schilde und Rüstungen."
    },
    {
        name: "goAdventure",
        "button text": ["Charakter", "Händler", "Abenteuer", "Dungeon", "Würfelspiel", "Bug Melden"],
        "button functions": [goBack, goShop, goAdventure, goDungeon, goPlay, reportBug],
        text: "Du verlässt die Stadt um Kreaturen zu jagen... Wohin wirst du gehen?"
    },
    {   
        name: "goPlay",
        "button text": ["Charakter", "Händler", "Abenteuer", "Dungeon", "Würfelspiel", "Bug Melden"],
        "button functions": [goBack, goShop, goAdventure, goDungeon, goPlay, reportBug],
        text: "Ein Mann lädt dich auch ein Würfelspiel ein. Keiner weiß auf wessen Seite das Glück sein wird..."
    },
];

function getRandomEasyMonster() {
    const randomIndex = Math.floor(Math.random() * easyMonsters.length);
    return easyMonsters[randomIndex];
}

function showWeapons() {
    const shuffledWeapons = shuffleWeapons([...weapons]);
    const tradeBoxes = [tradeBox1, tradeBox2]; // Nur TradeBox1 und TradeBox2 werden verwendet
    const level = parseInt(document.getElementById('levelBox').textContent);

    // Waffen in die ersten zwei Boxen einfügen
    shuffledWeapons.slice(0, tradeBoxes.length).forEach((weapon, index) => {
        const weaponPower = generateWeaponPower(weapon.basePower, level);
        const weaponPrice = calculateWeaponPrice(weapon.basePrice, weaponPower, weapon.basePower);

        if (tradeBoxes[index]) {
            tradeBoxes[index].innerHTML = `
                <img src="${weapon.image}" alt="${weapon.name}" style="width: 130px; height: 130px; border-radius: 20px" onclick='openWeaponModal(${JSON.stringify(weapon)}, ${weaponPower}, ${weaponPrice})'>
                <p>${weapon.name}</p>
            `;
        }
    });
}

function shuffleWeapons(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function openWeaponModal(weapon, weaponPower, weaponPrice) {
    document.getElementById("weaponName").textContent = weapon.name;
    document.getElementById("weaponImage").src = weapon.image;
    document.getElementById("weaponPrice").textContent = weaponPrice;
    document.getElementById("weaponPower").textContent = weaponPower;
    document.getElementById("confirmSellButton").onclick = sellWeapon;
    document.getElementById("cancelSellButton").onclick = closeSellWeaponModal;
    document.getElementById("buyWeaponButton").onclick = function() {
        buyWeapon(weapon, weaponPower, weaponPrice);
    };
    document.getElementById("weaponModal").style.display = "block";
}

function buyWeapon(weapon, weaponPower, weaponPrice) {
    if (equippedWeapon !== null) {
        alert("Du hast bereits eine Waffe ausgerüstet. Verkaufe sie zuerst, um eine neue zu kaufen.");
        return; // Beende die Funktion, wenn bereits eine Waffe ausgerüstet ist.
    }

    if (gold >= weaponPrice) {
        gold -= weaponPrice;
        power += weaponPower; // Waffenstärke wird zur Power hinzugefügt
        
        // Speichere den Preis der gekauften Waffe
        equippedWeaponPrice = weaponPrice; // Hier wird der Preis gespeichert
        
        document.getElementById('goldText').textContent = gold;
        document.getElementById('attackText').textContent = power;
        
        equippedWeapon = weapon;
        equippedWeaponPower = weaponPower;

        document.getElementById('weaponBox').innerHTML = `
            <img src="${weapon.image}" alt="Waffe" style="width: 130px; height: 130px; border-radius: 20px;" onclick="openSellWeaponModal()">
            <p>Stärke: ${weaponPower}</p>
        `;

        closeModal();
    } else {
        alert("Nicht genug Gold!");
    }
}

function openSellWeaponModal() {
    const sellWeaponModal = document.getElementById("sellWeaponModal");
    const confirmSellButton = document.getElementById("confirmSellButton");

    if (sellWeaponModal) {
        sellWeaponModal.style.display = "block";
        
        // Sicherstellen, dass der Button sichtbar ist
        confirmSellButton.style.display = "block";
    } else {
        console.error("Sell Weapon Modal nicht gefunden!");
    }
}
function closeSellWeaponModal() {
    var sellWeaponModal = document.getElementById("sellWeaponModal");
    sellWeaponModal.style.display = "none";
}


function sellWeapon() {
    if (equippedWeapon) {
        const sellPrice = Math.floor(equippedWeaponPrice * 0.5); // Hälfte des Kaufpreises
        gold += sellPrice;
        power -= equippedWeaponPower;

        document.getElementById('goldText').textContent = gold;
        document.getElementById('attackText').textContent = power;

        // Entferne die Waffe aus der Anzeige
        document.getElementById('weaponBox').innerHTML = "<p></p>";

        // Setze die ausgerüstete Waffe zurück
        equippedWeapon = null;
        equippedWeaponPrice = 0;
        equippedWeaponPower = 0;

        closeSellWeaponModal();
    }
}

function closeModal() {
    document.getElementById("weaponModal").style.display = "none";
}

function buyStrength(){
    if(gold >=30){
        gold -= 30;
        power += 1;
        attackText.innerText = power;
        goldText.innerText = gold;
        strongText.innerText++;
        textBox.innerText = "Du hast deine Stärke um 1 erhöht!";
    } else {
        textBox.innerText = "Du hast nicht genug Gold!";
    }
}

function buyDef() {
    if (gold >= 30) {
        gold -= 30;
        armor += 1;

        // Rufe die Funktion auf, um die Rüstung in % anzuzeigen
        updateArmorText();

        // Aktualisiere das Gold
        goldText.innerText = gold;

        // Es ist nicht mehr nötig, den Wert direkt in defText zu setzen, 
        // da updateArmorText dies bereits tut.
        textBox.innerText = "Du hast deine Rüstung um 1 erhöht!";
        
        // Aktualisiere den Rüstungswert in der Anzeige
        armorText.innerText = parseInt(armorText.innerText) + 1;
    } else {
        textBox.innerText = "Du hast nicht genug Gold!";
    }
}

function buyHP() {
    if (gold >= 30) {
        gold -= 30; // Gold verringern
        maxHp += 10; // Maximale Gesundheit erhöhen
        hp = maxHp;  // Setzt die aktuelle HP auf das neue Maximum

        goldText.innerText = gold; // Goldtext aktualisieren
        healthText.innerText = maxHp; // Max. Gesundheit im normalen UI aktualisieren
        healthText1.innerText = maxHp; // Max. Gesundheit im Kampf-UI aktualisieren
        textBox.innerText = "Du hast deine Maximale Gesundheit um 10 erhöht!";
        konstText.innerText++; // Aktualisiere den Stat-Text (falls vorhanden)
    } else {
        textBox.innerText = "Du hast nicht genug Gold!";
    }
}

const movementArea = {
    width: 965,
    height: 700,
};

function moveCharacterSmoothly() {
    if (characterAnimationId) {
        cancelAnimationFrame(characterAnimationId);
    }
    if (characterMoveTimeoutId) {
        clearTimeout(characterMoveTimeoutId);
    }

    const character = document.getElementById('characterPicture');
    const map = document.getElementById('map');
    const mapRect = map.getBoundingClientRect();
    const characterRect = character.getBoundingClientRect();

    const maxStep = 130;
    let deltaX = Math.random() * maxStep * 2 - maxStep;  // Zufällige Bewegung für X-Achse
    let deltaY = Math.random() * maxStep * 2 - maxStep;  // Zufällige Bewegung für Y-Achse

    let newLeft = character.offsetLeft + deltaX;
    let newTop = character.offsetTop + deltaY;

    // Prüfen, ob der Charakter den Rand der Karte berührt
    if (newLeft <= 0) {
        newLeft += 80; // Bewege nach rechts in die Mitte
    } else if (newLeft + characterRect.width >= mapRect.width) {
        newLeft -= 80; // Bewege nach links in die Mitte
    }

    if (newTop <= 0) {
        newTop += 80; // Bewege nach unten in die Mitte
    } else if (newTop + characterRect.height >= mapRect.height) {
        newTop -= 80; // Bewege nach oben in die Mitte
    }

    // Setze neue Positionen
    character.style.left = `${newLeft}px`;
    character.style.top = `${newTop}px`;

    characterMoveTimeoutId = setTimeout(() => {
        characterAnimationId = requestAnimationFrame(moveCharacterSmoothly);
    }, 500);
}

function moveMonsterSmoothly(monsterElement, index) {
    if (monsterAnimationIds[index]) {
        cancelAnimationFrame(monsterAnimationIds[index]);
    }

    if (monsterMoveTimeoutIds[index]) {
        clearTimeout(monsterMoveTimeoutIds[index]);
    }

    const map = document.getElementById('map');
    const mapRect = map.getBoundingClientRect();
    const monsterRect = monsterElement.getBoundingClientRect();

    const maxStep = 120;
    let deltaX = Math.random() * maxStep * 2 - maxStep;  // Zufällige Bewegung für X-Achse
    let deltaY = Math.random() * maxStep * 2 - maxStep;  // Zufällige Bewegung für Y-Achse

    let newLeft = monsterElement.offsetLeft + deltaX;
    let newTop = monsterElement.offsetTop + deltaY;

    // Prüfen, ob das Monster den Rand der Karte berührt
    if (newLeft <= 0) {
        newLeft += 80; // Bewege nach rechts in die Mitte
    } else if (newLeft + monsterRect.width >= mapRect.width) {
        newLeft -= 80; // Bewege nach links in die Mitte
    }

    if (newTop <= 0) {
        newTop += 80; // Bewege nach unten in die Mitte
    } else if (newTop + monsterRect.height >= mapRect.height) {
        newTop -= 80; // Bewege nach oben in die Mitte
    }

    // Setze neue Positionen
    monsterElement.style.left = `${newLeft}px`;
    monsterElement.style.top = `${newTop}px`;

    monsterMoveTimeoutIds[index] = setTimeout(() => {
        monsterAnimationIds[index] = requestAnimationFrame(() => moveMonsterSmoothly(monsterElement, index));
    }, 500);
}

function startAdventure() {
    moveCharacterSmoothly();
}

function goBack() {
    update(locations[0]);
    expBox.style.display = "block";
    nameInput.style.display = "block";
    document.getElementById("healthText").style.display = "inline-block";
    document.getElementById("attackText").style.display = "inline-block";
    document.getElementById("defText").style.display = "inline-block";
    skillStat1.style.display = "block";
    skillStat2.style.display = "block";
    skillStat3.style.display = "block";
    levelBox.style.display = "block";
    xpBox.style.display = "block";
    rankBox.style.display = "block";
    statCont.style.display = "block";
    playBoard.style.display = "none";
    button7.style.display = "block";
    button8.style.display = "block";
    button9.style.display = "block";
    characterPicture.style.display = "block";
    namen.style.display = "block";
    stufe.style.display = "block";
    erfahrung.style.display = "block";
    rang.style.display = "block";
    nameBox.style.display = "block";
    tradeBox1.style.display = "none";
    tradeBox2.style.display = "none";
    tradeBox3.style.display = "none";
    tradeBox4.style.display = "none";
    tradeBox5.style.display = "none";
    tradeBox6.style.display = "none";
    trader.style.display = "none";
    headBox.style.display = "block";
    chestBox.style.display = "block";
    weaponBox.style.display = "block";
    shieldBox.style.display = "block";
    shoeBox.style.display = "block";
    board.style.display = "none";
    button13.style.display = "none";
    button14.style.display = "none";
    button15.style.display = "none";
    button16.style.display = "none";
    monsterStat.style.display = "none";
}

function generateWeaponPower(basePower, level) {
    const powerMultiplier = 1 + level * 0.75;
    const randomFactor = Math.random() * 0.5 + 0.9;
    return Math.floor(basePower * powerMultiplier * randomFactor);
}

function calculateWeaponPrice(basePrice, weaponPower, basePower) {
    const priceMultiplier = weaponPower / basePower;
    return Math.floor(basePrice * priceMultiplier + 16);
}

function goShop() {
    showArmor();
    update(locations[1]);
    expBox.style.display = "none";
    nameInput.style.display = "none";
    healthText.style.display = "none";
    attackText.style.display = "none";
    defText.style.display = "none";
    skillStat1.style.display = "none";
    skillStat2.style.display = "none";
    skillStat3.style.display = "none";
    levelBox.style.display = "none";
    xpBox.style.display = "none";
    rankBox.style.display = "none";
    statCont.style.display = "none";
    button7.style.display = "none";
    button8.style.display = "none";
    playBoard.style.display = "none";
    button9.style.display = "none";
    characterPicture.style.display = "none";
    namen.style.display = "none";
    stufe.style.display = "none";
    erfahrung.style.display = "none";
    rang.style.display = "none";
    nameBox.style.display = "none";
    tradeBox1.style.display = "block";
    tradeBox2.style.display = "block";
    tradeBox3.style.display = "block";
    tradeBox4.style.display = "block";
    tradeBox5.style.display = "block";
    tradeBox6.style.display = "block";
    trader.style.display = "block";
    headBox.style.display = "block";
    chestBox.style.display = "block";
    weaponBox.style.display = "block";
    shieldBox.style.display = "block";
    shoeBox.style.display = "block";
    board.style.display = "none";
    button13.style.display = "none";
    button14.style.display = "none";
    button15.style.display = "none";
    button16.style.display = "none";
    monsterStat.style.display = "none";

    showWeapons();
}

function goAdventure() {
    update(locations[2]);
    textBox.style.display = "block";
    expBox.style.display = "none"
    nameInput.style.display = "none"
    healthText.style.display = "none"
    attackText.style.display = "none"
    defText.style.display = "none"
    skillStat1.style.display = "none"
    skillStat2.style.display = "none"
    skillStat3.style.display = "none"
    levelBox.style.display = "none"
    xpBox.style.display = "none"
    rankBox.style.display = "none"
    statCont.style.display = "none"
    button7.style.display = "none"
    button8.style.display = "none"
    button9.style.display = "none"
    characterPicture.style.display = "none"
    namen.style.display = "none"
    stufe.style.display = "none"
    erfahrung.style.display = "none"
    rang.style.display = "none"
    nameBox.style.display = "none"
    tradeBox1.style.display = "none"
    tradeBox2.style.display = "none"
    tradeBox3.style.display = "none"
    playBoard.style.display = "none";
    tradeBox4.style.display = "none"
    tradeBox5.style.display = "none"
    tradeBox6.style.display = "none"
    trader.style.display = "none"
    headBox.style.display = "none"
    chestBox.style.display = "none"
    weaponBox.style.display = "none"
    shieldBox.style.display = "none"
    shoeBox.style.display = "none"
    board.style.display = "block"
    button13.style.display = "block"
    button14.style.display = "block"
    button15.style.display = "block"
    button16.style.display = "block"
    monsterStat.style.display = "none"

}

function goAd1() {
    disableButtonWithCountdown(button17, 10);
    const map = document.getElementById('map');
    map.style.backgroundImage = "url('files/map3.jpeg')"; // Pfad zu deinem Bild
    expBox.style.display = "none";
    nameInput.style.display = "none";
    healthText.style.display = "none";
    attackText.style.display = "none";
    defText.style.display = "none";
    skillStat1.style.display = "none";
    skillStat2.style.display = "none";
    skillStat3.style.display = "none";
    levelBox.style.display = "none";
    xpBox.style.display = "none";
    rankBox.style.display = "none";
    statCont.style.display = "none";
    button7.style.display = "none";
    button8.style.display = "none";
    button9.style.display = "none";
    characterPicture.style.display = "block";
    namen.style.display = "none";
    stufe.style.display = "none";
    erfahrung.style.display = "none";
    rang.style.display = "none";
    nameBox.style.display = "none";
    tradeBox1.style.display = "none";
    tradeBox2.style.display = "none";
    tradeBox3.style.display = "none";
    tradeBox4.style.display = "none";
    tradeBox5.style.display = "none"
    tradeBox6.style.display = "none"
    trader.style.display = "none";
    headBox.style.display = "none";
    chestBox.style.display = "none";
    playBoard.style.display = "none";
    weaponBox.style.display = "none";
    shieldBox.style.display = "none";
    shoeBox.style.display = "none";
    board.style.display = "none";
    button13.style.display = "none";
    button14.style.display = "none";
    button15.style.display = "none";
    button16.style.display = "none";
    textBox.style.display = "none";
    map.style.display = "block";
    button1.style.display = "none";
    button2.style.display = "none";
    button3.style.display = "none";
    button4.style.display = "none";
    button10.style.display = "none";
    button11.style.display = "none";
    button12.style.display = "none";
    button6.style.display = "none";
    button5.style.display = "none";
    button17.style.display = "block";
    map.style.display = "block";
    monsterStat.style.display = "block";
    stopCollisionCheck();
    resetAnimations();
    resetCharacterAndMonsterPositions();
    initializeMonsterPositions(easyMonsters);
    startCollisionCheck();
    startAdventure();
    

    const monsterElements = [1, 2, 3, 4, 5].map(i => document.getElementById(`monster${i}`));
    monsterElements.forEach((monster, index) => moveMonsterSmoothly(monster, index));

    const randomMonsters = [];

    if (originalMonsterPositions.length === 0) {
        monsterElements.forEach((monsterElement, index) => {
            originalMonsterPositions.push({
                left: monsterElement.style.left,
                top: monsterElement.style.top,
            });
        });

        const characterElement = document.getElementById("characterPicture");
        originalCharacterPosition = {
            left: characterElement.style.left,
            top: characterElement.style.top,
        };
    }

    while (randomMonsters.length < 3) {
        const randomMonster = getRandomEasyMonster();
        if (!randomMonsters.includes(randomMonster)) {
            randomMonsters.push(randomMonster);
        }
    }

    randomMonsters.forEach((monster, index) => {
        const monsterElement = monsterElements[index];
        monsterElement.style.display = "block";
        monsterElement.style.backgroundImage = `url('${monster.image}')`;
        monsterElement.style.backgroundSize = "cover";
        moveMonsterSmoothly(monsterElement, index);
    });

    const character = document.getElementById('characterPicture');
    character.style.left = originalCharacterPosition.left;
    character.style.top = originalCharacterPosition.top;

    startAdventure();
}



function checkCollision(characterElement, monsterElement) {
    const characterRect = characterElement.getBoundingClientRect();
    const monsterRect = monsterElement.getBoundingClientRect();

    const isColliding = (
        characterRect.left < monsterRect.right &&
        characterRect.right > monsterRect.left &&
        characterRect.top < monsterRect.bottom &&
        characterRect.bottom > monsterRect.top
    );

    if (isColliding) {
        console.log(`Kollision mit Monster: ${monsterElement.dataset.name}`); // Debug-Log
        
        resetMonsterToPosition(monsterElement);
        hideOtherMonsters(monsterElement);
        clearTimeout(characterMoveTimeoutId);
        cancelAnimationFrame(characterAnimationId);

        // Monster-Daten aus dem dataset-Attribut holen
        currentFightingMonster = {
            name: monsterElement.dataset.name,
            level: parseInt(monsterElement.dataset.level),
            health: parseInt(monsterElement.dataset.health)
        };

        const monsterHPText = document.getElementById("monsterHPText");
        const monsterNameBox = document.getElementById("monsterNameBox");
        const monsterLevelBox = document.getElementById("monsterLevelBox");
        const secondMonsterBox = document.getElementById("secondMonsterBox");

        if (monsterHPText) {
            monsterHPText.textContent = currentFightingMonster.health;
        }

        if (monsterNameBox) {
            monsterNameBox.textContent = currentFightingMonster.name;
        }

        if (monsterLevelBox) {
            monsterLevelBox.textContent = currentFightingMonster.level;
        }

        if (secondMonsterBox) {
            secondMonsterBox.textContent = currentFightingMonster.name;
        }

        goFight();
    }

    return isColliding;
}

function resetMonsterToPosition(monsterElement) {
    const monsterName = monsterElement.dataset.name; // Angenommen, du hast ein dataset-Attribut "name"
    const originalPosition = originalMonsterPositions.find(pos => pos.name === monsterName);

    if (originalPosition) {
        monsterElement.style.left = '780px';
        monsterElement.style.top = '50px';
        monsterElement.style.position = 'absolute';
    } else {
        monsterElement.style.left = '780px'; // Standardwert oder ursprüngliche Position
        monsterElement.style.top = '50px';
        monsterElement.style.position = 'absolute';
    }
}


function hideOtherMonsters(currentMonster) {
    const monsterElements = [
        document.getElementById("monster1"), 
        document.getElementById("monster2"), 
        document.getElementById("monster3"),
        document.getElementById("monster4"),
        document.getElementById("monster5"),
    
    ];

    monsterElements.forEach((monster) => {
        if (monster !== currentMonster) {
            monster.style.display = 'none';
        }
    });
}

function resetMonsterTimeouts() {
    monsterMoveTimeoutIds.forEach((timeoutId, index) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
            monsterMoveTimeoutIds[index] = null;
        }
    });
}

function resetCharacterAndMonsterPositions() {
    const monsterElements = [document.getElementById("monster1"), document.getElementById("monster2"), document.getElementById("monster3")];

    if (originalMonsterPositions.length === 0) {
        return;  // Rückgabe, wenn die ursprünglichen Positionen nicht initialisiert wurden
    }

    monsterElements.forEach((monsterElement, index) => {
        if (!originalMonsterPositions[index]) {
            return;  // Rückgabe, wenn keine Position für das Monster gespeichert wurde
        }

        monsterElement.style.left = originalMonsterPositions[index].left;
        monsterElement.style.top = originalMonsterPositions[index].top;
        monsterElement.style.display = "block";
    });

    const character = document.getElementById('characterPicture');
    character.style.left = originalCharacterPosition.left;
    character.style.top = originalCharacterPosition.top;
}

function checkCollisionsContinuously() {
    const character = document.getElementById('characterPicture');
    const monsters = [
        document.getElementById('monster1'),
        document.getElementById('monster2'),
        document.getElementById('monster3'),
        document.getElementById('monster4'),
        document.getElementById('monster5')
    ];

    for (let monster of monsters) {
        if (checkCollision(character, monster)) {
            goFight();
            break; // Beende die Schleife, wenn eine Kollision gefunden wurde
        }
    }

    collisionCheckId = requestAnimationFrame(checkCollisionsContinuously);
}

requestAnimationFrame(checkCollisionsContinuously);

function startCollisionCheck() {
    if (collisionCheckId) {
        cancelAnimationFrame(collisionCheckId);
    }
    collisionCheckId = requestAnimationFrame(checkCollisionsContinuously);
}

function stopCollisionCheck() {
    if (collisionCheckId) {
        cancelAnimationFrame(collisionCheckId);
        collisionCheckId = null;
    }
}

function initializeMonsterPositions(monstersArray) {
    const monsterElements = [
        document.getElementById("monster1"), 
        document.getElementById("monster2"), 
        document.getElementById("monster3"),
        document.getElementById("monster4"), 
        document.getElementById("monster5")
    ]; // Jetzt für alle 5 Monster
    const map = document.getElementById('map');
    const mapRect = map.getBoundingClientRect();

    const randomMonsters = [];

    // Wähle 5 zufällige Monster aus dem übergebenen Array
    while (randomMonsters.length < 5) {
        const randomMonster = monstersArray[Math.floor(Math.random() * monstersArray.length)];
        if (!randomMonsters.includes(randomMonster)) {
            randomMonsters.push(randomMonster);
        }
    }

    randomMonsters.forEach((monster, index) => {
        const monsterElement = monsterElements[index];
        monsterElement.style.display = "block";
        monsterElement.style.backgroundImage = `url('${monster.image}')`;
        monsterElement.style.backgroundSize = "cover";
    
        // Speichere Monster-Daten als Dataset
        monsterElement.dataset.name = monster.name;
        monsterElement.dataset.level = monster.level;
        monsterElement.dataset.health = monster.health;
    
        const rightHalfStart = mapRect.width / 3;
        let randomLeft = rightHalfStart + Math.random() * (mapRect.width / 2 - monsterElement.offsetWidth);
        let randomTop = Math.random() * (mapRect.height - monsterElement.offsetHeight);
    
        monsterElement.style.left = `${randomLeft}px`;
        monsterElement.style.top = `${randomTop}px`;
    
        originalMonsterPositions[index] = { left: monsterElement.style.left, top: monsterElement.style.top };
    });

    const characterElement = document.getElementById("characterPicture");
    originalCharacterPosition = {
        left: characterElement.style.left,
        top: characterElement.style.top,
    };
}

function getRandomMediumMonster() {
    const randomIndex = Math.floor(Math.random() * meduimMonsters.length);
    return meduimMonsters[randomIndex];
}

function goAd2() {
    const map = document.getElementById('map');
    map.style.backgroundImage = "url('files/map4.jpeg')"; // Pfad zu deinem Bild
    expBox.style.display = "none";
    nameInput.style.display = "none";
    healthText.style.display = "none";
    attackText.style.display = "none";
    defText.style.display = "none";
    skillStat1.style.display = "none";
    skillStat2.style.display = "none";
    skillStat3.style.display = "none";
    levelBox.style.display = "none";
    xpBox.style.display = "none";
    rankBox.style.display = "none";
    statCont.style.display = "none";
    button7.style.display = "none";
    button8.style.display = "none";
    button9.style.display = "none";
    characterPicture.style.display = "block";
    namen.style.display = "none";
    stufe.style.display = "none";
    erfahrung.style.display = "none";
    rang.style.display = "none";
    nameBox.style.display = "none";
    tradeBox1.style.display = "none";
    tradeBox2.style.display = "none";
    tradeBox3.style.display = "none";
    tradeBox4.style.display = "none";
    tradeBox5.style.display = "none";
    tradeBox6.style.display = "none";
    trader.style.display = "none";
    headBox.style.display = "none";
    chestBox.style.display = "none";
    weaponBox.style.display = "none";
    shieldBox.style.display = "none";
    shoeBox.style.display = "none";
    board.style.display = "none";
    button13.style.display = "none";
    button14.style.display = "none";
    playBoard.style.display = "none";
    button15.style.display = "none";
    button16.style.display = "none";
    textBox.style.display = "none";
    map.style.display = "block";
    button1.style.display = "none";
    button2.style.display = "none";
    button3.style.display = "none";
    button4.style.display = "none";
    button10.style.display = "none";
    button11.style.display = "none";
    button12.style.display = "none";
    button6.style.display = "none";
    button5.style.display = "none";
    button17.style.display = "block";
    map.style.display = "block";
    monsterStat.style.display = "block";
    stopCollisionCheck();
    resetAnimations();
    resetCharacterAndMonsterPositions();
    initializeMonsterPositions(meduimMonsters);
    startCollisionCheck();
    startAdventure();

    const monsterElements = [1, 2, 3, 4, 5].map(i => document.getElementById(`monster${i}`));
    monsterElements.forEach((monster, index) => moveMonsterSmoothly(monster, index));

    const randomMonsters = [];

    if (originalMonsterPositions.length === 0) {
        monsterElements.forEach((monsterElement, index) => {
            originalMonsterPositions.push({
                left: monsterElement.style.left,
                top: monsterElement.style.top,
            });
        });

        const characterElement = document.getElementById("characterPicture");
        originalCharacterPosition = {
            left: characterElement.style.left,
            top: characterElement.style.top,
        };
    }

    while (randomMonsters.length < 3) {
        const randomMonster = getRandomMediumMonster();  // Verwende die neue Funktion
        if (!randomMonsters.includes(randomMonster)) {
            randomMonsters.push(randomMonster);
        }
    }

    randomMonsters.forEach((monster, index) => {
        const monsterElement = monsterElements[index];
        monsterElement.style.display = "block";
        monsterElement.style.backgroundImage = `url('${monster.image}')`;
        monsterElement.style.backgroundSize = "cover";
        moveMonsterSmoothly(monsterElement, index);
    });

    const character = document.getElementById('characterPicture');
    character.style.left = originalCharacterPosition.left;
    character.style.top = originalCharacterPosition.top;

    startAdventure();
}

function goAd3() {
    const map = document.getElementById('map');
    map.style.backgroundImage = "url('files/map6.jpeg')"; // Pfad zu deinem Bild
    expBox.style.display = "none";
    nameInput.style.display = "none";
    healthText.style.display = "none";
    attackText.style.display = "none";
    defText.style.display = "none";
    skillStat1.style.display = "none";
    skillStat2.style.display = "none";
    skillStat3.style.display = "none";
    levelBox.style.display = "none";
    xpBox.style.display = "none";
    rankBox.style.display = "none";
    statCont.style.display = "none";
    button7.style.display = "none";
    button8.style.display = "none";
    button9.style.display = "none";
    characterPicture.style.display = "block";
    namen.style.display = "none";
    stufe.style.display = "none";
    erfahrung.style.display = "none";
    rang.style.display = "none";
    nameBox.style.display = "none";
    tradeBox1.style.display = "none";
    tradeBox2.style.display = "none";
    tradeBox3.style.display = "none";
    tradeBox4.style.display = "none";
    tradeBox5.style.display = "none";
    tradeBox6.style.display = "none";
    trader.style.display = "none";
    headBox.style.display = "none";
    chestBox.style.display = "none";
    weaponBox.style.display = "none";
    playBoard.style.display = "none";
    shieldBox.style.display = "none";
    shoeBox.style.display = "none";
    board.style.display = "none";
    button13.style.display = "none";
    button14.style.display = "none";
    button15.style.display = "none";
    button16.style.display = "none";
    textBox.style.display = "none";
    map.style.display = "block";
    button1.style.display = "none";
    button2.style.display = "none";
    button3.style.display = "none";
    button4.style.display = "none";
    button10.style.display = "none";
    button11.style.display = "none";
    button12.style.display = "none";
    button6.style.display = "none";
    button5.style.display = "none";
    button17.style.display = "block";
    map.style.display = "block";
    monsterStat.style.display = "block";
    stopCollisionCheck();
    resetAnimations();
    resetCharacterAndMonsterPositions();
    initializeMonsterPositions(hardMonsters);
    startCollisionCheck();
    startAdventure();

    const monsterElements = [1, 2, 3, 4, 5].map(i => document.getElementById(`monster${i}`));
    monsterElements.forEach((monster, index) => moveMonsterSmoothly(monster, index));

    const randomMonsters = [];

    if (originalMonsterPositions.length === 0) {
        monsterElements.forEach((monsterElement, index) => {
            originalMonsterPositions.push({
                left: monsterElement.style.left,
                top: monsterElement.style.top,
            });
        });

        const characterElement = document.getElementById("characterPicture");
        originalCharacterPosition = {
            left: characterElement.style.left,
            top: characterElement.style.top,
        };
    }

    while (randomMonsters.length < 3) {
        const randomMonster = getRandomHardMonster();
        if (!randomMonsters.includes(randomMonster)) {
            randomMonsters.push(randomMonster);
        }
    }

    randomMonsters.forEach((monster, index) => {
        const monsterElement = monsterElements[index];
        monsterElement.style.display = "block";
        monsterElement.style.backgroundImage = `url('${monster.image}')`;
        monsterElement.style.backgroundSize = "cover";
        moveMonsterSmoothly(monsterElement, index);
    });

    const character = document.getElementById('characterPicture');
    character.style.left = originalCharacterPosition.left;
    character.style.top = originalCharacterPosition.top;

    startAdventure();
}




function goAd4() {
    const map = document.getElementById('map');
    map.style.backgroundImage = "url('files/map5.jpeg')"; // Pfad zu deinem Bild
    expBox.style.display = "none";
    nameInput.style.display = "none";
    healthText.style.display = "none";
    attackText.style.display = "none";
    defText.style.display = "none";
    skillStat1.style.display = "none";
    skillStat2.style.display = "none";
    skillStat3.style.display = "none";
    levelBox.style.display = "none";
    xpBox.style.display = "none";
    rankBox.style.display = "none";
    statCont.style.display = "none";
    button7.style.display = "none";
    button8.style.display = "none";
    button9.style.display = "none";
    characterPicture.style.display = "block";
    namen.style.display = "none";
    stufe.style.display = "none";
    erfahrung.style.display = "none";
    rang.style.display = "none";
    nameBox.style.display = "none";
    tradeBox1.style.display = "none";
    tradeBox2.style.display = "none";
    tradeBox3.style.display = "none";
    tradeBox4.style.display = "none";
    tradeBox5.style.display = "none";
    tradeBox6.style.display = "none";
    trader.style.display = "none";
    headBox.style.display = "none";
    chestBox.style.display = "none";
    weaponBox.style.display = "none";
    shieldBox.style.display = "none";
    playBoard.style.display = "none";
    shoeBox.style.display = "none";
    board.style.display = "none";
    button13.style.display = "none";
    button14.style.display = "none";
    button15.style.display = "none";
    button16.style.display = "none";
    textBox.style.display = "none";
    map.style.display = "block";
    button1.style.display = "none";
    button2.style.display = "none";
    button3.style.display = "none";
    button4.style.display = "none";
    button10.style.display = "none";
    button11.style.display = "none";
    button12.style.display = "none";
    button6.style.display = "none";
    button5.style.display = "none";
    button17.style.display = "block";
    map.style.display = "block";
    monsterStat.style.display = "block";
    stopCollisionCheck();
    resetAnimations();
    resetCharacterAndMonsterPositions();
    initializeMonsterPositions(legendMonsters);
    startCollisionCheck();
    startAdventure();

    const monsterElements = [1, 2, 3, 4, 5].map(i => document.getElementById(`monster${i}`));
    monsterElements.forEach((monster, index) => moveMonsterSmoothly(monster, index));

    const randomMonsters = [];

    if (originalMonsterPositions.length === 0) {
        monsterElements.forEach((monsterElement, index) => {
            originalMonsterPositions.push({
                left: monsterElement.style.left,
                top: monsterElement.style.top,
            });
        });

        const characterElement = document.getElementById("characterPicture");
        originalCharacterPosition = {
            left: characterElement.style.left,
            top: characterElement.style.top,
        };
    }

    while (randomMonsters.length < 3) {
        const randomMonster = getRandomLegendMonster();  // Verwende die neue Funktion
        if (!randomMonsters.includes(randomMonster)) {
            randomMonsters.push(randomMonster);
        }
    }

    randomMonsters.forEach((monster, index) => {
        const monsterElement = monsterElements[index];
        monsterElement.style.display = "block";
        monsterElement.style.backgroundImage = `url('${monster.image}')`;
        monsterElement.style.backgroundSize = "cover";
        moveMonsterSmoothly(monsterElement, index);
    });

    const character = document.getElementById('characterPicture');
    character.style.left = originalCharacterPosition.left;
    character.style.top = originalCharacterPosition.top;

    startAdventure();

}

function cancel() {
    resetAnimations();
    stopCollisionCheck();
    resetAfterFight();

    const character = document.getElementById('characterPicture');

    if (characterMoveTimeoutId) {
        clearTimeout(characterMoveTimeoutId);
        characterMoveTimeoutId = null;
    }
    if (characterAnimationId) {
        cancelAnimationFrame(characterAnimationId);
        characterAnimationId = null;
    }

    character.style.left = originalCharacterPosition.left;
    character.style.top = originalCharacterPosition.top;

    map.style.display = "none";
    monsterStat.style.display = "none";
    textBox.style.display = "block";

    update(locations[0]);
    expBox.style.display = "block";
    nameInput.style.display = "block";
    document.getElementById("healthText").style.display = "inline-block";
    document.getElementById("attackText").style.display = "inline-block";
    document.getElementById("defText").style.display = "inline-block";
    skillStat1.style.display = "block";
    skillStat2.style.display = "block";
    skillStat3.style.display = "block";
    levelBox.style.display = "block";
    xpBox.style.display = "block";
    rankBox.style.display = "block";
    statCont.style.display = "block";
    button7.style.display = "block";
    button8.style.display = "block";
    button9.style.display = "block";
    characterPicture.style.display = "block";
    namen.style.display = "block";
    stufe.style.display = "block";
    erfahrung.style.display = "block";
    rang.style.display = "block";
    nameBox.style.display = "block";
    tradeBox1.style.display = "none";
    tradeBox2.style.display = "none";
    tradeBox3.style.display = "none";
    tradeBox4.style.display = "none";
    tradeBox5.style.display = "none"
    tradeBox6.style.display = "none"
    trader.style.display = "none";
    headBox.style.display = "block";
    chestBox.style.display = "block";
    weaponBox.style.display = "block";
    shieldBox.style.display = "block";
    shoeBox.style.display = "block";
    board.style.display = "none";
    button13.style.display = "none";
    button14.style.display = "none";
    button15.style.display = "none";
    button16.style.display = "none";
    monsterStat.style.display = "none";
    map.style.display = "none";
    button1.style.display = "block";
    button2.style.display = "block";
    button3.style.display = "block";
    button4.style.display = "block";
    button5.style.display = "block";
    playBoard.style.display = "none";
    button6.style.display = "block";
    button10.style.display = "block";
    button11.style.display = "block";
    button12.style.display = "block";
    characterPicture.style.display = "block";
    namen.style.display = "block";
    stufe.style.display = "block";
    erfahrung.style.display = "block";
    rang.style.display = "block";
    nameBox.style.display = "block";
    monsterStat.style.display = "none";
    fightHP.style.display = "none";
    monsterHP.style.display = "none";
    secondMonsterBox.style.display = "none";
    secondNameBox.style.display = "none";
    monsterNamen.style.display = "none";
    monsterStufe.style.display = "none";
    monsterNameBox.style.display = "none";
    monsterLevelBox.style.display = "none";
    fightPic.style.display = "none";
    button17.style.display = "none";
}

function goFight() {
    if (!isInDungeon) {
        document.getElementById('fightPic').style.backgroundImage = `url('files/fight2.jpeg')`;
    } else {
        // Setze ein anderes Bild, wenn der Kampf im Dungeon stattfindet
        map.style.display = "none";

        // Verstecke die Monster 1 bis 5 im Dungeon
        for (let i = 1; i <= 5; i++) {
            document.getElementById(`monster${i}`).style.display = 'none';
        }
    }
    document.getElementById("healthText1").textContent = {hp}; // Zeigt aktuelle und maximale HP an
    resetAnimations();
    stopCollisionCheck();
    console.log("Fight started!");
    const character = document.getElementById('characterPicture');
    character.style.left = originalCharacterPosition.left;
    character.style.top = originalCharacterPosition.top;
    map.style.display = "none";
    fightPic.style.display = "block";
    nameBox.style.display = "block";
    button1.style.display = "none";
    button2.style.display = "none";
    button3.style.display = "none";
    button4.style.display = "none";
    button10.style.display = "none";
    playBoard.style.display = "none";
    button11.style.display = "none";
    button12.style.display = "none";
    button6.style.display = "none";
    button5.style.display = "none";
    button17.style.display = "none";
    expBox.style.display = "block";
    nameInput.style.display = "block";
    document.getElementById("healthText").style.display = "inline-block";
    document.getElementById("attackText").style.display = "inline-block";
    document.getElementById("defText").style.display = "inline-block";
    levelBox.style.display = "block";
    xpBox.style.display = "block";
    rankBox.style.display = "block";
    namen.style.display = "block";
    stufe.style.display = "block";
    erfahrung.style.display = "block";
    rang.style.display = "block";

    monsterStat.style.display = "block";
    fightHP.style.display = "block";
    monsterHP.style.display = "block";
    secondMonsterBox.style.display = "block";
    secondNameBox.style.display = "block";
    monsterNamen.style.display = "block";
    monsterStufe.style.display = "block";
    monsterNameBox.style.display = "block";
    monsterLevelBox.style.display = "block";
    textBox.style.display = "block";
    startTurnBasedFight();
}

function startTurnBasedFight() {
    monsterHealth = currentFightingMonster.health;
    updateHealthDisplay(hp, monsterHealth);
    textBox.innerText = "Der Kampf beginnt!";
    setTimeout(playerAttack, 1000);
}
function playerAttack() {
    if (!playerTurn) return;
    playerTurn = false;
    document.getElementById('atkPlayer').style.display = 'block';
    setTimeout(() => {
        document.getElementById('atkPlayer').style.display = 'none';
    }, 700);

    const basePower = power;
    const randomMultiplier = Math.random() * (0.3 - 0.1) + 0.2;
    const totalDamage = Math.floor(basePower * (1 + randomMultiplier));

    // Verwende Backticks für String-Interpolation
    console.log(`Player Base Power: ${basePower}, Damage Multiplier: ${randomMultiplier.toFixed(2)}, Total Damage: ${totalDamage}`);
    
    monsterHealth -= totalDamage;
    
    // Verwende Backticks für String-Interpolation
    textBox.innerText = `Du greifst ${currentFightingMonster.name} an und machst ${totalDamage} Schaden!`;
    updateHealthDisplay(hp, monsterHealth);
    
    if (monsterHealth <= 0) {
        // Verwende Backticks für String-Interpolation
        textBox.innerText = `${currentFightingMonster.name} wurde besiegt!`;
        endFight(true);
    } else {
        setTimeout(monsterAttack, 2000);
    }
}

function monsterAttack() {
    if (hp <= 0) {
        textBox.innerText = "Du wurdest besiegt!";
        endFight(false); // Hier wird die Niederlage weitergereicht
        return; // Füge hier ein return ein, um die Funktion zu beenden, falls der Spieler besiegt wurde
    }

    document.getElementById('atkMonster').style.display = 'block';
    setTimeout(() => {
        document.getElementById('atkMonster').style.display = 'none';
    }, 700);

    const baseDamage = currentFightingMonster.level;
    const randomBonusDamage = Math.floor(Math.random() * baseDamage) + 1;
    let totalDamage = baseDamage + randomBonusDamage;

    // Verwende Backticks für String-Interpolation
    console.log(`${currentFightingMonster.name} macht ${baseDamage} Basis-Schaden und ${randomBonusDamage} zusätzlichen Schaden (Gesamt: ${totalDamage} vor Reduzierung durch Rüstung).`);

    const armorReductionFactor = 1 - (armor * 0.0008);
    let damageAfterArmor = totalDamage * armorReductionFactor;

    if (damageAfterArmor < 0) damageAfterArmor = 0;

    // Verwende Backticks für String-Interpolation
    console.log(`Schaden nach Reduzierung durch Rüstung (armor: ${armor}, Reduktionsfaktor: ${armorReductionFactor.toFixed(3)}): ${damageAfterArmor.toFixed(2)}`);
    
    hp -= Math.floor(damageAfterArmor);

    // Verwende Backticks für String-Interpolation
    textBox.innerText = `${currentFightingMonster.name} greift dich an und macht ${Math.floor(damageAfterArmor)} Schaden!`;
    updateHealthDisplay(hp, monsterHealth);

    if (hp <= 0) {
        textBox.innerText = "Du wurdest besiegt!";
        endFight(false);
    } else {
        playerTurn = true;
        setTimeout(playerAttack, 2000);
    }
}

function updateHealthDisplay(playerHealth, monsterHealth) {
    const playerHealthElement = document.getElementById("healthText1");
    const monsterHealthElement = document.getElementById("monsterHPText");
    if (playerHealthElement) playerHealthElement.textContent = playerHealth;
    if (monsterHealthElement) monsterHealthElement.textContent = monsterHealth;
}

const baseXP = 10;
const baseGold = 5;
const xpScalingFactor = 0.7;
const goldScalingFactor = 0.9;

function endFight(playerWon) {
    if (playerWon) {
        const xpGain = baseXP * Math.pow(currentFightingMonster.level, xpScalingFactor);
        const goldGain = baseGold * Math.pow(currentFightingMonster.level, goldScalingFactor);
        xp += Math.round(xpGain);
        gold += Math.round(goldGain);
        armor++;
        textBox.innerText = `Du hast gewonnen! +${Math.round(xpGain)} XP, +${Math.round(goldGain)} Gold.`;
        updateArmorText();
        
        const xpBoxText = document.getElementById("xpBoxText");
        if (xpBoxText) {
            xpBoxText.innerText = xp;
        }
        
        const goldText = document.getElementById("goldText");
        if (goldText) {
            goldText.innerText = gold;
        }
        
        checkLevelUp();
        if (Math.random() < 0.1) {
            stone++; // Erhöhe die Anzahl der Steine
            const stoneText = document.getElementById("stoneText");
            if (stoneText) {
                stoneText.innerText = stone; // Aktualisiere die Anzeige der Steine
            }
            textBox.innerText += " Du hast einen Seelenstein erhalten!";
        }

        // Fortschritt nur erhöhen, wenn wir im Dungeon sind
        if (isInDungeon) {
            currentDungeonMonsterIndex++;  // Nur im Dungeon erhöhen
        }
    } else {
        playerLose();  // Bei einer Niederlage Gold verlieren
    }

    isInDungeon = false;  // Sobald der Kampf vorbei ist, verlässt der Spieler den Dungeon
    button17.style.display = "block";  // Zeige den Rückkehr-Button nach dem Kampf an
}

function checkLevelUp() {
    while (xp >= xpToNextLevel) {  // Solange der XP-Wert für das nächste Level ausreicht
        xp -= xpToNextLevel;  // Überschüssige XP berechnen
        level++;
        power += 3;  // Angriffskraft erhöhen
        maxHp += 10;  // Maximale Gesundheit erhöhen
        hp = maxHp;  // Setze aktuelle Gesundheit auf das Maximum
        xpToNextLevel = 100 + (level - 1) * 36;  // Neue XP-Anforderung für das nächste Level

        // Aktualisiere die UI-Elemente
        const levelBox = document.getElementById("levelBox");
        const xpBoxText = document.getElementById("xpBoxText");
        const expBox = document.getElementById("expBox");
        const attackText = document.getElementById("attackText");
        const healthText = document.getElementById("healthText");
        if (levelBox) levelBox.innerText = level;
        if (xpBoxText) xpBoxText.innerText = xp;
        if (expBox) expBox.innerText = `/${xpToNextLevel}`;
        if (attackText) attackText.innerText = power;
        if (healthText) healthText.innerText = hp;


        // Zeige eine Level-Up-Nachricht an
        textBox.innerText += `Du bist jetzt Level ${level}! Deine Angriffskraft, Schadensreduktion und Leben sind gestiegen!`;
       
    }
}

function resetAfterFight() {
    hp = maxHp;
    document.getElementById("healthText1").innerText = `${hp}/${maxHp}`;
    resetCharacterAndMonsterPositions();
    playerTurn = true;
    currentFightingMonster = null;
    fightHP.style.display = "none";
    monsterHP.style.display = "none";
    secondMonsterBox.style.display = "none";
    secondNameBox.style.display = "none";
    monsterNamen.style.display = "none";
    monsterStufe.style.display = "none";
    monsterNameBox.style.display = "none";
    monsterLevelBox.style.display = "none";
    fightPic.style.display = "none";
    goBack();
}

function playerLose() {
    // Berechne den Prozentsatz (zwischen 5% und 10%)
    const lossPercentage = Math.random() * (0.10 - 0.05) + 0.05;
    
    // Berechne den Goldverlust
    const goldLost = Math.floor(gold * lossPercentage);
    
    // Ziehe den Goldverlust ab
    gold -= goldLost;
    
    // Zeige den verbleibenden Goldbetrag im Interface an
    document.getElementById('goldText').textContent = gold;
    
    // Zeige den Goldverlust in der Textbox an
    textBox.innerText = `Du hast den Kampf verloren! Dir wurden ${goldLost} Gold geraubt!`;
}

function goDungeon() {
    updateMonsterStufe();
    document.getElementById('monster1').style.display = 'none';
    document.getElementById('monster2').style.display = 'none';
    document.getElementById('monster3').style.display = 'none';
    document.getElementById('monster4').style.display = 'none';
    document.getElementById('monster5').style.display = 'none';
    button13.style.display = "none";
    button14.style.display = "none";
    button15.style.display = "none";
    button16.style.display = "none";
    button7.style.display = "none";
    button8.style.display = "none";
    button9.style.display = "none";
    playBoard.style.display = "none";
    skillStat1.style.display = "none";
    skillStat2.style.display = "none";
    skillStat3.style.display = "none";
    document.getElementById("healthText1").textContent = {hp}; // Zeigt aktuelle und maximale HP an
    resetAnimations();
    stopCollisionCheck();
    console.log("Fight started!");
    const character = document.getElementById('characterPicture');
    character.style.left = originalCharacterPosition.left;
    character.style.top = originalCharacterPosition.top;
    map.style.display = "none";
    fightPic.style.display = "block";
    nameBox.style.display = "block";
    button1.style.display = "none";
    button2.style.display = "none";
    button3.style.display = "none";
    button4.style.display = "none";
    button10.style.display = "none";
    button11.style.display = "none";
    button12.style.display = "none";
    button6.style.display = "none";
    button5.style.display = "none";
    button17.style.display = "none";
    expBox.style.display = "block";
    nameInput.style.display = "block";
    document.getElementById("healthText").style.display = "inline-block";
    document.getElementById("attackText").style.display = "inline-block";
    document.getElementById("defText").style.display = "inline-block";
    levelBox.style.display = "block";
    xpBox.style.display = "block";
    rankBox.style.display = "block";
    namen.style.display = "block";
    stufe.style.display = "block";
    erfahrung.style.display = "block";
    rang.style.display = "block";
    healthText.style.display = "none";
    attackText.style.display = "none";
    defText.style.display = "none";
    statCont.style.display = "none";

    healthText1.style.display = "none";



    monsterStat.style.display = "block";
    fightHP.style.display = "block";
    monsterHP.style.display = "block";
    monsterHPText.style.display = "none";
    secondMonsterBox.style.display = "block";
    secondNameBox.style.display = "block";
    monsterNamen.style.display = "block";
    monsterStufe.style.display = "block";
    monsterNameBox.style.display = "block";
    monsterLevelBox.style.display = "block";
    textBox.style.display = "block";
    
    
    if (currentDungeonMonsterIndex >= dungeonMonstersArray.length) {
        textBox.innerText = "Du hast alle Monster im Dungeon besiegt!";
        currentDungeonMonsterIndex = 0;  // Zurücksetzen des Fortschritts für einen neuen Dungeon-Lauf
        return;
    }

    isInDungeon = true;  // Spieler ist im Dungeon
    const currentMonster = dungeonMonstersArray[currentDungeonMonsterIndex];
    currentFightingMonster = currentMonster;  // Setzt das aktuelle Monster zum Kämpfen

    textBox.innerText = `Du kämpfst gegen ${currentMonster.name}`;
    updateFightBackground(currentMonster);
    document.getElementById('monsterNameBox').textContent = currentMonster.name;
    document.getElementById('secondMonsterBox').textContent = currentMonster.name;
    
}



function reportBug() {
    update(locations[5]);
}

document.getElementById('button4').addEventListener('click', function() {
    openDungeonModal({
        name: 'Wildhund',
        image: 'wildhund.jpg',
        level: 46,
        health: 150
    });
});

function openDungeonModal(monster) {
    document.getElementById('dungeonMonsterName').innerText = monster.name;
    document.getElementById('dungeonMonsterImage').src = monster.image;
    document.getElementById('dungeonMonsterLevel').innerText = monster.level;
    document.getElementById('dungeonMonsterHealth').innerText = monster.health;
    
    // Zeige das Modal an
    document.getElementById('dungeonModal').style.display = 'block';
}

// Modal schließen, wenn "Abbrechen" oder "X" geklickt wird
document.getElementById('cancelFightButton').addEventListener('click', function() {
    document.getElementById('dungeonModal').style.display = 'none';
    cancel();  // Hier kannst du den Abbruch des Kampfes oder eine andere Aktion hinzufügen
});

// Kampf starten, wenn "Kampf starten" geklickt wird
document.getElementById('startFightButton').addEventListener('click', function() {
    document.getElementById('dungeonModal').style.display = 'none';
    healthText1.style.display = "block";
    monsterHPText.style.display = "block";
    goFight();  // Starte den Kampf
});

// Beispiel: Öffne das Modal für das aktuelle Monster
document.getElementById('button4').addEventListener('click', function() {
    const currentMonster = dungeonMonstersArray[currentDungeonMonsterIndex]; // Wähle das aktuelle Monster
    openDungeonModal(currentMonster);  // Zeige das Monster im Modal an
});

function updateFightBackground(monster) {
    const fightArea = document.getElementById('fightPic'); // Der Bereich, der das Hintergrundbild anzeigt
    if (monster && monster.backgroundImage) {
        // Setze das Hintergrundbild basierend auf dem Monster
        fightArea.style.backgroundImage = `url('${monster.backgroundImage}')`;
        fightArea.style.backgroundSize = 'cover';  // Hintergrund füllen
        fightArea.style.backgroundPosition = 'center';  // Hintergrund zentrieren
    } else {
        // Fallback-Hintergrund, falls kein Hintergrundbild vorhanden ist
        fightArea.style.backgroundImage = "url('backgrounds/default_bg.jpeg')";
    }
}

function disableButtonWithCountdown(button, duration) {
    button.disabled = true; // Deaktiviere den Button
    let remainingTime = duration;

    const countdown = setInterval(() => {
        if (remainingTime > 0) {
            button.innerText = `Rückkehr möglich in ${remainingTime} Sekunden`; // Zeige die verbleibende Zeit im Button an
            remainingTime--;
        } else {
            clearInterval(countdown);
            button.disabled = false; // Reaktiviere den Button
            button.innerText = "Zurück zur Stadt!"; // Ursprünglicher Text
        }
    }, 1000); // Aktualisiere jede Sekunde
}

function updateMonsterStufe() {
    monsterLevel = dungeonMonsters[currentDungeonMonsterIndex].level;
    document.getElementById("monsterLevelBox").textContent = monsterLevel;
}

// Öffne das Bug Report Modal, wenn Button 6 geklickt wird
button6.addEventListener('click', function() {
    document.getElementById('bugReportModal').style.display = 'block';
  });
  
  // Schließe das Modal, wenn der Benutzer auf das 'X' klickt
  document.getElementById('closeBugModal').addEventListener('click', function() {
    document.getElementById('bugReportModal').style.display = 'none';
  });
  
  // Absenden des Bug-Reports
  document.getElementById('submitBugReport').addEventListener('click', function() {
    const bugText = document.getElementById('bugReportText').value;
    if (bugText.trim() !== '') {
      alert('Vielen Dank für Deine Rückmeldung!');
      document.getElementById('bugReportText').value = ''; // Leeren des Textfelds
      document.getElementById('bugReportModal').style.display = 'none'; // Schließe das Modal
    } else {
      alert('Bitte beschreibe den Bug.');
    }
  });
  
  // Schließe das Modal, wenn der Benutzer außerhalb des Modals klickt
  window.onclick = function(event) {
    const modal = document.getElementById('bugReportModal');
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  };

  function update(location) {
    textBox.innerText = location.text; // Setzt den Text aus den locations
    console.log(location.text); // Prüft, ob der Text aus der richtigen Quelle kommt
}



function goPlay() {
    
    const textBox = document.querySelector("#textBox");
    textBox.innerText = "Ein Mann lädt dich zu einem Würfelspiel ein. Keiner weiß, auf wessen Seite das Glück sein wird...";
    console.log(window.getComputedStyle(textBox).display); // Überprüfe, ob die Anzeige des Elements auf "block" gesetzt ist
    update(locations[3]);
    playBoard.style.display = "block";
    
    map.style.display = "none";
    monsterStat.style.display = "none";

    textBox.style.display = "block";
    expBox.style.display = "none";
    nameInput.style.display = "none";
    skillStat1.style.display = "none";
    skillStat2.style.display = "none";
    skillStat3.style.display = "none";
    levelBox.style.display = "none";
    xpBox.style.display = "none";
    rankBox.style.display = "none";
    statCont.style.display = "none";
    button7.style.display = "none";
    button8.style.display = "none";
    button9.style.display = "none";
    characterPicture.style.display = "none";
    namen.style.display = "none";
    stufe.style.display = "none";
    erfahrung.style.display = "none";
    rang.style.display = "none";
    nameBox.style.display = "none";
    tradeBox1.style.display = "none";
    tradeBox2.style.display = "none";
    tradeBox3.style.display = "none";
    tradeBox4.style.display = "none";
    tradeBox5.style.display = "none"
    tradeBox6.style.display = "none"
    trader.style.display = "none";
    headBox.style.display = "none";
    chestBox.style.display = "none";
    weaponBox.style.display = "none";
    shieldBox.style.display = "none";
    shoeBox.style.display = "none";
    board.style.display = "none";
    button13.style.display = "none";
    button14.style.display = "none";
    button15.style.display = "none";
    button16.style.display = "none";
    monsterStat.style.display = "none";
    map.style.display = "none";
    button1.style.display = "block";
    button2.style.display = "block";
    button3.style.display = "block";
    button4.style.display = "block";
    button5.style.display = "block";
    button6.style.display = "block";
    button10.style.display = "block";
    button11.style.display = "block";
    button12.style.display = "block";
    characterPicture.style.display = "none";
    namen.style.display = "none";
    stufe.style.display = "none";
    erfahrung.style.display = "none";
    rang.style.display = "none";
    nameBox.style.display = "none";
    monsterStat.style.display = "none";
    fightHP.style.display = "none";
    monsterHP.style.display = "none";
    secondMonsterBox.style.display = "none";
    secondNameBox.style.display = "none";
    monsterNamen.style.display = "none";
    monsterStufe.style.display = "none";
    monsterNameBox.style.display = "none";
    monsterLevelBox.style.display = "none";
    fightPic.style.display = "none";
    button17.style.display = "none";
    document.getElementById('diceModal').style.display = 'block';  // Modal anzeigen
    
    // Optional: Text-Reset oder Vorbereitung für das Spiel
    document.getElementById('resultText').textContent = "";  // Setzt das Ergebnisfeld zurück
    document.getElementById('betAmount').value = "";  // Setzt das Eingabefeld zurück
    
    playDiceGame();
    

}

