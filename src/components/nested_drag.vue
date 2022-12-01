<template>
  <draggable
    class="dragArea w-full"
    :list="children"
    tag="ul"
    :group="{ name: 'g1' }"
    handle=".handle"
    item-key="_id"
    @end="onEnd"
    @change="onChange"
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
import { useTrackerStore } from "../stores/tracker_store";
export default {
  props: {
    children: {
      required: true,
      type: Array,
    },
  },
  setup() {
    const store = useTrackerStore();
    return {
      store,
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
    onEnd(ev) {},
    onChange(ev) {
      console.log(ev);
      if ("moved" in ev) {
        const el = ev["moved"];
        console.log(el.element._id);
        console.log(el.newIndex);
      } else if ("added" in ev) {
        const el = ev["added"];
        console.log(el.element._id);
        console.log(el.newIndex);
      } else {
        return;
      }
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
