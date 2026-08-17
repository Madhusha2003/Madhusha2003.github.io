/* =========================================
   PART 1: TYPEWRITER ANIMATION
   ========================================= */
function initTypewriter() {
    const el = document.getElementById('typewriter');
    if (!el) return;
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
   PART 2: TERMINAL COMMAND SYSTEM
   ========================================= */
function typeThen(text, callback, speed = 40) {
    let i = 0;
    const output = document.getElementById('terminalOutput');
    if (!output) return;

    const line = document.createElement('p');
    line.classList.add('command-line');
    output.appendChild(line);

    function type() {
        if (i < text.length) {
            line.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            setTimeout(callback, 400);
        }
    }

    type();
}

function initTerminal() {
    const input = document.getElementById('terminalInput');
    const output = document.getElementById('terminalOutput');
    if (!input || !output) return;

    function print(text) {
        const line = document.createElement('p');
        line.textContent = text;
        line.classList.add('command-line');
        output.appendChild(line);
        output.scrollTop = output.scrollHeight;
    }

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
                window.open("assets/MadhushaNirmalCV_1.pdf");
            });
        },

        github: () => {
            typeThen("Opening GitHub profile...", () => {
                window.open("https://github.com/madhusha2003");
            });
        },

        clear: () => {
            output.innerHTML = "";
        }
    };

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
   PART 3: PROJECT FILTERS
   ========================================= */
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.card');

    if (!filterButtons.length || !projectCards.length) return;

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || filterValue === category) {
                    card.classList.remove('hidden');
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(10px)';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

/* =========================================
   PART 4: INIT ALL
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {
    initTypewriter();
    initTerminal();
    initProjectFilters();
});