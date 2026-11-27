---
title: Homelab
summary: Proxmox server running containerized services, with a TLS reverse proxy, VPN-only admin access, and automated backups.
stack: [Proxmox VE, LXC, Docker, NGINX, WireGuard]
categories: [Self-hosting, Security]
order: 2
featured: true
---

## What it is

A Proxmox VE server at home that runs my self-hosted services in LXC containers and Docker: media streaming, network-wide DNS ad blocking, and game servers for friends.

## Why I built it

I wanted to actually run the things I was reading about instead of just reading about them. A homelab is the cheapest way to break production without anyone getting mad at you. It's also where my other projects get tested before anyone else sees them.

## Stack

- **Proxmox VE** as the hypervisor, with LXC for lightweight services and VMs when something needs its own kernel
- **Docker** inside containers for apps that ship as images
- **NGINX** as a reverse proxy, terminating TLS with Let's Encrypt certificates
- **WireGuard** for remote access
- **Pi-hole** for network-wide DNS ad blocking

## Hardest problem

Making it reachable without making it exposed. Public services sit behind the reverse proxy with TLS. Everything administrative is only reachable over the VPN, SSH is key-only, and backups run on a schedule so a bad update is an annoyance instead of a disaster. Getting all of that right without locking myself out took a few tries.
