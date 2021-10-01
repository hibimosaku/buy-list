//value object


export interface ItemStatus{
  readonly _tag : 'ItemStatus'
  type: Date |'no' | 'want'
}


export function createItemStatus(status:ItemStatus['type']):ItemStatus{
  return {
    _tag:'ItemStatus',
    type:status
  }
}
