# Project Audit & Implementation Plan

## 📊 Current Implementation Status

| Feature Category | Implementation State | Technical Details |
| :--- | :--- | :--- |
| **Core Architecture** | ✅ **Complete** | **Astro 6.x** (SSR mode), **React 19**, **Tailwind CSS 4.x**, **Framer Motion**. |
| **Bilingual Support** | ✅ **Complete** | Full EN/AR localization, RTL support, persistent storage. |
| **Dual Persona System** | ✅ **Complete** | **Engineer vs. Executive** views via `PersonaContext`. |
| **AI Assistant (OMARTERM)** | ✅ **Complete** | Multi-model Gemini fallback, system-aware context, **Magic Mode actions**. |
| **AI UI Triggers** | ✅ **Complete** | Structured JSON outputs triggering persona, theme, and language changes. |
| **Services & Skills** | ✅ **Complete** | Grid-based displays with localized data. |
| **SEO & Production Ready** | 🏗️ **In Progress** | Custom 404, JSON-LD Schema, Open Graph tags. |
| **Performance** | ✅ **High** | SSR on Netlify, optimized images. |

---

## 🛠️ Immediate "5-Minute" Fixes

### 1. SEO Optimization (Sitemap & Robots.txt)
*   **Goal**: Ensure search engines can crawl and index the site correctly.
*   **Action**: 
    *   Install `@astrojs/sitemap`.
    *   Update `astro.config.mjs` to include the sitemap integration and site URL.
    *   Create `public/robots.txt`.
*   **Status**: ✅ Complete.

### 2. Social Link Verification
*   **Goal**: Seamless recruiter access to LinkedIn.
*   **Action**: Verify LinkedIn URL in incognito and ensure profile visibility is set to "Public".
*   **Status**: ✅ Verified (Public visibility confirmed).

### 3. Gemini Model String Verification
*   **Goal**: Prevent API errors due to deprecated or unavailable model names.
*   **Action**: Cross-reference `MODELS_TO_TRY` in `src/pages/api/chat.ts` with current Google AI Studio documentation.
*   **Status**: ✅ Updated (Refined for April 2026 model lineup).

---

## 🚀 Advanced Feature: AI UI Triggers (Magic Mode)

Instead of the AI just talking, it should **act**. We will implement **Structured Outputs (JSON Mode)** for the Gemini API.

### Implementation Workflow:
1.  **Update API**: Modify `src/pages/api/chat.ts` to request JSON formatted responses when specific actions are detected.
2.  **Schema**:
    ```json
    {
      "reply": "I've switched the persona to Executive for you.",
      "action": "SET_PERSONA",
      "value": "executive"
    }
    ```
3.  **Frontend Integration**: Update `Terminal.tsx` to parse the JSON and programmatically call `setLanguage`, `setPersona`, or `setTheme`.

---

## 📋 Missing Functions & Future Enhancements

### 1. Advanced PDF CV Generation
*   **Status**: Hardening required.
*   **Details**: Ensure high-fidelity, ATS-compliant PDF generation that pulls directly from the Markdown content without layout breakage.

### 2. AI Knowledge Base Expansion
*   **Status**: Missing.
*   **Details**: Create a `knowledge-base.json` containing detailed project case studies, technical hurdles, and SAP integration specifics. This will be fed to the Gemini system prompt to make the assistant much smarter about Omar's specific work.

### 3. PWA (Progressive Web App)
*   **Status**: ✅ Complete.
*   **Details**: Added web manifest, generated icons, and configured `@vite-pwa/astro` for offline support and "installable" experience.

### 4. Privacy-First Analytics
*   **Status**: ✅ Complete.
*   **Details**: Integrated Umami analytics placeholder in `Layout.astro` for privacy-respecting visitor tracking.

### 5. Interactive "Showcase" Components
*   **Status**: ✅ Complete.
*   **Details**: Added interactive SAP process flow diagrams and code snippets using Framer Motion, dynamically visible when the "Engineer" persona is active.

---

## 📝 Next Action Items
1. [x] Install and configure `@astrojs/sitemap`.
2. [x] Create `public/robots.txt`.
3. [x] Refactor `chat.ts` for JSON action support.
4. [x] Implement "Magic Mode" UI triggers in `Terminal.tsx`.
5. [x] Implement PWA support and icons.
6. [x] Integrate Privacy-First Analytics (Umami).
7. [x] Add Interactive "Showcase" components for Engineer persona.
8. [ ] Create a detailed `knowledge-base.json`.
