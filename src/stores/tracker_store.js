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
    child_cnt(id){
      return this.cnt_children(id, "_id", this.list)
    },
    add_item(data) {
      this.list.push(data);
    },
    add_item_to_parent(data, parent_id) {
      this.find_id_and_add(parent_id, "_id", this.list, data)
    },

    fill_store(data) {
      this.rec_sort(data)
      this.list = data;
    },
    update_item(data) {
      this.find_id(data._id, "_id", this.list, data);
    },
    delete_item(id) {
      this.find_id_and_delete(id, "_id", this.list);
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
    cnt_children(id, id_type, arr) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i][id_type] === id) {
          return arr[i].children.length;
        }
        if (arr[i].children) {
          this.cnt_children(id, id_type, arr[i].children);
        }
      }
    },
    find_id_and_add(id, id_type, arr, item){
      for (let i = 0; i < arr.length; i++) {
        if (arr[i][id_type] === id) {
          arr[i]['children'].push(item)
          return;
        }
        if (arr[i].children) {
          this.find_id_and_add(id, id_type, arr[i].children);
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
          this.find_id_and_delete(id, id_type, arr[i].children);
        }
      }
    },
    rec_sort(arr) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].children) {
          this.rec_sort(arr[i].children);
        }
      }
      arr.sort(function compFn(a, b){ a.oder_index < b.order_index })
    },
  },
});
