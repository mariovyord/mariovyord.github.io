---
title: "AI Dictionary"
description: "Plain-language definitions for common AI terms — a living glossary that grows as I learn new ones."
pubDate: "August 2 2026"
tags: ["ai", "llm", "reference"]
status: "growing"
---

A living glossary of AI terms, written the way I wish someone had explained them to me. Each entry is a quick, plain-language definition — no math, no jargon. This page will grow over time as I add new terms.

## The Basics

### AI (Artificial Intelligence)

The broad field of making machines do things that normally require human intelligence — understanding language, recognizing images, making decisions.

Think of it as an umbrella term. Almost everything you hear about in the news falls somewhere under it.

### AGI (Artificial General Intelligence)

A hypothetical AI that can do *any* intellectual task a human can — the way a person can. An AI that doesn't just ace one narrow skill (like chess or writing emails) but can reason, learn, and adapt across every domain.

Every model you can use today is **narrow AI** — great at some things, useless at others. AGI is the sci-fi-ish goalpost. No one has built it yet.

### ML Model (Machine Learning Model)

A mathematical function that learned patterns from data instead of being explicitly programmed. It's the "learned brain" — a set of numbers (weights), the strengths of its internal connections, which together encode what it learned.

- **Training:** you feed it examples (e.g., millions of labeled images) and it adjusts its weights so its predictions match reality.
- **After training:** it takes new, unseen input and produces an output — a prediction, a classification, generated text.

An LLM is one specific kind of ML model (trained on text to predict the next token). Every AI you use runs on some ML model.

### Neurons

The tiny computational units that make up a neural network. Each neuron takes a few numbers in, combines them, and passes a single number out.

Nothing like brain cells in practice — they're just simple math operations that do one thing: decide how strongly to react to their inputs. The intelligence comes from the *pattern* of millions of neurons working together, not from any single one.

### Neuron Layers

Neurons are organized into stacked groups called layers. Data flows through them one layer at a time: in the first layer, then a bunch of hidden layers in the middle, then a final output layer.

Each layer transforms the data a little — extracting slightly more abstract patterns as it goes (in an image model: edges → shapes → objects → "it's a cat"). "Deep learning" just means the network has many layers.

### Weights

The strength of the connection between two neurons. Each connection has a number saying how much of one neuron's output gets passed on to the next — high weight means it strongly influences the result, low means it barely does.

During training, the model keeps nudging these numbers until the output matches the expected answer; after training they're frozen. The learned knowledge *is* the weights — there's no separate storage. Tokens only exist at the input and output edges, so weights connect neurons, not tokens. The relationships between words (cat ≈ feline) emerge from the overall pattern of millions of weights.

### LLM (Large Language Model)

A type of AI trained on enormous amounts of text to predict the next word in a sentence. Give it a prompt, and it generates a response one word (token) at a time.

"Large" refers to the training scale. "Language" because text. "Model" because it's a mathematical function that learned patterns from data.

ChatGPT, Claude, Gemini, Llama — all LLMs.

### Multimodal

An AI that works with more than one kind of input — text, images, audio, video.

A text-only model can read your prompt but can't look at a screenshot. A multimodal model (like modern GPT and Claude versions) can understand and reason across text and images at once, which unlocks a whole category of tasks.

## How They Work

### Token

The unit of text an LLM reads and writes. A token is usually a few characters — roughly three-quarters of a word in English.

- "Hello world" → roughly 2 tokens
- A paragraph → dozens of tokens

LLMs don't see letters or words; they see token IDs. Everything about cost, speed, and context limits is measured in tokens.

### Context

Everything the model can "see" at generation time — your prompt, plus any prior turns, plus any retrieved documents.

An LLM has no memory between requests. What you send in the prompt *is* everything it knows. The **context window** is the maximum number of tokens the model can look at in one go — think of it as the model's working memory. Modern models have windows from 8K tokens (roughly a long essay) up to 1M+ (a small library of books).

### Embeddings

A way of turning text into a list of numbers (a vector) that captures its *meaning*.

The trick: similar meanings produce similar numbers. "Cat" and "feline" land close together; "cat" and "car" land far apart. This lets computers compare texts by distance instead of exact spelling.

Embeddings power search ("find stuff that means the same, not just that contains the same word"), recommendation, and RAG.

### Transformer

The architecture behind virtually every modern LLM, introduced in the 2017 paper *Attention Is All You Need*.

Its key trick is **attention**: the model figures out which words in the input matter most for the word it's currently generating. Because it can weigh every word against every other word at once, it handles long-range connections (a pronoun linking back to a name ten sentences earlier) far better than older architectures.

### Inference

The act of running a trained model to produce an output — i.e., asking it a question and getting an answer.

Training (expensive, done once, in a data center) vs. inference (cheap, done millions of times) is the fundamental split in how AI systems cost money.

### Training

