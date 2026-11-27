---
title: unixscripts
summary: Setup, maintenance, networking, and light security scripts for Raspberry Pi and Debian.
stack: [Shell]
categories: [Tools & dotfiles, Security]
order: 5
repo: https://github.com/StapleTT/unixscripts
---

## What it is

A collection of small, single-purpose shell scripts for Raspberry Pi and other Debian-based systems. Each one handles a common setup or maintenance task so I don't have to remember the exact commands every time.

The set covers everyday system work alongside light networking and security tooling: automating package updates, expanding a VM disk, setting a static IP, spinning up a quick HTTP server, clearing logs, changing a MAC address, reading network details, running nmap and vulnerability scans, and testing connection speed.

## Why I built it

I kept typing the same commands on fresh Pi installs. Writing them down as scripts turned into a decent way to learn shell scripting properly.

## Stack

POSIX-ish shell and the standard Debian toolset.

## Hardest problem

Keeping scripts safe to re-run. A setup script that breaks the second time you run it isn't worth much, so each one checks the current state before changing anything.
