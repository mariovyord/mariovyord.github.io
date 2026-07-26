---
title: "Notes on... From Components to Intents: What AI Is Doing to Web Interfaces"
description: "A recap of three talks from NG Belgrade 2026 on how AI is reshaping web interfaces, from agent-friendly apps to UIs that agents compose on the fly."
pubDate: "July 29 2026"
---

I recently went to NG Belgrade 2026 and watched three talks that, taken together, told one story: the web interface is changing shape. Not disappearing, but changing.

The talks were Pawel Kozlowski's *From Components to Intents*, Mike Ryan's *Building Agents in the Browser*, and Christian Liebel's *What's New in Web?*. I've blended them into a single narrative here, because they answer the same question from different angles.

The thesis is simple: for years we shipped **components and screens**, and users had to learn our UI and click through the paths we designed. We're now moving toward a world where users **express intent** and agents assemble the experience around what the person actually wants.

That shift, from components to intents, is what these notes are about.

## The Big Shift

Today, the interaction model looks like this:

- We build components and screens.
- Users learn our layout.
- Users click through the flows we designed.

The emerging model looks like this:

- Users express an intent in plain language.
- An agent figures out how to satisfy it.
- The UI is assembled around the task, not the other way around.

The UI is becoming a conversation, and sometimes it disappears entirely. But "components to intents" is a spectrum, not a switch. Components don't die. They get **assembled differently**.

## What Is MCP?

Most of this story is built on top of a protocol, so it's worth naming it.

**MCP (Model Context Protocol)** is an open standard from Anthropic. It lets AI apps like Claude or ChatGPT securely connect to external systems, data, files, and tools.

The useful mental model: MCP is **a universal USB-C port for AI**. One standard plug, and the AI can talk to databases, files, tools, and APIs without a custom integration for each one.

Keep that plug in mind. Most of what follows is about what you can send through it.

## Agents Meet Your App

### The bureaucratic form problem

Start with a problem everyone recognizes: a government permit form. Dozens of fields, legal jargon, conditional sections. Intimidating by design.

Putting that form on a website doesn't actually fix it. It's still **not user-friendly** — the citizen still has to understand the rules and get every detail right.

Now imagine a **"public servant" built into your browser** that walks you through it. The form becomes a conversation. The agent:

- asks questions in plain language
- knows the rules
- fills the fields
- flags what's missing

That's the promise of **agentic browsing**, and it's not hypothetical.

### It's already here

Two examples made this concrete:

- **Consumer AI browsers** already ship an Assistant panel that reads the live page and summarizes it for you.
- **VS Code's built-in browser** can be shared with the Copilot agent ("Sharing with Agent"), and the chat will read the page and pull out, say, the top headline.

The agent knows the **site's** context and **your** context, asks clarifying questions, and does the tedious work: reading, comparing, clicking, filling forms.

### WebMCP: expose your app to agents

If agents are going to operate your app, you want to give them a clean way in rather than letting them guess by scraping the DOM.

**WebMCP** lets you expose your app's functionality to agents **from the page itself**, with a clear, type-safe contract. The mental model: it's like **"page objects" for agents**.

Registering a tool is small:

```js
const mcp = new WebMCP({ position: 'top-right' });
mcp.registerTool(
  'weather',
  'Get weather information',
  { location: { type: 'string' } },
  (args) => ({
    content: [{ type: 'text', text: `Weather for ${args.location}: Sunny, 22°C` }]
  })
);
```

That's the whole contract the agent reads: **name + description + typed args**.

It gets better. Your existing forms can become agent tools with just a few HTML attributes:

```html
<form toolname="book_table"
      tooldescription="Book a table for a date, time, and party size"
      toolautosubmit>
  <input name="name" toolparamdescription="Guest's full name" />
  <input type="date" name="date" toolparamdescription="Reservation date" />
  <select name="guests" toolparamdescription="Number of guests (1-6)">…</select>
  <button>Reserve</button>
</form>
```

No new backend. The page **is** the API surface.

There's a fun demo of this: `webmcp-maze.bandarra.me`. The page exposes `move` and `look` tools, and an agent reads them and plays the maze from a natural-language prompt.

