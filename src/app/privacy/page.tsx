export const metadata = { title: 'プライバシーポリシー' }

export default function PrivacyPage() {
  return (
    <div className="max-w-2xl mx-auto prose prose-stone prose-sm">
      <h1 className="text-3xl font-serif font-bold text-stone-900 mb-2">プライバシーポリシー</h1>
      <p className="text-stone-400 text-sm mb-8">最終更新: 2026年4月30日</p>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-stone-800 mb-3">収集する情報</h2>
        <ul className="text-stone-600 text-sm space-y-1 list-disc pl-5">
          <li>ユーザー名</li>
          <li>メールアドレス（ログイン認証にのみ使用）</li>
          <li>パスワード（bcrypt でハッシュ化して保存）</li>
          <li>投稿した日記の本文・タイトル・ジャンル</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-stone-800 mb-3">情報の利用目的</h2>
        <ul className="text-stone-600 text-sm space-y-1 list-disc pl-5">
          <li>アカウントの認証・識別</li>
          <li>日記コンテンツの表示・管理</li>
        </ul>
        <p className="text-stone-600 text-sm mt-3">
          収集した情報を第三者に販売・提供することはありません。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-stone-800 mb-3">公開される情報</h2>
        <p className="text-stone-600 text-sm">
          ユーザー名・自己紹介・投稿した日記は、ログインしていない方を含む全員に公開されます。
          メールアドレスとパスワードは公開されません。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-stone-800 mb-3">データの削除</h2>
        <p className="text-stone-600 text-sm">
          アカウント設定ページからアカウントを削除すると、すべての個人情報および日記データが完全に消去されます。
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-stone-800 mb-3">Cookie</h2>
        <p className="text-stone-600 text-sm">
          ログイン状態の維持のみを目的として、セッション Cookie を使用しています。
          トラッキングや広告目的の Cookie は使用していません。
        </p>
      </section>
      <section>
        <h2 className="text-lg font-semibold text-stone-800 mb-3">重要</h2>
        <p className="text-stone-600 text-sm">
          本サービスは個人が運営しており、セキュリティ対策に最善を尽くしていますが、完全な安全性を保証するものではありません。
          万が一の際は速やかにご連絡・対応いたします。
        </p>
      </section>
      
    </div>
  )
}
