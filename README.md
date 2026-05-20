# 勤怠管理システム

大学生アルバイトや小規模チーム向けに作成した、シンプルで使いやすい勤怠管理システムです。
出勤・退勤の記録、勤務時間の自動計算、履歴管理をブラウザ上で簡単に行えます。

## 特徴

* シンプルで直感的なUI
* 出勤 / 退勤時刻をワンクリックで記録
* 勤務時間を自動計算
* ローカル環境ですぐ動作
* HTML / CSS / JavaScriptのみで構成
* 将来的なバックエンド拡張を考慮した構成

## 使用技術

| 技術           | 用途      |
| ------------ | ------- |
| HTML         | 画面構築    |
| CSS          | デザイン    |
| JavaScript   | 勤怠ロジック  |
| Git / GitHub | バージョン管理 |

## ディレクトリ構成

```bash
attendance-system/
├── index.html
├── style.css
├── script.js
└── backend/
```

## クイックスタート

### 1. リポジトリをクローン

```bash
git clone https://github.com/your-name/attendance-system.git
cd attendance-system
```

### 2. ブラウザで起動

```bash
index.html をブラウザで開く
```

または VSCode の Live Server 拡張機能を使用してください。

## 基本機能

### 出勤記録

「出勤」ボタンを押すことで現在時刻を記録します。

### 退勤記録

「退勤」ボタンを押すことで勤務終了時刻を記録します。

### 勤務時間計算

出勤時刻と退勤時刻から勤務時間を自動計算します。

## 今後のロードマップ

* ログイン機能
* データベース保存
* 月別勤務時間集計
* 管理者画面
* CSVエクスポート
* スマホ対応UI改善
* バックエンドAPI実装

## 開発

### セットアップ

```bash
git clone https://github.com/your-name/attendance-system.git
cd attendance-system
```

### Git運用例

```bash
git checkout -b feature/add-login
git commit -m "feat: add login feature"
git push origin feature/add-login
```

## コミットメッセージ規則

```text
feat: 新機能追加
fix: バグ修正
docs: ドキュメント修正
style: コード整形
refactor: リファクタリング
test: テスト追加
chore: その他変更
```

## 学習目的

このプロジェクトでは以下を学習することを目的としています。

* フロントエンド開発の基礎
* JavaScriptによる状態管理
* Git / GitHub運用
* Webアプリ設計
* UI/UX改善

## ライセンス

MIT License

## 作者

GitHub: your-name

## 免責事項

本システムは学習目的で開発されています。
実運用時には認証・セキュリティ・データ保護などの追加実装が必要です。
