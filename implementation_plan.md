# Responsive & Spacing Layout Rebuild Plan

This plan outlines the CSS refactoring required to ensure the portfolio is flawlessly responsive across all device classes (320px to 1920px+) and features generous, fluid vertical breathing space between sections.

## Proposed Changes

### 1. Global Spacing & Fluid Typography (`src/index.css`)
- **Fluid Vertical Padding**: Update `--section-gap` to `clamp(48px, 8vw, 120px)`.
- **Section Wrapper**: Ensure `.section` uses `padding: var(--section-gap) clamp(1.25rem, 4vw, 2rem)` so horizontal padding also scales down gracefully on narrow phones.
- **Max Width**: Keep `--max-width` capped (e.g., `1200px` or `1440px`) to prevent ultra-wide desktop stretching.
- **Touch Targets**: Add a global utility or update `.btn` to ensure `min-height: 44px` for accessibility.
- **Viewport Height**: Replace `vh` units with `dvh` (dynamic viewport height) globally to prevent mobile browser address bar clipping.

### 2. Navbar (`src/components/Navbar.css`)
- Ensure the mobile hamburger tap target is at least 44×44px.
- Adjust the logo container to shrink slightly on very small devices (e.g., iPhone SE) to prevent text overflow.
- Refine the mobile menu overlay to handle landscape orientation (allow scrolling inside the menu if it exceeds viewport height).

### 3. Hero Section (`src/components/Hero.css`)
- **Height**: Change `min-height: 100vh` to `min-height: 100dvh`.
- **Typography**: Verify `clamp()` bounds on `.hero__name` so it fits on 320px screens without mid-word wrapping.
- **Layout**: Ensure the CTA buttons have generous gaps on mobile and wrap correctly.
- **Effects**: Reduce the visual weight/opacity of the watermark on smaller screens or hide it entirely, and gracefully handle the particle canvas behind text.

### 4. Skills & Tech Stack (`src/components/Skills.css`)
- **Grid Layout**: Adjust `grid-template-columns` to use `minmax(250px, 1fr)` so it fits nicely on a 320px screen without horizontal scroll.
- **Padding**: Reduce internal padding of `.skill-card` on mobile via `clamp()`.

### 5. Experience Section (`src/components/Experience.css`)
- Adjust the timeline grid columns on mobile (currently `44px 1fr`) to ensure text has enough room.
- Make card padding fluid.

### 6. Projects Section (`src/components/Projects.css`)
- *Note: The current implementation uses a grid of 3D tilt cards, not a two-pane slot list. I will ensure these cards are perfectly responsive.*
- Adjust the grid from `minmax(340px, 1fr)` to `minmax(280px, 1fr)` so a single column fits comfortably on an iPhone SE.
- Ensure the shimmer border and 3D effects don't cause horizontal overflow (`overflow-x: hidden` on the body handles most of this, but will verify card wrappers).

### 7. Education Section (`src/components/Education.css`)
- Ensure the two-column layout (`1fr 1fr`) collapses cleanly to a single column on tablet/mobile (currently at `768px`, will verify gap sizes).
- Make internal paddings fluid.

### 8. Contact & Footer (`src/components/Contact.css`)
- Ensure inputs and textareas have `min-height: 44px`.
- Ensure the two-column split collapses early enough (tablet portrait).
- Give the footer generous spacing so it acts as a proper end-of-page anchor without feeling cramped.

## Verification Plan
1. **Dev Server**: Run Vite and view on localhost.
2. **Device Simulation**: Use Chrome DevTools Device Mode to test:
   - iPhone SE (320px)
   - iPhone 14 Pro (393px)
   - iPad (768px)
   - Landscape mobile (e.g. 812x375)
   - Desktop (1440px)
   - Ultra-wide (1920px)
3. **Checks**: Look for horizontal scrollbars, tap target sizes, and ensure section spacing feels "breathable" but not detached.
