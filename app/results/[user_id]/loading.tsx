import React from "react";
import SkeletonInput from "antd/es/skeleton/Input";
import SkeletokButton from "antd/es/skeleton/Button";

export default function Loading() {
  return (
    <div className="h-screen flex flex-col justify-between">
      <div className="p-5 flex flex-col flex-1 justify-center items-center space-y-5">
        <div className="w-10/12">
          <SkeletonInput
            active
            block
          />
        </div>
        <div className="w-8/12 sm:w-96">
          <SkeletonInput
            active
            block
          />
        </div>
      </div>
      <div className="flex justify-between p-4">
        <SkeletokButton active />
        <SkeletokButton active />
      </div>
    </div>
  );
}
