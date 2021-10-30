疑問 10/31
## firestoreルール
　・色々書いたが、ログイン時エラー

## 課題と書いた部分


## ddd
  ・UIからの流れ
  　
  　現状：UI→store→usecase
        　UI→usecase（store利用しない場合）
        →ルールがない。
　　案：1.UI→必ずusecase→store
       2.UI→必ずstore通す


## 未着手
　・Lineへの送信
  ・個数追加を検討
  ・




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

