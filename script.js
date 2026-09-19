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
        name: "Ash",
        symbol: "🪐"
    },

    {
        name: "Lily",
        symbol: "🌙"
    },

    {
        name: "Jeonghan",
        symbol: "⭐"
    }
];


// =========================
// BACKGROUND STARS
// =========================

for (let i = 0; i < 30; i++) {

    const star = document.createElement("div");

    star.classList.add("star");
    star.textContent = "✦";

    star.style.top = Math.random() * 100 + "%";
    star.style.left = Math.random() * 100 + "%";

    const size = Math.random() * 20 + 10;

    star.style.fontSize = size + "px";

    const duration = Math.random() * 3 + 1;

    star.style.animationDuration = duration + "s";

    document.body.appendChild(star);
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


// =========================
// CREATE PLANETS
// =========================

function createPlanets() {

    planetsContainer.innerHTML = "";

    people.forEach((person) => {

        const planetCard = document.createElement("div");

        planetCard.classList.add("planet-card");


        const planet = document.createElement("div");

        planet.classList.add("planet");

        planet.textContent = person.symbol;


        const name = document.createElement("p");

        name.textContent = person.name;


        planetCard.appendChild(planet);
        planetCard.appendChild(name);

        planetsContainer.appendChild(planetCard);


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

    galaxyScreen.style.display = "none";

    skyScreen.style.display = "block";


    personSubtitle.textContent =
        `${person.name}'s little piece of the sky ✦`;


    noteTitle.textContent =
        `Leave a little note for ${person.name} ✦`;


    noteSection.style.display = "block";


    // Eski yıldızları temizle

    document
        .querySelectorAll(".note-star, .note-star-name")
        .forEach((element) => {
            element.remove();
        });


    // Bu kişiye ait notları getir

    loadNotes();

}


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

    createNoteStar({
        name: name,
        message: message
    });


    // Formu temizle

    nameInput.value = "";

    noteInput.value = "";


    // Formu gizle

    noteSection.style.display = "none";

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