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
  <input type="checkbox" id="my-modal-item" class="modal-toggle" />
  <div class="modal">
    <div class="modal-box relative">
      <label
        for="my-modal-item"
        class="btn btn-sm btn-circle absolute right-2 top-2"
        >✕</label
      >
      <h3 class="text-lg font-bold">Add Item</h3>
      <ItemForm :prj_id="$route.params.id"/>
    </div>
  </div>
</template>
<script>
import draggable from "vuedraggable";
import ItemFile from "./item_file.vue";
import ItemFolder from "./item_folder.vue";
export default {
  props: {
    children: {
      required: true,
      type: Array,
    },
  },
  methods: {
    update_item(item){
      console.log(item)
    }

  },
  components: {
    draggable,
    ItemFile,
    ItemFolder,
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
