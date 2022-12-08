import { defineStore } from "pinia";
export const useAddItemStore = defineStore("add_item", {
  state: () => ({
    /** @type {{ text: string, id: number, isFinished: boolean }[]} */
    item: {},
    add: false,
  }),
  actions: {
    cache_item(data){
      this.item = data;
    }
  },
});
