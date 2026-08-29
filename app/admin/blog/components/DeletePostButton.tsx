"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type DeletePostButtonProps = {
  postId: string;
  title: string;
};

export default function DeletePostButton({
  postId,
  title,
}: DeletePostButtonProps) {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleDelete() {
    const confirmed =
      window.confirm(
        `Da li ste sigurni da želite da obrišete "${title}"?`
      );

    if (!confirmed) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response =
        await fetch(
          `/admin/blog/${postId}/delete`,
          {
            method: "DELETE",
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Brisanje blog objave nije uspelo."
        );
      }

      router.refresh();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Brisanje blog objave nije uspelo."
      );

      setLoading(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleDelete}
        disabled={loading}
        className="rounded-lg border border-red-200 bg-white px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading
          ? "Brisanje..."
          : "Obriši"}
      </button>

      {error && (
        <p className="mt-2 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}