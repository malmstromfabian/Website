const hero = document.querySelector(".hero");

const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");

const transitionDistance = 500;
const snapThreshold = 0.4;

let scrollTimer;
let snappingBack = false;


/* =========================
   HERO SCROLL EFFECT
   ========================= */

function updateHero() {
    if (!hero) return;

    let progress = window.scrollY / transitionDistance;

    // Håll progress mellan 0 och 1
    progress = Math.max(0, Math.min(1, progress));

    const scale = 1 - progress * 0.07;
    const radius = progress * 30;

    hero.style.transform = `scale(${scale})`;
    hero.style.borderRadius = `${radius}px`;
}


window.addEventListener("scroll", function () {
    updateHero();

    if (snappingBack || !hero) {
        return;
    }

    clearTimeout(scrollTimer);

    scrollTimer = setTimeout(function () {
        let progress = window.scrollY / transitionDistance;

        progress = Math.max(0, Math.min(1, progress));

        if (progress > 0 && progress < snapThreshold) {
            snappingBack = true;

            hero.style.transition =
                "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), " +
                "border-radius 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)";

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

            setTimeout(function () {
                hero.style.transition = "";
                snappingBack = false;
            }, 500);
        }
    }, 120);
});


/* =========================
   MOBILE MENU
   ========================= */

if (menuButton && mobileMenu) {
    menuButton.addEventListener("click", function () {
        mobileMenu.classList.toggle("active");

        if (mobileMenu.classList.contains("active")) {
            menuButton.textContent = "✕";
        } else {
            menuButton.textContent = "☰";
        }
    });
}


/* =========================
   RESET MENU ON RESIZE
   ========================= */

window.addEventListener("resize", function () {
    if (window.innerWidth > 1000 && mobileMenu && menuButton) {
        mobileMenu.classList.remove("active");
        menuButton.textContent = "☰";
    }
});


/* =========================
   INITIAL STATE
   ========================= */

updateHero();