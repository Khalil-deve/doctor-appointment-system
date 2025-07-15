import TextInput from '../form/TextInput';
import { MapPin, Phone } from 'lucide-react';

const ContactInfoSection = ({ formData, handleChange, errors, className = '' }) => {
  return (
    <div className={className}>
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <Phone className="w-5 h-5 mr-2 text-blue-600" />
        Contact Information
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TextInput
          label="Location*"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="123 Medical Center Drive, Boston, MA"
          error={errors.location}
          icon={MapPin}
        />

        <TextInput
          label="Phone*"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="(555) 123-4567"
          error={errors.phone}
          icon={Phone}
          type="tel"
        />
      </div>
    </div>
  );
};

export default ContactInfoSection;