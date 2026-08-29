"use client";

import { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import ImageUploadButton from "./ImageUploadButton";

type RichTextEditorProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Write your article here...",
}: RichTextEditorProps) {
  const editor = useEditor({
 extensions: [
  StarterKit,
  Underline,
  Image,
  Link.configure({
    openOnClick: false,
    autolink: true,
    defaultProtocol: "https",
  }),
],

    content: value,

    immediatelyRender: false,

    editorProps: {
      attributes: {
        class:
          "prose prose-lg max-w-none min-h-[300px] px-5 py-4 outline-none",
        dir: "auto",
      },
    },

    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) return;

    const currentContent = editor.getHTML();

    if (
      value !== currentContent &&
      value !== ""
    ) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!editor) {
    return (
      <div className="min-h-[300px] rounded-b-xl border border-gray-300 bg-white p-5 text-gray-400">
        Loading editor...
      </div>
    );
  }

  // ==========================================
  // LINK
  // ==========================================

 function setLink() {
  if (!editor) return;

  const previousUrl =
    editor.getAttributes("link").href;

  const url = window.prompt(
    "Enter URL",
    previousUrl || "https://"
  );

  if (url === null) {
    return;
  }

  if (url === "") {
    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .unsetLink()
      .run();

    return;
  }

  editor
    .chain()
    .focus()
    .extendMarkRange("link")
    .setLink({
      href: url,
    })
    .run();
}
  // ==========================================
  // RENDER
  // ==========================================

  return (
    <div className="overflow-hidden rounded-xl border border-gray-300 bg-white">

      {/* TOOLBAR */}

      <div className="flex flex-wrap gap-1 border-b border-gray-200 bg-gray-50 p-2">

        {/* BOLD */}

        <button
          type="button"
          onClick={() => {
            editor
              .chain()
              .focus()
              .toggleBold()
              .run();
          }}
          className={`rounded-md px-3 py-2 text-sm font-bold transition ${
            editor.isActive("bold")
              ? "bg-gray-900 text-white"
              : "bg-white text-gray-700 hover:bg-gray-200"
          }`}
        >
          B
        </button>

        {/* ITALIC */}

        <button
          type="button"
          onClick={() => {
            editor
              .chain()
              .focus()
              .toggleItalic()
              .run();
          }}
          className={`rounded-md px-3 py-2 text-sm italic transition ${
            editor.isActive("italic")
              ? "bg-gray-900 text-white"
              : "bg-white text-gray-700 hover:bg-gray-200"
          }`}
        >
          I
        </button>

        {/* UNDERLINE */}

        <button
          type="button"
          onClick={() => {
            editor
              .chain()
              .focus()
              .toggleUnderline()
              .run();
          }}
          className={`rounded-md px-3 py-2 text-sm underline transition ${
            editor.isActive("underline")
              ? "bg-gray-900 text-white"
              : "bg-white text-gray-700 hover:bg-gray-200"
          }`}
        >
          U
        </button>

        <div className="mx-1 w-px bg-gray-300" />

        {/* H2 */}

        <button
          type="button"
          onClick={() => {
            editor
              .chain()
              .focus()
              .toggleHeading({
                level: 2,
              })
              .run();
          }}
          className={`rounded-md px-3 py-2 text-xs font-semibold transition ${
            editor.isActive("heading", {
              level: 2,
            })
              ? "bg-gray-900 text-white"
              : "bg-white text-gray-700 hover:bg-gray-200"
          }`}
        >
          H2
        </button>

        {/* H3 */}

        <button
          type="button"
          onClick={() => {
            editor
              .chain()
              .focus()
              .toggleHeading({
                level: 3,
              })
              .run();
          }}
          className={`rounded-md px-3 py-2 text-xs font-semibold transition ${
            editor.isActive("heading", {
              level: 3,
            })
              ? "bg-gray-900 text-white"
              : "bg-white text-gray-700 hover:bg-gray-200"
          }`}
        >
          H3
        </button>

        <div className="mx-1 w-px bg-gray-300" />

        {/* BULLET LIST */}

        <button
          type="button"
          onClick={() => {
            editor
              .chain()
              .focus()
              .toggleBulletList()
              .run();
          }}
          className={`rounded-md px-3 py-2 text-sm transition ${
            editor.isActive("bulletList")
              ? "bg-gray-900 text-white"
              : "bg-white text-gray-700 hover:bg-gray-200"
          }`}
        >
          • List
        </button>

        {/* ORDERED LIST */}

        <button
          type="button"
          onClick={() => {
            editor
              .chain()
              .focus()
              .toggleOrderedList()
              .run();
          }}
          className={`rounded-md px-3 py-2 text-sm transition ${
            editor.isActive("orderedList")
              ? "bg-gray-900 text-white"
              : "bg-white text-gray-700 hover:bg-gray-200"
          }`}
        >
          1. List
        </button>

        <div className="mx-1 w-px bg-gray-300" />

        {/* LINK */}
<ImageUploadButton
  onUpload={(url) => {
    editor
      .chain()
      .focus()
      .setImage({
        src: url,
      })
      .run();
  }}
/>
        <button
          type="button"
          onClick={setLink}
          className={`rounded-md px-3 py-2 text-sm transition ${
            editor.isActive("link")
              ? "bg-gray-900 text-white"
              : "bg-white text-gray-700 hover:bg-gray-200"
          }`}
        >
          🔗 Link
        </button>

        {/* UNDO */}

        <button
          type="button"
          onClick={() => {
            editor
              .chain()
              .focus()
              .undo()
              .run();
          }}
          disabled={!editor.can().undo()}
          className="rounded-md bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40"
        >
          ↶
        </button>

        {/* REDO */}

        <button
          type="button"
          onClick={() => {
            editor
              .chain()
              .focus()
              .redo()
              .run();
          }}
          disabled={!editor.can().redo()}
          className="rounded-md bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40"
        >
          ↷
        </button>

      </div>

      {/* EDITOR */}

      <div className="min-h-[300px]">

        <EditorContent
          editor={editor}
        />

      </div>

    </div>
  );
}