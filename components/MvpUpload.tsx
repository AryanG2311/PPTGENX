import React from 'react';

interface MvpUploadProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MvpUpload: React.FC<MvpUploadProps> = ({ onChange }) => {
  return (
   <div className="relative mb-6">
  <input
    type="file"
    id="mvpScreenshot"
    name="mvpScreenshot"
    accept="image/*"
    onChange={onChange}
    className="peer block w-full text-sm text-gray-500 
               file:mr-4 file:py-2 file:px-4
               file:rounded-lg file:border-0
               file:text-sm file:font-semibold
               file:bg-blue-50 file:text-blue-700
               hover:file:bg-blue-100
               border border-gray-300 rounded-lg bg-white px-4 py-3 pt-5"
  />
  <label
    htmlFor="mvpScreenshot"
    className="absolute left-4 top-2.5 text-sm text-gray-500 transition-all duration-200 transform 
      scale-75 -translate-y-2 origin-[0] 
      peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-3 
      peer-focus:scale-75 peer-focus:-translate-y-2"
  >
    MVP Screenshot <span className="text-red-400">*</span>
  </label>
</div>
  );
};

export default MvpUpload;
