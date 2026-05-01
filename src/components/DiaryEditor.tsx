'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import type { ReactNode } from 'react'

type Props = {
  content: string
  onChange: (html: string) => void
}

type ToolBtn = {
  label: ReactNode
  title: string
  action: () => void
  active: boolean
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
        class: 'prose prose-stone prose-lg max-w-none min-h-[420px] p-5 focus:outline-none',
      },
    },
  })

  const charCount = editor?.getText().length ?? 0

  const groups: ToolBtn[][] = [
    [
      {
        label: <span className="font-bold">B</span>,
        title: '太字 (Ctrl+B)',
        action: () => editor?.chain().focus().toggleBold().run(),
        active: !!editor?.isActive('bold'),
      },
      {
        label: <span className="italic">I</span>,
        title: '斜体 (Ctrl+I)',
        action: () => editor?.chain().focus().toggleItalic().run(),
        active: !!editor?.isActive('italic'),
      },
      {
        label: <span className="line-through">S</span>,
        title: '打ち消し線',
        action: () => editor?.chain().focus().toggleStrike().run(),
        active: !!editor?.isActive('strike'),
      },
    ],
    [
      {
        label: 'H2',
        title: '見出し2',
        action: () => editor?.chain().focus().toggleHeading({ level: 2 }).run(),
        active: !!editor?.isActive('heading', { level: 2 }),
      },
      {
        label: 'H3',
        title: '見出し3',
        action: () => editor?.chain().focus().toggleHeading({ level: 3 }).run(),
        active: !!editor?.isActive('heading', { level: 3 }),
      },
    ],
    [
      {
        label: '•',
        title: '箇条書き',
        action: () => editor?.chain().focus().toggleBulletList().run(),
        active: !!editor?.isActive('bulletList'),
      },
      {
        label: '1.',
        title: '番号付きリスト',
        action: () => editor?.chain().focus().toggleOrderedList().run(),
        active: !!editor?.isActive('orderedList'),
      },
      {
        label: '❝',
        title: '引用',
        action: () => editor?.chain().focus().toggleBlockquote().run(),
        active: !!editor?.isActive('blockquote'),
      },
    ],
    [
      {
        label: '<>',
        title: 'コード',
        action: () => editor?.chain().focus().toggleCode().run(),
        active: !!editor?.isActive('code'),
      },
      {
        label: '—',
        title: '区切り線',
        action: () => editor?.chain().focus().setHorizontalRule().run(),
        active: false,
      },
    ],
  ]

  return (
    <div className="border border-stone-200 rounded-xl bg-white overflow-hidden">
      <div className="flex flex-wrap items-center gap-0.5 px-3 py-2 border-b border-stone-100 bg-stone-50">
        {groups.map((group, gi) => (
          <div key={gi} className="flex items-center gap-0.5">
            {gi > 0 && <span className="w-px h-4 bg-stone-300 mx-1.5" />}
            {group.map(({ label, title, action, active }, bi) => (
              <button
                key={bi}
                type="button"
                title={title}
                onClick={action}
                className={`px-2.5 py-1 rounded text-xs transition-colors min-w-[28px] text-center ${
                  active
                    ? 'bg-amber-700 text-white'
                    : 'text-stone-500 hover:bg-stone-200 hover:text-stone-800'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        ))}
      </div>

      <EditorContent editor={editor} />

      <div className="px-5 py-2 border-t border-stone-100 bg-stone-50 flex justify-end">
        <span className="text-xs text-stone-400">{charCount.toLocaleString()} 文字</span>
      </div>
    </div>
  )
}
