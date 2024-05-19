"use client";
import React from "react";
import SkeletonInput from "antd/es/skeleton/Input";
import { Skeleton } from "antd";

export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-56 p-7">
        <SkeletonInput
          active
          block
        />
      </div>
      <div className="flex flex-wrap justify-center">
        <div className="w-[348px] h-[548px] sm:w-[548px] sm:h-[726px] relative m-4">
          <Skeleton.Node
            active
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
            }}
          />
        </div>
        <div className="w-[348px] h-[585px] sm:w-[448px] sm:h-[641px] relative m-4">
          <Skeleton.Node
            active
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
            }}
          />
        </div>
      </div>
    </div>
  );
}
