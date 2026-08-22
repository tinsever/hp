let teardown = (): void => {};

export function startCustomCursor(): void {
    teardown();

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
    ).matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    if (reduceMotion || coarsePointer) {
        teardown = () => {};
        return;
    }

    const rootEl = document.getElementById("custom-cursor-root");
    const dotEl = document.getElementById("custom-cursor-dot");
    const ringEl = document.getElementById("custom-cursor-ring");
    if (!rootEl || !dotEl || !ringEl) {
        teardown = () => {};
        return;
    }

    const root = rootEl;
    const dot = dotEl;
    const ring = ringEl;

    document.documentElement.classList.add("custom-cursor-active");

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let hasMoved = false;
    let rafId = 0;

    const LERP = 0.14;

    function positionDot(): void {
        dot.style.left = `${mouseX}px`;
        dot.style.top = `${mouseY}px`;
    }

    function tick(): void {
        ringX += (mouseX - ringX) * LERP;
        ringY += (mouseY - ringY) * LERP;
        ring.style.left = `${ringX}px`;
        ring.style.top = `${ringY}px`;
        rafId = requestAnimationFrame(tick);
    }

    function onMove(e: MouseEvent): void {
        mouseX = e.clientX;
        mouseY = e.clientY;
        const el = e.target instanceof Element ? e.target : null;
        const onInteractive =
            el?.closest(
                'a[href], button:not([disabled]), [role="button"]:not([disabled])',
            ) != null;
        root.classList.toggle("custom-cursor--link", onInteractive);
        if (!hasMoved) {
            hasMoved = true;
            ringX = mouseX;
            ringY = mouseY;
            ring.style.left = `${ringX}px`;
            ring.style.top = `${ringY}px`;
            root.classList.remove("opacity-0");
        }
        positionDot();
    }

    function onLeave(): void {
        root.classList.add("opacity-0");
        root.classList.remove("custom-cursor--link");
    }

    function onEnter(): void {
        if (hasMoved) root.classList.remove("opacity-0");
    }

    root.classList.remove("hidden");
    positionDot();
    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;
    rafId = requestAnimationFrame(tick);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    teardown = () => {
        window.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseleave", onLeave);
        document.removeEventListener("mouseenter", onEnter);
        cancelAnimationFrame(rafId);
        document.documentElement.classList.remove("custom-cursor-active");
    };
}
