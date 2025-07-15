import { Languages, DollarSign } from 'lucide-react';
import ArrayInput from '../form/ArrayInput';
import TextInput from '../form/TextInput';

const AdditionalInfoSection = ({ 
  formData, 
  handleArrayChange, 
  addArrayField, 
  removeArrayField, 
  handleChange,
  errors,
  className = '' 
}) => {
  return (
    <div className={className}>
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <Languages className="w-5 h-5 mr-2 text-blue-600" />
        Additional Information
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <ArrayInput
            label="Languages Spoken"
            values={formData.languages}
            onChange={(index, value) => handleArrayChange('languages', index, value)}
            onAdd={() => addArrayField('languages')}
            onRemove={(index) => removeArrayField('languages', index)}
            placeholder="English"
          />
        </div>

        <div>
          <ArrayInput
            label="Services Offered*"
            values={formData.services}
            onChange={(index, value) => handleArrayChange('services', index, value)}
            onAdd={() => addArrayField('services')}
            onRemove={(index) => removeArrayField('services', index)}
            placeholder="Cardiac Consultation"
            error={errors.services}
          />
        </div>
      </div>

      <div className="mt-6">
        <TextInput
          label="Consultation Fee (USD)*"
          name="consultationFee"
          value={formData.consultationFee}
          onChange={handleChange}
          placeholder="150"
          error={errors.consultationFee}
          icon={DollarSign}
          type="number"
        />
      </div>
    </div>
  );
};

export default AdditionalInfoSection;