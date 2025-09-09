import React from "react";
import { useState } from "react";

function Disclaimer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-8 max-w-2xl mx-auto">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 text-left bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      >
        <span className="font-medium text-gray-900 dark:text-white">
          ! Important Notes & Disclaimers
        </span>
        <svg
          className={`w-5 h-5 text-gray-500 transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      
      {isOpen && (
<div className="px-4 py-3 mt-2 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300 text-sm">
  <p className="mb-2">• This tool is for informational purposes only and not financial advice.</p>
  <p className="mb-2">• Consult a certified tax advisor before making any investment decisions.</p>
  <p className="mb-2">• All calculations are estimates and may not reflect actual tax liabilities.</p>
  <p>• KoinX is not responsible for any financial losses based on the output of this tool.</p>
</div>

      )}
    </div>
  );
}

export default Disclaimer;