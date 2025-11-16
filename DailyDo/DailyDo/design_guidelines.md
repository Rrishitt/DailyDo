# Design Guidelines: Premium Personalized TO-DO List App

## Design Approach
**Reference-Based Hybrid**: Drawing from Apple HIG's premium smoothness, Notion's calming minimalism, Duolingo's playful engagement, and Linear's task management clarity. This creates an emotionally compelling productivity companion that feels alive and personalized.

## Core Design Principles
1. **Emotional Resonance**: Every interaction should feel rewarding and smooth
2. **Progressive Disclosure**: Information reveals elegantly, never overwhelming
3. **Adaptive Personality**: Interface evolves with user context and behavior
4. **Microinteraction Focus**: Subtle animations make every action feel intentional

## Typography System

**Font Families** (via Google Fonts CDN):
- Primary: 'Inter' (clean, modern, highly readable for UI)
- Display: 'Fraunces' or 'Playfair Display' (for motivational quotes and emotional moments)

**Type Scale**:
- Hero/Onboarding Questions: text-4xl to text-5xl, font-medium
- Task Titles: text-lg, font-semibold
- Body/Descriptions: text-base, font-normal
- Meta Info (deadlines, tags): text-sm, font-medium
- Motivational Quotes: text-2xl to text-3xl, italic, display font
- Microcopy/Hints: text-xs, font-light

## Layout & Spacing System

**Tailwind Spacing Primitives**: Use 4, 6, 8, 12, 16, 24 as primary spacing units
- Component padding: p-6 to p-8
- Section gaps: gap-8 to gap-12
- Card spacing: space-y-6
- Tight spacing (form inputs): space-y-4
- Generous breathing room (between major sections): my-16 to my-24

**Container Structure**:
- Max width: max-w-2xl for main task area (focused, not sprawling)
- Onboarding: max-w-xl (intimate, conversational)
- Full-width celebration screens: w-full with centered content

## Component Library

### Onboarding Flow
**Multi-step Cards**: Each question appears as a card with fade-in entrance
- Card: Rounded-3xl, backdrop-blur effect, soft shadow
- Progress indicator: Thin progress bar at top (h-1), fills smoothly
- Question text: Large, friendly typography
- Input options: Pill-shaped buttons or sleek select dropdowns
- Navigation: Floating "Continue" button (bottom-right), appears only when valid

### Task Creation Interface
**Conversational Modal**: Full-screen overlay with centered form
- Modal background: Gentle backdrop blur
- Form steps: Vertical flow with smooth transitions between fields
- Field labels: Above input, text-sm with subtle prompt text
- Input fields: Borderless with bottom border only, focus state expands
- Breakdown steps: Add/remove buttons with smooth list animations
- Reminder config: Toggle switches + time picker in elegant row layout

### Task Dashboard
**Card-Based Grid**:
- Task cards: Rounded-2xl, padding-6, hover lift effect (transform scale)
- Card structure:
  - Checkbox (left, custom styled, large clickable area)
  - Task title (main visual weight)
  - Metadata row: deadline badge + category tag
  - Purpose text (collapsed, expands on hover/click)
  - Action menu (three-dot, appears on hover)
- Priority visualization: Subtle border accent on left edge
- Categories: Pill badges with icon + label
- Empty state: Centered illustration + motivational prompt

### Completion Celebration
**Full-Screen Takeover** (brief, 2-3 seconds):
- Motivational quote: Center screen, large display font
- Animation particles: Confetti or glow effects (canvas-based)
- Completion sound: Subtle chime (WebAudio API)
- Smooth exit: Fade to updated task list

### Theme System
**Adaptive Containers**:
- Theme switcher: Floating toggle (top-right corner)
- Smooth transitions: All theme changes use CSS transitions (300ms)
- Mood-based variants: Preset theme packages (Energetic, Calm, Focus, Night)

## Navigation & Structure

**Top Bar** (sticky):
- Logo/App name (left)
- View switcher: Today / This Week / All Tasks (center pills)
- Profile avatar + theme toggle (right)
- Height: h-16, backdrop blur

**Sidebar** (Desktop only, collapsible on tablet):
- Width: w-64
- Sections: Categories, Goals, Insights
- Each item: Icon + label, hover background

**Mobile**: Bottom navigation bar with 3-4 core actions

## Animations & Microinteractions

**Task Interactions**:
- Checkbox toggle: Scale pulse + checkmark draw animation
- Task completion: Gentle strikethrough animation + fade out
- Add task: Slide in from bottom
- Delete task: Swipe gesture + fade out

**Celebration Moments**:
- Confetti: Particle system (30-40 particles, gravity + fade)
- Glow effect: Radial gradient animation expanding from center
- Quote reveal: Fade + slight scale up

**Page Transitions**:
- Route changes: Crossfade (200ms)
- Modal open/close: Scale + fade (250ms)
- Card hovers: Lift effect (translate -2px) + shadow expansion

## Forms & Inputs

**Consistent Input Style**:
- Text inputs: Transparent background, bottom border, padding p-3
- Focus state: Border thickens, subtle glow
- Textareas: Same style, min-height of 24 (6 rows)
- Selects/Dropdowns: Custom styled to match input aesthetic
- Buttons: Rounded-full for primary actions, rounded-lg for secondary

**Accessibility**:
- All inputs have visible labels
- Focus indicators on all interactive elements
- Sufficient contrast ratios throughout
- Keyboard navigation fully supported

## Images

**Usage**: Minimal and strategic - this is a productivity tool, not a marketing site

**Onboarding Illustrations**:
- Abstract, minimal vector illustrations for each question step
- Position: Above question text, centered
- Size: w-48 to w-64 (moderate, not overwhelming)
- Style: Line art or gentle gradients matching theme

**Empty States**:
- Small centered illustration when no tasks exist
- Style: Encouraging and light, not discouraging

**Profile/Avatar**:
- User avatar in top-right (circular, w-10 h-10)

**No Hero Image**: This is a web app, not a landing page - prioritize functionality over imagery

## Icon System

**Icon Library**: Heroicons (outline for most UI, solid for active states)
- Navigation: 24px icons
- Task metadata: 16px icons
- Buttons: 20px icons
- Categories: 18px icons with custom palette assignments

This design creates a premium, emotionally engaging productivity experience that feels personalized, smooth, and motivating through thoughtful typography, generous spacing, delightful microinteractions, and adaptive theming.