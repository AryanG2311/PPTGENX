"use client";

import React, { useState } from "react";
import CustomForm from "@/components/CustomForm"; // Adjust the path if needed

const CustomPage: React.FC = () => {
  // Manage form data and handlers in the parent
  const [formData, setFormData] = useState({
    projectName: "",
    tagline: "",
    teamName: "",
    hackathonName: "",
    themeCategory: "",
    logo: null as File | null,
    problemStatement: "",
    solutionUSP: "", // Single field for Solution and USP
    keyFeatures: [""], // Allow at least one key feature
    techStack: [""], // Allow at least one tech stack item
    mvpScreenshot: null as File | null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files) {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    }
  };

  const handleArrayChange = (
    field: "keyFeatures" | "techStack",
    index: number,
    value: string
  ) => {
    const updatedArray = [...formData[field]];
    updatedArray[index] = value;
    setFormData((prev) => ({
      ...prev,
      [field]: updatedArray,
    }));
  };

  const addArrayField = (field: "keyFeatures" | "techStack") => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const removeArrayField = (field: "keyFeatures" | "techStack", index: number) => {
    const updatedArray = formData[field].filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      [field]: updatedArray,
    }));
  };

  // 🔥 API Integration for form submission
  const handleSubmit = async () => { // Removed (e: React.FormEvent)
    try {
      const response = await fetch("/api/custom", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const result = await response.json();
      console.log("API Response:", result);
  
      if (response.ok) {
        console.log("✅ PPT Generation Successful:", result);
      } else {
        console.error("❌ PPT Generation Failed:", result.error);
      }
    } catch (error) {
      console.error("⚠️ API Request Error:", error);
    }
  };
  

  return (
    <div>
      <h1>Custom Form</h1>
      <CustomForm
        formData={formData}
        onChange={handleChange}
        onFileChange={handleFileChange}
        handleArrayChange={handleArrayChange}
        addArrayField={addArrayField}
        removeArrayField={removeArrayField}
        onSubmit={handleSubmit} // Pass the API-integrated handleSubmit function
      />
    </div>
  );
};

export default CustomPage;
