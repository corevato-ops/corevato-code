document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.getElementById("carousel");
    const pagination = document.getElementById("dotPagination");

    if (!carousel || !pagination) return;

    const items = carousel.querySelectorAll(".carousel-item");

    items.forEach((item, index) => {
        const dot = document.createElement("span");
        dot.className = "dot";

        if (index === 0) {
            dot.classList.add("active");
        }

        dot.addEventListener("click", function () {
            carousel.scrollTo({
                left: item.offsetLeft,
                behavior: "smooth"
            });
        });

        pagination.appendChild(dot);
    });

    const dots = pagination.querySelectorAll(".dot");

    carousel.addEventListener("scroll", function () {
        let closestIndex = 0;
        let closestDistance = Infinity;

        items.forEach((item, index) => {
            const distance = Math.abs(
                carousel.scrollLeft - item.offsetLeft
            );

            if (distance < closestDistance) {
                closestDistance = distance;
                closestIndex = index;
            }
        });

        dots.forEach((dot, index) => {
            dot.classList.toggle(
                "active",
                index === closestIndex
            );
        });
    });
});
