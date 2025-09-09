#KoinX
# 🧾 Tax Loss Harvesting Dashboard

A responsive and interactive dashboard that helps users estimate potential tax savings by comparing capital gains **before and after harvesting**. Built using **React**, **Tailwind CSS**, and **Context API**.

## 🚀 Features

- 🌗 Theme toggle for Light/Dark mode
- 📊 Dynamic Holdings Table with asset selection
- 🔄 Real-time capital gains updates (Pre & Post Harvesting)
- 🧠 Global state managed using React Context
- ⚡ Clean, responsive UI with Tailwind CSS

Screenshot
Desktop-Light: ./src/assets/images/KoinX-Desktop-Light
Desktop-Dark: ./src/assets/images/KoinX-Desktop-Dark
Mobile-Dark: ./src/assets/images/KoinX-Mobile-Light
Mobile-Light: ./src/assets/images/KoinX-Mobile-Light


## 🧩 Folder Structure

src/
├── assets/
│ └── images/
├── components/
│ ├── context/
│ │ └── HarvestContext.jsx
│ ├── CapitalGainsCard.jsx
│ ├── Disclaimer.jsx
│ ├── HarvestSummary.jsx
│ ├── HoldingsTable.jsx
│ └── SummaryCard.jsx
├── pages/
│ └── TaxHarvesting.jsx
├── utils/
│ └── calculations.js
├── App.jsx
├── main.jsx
├── App.css
├── index.css

Created Using
git init
git remote add origin https://github.com/tabrsh04/KOINX.git
git add .
git commit -m "Initial commit"
git push -u origin main

npm run build
npm run deploy

Assumptions:

User understands basic tax harvesting concepts.

All financial data and crypto prices are mocked for demonstration.

Holdings and rates are static and not fetched from a live API.

Calculations are for visual purposes only, not actual tax advice.
