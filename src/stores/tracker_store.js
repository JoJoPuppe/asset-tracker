import { defineStore } from "pinia";
export const useTrackerStore = defineStore("tracker", {
  state: () => ({
    list: [],
  }),
  getters: {
    get_parent_id(state) {
      return (id) => state.list.find((user) => user.id === id);
    },
  },
  actions: {
    add_item(data) {
      this.list.push(data);
    },

    fill_store(data) {
      this.list = data;
    },
    update_item(data) {
      this.find_id(data._id, "_id", this.list, data);
    },
    delete_item_with_versions(id) {
      this.find_id_and_delete(id, "item_id", this.list);
    },
    update_version_item(data) {
      this.find_id(data.item_id, "item_id", this.list, data);
    },
    find_id(id, id_type, arr, data) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i][id_type] === id) {
          arr[i] = data;
          return;
        }
        if (arr[i].children) {
          this.find_id(id, id_type, arr[i].children, data);
        }
      }
    },
    find_id_and_delete(id, id_type, arr) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i][id_type] === id) {
          arr.splice(i, 1);
          return;
        }
        if (arr[i].children) {
          this.find_id(id, id_type, arr[i].children);
        }
      }
    },
  },
});
