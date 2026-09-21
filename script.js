// =========================
// SUPABASE
// =========================

const supabaseUrl = "https://bpngatbffexfiskxajsy.supabase.co";

const supabaseKey = "sb_publishable_w0uCFcahHiKxGVtBiOopLw_bjUBaQ4s";

const supabaseClient = supabase.createClient(
    supabaseUrl,
    supabaseKey
);


// =========================
// PEOPLE / LITTLE WORLDS
// =========================

const people = [

    {
        name: "Hidden Society",
        symbol: "🌒"
    },

        {
        name: "Raven",
        symbol: "🐦‍⬛",
        size: "small"
        
    },

        {
        name: "Shadow",
        symbol: "🌑",
        size: "small"
    },

    {
        name: "Shapeshifter",
        symbol: "🦋",
        size: "small"
    }

];


// =========================
// BACKGROUND STARS
// =========================

const stars = [];

for (let i = 0; i < 45; i++) {

    const star = document.createElement("div");

    star.classList.add("star");
    star.textContent = "✦";


    let top;
    let left;
    let tooClose;


    do {

        top = Math.random() * 95;
        left = Math.random() * 95;

        tooClose = stars.some((position) => {

            const distance = Math.sqrt(
                Math.pow(top - position.top, 2) +
                Math.pow(left - position.left, 2)
            );

            return distance < 7;

        });

    } while (tooClose);


    star.style.top = top + "%";
    star.style.left = left + "%";


    const size = Math.random() * 3 + 12;

    star.style.fontSize = size + "px";


    const duration = Math.random() * 3 + 1;

    star.style.animationDuration = duration + "s";


    document.body.appendChild(star);


    stars.push({
        top: top,
        left: left
    });

}


// =========================
// SHOOTING STARS
// =========================

function createShootingStar() {

    const shootingStar = document.createElement("div");

    shootingStar.classList.add("shooting-star");

    shootingStar.style.top = Math.random() * 50 + "%";
    shootingStar.style.left = Math.random() * 100 + "%";

    document.body.appendChild(shootingStar);

    setTimeout(() => {
        shootingStar.remove();
    }, 1000);
}

setInterval(createShootingStar, 3000);


// =========================
// ELEMENTS
// =========================

const enterButton = document.getElementById("enterButton");

const intro = document.querySelector(".intro");

const galaxyScreen = document.getElementById("galaxyScreen");

const skyScreen = document.getElementById("skyScreen");

const planetsContainer = document.getElementById("planets");

const backToGalaxy = document.getElementById("backToGalaxy");

const personSubtitle = document.getElementById("personSubtitle");


const noteSection = document.querySelector(".note-section");

const noteTitle = document.getElementById("noteTitle");

const worldChoice = document.getElementById("worldChoice");

const leaveNoteChoice = document.getElementById("leaveNoteChoice");

const birthdayChoice = document.getElementById("birthdayChoice");


const worldChoiceTitle = document.getElementById("worldChoiceTitle");


const messageBox = document.getElementById("messageBox");

const messageText = document.getElementById("messageText");

const closeMessage = document.getElementById("closeMessage");

const nameInput = document.getElementById("nameInput");

const noteInput = document.getElementById("noteInput");

const sendNote = document.getElementById("sendNote");


// =========================
// CURRENT PERSON
// =========================

let currentPerson = null;
let surpriseTimer = null;


// =========================
// CREATE PLANETS
// =========================

function createPlanets() {

    planetsContainer.innerHTML = "";

    people.forEach((person, index) => {

        const planetCard = document.createElement("div");

        planetCard.classList.add("planet-card");
        planetCard.classList.add(person.size);


        const planet = document.createElement("div");

        planet.classList.add("planet");
        planet.textContent = person.symbol;


        const name = document.createElement("p");

        name.textContent = person.name;


        planetCard.appendChild(planet);
        planetCard.appendChild(name);

        planetsContainer.appendChild(planetCard);


        // =========================
        // AUTOMATIC PLANET POSITION
        // =========================

        if (index === 0) {

            // Hidden Society → center

            planetCard.style.left = "50%";
            planetCard.style.top = "50%";

            planetCard.style.transform =
                "translate(-50%, -50%)";

            planet.style.fontSize = "28px";

        } else {

            // Other worlds → around the center

            const otherWorlds = people.length - 1;

            const angle =
                ((index - 1) / otherWorlds) * Math.PI * 2
                - Math.PI / 2;

            const radiusX = 32;
            const radiusY = 35;

            const left =
                50 + Math.cos(angle) * radiusX;

            const top =
                50 + Math.sin(angle) * radiusY;


            planetCard.style.left = left + "%";
            planetCard.style.top = top + "%";

            planetCard.style.transform =
                "translate(-50%, -50%)";

            planet.style.fontSize = "18px";
        }


        planetCard.addEventListener("click", () => {

            openPersonSky(person);

        });

    });

}

createPlanets();


// =========================
// ENTER GALAXY
// =========================

enterButton.addEventListener("click", () => {

    intro.style.opacity = "0";

    setTimeout(() => {

        intro.style.display = "none";

        galaxyScreen.style.display = "block";

    }, 1000);

});


// =========================
// OPEN PERSON'S SKY
// =========================

