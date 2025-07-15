import { X } from 'lucide-react';

const ArrayInput = ({
  label,
  values,
  onChange,
  onAdd,
  onRemove,
  placeholder,
  error,
  className = ''
}) => {
  return (
    <div className={`form-group ${className}`}>
      {label && <label className="block text-gray-700 mb-2">{label}</label>}
      
      {values.map((value, index) => (
        <div key={index} className="mb-2 flex items-center">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(index, e.target.value)}
            placeholder={placeholder}
            className={`flex-grow px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              error && error[`${index}`] ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {index > 0 && (
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="ml-2 p-2 text-red-500 hover:text-red-700"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      ))}
      
      <button
        type="button"
        onClick={onAdd}
        className="text-blue-600 hover:text-blue-800 flex items-center text-sm mt-2"
      >
        <span className="mr-1">+ Add Item</span>
      </button>
    </div>
  );
};

export default ArrayInput;