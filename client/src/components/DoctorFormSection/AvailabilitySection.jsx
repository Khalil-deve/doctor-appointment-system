import { Calendar, Clock, X } from "lucide-react";
import SelectInput from "../form/SelectInput";
import TextInput from "../form/TextInput";

const AvailabilitySection = ({
  formData,
  handleAvailabilityChange,
  addAvailability,
  removeAvailability,
  daysOfWeek,
  errors = {},
}) => {
  return (
    <>
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <Calendar className="w-5 h-5 mr-2 text-blue-600" />
        Availability
      </h2>
      {errors.availability && (
        <p className="text-red-500 text-sm mt-1">{errors.availability}</p>
      )}

      {formData.availability.map((slot, index) => (
        <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
            <SelectInput
              label="Day"
              value={slot.day}
              onChange={(e) =>
                handleAvailabilityChange(index, "day", e.target.value)
              }
              options={daysOfWeek.map((day) => ({ value: day, label: day }))}
            />

            <TextInput
              label="Time"
              value={slot.time}
              onChange={(e) =>
                handleAvailabilityChange(index, "time", e.target.value)
              }
              placeholder="9:00 AM - 5:00 PM"
              icon={Clock}
            />
          </div>
          {index > 0 && (
            <button
              type="button"
              onClick={() => removeAvailability(index)}
              className="text-red-500 hover:text-red-700 text-sm flex items-center"
            >
              <X className="w-4 h-4 mr-1" />
              Remove Time Slot
            </button>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={addAvailability}
        className="text-blue-600 hover:text-blue-800 flex items-center text-sm"
      >
        <Clock className="w-4 h-4 mr-1" />
        <span>Add Availability Slot</span>
      </button>
    </>
  );
};

export default AvailabilitySection;
