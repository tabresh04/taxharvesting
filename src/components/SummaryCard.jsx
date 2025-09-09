import React from "react";
const SummaryCard = ({ title, data, footer, theme }) => {
  return (
    <div
      className={`rounded-xl shadow-md p-6 w-full md:w-1/2 ${
        theme === "blue"
          ? "bg-gradient-to-br from-blue-500 to-blue-700 text-white"
          : "bg-white text-black dark:bg-gray-800 dark:text-white"
      }`}
    >
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <div className="grid grid-cols-3 gap-4 text-sm font-medium">
        <div></div>
        <div className="text-center">Short-term</div>
        <div className="text-center">Long-term</div>
        {data.map((item, idx) => (
          <React.Fragment key={idx}>
            <div>{item.label}</div>
            <div className="text-center">{item.short}</div>
            <div className="text-center">{item.long}</div>
          </React.Fragment>
        ))}
      </div>

      <div className="mt-6 font-semibold">
        <div>{footer.label} <span className="text-xl">{footer.value}</span></div>
        {footer.subtext && (
          <p className="text-sm mt-1">{footer.subtext}</p>
        )}
      </div>
    </div>
  );
};

export default SummaryCard;
