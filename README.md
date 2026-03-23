# Hello World UI

A production-grade **pure JavaScript** UI project with a unified CI/CD quality pipeline — no frameworks, no dependencies at runtime.

---

## 🚀 Quick Start

```bash
# Clone and install dev tools
npm install

# Open in browser (no build step needed)
open index.html

# Run all checks locally
npm run validate
```

---

## 📜 Scripts

| Command | Description |
|---|---|
| `npm run lint` | ESLint on all JS |
| `npm run lint:fix` | Auto-fix ESLint issues |
| `npm run format` | Format with Prettier |
| `npm run format:check` | Check format without writing |
| `npm test` | Run Jest unit tests |
| `npm run test:coverage` | Tests + coverage report |
| `npm run audit` | npm vulnerability audit |
| `npm run validate` | lint + format:check + test |

---

## ⚙️ GitHub Actions — Single Workflow (`ci.yml`)

All tools run in **one file**: `.github/workflows/ci.yml`

| Job | Tool | Trigger | Purpose |
|---|---|---|---|
| `lint` | **ESLint** + **Prettier** | push / PR | Code style & logic |
| `test` | **Jest** | push / PR | Unit tests + 70% coverage |
| `npm-audit` | **npm audit** | push / PR / weekly | Dep vulnerabilities |
| `snyk` | **Snyk** | push / PR / weekly | Dep CVEs + SAST |
| `semgrep` | **Semgrep** | push / PR / weekly | OWASP / XSS / JS SAST |
| `codeql` | **CodeQL** | push / PR / weekly | GitHub native SAST |
| `dependency-review` | **Dep Review** | PR only | Blocks new CVEs in PRs |
| `ci-gate` | Status gate | push / PR | Branch protection hook |

The **weekly scheduled run** (every Monday 03:00 UTC) catches newly disclosed CVEs even with no code changes.

---

## 🔑 Secrets to Add

**Settings → Secrets and variables → Actions:**

| Secret | Required | Where to get |
|---|---|---|
| `SNYK_TOKEN` | ✅ For Snyk jobs | [app.snyk.io](https://app.snyk.io) → Account Settings → Auth Token |
| `SEMGREP_APP_TOKEN` | ⬜ Optional | [semgrep.dev](https://semgrep.dev) → Settings → Tokens |
| `CODECOV_TOKEN` | ⬜ Optional | [codecov.io](https://codecov.io) → Repo settings |

> CodeQL and Dependency Review need **zero secrets** — they work out of the box.

---

## 🔒 Branch Protection (Recommended)

In **Settings → Branches → Add rule** for `main`:

- ✅ Require status checks to pass: **`CI Gate`**
- ✅ Require pull request before merging
- ✅ Dismiss stale reviews on push

---

## 📁 Project Structure

```
hello-world-ui/
├── .github/
│   └── workflows/
│       └── ci.yml           ← Single unified workflow
├── src/
│   ├── js/
│   │   └── main.js          ← App logic (ES modules)
│   └── css/
│       └── style.css        ← Styles
├── tests/
│   └── main.test.js         ← Jest unit tests
├── index.html               ← Entry point
├── .eslintrc.cjs
├── .prettierrc
├── .semgrepignore
├── .gitignore
└── package.json
```
