(function () {
  "use strict";

  /* =================== Filesystem =================== */
  const PROFILE = "https://github.com/StapleTT";
  const EMAIL = "staplett@pm.me";

  const FS = {
    type: "dir", children: {
      "about_me.md": { type: "file", content: `# about_me

Hi, I'm **Staple**. This is the short version.

I'm a high school student based in the United States. Most of my
time goes into cybersecurity, and I build small form factor
computers every now and then.

- role:     high school student
- focus:    cybersecurity
- also:     small form factor PC builds
- based in: United States
- my time:  {{central_time}}

Next: try \`cat projects.md\` or \`cd projects\` to dig in.` },

      "projects.md": { type: "file", content: `# projects

A few things I've been building. Run \`cd projects\` then \`ls\`
to open any of them up, or \`open <name>\` to jump to the repo.

- **spindle**: A self-hosted, centralized email client. Connect Gmail, Outlook, iCloud, Yahoo, or any IMAP/SMTP account and run them all from one interface on your own server.
- **unixscripts**: A collection of small shell scripts for Raspberry Pi and Debian-based systems, covering setup, maintenance, networking, and light security tasks.
- **pi-dotfiles**: A one-command install script that sets up a development environment on the Raspberry Pi 4, with an optional minimal Wayland desktop.
- **cyb-fedora**: Fedora 44 setup scripts that turn a fresh install into a cybersecurity lab, with quality-of-life, Wi-Fi driver, and security tooling modules.

profile → ${PROFILE}` },

      "contact.md": { type: "file", content: `# contact

Want to reach me? Here's where I am.

- email:   ${EMAIL}
- github:  ${PROFILE}

Tip: run \`open github\` to visit my profile in a new tab.` },

      ".secret": { type: "file", content: `# .secret

well, well. you ran \`ls -a\`. that's the kind of curiosity I like.

no real secrets here, just a flag for your trouble:

  flag{you_read_the_dotfiles}

since you're clearly the poke-around type, the best thing I've
built is spindle. go run \`open spindle\`.

  status: caught you ;)` },

      "projects": { type: "dir", children: {
        "spindle.md": { type: "file", content: `# spindle

[main project] A self-hosted, centralized email client. Connect
Gmail, Outlook, iCloud, Yahoo, or any standard IMAP/SMTP provider
and manage every account from a single interface running on your
own server.

Read each inbox on its own or through a unified All Inboxes view,
compose with full reply, forward, and attachment support, and
search across one account or all of them at once. Gmail and Outlook
connect through OAuth 2.0, so no passwords are stored, and every
credential and token is AES-256-GCM encrypted at rest.

It runs as a Node.js and Express server backed by SQLite, with a
framework-free HTML, CSS, and JavaScript frontend and no build
step. Registration is invite-only and managed from a built-in
admin panel.

- focus:  self-hosted email client
- stack:  Node.js, Express, SQLite, vanilla JS
- repo:   https://github.com/StapleTT/spindle

Run \`open spindle\` to view the source.` },
        "unixscripts.md": { type: "file", content: `# unixscripts

A collection of small, single-purpose shell scripts for Raspberry
Pi and other Debian-based systems. Each one handles a common setup
or maintenance task so you do not have to remember the exact
commands every time.

The set covers everyday system work alongside light networking and
security tooling: automating package updates, expanding a virtual
machine disk, setting a static IP, spinning up a quick HTTP server,
clearing logs, changing a MAC address, reading network details,
running nmap scans, vulnerability scanning, and testing connection
speed.

- focus:  shell utilities for Pi and Debian
- stack:  shell
- repo:   https://github.com/StapleTT/unixscripts

Run \`open unixscripts\` to view the source.` },
        "pi-dotfiles.md": { type: "file", content: `# pi-dotfiles

A single install script that sets up a complete development
environment on the Raspberry Pi 4, with an optional minimal
desktop.

It installs the foot terminal and sets fish as the default shell,
styled with Starship, configures Neovim with syntax highlighting,
autocomplete, and plugins, remaps Caps Lock to Escape using keyd,
and adds file icons to \`ls\` through eza. You can install the
dotfiles on their own or include an optional greetd and Sway setup
for a lean Wayland desktop and login manager.

Built for 64-bit Raspberry Pi models. Other aarch64 Debian-based
systems should generally work but may need a few adjustments.

- focus:  dotfiles and environment setup
- stack:  fish, Starship, Neovim, Sway
- repo:   https://github.com/StapleTT/pi-dotfiles

Run \`open pi-dotfiles\` to view the source.` },
        "cyb-fedora.md": { type: "file", content: `# cyb-fedora

A set of Fedora 44 setup scripts that turn a fresh install into a
ready-to-use cybersecurity lab environment.

A single installer offers three modules you can run on their own or
all at once. Quality of Life sets up fish, Neovim, Starship, a Nerd
Font, rustup, and eza. The Alfa Wi-Fi module builds the RTL8812AU
driver through DKMS, patched for the 6.x kernel. The tooling module
installs the usual security kit, including nmap, Wireshark, hydra,
sqlmap, impacket, pwntools, feroxbuster, and SecLists.

Run it as a normal user and the scripts call sudo only where they
need to.

- focus:  Fedora 44 security lab setup
- stack:  shell
- repo:   https://github.com/StapleTT/cyb-fedora

Run \`open cyb-fedora\` to view the source.` },
      } },
    }
  };

  const OPEN_MAP = {
    "github": PROFILE, "profile": PROFILE, "staple": PROFILE,
    "spindle": "https://github.com/StapleTT/spindle",
    "unixscripts": "https://github.com/StapleTT/unixscripts",
    "pi-dotfiles": "https://github.com/StapleTT/pi-dotfiles",
    "cyb-fedora": "https://github.com/StapleTT/cyb-fedora",
  };

  // figlet-style wordmark
  const STAPLE_ART =
` ____  _____  _    ____  _     _____
/ ___||_   _|/ \\  |  _ \\| |   | ____|
\\___ \\  | | / _ \\ | |_) | |   |  _|
 ___) | | |/ ___ \\|  __/| |___| |___
|____/  |_/_/   \\_\\_|   |_____|_____|`;

  // compact mark for neofetch
  const STAPLE_MARK =
`   ___
  / __|
  \\__ \\
  |___/
 staple`;

  // browser emblems for neofetch (chosen from the visitor's user-agent)
  const BROWSER_ART = {
    firefox:
`                  ..
                .....
               ........
    --   -     :........ .
   ====--=  #*#*##.:.......
  +++====---*****###-:......
 *+++---::=----***##..:::.:..
 ***++---:-=******##%::--:...
 #*****+-##*******##%::---::.
 ###*****%##****##%%+--+--:-:
  #####***#%%###%%%======-==
   ##########********++++++.
    ##################****
     +##################*
        ##############
              ==.             `,
    chrome:
`          ##########
      ##################
    ######################
   ########################
 =+########        ::::::::::
 +++#####  ********  ::::::::
+++++###  **********  ::::::::
++++++## ************ ::::::::
+++++++# ************ ::::::::
++++++++  **********  ::::::::
 ++++++++  ********  ::::::::
 ++++++++++        *:::::::::
   ++++++++********::::::::
    ++++**********::::::::
      ***********:::::::
          ******::::          `,
    safari:
`          ..........
      ..***-:****:-***..
    ..**-**++++++++**=**..
   :*****++++++++++++*#***:
  :**-*++++++++++++##%**-**:
 :**:=*+++++++++###%*++*=:**:
 :*:+**++++++.##%%%++++**+:*:
 :*****+++++..==%++++++*****:
 -#+****++..===+++++++****+#-
 %-#.****.==*+++++++*****.#-@
  --#=*.=%************:*=#-=
   @-##+=************=+##-@
     %-###*.+****+.+##*-%
       @+--+######+--+@
            @@@@@@            `,
    staple: STAPLE_MARK
  };
  function detectBrowser() {
    const ua = navigator.userAgent || "";
    if (/firefox|fxios/i.test(ua)) return "firefox";
    if (/edg/i.test(ua)) return "chrome";
    if (/chrome|chromium|crios/i.test(ua)) return "chrome";
    if (/safari/i.test(ua)) return "safari";
    return "staple";
  }
  const BROWSER_NAME = { firefox: "Firefox", chrome: "Chrome / Chromium", safari: "Safari", staple: "unknown" };

  const BOOT_TIME = Date.now();
  function centralTime() {
    try {
      return new Intl.DateTimeFormat("en-US", {
        timeZone: "America/Chicago", hour: "numeric", minute: "2-digit",
        hour12: true, timeZoneName: "short"
      }).format(new Date());
    } catch (_) { return "unavailable"; }
  }
  function uptimeStr() {
    const s = Math.floor((Date.now() - BOOT_TIME) / 1000);
    if (s < 60) return s + " sec" + (s === 1 ? "" : "s");
    const m = Math.floor(s / 60), r = s % 60;
    return m + " min" + (m === 1 ? "" : "s") + (r ? ", " + r + " sec" + (r === 1 ? "" : "s") : "");
  }

  /* =================== State =================== */
  let cwd = [];                 // path segments below ~
  const history = [];
  let histIdx = 0;

  const screen = document.getElementById("screen");
  const inputLine = document.getElementById("inputLine");
  const cmdin = document.getElementById("cmdin");
  const promptEl = document.getElementById("prompt");

  /* =================== Helpers =================== */
  function esc(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  // fake stat() metadata for `ls -l`
  function nodeSize(node) { return node.type === "dir" ? 4096 : (node.content ? node.content.length : 0); }
  function humanSize(b) {
    if (b < 1024) return b + "";
    if (b < 1048576) return (b / 1024).toFixed(1) + "K";
    return (b / 1048576).toFixed(1) + "M";
  }
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  function nodeDate(node, name) {
    const key = (name || "") + "|" + (node.content || "") + "|" + (node.type || "");
    let h = 0; for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) >>> 0;
    const m = MONTHS[h % 12], d = (h % 27) + 1;
    const hh = String(h % 24).padStart(2, "0"), mm = String((h >>> 4) % 60).padStart(2, "0");
    return { s: `${m} ${String(d).padStart(2, " ")} ${hh}:${mm}`, t: h };
  }
  function pathLabel() {
    return "~" + (cwd.length ? "/" + cwd.join("/") : "");
  }
  function promptHTML() {
    return `<span class="pu">guest</span><span class="ph">@staplett.sh</span><span class="ps">:</span><span class="pp">${pathLabel()}</span><span class="ps">$</span>`;
  }
  function refreshPrompt() { promptEl.innerHTML = promptHTML(); }

  function dirNode(segs) {
    let n = FS;
    for (const s of segs) {
      if (!n.children || !n.children[s] || n.children[s].type !== "dir") return null;
      n = n.children[s];
    }
    return n;
  }
  // resolve a path string -> {node, segs} or null
  function resolve(pathStr) {
    let segs;
    if (pathStr.startsWith("/") || pathStr.startsWith("~")) {
      segs = pathStr.replace(/^~/, "").split("/").filter(Boolean);
    } else {
      segs = cwd.concat(pathStr.split("/"));
    }
    const out = [];
    for (const s of segs) {
      if (s === "." || s === "") continue;
      if (s === "..") { out.pop(); continue; }
      out.push(s);
    }
    // walk
    let n = FS;
    for (let i = 0; i < out.length; i++) {
      const s = out[i];
      if (!n.children || !n.children[s]) return null;
      n = n.children[s];
    }
    return { node: n, segs: out };
  }

  /* =================== Markdown-lite renderer =================== */
  function inline(raw) {
    let s = esc(raw);
    const links = [];
    // [text](url)
    s = s.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, (m, t, u) => {
      links.push(`<a class="lnk" href="${u}" target="_blank" rel="noopener">${t}</a>`);
      return " " + (links.length - 1) + " ";
    });
    // bare urls
    s = s.replace(/(https?:\/\/[^\s<]+)/g, (m, u) => {
      links.push(`<a class="lnk" href="${u}" target="_blank" rel="noopener">${u}</a>`);
      return " " + (links.length - 1) + " ";
    });
    // email
    s = s.replace(/([a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,})/gi, (m, e) => {
      links.push(`<a class="lnk" href="mailto:${e}">${e}</a>`);
      return " " + (links.length - 1) + " ";
    });
    s = s.replace(/\*\*([^*]+)\*\*/g, '<span class="bold">$1</span>');
    s = s.replace(/`([^`]+)`/g, '<span class="code">$1</span>');
    s = s.replace(/ (\d+) /g, (m, i) => links[+i]);
    return s;
  }
  function renderMd(text) {
    const lines = text.split("\n");
    let html = "";
    for (const line of lines) {
      if (line.trim() === "") { html += '<div class="sp"></div>'; continue; }
      if (line.startsWith("# ")) { html += `<div class="h1">${inline(line.slice(2))}</div>`; }
      else if (line.startsWith("## ")) { html += `<div class="h2">${inline(line.slice(3))}</div>`; }
      else if (line.startsWith("- ")) { html += `<div class="li"><span class="b">- </span>${inline(line.slice(2))}</div>`; }
      else { html += `<div class="tx">${inline(line)}</div>`; }
    }
    return html;
  }

  /* =================== Output =================== */
  function print(html, cls) {
    const div = document.createElement("div");
    div.className = "block" + (cls ? " " + cls : "");
    div.innerHTML = html;
    screen.insertBefore(div, inputLine);
    screen.scrollTop = screen.scrollHeight;
  }
  function echoCommand(raw) {
    print(`<div class="echo"><span class="prompt">${promptHTML()}</span><span class="cmd">${esc(raw)}</span></div>`);
  }

  /* =================== Commands =================== */
  const COMMANDS = {
    help() {
      const rows = [
        ["help", "show this list of commands"],
        ["ls [-la] [dir]", "list files (-a all, -l long format)"],
        ["cat &lt;file&gt;", "print the contents of a file"],
        ["cd &lt;dir&gt;", "move into a directory ( .. to go up )"],
        ["pwd", "print the current directory"],
        ["open &lt;name&gt;", "open a project / profile in a new tab"],
        ["whoami", "who's asking?"],
        ["clear", "clear the screen"],
      ];
      let h = `<div class="h2">available commands</div>`;
      h += rows.map(r => `<div class="help-row"><span class="c">${r[0]}</span><span class="x">${r[1]}</span></div>`).join("");
      h += `<div class="sp"></div><div class="dim">tip: start with <span class="code">ls</span>, then <span class="code">cat about_me.md</span></div>`;
      print(h);
    },

    ls(args) {
      const flags = new Set();
      const paths = [];
      for (const a of args) {
        if (a.startsWith("-") && a.length > 1) { for (const ch of a.slice(1)) flags.add(ch); }
        else paths.push(a);
      }
      const all = flags.has("a"), long = flags.has("l"), human = flags.has("h"), one = flags.has("1");
      const target = paths[0] || ".";
      const r = resolve(target);
      if (!r) { print(`<span class="err">ls: ${esc(target)}: No such file or directory</span>`); return; }

      // entries: [displayName, node, isDotDir]
      let entries;
      if (r.node.type === "file") {
        entries = [[target.split("/").pop(), r.node, false]];
      } else {
        const kids = r.node.children;
        let names = Object.keys(kids);
        if (!all) names = names.filter(n => !n.startsWith("."));
        names.sort((a, b) => {
          const ad = kids[a].type === "dir", bd = kids[b].type === "dir";
          if (ad !== bd) return ad ? -1 : 1;
          return a.localeCompare(b);
        });
        if (flags.has("t")) names.sort((a, b) => nodeDate(kids[b], b).t - nodeDate(kids[a], a).t);
        entries = names.map(n => [n, kids[n], false]);
        if (all) entries.unshift(["..", { type: "dir" }, true], [".", r.node, true]);
        if (flags.has("r")) entries.reverse();
      }
      if (!entries.length) { print(`<span class="dim">(empty)</span>`); return; }

      if (long) {
        const sizes = entries.map(e => human ? humanSize(nodeSize(e[1])) : String(nodeSize(e[1])));
        const sw = Math.max(...sizes.map(s => s.length));
        const total = entries.reduce((s, e) => s + Math.ceil(nodeSize(e[1]) / 512), 0);
        let h = `<div class="dim">total ${total}</div>`;
        h += entries.map((e, idx) => {
          const [name, node, dot] = e;
          const isDir = node.type === "dir";
          const mode = isDir ? "drwxr-xr-x" : (name.startsWith(".") ? "-rw-------" : "-rw-r--r--");
          const nlink = isDir ? "2" : "1";
          const cls = dot ? "dot" : (isDir ? "d" : "f");
          return `<div class="lrow"><span class="lperm">${mode}</span> ${nlink} <span class="lown">guest staple</span> <span class="lsize">${sizes[idx].padStart(sw)}</span> <span class="ldate">${nodeDate(node, name).s}</span> <span class="${cls}">${esc(name)}</span></div>`;
        }).join("");
        print(`<div class="lslong">${h}</div>`);
      } else {
        const items = entries.map(e => {
          const [name, node, dot] = e;
          const cls = dot ? "dot" : (node.type === "dir" ? "d" : "f");
          return `<span class="${cls}">${esc(name)}</span>`;
        }).join("");
        print(`<div class="ls${one ? " one" : ""}">${items}</div>`);
      }
    },

    cat(args) {
      if (!args[0]) { print(`<span class="err">cat: missing file name. Try <span class="code">cat about_me.md</span></span>`); return; }
      const r = resolve(args[0]);
      if (!r) { print(`<span class="err">cat: ${esc(args[0])}: No such file or directory</span>`); return; }
      if (r.node.type === "dir") { print(`<span class="err">cat: ${esc(args[0])}: Is a directory. Try <span class="code">cd ${esc(args[0])}</span></span>`); return; }
      const content = r.node.content.replace(/\{\{central_time\}\}/g, centralTime());
      print(renderMd(content));
    },

    cd(args) {
      const target = args[0] || "~";
      if (target === "~" || target === "/" ) { cwd = []; refreshPrompt(); return; }
      const r = resolve(target);
      if (!r) { print(`<span class="err">cd: ${esc(target)}: No such file or directory</span>`); return; }
      if (r.node.type !== "dir") { print(`<span class="err">cd: ${esc(target)}: Not a directory</span>`); return; }
      cwd = r.segs; refreshPrompt();
    },

    pwd() { print(`<span class="tx">/home/staple${cwd.length ? "/" + cwd.join("/") : ""}</span>`); },

    open(args) {
      const key = (args[0] || "").toLowerCase().replace(/\.md$/, "");
      const url = OPEN_MAP[key];
      if (!url) {
        print(`<span class="err">open: don't know how to open "${esc(args[0] || "")}". Try <span class="code">open spindle</span> or <span class="code">open github</span>.</span>`);
        return;
      }
      print(`<span class="ok">→ opening ${esc(url)}</span>`);
      window.open(url, "_blank", "noopener");
    },

    whoami() {
      print(`<span class="tx">guest</span> <span class="dim">(a curious visitor). This terminal belongs to <span class="ok">staple</span>.</span>`);
    },

    banner() {
      print(`<div class="ascii">${esc(STAPLE_ART)}</div>`);
    },

    neofetch() {
      const br = detectBrowser();
      const rows = [
        ["Browser", BROWSER_NAME[br]],
        ["Shell", "bash (emulated)"],
        ["Kernel", "javascript"],
        ["Uptime", uptimeStr()],
        ["Packages", "4 (projects)"],
        ["Theme", "monochrome · #7CA1A6"],
        ["Contact", EMAIL],
      ];
      const info = rows.map(r => `<div class="row"><span class="key">${r[0].padEnd(9, " ")}</span>${inline(r[1])}</div>`).join("");
      const swatch = ["#1b1e1d", "#3a4544", "#5d7c80", "#7CA1A6", "#93b3b7", "#d6d9d8"]
        .map(c => `<i style="background:${c}"></i>`).join("");
      print(`<div class="fetch">
        <div class="logo">${esc(BROWSER_ART[br])}</div>
        <div class="info">
          <div><span class="u">guest</span><span class="sep">@</span><span class="u">staplett.sh</span></div>
          <div class="sep">-----------------</div>
          ${info}
          <div class="swatch">${swatch}</div>
        </div>
      </div>`);
    },

    sudo(args) {
      if (!args.length) { print(`<span class="err">usage: sudo &lt;command&gt;</span>`); return; }
      print(`<span class="dim">[sudo] password for guest:</span>`);
      setTimeout(() => {
        print(`<span class="err">guest is not in the sudoers file. This incident will be reported.</span>`);
        setTimeout(() => print(`<span class="dim">…just kidding. There's nothing to hide here, so explore freely with <span class="code">ls</span>. :)</span>`), 320);
      }, 450);
    },

    clear() {
      [...screen.querySelectorAll(".block")].forEach(b => b.remove());
    },

    echo(args) { print(`<span class="tx">${esc(args.join(" "))}</span>`); },
  };

  const ALIASES = { ll: "ls", dir: "ls", more: "cat", less: "cat", "?": "help", man: "help" };

  /* =================== Runner =================== */
  function run(raw) {
    const line = raw.trim();
    echoCommand(raw);
    if (line) { history.push(line); histIdx = history.length; }
    if (!line) return;
    const parts = line.split(/\s+/);
    let cmd = parts[0].toLowerCase();
    const args = parts.slice(1);
    if (ALIASES[cmd]) cmd = ALIASES[cmd];
    if (COMMANDS[cmd]) {
      COMMANDS[cmd](args);
    } else {
      print(`<span class="err">command not found: ${esc(parts[0])}.</span> <span class="dim">Type <span class="code">help</span> for a list.</span>`);
    }
    screen.scrollTop = screen.scrollHeight;
  }

  /* =================== Tab completion =================== */
  function commonPrefix(arr) {
    if (!arr.length) return "";
    let p = arr[0];
    for (const s of arr) { while (!s.startsWith(p)) p = p.slice(0, -1); }
    return p;
  }
  function complete() {
    const val = cmdin.value;
    const parts = val.split(/\s+/);
    if (parts.length < 2) {
      // complete command name
      const frag = parts[0].toLowerCase();
      const cmds = Object.keys(COMMANDS).filter(c => c.startsWith(frag));
      if (cmds.length === 1) cmdin.value = cmds[0] + " ";
      else if (cmds.length > 1) { const p = commonPrefix(cmds); if (p.length > frag.length) cmdin.value = p; }
      return;
    }
    const last = parts[parts.length - 1];
    const slash = last.lastIndexOf("/");
    const dirPart = slash >= 0 ? last.slice(0, slash + 1) : "";
    const frag = slash >= 0 ? last.slice(slash + 1) : last;
    const r = resolve(dirPart || ".");
    if (!r || r.node.type !== "dir") return;
    const matches = Object.keys(r.node.children).filter(n => n.startsWith(frag));
    if (matches.length === 1) {
      const node = r.node.children[matches[0]];
      parts[parts.length - 1] = dirPart + matches[0] + (node.type === "dir" ? "/" : "");
      cmdin.value = parts.join(" ");
    } else if (matches.length > 1) {
      const p = commonPrefix(matches);
      if (p.length > frag.length) { parts[parts.length - 1] = dirPart + p; cmdin.value = parts.join(" "); }
    }
  }

  /* =================== Input handling =================== */
  cmdin.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const v = cmdin.value;
      cmdin.value = "";
      run(v);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (histIdx > 0) { histIdx--; cmdin.value = history[histIdx] || ""; moveCaretEnd(); }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx < history.length - 1) { histIdx++; cmdin.value = history[histIdx] || ""; }
      else { histIdx = history.length; cmdin.value = ""; }
      moveCaretEnd();
    } else if (e.key === "Tab") {
      e.preventDefault();
      complete();
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      COMMANDS.clear();
    }
  });
  function moveCaretEnd() {
    requestAnimationFrame(() => { const l = cmdin.value.length; cmdin.setSelectionRange(l, l); });
  }

  // keep input focused; tapping anywhere on screen focuses it (unless selecting / link)
  document.getElementById("terminal").addEventListener("mousedown", (e) => {
    if (e.target.closest("a") || e.target.closest(".chip")) return;
    if (window.getSelection().toString()) return;
    setTimeout(() => cmdin.focus(), 0);
  });

  /* =================== Boot (systemd sequence) =================== */
  const wait = (ms) => new Promise(r => setTimeout(r, ms));
  let skipBoot = false;

  async function boot() {
    refreshPrompt();
    inputLine.style.display = "none";
    const skip = () => { skipBoot = true; };
    window.addEventListener("keydown", skip, { once: true });
    document.getElementById("terminal").addEventListener("mousedown", skip, { once: true });

    const OK = `<span style="color:#4ade80">[  OK  ]</span>`;

    const kernelMsgs = [
      `[    0.000000] Linux version 6.8.0-51-generic (buildd@lcy02-amd64-013) (x86_64-linux-gnu-gcc-13 13.2.0) #53-Ubuntu SMP PREEMPT_DYNAMIC Sat Jan 11 00:06:25 UTC 2025`,
      `[    0.000000] Command line: BOOT_IMAGE=/boot/vmlinuz-6.8.0-51-generic root=UUID=a3b4c5d6-e789-4012-abcd-ef0123456789 ro quiet`,
      `[    0.000000] BIOS-provided physical RAM map:`,
      `[    0.000000] BIOS-e820: [mem 0x0000000000000000-0x000000000009fbff] usable`,
      `[    0.000000] BIOS-e820: [mem 0x00000000000f0000-0x00000000000fffff] reserved`,
      `[    0.000000] NX (Execute Disable) protection: active`,
      `[    0.000000] SMBIOS 2.8 present.`,
      `[    0.000000] DMI: QEMU Standard PC (Q35 + ICH9, 2009), BIOS 1.16.3-debian-1.16.3-2 04/01/2014`,
      `[    0.021847] clocksource: tsc-early: mask: 0xffffffffffffffff max_cycles: 0x25f8a66f5e5`,
      `[    0.143209] AppArmor: AppArmor initialized`,
      `[    0.143561] ACPI: IRQ0 used by override.`,
      `[    0.208194] PCI: Using configuration type 1 for base access`,
      `[    0.352417] clocksource: hpet: mask: 0xffffffff max_cycles: 0xffffffff`,
      `[    0.528841] NET: Registered PF_INET6 protocol family`,
      `[    0.689233] Initializing XFRM netlink socket`,
      `[    1.023944] EXT4-fs (sda1): mounted filesystem with ordered data mode. Opts: (null)`,
      `[    1.087312] VFS: Mounted root (ext4 filesystem) readonly on device 8:1.`,
      `[    1.234891] Freeing SMP alternatives memory: 36K`,
      `[    1.456233] smpboot: Allowing 4 CPUs, 0 hotplug CPUs`,
      `[    1.712483] x86/mm: Checked W+X mappings: passed, no W+X pages found.`,
      `[    2.018934] systemd[1]: systemd 255.4-1ubuntu8.4 running in system mode`,
      `[    2.103421] systemd[1]: Detected virtualization none.`,
      `[    2.187634] systemd[1]: Detected architecture x86-64.`,
    ];

    for (const msg of kernelMsgs) {
      const m = msg.match(/^(\[[\d\s.]+\])(.*)/s);
      const ts = m ? `<span class="dim">${esc(m[1])}</span>` : "";
      const body = `<span class="tx">${esc(m ? m[2] : msg)}</span>`;
      print(ts + body);
      await wait(skipBoot ? 0 : 14);
    }

    await wait(skipBoot ? 0 : 120);

    const services = [
      { ok: false, msg: `Starting systemd-journald.service - Journal Service...` },
      { ok: true,  msg: `Started systemd-journald.service - Journal Service.` },
      { ok: false, msg: `Starting systemd-udevd.service - Rule-based Manager for Device Events and Files...` },
      { ok: true,  msg: `Started systemd-udevd.service - Rule-based Manager for Device Events and Files.` },
      { ok: false, msg: `Starting systemd-modules-load.service - Load Kernel Modules...` },
      { ok: true,  msg: `Started systemd-modules-load.service - Load Kernel Modules.` },
      { ok: false, msg: `Starting networking.service - Raise network interfaces...` },
      { ok: true,  msg: `Started networking.service - Raise network interfaces.` },
      { ok: false, msg: `Starting NetworkManager.service - Network Manager...` },
      { ok: true,  msg: `Started NetworkManager.service - Network Manager.` },
      { ok: true,  msg: `Reached target network.target - Network.` },
      { ok: true,  msg: `Reached target network-online.target - Network is Online.` },
      { ok: false, msg: `Starting ssh.service - OpenBSD Secure Shell server...` },
      { ok: true,  msg: `Started ssh.service - OpenBSD Secure Shell server.` },
      { ok: true,  msg: `Reached target multi-user.target - Multi-User System.` },
      { ok: false, msg: `Starting update-utmp-runlevel.service - Record Runlevel Change in UTMP...` },
      { ok: true,  msg: `Started update-utmp-runlevel.service - Record Runlevel Change in UTMP.` },
    ];

    for (const svc of services) {
      if (svc.ok) {
        print(`${OK} <span class="tx">${esc(svc.msg)}</span>`);
      } else {
        print(`<span class="dim">         ${esc(svc.msg)}</span>`);
      }
      await wait(skipBoot ? 0 : 60);
    }

    await wait(skipBoot ? 0 : 300);
    COMMANDS.clear();

    const now = new Date();
    const sysinfo = now.toLocaleString("en-US", {
      weekday: "short", day: "numeric", month: "short", year: "numeric",
      hour: "2-digit", minute: "2-digit", second: "2-digit",
      hour12: false, timeZoneName: "short"
    });

    const motd = [
      `Welcome to Ubuntu 24.04.2 LTS (GNU/Linux 6.8.0-51-generic x86_64)`,
      ``,
      ` * Documentation:  https://help.ubuntu.com`,
      ` * Management:     https://landscape.canonical.com`,
      ` * Support:        https://ubuntu.com/pro`,
      ``,
      ` System information as of ${sysinfo}`,
      ``,
      `  System load:  0.08              Processes:             142`,
      `  Usage of /:   14.3% of 19.52GB  Users logged in:       1`,
      `  Memory usage: 12%               IPv4 address for eth0: 10.0.2.15`,
      `  Swap usage:   0%`,
      ``,
      `Expanded Security Maintenance for Applications is not enabled.`,
      ``,
      `0 updates can be applied immediately.`,
      ``,
      `Type 'help' to see available commands.`,
      ``,
    ];

    for (const line of motd) {
      print(`<span class="tx">${esc(line) || " "}</span>`);
    }

    inputLine.style.display = "";
    cmdin.focus();
  }
  boot();
})();
