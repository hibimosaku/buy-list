//entity→vo

export interface Item {
  readonly _tag: "Item";
  name: string;
  price: number;
}

const MIN_NAME = 0;
const MAX_NAME = 10;
const MIN_PRICE = 0;
const MAX_PRICE = 9999;

//【課題】使いどころが分からない
//vue側の関数で利用？
// type CreateItem=(name:string,price:number)=>Item
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
