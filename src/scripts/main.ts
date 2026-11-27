const root = document.documentElement;
const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Sticky navigation ---------- */
const nav = document.querySelector('.site-nav')!;
const onScroll = () => nav.classList.toggle('scrolled', scrollY > 8);
addEventListener('scroll', onScroll, { passive: true });
onScroll();
const syncNavHeight = () => {
  const height = nav.getBoundingClientRect().height;
  const wrapped = height > 90;
  nav.classList.toggle('wrapped', wrapped);
  root.style.setProperty('--nav-height', wrapped ? '0px' : `${height}px`);
};
syncNavHeight();
if (typeof ResizeObserver === 'function') new ResizeObserver(syncNavHeight).observe(nav);

const drawer = document.getElementById('menu')!;
if (typeof drawer.hidePopover === 'function') {
  matchMedia('(max-width: 45rem)').addEventListener('change', ({ matches }) => {
    if (!matches && drawer.matches(':popover-open')) drawer.hidePopover();
  });
}

/* ---------- Theme toggle with circular reveal ---------- */
const themeButton = document.querySelector<HTMLButtonElement>('.theme-btn')!;
const themeColor = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')!;
let requestedTheme = root.dataset.theme === 'light' ? 'light' : 'dark';
let themeTransition: ViewTransition | undefined;
const syncTheme = () => {
  themeButton.setAttribute('aria-pressed', String(root.dataset.theme === 'light'));
  themeColor.content = getComputedStyle(root).getPropertyValue('--bg').trim() || themeColor.content;
};
syncTheme();
themeButton.hidden = false;
themeButton.addEventListener('click', async (e) => {
  const next = requestedTheme = requestedTheme === 'light' ? 'dark' : 'light';
  const apply = () => {
    if (next !== requestedTheme) return;
    root.dataset.theme = next;
    syncTheme();
    try { localStorage.setItem('theme', next); } catch {}
    dispatchEvent(new Event('themechange'));
  };
  if (themeTransition) {
    themeTransition.skipTransition();
    return apply();
  }
  if (!document.startViewTransition || reducedMotion() || e.detail === 0) return apply();

  const { clientX: x, clientY: y } = e;
  const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
  root.classList.add('theme-vt');
  const transition = themeTransition = document.startViewTransition(apply);
  try {
    await transition.ready;
    root.animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
      { duration: 400, easing: 'cubic-bezier(0.2, 0.7, 0.2, 1)', pseudoElement: '::view-transition-new(root)' },
    );
  } catch {
    // A skipped transition still applies the theme.
  } finally {
    await transition.finished;
    themeTransition = undefined;
    root.classList.remove('theme-vt');
  }
});

/* ---------- Copy email ---------- */
const copyButton = document.querySelector<HTMLButtonElement>('[data-copy]');
if (copyButton && navigator.clipboard?.writeText) {
  const status = document.getElementById('copy-status')!;
  copyButton.hidden = false;
  copyButton.addEventListener('click', async () => {
    if (copyButton.hasAttribute('aria-disabled')) return;
    copyButton.setAttribute('aria-disabled', 'true');
    try {
      await navigator.clipboard.writeText(copyButton.dataset.copy!);
      copyButton.classList.add('copied');
      status.textContent = 'Email address copied.';
    } catch {
      copyButton.classList.remove('copied');
      status.textContent = 'Couldn’t copy the email address. Select it to copy it manually.';
    } finally {
      copyButton.removeAttribute('aria-disabled');
    }
  });
}

/* ---------- Ctrl/Cmd+K quick search ---------- */
type Item = { t: string; u: string; k: string; s?: string };
const dialog = document.querySelector<HTMLDialogElement>('dialog.search')!;
const canSearch = typeof dialog.showModal === 'function';
const input = dialog.querySelector('input')!;
const list = dialog.querySelector('ul')!;
const searchStatus = document.getElementById('search-status')!;
const index: Item[] = JSON.parse(document.getElementById('search-index')!.textContent!);
let selected = 0;
let options: HTMLAnchorElement[] = [];

function search(items: Item[], q: string) {
  const words = q.normalize().toLowerCase().split(/\s+/).filter(Boolean);
  if (!words.length) return items;
  return items
    .map((it) => {
      const title = it.t.normalize().toLowerCase();
      const hay = `${title} ${it.k} ${it.s ?? ''}`.normalize().toLowerCase();
      if (!words.every((w) => hay.includes(w))) return null;
      const score = words.reduce((n, w) => n + (title.startsWith(w) ? 3 : title.includes(w) ? 2 : 0), 0);
      return { it, score };
    })
    .filter((x) => x !== null)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.it);
}

function selectResult(i: number, scroll = false) {
  const option = options[i];
  if (!option) {
    input.removeAttribute('aria-activedescendant');
    return;
  }
  options[selected]?.setAttribute('aria-selected', 'false');
  option.setAttribute('aria-selected', 'true');
  input.setAttribute('aria-activedescendant', option.id);
  selected = i;
  if (scroll) option.scrollIntoView({ block: 'nearest' });
}

function render() {
  const results = search(index, input.value);
  const rows = document.createDocumentFragment();
  options = results.map((result, i) => {
    const row = document.createElement('li');
    row.setAttribute('role', 'none');
    const link = document.createElement('a');
    link.id = `search-result-${i}`;
    link.href = result.u;
    link.tabIndex = -1;
    link.setAttribute('role', 'option');
    link.setAttribute('aria-selected', 'false');
    const title = document.createElement('span');
    title.dir = 'auto';
    title.textContent = result.t;
    const meta = document.createElement('span');
    meta.className = 'search-result-meta';
    meta.dir = 'auto';
    meta.textContent = result.k;
    link.append(title, meta);
    link.addEventListener('pointerenter', () => selectResult(i));
    row.append(link);
    rows.append(row);
    return link;
  });
  list.replaceChildren(rows);
  list.scrollTop = 0;
  input.setAttribute('aria-expanded', String(results.length > 0));
  selectResult(0);
  searchStatus.textContent = results.length ? '' : 'No matches. Try a shorter search or a different term.';
}

function openSearch() {
  if (dialog.open) return;
  input.value = '';
  render();
  dialog.showModal();
  input.focus();
}

if (/Mac|iPhone|iPad/.test(navigator.platform)) document.querySelectorAll('[data-kbd]').forEach((k) => (k.textContent = '⌘K'));
if (canSearch) {
  const searchButton = document.querySelector<HTMLButtonElement>('[data-search-open]')!;
  searchButton.hidden = false;
  searchButton.addEventListener('click', openSearch);
}
input.addEventListener('input', render);
input.addEventListener('keydown', (e) => {
  if (e.isComposing) return;
  if (e.key === 'Escape') {
    e.preventDefault();
    dialog.close();
    return;
  }
  const n = options.length;
  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
    e.preventDefault();
    if (n) selectResult((selected + (e.key === 'ArrowDown' ? 1 : n - 1)) % n, true);
  } else if (e.key === 'Enter') {
    e.preventDefault();
    options[selected]?.click();
  }
});
dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });
dialog.addEventListener('close', () => {
  if (dialog.open) return;
  input.setAttribute('aria-expanded', 'false');
  input.removeAttribute('aria-activedescendant');
});

/* ---------- Global keys: search shortcut + Konami easter egg ---------- */
const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let keys: string[] = [];
addEventListener('keydown', (e) => {
  if (e.isComposing) return;
  if (canSearch && (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
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
