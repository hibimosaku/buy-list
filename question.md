11/7
## router

## 課題
  ・整合性が保てててない。集約が窓口になってない
  ・itemをentityにしているが、valueObjectが正しいか？
  ・ifに対してのelseが書けてない
  ・dddに強制力をもたしたい
  


## 未着手
　・Lineへの送信
  ・vuex使わない場合でなにができるできないを知る。firebaseを状態管理で使う
  ・スマホレスポンシブ起動
  ・ドロップ＆ドラッグがスマホでできない
  ・名称の変更

疑問→解決 10/31
## firestoreルール
　・色々書いたが、ログイン時エラー
　　→再帰ワイルドカードを書かなかったのが原因。

## 課題と書いた部分
全てのモノは実行されてimportされる


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
  ・現状
  　画面操作すると、×

## buy-request.vue
  ・「buyListRq」が無効化できない（221行目）

