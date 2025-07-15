import ArrayInput from '../form/ArrayInput';
import { GraduationCap } from 'lucide-react';

const EducationSection = ({ 
  formData, 
  handleArrayChange, 
  addArrayField, 
  removeArrayField, 
  errors 
}) => {
  return (
    <>
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <GraduationCap className="w-5 h-5 mr-2 text-blue-600" />
        Education & Qualifications
      </h2>
      
      <ArrayInput
        values={formData.education}
        onChange={(index, value) => handleArrayChange('education', index, value)}
        onAdd={() => addArrayField('education')}
        onRemove={(index) => removeArrayField('education', index)}
        placeholder="MD - Harvard Medical School"
        error={errors.education}
      />
    </>
  );
};

export default EducationSection;