Teaching a model its core skill: showing it enormous amounts of text and nudging its internal numbers (parameters) until it reliably predicts what comes next.

It's the one-time, expensive phase that happens in a data center. Everything you use afterwards — the everyday asking-and-answering — is **inference** (above). **Fine-tuning** (later on this page) is a small, cheaper second round of training on your own data.

### Hallucination

When a model confidently generates something that isn't true — a made-up fact, a fake citation, a plausible-but-wrong answer.

It's not "lying." The model is just predicting the most likely next token, and fluency isn't the same as accuracy — it has no ground truth to check against. That's why you should verify important outputs, and why grounding techniques like RAG exist.

### Sampling Parameters

The dials that control *how* the model picks the next token. A model doesn't just pick the most likely word every time — it samples from a probability distribution over all possible next tokens.

Tweak these dials and the same prompt produces different vibes: more creative, more repetitive, more rigid. The common ones — Temperature, Top-K, and Top-P — each get their own entry under **Controlling Output**.

## Getting Better Answers

### Prompt Engineering

The craft of writing prompts that reliably get the output you want.

It's not magic incantations — it's being specific: give the model a role, state constraints, give examples, ask for structured output, break big requests into steps. Same model, better prompt, dramatically better result.

### System Prompt

The hidden instructions at the top of a conversation that set the model's behavior — its role, rules, and tone — before any user message arrives.

While the user prompt is the thing you ask, the system prompt is the standing job description: "You are a helpful assistant. Always cite sources. Keep answers under 200 words." Apps build their personas and guardrails here, and a lot of "bad prompt" problems are really system-prompt problems.

### Context Engineering

The newer, bigger sibling of prompt engineering. Prompt engineering treats the prompt as a fixed thing you write well. Context engineering treats the *entire context* — what to include, what to exclude, what order to put it in, what tools and data to give the model — as something you design deliberately.

It's the difference between "write a good question" and "design what the model gets to see." RAG, memory, and tool selection are all context engineering.

### RAG (Retrieval-Augmented Generation)

A technique for giving an LLM information it wasn't trained on, at query time.

1. You have a pile of documents (your wiki, your codebase).
2. When someone asks a question, you search that pile for the most relevant chunks.
3. You stuff those chunks into the prompt alongside the question.
4. The model answers using that context.

This lets an LLM answer questions about *your* data without retraining, and it's cheap to update — just change the documents, no model changes needed.

### Vector DB (Vector Database)

A database optimized for storing and searching embeddings.

Normal databases find rows that *match* a value. Vector DBs find entries that are *closest in meaning* — by comparing embedding distance. That's what makes semantic search possible.

It's the search engine half of RAG: documents get embedded and stored, and at query time the vector DB returns the most relevant chunks to feed the model.

### Fine-tuning

Taking a pre-trained model and training it a bit more on your own data to make it better at a specific task or match a specific style.

Think of the base model as a generally skilled writer. Fine-tuning is a short apprenticeship on your company's docs so it writes like your team.

It's expensive compared to prompt engineering or RAG, but it changes the model's actual behavior rather than just borrowing context at query time.

### Agent

An LLM wrapped in a loop: given a goal, it plans, calls tools (search, code, APIs), observes the result, and iterates until it's done — instead of answering once and stopping.

Where a plain chatbot gives you an answer, an agent acts on it. The hard parts are keeping it on track, giving it tools it can use well, and only trusting it as far as you can verify the output. It's the current frontier of LLM apps.

## Controlling Output

### Temperature

The most famous sampling dial. It controls randomness.

- **Low (near 0):** the model picks the most likely tokens almost every time — deterministic, consistent, boring. Great for code, math, facts.
- **High (near 1, or above where the API allows):** the model picks from a wider pool of unlikely tokens — creative, varied, sometimes nonsense. Great for brainstorming, story ideas, fun.

Tune it per task. You almost never want it maxed out.

### Top-K

A filter that limits the model to the **K most likely** next tokens before it picks. Set Top-K to 50 and the model can only choose among the 50 most probable options, ignoring the long tail.

Lower K → more focused, less surprising. Higher K → more diverse.

### Top-P (Nucleus Sampling)

Like Top-K, but smarter: it keeps adding tokens from the most-likely-first list until their combined probability crosses a threshold P.

- Top-P of 0.9 → the model considers just enough tokens to cover 90% of the probability mass.
- The cutoff adapts to the situation — sometimes that's 10 tokens, sometimes 500.

Think of Top-K as "top K options, no matter what" and Top-P as "enough options to reach P% of the distribution."

### Repetition Penalty

A dial that discourages the model from repeating itself.

When the model picks a token it has already used, the penalty reduces its probability of being chosen again. Higher penalty → less repetition, but also risk of derailing the model into incoherent tangents. Lower penalty → more natural flow, but a higher chance of getting stuck in a loop.

Useful when generating long outputs where models tend to fall into repetitive patterns.
