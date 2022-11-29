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
    update_item(data) {
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i]._id == data._id) {
          this.list[i] = data;
        }
      }
    },
  },
});
