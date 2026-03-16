export interface FadeUpOptions {
  delay?: number
  duration?: number
  y?: number
  threshold?: number
}

export function fadeUp(node: HTMLElement, options: FadeUpOptions = {}) {
  const { delay = 0, duration = 600, y = 22, threshold = 0.12 } = options

  // data-fade-up="pending" is expected to already be in the markup so the
  // CSS rule hides the element from SSR. We just set up the transition here.
  node.style.transform = `translateY(${y}px)`
  node.style.transition = `opacity ${duration}ms cubic-bezier(0.16,1,0.3,1), transform ${duration}ms cubic-bezier(0.16,1,0.3,1)`
  if (delay) node.style.transitionDelay = `${delay}ms`

  function reveal() {
    node.dataset.fadeUp = "done"
    node.style.transform = "translateY(0)"
  }

  // Check if the element is already in the viewport (e.g. hero on load).
  // If so, use a plain timeout keyed to the element's own delay so the
  // transition has time to be applied before we trigger it.
  // If it's off-screen, use IntersectionObserver to trigger on scroll.
  const rect = node.getBoundingClientRect()
  const inViewport = rect.top < window.innerHeight && rect.bottom > 0

  let tid: ReturnType<typeof setTimeout>
  let observer: IntersectionObserver | undefined

  if (inViewport) {
    tid = setTimeout(reveal, 20 + delay)
  } else {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            reveal()
            observer!.unobserve(node)
          }
        }
      },
      { threshold },
    )
    observer.observe(node)
  }

  return {
    destroy() {
      clearTimeout(tid)
      observer?.unobserve(node)
    },
  }
}
