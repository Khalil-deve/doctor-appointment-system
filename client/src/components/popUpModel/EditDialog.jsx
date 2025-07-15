import { Dialog } from "@headlessui/react";

const EditDialog = ({
  isOpen,
  onClose,
  onSubmit,
  formData,
  setFormData,
  availableSlots,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen px-4">
        <Dialog.Panel className="bg-white p-6 rounded-xl shadow-xl max-w-md w-full">
          <Dialog.Title className="text-lg font-bold mb-4">
            Edit Appointment
          </Dialog.Title>

          {/* Date Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Select Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded mt-1"
            />
          </div>

          {/* Time Slot Dropdown */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Select Time Slot
            </label>
            <select
              name="timeSlot"
              value={JSON.stringify(formData.timeSlot)}
              onChange={(e) => {
                const selectedSlot = JSON.parse(e.target.value);
                setFormData((prev) => ({
                  ...prev,
                  timeSlot: selectedSlot,
                }));
              }}
              className="w-full border px-3 py-2 rounded mt-1"
            >
              <option value="">Choose time slot</option>
              {availableSlots.map((slot, index) => (
                <option key={index} value={JSON.stringify(slot)}>
                  {slot.day} - {slot.time}
                </option>
              ))}
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={onSubmit}
              disabled={!formData.date || !formData.timeSlot}
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              Save
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default EditDialog;
