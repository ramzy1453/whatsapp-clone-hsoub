import React from "react";

export default function Loading() {
  return (
    <div className="flex pt-8 justify-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#00BFA6]"></div>
    </div>
  );
}
