/* =========================================
   PARTICLES.JS CONFIGURATION
   Tailored to fit the High Contrast Theme
   ========================================= */
particlesJS("particles-js", {
    "particles": {
        "number": { "value": 60, "density": { "enable": true, "value_area": 800 } },
        "color": { "value": "#ffffff" }, /* Pure White */
        "shape": { "type": "circle" },
        "opacity": {
            "value": 0.4,
            "random": false,
            "anim": { "enable": false }
        },
        "size": {
            "value": 3,
            "random": true
        },
        "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#333333", /* Dark Gray */
            "opacity": 0.4,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 2,
            "direction": "none",
            "random": true,
            "straight": false,
            "out_mode": "out",
            "bounce": false
        }
    },
    "interactivity": {
        "detect_on": "window",
        "events": {
            "onhover": { "enable": true, "mode": "grab" },
            "onclick": { "enable": true, "mode": "push" },
            "resize": true
        },
        "modes": {
            "grab": { "distance": 140, "line_linked": { "opacity": 0.8 } },
            "push": { "particles_nb": 4 }
        }
    },
    "retina_detect": true
});

/* =========================================
   TYPING ANIMATION
   For Terminal Hero Section
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {
    const typeWriterElement = document.getElementById('typewriter');
    const textToType = "Software Engineering Undergraduate & Software Developer.";
    let charIndex = 0;
    let isTyping = true;

    function type() {
        if (charIndex < textToType.length) {
            typeWriterElement.textContent += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(type, 80); // Typing speed
        } else {
            // Once fully typed, stop typing animation (cursor will keep blinking via CSS)
            isTyping = false;
        }
    }

    // Start typing after a short delay so the user sees it begin
    setTimeout(type, 1000);
});
