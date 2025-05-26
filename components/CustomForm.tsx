import React from "react";
import InputField from "@/components/InputField"; // Adjust path if needed

interface CustomFormProps {
  formData: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleArrayChange: (
    field: "keyFeatures" | "techStack",
    index: number,
    value: string
  ) => void;
  addArrayField: (field: "keyFeatures" | "techStack") => void;
  removeArrayField: (field: "keyFeatures" | "techStack", index: number) => void;
  onSubmit: (formData: any) => void; // Received from parent
}

const CustomForm: React.FC<CustomFormProps> = ({
  formData,
  onChange,
  onFileChange,
  handleArrayChange,
  addArrayField,
  removeArrayField,
  onSubmit,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData); // Call the onSubmit function passed from the parent
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Basic Fields */}
      <InputField
        label="Project Name"
        name="projectName"
        value={formData.projectName}
        onChange={onChange}
      />
      <InputField
        label="Tagline"
        name="tagline"
        value={formData.tagline}
        onChange={onChange}
      />
      <InputField
        label="Team Name"
        name="teamName"
        value={formData.teamName}
        onChange={onChange}
      />
      <InputField
        label="Hackathon Name"
        name="hackathonName"
        value={formData.hackathonName}
        onChange={onChange}
      />
      <InputField
        label="Theme/Category"
        name="themeCategory"
        value={formData.themeCategory}
        onChange={onChange}
      />

      {/* File Uploads */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-500">Logo</label>
          <input
            type="file"
            name="logo"
            accept="image/*"
            onChange={onFileChange}
            className="file-input"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-500">MVP Screenshot</label>
          <input
            type="file"
            name="mvpScreenshot"
            accept="image/*"
            onChange={onFileChange}
            className="file-input"
          />
        </div>
      </div>

      {/* Problem Statement */}
      <div>
        <label className="block text-sm text-gray-500">Problem Statement / Case Study</label>
        <textarea
          name="problemStatement"
          placeholder="Problem Statement / Case Study"
          value={formData.problemStatement}
          onChange={onChange}
          className="textarea-field"
        />
      </div>

      {/* Solution and USP */}
      <div>
        <InputField
          label="Solution and USP"
          name="solutionUSP"
          value={formData.solutionUSP}
          onChange={onChange}
        />
      </div>

      {/* Key Features */}
      <div>
        <label>Key Features</label>
        {formData.keyFeatures.map((feature: string, index: number) => (
          <div key={index} className="flex gap-2">
            <InputField
              label={`Feature ${index + 1}`}
              name={`keyFeatures-${index}`}
              value={feature}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleArrayChange("keyFeatures", index, e.target.value)
              }
            />
            <button
              type="button"
              onClick={() => removeArrayField("keyFeatures", index)}
              className="text-red-500"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayField("keyFeatures")}
          className="text-blue-500"
        >
          Add Feature
        </button>
      </div>

      {/* Tech Stack */}
      <div>
        <label>Tech Stack</label>
        {formData.techStack.map((tech: string, index: number) => (
          <div key={index} className="flex gap-2">
            <InputField
              label={`Tech ${index + 1}`}
              name={`techStack-${index}`}
              value={tech}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleArrayChange("techStack", index, e.target.value)
              }
            />
            <button
              type="button"
              onClick={() => removeArrayField("techStack", index)}
              className="text-red-500"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayField("techStack")}
          className="text-blue-500"
        >
          Add Tech
        </button>
      </div>

      {/* Submit Button */}
      <button type="submit" className="btn-primary">
        Submit
      </button>
    </form>
  );
};

export default CustomForm;
