import React from "react";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex w-full max-w-220 flex-col gap-8 md:p-6">
        {children}
      </div>
    </div>
  );
};

export default Wrapper;
