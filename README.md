# Diary

日本語日記投稿サイト。ユーザー登録してジャンル別に日記を書き、公開できます。

## 技術スタック

- **Next.js 14** (App Router)
- **TypeScript**
- **PostgreSQL + Prisma**
- **NextAuth.js** (Credentials Provider)
- **Tailwind CSS**
- **TipTap** (リッチテキストエディタ)

## セットアップ

### 1. 依存パッケージのインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env.example` をコピーして `.env` を作成し、各値を設定します。

```bash
cp .env.example .env
```

```env
DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/diary
NEXTAUTH_SECRET=your-secret-here
NEXTAUTH_URL=http://localhost:3000
```

### 3. データベースのセットアップ

```bash
npx prisma migrate dev
```

### 4. 開発サーバーの起動

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000) で確認できます。

## URL 構造

| パス | 内容 |
|------|------|
| `/` | ホーム（ユーザー一覧） |
| `/register` | 会員登録 |
| `/login` | ログイン |
| `/[username]` | ユーザープロフィール・ジャンル一覧 |
| `/[username]/[genre]` | ジャンル別日記一覧 |
| `/[username]/[genre]/[date]` | 日記詳細（日付は YYYY-MM-DD 形式） |
| `/diary/new` | 日記作成（要ログイン） |
| `/settings` | アカウント設定（要ログイン） |
| `/privacy` | プライバシーポリシー |

## よく使うコマンド

```bash
npm run dev              # 開発サーバー起動
npx prisma migrate dev   # マイグレーション実行
npx prisma studio        # DB GUI
npx prisma generate      # クライアント再生成
```
