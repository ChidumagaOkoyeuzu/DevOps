# Scrum · Week 5

**Date:** Friday 30 October 2026

**Sprint:** Sprint 0 · Setup → Sprint 1 · Browse and accounts

---

## Updates

| Person | Done | Next | Blocked by |
|:---|:---|:---|:---|
| **Whole team** | Opened #47 Project skeleton, #48 Linting and formatting, #49 GitHub Actions CI and #50 User table PRs. Merged #48 into #47 and approved #47. Updated User table (#8) and ER diagram. Added cards #51–#54. Wrote Sprint 1 planning docs and card guides | Merge Sprint 0 PRs into `develop`, then start Sprint 1 | #47 can't merge until #49's check is in it |
| **Nathan** | | #18 Unit tests and coverage in CI, then #19 First deploy | |
| **Chidumaga** | | Merge #49 into #47, then #47 into `develop`. Review #50 | |
| **Frank** | | Sprint 1 stream (picked today) | |
| **Vic** | | Sprint 1 stream (picked today) | |

> Use card numbers so updates link to the board, e.g. *Finished #7, starting #8*.

---

## Decisions

- User table: `name` replaced by `firstName` and `lastName`; unique `username` added (#8)
- Email verification and password reset moved to stretch goals
- Square buttons site-wide; "+" icon in the header replaces the "Create recipe" button; Preferences section removed (dark mode and units save to the account)
- Testing: Vitest for unit tests with coverage in CI; Playwright for end-to-end and acceptance tests later
- Hosting: Vercel for the app and Neon for the database, chosen over Azure (built for Next.js, free PR previews, free database branches)
- Merge order: #49 into #47, then #47 into `develop`, then #50
- Sprint 1 streams: A Accounts – ___, B Browse – ___, C Recipe page and layout – ___ (Nathan: DevOps)
- Sprint 1 dates: Fri 30 Oct to Thu 12 Nov, review and retro Fri 13 Nov *(confirm)*
- Minimum test coverage: 70% *(confirm)*
- Make the repo public after a secrets check *(confirm)*

## Actions

| Action | Who | By |
|:---|:---|:---|
| Merge #49 into #47, then #47 into `develop` | Chidumaga | Mon 2 Nov |
| Point #50 at `develop` and update it | Nathan | After #47 merges |
| Review and merge #50 | Chidumaga | |
| Rename stream folders and assign Sprint 1 cards | Nathan | After scrum |
| Set the Sprint 1 milestone due date | Nathan | After scrum |
| Make repo public (if agreed) | Chidumaga | |

## Notes

- #47 was stuck on "Some checks haven't completed yet": the required "Lint, format and build" check lives in #49, which wasn't in `develop`. #49 now targets #47 and passes
- Vercel's free plan only deploys a private repo for the account owner, hence the repo-public decision
