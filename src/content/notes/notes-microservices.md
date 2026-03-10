---
title: "Notes on... Microservice Architecture"
description: "Key takeaways from reading Fowler & Lewis on Microservice Architecture."
pubDate: "February 8 2026"
---

👉 Key takeaways from 
[Microservices by Martin Fowler and James Lewis](https://martinfowler.com/articles/microservices.html) 

Microservices aren’t really a new idea. The name is relatively recent, but the principles behind it go back decades. What *is* new is how viable the approach has become thanks to cloud infrastructure, automation, and better tooling.

> “Microservice Architecture” describes a way of designing software applications as suites of independently deployable services.

At its core, microservice architecture is about building a single application as a collection of small services that can be deployed and evolved independently. Each service runs in its own process, communicates through lightweight protocols, and is built around a specific business capability.

There’s no strict definition. It’s more a recurring set of patterns than a formal spec.

> There is no precise definition of this architectural style — only common characteristics.

---


## Monoliths and the friction of growth

A traditional monolith bundles UI, backend logic, and data access into a single deployable unit. For a long time, this has been the default way to build enterprise applications, and for good reasons: it’s easy to reason about, easy to run locally, and straightforward to deploy.

Problems usually don’t show up at the beginning. They appear later, when the system grows and change becomes constant.

> Change cycles are tied together — a small change requires rebuilding and redeploying the entire application.

Over time, modular boundaries blur, and scaling one part of the system often means scaling everything.

> Monolithic applications can be successful, but frustrations tend to grow as systems scale.

---

## Services as components

One of the key shifts is how componentization is done. In a monolith, components are typically libraries linked together in the same process. In microservices, components are services — out-of-process units that communicate over the network.

> A component is a unit of software that is independently replaceable and upgradeable.

This is the core idea. Not size. Not technology. Replaceability.

Services make boundaries explicit, but that comes at a cost. Network calls are slower than in-memory calls, APIs must be coarser-grained, and refactoring across service boundaries is harder.

> Remote calls are more expensive than in-process calls.

Microservices trade local simplicity for global flexibility.

---

## Organized around business capabilities

Many systems are split along technical lines: frontend teams, backend teams, database teams. This often leads to coordination-heavy workflows where even small changes turn into multi-team projects.

Conway’s Law explains why this happens:

> “Any organization that designs a system will produce a design whose structure is a copy of the organization’s communication structure.”  
> — Melvin Conway

Microservices approach this differently. Services are organized around business capabilities, not technical layers.

> Teams are cross-functional and own a service end-to-end.

---

## How “micro” is micro?

The name “microservices” unfortunately puts focus on size, which is mostly a distraction. In practice, service sizes vary widely.

> The term “microservice” leads to an unfortunate focus on how small a service should be.

What matters is whether the service boundary helps isolate change.

> If you’re debating service size, you’re probably asking the wrong question.

---

## Products, not projects

Microservices often go hand in hand with a product mindset. Instead of delivering a project and handing it off, teams own services throughout their entire lifecycle.

> “You build it, you run it.”

This changes behavior. Developers feel production issues directly, which shortens feedback loops and increases empathy for users.

---

## Smart endpoints, dumb pipes

Many earlier distributed systems invested heavily in smart infrastructure. Microservices push back on this idea.

> The microservice community favors smart endpoints and dumb pipes.

Logic lives in the services. Communication stays simple.

> “Be of the web, not behind the web.”  
> — Ian Robinson

---

## Is this just SOA again?

Microservices share a lot with earlier Service-Oriented Architecture ideas.

> Microservices are very similar to what some advocates of SOA originally intended.

But SOA became overloaded with heavy tooling, centralized governance, and slow change.

> SOA came to mean too many different things.

Microservices emerged as a more pragmatic, decentralized approach.

---

## Decentralized governance and data

Microservices avoid strict, centralized technology mandates.

> Not every problem is a nail, and not every solution is a hammer.

Each service owns its data and its model of the world.

> Microservices prefer letting each service manage its own database.

Distributed transactions are avoided in favor of eventual consistency.

---

## Automation and failure as first-class concerns

Microservices assume strong automation.

> The aim of Continuous Delivery is to make deployment boring.

Failure is not an edge case.

> Any service call can fail.

This leads to circuit breakers, timeouts, and deep monitoring.

---

## Evolution over perfection

Microservices embrace evolutionary design.

> Many services are expected to be scrapped rather than evolved.

A useful heuristic:

> If two services always change together, they probably shouldn’t be separate.

---

## Are microservices the future?

The conclusion is intentionally cautious.

> Microservices bring costs as well as benefits.

They shift complexity rather than removing it.

> Architecture decisions often reveal their consequences years later.

A common recommendation still stands:

> Start with a well-structured monolith and split it when it becomes a problem.

Microservices are not a goal. They’re a tool.


