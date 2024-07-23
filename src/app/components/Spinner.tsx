// components/Spinner.tsx
import React from "react";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-gradient-to-r from-blue-300 via-pink-400 to-yellow-400"></div>
    </div>
  );
};

export default Spinner;
