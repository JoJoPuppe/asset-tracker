import { defineStore } from "pinia";
export const useOrderStore = defineStore("order", {
  state: () => ({
    lookup: {},
  }),
  actions: {
    add_item(item) {
      let id = item._id
      this.lookup[id] = {item_order: item.item_order, parent: item.parent}
    },
    fill_store(data) {
      for (const item of data){
        let id = item._id
        this.lookup[id] = {item_order: item.item_order, parent: item.parent}
      }
    },
    delete_item(data) {
      let id = data._id
      delete this.lookup[id]
    },
    change_order(id, index){
      this.lookup[id].item_order = index
    },
    change_order_with_parent(id, index, parent){
      this.lookup[id].item_oder = index
      this.lookup[id].parent = parent
    }
  },
});
