window.onload = function() {
    window.scrollTo(0, 0);
};

var currentHTML = document.URL
console.log(currentHTML)

document.addEventListener("DOMContentLoaded", () => {

    lockScroll();

    const buttons = document.querySelectorAll(".tab-btn");
    const sections = document.querySelectorAll(".tab-content");

    buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
            // Captures all the buttons in the navbar with the tab dataset (data-tab in html)
            const target = btn.dataset.tab;

            // Handles the active handler for each click listen
            buttons.forEach((b) => b.classList.remove("active"));
            // This is below so that it captures the only one currently active ofc
            btn.classList.add("active");

            
            sections.forEach((s) => {
                s.classList.remove("active");
                if (s.id === target) {
                    s.classList.add("active");
                }
            });
       });
    });

    const divisionPhotos = document.querySelectorAll("#section-photo")

    // Navbar blurring stuff
    const navbar = document.querySelector('.navbar');
    document.addEventListener("scroll", () => {
        if(window.scrollY > navbar.clientHeight) {
            navbar.style.opacity = "0.0";
        } else {
            navbar.style.opacity = "1.0";
        }
        divisionPhotos.forEach((dP) => {
            dP.style.transform = 'translateY(' + window.scrollY/13 + 'px)'
        });

    })

    

    const myPhoto = document.querySelector(".hero-photo");
    const navBar = document.querySelector('.navbar')
    const typewritees = document.querySelectorAll("#typewriter");
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
    
    setTimeout(() => {
            myPhoto.style.visibility = "visible";
            myPhoto.style.opacity = "100%";
        }, 1400);

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