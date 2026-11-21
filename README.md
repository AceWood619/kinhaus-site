# kinhaushome.com

Public website for Kinhaus, hosted on GitHub Pages. **This repo is the source of truth:** a push to `main` publishes kinhaushome.com. `kinhaus-company/website/` is a mirror kept for the record.

- **This repo is public.** Keep it to public copy only: founder name, city and the company email. No personal contact details, prices, "for sale" or certification claims (the footer states products are in development and not for sale).
- Files: `index.html` (the whole page), `img/` (product renders it uses), `CNAME` (custom domain), `.nojekyll` (serve files as-is).
- To publish: edit here, check every `img/` path the page uses exists, commit to `main`. Then copy the changed files to `kinhaus-company/website/` so the mirror matches.
- Concept images (`img/concept-*.jpg`) are blurred teasers on purpose: until IP filings are in place, show no product shape or how-it-works detail for unreleased devices (Decision Log, 2026-11-21).

## Waitlist, tip jar and social links (added 2026-11-16)
The page works today with no accounts: the waitlist form opens an email to hello@kinhaushome.com, and the tip button stays hidden behind a "tip jar opens soon" line.
To switch them on, edit the `KINHAUS` block near the bottom of `index.html`:
- `waitlistAction`: the form action URL from the email-list service (for Kit: the form's `.../subscriptions` URL; the email field is already named `email_address`). The form then posts straight to the list.
- `tipUrl`: the tip-jar page link (Ko-fi, Buy Me a Coffee or GitHub Sponsors). The "Chip in" button appears.
- `socials`: a list like `[{ name: "YouTube", url: "https://..." }]`. Links appear in the "Spread the word" card.
- Name the email-list provider on `privacy.html` once one is chosen.

Copy rules for anything about money: tips are gifts to a for-profit company, never "donations", never tax-deductible, and never buy a device, reservation, price or discount. No pre-orders, prices or "buy" buttons.
`img/og-card.jpg` is the preview image shown when the link is shared on social media.
