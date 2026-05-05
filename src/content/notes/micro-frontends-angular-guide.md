# How to Work with Micro-Frontends in Angular Without Losing Your Mind

Micro-frontends (MFEs) sound great in theory: independent teams, independent deployments, scalable architecture. In practice? They can quickly turn into a distributed nightmare if you approach them with the wrong mental model.

Here are some hard-earned rules to keep your sanity intact.



## 1. MFEs Are *Not* Microservices

Let’s get this straight early.

Microservices talk over APIs. Clean boundaries. Network calls. Life is good.

MFEs? You’re literally pulling someone else’s **source code into your runtime** and executing it inside your app.

This is not “separate systems talking.”  
This is a **distributed frontend** pretending to be separate.

Which means:
- Shared runtime issues
- Dependency conflicts
- Styling chaos
- Build/runtime coupling

Treat it like microservices and you *will* suffer.



## 2. Share UI (or Suffer CSS Hell)

CSS encapsulation sounds nice until it doesn’t.

There is no perfect solution here. Shadow DOM helps… until it doesn’t. Global styles help… until they break something else.

Your best bet:
- Pick a **UI library early**
- **Lock the version**
- Share it across MFEs

If each MFE brings its own UI stack… congratulations, you’ve built a design system horror show.



## 3. Match Angular Versions

Yes, you *can* run different Angular versions via Web Components.

No, you probably shouldn’t.

You lose:
- Dependency sharing
- Performance optimizations
- Simplicity

And suddenly simple things become complex:
- Passing auth tokens
- Sharing services
- Coordinating state

Unless you *really* need isolation, just **align Angular versions** and move on.



## 4. It’s Not “App Inside App”

One of the biggest mistakes.

This is not:
> “Let’s embed App B into App A”

This is:
> “We are building one platform with multiple domains”

Think:
- **Shell (host)** → auth, layout, routing, language
- **MFEs** → business domains

If you treat MFEs like separate apps glued together, you’ll end up debugging routing, state, and lifecycle issues for weeks.



## 5. Static Assets Will Betray You

Images, fonts, icons… they *will* break.

If you don’t plan this:
- Relative paths explode
- Builds become fragile
- Environments behave differently

Solution:
Serve assets from a **CDN**

Otherwise, enjoy rewriting paths into absolute URLs and questioning your life choices.



## 6. Share Dependencies (Seriously)

Yes, isolation sounds nice.

No, duplicating Angular, RxJS, UI libs, etc. across MFEs is not “clean architecture.”

It’s:
- Bigger bundles
- Runtime conflicts
- Subtle bugs

**Share dependencies** and keep versions aligned within a sane range.

Encapsulation is possible… but painful. Very painful.



## 7. Use a Monorepo

Just do it.

**Nx + Module Federation** will save you from:
- Version drift
- Dependency chaos
- “Why does it work locally but not in prod?”

Without a monorepo, debugging MFEs becomes a full-time job.



## 8. Don’t Overengineer It

There’s a point where you think:
> “I’ll do something smarter than existing solutions”

You won’t.

Or you will… and then:
- Write patches for libraries
- Add hacks on top of hacks
- Eventually reinvent what already exists

Read Manfred Steyer’s work. Follow it. Move on with your life.



## 9. Use Domain-Driven Design

MFEs should map to **business domains**, not technical slices.

Good:
- Orders
- Payments
- User Management

Bad:
- Header MFE
- Button MFE
- Table MFE (yes, people do this)

Domains give you natural boundaries. Everything else gives you pain.



## 10. Don’t Go Too Small (or Too Shared)

Tiny MFEs sound flexible… until they aren’t.

You’ll end up with:
- Dozens of deployments
- Tight coupling
- A distributed monolith tangled in its own… черва

Also:
- Too many shared libs = hidden dependencies = slower development

Aim for:
👉 **Independent, meaningful domains**  
Not LEGO pieces.



## Final Thought

Micro-frontends are powerful—but they are not magic.

If you treat them like:
- microservices → you’ll misjudge the complexity  
- independent apps → you’ll fight integration forever  

Treat them like:
**One system, split by domain, sharing a runtime**

And maybe—just maybe—you’ll keep your sanity.
