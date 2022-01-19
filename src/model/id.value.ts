//value object

export interface ID {
  readonly _tag: "ID";
  readonly raw: string;
}

export function createID(): ID {
  const today = new Date();
  const day = today
    .toLocaleString()
    .replace(/:/g, "")
    .replace(/\//g, "")
    .replace(/ /g, "");
  return {
    _tag:'ID',
    raw:day
  }
}

export function fetchID(id:string):ID{
  return{
    _tag:'ID',
    raw:id
  }
}