function openPersonSky(person) {

    currentPerson = person;

    const player = document.getElementById("youtubePlayer");

    player.src =
        "https://www.youtube.com/embed/aPnVbY0_DzM?autoplay=1";

    galaxyScreen.style.display = "none";
    skyScreen.style.display = "block";

    document.querySelector(".person-title").style.display = "none";

    personSubtitle.textContent =
        `${person.name}'s little piece of the sky ✦`;

    noteTitle.textContent =
        `Leave a little note for ${person.name} ✦`;

    document
        .querySelectorAll(".note-star, .note-star-name")
        .forEach((element) => {
            element.remove();
        });

    worldChoice.style.display = "block";
    noteSection.style.display = "none";
    birthdaySurprise.style.display = "none";

    if (surpriseTimer) {
        clearTimeout(surpriseTimer);
        surpriseTimer = null;
    }

    birthdayChoice.textContent =
        `🎂 I'm ${person.name}`;
}

// =========================
// WORLD CHOICE BUTTONS
// =========================

leaveNoteChoice.addEventListener("click", () => {

    worldChoice.style.display = "none";

    noteSection.style.display = "block";

});

function createConfetti() {

    document
        .querySelectorAll(".confetti-piece")
        .forEach((piece) => piece.remove());

    const colors = [
        "#ff4d6d",
        "#ffd166",
        "#4cc9f0",
        "#c77dff",
        "#80ed99"
    ];

    for (let i = 0; i < 100; i++) {

        const confetti = document.createElement("div");

        confetti.classList.add("confetti-piece");

        confetti.style.left = "50%";
        confetti.style.top = "50%";

        confetti.style.background =
            colors[Math.floor(Math.random() * colors.length)];

        const angle =
            Math.random() * Math.PI * 2;

        const distance =
            150 + Math.random() * 350;

        const x =
            Math.cos(angle) * distance;

        const y =
            Math.sin(angle) * distance;

        confetti.style.setProperty(
            "--x",
            x + "px"
        );

        confetti.style.setProperty(
            "--y",
            y + "px"
        );

        confetti.style.animationDelay =
            Math.random() * 0.2 + "s";

        document.body.appendChild(confetti);
    }
}

birthdayChoice.addEventListener("click", () => {

    worldChoice.style.display = "none";
    noteSection.style.display = "none";


    if (currentPerson.name === "Hidden Society") {
        loadNotes();
        return;
    }
    
    createConfetti();



    const birthdaySurprise =
        document.getElementById("birthdaySurprise");

    const surpriseText =
        document.getElementById("surpriseText");

    surpriseText.textContent =
        `Happy Birthday, ${currentPerson.name}! ✦`;

    birthdaySurprise.style.display = "block";

    if (surpriseTimer) {
        clearTimeout(surpriseTimer);
    }

    surpriseTimer = setTimeout(() => {

        birthdaySurprise.style.display = "none";

        loadNotes();

        surpriseTimer = null;

    }, 2500);

});


// =========================
// BACK TO GALAXY
// =========================

backToGalaxy.addEventListener("click", () => {

    skyScreen.style.display = "none";

    galaxyScreen.style.display = "block";

    currentPerson = null;

});


// =========================
// MESSAGE BOX
// =========================

closeMessage.addEventListener("click", () => {

    messageBox.style.display = "none";

});


// =========================
// CREATE NOTE STAR
// =========================

function createNoteStar(note) {

    const star = document.createElement("div");

    star.classList.add("note-star");

    star.textContent = "★";


    const top = Math.random() * 65 + 15;

    const left = Math.random() * 85 + 5;


    star.style.top = top + "%";

    star.style.left = left + "%";


    skyScreen.appendChild(star);


    const name = document.createElement("div");

    name.classList.add("note-star-name");

    name.textContent = "— " + note.name;


    name.style.top = `calc(${top}% + 30px)`;

    name.style.left = left + "%";


    skyScreen.appendChild(name);


    star.addEventListener("click", () => {

    document.querySelector(".person-title h1").style.display = "none";
    document.querySelector(".person-title p").style.display = "none";

    messageText.textContent = note.message;

    messageBox.style.display = "flex";

    });

}


// =========================
// SEND NOTE
// =========================

sendNote.addEventListener("click", async () => {

    if (!currentPerson) {
        return;
    }


    const name = nameInput.value.trim();

    const message = noteInput.value.trim();


    if (!name || !message) {

        alert("Please enter your name and a note. ✨");

        return;

    }


    const { error } = await supabaseClient
        .from("messages")
        .insert([
            {
                name: name,
                message: message,
                person: currentPerson.name
            }
        ]);


    if (error) {

        console.error(error);

        alert("Something went wrong. Please try again. 🌙");

        return;

    }


    // Yeni yıldızı oluştur



    // Formu temizle

    nameInput.value = "";

    noteInput.value = "";


    // Formu gizle

    noteSection.style.display = "none";
    loadNotes();


});


// =========================
// LOAD NOTES
// =========================

async function loadNotes() {

    if (!currentPerson) {
        return;
    }


    const { data, error } = await supabaseClient
        .from("messages")
        .select("name, message")
        .eq("person", currentPerson.name);


    if (error) {

        console.error(
            "Notes could not be loaded:",
            error
        );

        return;

    }


    data.forEach((note) => {

        createNoteStar(note);

    });

}