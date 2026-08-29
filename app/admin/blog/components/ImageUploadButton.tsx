"use client";

import { useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type ImageUploadButtonProps = {
  onUpload: (url: string) => void;
};

export default function ImageUploadButton({
  onUpload,
}: ImageUploadButtonProps) {
  const supabase = createClient();

  const inputRef = useRef<HTMLInputElement>(null);

  const [uploading, setUploading] = useState(false);

  async function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    try {
      setUploading(true);

      // ==========================================
      // CHECK FILE TYPE
      // ==========================================

      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp",
      ];

      if (!allowedTypes.includes(file.type)) {
        throw new Error(
          "Only JPG, PNG and WebP images are allowed."
        );
      }

      // ==========================================
      // CHECK FILE SIZE
      // ==========================================

      const maxSize = 5 * 1024 * 1024;

      if (file.size > maxSize) {
        throw new Error(
          "Image must be smaller than 5MB."
        );
      }

      // ==========================================
      // CHECK USER
      // ==========================================

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error(
          "You must be logged in."
        );
      }

      // ==========================================
      // CREATE UNIQUE FILE NAME
      // ==========================================

      const fileExtension =
        file.name.split(".").pop()?.toLowerCase() ||
        "jpg";

      const fileName =
        `${crypto.randomUUID()}.${fileExtension}`;

      const filePath =
        `content/${user.id}/${fileName}`;

      // ==========================================
      // UPLOAD
      // ==========================================

      const {
        error: uploadError,
      } = await supabase.storage
        .from("blog")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
          contentType: file.type,
        });

      if (uploadError) {
        throw new Error(
          `Image upload failed: ${uploadError.message}`
        );
      }

      // ==========================================
      // GET PUBLIC URL
      // ==========================================

      const {
        data: publicUrlData,
      } = supabase.storage
        .from("blog")
        .getPublicUrl(filePath);

      const publicUrl =
        publicUrlData.publicUrl;

      if (!publicUrl) {
        throw new Error(
          "Could not generate image URL."
        );
      }

      // ==========================================
      // SEND URL TO EDITOR
      // ==========================================

      onUpload(publicUrl);
    } catch (error) {
      console.error(
        "Image upload error:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "Image upload failed."
      );
    } finally {
      setUploading(false);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }

  return (
    <>
      <button
        type="button"
        disabled={uploading}
        onClick={() =>
          inputRef.current?.click()
        }
        className="rounded-md bg-white px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {uploading
          ? "Uploading..."
          : "🖼️ Image"}
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={handleFileChange}
      />
    </>
  );
}