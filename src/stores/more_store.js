import { defineStore } from "pinia";
export const useMoreStore = defineStore("more", {
  state: () => ({
    /** @type {{ text: string, id: number, isFinished: boolean }[]} */
    item: {},
    more: false,
  }),
  actions: {
    cache_item(data){
      this.item = data;
    }
  },
});
