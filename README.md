# kinhaushome.com

Public website for Kinhaus. Source of truth: kinhaus-company/website/index.html (copy here to publish). Hosted on GitHub Pages.

- **This repo is public.** Keep it to public copy only: founder name, city and the company email. No personal contact details, prices, "for sale" or certification claims (the footer states products are in development and not for sale).
- Files: `index.html` (the whole page), `img/` (product renders it uses), `CNAME` (custom domain), `.nojekyll` (serve files as-is).
- To publish: copy `kinhaus-company/website/index.html` and `website/img/` here, check every `img/` path the page uses exists, commit to `main`.

## Waitlist, tip jar and social links (added 2026-11-16)
The page works today with no accounts: the waitlist form opens an email to hello@kinhaushome.com, and the tip button stays hidden behind a "tip jar opens soon" line.
To switch them on, edit the `KINHAUS` block near the bottom of `index.html`:
- `waitlistAction`: the form action URL from the email-list service (for Kit: the form's `.../subscriptions` URL; the email field is already named `email_address`). The form then posts straight to the list.
- `tipUrl`: the tip-jar page link (Ko-fi, Buy Me a Coffee or GitHub Sponsors). The "Chip in" button appears.
- `socials`: a list like `[{ name: "YouTube", url: "https://..." }]`. Links appear in the "Spread the word" card.
- Name the email-list provider on `privacy.html` once one is chosen.

Copy rules for anything about money: tips are gifts to a for-profit company, never "donations", never tax-deductible, and never buy a device, reservation, price or discount. No pre-orders, prices or "buy" buttons.
`img/og-card.jpg` is the preview image shown when the link is shared on social media.
