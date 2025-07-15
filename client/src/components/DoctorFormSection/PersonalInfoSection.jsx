import TextInput from "../form/TextInput";
import SelectInput from "../form/SelectInput";
import TextareaInput from "../form/TextareaInput";
import { User, BriefcaseMedical } from "lucide-react";

const PersonalInfoSection = ({
  formData,
  handleChange,
  errors,
  specializations,
}) => {
  return (
    <>
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <User className="w-5 h-5 mr-2 text-blue-600" />
        Basic Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectInput
          label="Specialization*"
          name="specialization"
          value={formData.specialization}
          onChange={handleChange}
          options={[
            { value: "", label: "Select Specialization" },
            ...specializations.map((spec) => ({ value: spec, label: spec })),
          ]}
          error={errors.specialization}
        />

        <TextInput
          label="Years of Experience*"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          placeholder="12 years"
          error={errors.experience}
          icon={BriefcaseMedical}
        />
      </div>

      <TextareaInput
        label="About*"
        name="about"
        value={formData.about}
        onChange={handleChange}
        placeholder="Brief description about the doctor..."
        error={errors.about}
        className="mt-6"
      />
    </>
  );
};

export default PersonalInfoSection;
