# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Google Sheets booking submission

To save booking submissions into Google Sheets, create a `.env` file from `.env.example` and set `VITE_GOOGLE_SHEETS_WEBAPP_URL` to your Google Apps Script web app URL. Use the Apps Script endpoint, not the shared spreadsheet link.

The booking modal posts the booking payload to that endpoint on submit.
