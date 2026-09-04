document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.getElementById("carousel");
    const pagination = document.getElementById("dotPagination");

    if (!carousel) return;

    const items = carousel.querySelectorAll(".carousel-item");
    if (!items.length) return;

    // Create dots
    if (pagination) {
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
    }

    // Auto Play
    let currentIndex = 0;

    setInterval(function () {
        currentIndex++;

        // Start again from first slide
        if (currentIndex >= items.length) {
            currentIndex = 0;
        }

        carousel.scrollTo({
            left: items[currentIndex].offsetLeft,
            behavior: "smooth"
        });

        // Update active dot
        if (pagination) {
            const dots = pagination.querySelectorAll(".dot");

            dots.forEach((dot, index) => {
                dot.classList.toggle(
                    "active",
                    index === currentIndex
                );
            });
        }

    }, 3000); // 3 seconds
});
