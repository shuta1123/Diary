# Diary — 日本語日記投稿サイト

誰でも会員登録・ログインして日記を投稿・公開できるサービスです。  
ホーム → ユーザー → ジャンル → 日付 という階層でドリルダウンして記事にたどり着く構造になっています。

## 技術スタック

| カテゴリ | 技術 |
|---|---|
| フレームワーク | Next.js 14（App Router） |
| 言語 | TypeScript |
| データベース | PostgreSQL |
| ORM | Prisma |
| 認証 | NextAuth.js |
| スタイル | Tailwind CSS |
| エディタ | TipTap |

## URL構造

### 公開ページ
| URL | 説明 |
|---|---|
| `/` | ホーム（登録ユーザー一覧） |
| `/[username]` | ユーザープロフィール＋ジャンル一覧 |
| `/[username]/[genre]` | ジャンル別日記一覧 |
| `/[username]/[genre]/[date]` | 日記詳細（date は `YYYY-MM-DD` 形式） |

### 認証ページ
| URL | 説明 |
|---|---|
| `/register` | 会員登録 |
| `/login` | ログイン |

### ログイン後ページ
| URL | 説明 |
|---|---|
| `/diary/new` | 日記作成（TipTap エディタ、ログイン必須） |

## セットアップ

### 前提条件
- Node.js 18+
- PostgreSQL

### インストール

```bash
npm install
```

### 環境変数

`.env` を作成して以下を設定してください。

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/diary"
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="http://localhost:3000"
```

### DB のセットアップ

```bash
npx prisma migrate dev
npx prisma generate
```

### 開発サーバー起動

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000) で確認できます。

## ディレクトリ構成

```
src/
  app/
    (auth)/
      login/
      register/
    [username]/
      [genre]/
        [date]/
    diary/
      new/
  components/
  lib/
  prisma/
```
