<template>
  <div class="drawer drawer-end">
    <input
      id="my-drawer-4"
      type="checkbox"
      class="drawer-toggle"
      v-model="checked"
    />

    <div class="drawer-content">
     <label for="my-modal-3" class="btn">add item</label> <p>{{ list }}</p>
      <nestedDraggable :tasks="list" />
    </div>
    <div class="drawer-side">
      <label for="my-drawer-4" class="drawer-overlay"></label>
      <ul class="menu p-4 w-80 bg-base-100 text-base-content">
        <!-- Sidebar content here -->
        <li>
          <a>{{ more }}</a>
        </li>
        <li><a>Sidebar Item 2</a></li>
      </ul>
    </div>
  </div>
  <input type="checkbox" id="my-modal-3" class="modal-toggle" />
  <div class="modal">
    <div class="modal-box relative">
      <label for="my-modal-3" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
      <h3 class="text-lg font-bold">Congratulations random Internet user!</h3>
      <ItemForm/>
    </div>
  </div>
</template>

<script>
import { useTrackerStore } from "./stores/tracker_store";
import { useMoreStore } from "./stores/more_store";
import { ref } from "vue";
import nestedDraggable from "./components/nested_drag.vue";
import ItemForm from "./components/add_item.vue";

export default {
  components: {
    nestedDraggable,
    ItemForm,
  },
  setup() {
    const store = useTrackerStore();
    const more_store = useMoreStore();
    return {
      store,
      more_store,
    };
  },
  methods: {
    addItem(){

    }

  },
  computed: {
    list() {
      return this.store.list;
    },
    checked: {
      get() {
        return this.more_store.more;
      },
      set(value) {
        this.more_store.more = value;
      },
    },
    more() {
      return this.more_store.item_name;
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
