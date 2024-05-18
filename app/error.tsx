"use client"; // Error components must be Client Components

import { useEffect } from "react";
import ErrorComponent from "./ui/ErrorComponent";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorComponent
      reset={reset}
      error={error}
    />
  );
}
