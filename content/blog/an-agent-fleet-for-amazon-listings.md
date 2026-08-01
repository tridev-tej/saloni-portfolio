---
title: "Listing Intelligence: The Agent Fleet I Built to Rewrite Amazon Listings"
excerpt: "Listing Intelligence is a Chrome extension I built: it reads an Amazon product page, sends a small fleet of Claude agents to research it, and hands back a compliant, ready-to-publish title and Item Highlights. Here's what I made, and how it works under the hood."
date: "2026-08-01"
readTime: "9 min read"
category: "Software Engineering"
tags: ["AI Engineering", "Agents", "Claude", "Chrome Extension", "Amazon"]
featured: true
emoji: "🛒"
color: "#6366f1"
image: "/images/blog/an-agent-fleet-for-amazon-listings/og.png"
---

I built a Chrome extension called **Listing Intelligence**. You open an Amazon product page, it sends a small fleet of Claude agents off to research the listing, and it hands you back a cleaned-up, compliant title and the new Item Highlights field, ready to paste back into Amazon. The whole thing runs on Claude on the backend and nothing else. Here's why I bothered, and how it actually works.

Here's the problem. As of the end of July, Amazon caps product titles at 75 characters. If yours is longer, Amazon's own AI writes you a new one and puts it live. Not a trim at the 75th character. A fresh title, generated from its ranking model and your backend keywords. And if you're not enrolled in Brand Registry, it happens with no warning at all. You find out by looking.

What actually got me was what tends to fall out in that rewrite. The specific bits. "1300mg." "Third-Party Tested." "120 count." The little details a seller spent time getting right, gone, and the seller is still the one legally on the hook for whatever ends up on the page.

The more I read about it the more it sat wrong with me. A platform edits your work, quietly, and hands you the responsibility for the result. I wanted to see if I could build something that just noticed, and then did something useful about it.

## Why it lives on the page

Most of the Amazon-AI tools I poked at do the same thing. You paste in a product ID, it thinks for a bit, and gives you a score out of a hundred. Eighty-two. Great. And then nothing. A number isn't a thing you can use, and you had to leave whatever you were doing to go get it.

So I put it where the work already happens. The extension reads the live page directly, which means it's always looking at the real, current listing, not some copy you pasted in an hour ago. You click a button and it goes.

## How it actually works

Under the hood it's a Chrome extension (Manifest V3) talking to a small Node backend. A content script scrapes the live product page — title, bullets, reviews — and hands it to the backend. The backend holds the Claude key and runs the agents, so nothing sensitive ever lives inside the extension where anyone could pull it out.

![How a run flows through the extension and the agent fleet](/images/blog/an-agent-fleet-for-amazon-listings/architecture.svg)

The part I like is that it isn't one big prompt trying to do everything. It's a few narrow agents, each with a single job.

Four of them research at the same time. Competitors, keywords, customer reviews, and the July-27 compliance rules, one agent each. They don't depend on each other, so I fire them all off together and wait for the batch. The actual fan-out is boring, which is sort of the point:

```ts
const findings = await Promise.all(
  LENSES.map((lens) => runAgent(lens, listing))
);
```

Four thirty-second calls finish in about thirty seconds instead of two minutes, because they run at the same time rather than one after another. Each one has Claude's web-search tool switched on, so the searching happens on Anthropic's side, on my key. There's no separate SEO service or scraping-for-data hiding anywhere.

A couple of decisions did most of the heavy lifting.

The first was to stop asking the model to "reply in JSON" and hope. Early on I was fishing the JSON out of the model's text with string matching, and it broke exactly when you'd expect. Now every agent is handed a schema and forced to fill it in, so it physically can't hand back a paragraph of prose that trips up the next step. That one change killed a whole category of the flaky, works-until-it-doesn't bugs.

The second was that the agents don't all run on the same model. The four researchers run on Sonnet, the cheaper and faster one. The synthesizer, the agent writing the title a seller actually pastes into Seller Central, runs on Opus, the stronger one. Cheap model for the legwork, the good model only for the output that ships. It's roughly the same instinct as not putting your best engineer on data entry.

Then a separate agent red-teams the draft before I ever see it. A model checking its own work is a soft grader; it tends to like what it just wrote. A different agent, told to find what's wrong with it, is a much harder reviewer, and it did more for the quality than any amount of prompt-fiddling on the writer.

One thing that verifier explicitly does not do is count characters. Language models are genuinely bad at counting characters, so the counts are done in plain code and handed to the model, and if the synthesizer ever writes a title over the 75-character limit, a guard shortens it in code before it ever reaches you. So the tool can't do the one thing it exists to prevent.

The whole run streams back to the panel as it happens, each agent's result appearing the moment it lands, so you watch the thing work instead of staring at a spinner.

## The parts that broke

None of it worked cleanly the first time. The search-heavy agents kept coming back with prose my parser couldn't read, until I forced the schema. The tool swore a 68-character title was 72, because I'd asked a model to count characters. And a full run sat at nearly five minutes until I swapped a heavier web-search tool for a lighter one and it dropped to about ninety seconds. Most of the fixes were obvious in hindsight. Most of these things are.

## The bit I'm not happy with

I'd rather say this than have you spot it. The keyword side is the weakest part, and it's not close.

It works by searching the web and inferring what people probably type into Amazon from the pages it reads. That's a reasonable guess. But it is a guess. It doesn't have Amazon's actual search data, the thing that tells you what people really search for and how often. The real version of this plugs into Amazon's Brand Analytics or the ads search-term reports, where that ground truth actually lives. That's the first thing I'd build next, and I know it.

## What I actually took from it

If there's one thing this left me with, it's that the model was the easy part. Almost all of the work was the stuff around it. Forcing it to return something usable. Not trusting it with things it's bad at, like counting. Being deliberate about which model does the cheap work and which does the important bit. Giving it an adversary instead of letting it grade itself.

The clever-looking part is a few lines of prompt. The part that makes it something you'd actually trust is everything else.

---
