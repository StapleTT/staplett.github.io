---
title: Spindle
summary: Self-hosted email client that puts Gmail, Outlook, and any IMAP/SMTP account into one keyboard-driven inbox.
stack: [TypeScript, React, Fastify, PostgreSQL, Docker]
categories: [Web, Security, Self-hosting]
order: 1
featured: true
repo: https://github.com/StapleTT/spindle
live: https://spindlemail.dev
---

## What it is

Spindle syncs every mailbox you have into one unified inbox you can drive from the keyboard. Gmail and Outlook connect natively, and anything else connects over IMAP/SMTP. You can use the hosted service or run it on your own server.

It covers the parts of an email client people actually live in: a split reader, batch triage with undo, threaded conversations, local search and saved views, pin, mute and snooze, send later, synchronized drafts, per-account signatures, and attachments.

## Why I built it

I had too many inboxes and didn't love handing all of them to one big provider's app. I wanted one fast, keyboard-first place for all of them that I could host myself. The first version was a small Express and SQLite app. This one is a full rewrite built to be safe to run for other people, not just me.

## Stack

A React frontend built with Vite, a Fastify API, and a separate pg-boss worker that owns IMAP sync (IDLE push plus polling reconciliation). PostgreSQL stores everything, and Docker Compose runs it. Signup is invite-only, and mail credentials are encrypted at rest.

## Hardest problem

Email is untrusted input from the whole internet, and an email client fetches things on the user's behalf. That makes it a great target. The hardening work was the hardest part:

- **Sandboxed email HTML.** Messages render from a separate, isolated origin, so a hostile email can't touch the app's cookies or API. Remote images are off until you allow them.
- **SSRF egress filtering.** Users can point Spindle at any IMAP or SMTP host, so outbound connections are filtered to block private and internal addresses.
- **TLS-only mail.** Connections to mail servers refuse plaintext.
- **ClamAV attachment scanning.** Outgoing files are scanned before they're sent.
