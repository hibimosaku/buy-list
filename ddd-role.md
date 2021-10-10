## archtecture

- 各レイヤーに依存させない
-

## valueObject(vo)

- 値は不変
- create():生成用（オブジェクト指向でいう new)。不変のため、値変更は create()利用
  createでは、その値の制限情報をかく（文字数とか）
  完全コンストラクタ※。値に対して、はじく
  ※コンストラクタですべてのプロパティ(メンバ変数)を設定し終える(完全な状態)を作るパターンです。setterは作らず、プロパティがコンストラクタの実行後に変わることはありません。
- 他メソッド(calc,conver,,,):個別値の変更、削除イメージ  
  calc:値の算出

## entity

- create():生成用。carタイヤ4つ=entityにルール　1つ=vo
- change()：変更時。不要？
- メソッドは、値の生成、変更ぐらい。値自体は vo でメソッド作成。
  例外で、vo で定義しにくい、まとめ処理。

## factory

- 使う理由：複雑なオブジェクトと集約のインスタンスを生成する責務を別のオブジェクトに移すこと
-

## repository
- pk（一意であれば） と必要データ
- 書き込みと読み取りを分けて考える。データ構成、流れが違うため
  - 読み込みはstoreとfirestoreのデータ構成一致。storeのstateを保存する
  - 書き込みはstateさわらない？　登録→repositroyにてDB登録→読み込みでstate保存？
  - 集約の永続化
  - 

## use-case

## ui

## store

## interface
- オブジェクトの型定義
- 共通化
- レイヤー間で切り分けたい

## domainobject でのメソッド例

- create : 生成
　- calc 　: 値の計算
　- convert : 別の domainobject に移行

## domainservice
- 作ったら負け
