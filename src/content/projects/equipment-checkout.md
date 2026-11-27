---
title: Equipment checkout system
summary: Team project. Flask backend and admin panel for a QR-code IT equipment checkout kiosk with borrow/loan flows and transaction logging.
stack: [Python, Flask, MariaDB, Android]
categories: [Web]
order: 6
draft: true
---

## What it is

A school team project: a kiosk where people scan a QR code to borrow IT equipment. I worked on the Flask backend and the admin panel, which handle borrow and loan flows and keep a log of every transaction. An Android app runs the kiosk side.

## Why we built it

Tracking equipment on paper meant things went missing and nobody knew who had them last. A scan-to-borrow kiosk with a real log fixes that.

## Stack

Python and Flask for the API and admin panel, MariaDB for storage, and an Android app for the kiosk.

## Hardest problem

Keeping the transaction log trustworthy. Every borrow and return has to be recorded exactly once, even when a scan is repeated or the kiosk loses its connection partway through.
