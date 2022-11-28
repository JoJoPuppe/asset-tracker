<template>
  <draggable
    class="dragArea w-full"
    :list="tasks"
    tag="ul"
    :group="{ name: 'g1' }"
    item-key="name"
  >
    <template #item="{ element }">
      <li>
        <ItemFolder v-if="element.type === 'folder'" :item-name="{ element }">
          <nested-draggable :tasks="element.tasks" />
        </ItemFolder>
        <ItemFile v-else :item="{ element }" />
      </li>
    </template>
  </draggable>
</template>
<script>
import draggable from "vuedraggable";
import ItemFile from "./item_file.vue";
import ItemFolder from "./item_folder.vue";
export default {
  props: {
    tasks: {
      required: true,
      type: Array,
    },
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
  margin: 5px 0 0 15px;
  padding: 5px 0 0 15px;
}
</style>
