import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const PatientForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    dateOfBirth: null,
    bloodGroup: '',
    allergies: [],
    newAllergy: '',
    medicalHistory: [],
    newMedicalHistory: ''
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.dateOfBirth) {
      errs.dateOfBirth = 'Date of Birth is required';
    } else if (new Date(formData.dateOfBirth) > new Date()) {
      errs.dateOfBirth = 'Date of Birth cannot be in the future';
    }
    return errs;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddAllergy = () => {
    if (formData.newAllergy.trim()) {
      setFormData({
        ...formData,
        allergies: [...formData.allergies, formData.newAllergy.trim()],
        newAllergy: ''
      });
    }
  };

  const handleRemoveAllergy = (index) => {
    const updated = [...formData.allergies];
    updated.splice(index, 1);
    setFormData({ ...formData, allergies: updated });
  };

  const handleAddMedicalHistory = () => {
    if (formData.newMedicalHistory.trim()) {
      setFormData({
        ...formData,
        medicalHistory: [...formData.medicalHistory, formData.newMedicalHistory.trim()],
        newMedicalHistory: ''
      });
    }
  };

  const handleRemoveMedicalHistory = (index) => {
    const updated = [...formData.medicalHistory];
    updated.splice(index, 1);
    setFormData({ ...formData, medicalHistory: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setIsSubmitting(true);
    setServerError('');
    try {
      const payload = {
        dateOfBirth: formData.dateOfBirth,
        bloodGroup: formData.bloodGroup,
        allergies: formData.allergies,
        medicalHistory: formData.medicalHistory
      };

      // Send the data to the server

      const response = await axios.post('/api/patients', payload, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.status === 200 || response.status === 201) {
        navigate('/patient/dashboard');
      }
    } catch (error) {
      setServerError(error.response?.data?.message || 'Failed to save patient information');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow rounded-lg p-6 sm:p-8">
        <h2 className="text-2xl font-bold mb-6">Complete Your Patient Profile</h2>

        {serverError && <p className="text-red-600 mb-4">{serverError}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Date of Birth *</label>
            <DatePicker
              selected={formData.dateOfBirth}
              onChange={(date) => setFormData({ ...formData, dateOfBirth: date })}
              dateFormat="yyyy-MM-dd"
              className="w-full border px-3 py-2 rounded-md"
              maxDate={new Date()}
              placeholderText="Select your date of birth"
            />
            {errors.dateOfBirth && <p className="text-sm text-red-600">{errors.dateOfBirth}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Blood Group</label>
            <select
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md"
            >
              <option value="">Select</option>
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                <option key={bg} value={bg}>{bg}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Allergies</label>
            <div className="flex mt-1">
              <input
                type="text"
                name="newAllergy"
                value={formData.newAllergy}
                onChange={handleChange}
                className="flex-1 border rounded-l-md px-3 py-2"
                placeholder="Add an allergy"
              />
              <button type="button" onClick={handleAddAllergy} className="bg-gray-100 border px-4 rounded-r-md">Add</button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {formData.allergies.map((item, idx) => (
                <span key={idx} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                  {item}
                  <button type="button" onClick={() => handleRemoveAllergy(idx)} className="ml-2 text-blue-500">&times;</button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Medical History</label>
            <div className="flex mt-1">
              <input
                type="text"
                name="newMedicalHistory"
                value={formData.newMedicalHistory}
                onChange={handleChange}
                className="flex-1 border rounded-l-md px-3 py-2"
                placeholder="Add a condition"
              />
              <button type="button" onClick={handleAddMedicalHistory} className="bg-gray-100 border px-4 rounded-r-md">Add</button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {formData.medicalHistory.map((item, idx) => (
                <span key={idx} className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                  {item}
                  <button type="button" onClick={() => handleRemoveMedicalHistory(idx)} className="ml-2 text-green-500">&times;</button>
                </span>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            {isSubmitting ? 'Saving...' : 'Save Profile'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PatientForm;
