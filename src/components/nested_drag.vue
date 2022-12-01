<template>
  <draggable
    class="dragArea w-full"
    :list="children"
    tag="ul"
    :group="{ name: 'g1' }"
    handle=".handle"
    item-key="_id"
    @end="onChange"
  >
    <template #item="{ element }">
      <li>
        <div class="w-12 h-12 relative handle -mr-12 cursor-move"></div>
        <ItemFolder v-if="element.item_type === 'folder'" :item="{ element }">
          <nested-draggable :children="element.children" />
        </ItemFolder>
        <ItemFile
          @new-version="new_version"
          @update-item="update_item"
          v-else
          :item="{ element }"
        />
      </li>
    </template>
  </draggable>
  <input
    type="checkbox"
    id="modal-update-item"
    class="modal-toggle"
    v-model="checked_update"
  />
  <div class="modal">
    <div class="modal-box">
      <h3 class="text-lg font-bold font-slate-600">Add/Change Item</h3>
      <ItemForm
        @close-modal="checked_update = !checked_update"
        :item="item"
        :type="type"
      />
      <div class="modal-action">
        <button @click="checked_update = !checked_update" class="btn">
          close
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import draggable from "vuedraggable";
import ItemFile from "./item_file.vue";
import ItemFolder from "./item_folder.vue";
import ItemForm from "./add_item.vue";
import axios from "axios";
import { useTrackerStore } from "../stores/tracker_store";
import { useOrderStore } from "../stores/order_store";
export default {
  props: {
    children: {
      required: true,
      type: Array,
    },
  },
  setup() {
    const store = useTrackerStore();
    const orderStore = useOrderStore();
    return {
      store,
      orderStore,
    };
  },
  data() {
    return {
      checked_update: false,
      type: "",
      item: {},
    };
  },
  methods: {
    onChange(ev) {
      axios
        .put("http://localhost:8000/reorder", JSON.stringify(this.store.list))
        .then((response) => {
          console.log(response.data);
        });
    },
    get_parent_id(child_id, arr) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].children) {
          for (let j = 0; j < arr[i].children.length; j++) {
            if (arr[i].children[j]._id === child_id) {
              return arr[i]._id;
            }
            if (arr[i].children[j].children) {
              this.get_parent_id(child_id, arr[i].children);
            }
          }
        }
      }
      return null;
    },
    update_item(item) {
      this.checked_update = true;
      this.item = item.element;
      this.type = "update";
    },
    new_version(item) {
      this.checked_update = true;
      this.item = item.element;
      this.type = "version";
    },
  },
  components: {
    draggable,
    ItemFile,
    ItemFolder,
    ItemForm,
  },
  name: "nestedDraggable",
};
</script>
<style scoped>
.dragArea {
  min-height: 50px;
  padding: 0 0 0 0px;
}

.handle {
  float: left;
}
</style>
