# ⚙️ Setup Guide

## Prerequisites
- A GitHub account
- A free Gemini API key from [aistudio.google.com](https://aistudio.google.com/app/apikey)
- Git installed locally

---

## Step 1 — Push to GitHub

```bash
git init
git add .
git commit -m "feat: initial project setup"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/dev-activity.git
git push -u origin main
```

---

## Step 2 — Add Gemini API Key as GitHub Secret

1. Open your repo → **Settings** → **Secrets and variables** → **Actions**
2. Click **"New repository secret"**
3. Name: `GEMINI_API_KEY`
4. Value: your key (starts with `AIza...`)
5. Click **"Add secret"**

> 🔒 This secret is encrypted and only visible to GitHub Actions, never in logs.

---

## Step 3 — Enable GitHub Actions

1. Go to the **Actions** tab in your repo
2. Click **"I understand my workflows, go ahead and enable them"** (if prompted)
3. You should see **"Dev Activity"** in the list

---

## Step 4 — Test Manually

1. **Actions** → **Dev Activity** → **Run workflow** → **Run workflow**
2. Watch the live log
3. If the 35% skip doesn't fire, a file will be committed in ~30 seconds

> If nothing commits on the first try, just run again — the skip is random.

---

## How the Schedule Works

The workflow fires **3 times daily**:

| Time (UTC) | Approx IST |
|------------|------------|
| 08:22 UTC  | 13:52 IST  |
| 13:47 UTC  | 19:17 IST  |
| 20:09 UTC  | 01:39 IST  |

Each run has a ~35% chance of skipping. In practice, you'll see **0–2 commits per day**,
distributed across different times — exactly like a real developer.

---

## What Gets Committed

| Task | File Location | Language |
|------|---------------|----------|
| GFG POTD (40%) | `gfg/YYYY-MM-DD_problem-name.{py/java/js}` | Python, Java, or JS (random) |
| Frontend (30%) | `frontend/YYYY-MM-DD_component.jsx` | React JSX |
| Backend (30%) | `backend/YYYY-MM-DD_service.js` | Node.js |

---

## Local Testing

```bash
# Validate all modules load correctly
node scripts/test.js

# Full dry run (needs a real API key)
GEMINI_API_KEY=your_key_here node scripts/index.js
```

---

## Customization

| Setting | Location | How to change |
|---------|----------|---------------|
| Skip probability | `scripts/index.js` line ~17 | Change `0.35` (higher = more skips) |
| Task weights | `scripts/generator.js` pickTask() | Adjust the 0.40 / 0.70 thresholds |
| Cron times | `.github/workflows/dev-activity.yml` | Edit cron expressions |
| GFG languages | `scripts/ai.js` GFG_LANGUAGES | Add/remove language entries |
| Frontend prompts | `scripts/ai.js` buildFrontendPrompt() | Add to the `components` array |
| Backend prompts | `scripts/ai.js` buildBackendPrompt() | Add to the `utilities` array |

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Workflow shows "skipped" | 35% chance — re-run manually |
| `GEMINI_API_KEY` error | Check secret name is exactly `GEMINI_API_KEY` |
| GFG fetch fails | Normal — falls back to AI-generated DSA problem |
| Push permission denied | Ensure `permissions: contents: write` is in the YAML |
| Empty file committed | The content guard should prevent this; file a bug |
