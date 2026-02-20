document.addEventListener("DOMContentLoaded", () => {
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
});
