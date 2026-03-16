export interface FadeUpOptions {
	delay?: number;
	duration?: number;
	y?: number;
	threshold?: number;
}

export function fadeUp(node: HTMLElement, options: FadeUpOptions = {}) {
	const { delay = 0, duration = 600, y = 22, threshold = 0.12 } = options;

	// data-fade-up="pending" is expected to already be in the markup so the
	// CSS rule hides the element from SSR. We just set up the transition here.
	node.style.transform = `translateY(${y}px)`;
	node.style.transition = `opacity ${duration}ms cubic-bezier(0.16,1,0.3,1), transform ${duration}ms cubic-bezier(0.16,1,0.3,1)`;
	if (delay) node.style.transitionDelay = `${delay}ms`;

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					node.dataset.fadeUp = 'done';
					node.style.transform = 'translateY(0)';
					observer.unobserve(node);
				}
			}
		},
		{ threshold }
	);

	// Small delay so the transition property is applied before the observer
	// fires for already-visible (above-the-fold) elements.
	const tid = setTimeout(() => observer.observe(node), 50);

	return {
		destroy() {
			clearTimeout(tid);
			observer.unobserve(node);
		}
	};
}
