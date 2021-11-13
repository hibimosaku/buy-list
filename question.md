11/14　
## 在庫管理削除

## エラー対応
  ・try～catch地獄
  ・エラー方針
  　- usecaseでエラー情報を取得する
  　- 

  ・エラーの分類
  　- 原因明確　DOでのルール違反（コードで書いたthrow）
    - 原因不明　firebaseのエラー
      - https://firebase.google.com/docs/storage/web/handle-errors?hl=ja　
      →これに対応するtry～catchを記入？

  ・ルール？
  　-　DOでのエラーは、throw or return null
      - throw ：　
      - return null
    -  ユースケースでのエラーは、UIでの表示のため、alert or UI画面表示（この場合errorをstoreで保持し、UI対応）
    -  
  ・ルールで気になる
    -  UIとDOは分けて考える？でも同じエラー内容

  ・同期処理と非同期処理を別で考える
  　- 同期処理：try～catch
  　- 非同期処理：then,catch

  ・ユーザに見せるか見せないか？
  　見せる：
  　見せない：

  ・モデルで書いたthrowをUIで表示しないことを考える？

　・コンポーネント側

  ・UIとDOのダブルエラー対応ですよね？

  ・DDD側
    - 今回はusecaseに入力
    - 書き方
      - null
      - throw
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
  ・現状
  　画面操作すると、×

## buy-request.vue
  ・「buyListRq」が無効化できない（221行目）

