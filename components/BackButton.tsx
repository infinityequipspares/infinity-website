"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="mb-4 rounded-lg border border-gray-300 bg-white px-4 py-2 hover:bg-gray-100 transition"
    >
      ← Back
    </button>
  );
}