---
title: "LLM Tooling for Developers"
description: "How Agents, Runtimes, and Coding Tools fit together — and why the terminology is messier than it looks."
pubDate: "July 29 2026"
tags: ["ai", "llm", "developer-tools"]
---

Large Language Models are increasingly wrapped in layers of tooling. Understanding what each layer does — and what people mean when they use terms loosely — helps you make better decisions about what to use and why.

## The Core Idea: LLMs Are Just the Brain

A raw LLM takes text in and returns text out. No memory, no tools, no autonomy. Everything else — the agents, the runtimes, the CLI tools — is infrastructure built around that core.

Under the hood, the model is a neural network trained on huge amounts of text to predict the next token given everything before it. It generates one token at a time, feeding each output back in as input, which is why a single call is stateless: it only "knows" what fits in the prompt you give it.

That distinction matters because people often say "the AI did X" when really a surrounding tool did X and the LLM just reasoned about it.

## Inference Runtimes: Running the Model

Before you can use an LLM, something has to load and run it efficiently on hardware.

That is what inference runtimes do.

They load the model's weights into memory (often on a GPU) and turn the raw prediction step into a usable service — handling tokenization, batching many requests together, and managing the KV cache so previously computed tokens don't have to be recomputed. Many also apply quantization, shrinking the weights to lower precision so large models can run on more modest hardware.

Examples:

- **Ollama** — runs models locally, simple CLI interface
- **vLLM** — high-throughput serving for production
- **llama.cpp** — runs quantized models on CPU

They are the engine. Everything else sits on top.

## Orchestration Frameworks: Chaining It Together

Orchestration frameworks let you build pipelines — connecting prompts, memory, retrievers, and multiple models into a coherent application.

They work by wrapping each piece — a prompt template, a model call, a retriever, a parser — in a common interface, then letting you compose those pieces into a directed flow where one step's output becomes the next step's input. This is also where patterns like retrieval-augmented generation (RAG) live: fetch relevant context first, then inject it into the prompt before calling the model.

Examples:

- **LangChain** — flexible, widely used, large ecosystem
- **LlamaIndex** — focused on retrieval and document pipelines
- **Haystack** — production-oriented, strong search integration

If a runtime is the engine, an orchestration framework is the gearbox.

## Agents: Adding Autonomy

An agent is an LLM given tools and a loop.

Instead of answering once and stopping, it takes an action, observes the result, and decides what to do next — repeating until the task is complete.

Mechanically, this works by describing the available tools to the model and asking it to emit a structured request — a function name and arguments — instead of plain prose. The harness runs that tool, feeds the result back into the context, and calls the model again, looping until the model signals it is finished.

Those tools might be:

- reading or writing files
- running terminal commands
- calling APIs
- searching the web

The key concept is the loop. Without it, it is just a prompt. With it, the model can work through multi-step tasks on its own.

## Coding Agents: Agents Specialized for Development

Coding agents are agents with access to your codebase, terminal, and git history.

They are often called "harnesses" informally — meaning they harness the LLM and give it the context and tools it needs to work with code.

What makes them "coding" agents is the specialized toolset and context management around the loop: they index or map the repository to find relevant files, expose tools for reading, editing, and running code, and feed compiler errors or test output back into the model so it can correct itself over multiple iterations.

Examples:

- **Claude Code** — Anthropic's CLI coding agent
- **Aider** — edits your codebase via git diffs
- **OpenCode** — open source terminal UI coding agent
- **Cursor** — editor built around an AI coding agent
- **GitHub Copilot agent** — integrated into pull request and editor workflows

They are not just autocomplete. They read files, plan changes, run commands, and iterate.

## The "Agent Inside an Agent" Confusion

Tools like OpenCode are themselves agents. But they also let you define agents within them — named configurations with a specific model, system prompt, and set of tools.

This is the same word at two different levels.

The outer agent is the tool itself: it has autonomy, uses tools, and loops. The inner agents are configurable profiles: a coder agent using Claude, a reviewer agent using GPT-4, a planner using Gemini.

```
OpenCode (the agent)
  └── Agent "coder"    → Claude 3.5, writes code
  └── Agent "reviewer" → GPT-4, reviews changes
  └── Agent "planner"  → Gemini, breaks down tasks
```

The industry has not settled on cleaner terminology yet. When someone says "agent," the level of abstraction they mean is usually clear from context — but worth asking about when it is not.

## The Full Stack

```
Hardware
  └── Inference Runtime            (Ollama, vLLM)
        └── LLM                   (Claude, Llama, GPT-4)
              └── Orchestration   (LangChain, LlamaIndex)
                    └── Agent     (OpenCode, Aider, Claude Code)
                          └── You
```

Evaluation and benchmarking harnesses — like EleutherAI's lm-evaluation-harness — sit outside this stack. They probe the model from the side to measure how well it performs.

## Final Thought

The terminology around LLMs is inconsistent because the field is moving faster than the vocabulary.

"Harness," "agent," and "framework" all get used loosely. What matters more is understanding the layers: what runs the model, what gives it tools, what gives it autonomy, and what specializes it for your use case.

Once you see the stack clearly, the buzzwords stop being confusing.

## Further Reading
- https://www.anthropic.com/research/building-effective-agents
- https://ollama.com/
- https://github.com/paul-gauthier/aider
- https://opencode.ai/
