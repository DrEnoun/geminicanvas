# GEMINI CANVAS FOR GOOGLE CHAMPION
## Master Project Source and GitHub Development Brief

**Workshop:** From Idea to Interactive Learning: Gemini Canvas for Educators  
**Promise:** Turn your teaching idea into an interactive learning experience — without coding  
**Format:** 3-hour Training of Trainers workshop + deployable GitHub Pages interactive site  
**Status:** Active development

## Purpose

This file is the **living source of truth** for the project. Update it whenever the workshop architecture, scientific interactions, UI/UX direction, deployment setup, or development rules change.

The website is an **interactive teaching experience**, not a PowerPoint converted to HTML. Meaningful learner interaction takes priority over decorative movement of headings, cards, or slide text.

## Core identity

Gemini Canvas is the hero. NotebookLM, prompting frameworks, Gems, and related tools support the workflow without competing with Canvas.

**Prompt → Build → Test → Refine → Teach**

Workshop journey:

**SPARK → GROUND → BUILD → REFINE → TRANSFORM → CREATE → SHARE**

Visual personality: **scientific maker-lab + friendly educator workshop**.

## Participant outcome

Every participant should leave with a **Canvas Teaching Prototype** that can function as an interactive learning tool, mini learning webpage, or teaching innovation prototype.

The participant should understand the design pattern well enough to adapt it to another topic or discipline.

## Training philosophy

Target balance: approximately **30% explanation / 70% hands-on**.

**Watch me → Build with me → Modify with me → Build your own → Teach someone else**

Training of Trainers progression:

**I do → We do → You do → You teach**

Near the end, deliberately switch:

**LEARNER MODE → TRAINER MODE**

## Three-hour architecture

### Wave 1 — Learn Together — 90 min
- SPARK — 10 min
- GROUND — 15 min
- BUILD — 40 min
- REFINE — 25 min

### Break — 10 min

### Wave 2 — Apply and Teach — 80 min
- TRANSFORM — 20 min
- CREATE — 35 min
- TEST & SHARE — 25 min

## Opening learning experience

Open with a **static-to-interactive VSEPR transformation**. Static teaching material is not presented as bad; interactivity adds another layer to learning.

Use CH4, NH3, and H2O. All have four electron domains around the central atom and tetrahedral electron-domain geometry, while their molecular geometries differ:

- CH4 — tetrahedral — about 109.5°
- NH3 — trigonal pyramidal — about 107°
- H2O — bent — about 104.5°

Opening question:

> Same central electron-domain arrangement — why do these molecules not have the same molecular shape?

Flow:

**Predict → static reveal → interactive molecule → debrief**

Key debrief:

> **The content did not change. The learning experience did.**

## VSEPR interactive molecular experience

The molecule itself must move and respond to the learner. Decorative slide animation is not a substitute for molecular interaction.

### Minimum requirements

- mouse-drag rotation;
- touch/swipe rotation;
- inspect structures from different orientations;
- pause/resume automatic rotation;
- reset view;
- switch CH4 / NH3 / H2O;
- show molecular geometry;
- show AXE notation;
- show approximate bond angle;
- show/hide lone-pair electron domains where relevant.

Scientific representation must preserve the distinction between electron-domain geometry, molecular geometry, bonding domains, lone-pair domains, and approximate bond angles.

### Desired enhancements

- bond-angle arcs;
- atom labels;
- electron-domain overlays;
- lone-pair toggles;
- guided prediction mode;
- student construction mode;
- geometry comparison;
- feedback after incorrect predictions;
- additional molecules such as CO2, BF3, PCl5, SF6, SF4, ClF3, XeF2, and XeF4;
- optional challenge/game mode.

## Progressive VSEPR build

Do not try to create the perfect app in one prompt.

**Version 1:** Predict → Explore → Check → Feedback  
**Version 2:** improve interface, explanation, accessibility, and feedback  
**Version 3:** add meaningful molecular manipulation  
**Version 4:** red-team, verify, and peer-test

## Responsible AI

Embed verification throughout:

**BUILD → TEST → BREAK → VERIFY → PEER REVIEW → REFINE**

Key principle:

> **AI output is a prototype, not an authority.**

For VSEPR, verify electron-domain geometry, molecular geometry, lone-pair representation, AXE notation, bond angles, explanations, and feedback.

Peer review should identify at least one factual/pedagogical issue and one usability issue.

## GROUND phase

