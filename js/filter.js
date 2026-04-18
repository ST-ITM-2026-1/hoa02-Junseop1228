// ===== PROJECT FILTER =====

document.addEventListener("DOMContentLoaded", () => {

    const filterBtns = document.querySelectorAll(".filter-btn");
    const cards = document.querySelectorAll(".project-card");

    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {

            // Remove active class from all buttons, set on clicked one
            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const selected = btn.dataset.filter;

            // Show card if category matches, hide if not
            cards.forEach(card => {
                if (selected === "all" || card.dataset.category === selected) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });

});
