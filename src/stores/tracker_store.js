import { defineStore } from "pinia";
export const useTrackerStore = defineStore("tracker", {
  state: () => ({
    list: [],
  }),
  actions: {
    add_item(data) {
      this.list.push(data);
    },

    fill_store(data) {
      this.list = data;
    },
  },
});
