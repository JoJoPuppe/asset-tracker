import { defineStore } from "pinia";
export const useLogStore = defineStore("log", {
  state: () => ({
    /** @type {{ text: string, id: number, isFinished: boolean }[]} */
    log_item: {},
    edit: false,
  }),
  actions: {
    cache_item(data){
      this.log_item = data;
    }
  },
});
