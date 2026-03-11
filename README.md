## Resume Builder

As a computer science student I applied to a lot of roles with a pretty average resume. Most resume builders I tried felt clunky, paywalled, or over‑designed, so I decided to build my own and tune it for what actually worked in my own applications.

This project is that tool: a **single‑page, ATS‑friendly resume builder** with tight typography, recruiter‑oriented analysis tools, and an AI import workflow so you can go from raw background text to a polished resume quickly.

---

## Running the project locally

### Prerequisites
- **Node.js** (v18+ recommended)
- **npm** (comes with Node)

### Install and run
From the project root (the folder that contains `package.json`):

```bash
# 1) Go into the project folder (this is critical – npm needs to see package.json)
cd /Users/ethanwong/resumeBuilder/Resume-Builder

# 2) Install dependencies
npm install

# 3) Start the dev server
npm run dev
```

Then open the URL that Vite prints in your terminal (usually `http://localhost:5173`) in your browser.

To build a production bundle:

```bash
npm run build
npm run preview
```

---

## How to use the app

### 1. Fill out your resume manually
- Use the panels on the left to edit:
  - Contact details
  - Experience
  - Projects
  - Education
  - Skills and other sections
- The preview on the right updates live and always stays:
  - Single‑column
  - Table‑free
  - ATS‑safe fonts and headings

### 2. Use the AI Import (optional)

The AI Import feature lets you paste structured JSON and have the app populate all sections for you.

- Open the **AI Import** tab in the editor.
- Paste JSON that follows the schema below.
- The importer:
  - Parses the JSON and maps it into the internal store shape.
  - Fills `contact` from `basics`.
  - Builds `experience`, `education`, `projects`, `skills`, `certifications`, `leadership`, and `publications`, generating IDs and bullets.
  - Uses the `setResume` action in the Zustand store so things like section order and visibility are preserved.

### 3. Exporting a resume for recruiters

- Use the **Export / Download** action in the UI to generate a PDF.
- The generator:
  - Keeps the layout to a single page.
  - Uses clean, dark text on a white background.
  - Avoids graphics and tables so ATS systems can parse it.

This is what I personally send out to recruiters, so the defaults are tuned to look clean on screen and on paper, without looking like a generic template site.

---

## Copy/paste prompt text for users of the AI Import

You are a resume data formatter.

Your job is to take messy, free-form information about a person's professional background and convert it into STRICTLY VALID JSON that matches EXACTLY the schema below. This JSON will be pasted into a resume builder that will automatically fill out their resume.

IMPORTANT FORMAT RULES:
- Respond with JSON ONLY.
- Do NOT include explanations, prose, or markdown.
- Do NOT wrap the JSON in backticks.
- Always include all top-level keys, even if some are empty.
- Use empty strings "" or empty arrays [] when information is missing.
- Dates MUST be strings in the format "YYYY-MM".
- If something is ongoing (current job, current project, current education), set "end_date": null and "is_current": true where applicable.

JSON SCHEMA (use these keys exactly):

{
  "basics": {
    "full_name": "",
    "headline": "",
    "location": "",
    "email": "",
    "phone": "",
    "linkedin": "",
    "github": "",
    "portfolio": ""
  },
  "experiences": [
    {
      "company": "",
      "title": "",
      "location": "",
      "start_date": "YYYY-MM",
      "end_date": "YYYY-MM or null",
      "is_current": false,
      "summary": "",
      "highlights": [
        "Impact-focused bullet",
        "Another impact-focused bullet"
      ],
      "technologies": [
        "Tech1",
        "Tech2"
      ]
    }
  ],
  "education": [
    {
      "institution": "",
      "degree": "",
      "field_of_study": "",
      "location": "",
      "start_date": "YYYY-MM",
      "end_date": "YYYY-MM or null",
      "gpa": "",
      "honors": "",
      "relevant_courses": ""
    }
  ],
  "skills": {
    "languages": [],
    "frameworks": [],
    "tools": [],
    "platforms": [],
    "other": []
  },
  "projects": [
    {
      "name": "",
      "role": "",
      "link": "",
      "start_date": "YYYY-MM",
      "end_date": "YYYY-MM or null",
      "summary": "",
      "highlights": [],
      "technologies": []
    }
  ],
  "certifications": [
    {
      "name": "",
      "issuer": "",
      "date": "YYYY-MM"
    }
  ],
  "leadership": [
    {
      "role": "",
      "organization": "",
      "start_date": "YYYY-MM",
      "end_date": "YYYY-MM or null",
      "highlights": []
    }
  ],
  "publications": [
    {
      "title": "",
      "venue": "",
      "date": "YYYY-MM",
      "link": ""
    }
  ]
}

MAPPING NOTES:
- "experiences[*].highlights" should be concise, impact-focused bullet points suitable for a resume.
- "projects[*].highlights" should describe concrete achievements or outcomes.
- "skills" arrays should contain short skill names/phrases, not sentences.

Now, here is the person's raw background. Convert it into JSON using the schema above and the formatting rules.

RAW BACKGROUND:
[PASTE YOUR INFORMATION HERE]
