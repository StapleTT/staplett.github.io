---
title: tack
summary: Parsec-style browser client for Moonlight/Sunshine game streaming, paired with cork, a Sunshine fork.
stack: [Go, TypeScript, WebRTC, C]
categories: [Self-hosting, Games & mods]
order: 3
featured: true
repo: https://github.com/StapleTT/tack
---

## What it is

tack lets you stream games from your gaming PC to any browser. Open a link in Chrome or Firefox, click once, and you're streaming, with a mouse that doesn't feel laggy.

A Go bridge running on a Raspberry Pi 5 wraps `moonlight-common-c`, speaks the Moonlight protocol to Sunshine on the gaming PC, and re-serves the already-encoded stream to the browser over WebRTC. The Pi never transcodes. A small host agent runs in the Hyprland session on the gaming PC and talks to the bridge over an outbound WebSocket.

## Why I built it

Moonlight is great, but it needs a native client on every device. I wanted the Parsec experience, where any browser is a client, while keeping the stream on my own hardware. cork, my Sunshine fork, carries the host-side changes tack needs.

## Stack

Go for the bridge and host agent, cgo around `moonlight-common-c`, a TypeScript web client, and WebRTC for the browser stream. It ships as a Docker Compose setup or a native systemd service, with its own CA for local TLS and a bcrypt-hashed admin password.

## Hardest problem

Input latency. Video can tolerate a little buffering. A mouse cursor can't. Keeping the bridge from transcoding was the first step, and the rest was making the input path from the browser back to the host as short as possible.