Angular has docs for this already at [angular.dev/ai/webmcp](https://angular.dev/ai/webmcp). The slogan that stuck with me: **"Help agents so they can help your users."**

## Chat Is the New UI

### The app dismantles into the chat

The next idea flips the direction. Instead of an agent operating your app, your app shows up **inside the agent's chat**.

Think of chat added to Google Maps: ask, don't click. The app keeps its data and logic, but exposes it **through conversation**. Chat isn't a separate app. It's becoming a **layer on top of your existing features**.

The clearest example was **Spotify inside ChatGPT** — live playlist widgets with Preview and Play, right in the thread. Notice what happened to the app:

- The full UI is **reduced to small utility widgets**.
- It's **dismantled and used partially**, not embedded as a whole app.
- You never open Spotify. An app becomes **callable capabilities plus tiny UI pieces**.

### MCP UI: sending UI, not just data

How does UI get into the chat? **MCP UI** is the mechanism: interactive UI components delivered **over MCP**, for example rendered in an iframe.

So MCP can return **not just data, but UI**.

That raises an obvious question. If agents can *send* UI, can they *compose* it?

## Agents Build the UI

### A2UI

Yes, they can. **A2UI** is a protocol where an LLM composes **entire UIs**. UI as **generated output**, not hand-authored screens.

Alex Rickabaugh from Google put the ambition well:

> "If we could write the entire app this way, it would be LLM-personalizable."

### Interfaces that fit the moment

The value here is personalization at the level of the whole interface. Agents can build UIs that match a user's **very specific needs, right now**. Less "one-size-fits-all," more "made for this task, this person."

Same intent, different UI:

- **"Plan my trip"** for a power user → a planner with a calendar and budget.
- **"Plan my trip"** for a first-timer → a guided, step-by-step flow.

Humans stay in the loop. LLMs create apps **live, with human input**, and "human-in-the-loop" becomes a **design principle, not a fallback**. Like a magazine that reshapes itself to the reader's interests.

### Do we even need the UI?

A provocation worth sitting with: if you interact through AI, the interface can become optional. A UI can even **slow the LLM down** — sometimes the API is enough.

That's uncomfortable, but the answer isn't "UI is dead." It's that UI changes job.

## Where This Is Going

Rather than "UI is dead," the useful framing is a set of properties to design for:

- **Composable** — mix and match building blocks.
- **Adaptive** — reshape to the user and context.
- **Resilient** — degrade gracefully and recover.
- **Focused** — only what the task needs.

Novel UI patterns are emerging, the focus shifts to **user intent**, and UI building blocks still matter. Components don't disappear. They get assembled differently.

## The Browser Ships Its Own AI

One more piece makes a lot of this practical: the browser now ships a model.

The **Prompt API** is a unified JS API for browser-provided language models. The browser downloads the model and runs prompts **on-device**.

```js
const session = await LanguageModel.create();
// One-shot
const result = await session.prompt('Write me a poem.');
// Streaming
const stream = session.promptStreaming('Write an extra-long poem.');
for await (const chunk of stream) console.log(chunk);
```

Why it matters: it's **private**, **offline-capable**, and needs **no API keys or costs** for basic tasks. And it runs **in the page**. No backend.

## How We Build It

### The Industrial Revolution of software engineering

Mike Ryan framed the change in how we work with a nice analogy. We're moving from **craftsmen** detailing every line by hand to **operators of a machine** that produces code, where our job is to supply good materials for high-quality output.

This isn't "AI replaces us." Our job moves up a level, to **direction and quality**.

### Two protocols, two directions

It helps to keep the protocols straight:

- **MCP** wires **app ⇄ agent**.
- **AG-UI** wires **agent ⇄ UI**. It's an agent-to-user-interface streaming protocol, and an emerging industry standard for connecting agents to frontends.

### You don't start from scratch

Frameworks already exist:

- **CopilotKit** — an enterprise agentic frontend stack: production chat, generative UI, shared state, and human-in-the-loop across web, Slack, and Teams. It works on any AG-UI-compatible backend and uses A2UI to render UI in chat. Try it with `npx copilotkit@latest create`.
- **Hashbrown** — Mike Ryan's library, the talk's framework for building browser agents.

## Five Things to Remember

1. Interfaces are shifting **from components to intents**.
2. **WebMCP** lets agents use your app; **MCP UI** and **A2UI** let agents render and compose UI.
3. Sometimes **chat is the UI**, and sometimes **no UI** is needed.
4. The **browser now ships AI** (the Prompt API), on-device and private.
5. Building agents is a **harness plus protocols** (MCP, AG-UI), and our craft moves to **direction and quality**.

## Final Thought

None of this says the UI is dead. It says the UI is becoming something we compose rather than something we hard-code, and something users reach through intent rather than through the paths we drew for them.

For frontend developers, the practical questions are worth asking now:

- How do we **split and compose** our UIs so an agent can assemble them?
- How do we make our apps **agent-friendly** to operate?
- Where does **AI actually belong** in our UIs today?

You don't need to rewrite anything to start. Expose one form as a WebMCP tool. Name your state after business events. Try the Prompt API on a small task. Small experiments compound quickly.

## Further Reading

- [WebMCP](https://webmcp.dev/)
- [Angular WebMCP docs](https://angular.dev/ai/webmcp)
- [Model Context Protocol](https://modelcontextprotocol.io/docs/getting-started/intro)
- [AG-UI Protocol](https://github.com/ag-ui-protocol/ag-ui)
- [Chrome Prompt API](https://developer.chrome.com/docs/ai/prompt-api)
- [Hashbrown](https://hashbrown.dev/)
- [WebMCP maze demo](https://webmcp-maze.bandarra.me/)
