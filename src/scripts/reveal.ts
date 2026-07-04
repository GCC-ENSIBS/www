const revealOptions = { rootMargin: "0px 0px -10% 0px", threshold: 0.1 };
const revealClasses = [
	"animate-in",
	"fade-in",
	"slide-in-from-bottom-3",
	"animate-duration-500",
];
const staggerClasses = [
	"animate-in",
	"fade-in",
	"slide-in-from-bottom-2",
	"animate-duration-400",
];

export function revealOnEnter(selector: string) {
	document.documentElement.dataset.reveal = "enabled";

	if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
		document.querySelectorAll<HTMLElement>(selector).forEach((element) => {
			element.dataset.revealed = "true";
		});

		return;
	}

	const observer = new IntersectionObserver((entries) => {
		for (const entry of entries) {
			if (!entry.isIntersecting) {
				continue;
			}

			reveal(entry.target as HTMLElement);

			observer.unobserve(entry.target);
		}
	}, revealOptions);

	document.querySelectorAll<HTMLElement>(selector).forEach((element) => {
		if (element.getBoundingClientRect().top < window.innerHeight) {
			reveal(element);

			return;
		}

		observer.observe(element);
	});
}

function reveal(element: HTMLElement) {
	element.dataset.revealed = "true";

	if (element.hasAttribute("data-animate")) {
		element.classList.add(...revealClasses);
	}

	if (element.hasAttribute("data-animate-stagger")) {
		Array.from(element.children).forEach((child, index) => {
			const childElement = child as HTMLElement;
			childElement.style.animationDelay = `${index * 80}ms`;
			childElement.classList.add(...staggerClasses);
		});
	}
}
