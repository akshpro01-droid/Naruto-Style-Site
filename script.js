/* =========================
   LOADER
========================= */

window.addEventListener("load", () => {

    setTimeout(() => {

        document
            .querySelector(".loader")
            .classList.add("hide");

    }, 2200);

});


/* =========================
   CUSTOM CURSOR
========================= */

const cursor = document.querySelector(".cursor");
const cursorRing = document.querySelector(".cursor-ring");

let mouseX = 0;
let mouseY = 0;

let ringX = 0;
let ringY = 0;


window.addEventListener("mousemove", (e) => {

    mouseX = e.clientX;
    mouseY = e.clientY;

    cursor.style.left = mouseX + "px";
    cursor.style.top = mouseY + "px";

});


function animateCursor() {

    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;

    cursorRing.style.left = ringX + "px";
    cursorRing.style.top = ringY + "px";

    requestAnimationFrame(animateCursor);
}

animateCursor();


document
    .querySelectorAll("a, button, .mission, .archive-card")
    .forEach((element) => {

        element.addEventListener("mouseenter", () => {
            cursorRing.classList.add("hover");
        });

        element.addEventListener("mouseleave", () => {
            cursorRing.classList.remove("hover");
        });

    });


/* =========================
   SCROLL REVEAL
========================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("active");

                }

            });

        },

        {
            threshold: 0.12
        }

    );


revealElements.forEach((element) => {

    revealObserver.observe(element);

});


/* =========================
   CHARACTER PARALLAX
========================= */

const character =
    document.querySelector(".character");


window.addEventListener("mousemove", (e) => {

    if (window.innerWidth < 900) return;

    const x =
        (window.innerWidth / 2 - e.clientX) / 50;

    const y =
        (window.innerHeight / 2 - e.clientY) / 50;

    character.style.transform =
        `translate(${x}px, ${y}px) scale(1)`;

});


/* =========================
   CHAKRA PARTICLES
========================= */

const canvas =
    document.getElementById("chakraCanvas");

const ctx =
    canvas.getContext("2d");


let particles = [];


function resizeCanvas() {

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;

}

resizeCanvas();

window.addEventListener(
    "resize",
    resizeCanvas
);


class ChakraParticle {

    constructor() {

        this.x =
            Math.random() * canvas.width;

        this.y =
            Math.random() * canvas.height;

        this.size =
            Math.random() * 2 + .5;

        this.speed =
            Math.random() * .5 + .1;

        this.angle =
            Math.random() * Math.PI * 2;

        this.life =
            Math.random();

    }


    update() {

        this.y -= this.speed;

        this.x +=
            Math.sin(this.angle) * .25;

        this.life += .002;

        if (this.y < 0) {

            this.y =
                canvas.height;

            this.x =
                Math.random() * canvas.width;

        }

    }


    draw() {

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            "rgba(255,120,30,.8)";

        ctx.fill();

    }

}


for (let i = 0; i < 100; i++) {

    particles.push(
        new ChakraParticle()
    );

}


function animateParticles() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    particles.forEach((particle) => {

        particle.update();
        particle.draw();

    });


    requestAnimationFrame(
        animateParticles
    );

}

animateParticles();


/* =========================
   CHAKRA RINGS
========================= */

const rings =
    document.querySelectorAll(".chakra-ring");


window.addEventListener("scroll", () => {

    const scroll =
        window.scrollY;

    rings.forEach((ring, index) => {

        const rotation =
            scroll * (0.03 + index * 0.01);

        ring.style.transform =
            `rotate(${rotation}deg)`;

    });

});


/* =========================
   SMOOTH MISSION HOVER
========================= */

document
    .querySelectorAll(".mission")
    .forEach((mission) => {

        mission.addEventListener(
            "mousemove",
            (e) => {

                const rect =
                    mission.getBoundingClientRect();

                const x =
                    e.clientX - rect.left;

                const y =
                    e.clientY - rect.top;

                mission.style.background =
                    `radial-gradient(
                        circle at ${x}px ${y}px,
                        rgba(255,92,0,.08),
                        transparent 300px
                    )`;

            }
        );


        mission.addEventListener(
            "mouseleave",
            () => {

                mission.style.background =
                    "";

            }
        );

    });


/* =========================
   MOBILE MENU
========================= */

const menuBtn =
    document.querySelector(".menu-btn");

const nav =
    document.querySelector(".navbar nav");


menuBtn.addEventListener(
    "click",
    () => {

        nav.classList.toggle("mobile-open");

    }
);


/* =========================
   ACTIVE NAVIGATION
========================= */

const sections =
    document.querySelectorAll("section[id]");

const navLinks =
    document.querySelectorAll(
        ".navbar nav a"
    );


window.addEventListener(
    "scroll",
    () => {

        let current = "";

        sections.forEach((section) => {

            const sectionTop =
                section.offsetTop - 200;

            if (
                window.scrollY >=
                sectionTop
            ) {

                current =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach((link) => {

            link.classList.remove("active");

            if (
                link.getAttribute("href") ===
                "#" + current
            ) {

                link.classList.add("active");

            }

        });

    }
);


/* =========================
   MAGNETIC BUTTONS
========================= */

document
    .querySelectorAll(".btn, .contact-btn")
    .forEach((button) => {

        button.addEventListener(
            "mousemove",
            (e) => {

                const rect =
                    button.getBoundingClientRect();

                const x =
                    e.clientX -
                    rect.left -
                    rect.width / 2;

                const y =
                    e.clientY -
                    rect.top -
                    rect.height / 2;

                button.style.transform =
                    `translate(${x * .08}px, ${y * .08}px)`;

            }
        );


        button.addEventListener(
            "mouseleave",
            () => {

                button.style.transform =
                    "";

            }
        );

    });