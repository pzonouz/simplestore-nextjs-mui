"use client";
import "./Tiptap.css";

import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatBulletListIcon from "@mui/icons-material/FormatListBulleted";
import FormatUnderlineIcon from "@mui/icons-material/FormatUnderlined";
import { Box, IconButton } from "@mui/material";
import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline"; // remove if using StarterKit v3
import { clsx } from "clsx";
import { useEffect } from "react";

export const Tiptap = ({
  content,
  setContent,
  error,
}: {
  content: string | null | undefined;
  setContent: (content: string) => void;
  error: boolean;
}) => {
  const editor = useEditor({
    extensions: [StarterKit, Underline], // just [StarterKit] on v3
    content: content ?? null,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  // Sync external content changes into the editor (not during render)
  useEffect(() => {
    if (!editor) return;
    const next = content ?? "";
    if (next !== editor.getHTML()) {
      editor.commands.setContent(next, {
        emitUpdate: false,
        parseOptions: { preserveWhitespace: "full" },
      });
    }
  }, [editor, content]);

  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isBold: ctx.editor?.isActive("bold") ?? false,
      isItalic: ctx.editor?.isActive("italic") ?? false,
      isUnderline: ctx.editor?.isActive("underline") ?? false,
      isBulletList: ctx.editor?.isActive("bulletList") ?? false,
    }),
  });

  if (!editor) {
    return null;
  }

  const { isBold, isItalic, isUnderline, isBulletList } = editorState ?? {};

  const buttonSx = (active?: boolean) => ({
    borderRadius: 1,
    ...(active && {
      color: "primary.main",
      bgcolor: "action.selected",
    }),
  });

  return (
    <>
      <Box sx={{ marginBottom: "1rem" }}>
        <IconButton
          sx={buttonSx(isBold)}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <FormatBoldIcon />
        </IconButton>
        <IconButton
          sx={buttonSx(isItalic)}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <FormatItalicIcon />
        </IconButton>
        <IconButton
          sx={buttonSx(isUnderline)}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <FormatUnderlineIcon />
        </IconButton>
        <IconButton
          sx={buttonSx(isBulletList)}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <FormatBulletListIcon />
        </IconButton>
      </Box>
      <EditorContent className={clsx({ error })} editor={editor} />
    </>
  );
};
