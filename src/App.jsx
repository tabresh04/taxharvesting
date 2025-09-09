import React, { useState, useEffect } from "react";
import TaxHarvesting from "./pages/TaxHarvesting";
import HarvestSummary from "./components/HarvestSummary";
import Disclaimer from "./components/Disclaimer";
import koinxLogo from "./logo.png";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <>

    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 shadow-md p-4">
    <div className="container mx-auto flex justify-between items-center">
    <img 
      src={koinxLogo} 
      alt="Koinx Logo" 
      className="h-10 w-auto"
    />
    
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center gap-2"
    >
      {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
    </button>
    </div> 
    </nav>

      {/* Main Content */}
<div className="pt-24 px-4">
  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-6">
    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
      Tax Harvesting
    </h1>
    
    <div className="relative group">
      <a href="#" className="text-blue-600 hover:underline dark:text-blue-400">
        How it works?
      </a>
      
      <div className="absolute left-0 sm:left-auto sm:right-0 top-full mt-2 w-72 sm:w-80 px-4 py-3 bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-gray-200 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
        <ul className="list-disc pl-5 space-y-1">
          <li>Toggle between light and dark themes using the switch.</li>
          <li>Holdings Table displays your crypto assets with checkboxes.</li>
          <li>Select assets to "harvest" and view Pre/Post Harvesting data.</li>
          <li>Capital gains are calculated based on the selected context.</li>
          <li>All changes reflect live using React Context API.</li>
        </ul>
      </div>
    </div>
  </div>


     <Disclaimer />

        <div className="space-y-6 pb-8">
          <HarvestSummary />
          <TaxHarvesting />
        </div>
      </div>
    </div>

    </>
  );
}

export default App;