//value object

import {createID} from "./id.value"

describe('createID',()=>{
  test('ID生成',()=>{
    expect(createID()).toBe(5);
  })
})