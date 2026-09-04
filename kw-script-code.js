<script>
	const carousel = document.getElementById("carousel");
	const totalSlides = carousel.children.length;
	let autoScroll;
	const dotPagination = document.getElementById("dotPagination");

	function getSlideWidth() {
		const firstItem = carousel.children[0];
		if (!firstItem) return 0;
		const gap = parseFloat(window.getComputedStyle(carousel).gap) || 10;
		return firstItem.offsetWidth + gap;
	}

	// Create pagination dots
	for (let i = 0; i < totalSlides; i++) {
		const dot = document.createElement("div");
		dot.classList.add("dot");
		if (i === 0) dot.classList.add("active");
		dot.addEventListener("click", () => goToSlide(i));
		dotPagination.appendChild(dot);
	}

	function updateDots(index) {
		const dots = document.querySelectorAll(".dot-pagination .dot");
		dots.forEach((dot, i) => {
			dot.classList.toggle("active", i === index);
		});
	}

	function goToSlide(index) {
		const slideWidth = getSlideWidth();
		carousel.scrollTo({ left: index * slideWidth, behavior: "smooth" });
		updateDots(index);
	}

	function nextSlide() {
		const slideWidth = getSlideWidth();
		if (!slideWidth) return;
		const currentScroll = carousel.scrollLeft;
		const maxScroll = carousel.scrollWidth - carousel.clientWidth;

		let nextIndex = Math.round(currentScroll / slideWidth) + 1;
		
		// Loop back to start if reached end or last index
		if (nextIndex >= totalSlides || currentScroll >= maxScroll - 5) {
			nextIndex = 0;
		}
		
		goToSlide(nextIndex);
	}

	function autoPlay() {
		stopAutoPlay();
		autoScroll = setInterval(nextSlide, 3000);
	}

	function stopAutoPlay() {
		if (autoScroll) clearInterval(autoScroll);
	}

	carousel.addEventListener("mouseenter", stopAutoPlay);
	carousel.addEventListener("mouseleave", autoPlay);

	// Touch events for mobile interaction
	carousel.addEventListener("touchstart", stopAutoPlay, { passive: true });
	carousel.addEventListener("touchend", autoPlay, { passive: true });

	carousel.addEventListener("scroll", () => {
		const slideWidth = getSlideWidth();
		if (slideWidth > 0) {
			const index = Math.round(carousel.scrollLeft / slideWidth);
			updateDots(index);
		}
	});

	autoPlay();
</script>
