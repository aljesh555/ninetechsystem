---
title: "Taking online payments in Nepal: eSewa, Khalti and Fonepay"
description: "What each provider is for, what the merchant accounts cost you, what integration involves, and why cash on delivery still belongs in your checkout."
date: 2026-09-25
category: "Payments"
service: { label: "Online stores", href: "/services/website#ecommerce" }
---

If you sell online in Nepal, this is the part of the project with the most moving pieces outside your control. It is worth understanding before you start, because the paperwork usually takes longer than the code.

## The three you will be asked about

**eSewa** and **Khalti** are digital wallets. Customers hold a balance or link a bank account, and pay from an app they already have. Between them they cover a large share of online payments in the country.

**Fonepay** is a network rather than a wallet: it connects to the mobile banking apps of many Nepali banks, so a customer pays directly from their bank account. It is particularly useful for customers who do not keep a wallet balance.

Most stores we build accept all three, because the cost of adding another is small once the checkout is built, and every one you leave out is a customer who has to be persuaded to use something else.

## What they cost you, and who pays

This is the part that surprises people, so it is worth being direct.

**You need your own merchant account with each provider.** It is issued to your business, and the money settles into your bank account. It cannot be shared with or borrowed from your developer.

**The providers charge their own fees.** Expect a one-time setup fee in the region of NPR 20,000 to 30,000, and a per-transaction charge of roughly one to two percent. You pay these directly to the provider, not to us, and the exact figures are theirs to set.

**Applications take time.** Providers ask for business documentation and bank details, and requirements differ between them and change from time to time. Confirm the current list with each provider and start the applications early: waiting on a merchant account while a finished store sits idle is a needless delay.

## What integration actually involves

Connecting a payment provider is not simply pasting in a key. Done properly it includes:

- The payment flow itself, on mobile as well as desktop.
- **Verification on the server.** The order is only marked paid once the provider confirms the payment to your system, not because the customer arrived back on a success page.
- Handling the unhappy paths: cancelled payments, timeouts, and the customer who closes the browser mid-payment.
- A record against every order, so your team can reconcile takings without guessing.
- End-to-end testing with real transactions before launch.

That last point matters. Test payments in a sandbox prove the code compiles, not that money arrives.

## Do not remove cash on delivery

It is tempting to treat online payment as the modern option and cash on delivery as the thing to phase out. In practice, cash on delivery still converts customers who will not pay in advance to a shop they do not yet know, and removing it costs orders.

Offer both, and let the customer choose. If cash on delivery brings problems of its own — failed deliveries, refused parcels — the answer is usually order confirmation by WhatsApp or SMS before dispatch, not removing the option.

## Refunds and disputes

Decide your refund process before launch, not at the first request. Know how each provider handles a reversal, how long it takes, and who in your team is allowed to authorise one. Write it into a refund policy on the site. Customers read it, and it prevents an argument later.

## Where we fit

We build the store, integrate all three providers, verify payments on the server, and test the whole flow end to end before you go live. We guide you through the merchant account applications, but the accounts are yours, the fees are paid by you directly to the providers, and the money settles into your account. That is how it should be.
