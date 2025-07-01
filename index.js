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

// GSAP Animations
document.addEventListener("DOMContentLoaded", () => {
	gsap.registerPlugin(ScrollTrigger);

	function setupWordReveal(selector) {
		const elements = gsap.utils.toArray(selector);
		elements.forEach((el) => {
			const parts = el.innerHTML.split(/(<[^>]+>)/g).filter(Boolean);
			let newHTML = "";
			parts.forEach((part) => {
				if (part.startsWith("<") && part.endsWith(">")) {
					newHTML += part;
				} else {
					part
						.split(/\s+/)
						.filter(Boolean)
						.forEach((word) => {
							newHTML += `<span class="word-wrapper"><span class="word">${word}</span></span> `;
						});
				}
			});
			el.innerHTML = newHTML;
			const wordSpans = el.querySelectorAll(".word");
			gsap.from(wordSpans, {
				scrollTrigger: {
					trigger: el,
					start: "top 80%",
					toggleActions: "play none none none",
				},
				yPercent: 100,
				opacity: 0,
				duration: 0.6,
				ease: "power2.out",
				stagger: 0.04,
			});
		});
	}

	// --- NON-IMAGE ANIMATIONS (Run Immediately) ---

	// Hero Text & Buttons (Image animation is now separate)
	const heroHeader = document.querySelector("#hero .hero-header");
	const heroParts = heroHeader.innerHTML.split(/(<[^>]+>)/g).filter(Boolean);
	let heroNewHTML = "";
	heroParts.forEach((part) => {
		if (part.startsWith("<")) {
			heroNewHTML += part;
		} else {
			part
				.split(/\s+/)
				.filter(Boolean)
				.forEach((word) => {
					heroNewHTML += `<span class="word-wrapper"><span class="word">${word}</span></span> `;
				});
		}
	});
	heroHeader.innerHTML = heroNewHTML;
	const heroTl = gsap.timeline({ delay: 0.3 });
	const heroWordSpans = heroHeader.querySelectorAll(".word");
	heroTl
		.from("#hero .section-tag", {
			y: -30,
			opacity: 0,
			duration: 0.6,
			ease: "power2.out",
		})
		.from(
			heroWordSpans,
			{
				yPercent: 100,
				opacity: 0,
				stagger: 0.05,
				duration: 0.6,
				ease: "power2.out",
			},
			"<0.1",
		)
		.from(
			"#hero .hero-subheader",
			{ y: 30, opacity: 0, duration: 0.8, ease: "power2.out" },
			"-=0.6",
		)
		.from(
			"#hero .store-download-btn",
			{ y: 30, opacity: 0, stagger: 0.2, duration: 0.6, ease: "power2.out" },
			"-=0.5",
		);

	// All other text and UI animations
	const sectionTags = gsap.utils.toArray(
		".section-tag:not(#hero .section-tag)",
	);
	sectionTags.forEach((tag) => {
		gsap.from(tag, {
			scrollTrigger: {
				trigger: tag,
				start: "top 80%",
				toggleActions: "play none none none",
			},
			opacity: 0,
			y: -30,
			duration: 0.6,
			ease: "power2.out",
		});
	});
	setupWordReveal(".hero-header:not(#hero .hero-header)");
	setupWordReveal(".user-features h2");
	const subheaders = gsap.utils.toArray(
		".hero-subheader:not(#hero .hero-subheader)",
	);
	subheaders.forEach((subheader) => {
		gsap.from(subheader, {
			scrollTrigger: {
				trigger: subheader,
				start: "top 80%",
				toggleActions: "play none none none",
			},
			duration: 0.8,
			y: 30,
			opacity: 0,
			delay: 0.3,
			ease: "power2.out",
		});
	});
	gsap.from("#features .feature", {
		scrollTrigger: {
			trigger: ".features-container",
			start: "top 80%",
			toggleActions: "play none none none",
		},
		opacity: 0,
		y: 50,
		duration: 0.8,
		ease: "power2.out",
		stagger: 0.2,
	});
	gsap.from("#how-it-works .process", {
		scrollTrigger: {
			trigger: "#how-it-works .process",
			start: "top 80%",
			toggleActions: "play none none none",
		},
		opacity: 0,
		y: 40,
		duration: 0.6,
		ease: "power2.out",
		stagger: 0.2,
	});
	gsap.from("#cta .store-download-btn", {
		scrollTrigger: {
			trigger: ".cta-container",
			start: "top 75%",
			toggleActions: "play none none none",
		},
		opacity: 0,
		y: 30,
		stagger: 0.2,
		duration: 0.6,
		ease: "power2.out",
	});
	gsap.from("#faq .faq-item", {
		scrollTrigger: {
			trigger: "#faq .faq-item",
			start: "top 80%",
			toggleActions: "play none none none",
		},
		opacity: 0,
		y: 40,
		duration: 0.6,
		ease: "power2.out",
		stagger: 0.15,
	});
	const aboutUserDesigns = gsap.utils.toArray("#about .user-design");
	if (aboutUserDesigns[0]) {
		gsap.from(aboutUserDesigns[0].querySelector(".user-features"), {
			scrollTrigger: {
				trigger: aboutUserDesigns[0],
				start: "top 80%",
				toggleActions: "play none none none",
			},
			x: 100,
			opacity: 0,
			duration: 0.8,
			ease: "power2.out",
		});
	}
	if (aboutUserDesigns[1]) {
		gsap.from(aboutUserDesigns[1].querySelector(".user-features"), {
			scrollTrigger: {
				trigger: aboutUserDesigns[1],
				start: "top 80%",
				toggleActions: "play none none none",
			},
			x: -100,
			opacity: 0,
			duration: 0.8,
			ease: "power2.out",
		});
	}

	// --- DECOUPLED IMAGE ANIMATIONS (Wait for their specific image to load) ---

	// 1. Hero Image
	const heroImage = document.querySelector("#hero .hero-image-container");
	imagesLoaded(heroImage, function () {
		gsap.from(heroImage, {
			y: 50,
			opacity: 0,
			duration: 1.2,
			ease: "power2.out",
			delay: 0.8,
		});
	});

	// 2. About Section Images
	if (aboutUserDesigns[0]) {
		const aboutImage1 = aboutUserDesigns[0].querySelector(
			".user-image-container",
		);
		imagesLoaded(aboutImage1, function () {
			gsap.from(aboutImage1, {
				scrollTrigger: {
					trigger: aboutUserDesigns[0],
					start: "top 80%",
					toggleActions: "play none none none",
				},
				x: -100,
				opacity: 0,
				duration: 0.8,
				ease: "power2.out",
			});
		});
	}
	if (aboutUserDesigns[1]) {
		const aboutImage2 = aboutUserDesigns[1].querySelector(
			".user-image-container",
		);
		imagesLoaded(aboutImage2, function () {
			gsap.from(aboutImage2, {
				scrollTrigger: {
					trigger: aboutUserDesigns[1],
					start: "top 80%",
					toggleActions: "play none none none",
				},
				x: 100,
				opacity: 0,
				duration: 0.8,
				ease: "power2.out",
			});
		});
	}
});
