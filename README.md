# gemstonedev.github.io

Public website for **GEMSTONE** — Generalizable Experimental Methods and Standards
for Transparent, Open, Networked Execution — a node in the NSF Programmable Cloud
Laboratory Test Bed.

Built with Jekyll, deployed by GitHub Pages from the default branch.

---

## Install

Copy the contents of this folder into the root of `gemstonedev.github.io`, then:

```bash
bundle install
bundle exec jekyll serve
```

Open <http://localhost:4000>.

GitHub Pages builds automatically on push to the default branch. No Actions
workflow is needed — every plugin used here is on the Pages allowlist.

---

## Before going live

| What | Where |
|---|---|
| **NSF award number** | `_config.yml` → `nsf_award`. Set to `2607573`. One edit updates the footer, the acknowledgments page, and the citation block. |
| **Email addresses** | `contact.html`. All four cells currently point at `gemstone@stanford.edu` with subject-line hints — confirm that alias is live and monitored, and split into dedicated `access@`/`outreach@`/`press@` aliases once provisioned. |
| **Social card** | `assets/img/social-card.png` (1200×630), referenced from `_includes/head.html` for Open Graph / Twitter previews. Regenerate if the tagline or partners change. |
| **News posts** | `_posts/`. The two entries are drafted from the proposal, not published announcements — confirm dates and wording. |
| **Newsletter signup** | `news.html` currently links to a `mailto:` subscribe button. Swap it for a real list (Mailchimp, Buttondown, or a Google Form) once one exists. |

---

## Structure

```
_config.yml            site settings, NSF award number
_data/
  navigation.yml       primary nav — add or reorder items here
  team.yml             leads + project staff
  partners.yml         the five partner organizations (used on home and team)
_includes/
  head.html            meta, fonts, stylesheet
  header.html          sticky header + nav (marks current page)
  footer.html          footer + NSF acknowledgment line
  logo.svg             inline mark, recoloured by CSS
_layouts/
  default.html         shell
  page.html            rail + content, used by every content page
  post.html            single news item
_posts/                news, one Markdown file per item
assets/
  css/main.css         all styling
  img/logo.svg         standalone mark
  img/favicon.svg      favicon
index.html             home
vision.html  team.html  publications.html  news.html
education.html  contact.html  acknowledgments.html
```

### Adding a news item

Create `_posts/YYYY-MM-DD-slug.md`:

```markdown
---
layout: post
title: Your headline
---

First paragraph becomes the excerpt on the news index and home page.
```

### Adding a person

Append to `_data/team.yml` under `leads` (full card with bio) or `staff`
(name and role only). Both render automatically.

---

## Design

Content pages share one shape: a sticky left rail carrying the page title, and a
single content column beside it. Below 900px the rail stacks above the content.

### Type

| Role | Face | Notes |
|---|---|---|
| Headings, nav, labels, numerals | **Libre Franklin** 400/500/600/700 | `--display` |
| Body copy | **Karla** 400/500/600 | `--text`, 17px / 1.6 base; long-form paragraphs 18px |

Small caps labels are 12–13px, `letter-spacing: 0.14em`, uppercase. Supporting
text (card copy, footer, metadata) stays in the 14–17px range — nothing below 14px.

### Color

| Token | Hex | Use |
|---|---|---|
| `--navy` | `#12497E` | wordmark, links, primary buttons, stat numerals |
| `--deep` | `#001327` | hero, footer, CTA panels |
| `--accent` | `#E36C09` | rail rules, active nav underline, mark centre — graphic elements only |
| `--accent-ink` | `#B85500` | orange for small text and hover states (4.8:1 on white, WCAG AA) |
| `--ink` | `#16202B` | headings, body on light |
| `--body` | `#3C4A59` | long-form paragraphs |
| `--muted` | `#5C6875` | card copy |
| `--quiet` | `#64717F` | labels, metadata (kept dark enough for WCAG AA on white) |
| `--rule` | `#DCE1E7` | all borders and grid gaps |
| `--tint` | `#F4F6F8` | alternating section bands, notes |

On dark grounds: `#AEC2DA` body, `#7D97B4` quiet, `#16324F` rules.

### The mark

A brilliant cut rendered as a 3×3 grid of cells rotated 45°: nine discrete nodes
that still read as a gemstone. Corners and edges take the ground-appropriate
neutral; the centre cell is always `--accent`. Add `.on-dark` to any ancestor to
flip it for dark backgrounds. Never rotate, recolour the centre, or add a stroke.

### Grid and spacing

Container 1160px with 40px gutters (22px below 600px). Rail 240px, gap 72px.
Sections 88px vertical, 56px below 900px. Card grids are 1px `--rule` gaps over a
`--rule` background, which draws the hairline rules — cells themselves are white.

Breakpoints: 900px (rail stacks, two-up grids collapse) and 600px (gutters and
type step down; the header stops being sticky so the wrapped nav doesn't cover
a third of a phone screen).

---

## Source

Content is drawn from the GEMSTONE proposal and the Stanford intro deck. Figures,
photography, and instrument imagery are not included — the site is typographic
throughout, so it needs no image assets beyond the mark.
