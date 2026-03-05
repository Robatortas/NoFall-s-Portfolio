const DEVMODE = true;

if(!DEVMODE) {
    window.onload = function() {
        window.scrollTo(0, 0);
    };
}

var currentHTML = document.URL
console.log(currentHTML)

document.addEventListener("DOMContentLoaded", () => {

    if(!DEVMODE)lockScroll();

    const buttons = document.querySelectorAll(".tab-btn");
    const sections = document.querySelectorAll(".tab-content");
    const backBtns = document.querySelectorAll("#back");

    buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
            // Captures all the buttons in the navbar with the tab dataset (data-tab in html)
            const target = btn.dataset.tab;

            if (target === "music") {
            typewriterEffect()
            }
            // if(btn.dataset.tab === )

            // Handles the active handler for each click listen
            buttons.forEach((b) => b.classList.remove("active"));
            // This is below so that it captures the only one currently active ofc
            btn.classList.add("active");

            
            const video = document.getElementById("myVideo");
            sections.forEach((s) => {
                s.classList.remove("active");
                if (s.id === target) {
                    s.classList.add("active");
                }
            });
            if (target === "music") {
                video.play();
                video.muted = false;
                video.volume= 0.2;
            } else {
                video.pause();
                video.muted = true
            }
       });
    });

     backBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            const navbarBtns = btn.dataset.tab;

            sections.classList.add("active")
        })
    });

    sections.forEach((sections) => {

    })

    const divisionPhotos = document.querySelectorAll("#section-photo")

    // Navbar blurring stuff
    const navbar = document.querySelector('.navbar');
    document.addEventListener("scroll", () => {
        if(window.scrollY > navbar.clientHeight) {
            navbar.style.opacity = "0.0";
            navbar.style.visibility = "hidden"
        } else {
            navbar.style.opacity = "1.0";
            navbar.style.visibility = "visible"
        }
        divisionPhotos.forEach((dP) => {
            dP.style.transform = 'translateY(' + window.scrollY/13 + 'px)'
        });

    })

    const myPhoto = document.querySelector(".hero-photo");
    const navBar = document.querySelector('.navbar')
    const typewritees = document.querySelectorAll("#typewriter");
    function typewriterEffect() {
    typewritees.forEach((tw) => {
        const text = tw.innerText;
        tw.innerHTML = "";
        let i = 0;
        setInterval(() => {
            if (i < text.length) {
                tw.innerHTML += text[i];
                i++;
            }
        }, 100);
        }) 
    }
    typewriterEffect()
    
    setTimeout(() => {
            myPhoto.style.visibility = "visible";
            myPhoto.style.opacity = "100%";
        }, 1800);

    tempTimer = 2000
    if(!currentHTML.includes("index.html")) tempTimer = 0;
    setTimeout(() => {
            navBar.style.filter = "opacity(100%)";
            unlockScroll();
        }, tempTimer);
});


lockScroll = () => {
    if(currentHTML.includes("index.html")) document.documentElement.style.overflow = "hidden";
}

unlockScroll = () => {
    if(currentHTML.includes("index.html")) document.documentElement.style.overflow = "visible";
}