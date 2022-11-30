<template>
  <div class="bg-primary h-16 flex justify-between items-center p-4">
    <p class="font-bold text-3xl">{{ $route.params.id }}</p>
    <div class="mx-2">
      <label for="my-modal-item" class="btn btn-accent mx-2">add item</label>
      <label for="my-modal-folder" class="btn btn-secondary mx-2"
        >add folder</label
      >
    </div>
  </div>
  <div class="drawer drawer-end">
    <input
      id="my-drawer-4"
      type="checkbox"
      class="drawer-toggle"
      v-model="checked"
    />

    <div class="drawer-content m-8">
      <nestedDraggable :children="list" />
    </div>
    <div class="drawer-side">
      <label for="my-drawer-4" class="drawer-overlay"></label>
      <div class="menu p-4 w-80 bg-base-100 text-base-content">
        <SideBarContent :item-data="more" />
      </div>
    </div>
  </div>
  <input
    type="checkbox"
    id="my-modal-item"
    class="modal-toggle"
    v-model="add_checked"
  />
  <div class="modal">
    <div class="modal-box relative">
      <label
        for="my-modal-item"
        class="btn btn-sm btn-circle absolute right-2 top-2"
        >✕</label
      >
      <h3 class="text-lg font-bold">Add Item</h3>
      <ItemForm
        @close-modal="add_checked = !add_checked"
        :prj_id="$route.params.id"
      />
    </div>
  </div>
  <input type="checkbox" id="my-modal-folder" class="modal-toggle" />
  <div class="modal">
    <div class="modal-box relative">
      <label
        for="my-modal-folder"
        class="btn btn-sm btn-circle absolute right-2 top-2"
        >✕</label
      >
      <h3 class="text-lg font-bold">Add Folder</h3>
      <FolderForm :prj_id="$route.params.id" />
    </div>
  </div>
</template>

<script>
import { useTrackerStore } from "../stores/tracker_store";
import { useMoreStore } from "../stores/more_store";
import { ref } from "vue";
import nestedDraggable from "./nested_drag.vue";
import ItemForm from "./add_item.vue";
import FolderForm from "./add_folder.vue";
import SideBarContent from "./side_bar_content.vue";
import axios from "axios";

export default {
  components: {
    nestedDraggable,
    ItemForm,
    SideBarContent,
    FolderForm,
  },
  setup() {
    const store = useTrackerStore();
    const more_store = useMoreStore();
    return {
      store,
      more_store,
    };
  },
  data() {
    return {
      add_checked: false,
    };
  },
  mounted() {
    this.get_project();
  },
  methods: {
    addItem() {},
    get_project() {
      axios
        .get("http://localhost:8000/" + this.$route.params.id)
        .then((response) => {
          console.log(response.data);
          this.store.fill_store(JSON.parse(response.data));
        });
    },
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
      return this.more_store.item;
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
