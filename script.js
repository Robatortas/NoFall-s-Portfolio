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
    const owfaFrame = document.getElementById('owfaVideo');

    const videoIntervals = new Map();

    function fadeInVideo(el) {
        if (!el) return;
        if (videoIntervals.has(el)) clearInterval(videoIntervals.get(el));
        el.muted = false;
        el.volume = 0;
        el.play();
        let vol = 0;
        const id = setInterval(() => {
            vol = Math.min(vol + 0.02, 0.2);
            el.volume = vol;
            if (vol >= 0.2) { clearInterval(id); videoIntervals.delete(el); }
        }, 50);
        videoIntervals.set(el, id);
    }

    function fadeOutVideo(el) {
        if (!el) return;
        if (videoIntervals.has(el)) clearInterval(videoIntervals.get(el));
        let vol = el.volume;
        const id = setInterval(() => {
            vol = Math.max(vol - 0.04, 0);
            el.volume = vol;
            if (vol <= 0) {
                clearInterval(id);
                videoIntervals.delete(el);
                el.pause();
                el.muted = true;
            }
        }, 50);
        videoIntervals.set(el, id);
    }

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


            sections.forEach(s => { s.classList.remove('showing-detail'); s.removeAttribute('data-showing'); });
            fadeOutVideo(owfaFrame);

            sections.forEach((s) => {
                s.classList.remove("active");
                if (s.id === target) {
                    s.classList.add("active");
                }
            });
            if (target === "music") {
                fadeInVideo(video);
            } else {
                fadeOutVideo(video);
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

    // OWFA video — play/pause based on scroll visibility
    const owfaVideoSection = document.getElementById('andyoudontseem');
    if (owfaVideoSection) {
        const owfaObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    fadeInVideo(owfaFrame);
                } else {
                    fadeOutVideo(owfaFrame);
                }
            });
        }, { threshold: 0.4 });
        owfaObserver.observe(owfaVideoSection);
    }


    // Detail drill-down — generic for any tab section
    document.querySelectorAll('[data-detail]').forEach(item => {
        item.addEventListener('click', () => {
            const section = item.closest('.tab-content');
            section.classList.add('showing-detail');
            section.dataset.showing = item.dataset.detail;
            document.getElementById(item.dataset.detail)
                .scrollIntoView({ behavior: 'smooth' });
        });
    });

    document.querySelectorAll('.detail-back-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const section = btn.closest('.tab-content');
            section.classList.remove('showing-detail');
            section.removeAttribute('data-showing');
            section.scrollIntoView({ behavior: 'smooth' });
            if (btn.closest('#owfa-detail')) fadeOutVideo(owfaFrame);
        });
    });

    // Screenshot carousel
    const carouselImages = [
        'res/owfa_screenshot_2.png', 'res/DSC_0220.JPG'
    ];
    let carouselIdx = 0;
    const carouselImg = document.querySelector('.carousel-img');
    const carouselCounter = document.querySelector('.carousel-counter');

    function updateCarousel() {
        carouselImg.style.opacity = '0';
        setTimeout(() => {
            carouselImg.src = carouselImages[carouselIdx];
            carouselCounter.textContent = `${carouselIdx + 1} / ${carouselImages.length}`;
            carouselImg.style.opacity = '1';
        }, 150);
    }

    document.querySelector('.carousel-btn--prev').addEventListener('click', () => {
        carouselIdx = (carouselIdx - 1 + carouselImages.length) % carouselImages.length;
        updateCarousel();
    });
    document.querySelector('.carousel-btn--next').addEventListener('click', () => {
        carouselIdx = (carouselIdx + 1) % carouselImages.length;
        updateCarousel();
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
            dP.style.transform = 'translateY(' + window.scrollY / 13 + 'px)';
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