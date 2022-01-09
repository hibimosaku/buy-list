//entity

export interface Category {
  readonly _tag: "Category";
  readonly id: string;
  name: string;
}

const MIN_NAME = 0;
const MAX_NAME = 5;

//新規作成だが、catrgoryはid固定のため、idの生成不要。変更でも利用。
export function createCategory(id: string, name: string): Category {
  if (name.length < MIN_NAME || name.length > MAX_NAME)
    throw new Error(`name should be ${MIN_NAME} to ${MAX_NAME}`);
  return {
    _tag: "Category",
    id,
    name,
  };
}
