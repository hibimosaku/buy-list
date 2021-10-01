//value object

export interface ID {
  readonly _tag : 'ID'
  readonly raw : string
}

export function createID():string{
  const today = new Date
  const day = today.toLocaleString().replace(/:/g,"").replace(/\//g,"").replace(/ /g,"")
  return day

}