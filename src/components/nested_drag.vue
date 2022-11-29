<template>
  <draggable
    class="dragArea w-full"
    :list="children"
    tag="ul"
    :group="{ name: 'g1' }"
    item-key="_id"
  >
    <template #item="{ element }">
      <li>
        <ItemFolder v-if="element.item_type === 'folder'" :item="{ element }">
          <nested-draggable :children="element.children" />
        </ItemFolder>
        <ItemFile @update-item="update_item" v-else :item="{ element }" />
      </li>
    </template>
  </draggable>
  <input
    type="checkbox"
    id="modal-update-item"
    class="modal-toggle"
    v-model="checked"
  />
  <div class="modal">
    <div class="modal-box relative">
      <label
        for="modal-update-item"
        class="btn btn-sm btn-circle absolute right-2 top-2"
        >✕</label
      >
      <h3 class="text-lg font-bold">Add Item</h3>
      <ItemForm :item="item" />
    </div>
  </div>
</template>
<script>
import draggable from "vuedraggable";
import ItemFile from "./item_file.vue";
import ItemFolder from "./item_folder.vue";
import ItemForm from "./add_item.vue";
export default {
  props: {
    children: {
      required: true,
      type: Array,
    },
  },
  data() {
    return {
      checked: false,
      item: {},
    };
  },
  methods: {
    update_item(item) {
      this.checked = true;
      this.item = item.element;
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
  padding: 0 0 0 25px;
}
</style>
