/* =========================================
   PART 1: PARTICLES BACKGROUND
   ========================================= */
function initParticles() {
    particlesJS("particles-js", {
        particles: {
            number: { value: 60, density: { enable: true, value_area: 800 } },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: {
                value: 0.4,
                random: false,
                anim: { enable: false }
            },
            size: {
                value: 3,
                random: true
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#333333",
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false
            }
        },
        interactivity: {
            detect_on: "window",
            events: {
                onhover: { enable: true, mode: "grab" },
                onclick: { enable: true, mode: "push" },
                resize: true
            },
            modes: {
                grab: { distance: 140, line_linked: { opacity: 0.8 } },
                push: { particles_nb: 4 }
            }
        },
        retina_detect: true
    });
}


/* =========================================
   PART 2: TYPEWRITER ANIMATION
   ========================================= */
function initTypewriter() {
    const el = document.getElementById('typewriter');
    const text = "Software Engineering Undergraduate & Software Developer.";

    let i = 0;

    function type() {
        if (i < text.length) {
            el.textContent += text.charAt(i);
            i++;
            setTimeout(type, 80);
        }
    }

    setTimeout(type, 1000);
}


/* =========================================
   PART 3: TERMINAL COMMAND SYSTEM
   ========================================= */
function typeThen(text, callback, speed = 40) {
    let i = 0;

    const line = document.createElement('p');
    line.classList.add('command-line');
    document.getElementById('terminalOutput').appendChild(line);

    function type() {
        if (i < text.length) {
            line.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            setTimeout(callback, 400); // small delay before action
        }
    }

    type();
}

function initTerminal() {
    const input = document.getElementById('terminalInput');
    const output = document.getElementById('terminalOutput');

    /* ---------- printer ---------- */
    function print(text) {
    const line = document.createElement('p');
    line.textContent = text;
    line.classList.add('command-line');

    const output = document.getElementById('terminalOutput');
    output.appendChild(line);

    output.scrollTop = output.scrollHeight;
}

    /* ---------- commands ---------- */
    const commands = {
    help: () => {
        typeThen("Loading help menu...", () => {
            print("Available: about, projects, resume, github, clear");
        });
    },

    about: () => {
        typeThen("Loading profile...", () => {
            print("Software Engineering Undergraduate passionate about full-stack development.");
        });
    },

    projects: () => {
        typeThen("Opening projects...", () => {
            window.location.href = "downloads.html";
        });
    },

    resume: () => {
        typeThen("Downloading resume...", () => {
            window.open("assets/MadhushaNirmalCV.pdf");
        });
    },

    github: () => {
        typeThen("Opening GitHub profile...", () => {
            window.open("https://github.com/madhusha2003");
        });
    },

    clear: () => {
        document.getElementById("terminalOutput").innerHTML = "";
    }
};

    /* ---------- input handler ---------- */
    input.addEventListener('keydown', (e) => {
        if (e.key !== "Enter") return;

        const cmd = input.value.trim().toLowerCase();

        print("$ " + cmd);

        if (commands[cmd]) {
            commands[cmd]();
        } else {
            print("Command not found. Type 'help'");
        }

        input.value = "";
    });
}


/* =========================================
   PART 4: INIT ALL
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initTypewriter();
    initTerminal();
});