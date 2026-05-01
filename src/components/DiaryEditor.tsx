'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'

type Props = {
  content: string
  onChange: (html: string) => void
}

export default function DiaryEditor({ content, onChange }: Props) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: '今日のことを書いてみよう…' }),
    ],
    content,
    onUpdate({ editor }) {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class:
          'prose prose-stone prose-lg max-w-none min-h-[320px] p-5 focus:outline-none',
      },
    },
  })

  return (
    <div className="border border-stone-200 rounded-xl bg-white overflow-hidden">
      <div className="flex gap-1 px-3 py-2 border-b border-stone-100 bg-stone-50">
        {[
          { label: 'B', action: () => editor?.chain().focus().toggleBold().run(), active: editor?.isActive('bold') },
          { label: 'I', action: () => editor?.chain().focus().toggleItalic().run(), active: editor?.isActive('italic') },
          { label: 'H2', action: () => editor?.chain().focus().toggleHeading({ level: 2 }).run(), active: editor?.isActive('heading', { level: 2 }) },
          { label: 'UL', action: () => editor?.chain().focus().toggleBulletList().run(), active: editor?.isActive('bulletList') },
          { label: 'OL', action: () => editor?.chain().focus().toggleOrderedList().run(), active: editor?.isActive('orderedList') },
          { label: '—', action: () => editor?.chain().focus().setHorizontalRule().run(), active: false },
        ].map(({ label, action, active }) => (
          <button
            key={label}
            type="button"
            onClick={action}
            className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
              active
                ? 'bg-amber-700 text-white'
                : 'text-stone-500 hover:bg-stone-200'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <EditorContent editor={editor} />
    </div>
  )
}
