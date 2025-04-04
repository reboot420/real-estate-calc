# 不動産投資計算ツール

シンプルな不動産投資物件の管理と利回り計算ができるWebアプリです。

## 機能

- **物件情報の管理**: 投資用物件の情報を登録・編集・削除できます
- **利回り計算**: 表面利回り・実質利回りを簡単に計算できます
- **計算結果の保存**: 計算結果を保存して物件ごとに履歴を確認できます
- **シンプルなUI**: 必要最小限の機能に絞った使いやすいインターフェース

## デモ

GitHub Pages: https://reboot420.github.io/real-estate-calc/

## スクリーンショット

![メイン画面](./screenshots/main.png)

## 技術スタック

- React (v18)
- TailwindCSS
- Vite
- GitHub Pages

## ローカル環境での実行方法

```bash
# リポジトリをクローン
git clone https://github.com/reboot420/real-estate-calc.git
cd real-estate-calc

# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# ビルド
npm run build
```

## データの保存について

このアプリはローカルストレージを使用しています。
ブラウザのキャッシュをクリアすると保存したデータも削除されますのでご注意ください。

## 今後の改善予定

- [ ] データのエクスポート・インポート機能
- [ ] 複数物件の比較機能
- [ ] ローン計算機能
- [ ] PWA対応

## ライセンス

MIT

## 作者

reboot420
