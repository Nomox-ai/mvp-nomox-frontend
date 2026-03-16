export interface FadeUpOptions {
	delay?: number;
	duration?: number;
	y?: number;
	threshold?: number;
}

export function fadeUp(node: HTMLElement, options: FadeUpOptions = {}) {
	const { delay = 0, duration = 600, y = 22, threshold = 0.12 } = options;

	node.style.opacity = '0';
	node.style.transform = `translateY(${y}px)`;
	node.style.transition = `opacity ${duration}ms cubic-bezier(0.16,1,0.3,1), transform ${duration}ms cubic-bezier(0.16,1,0.3,1)`;
	if (delay) node.style.transitionDelay = `${delay}ms`;

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					node.style.opacity = '1';
					node.style.transform = 'translateY(0)';
					observer.unobserve(node);
				}
			}
		},
		{ threshold }
	);

	// Use setTimeout so the browser has a full macro-task boundary to paint
	// the initial hidden state before the observer fires for already-visible
	// elements (double-rAF can still batch before first paint on refresh).
	const tid = setTimeout(() => observer.observe(node), 300);

	return {
		destroy() {
			clearTimeout(tid);
			observer.unobserve(node);
		}
	};
}
