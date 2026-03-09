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
    const video = document.getElementById("myVideo");
    let pendingPlay = null;

    const startVideoPlay = () => {
        video.play();
        let vol = 0;
        const fadeIn = setInterval(() => {
            vol = Math.min(vol + 0.02, 0.2);
            video.volume = vol;
            if (vol >= 0.2) clearInterval(fadeIn);
        }, 50);
        video.play();
    };

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


            sections.forEach(s => s.classList.remove('showing-detail'));

            sections.forEach((s) => {
                s.classList.remove("active");
                if (s.id === target) {
                    s.classList.add("active");
                }
            });
            if (target === "music") {
                video.muted = false;
                video.volume = 0;
                startVideoPlay();
            } else {
                let vol = 0.2;
                const fadeOut = setInterval(() => {
                vol = Math.max(vol - 0.04, 0);
                video.volume = vol;
                if (vol <= 0.0) {
                    clearInterval(fadeOut);
                    video.pause();
                    video.muted = true;
                } 
                }, 50);
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

    // Detail drill-down — generic for any tab section
    document.querySelectorAll('[data-detail]').forEach(item => {
        item.addEventListener('click', () => {
            const section = item.closest('.tab-content');
            section.classList.add('showing-detail');
            document.getElementById(item.dataset.detail)
                .scrollIntoView({ behavior: 'smooth' });
        });
    });

    document.querySelectorAll('.detail-back-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const section = btn.closest('.tab-content');
            section.classList.remove('showing-detail');
            section.scrollIntoView({ behavior: 'smooth' });
        });
    });

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