//entity

import { changeItem, createItem } from "./item.model"
import { ItemRepository } from "./item.repository"

//品目登録
export function saveItem(name:string,price:number,id?:string):any{
  //idなければ、新規登録、idあれば更新
  if(!id){            
    const item=createItem(name,price)
    console.log(item)
    ItemRepository.newSaveItem(item,'userID')
    const allItem = ItemRepository.getItem('userID') 
    return  allItem
  }
  if(id){
    const item=changeItem(id,name,price)
    ItemRepository.newSaveItem(item,'userID')
    const allItem = ItemRepository.getItem('userID') 
    return allItem
  }
}

