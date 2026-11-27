const root = document.documentElement;
const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Nav shrink on scroll ---------- */
const nav = document.querySelector('.site-nav')!;
const onScroll = () => nav.classList.toggle('scrolled', scrollY > 8);
addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ---------- Theme toggle with circular reveal ---------- */
document.querySelector<HTMLButtonElement>('.theme-btn')!.addEventListener('click', async (e) => {
  const next = root.dataset.theme === 'light' ? 'dark' : 'light';
  const apply = () => {
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch {}
    dispatchEvent(new Event('themechange'));
  };
  if (!document.startViewTransition || reducedMotion()) return apply();

  const { clientX: x, clientY: y } = e;
  const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
  root.classList.add('theme-vt');
  const t = document.startViewTransition(apply);
  t.finished.finally(() => root.classList.remove('theme-vt'));
  await t.ready;
  root.animate(
    { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
    { duration: 400, easing: 'cubic-bezier(0.2, 0.7, 0.2, 1)', pseudoElement: '::view-transition-new(root)' },
  );
});

/* ---------- Copy email ---------- */
document.querySelectorAll<HTMLButtonElement>('[data-copy]').forEach((btn) => {
  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(btn.dataset.copy!);
    } catch {
      return; // clipboard blocked: the address is still visible and selectable
    }
    btn.classList.add('copied');
    btn.setAttribute('aria-label', 'Copied');
    setTimeout(() => { btn.classList.remove('copied'); btn.setAttribute('aria-label', 'Copy email address'); }, 2000);
  });
});

/* ---------- Ctrl/Cmd+K quick search ---------- */
type Item = { t: string; u: string; k: string; s?: string };
const dialog = document.querySelector<HTMLDialogElement>('dialog.search')!;
const input = dialog.querySelector('input')!;
const list = dialog.querySelector('ul')!;
const index: Item[] = JSON.parse(document.getElementById('search-index')!.textContent!);
let selected = 0;

function search(items: Item[], q: string) {
  const words = q.toLowerCase().split(/\s+/).filter(Boolean);
  if (!words.length) return items;
  return items
    .map((it) => {
      const title = it.t.toLowerCase();
      const hay = `${title} ${it.k} ${it.s ?? ''}`.toLowerCase();
      if (!words.every((w) => hay.includes(w))) return null;
      const score = words.reduce((n, w) => n + (title.startsWith(w) ? 3 : title.includes(w) ? 2 : 0), 0);
      return { it, score };
    })
    .filter((x) => x !== null)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.it);
}

function render() {
  const results = search(index, input.value);
  selected = Math.min(selected, Math.max(results.length - 1, 0));
  list.replaceChildren(
    ...results.map((r, i) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = r.u;
      a.setAttribute('role', 'option');
      a.setAttribute('aria-selected', String(i === selected));
      a.textContent = r.t;
      const meta = document.createElement('span');
      meta.textContent = r.k;
      a.append(meta);
      a.addEventListener('pointermove', () => { if (selected !== i) { selected = i; render(); } });
      li.append(a);
      return li;
    }),
  );
  if (!results.length) {
    const li = document.createElement('li');
    li.className = 'empty';
    li.textContent = 'Nothing matches that.';
    list.append(li);
  }
  list.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' });
}

function openSearch() {
  if (dialog.open) return;
  input.value = '';
  selected = 0;
  render();
  dialog.showModal();
  input.focus();
}

if (/Mac|iPhone|iPad/.test(navigator.platform)) document.querySelectorAll('[data-kbd]').forEach((k) => (k.textContent = '⌘K'));
document.querySelectorAll('[data-search-open]').forEach((b) => b.addEventListener('click', openSearch));
input.addEventListener('input', () => { selected = 0; render(); });
input.addEventListener('keydown', (e) => {
  const n = list.querySelectorAll('[role="option"]').length;
  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
    e.preventDefault();
    if (n) { selected = (selected + (e.key === 'ArrowDown' ? 1 : n - 1)) % n; render(); }
  } else if (e.key === 'Enter') {
    e.preventDefault();
    list.querySelector<HTMLAnchorElement>('[aria-selected="true"]')?.click();
  }
});
dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });

/* ---------- Global keys: search shortcut + Konami easter egg ---------- */
const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let keys: string[] = [];
addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    dialog.open ? dialog.close() : openSearch();
    return;
  }
  const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
  keys = [...keys, key].slice(-konami.length);
  if (keys.join() !== konami.join()) return;
  keys = [];
  root.classList.add('konami');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.setAttribute('role', 'status');
  toast.textContent = 'flag{up_up_down_down} · you found it';
  document.body.append(toast);
  setTimeout(() => { toast.remove(); root.classList.remove('konami'); }, 3000);
});
