# Design System — Saloni Portfolio

## Product Context

- **What this is:** A personal portfolio for Saloni Dabgar, an embedded-systems engineer and writer.
- **Who it is for:** Engineering peers, hiring teams, collaborators, and readers.
- **Space:** Software engineering, automotive systems, technical writing, and personal research.
- **Project type:** Editorial portfolio with a functional workstation interface.

## Aesthetic Direction

- **Direction:** Industrial editorial workstation.
- **Decoration:** Intentional. Thin rules, image-inspector geometry, command keys, and file-path labels. No fake boot output, glowing telemetry, glass panels, or ambient effects.
- **Mood:** Precise enough for embedded engineering, warm enough for philosophy and writing.

## Typography

- **Display:** Space Grotesk, 600, for compact structural headings.
- **Editorial:** Instrument Serif for personal statements, essays, and the human counterpoint.
- **Body:** DM Sans for sustained reading.
- **Commands and data:** IBM Plex Mono for paths, controls, metadata, and tabular values.
- **Loading:** Google Fonts through the global CSS import.
- **Scale:** 12px command labels, 16px body, 18px lead copy, 36–64px section headings, 64–152px hero display.

## Color

- **Approach:** Restrained.
- **Ink:** `#0b0b0c` for the primary canvas.
- **Soft ink:** `#111113` for work surfaces.
- **Paper:** `#eee9de` for editorial contrast.
- **Paper dim:** `#bcb5a8` for supporting copy.
- **Action orange:** `#ff5a2a` on dark surfaces and `#b53612` on paper.
- **Mint:** `#66d9b7`, reserved for compatible legacy content and rare semantic use.

## Spacing

- **Base unit:** 4px.
- **Density:** Compact inside workstation controls, generous between editorial sections.
- **Scale:** 4, 8, 12, 16, 24, 32, 48, 64, 96, 144px.

## Layout

- **Approach:** Hybrid. Poster-like first viewport, strict grids for commands and work evidence, editorial reading widths for prose.
- **Grid:** One column on mobile, two-column compositions from 768–980px where content allows.
- **Maximum width:** 1180px.
- **Radius:** 2–3px. Full rounding is reserved for nothing in the core system.

## Motion

- **Approach:** Minimal and functional.
- **Duration:** 140–160ms for hover and pressed states.
- **Rule:** Motion must communicate a state change. No ambient, scroll-driven, cursor-following, or blocking animation.

## Interaction Rules

- Every control must have a real function and a 44px minimum touch target.
- Command buttons use numbered keys and literal actions, never fake status output.
- The CLI accepts typed commands and exposes the same actions as accessible buttons.
- Focus states use a 2px orange outline with a 4px offset.

## Decisions Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-08-04 | Adopt industrial editorial workstation direction | Makes Saloni's CLI preference and embedded-systems identity specific without returning to generic terminal theatrics. |
| 2026-08-04 | Index 56 skills in a functional command deck | Turns a broad skill set into searchable, structured evidence rather than a decorative logo cloud. |
