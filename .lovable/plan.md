# Fix pack: header, text rendering, chat, legal pages

## 1. Header — stop overflowing into the category section

Root cause: at certain widths the right-side buttons (AI / Search / 18+) push outside the header box because the layout uses an oversized flex row. They visually float over the category hero below, which is what makes the chips "uncklickable" — the chips ARE `<Link>`s, but the AI / Search buttons sit on top and intercept clicks.

Fix (no redesign, just sizing):

- Header gets `overflow-hidden` on the inner row so nothing escapes the bar.
- Right-side action cluster gets `min-w-0` + `flex-shrink-0` on each button, smaller paddings on `<lg`, and the `18+` chip moves into the mobile menu (hidden until `lg`).
- Mega-menu container gets `min-w-0 overflow-hidden` and the visible categories drop to a max of 5 on `xl` (smaller breakpoint reverts to burger).
- Promo strip stays as-is.

## 2. Product / brand / category descriptions render as garbled `\n \n` text

Root cause: 414 of 1070 products have literal backslash-n sequences (`\n`) inside `description` because the original WP feed embedded them as text instead of real newlines. `whitespace-pre-line` only honors real `\n`, so the visible string stays "`Vaporesso Luxe XR 5ml DTL Pod Δεξαμενή \n \n \n Η ...`".

Fix in two places:

- One-time clean-up pass on `src/data/products.generated.json`:
  - Replace literal `\n` with real newlines.
  - Collapse 3+ blank lines down to 2.
  - Trim per-line whitespace.
  - Same pass for `shortDescription`.
- Render with a small `<RichText>` helper (in `src/components/RichText.tsx`) that splits on blank lines into `<p>` blocks, so descriptions look like real paragraphs everywhere they appear (product page, brand pages if any).

## 3. Category / subcategory chips look run-together and "not clickable"

Two separate problems:

- The "not clickable" half is fixed by #1 (header was sitting on top of them).
- The "no spacing" half: chips already use `flex flex-wrap gap-2`, but on `/$category/$subcategory.tsx` the gap collapses when chips wrap onto the same line because there's no vertical breathing room. Bump to `gap-x-2 gap-y-2`, add `inline-flex items-center` on each chip, and ensure the count badge has its own `ml-1` (already there). Visual confirmation after the header fix.

## 4. AI Chat — bigger, edge-to-edge mobile, presets, clear, disclaimer

Rewrite `src/components/ChatWidget.tsx` with:

- Mobile (`<sm`): truly full-screen — `inset-0`, no border-radius, sticky header & input bars, the floating bubble hides while open.
- Desktop: 420 × 640 panel anchored bottom-right, rounded, shadow.
- Header bar: title + "Νέα συνομιλία" (clear/reset) button + close.
- First-message state shows 4 predefined prompt chips:
  - "Πρότεινέ μου ένα disposable"
  - "Τι pod system για αρχάριο;"
  - "Ψάχνω υγρό με μέντα"
  - "Φτηνός ναργιλές για αρχή"
  - Clicking sends that prompt immediately.
- Footer disclaimer line under the input: "AI βοηθός — μπορεί να κάνει λάθη. 18+. Αγορές στο vapeandmore.gr."
- Larger fonts/touch targets on mobile (text-base, h-12 input).
- "Νέα συνομιλία" resets messages to the welcome and re-shows the presets.
- Server fn (`sendChat`) stays unchanged — already returns reply + product cards.

## 5. Legal / Contact / About pages rewritten around vapeandmore.gr

Scrape the 5 vapeandmore.gr legal URLs the user provided using **Firecrawl** (markdown format). Firecrawl is currently not connected — I'll ask to connect it during build, then run the scrape.

Per page:

- Rewrite into our own concise Greek copy (NOT a verbatim copy — that would be duplicate content) summarising the policy and **always** linking back to the original vapeandmore.gr page as the authoritative source.
- Include the real merchant block on every legal page footer + on `/epikoinonia` + `/sxetika`:
  > Vape and More — Αρκαδίου 82, Ρέθυμνο, GR
  > T: [2831181046](tel:+302831181046) · [info@vapeandmore.gr](mailto:info@vapeandmore.gr)
  > Κατάστημα: [vapeandmore.gr](https://vapeandmore.gr) (συνεργαζόμενο)
- Update routes:
  - `/oroi-xrisis` → from `/οροι-χρησησ/`
  - `/apostoles-epistrofes` → split into delivery+returns; pull from `/πληρωμή-παράδοση/` and `/ασφάλεια-συναλλαγών/`
  - `/cookies` → from `/cookies/`
  - `/politiki-aporritou` → from `/πολιτικη-απορρητου/`
  - `/epikoinonia` → real address + phone + email + Google-maps link + form-less contact info
  - `/sxetika` (About) → rewrite around the partnership: who Vape and More is (Ρέθυμνο, panhellenic shipping, authentic products), what ilektronikatsigara.gr does (curated Greek-language catalog + AI assistant), why we link out.
- Every page gets a prominent `Αγοράστε στο vapeandmore.gr` CTA button.
- All five legal pages and the about page get distinct `head()` meta (title + description + canonical) and an `og:url`.

## 6. Verification

After edits:

- Reload `/antistaseis` and `/antistaseis/ergostasiakes-antistaseis` and click a subcategory chip — must navigate.
- Open a product like `vaporesso-luxe-xr-5ml-dtl-pod-dexameni` and confirm description renders as paragraphs, no visible `\n`.
- Open chat on mobile viewport (375px) — must be edge-to-edge, preset chips visible, "Νέα συνομιλία" works.
- Visit each legal page — has real vapeandmore.gr backlinks + merchant contact block.

## Technical notes

- No DB / schema work.
- New file: `src/components/RichText.tsx` (paragraph splitter).
- Modified files: `src/components/Header.tsx`, `src/components/ChatWidget.tsx`, `src/routes/$category.tsx`, `src/routes/$category.$subcategory.tsx`, `src/routes/proionta.$slug.tsx`, `src/data/products.generated.json` (cleanup pass), `src/routes/oroi-xrisis.tsx`, `src/routes/politiki-aporritou.tsx`, `src/routes/cookies.tsx`, `src/routes/apostoles-epistrofes.tsx`, `src/routes/epikoinonia.tsx`, `src/routes/sxetika.tsx`.
- Firecrawl connector needs to be linked before #5 runs. If you'd rather skip the scrape and have me write the legal copy from scratch (using only the contact info + your structure), say so and I'll proceed without Firecrawl.
