//entity

import { createID } from "./id.value";
//【課題】buy-info.model側のものかなと。idは、buy-info側。entityではなく、vo
export interface Item {
  readonly _tag: "Item";
  id: string;
  name: string;
  price: number;
}

const MIN_NAME = 0;
const MAX_NAME = 10;
const MIN_PRICE = 0;
const MAX_PRICE = 9999;

function createItem(name: string, price: number): Item {
  if (name.length <= MIN_NAME || name.length > MAX_NAME)
    throw new Error(`name should be ${MIN_NAME} to ${MAX_NAME}`);
  if (price <= MIN_PRICE || price >= MAX_PRICE)
    throw new Error(`price should be ${MIN_PRICE} to ${MAX_PRICE}`);
  const id = createID();

  return {
    _tag: "Item",
    id,
    name,
    price,
  };
}

function changeItemName(item: Item, name: string): Item {
  if (name.length <= MIN_NAME || name.length > MAX_NAME)
    throw new Error(`name should be ${MIN_NAME} to ${MAX_NAME}`);
  return {
    ...item, //【勉強】スプレッド構文(複製)。置換パターン
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

//nameとprice別々→【課題】ほぼ同じコードになる。
// function changeItem(id: string, name: string, price: number): Item {
//   if (name.length <= MIN_NAME || name.length > MAX_NAME)
//     throw new Error(`name should be ${MIN_NAME} to ${MAX_NAME}`);
//   if (price <= MIN_PRICE || price >= MAX_PRICE)
//     throw new Error(`price should be ${MIN_PRICE} to ${MAX_PRICE}`);

//   return {
//     _tag: "Item",
//     id,
//     name,
//     price,
//   };
// }

// export function changeItemName(id: string, name: string, price: number): Item {
//   if (name.length <= MIN_NAME || name.length > MAX_NAME)
//     throw new Error(`name should be ${MIN_NAME} to ${MAX_NAME}`);

//   return {
//     _tag: "Item",
//     id,
//     name,
//     price,
//   };
// }

export const Item = {
  createItem,
  changeItemName,
  changeItemPrice,
  // changeItem
};
