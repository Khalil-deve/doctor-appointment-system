import {Icon} from "lucide-react";

const TextInput = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  icon: Icon,
  type = "text",
  className = "",
}) => {
  return (
    <div className={`form-group ${className}`}>
      {label && <label className="block text-gray-700 mb-2">{label}</label>}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="text-gray-400 w-5 h-5" />
          </div>
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full ${
            Icon ? "pl-10" : "pl-4"
          } pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default TextInput;
