let lastScrollY = window.scrollY;
let ticking = false;

function updateNavbar() {
	const header = document.getElementById("header");
	const currentScrollY = window.scrollY;

	// Add/remove scrolled class based on scroll position
	if (currentScrollY > 50) {
		header.classList.add("scrolled");
	} else {
		header.classList.remove("scrolled");
	}

	// Show/hide navbar based on scroll direction
	if (currentScrollY > lastScrollY && currentScrollY > 100) {
		// Scrolling down & past threshold
		header.classList.add("hidden");
	} else {
		// Scrolling up or at top
		header.classList.remove("hidden");
	}

	lastScrollY = currentScrollY;
	ticking = false;
}

function requestTick() {
	if (!ticking) {
		requestAnimationFrame(updateNavbar);
		ticking = true;
	}
}

window.addEventListener("scroll", requestTick);