A shared participant-ready VSEPR source pack is stored at `assets/vsepr-participant-input-pack.md`.

The **locked participant workflow** is:

**Download VSEPR source pack → create a NotebookLM notebook → add the pack as a NotebookLM source → open Gemini Canvas → add the NotebookLM notebook through Add files → Notebooks → build from the grounded notebook.**

Do not instruct participants to bypass NotebookLM by copying the source pack directly into Canvas. The source-pack drawer may preview the content, but its primary action is **Download source pack**.

NotebookLM is a short grounding stage, around 10–15 minutes, before the Canvas build.

> **Before Canvas builds, give it reliable content.**

Everyone starts with the same VSEPR source in NotebookLM. Participants use their own disciplinary sources later during CREATE.

**Common source → NotebookLM grounding → Gemini Canvas build → shared success → independent transfer**

## Chat vs Canvas

**Gemini Chat:** Ask → Answer  
**Gemini Canvas:** Ask → Build → Preview → Interact → Refine

Follow immediately with a live demonstration.

Use screenshots mainly for navigation guidance. Use stylised workflow visuals for concepts. The live browser demonstration remains the main interface experience.

## Pedagogical planning

Do not dedicate a major hands-on block to lesson plans and rubrics. Integrate pedagogical planning into the build.

Example:

> Define one measurable learning outcome for this VSEPR microlearning activity and design a short formative check aligned to it.

Detailed lesson-plan and rubric examples belong in the trainer toolkit/appendix.

## TRANSFORM — Stoichiometry

Repurpose the learning design from conceptual/spatial VSEPR to procedural/quantitative Stoichiometry.

Main reaction:

**2Mg + O2 → 2MgO**

Example:

> If 6.0 g Mg reacts completely with excess oxygen, what mass of MgO is formed?

The tutor should scaffold:

**Balanced equation → Given → Moles → Mole ratio → Required quantity → Units → Final answer → Feedback**

Principle:

> **Don't ask Canvas merely to build a calculator. Ask it to scaffold the thinking.**

TRANSFORM must include a guided build sequence comparable to the VSEPR hands-on rather than only showing a finished tutor. The locked sequence is:

**New Canvas → starter tutor prompt → preview → test a wrong answer → follow-up 1: scaffold/retry → follow-up 2: make reasoning path visible → follow-up 3: classroom/mobile refinement → test → compare with working tutor.**

This is a short transfer exercise using the fixed trainer-provided Mg → MgO problem, so participants do not create a second NotebookLM notebook for this demonstration. When they move to their own discipline/material in CREATE, they return to the grounded NotebookLM → Canvas workflow using the Prompt Generator Wizard.

Using the workshop molar masses Mg = 24.3 g mol-1 and MgO = 40.3 g mol-1, 6.0 g Mg gives about 9.95 g MgO before final significant-figure treatment.

Secondary example:

**CaCO3 → CaO + CO2**

## CREATE — multidisciplinary transfer

Chemistry is the demonstration case, not the workshop identity.

> **Same workflow. Different disciplines.**

Possible transfer examples:

- Engineering — material balance, unit conversion, process reasoning
- Medical Laboratory Technology — dilution/concentration learning
- Environmental Science — pollutant calculations and sustainability scenarios
- Physiotherapy — anatomy and movement classification
- Nursing — non-patient-specific educational pathways/calculation practice
- Pharmacy — dosage calculations, formulation, pharmaceutical science, chemistry, pharmacology

Health-related prototypes remain educational and should not make real patient-specific clinical decisions.

## Participant Prompt Generator Wizard

Near the end of CREATE, include an in-deck **Prompt Generator Wizard** so participants can rapidly transfer the workflow to their own teaching material.

The wizard collects four essential inputs:
- what they want to create;
- topic / teaching focus;
- learner group;
- learning outcome.

The creation-type menu should include Quiz, Interactive slides, Interactive visualization, Concept explorer, Guided problem-solving tutor, Simulation, Decision tree/scenario activity, Microlearning webpage, Flashcards/study aid, Infographic, Slide deck, and **Other** with a free-text field.

Optional refinements may include the current teaching challenge, time available, preferred learner interaction, feedback style, output language, approximate output size, a source to prioritise, and an open **Anything else?** field.

The wizard does **not** replace NotebookLM. Its output is a copy-ready prompt for NotebookLM. That prompt tells NotebookLM to ground the design in the participant's uploaded sources, identify source gaps instead of inventing unsupported subject content, propose a learning flow, and produce one self-contained **Canvas-ready prompt**.

