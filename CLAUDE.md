# CLAUDE.md

## プロジェクト概要

日本語日記投稿サイト。Next.js 14 App Router + PostgreSQL + Prisma + NextAuth.js + TipTap 構成。

## 技術スタック

- **Next.js 14** — App Router 使用、`src/app/` 配下にルートを配置
- **TypeScript** — strict モード
- **PostgreSQL + Prisma** — ORM は Prisma、スキーマは `prisma/schema.prisma`
- **NextAuth.js** — Credentials Provider で会員登録・ログイン
- **Tailwind CSS** — スタイリング
- **TipTap** — `/diary/new` のリッチテキストエディタ

## ディレクトリ規約

```
src/
  app/           # Next.js App Router のルート
  components/    # 再利用可能な UI コンポーネント
  lib/           # DB クライアント・ユーティリティ
prisma/
  schema.prisma  # Prisma スキーマ
```

## URL構造

```
/                            # ホーム（ユーザー一覧）
/[username]                  # ユーザープロフィール＋ジャンル一覧
/[username]/[genre]          # ジャンル別日記一覧
/[username]/[genre]/[date]   # 日記詳細（YYYY-MM-DD）
/register                    # 会員登録
/login                       # ログイン
/diary/new                   # 日記作成（ログイン必須）
```

## コーディング規約

- コンポーネントは PascalCase、ファイルは kebab-case
- Server Component を基本とし、インタラクションが必要な箇所だけ `"use client"` を付与
- DB アクセスは Server Component または Route Handler 内で行う（クライアントから直接 Prisma を叩かない）
- 認証チェックは `getServerSession()` を使用

## 環境変数（必須）

```env
DATABASE_URL       # PostgreSQL 接続文字列
NEXTAUTH_SECRET    # NextAuth 署名シークレット
NEXTAUTH_URL       # サイトの URL（開発時は http://localhost:3000）
```

## よく使うコマンド

```bash
npm run dev              # 開発サーバー起動
npx prisma migrate dev   # マイグレーション実行
npx prisma studio        # Prisma Studio（DB GUI）
npx prisma generate      # クライアント再生成
```

## デザイン方針

- おしゃれ・個性的なデザイン
- 各ページにパンくずリスト（ホーム > ユーザー名 > ジャンル > 日付）を表示
- モバイル対応（レスポンシブ）
