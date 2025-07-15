import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export default function ResponsiveTable({
  headers,
  data,
  renderRow,
  sortable = {},
  className = "",
}) {
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc",
  });

  const [expandedRow, setExpandedRow] = useState(null);

  // Sort data if sortable columns exist
  const sortedData = [...data];
  if (sortConfig.key) {
    sortedData.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }

  // Toggle sort direction
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Mobile row click handler
  const toggleRowExpand = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  // Get the value for a header from the item
  const getItemValue = (item, header) => {
    // Map headers to item properties
    const headerMap = {
      User: "name",
      Email: "email",
      Role: "role",
      Status: "status",
    };

    const property = headerMap[header] || header.toLowerCase();
    return item[property] || "—";
  };
  console.log("the renderRow is: ", renderRow);
  return (
    <div
      className={`overflow-hidden rounded-lg border border-gray-200 ${className}`}
    >
      {/* Desktop Table (always visible) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  scope="col"
                  className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                    sortable[header] ? "cursor-pointer hover:bg-gray-100" : ""
                  }`}
                  onClick={() =>
                    sortable[header] && requestSort(sortable[header])
                  }
                >
                  <div className="flex items-center">
                    {header}
                    {sortConfig.key === sortable[header] && (
                      <span className="ml-1">
                        {sortConfig.direction === "asc" ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedData.map((item, index) => (
              <tr key={index}>{renderRow(item, index)}</tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards (visible on small screens) */}
      <div className="md:hidden space-y-3 p-3">
        {sortedData.map((item, index) => (
          <div
            key={index}
            className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all ${
              expandedRow === index ? "ring-1 ring-blue-300" : ""
            }`}
          >
            {/* Primary mobile row */}
            <div
              className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => toggleRowExpand(index)}
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {item.name || `Item ${index + 1}`}
                </p>
                <p className="text-xs text-gray-500 truncate mt-1">
                  {item.email || item.role || "Additional info"}
                </p>
              </div>
              <div className="ml-2 flex-shrink-0 flex items-center">
                {expandedRow === index ? (
                  <ChevronUp className="h-4 w-4 text-gray-500" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                )}
              </div>
            </div>

            {/* Expanded content */}
            {expandedRow === index && (
              <div className="px-4 pb-4 pt-2 border-t border-gray-100 bg-gray-50/50">
                <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                  {headers.map((header, i) => {
                    if (header === "User" || header === "Email") return null;

                    // Extract just the value for mobile view
                    const value = getItemValue(item, header);
                    if (header === "Actions") return null;

                    return (
                      <div key={i} className="break-words">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {header}
                        </p>
                        <p
                          className={`w-1/2 px-2 py-1 rounded-full text-xs mt-1
                          ${
                            value === "Active"
                              ? "bg-green-100 text-green-800"
                              : value === "Inactive"
                              ? "bg-gray-100 text-gray-800"
                              : value === "Doctor"
                              ? "bg-purple-100 text-purple-800"
                              : value === "Admin"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-blue-100 text-blue-800"
                          }
                          `}
                        >
                          {value}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Render just the action buttons from renderRow */}
                <div className="mt-4 flex justify-end space-x-3">
                  <button
                    className="px-3 py-1.5 text-sm bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100"
                    onClick={() => console.log("Edit", item)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-3 py-1.5 text-sm bg-red-50 text-red-600 rounded-md hover:bg-red-100"
                    onClick={() => console.log("Delete", item)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty state */}
      {data.length === 0 && (
        <div className="p-8 text-center text-gray-500 bg-white">
          No data available
        </div>
      )}
    </div>
  );
}
