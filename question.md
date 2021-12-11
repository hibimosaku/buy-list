12/12
・たぶん型がぐちゃぐちゃ
  - model,コンポーネント、firebase
・気になる点
  - ファイルごとの整理
・追加機能（余裕あれば）
  - css整理
  - ページ説明（ポップオーバー）
    - 項目にカーソルを置くと、説明書きが表示
  - 並び替えのマウスで移動（出来なかったので）
  - 並び替えボタン押したときのhoverがおかしい
・ポートフォリオ
  - どのぐらいの単位でつくるのがよいか？
    - ひと月レベル？

  - 新しい技術（機能）？

・フリーランス案件


7. firebase
  - cloud functionsエラー
    1. 関数処理で使っているライブラリが、functionsの中のpackage.jsonに入っているか？
    2. GCPからcloud storageのデータを削除する
   　　参考：https://zenn.dev/imaginelab/scraps/a9257aac32d0be
    3. GCPからcloud functionsの権限にAll usersを追加
    　 参考：https://qiita.com/toshiaki_takase/items/ce65cd5582a80917b52f


12/4
gitignore
https://www.toptal.com/developers/gitignore
11/28
## できなかった
・line送信失敗
  - 方法　axios(アクシオス)
  - 原因　cors 
  - 解決方法
    - jsonp？
    - サーバーサイドでの処理？
    - firebase cloud functions？→これ
  
・ターミナルエラー vue.tsになっているがbuildでは成功なので問題ななし
・webpackでのscss


## cors（Cross-Origin Resource Sharing）の考え方
・ブラウザでのエラー
・origin === protocol + domain + port number
・エラー時の対策は？
  - クライアントサイド：特になし
  - サーバサイド：「Access-Control-Allow-Origin:」の追加が必要
・フロントでできることは？
  - サーバサイドから送信
  - firebase cloud functionsでは？

## web api
- リクエストに必要な情報
  - APIに接続するための情報
    - APIエンドポイント
    - APIキー
  - APIに送信する情報：各APIのドキュメントに細かく記載
    - HTTPメソッド
    - ヘッダ：データの種類、APIキーなどの認証情報
    - ボディ：JSON形式で送受信したい情報


11/21
## idの重複チェックいる？
firestoreでチェックしてくれるし、一意のIDを生成したつもりなので不要かなと

## === と === 違い
原則===で。==を使うことは基本ない。

## ブラウザなしでコード書けない

11/14　
## async,await
  ・自分の理解レベル
    -async →promiseが返される　→　成功での処理 →　return →　then
                              →　失敗での処理 →　throw  →　catch
    -await asybnc関数内に複数処理があれば、処理完了まで次の工程に進まない
  - try catchとの関係
    - await使えば、try catch利用できる？
    asyncだけなら、promiseを返す必要がありreturn or throwが必要
    async+awaitならawaitがPromiseを返すので不要

    async function をただ呼び出すときは try catch は意味をなさない
    await 付きで呼び出せば try catch が意味をなす
    await の有無にかかわらず .catch(e => {}) で拾うことができる

11/7
## 課題
  ・dddに強制力をもたしたい→可能。前のライブららり。
  ・集約のreturnをリポジトリのメソッド引数に合わせるのはだめ？
  ・この構成で担当割可能？
  　- htmlぐらいしか渡せない。vueファイルにモデルの型いれちゃっている。


## 未着手
　・Lineへの送信
  ・vuex使わない場合でなにができるできないを知る。firebaseを状態管理で使う
  ・スマホレスポンシブ起動
  ・ドロップ＆ドラッグがスマホでできない



疑問→解決 10/31
## firestoreルール
　・色々書いたが、ログイン時エラー
　　→再帰ワイルドカードを書かなかったのが原因。

## 課題と書いた部分
全てのモノが実行されてimportされる
→

## ddd
  ・UIからの流れ
  　
  　現状：UI→store（状態管理）→usecase コマンド（相手の要求と対応が一体化,restApi）、クエリ（サーバ、要求がいつ変えてくるか分からない）が分離　functions利用
         　UI→usecase（store利用しない場合）　コマンド、クエリが分離していない場合

        →ルールがない。→storeを使う使わないのルールがあるからOK
　　案：1.UI→必ずusecase→store
       2.UI→必ずstore通す　eventがすべて見えるgooglechrom

storeの役割・状態管理、meesageパス






解決 10/24
## top.vue 10/24
  ・したいこと
  　1.認証　→　2.DBをstoreに反映　→　3.画面遷移　→　4.画面にデータ表示
  ・現状
    4ができていない。3画面遷移後に2がされているのが原因？方法不明
  ・解決
    - promiseでタイミング解消
  　- storeでの非同期処理解消（actiton)

## buy-request.vue
  ・したいこと
  　リロード時にデータ消去させない。localstoragの利用
    →localstorgeではなく、routerのbeforeachを利用
  ・現状
  　画面操作すると、×

## buy-request.vue
  ・「buyListRq」が無効化できない（221行目）

