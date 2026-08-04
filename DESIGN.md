# Design System — Saloni OS

## Product Context

- **What this is:** Saloni Dabgar's personal portfolio presented as a working computer environment.
- **Who it is for:** Engineering peers, hiring teams, collaborators, and readers.
- **Space:** Embedded systems, automotive software, product engineering, technical writing, and personal research.
- **Project type:** Interactive portfolio desktop with document-style deep pages.

## Aesthetic Direction

- **Direction:** Retro-modern operating system.
- **Decoration:** Expressive but functional. Every desktop icon, dock item, window control, search result, and terminal command performs a real action.
- **Mood:** Opening the portfolio should feel like waking a carefully maintained personal computer: immediate, tactile, information-rich, and distinctly Saloni.
- **Material:** Solid color, hard edges, offset shadows, warm utility surfaces, visible file structure. No glassmorphism, glow haze, fake telemetry, or decorative terminal noise.

## Typography

- **Display:** Space Grotesk, 600–700, for identity and application headings.
- **Editorial:** Instrument Serif for personal statements and essays.
- **Body:** DM Sans for sustained reading.
- **System UI and code:** IBM Plex Mono for paths, status bars, controls, terminal output, and tabular values.
- **Loading:** Google Fonts through the global CSS import.
- **Scale:** 10px status text, 11–12px system labels, 14–16px interface copy, 22–40px application headings, 56–108px identity display.

## Color

- **Approach:** Expressive, with color assigned to operating-system roles.
- **Desktop teal:** `#14343d` for the wallpaper and spatial canvas.
- **Deep teal:** `#0e252c` for depth and desktop icon contrast.
- **Warm paper:** `#f2efe5` for application windows.
- **Window chrome:** `#d4d1c6` for inactive controls and status bars.
- **System ink:** `#141413` for structure and primary text.
- **Action orange:** `#ff5a2a` for selection, launch actions, and identity.
- **Active acid:** `#c8ff42` for focused window chrome, boot progress, and keyboard focus.

## Spacing

- **Base unit:** 4px.
- **Density:** Compact system chrome, comfortable application content.
- **Scale:** 4, 8, 12, 16, 20, 24, 32, 48, 64px.

## Layout

- **Approach:** Spatial desktop on large screens, single-window application shell on phones.
- **Desktop:** 48px system bar, floating overlapping windows, left-aligned desktop shortcuts, bottom application dock.
- **Mobile:** Horizontal shortcut tray, one active full-screen window, scrollable bottom dock.
- **Window radius:** 8px on the title edge and 3px on the lower edge. Internal controls remain square.
- **Shadows:** Hard offset shadows only. No blurred ambient shadows.

## Motion

- **Approach:** Intentional.
- **Startup:** A skippable 1.05-second boot transition, reduced to 80ms when reduced motion is requested.
- **Window movement:** Direct pointer tracking without inertial animation.
- **State changes:** 120–180ms for focus, dock, and button feedback.
- **Rule:** Motion explains state. Nothing loops or moves without input.

## Interaction Rules

- The home page must behave like a computer, not merely borrow computer vocabulary.
- Desktop icons, the dock, the menu bar, Spotlight-style search, and Terminal must open real content.
- Windows support focus ordering, drag, minimize, maximize, close, and restore.
- `Cmd/Ctrl + K` opens application search and `Escape` closes it.
- Terminal commands and numbered buttons remain equivalent accessible paths.
- Every visible action has at least a 44px touch target in each reachable state.
- Deep portfolio routes stay conventional and readable. The operating-system metaphor ends where long-form reading begins.
- No colored left-border cards, all-caps tracked labels, glowing status dots, radial glow backgrounds, or non-functional UI theatre.

## Decisions Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-08-04 | Create an industrial editorial workstation | Established a CLI-first identity and structured 56-skill index. |
| 2026-08-05 | Replace the long landing page with Saloni OS | The previous design looked computer-themed but still behaved like a brochure. The desktop makes the interaction model itself the identity. |
| 2026-08-05 | Preserve editorial deep pages | Projects, experience, writing, and books need uninterrupted reading after discovery. |
