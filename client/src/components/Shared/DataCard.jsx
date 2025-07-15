export default function DataCard({ title, value, change, trend }) {
  const trendColors = {
    up: "text-green-600 bg-green-50",
    down: "text-red-600 bg-red-50",
    neutral: "text-gray-600 bg-gray-50",
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
      <p className="text-2xl font-bold my-2">{value}</p>
      <div className={`text-xs px-2 py-1 rounded-full inline-flex items-center ${trendColors[trend]}`}>
        {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"} {change}
      </div>
    </div>
  );
}