//entity

export interface Category{
  readonly _tag : 'Category'
  id : number
  name : string
}

const MIN_ID = 0
const MAX_ID = 9
const MIN_NAME = 1
const MAX_NAME = 10

export function createItem(id:number,name:string):Category{
  if(id <= MIN_ID || id >= MAX_ID) throw new Error(`id should be ${MIN_ID} to ${MAX_ID}`)
  if(name.length <= MIN_NAME || name.length >= MAX_NAME) throw new Error(`name should be ${MIN_NAME} to ${MAX_NAME}`)
  return {
    _tag:'Category',
    id,
    name
  }
}