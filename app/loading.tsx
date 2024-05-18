import React from "react";
import SkeletonInput from "antd/es/skeleton/Input";

export default function Loading() {
  return (
    <div className="h-screen flex flex-col justify-between">
      <div className="p-5 flex flex-1 justify-center items-center">
        <div className="w-8/12">
          <SkeletonInput
            active
            block
          />
        </div>
      </div>
      <div className="p-5 h-28">
        <SkeletonInput
          active
          block
        />
      </div>
    </div>
  );
}
