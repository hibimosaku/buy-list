//entity→vo

//【課題→解決】使い方、type作りのもう一つ上のルール設定？
//このパターン、interfaceでは作れないですよね？→仕様上作れない。
export type VoBase<P, Tag extends string> = {
  readonly _tag: Tag;
} & Readonly<P>;

export type Item = VoBase<
  {
    name: string;
    price: number;
  },
  "Item"
>;
//【学習】key ofの使い方
// interface VoBaseInterface<P extends { [k: string]: any }, Tag extends string> {
//   readonly _tag: Tag;
//   readonly [K in keyof P]: P[K];//for
// }

// type VO = VoBaseInterface<
//   {
//     name: string
//     price: number
//   },
//   'Item'
// >

// const vo: VO = {

// };

// export interface ItemA {
//   readonly _tag: "Item";
//   readonly name: string;
//   readonly price: number;
// }

const MIN_NAME = 0;
const MAX_NAME = 10;
const MIN_PRICE = 0;
const MAX_PRICE = 9999;

//【課題】関数の型。使いどころが分からない。
//vue側の関数作成時に利用？
// type CreateItem=(name:string,price:number)=>Item
//

function createItem(name: string, price: number): Item {
  if (name.length <= MIN_NAME || name.length > MAX_NAME)
    throw new Error(`name should be ${MIN_NAME} to ${MAX_NAME}`);
  if (price <= MIN_PRICE || price >= MAX_PRICE)
    throw new Error(`price should be ${MIN_PRICE} to ${MAX_PRICE}`);

  return {
    _tag: "Item",
    name,
    price,
  };
}

function changeItemName(item: Item, name: string): Item {
  if (name.length <= MIN_NAME || name.length > MAX_NAME)
    throw new Error(`name should be ${MIN_NAME} to ${MAX_NAME}`);
  return {
    ...item,
    name,
  };
}

function changeItemPrice(item: Item, price: number): Item {
  if (price <= MIN_PRICE || price >= MAX_PRICE)
    throw new Error(`price should be ${MIN_PRICE} to ${MAX_PRICE}`);
  return {
    ...item,
    price,
  };
}

export const Item = {
  createItem,
  changeItemName,
  changeItemPrice,
  // changeItem
};
