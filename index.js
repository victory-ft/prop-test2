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

//menu logic
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
const header = document.getElementById("header");

hamburger.addEventListener("click", function () {
	hamburger.classList.toggle("active");
	mobileMenu.classList.toggle("active");
	document.body.style.overflow = mobileMenu.classList.contains("active")
		? "hidden"
		: "";
});

// Close mobile menu when clicking on a link
const mobileMenuLinks = mobileMenu.querySelectorAll("a");
mobileMenuLinks.forEach((link) => {
	link.addEventListener("click", function () {
		hamburger.classList.remove("active");
		mobileMenu.classList.remove("active");
		document.body.style.overflow = "";
	});
});

// Close mobile menu when clicking outside
mobileMenu.addEventListener("click", function (e) {
	if (e.target === mobileMenu) {
		hamburger.classList.remove("active");
		mobileMenu.classList.remove("active");
		document.body.style.overflow = "";
	}
});

// Header scroll behavior (your existing functionality)
let lastScrollTop = 0;
const scrollThreshold = 100;

window.addEventListener("scroll", function () {
	let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

	// Add scrolled class when scrolled
	if (scrollTop > 50) {
		header.classList.add("scrolled");
	} else {
		header.classList.remove("scrolled");
	}

	// Hide/show header based on scroll direction
	if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
		header.classList.add("hidden");
	} else {
		header.classList.remove("hidden");
	}

	lastScrollTop = scrollTop;
});
