<template>
  <div>
    <p>{{ list }}</p>
    <h3 class="font-bold text-3xl">Draggable {{ draggingInfo }}</h3>
    <draggable
      :list="list"
      :disabled="!enabled"
      item-key="name"
      class="list-group"
      ghost-class="ghost"
      :move="checkMove"
      @start="dragging = true"
      @end="dragging = false"
    >
      <template #item="{ element }">
        <ItemFile
          :item-name="{ element }"
          :class="{ 'not-draggable': !enabled }"
        />
      </template>
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import ItemFile from "./components/item_file.vue";
let id = 1;
export default {
  name: "simple",
  display: "Simple",
  order: 0,
  components: {
    draggable,
    ItemFile,
  },
  data() {
    return {
      enabled: true,
      list: [
        { name: "John", id: 0 },
        { name: "Joao", id: 1 },
        { name: "Jean", id: 2 },
      ],
      dragging: false,
    };
  },
  computed: {
    draggingInfo() {
      return this.dragging ? "under drag" : "";
    },
  },
  methods: {
    add: function () {
      this.list.push({ name: "Juan " + id, id: id++ });
    },
    replace: function () {
      this.list = [{ name: "Edgard", id: id++ }];
    },
    checkMove: function (e) {
      window.console.log("Future index: " + e.draggedContext.futureIndex);
    },
  },
};
</script>

<style scoped>
.buttons {
  margin-top: 35px;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.not-draggable {
  cursor: no-drop;
}
</style>

<!--
      <template #item="{ element }">
        <div
          class="card card-compact shadow-xl"
          :class="{ 'not-draggable': !enabled }"
        >
          {{ element.name }}
        </div>
      </template>
-->
