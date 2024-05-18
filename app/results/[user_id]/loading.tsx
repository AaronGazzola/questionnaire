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
        <Skeleton.Node style={{ width: 548, height: 726, margin: "1rem" }} />
        <Skeleton.Node style={{ width: 448, height: 641, margin: "1rem" }} />
      </div>
    </div>
  );
}
