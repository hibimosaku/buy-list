//集約

import { Category } from "./category.model"
import { ItemStatus } from "./item-status.value"
import { Item } from "./item.model"

export interface ItemGroup{
  readonly _tag : 'ItemGroup'
  itemId:Item['id']
  categoryId:Category['id']
  itemStatus:ItemStatus
}

export function createItemGroup(itemId:Item['id'],categoryId:Category['id'],itemStatus:ItemStatus):ItemGroup{  
  return {
    _tag:'ItemGroup',
    itemId,
    categoryId,
    itemStatus
  }
}
