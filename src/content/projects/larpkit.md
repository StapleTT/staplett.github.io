---
title: LARPkit
summary: Scripts for testing local network conditions at the ARP level in authorized lab environments.
stack: [Bash, Python, nmap, iproute2]
categories: [Security, Tools & dotfiles]
order: 4
repo: https://github.com/StapleTT/LARPkit
---

## What it is

LARPkit (Local ARP kit) is a small, dependency-light toolkit for authorized layer-2 testing on a LAN you own or have written permission to test. It has two scripts:

- **`larp-scan.sh`** finds live hosts on the local subnet and prints them in a pipeline-friendly format.
- **`larp-blackhole.sh`** reversibly cuts chosen hosts off the network with a scoped ARP blackhole, then restores every cache it touched when you stop it.

## Why I built it

Reading about ARP spoofing is one thing. Watching a lab machine lose its gateway, and then come back cleanly, teaches you a lot more about how fragile layer 2 is and why defenses like dynamic ARP inspection exist.

## Stack

Bash 4+ and iproute2 for the logic, Python's standard library for the raw ARP socket, and nmap for discovery. No other dependencies.

## Hardest problem

Making it safe to stop. The blackhole has to put every ARP cache back exactly how it found it, even on Ctrl+C. It also avoids targeting hosts with an active SSH session by default, so you don't cut off your own access, and it can track hosts that change IP to dodge the test.
