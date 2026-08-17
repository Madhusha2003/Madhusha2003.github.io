/* =========================================
   PART 1: 3D SCREEN TYPEWRITER INTRO
   ========================================= */
function init3DTypewriter() {
    const text = "Software Engineering Undergraduate";
    let i = 0;

    function type() {
        if (i < text.length) {
            const current = text.substring(0, i + 1);
            if (window.terminal3D) {
                window.terminal3D.updateInput(current);
            }
            i++;
            setTimeout(type, 65);
        } else {
            setTimeout(() => {
                if (window.terminal3D) {
                    window.terminal3D.pushLine(text, "#ffd60a");
                    window.terminal3D.updateInput("");
                    window.terminal3D.pushLine("Type 'help' to view commands.", "#a3a3a3");
                }
            }, 500);
        }
    }

    setTimeout(type, 1200);
}

/* =========================================
   PART 2: 3D TERMINAL COMMAND SYSTEM
   ========================================= */
function init3DTerminal() {
    const hiddenInput = document.getElementById('terminal-hidden-input');

    // Keep global focus active so keyboard strokes hit the 3D terminal
    window.addEventListener('click', () => {
        if (hiddenInput) hiddenInput.focus();
    });
    if (hiddenInput) hiddenInput.focus();

    const commands = {
        help: () => {
            window.terminal3D.pushLine("Available commands:", "#ffd60a");
            window.terminal3D.pushLine("  about    - Go to About section", "#a3a3a3");
            window.terminal3D.pushLine("  projects - Go to Projects section", "#a3a3a3");
            window.terminal3D.pushLine("  skills   - List technical stack", "#a3a3a3");
            window.terminal3D.pushLine("  resume   - View / Download CV", "#a3a3a3");
            window.terminal3D.pushLine("  github   - Open GitHub profile", "#a3a3a3");
            window.terminal3D.pushLine("  contact  - Go to Contact links", "#a3a3a3");
            window.terminal3D.pushLine("  clear    - Clear terminal", "#a3a3a3");
        },

        about: () => {
            document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
            window.terminal3D.pushLine("Navigating to About section...", "#32d74b");
        },

        projects: () => {
            document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
            window.terminal3D.pushLine("Navigating to Projects section...", "#32d74b");
        },

        skills: () => {
            window.terminal3D.pushLine("Skills: Java, Python, React, MySQL, Flutter, Dart, Kotlin", "#ffffff");
        },

        resume: () => {
            window.terminal3D.pushLine("Downloading resume...", "#32d74b");
            window.open("assets/MadhushaNirmalCV_1.pdf", "_blank");
        },

        github: () => {
            window.terminal3D.pushLine("Opening GitHub profile...", "#32d74b");
            window.open("https://github.com/Madhusha2003", "_blank");
        },

        contact: () => {
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            window.terminal3D.pushLine("Navigating to Contact section...", "#32d74b");
        },

        clear: () => {
            window.terminal3D.clear();
        }
    };

    if (hiddenInput) {
        // Mirror typed characters live onto the 3D screen
        hiddenInput.addEventListener('input', (e) => {
            if (window.terminal3D) {
                window.terminal3D.updateInput(e.target.value);
            }
        });

        hiddenInput.addEventListener('keydown', (e) => {
            if (e.key === "Enter") {
                const cmd = hiddenInput.value.trim().toLowerCase();
                if (window.terminal3D) {
                    window.terminal3D.pushLine("$ " + cmd, "#32d74b");

                    if (commands[cmd]) {
                        commands[cmd]();
                    } else if (cmd !== "") {
                        window.terminal3D.pushLine(`Command not found: '${cmd}'. Type 'help'`, "#ff453a");
                    }

                    hiddenInput.value = "";
                    window.terminal3D.updateInput("");
                }
            }
        });
    }
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
    init3DTypewriter();
    init3DTerminal();
    initProjectFilters();
});