Locked transfer workflow:

**Upload own teaching sources to NotebookLM + complete Prompt Generator Wizard → paste generated prompt into NotebookLM → grounded design + Canvas-ready prompt → Gemini Canvas → prototype → test → refine**

The wizard should be general enough for multiple disciplines and should not require participants to understand prompt engineering.

## Peer review and showcase

Quick review criteria:

**Accurate · Clear · Interactive · Student-friendly · Reusable**

Participants build individually, then pair-test and make a real revision.

Showcase: about 60–90 seconds, maximum around 2 minutes.

**Problem → Build → one meaningful interaction → Potential**

## Visual direction

Use a clean academic foundation, subtle scientific grids, molecular structures, prototype/workbench metaphors, interface mock-ups, process arrows, approachable educator cues, and multidisciplinary signals.

Avoid corporate AI sales-deck styling, excessive gradients, screenshot-heavy layouts, large text blocks, and decorative animation for its own sake.

Animation should communicate scientific behaviour, interaction, transformation, cause-and-effect, or learner feedback.

## GitHub project architecture

Keep the deployed site modular:

```text
/
├── index.html
├── manifest.webmanifest
├── service-worker.js
├── .nojekyll
├── README.md
├── PROJECT_MASTER.md
├── assets/
├── css/
│   └── styles.css
├── data/
│   └── molecules.json
├── js/
│   ├── app.js
│   └── molecule-viewer.js
└── .github/
    └── workflows/
        └── deploy-pages.yml
```

Do not return to one giant HTML file without a specific reason.

## GitHub Pages deployment

GitHub Pages uses GitHub Actions. The workflow should deploy when changes are pushed to `main` and may also support manual dispatch.

```yaml
on:
  push:
    branches:
      - main
  workflow_dispatch:
```

The project is a static site and should not require a framework unless future features genuinely justify one.

## Development workflow

For small, low-risk changes:

**Request → inspect current repo → edit required files → commit to main → GitHub Actions deploy**

For major changes:

**Create development branch → implement → test → review → merge to main → deploy**

Major changes include rewriting the molecular renderer, changing navigation architecture, adding a simulation engine, major responsive-layout changes, or restructuring data.

Avoid replacing the entire repository for a small change.

## Rules for future AI-assisted development

1. Inspect the current repository before changing code.
2. Do not assume an old ZIP is the current master.
3. Once deployment is active, treat GitHub as the software source of truth.
4. Preserve working interactions unless explicitly replacing them.
5. Modify the smallest reasonable number of files.
6. Keep scientific data separate from rendering logic where practical.
7. Validate chemistry before publishing.
8. Test desktop and mobile behaviour.
9. Test touch as well as mouse interaction.
10. Prefer meaningful interaction over decorative motion.
11. Maintain accessibility.
12. Keep a usable fallback when advanced enhancements fail.
13. Use informative Git commit messages.
14. Do not deploy untested major changes directly to the live branch.

## Optimization priorities

**1. Molecular learning experience:** rotation, touch control, lone pairs, bond-angle visualisation, geometry comparison, prediction and feedback.

**2. Workshop facilitation:** presenter navigation, activity timers, facilitator cues, resets, and transitions.

**3. Classroom reliability:** phone, tablet, laptop, projector, touch screen, and responsive layouts.

**4. Scientific verification:** consistent validation checklist for all interactive content.

**5. Multidisciplinary transfer:** reusable templates participants can adapt without major coding.

**6. Trainer toolkit:** full prompts, troubleshooting, NotebookLM mini-guide, prompt framework, responsible-AI checklist, peer-review sheet, timing, and discipline examples.

## Definition of success

A successful prototype is:

- **Scientifically accurate**
- **Pedagogically purposeful**
- **Meaningfully interactive**
- **Usable**
- **Transferable**
- **Teachable**

## Project north star

This project is not intended to teach educators to become programmers.

It demonstrates how educators can move from:

**Teaching idea → grounded content → interactive prototype → testing → refinement → reusable teaching innovation**

For every proposed feature, ask:

> **What can the learner now do that they could not meaningfully do with the static version?**

If a feature cannot answer that question, it should not receive priority merely because it looks impressive.

## Current working principle

> **Build once. Understand the pattern. Test it. Improve it. Transfer it. Teach it forward.**
