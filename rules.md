# Project Rules — Next.js 16 (Frontend‑First AI Interface)

This document defines **non‑negotiable rules** for building the AI interface. Follow these to maintain clarity, scalability, and cost control.

---

## 1. Scope & Philosophy

- Frontend‑first development **only** in early phases
- UI/UX must be complete **before** API, models, or pricing logic
- Every feature must justify its **user value**
- Prefer **simplicity over abstraction**

---

## 2. Tech Stack Rules

- Framework: **Next.js 16 (App Router)**
- Language: **TypeScript only**
- Styling: **TailwindCSS**
- State management: React hooks (no Redux early)

❌ No backend frameworks until UI is stable
❌ No premature optimization

---

## 3. Folder Structure Rules

```text
app/
 ├─ page.tsx          # Main UI entry
 ├─ layout.tsx
 └─ globals.css
components/
 ├─ ChatBox.tsx
 ├─ Message.tsx
 └─ InputBar.tsx
```

Rules:

- One component = one responsibility
- No business logic in `page.tsx`
- Components must be reusable

---

## 4. UI / UX Rules

- All UI must handle these states explicitly:
  - `idle`
  - `loading`
  - `success`
  - `error`

- Loading indicators are mandatory

- Buttons must be disabled on invalid state

- UI must remain usable on slow networks

---

## 5. State Management Rules

Allowed state shape:

```ts
type Message = {
  role: "user" | "assistant";
  content: string;
};
```

Rules:

- No derived state unless necessary
- No side effects inside render
- All async logic must be isolated

---

## 6. Token & Cost Awareness (Future‑Safe)

Even before API integration:

- Design UI assuming **tokens are expensive**
- Encourage short inputs
- Prevent accidental long outputs

Rules:

- Output area must support truncation
- Future token/cost badges must fit UI

---

## 7. API & Model Rules (NOT YET IMPLEMENTED)

When added later:

- API calls must live outside UI components
- Model selection must be explicit
- No hard‑coded pricing in UI

---

## 8. Code Quality Rules

- Type everything
- No `any` unless justified
- Functions must be small and named clearly
- Comments explain **why**, not **what**

---

## 9. Performance Rules

- Avoid unnecessary re‑renders
- Virtualize long message lists (later)
- Never block the UI thread

---

## 10. What NOT To Do

❌ Do not add auth early
❌ Do not add agents early
❌ Do not optimize tokens early
❌ Do not mix UI and business logic

---

## 11. Development Order (Strict)

1. UI layout & interactions
2. ChatGPT-like spacing & behavior
3. UX polish (loading, scroll, focus)
4. API connection
5. Token & cost tracking
6. Model routing & optimization

---

## 12. ChatGPT-like UI Rules (Exact Styling & Behavior)

These rules define **pixel-level and behavior-level parity** with ChatGPT.

### Layout

- Max content width: **768px–800px** (`max-w-3xl`)
- Page structure:

  ```text
  Header (fixed height ~56px)
  Scrollable chat area (flex-1)
  Fixed input bar (bottom)
  ```

- Chat area must auto-scroll to bottom on new messages

### Message Bubbles

- Border radius: `rounded-2xl`
- Font size: `text-sm`
- Line height: `leading-relaxed`
- Max width per message: **75%** of container
- Spacing between messages: `space-y-6`

**User message**

- Right aligned (`ml-auto`)
- Dark background (`bg-gray-900`)
- White text

**Assistant message**

- Left aligned (`mr-auto`)
- Light background (`bg-gray-100`)
- Dark text

### Input Bar

- Fixed at bottom with top border
- Textarea (not input) to allow growth
- Rounded corners: `rounded-xl`
- Placeholder text similar to ChatGPT
- Send button disabled when input is empty

### Behavior Rules

- States must be explicit:

  ```text
  idle → typing → thinking → response
  ```

- Typing indicator must appear **before** assistant response
- UI must never jump or reflow unexpectedly
- Keyboard-first UX (Enter to send later)

### Accessibility & UX

- Focus ring visible on input
- Scroll must remain smooth
- No unnecessary animations

---

## Guiding Principle (UI)

> **If it does not feel like ChatGPT to use, it is not finished.**

Visual similarity is secondary to interaction behavior.

---

# Backend & API Rules — Chat-Yourself AI (Phase 2)

This phase implements the **real backend** for the AI clone. UI is assumed complete.

---

## Core Decision (Locked)

> **Memory architecture = Memvid-style. NOT RAG.**

This decision is final and must not be violated.

---

## 13. Backend Scope & Philosophy

- Backend controls **model behavior, memory, and cost**
- UI never talks directly to OpenAI
- Memory is **experience-based**, not document-retrieval based

❌ No RAG
❌ No vector databases
❌ No similarity search APIs

---

## 14. Backend Tech Rules

- Framework: **Next.js 16 Route Handlers (App Router)**
- Language: **TypeScript only**
- AI SDK: **OpenAI**
- File parsing:
  - PDF → `pdf-parse`
  - DOCX → `mammoth`

---

## 15. API Routes (Allowed)

```text
/api/chat     → AI conversation (Memvid-primed)
/api/upload   → File → Memvid encoding
```

Rules:

- One responsibility per route
- Always return JSON
- Explicit error handling

---

## 16. Security Rules (Non‑Negotiable)

- OpenAI API key lives in `.env.local`
- API keys are server-only
- Never log:
  - user documents
  - memory frames
  - full prompts

---

## 17. File Upload Rules (Memvid Input)

Accepted:

- `.pdf`
- `.docx`

Rules:

- Files are **not stored** permanently in MVP
- Only extracted text is processed
- Formatting is ignored

Pipeline:

```text
File → Text → Semantic distillation → Memory frame
```

---

## 18. Memory Model — Memvid Frames

Memory is stored as **frames**, not chunks.

```ts
type MemoryFrame = {
  timestamp: number;
  summary: string;
  tags: string[];
};
```

Rules:

- Frames are append-only
- Frames represent **conceptual meaning**, not wording
- No raw document text allowed

---

## 19. Memvid Encoding Rules

- Use an LLM to distill documents into long‑term memory
- Focus on:
  - concepts
  - decisions
  - relationships

Prompt intent:

> “Summarize this for long-term memory, not for quoting.”

---

## 20. Chat Integration (Memvid)

- Memory is NOT queried per request
- A rolling memory summary is generated
- Memory is injected into the **system prompt only**

Example:

```text
System context:
The assistant has prior knowledge:
- User is building an AI clone using Next.js
- User chose Memvid-style memory
```

---

## 21. Cost & Performance Rules

- Memory context ≤ 300 tokens
- Old frames must be merged or summarized
- Never send full documents to the model

---

## 22. Explicitly Forbidden

❌ RAG pipelines
❌ Vector DBs (Pinecone, Chroma, Qdrant, etc.)
❌ Chunk-based prompting
❌ Semantic search endpoints

---

## Guiding Principle (Backend)

> **The model should behave as if it remembers — not as if it searches.**

If you need retrieval, the architecture is wrong.
