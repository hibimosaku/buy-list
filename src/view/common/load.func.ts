import { store } from "../../store/store";

export const load = async (id: string) => {
  await store.dispatch("loadCategory", id);
  await store.dispatch("loadItemsStore", id);
};
