# FMLA Document Intelligence Prototype

[![Status](https://img.shields.io/badge/status-prototype-orange)](https://github.com/m-burns9203/fmla-ai-prototype)
[![License](https://img.shields.io/badge/license-MIT-blue)](#license)

AI-powered extraction of structured data from FMLA medical certification PDF forms — a proof-of-concept for automated HR compliance processing.

<img width="1920" height="885" alt="fmla-ai-proto-image" src="https://github.com/user-attachments/assets/35230a5d-0eaa-48bf-8cfa-e36a89978921" /> [App screenshot]


What it does
- Uploads a completed FMLA medical certification PDF.
- Uses Anthropic Claude Sonnet 4 to extract employee, leave, and medical data.
- Flags potential compliance issues (missing signatures/dates, incomplete fields).
- Presents structured data for downstream processing or HR review.

Features
- Drag-and-drop PDF upload UI
- AI-based extraction to structured JSON
- Compliance flagging
- Clean React + Tailwind UI for reviewers

Tech stack
- Frontend: Next.js 14, React, TypeScript, Tailwind CSS
- AI: Anthropic Claude Sonnet 4
- PDF processing: pdf-lib

Quick start

Prerequisites
- Node.js 18+ (or the version you use)
- Yarn, npm, or pnpm
- An Anthropic API key

Clone and run locally
```bash
git clone https://github.com/m-burns9203/fmla-ai-prototype.git
cd fmla-ai-prototype
# install
pnpm install    # or npm install / yarn
# add env variables (see .env.example)
cp .env.example .env.local
# run the dev server
pnpm dev
```

Configuration
- Create a `.env.local` file at project root and set the Anthropic API key. See `.env.example`.

.env.example
```
# Anthropic API Key - Get yours at https://console.anthropic.com
ANTHROPIC_API_KEY=sk-ant-xxxxx
```

Usage
1. Start the app (see Quick start).
2. Open the app in the browser.
3. Drag-and-drop a completed FMLA PDF into the upload area.
4. Review the parsed structured fields and compliance flags.
5. Export or integrate the JSON output as needed.

Example output (abbreviated)
```json
{
  "employee": {
    "name": "Jane Doe",
    "ssn_last4": "1234",
    "phone": "(555) 555-5555"
  },
  "leave": {
    "start_date": "2025-02-01",
    "end_date": "2025-04-01",
    "intermittent": false
  },
  "medical_provider": {
    "name": "Dr. John Smith",
    "signature_present": true,
    "date_signed": "2025-01-20"
  },
  "compliance_flags": ["missing_physician_phone"]
}
```

Security & privacy
- This prototype handles sensitive medical data. Do not deploy with real patient data without:
  - Proper security controls (TLS, environment secrets management)
  - Data retention and deletion policies
  - Legal review for HIPAA / company policies
- Never commit API keys or PHI to the repository. Use environment variables and secret stores for production.

Development
- Linting & formatting: add ESLint/Prettier if not present.
- Tests: add unit and integration tests for extraction logic (mock the AI response).
- Local mocking: consider a development mock for Anthropic responses to avoid consuming API quota.

Contributing
- Open issues for bugs or feature requests.
- Prefer small PRs that add one feature or fix one bug.
- Include tests and update docs where appropriate.

License
- MIT — see LICENSE file.

Acknowledgments
- Built for Dartmouth CS98 Hack-a-Thing assignment
- FMLA forms from U.S. Department of Labor
- AI powered by Anthropic Claude Sonnet 4
- UI framework by Next.js and Tailwind CSS

Contact
- Maintainer: m-burns9203 (GitHub)
