// Slow-drifting node network behind the hero. Nudged by the cursor, paused offscreen.
const canvas = document.querySelector<HTMLCanvasElement>('.hero canvas');
const ctx = canvas?.getContext('2d');
if (canvas && ctx) {
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const LINK = 130;
  let w = 0, h = 0, color = '', inView = false;
  let frame: number | undefined;
  let nodes: { x: number; y: number; vx: number; vy: number }[] = [];
  const mouse = { x: -9999, y: -9999 };

  const readColor = () => (color = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim());
  const resize = () => {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    w = canvas.clientWidth; h = canvas.clientHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.round(Math.min(90, (w * h) / 14000));
    nodes = Array.from({ length: count }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
    }));
  };

  const draw = (animate = false) => {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = ctx.strokeStyle = color;
    for (const n of nodes) {
      if (animate) {
        const dx = mouse.x - n.x, dy = mouse.y - n.y, d = Math.hypot(dx, dy);
        if (d > 0 && d < 180) { n.x -= (dx / d) * 0.35; n.y -= (dy / d) * 0.35; } // drift away from the cursor
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }
      ctx.globalAlpha = 0.8;
      ctx.beginPath(); ctx.arc(n.x, n.y, 1.6, 0, Math.PI * 2); ctx.fill();
    }
    // ponytail: O(n²) pair scan, fine for <=90 nodes; use a grid if the count grows.
    ctx.lineWidth = 1;
    for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i], b = nodes[j], d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d > LINK) continue;
      ctx.globalAlpha = (1 - d / LINK) * 0.35;
      ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
    }
  };

  const tick = () => {
    draw(true);
    frame = requestAnimationFrame(tick);
  };
  const syncMotion = () => {
    if (inView && !document.hidden && !motion.matches) {
      frame ??= requestAnimationFrame(tick);
    } else if (frame !== undefined) {
      cancelAnimationFrame(frame);
      frame = undefined;
    }
  };

  readColor(); resize(); draw();
  addEventListener('themechange', () => { readColor(); draw(); });
  addEventListener('resize', () => { resize(); draw(); });
  if (typeof IntersectionObserver === 'function') {
    motion.addEventListener?.('change', syncMotion);
    document.addEventListener('visibilitychange', syncMotion);
    canvas.parentElement!.addEventListener('pointermove', (e) => {
      const b = canvas.getBoundingClientRect();
      mouse.x = e.clientX - b.left; mouse.y = e.clientY - b.top;
    });
    canvas.parentElement!.addEventListener('pointerleave', () => { mouse.x = mouse.y = -9999; });
    new IntersectionObserver(([en]) => {
      inView = en.isIntersecting;
      syncMotion();
    }).observe(canvas);
  }
}
