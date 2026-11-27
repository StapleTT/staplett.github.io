---
title: Network security demo
summary: Team project. Visitors log into a fake admin panel, then watch their unencrypted traffic get captured, plus a DoS demo.
stack: [Python, Flask, Bash, TShark]
categories: [Security, Web]
order: 7
draft: true
---

## What it is

A school team project built to show people why encryption matters. Visitors log into a fake admin panel over plain HTTP, then watch their own username and password show up in a live packet capture. A second part demonstrates a denial-of-service attack against a lab target.

## Why we built it

"Use HTTPS" is easy to ignore until you see your own password scroll past on someone else's screen.

## Stack

A Flask app for the fake admin panel, TShark for capture, and Bash to glue the capture and display together. Everything runs on an isolated lab network.

## Hardest problem

Making the capture readable for non-technical visitors in real time: filtering the noise down to the one request that matters and showing it while they're still standing there.
