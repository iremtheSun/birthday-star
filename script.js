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

const enterButton = document.getElementById("enterButton");
const intro = document.querySelector(".intro");

enterButton.addEventListener("click", () => {
    intro.style.opacity = "0";

    setTimeout(() => {
        intro.style.display = "none";
    }, 1000);
});

const specialStar = document.createElement("div");

specialStar.classList.add("special-star");

specialStar.textContent = "✦";

specialStar.style.top = "35%";
specialStar.style.left = "70%";

document.body.appendChild(specialStar);

const specialStar2 = document.createElement("div");

specialStar2.classList.add("special-star");

specialStar2.textContent = "✦";

specialStar2.style.top = "65%";
specialStar2.style.left = "25%";

document.body.appendChild(specialStar2);

const specialStar3 = document.createElement("div");

specialStar3.classList.add("special-star");

specialStar3.textContent = "✦";

specialStar3.style.top = "25%";
specialStar3.style.left = "40%";

document.body.appendChild(specialStar3);

const specialStar4 = document.createElement("div");

specialStar4.classList.add("special-star");

specialStar4.textContent = "✦";

specialStar4.style.top = "70%";
specialStar4.style.left = "65%";

document.body.appendChild(specialStar4);

const specialStar5 = document.createElement("div");

specialStar5.classList.add("special-star");

specialStar5.textContent = "★";

specialStar5.style.top = "45%";
specialStar5.style.left = "15%";

document.body.appendChild(specialStar5);

const messageBox = document.getElementById("messageBox");
const messageText = document.getElementById("messageText");
const closeMessage = document.getElementById("closeMessage");

specialStar.addEventListener("click", () => {
    messageText.textContent =
        "I am really happy that I got to know you, balim. ✨";

    messageBox.style.display = "flex";

    discoveredStars.add("star1");
    checkConnections();
});

closeMessage.addEventListener("click", () => {
    messageBox.style.display = "none";
});

specialStar2.addEventListener("click", () => {
    messageText.textContent =
        "Always remember to love yourself, too. You deserve it. 🤍";

    messageBox.style.display = "flex";

    discoveredStars.add("star2");
    checkConnections();
});

specialStar3.addEventListener("click", () => {
    messageText.textContent =
        "Never forget what a kind-hearted person you are. ✨";

    messageBox.style.display = "flex";

    discoveredStars.add("star3");
    checkConnections();
});

specialStar4.addEventListener("click", () => {
    messageText.textContent =
        "I hope you always have reasons to smile, even on the hardest days. 🌙";

    messageBox.style.display = "flex";

    discoveredStars.add("star4");
    checkConnections();
});

specialStar5.addEventListener("click", () => {
    messageText.textContent =
        "No matter where life takes you, I hope you never stop being the amazing person you are. 🥹";

    messageBox.style.display = "flex";

    discoveredStars.add("star5");
    checkConnections();
});

function createConnection(star1, star2) {
    const line = document.createElement("div");

    line.classList.add("star-line");

    const rect1 = star1.getBoundingClientRect();
    const rect2 = star2.getBoundingClientRect();

    const x1 = rect1.left + rect1.width / 2;
    const y1 = rect1.top + rect1.height / 2;

    const x2 = rect2.left + rect2.width / 2;
    const y2 = rect2.top + rect2.height / 2;

    const distance = Math.sqrt(
        Math.pow(x2 - x1, 2) +
        Math.pow(y2 - y1, 2)
    );

    const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;

    line.style.width = distance + "px";
    line.style.left = x1 + "px";
    line.style.top = y1 + "px";
    line.style.transform = `rotate(${angle}deg)`;

    document.body.appendChild(line);
}

let discoveredStars = new Set();
let finalShown = false;

function checkConnections() {

    if (discoveredStars.has("star5") && discoveredStars.has("star3")) {
        createConnection(specialStar5, specialStar3);
    }

    if (discoveredStars.has("star3") && discoveredStars.has("star1")) {
        createConnection(specialStar3, specialStar);
    }

    if (discoveredStars.has("star1") && discoveredStars.has("star4")) {
        createConnection(specialStar, specialStar4);
    }

    if (discoveredStars.has("star4") && discoveredStars.has("star2")) {
        createConnection(specialStar4, specialStar2);
    }

    if (discoveredStars.has("star2") && discoveredStars.has("star5")) {
        createConnection(specialStar2, specialStar5);
    }

    if (discoveredStars.size === 5 && !finalShown) {
    finalShown = true;
    showFinalMessage();
}

}

function showFinalMessage() {
    setTimeout(() => {
        messageText.textContent =
            "I hope that one day, we will finally meet. Until then, I will be happy to have you in my life, even from far away. 🤍🌌";

        messageBox.style.display = "flex";

        messageBox.querySelector(".message-content").classList.add("final-message");
    }, 1800);
}
