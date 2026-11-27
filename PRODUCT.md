# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary: employers hiring for internships and first jobs** in security, IT, and software development. They are recruiters and hiring managers who arrive from a resume, application, or GitHub link and decide in a few minutes whether this candidate has real skill. They scan quickly, open one or two projects, and look for evidence.

Secondary visitors (tech peers from GitHub, people curious about Spindle) are welcome but not the design target.

## Product Purpose

The personal portfolio of **Staple**, a high school student in a career-tech CS and cybersecurity program. It shows real, shipped projects in enough detail to prove skill, and gives visitors one safe way to reach out.

Success means a visitor does at least one of these before leaving:

- emails staplett@pm.me (often to ask for the resume)
- opens a repo and looks at real code
- visits or tries Spindle (spindlemail.dev)
- remembers "Staple" as the security and self-hosting person

It is not an online resume. The full resume goes to people directly on request and is never published.

## Positioning

**Shipped, hardened software, not tutorials.** Spindle, tack, and the homelab are real, running systems with security built in (sandboxed email HTML, SSRF egress filtering, TLS-only mail, VPN-only admin, key-only SSH). Project write-ups show what was built, why, and the hardest problem solved, which most student portfolios can't truthfully claim.

## Operating Context

- Visitors land from resumes, applications, and github.com/StapleTT. Any project must be at most two clicks from the homepage.
- Each project write-up covers: what it is, why it was built, the stack, the hardest problem, a sanitized screenshot, and repo/live links.
- Small projects (dotfiles, game mods) appear as cards linking straight to GitHub, with no detail page.
- Contact is the alias email with a copy button, the GitHub link, and "resume available on request."

## Capabilities and Constraints

- **Stack:** Astro 7 + TypeScript, plain CSS with custom properties, vanilla JS. Projects are markdown files in `src/content/projects/`.
- **Hosting:** static site on GitHub Pages at staplett.xyz, deployed by GitHub Actions. Never hosted on the homelab, so the home IP stays out of DNS.
- **Security:** strict CSP with hash-locked scripts (set in a meta tag, since GitHub Pages can't send headers), no third-party scripts, fonts, or analytics. Fonts are self-hosted.
- **Performance:** Lighthouse 95+ on mobile; animation code under about 30KB.
- **Privacy (hard constraint):** nothing may connect "Staple" to a legal name, school, town, employer, graduation year, phone, or personal email. Never publish: the resume PDF, a live local clock or timezone, real photos, unsanitized screenshots (usernames, hostnames, IPs, paths, inboxes), EXIF metadata, or homelab specifics (user counts, backup schedules, which panels sit behind the VPN). Location is "United States" at most.
- **School team projects** (equipment checkout system, network security demo) stay `draft: true` until an instructor approves publishing them.
- **Left out on purpose:** pastetype (could read as dodging copy-paste detection), plus buckshot-overlay, sheets-iframe, inferno-site, and windots (too small).

## Brand Commitments

- **Name:** Staple. Handle StapleTT on GitHub, staplett for the domain and email.
- **Tagline:** "cybersecurity, self-hosting, and tiny computers."
- **Voice:** casual and a little playful in the frame ("who's asking?", "extremely questionable"); clear, specific, and competent in project write-ups.
- **Avatar:** the illustrated avatar from GitHub (`public/avatar.webp`). No real photos, ever.
- Charcoal and warm off-white set the palette, with rose and blush accents from the avatar. Dark by default with a light mode.

## Evidence on Hand

- Project write-ups in `src/content/projects/` (drafts based on public repo READMEs; the owner should review the "why" and "hardest problem" sections).
- 17 public repos at github.com/StapleTT. hardcore-revive-plus has 2 forks and a Modrinth page.
- Spindle has a live site at spindlemail.dev.
- Avatar at `public/avatar.webp`.
- **Absent, do not fabricate:** screenshots (covers are generated patterns until sanitized images exist), SFF build specs, testimonials, employer names, metrics, awards, or user counts.

## Product Principles

1. **Proof over claims.** Every skill shown is backed by a real project, repo, or write-up.
2. **Privacy is non-negotiable.** When a detail could narrow Staple down to a real person, place, or school, it stays off.
3. **Fast to evidence.** A recruiter reaches a real project in two clicks or less; nothing important is hidden behind motion or interaction.
4. **The site is itself a project.** Its security headers, performance, and public source should hold up to scrutiny in an interview.

## Accessibility & Inclusion

- Respect `prefers-reduced-motion`: every movement becomes a fade or nothing.
- Hover effects are extras only; everything works with touch and keyboard.
- Visible focus rings, contrast at least 4.5:1, real alt text on screenshots.
- No scroll-jacking and no autoplaying sound.
