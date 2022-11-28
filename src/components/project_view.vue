<template>
  <div class="drawer drawer-end">
    <input
      id="my-drawer-4"
      type="checkbox"
      class="drawer-toggle"
      v-model="checked"
    />

    <div class="drawer-content">
      <h1>{{ $route.params.id }}</h1>
      <p>hellllloooooo</p>
      <label for="my-modal-3" class="btn">add item</label>
      <nestedDraggable :tasks="list" />
    </div>
    <div class="drawer-side">
      <label for="my-drawer-4" class="drawer-overlay"></label>
      <div class="menu p-4 w-80 bg-base-100 text-base-content">
        <SideBarContent :item-data="more" />
      </div>
    </div>
  </div>
  <input type="checkbox" id="my-modal-3" class="modal-toggle" />
  <div class="modal">
    <div class="modal-box relative">
      <label
        for="my-modal-3"
        class="btn btn-sm btn-circle absolute right-2 top-2"
        >✕</label
      >
      <h3 class="text-lg font-bold">Congratulations random Internet user!</h3>
      <ItemForm />
    </div>
  </div>
</template>

<script>
import { useTrackerStore } from "../stores/tracker_store";
import { useMoreStore } from "../stores/more_store";
import { ref } from "vue";
import nestedDraggable from "./nested_drag.vue";
import ItemForm from "./add_item.vue";
import SideBarContent from "./side_bar_content.vue";
import axios from "axios";

export default {
  components: {
    nestedDraggable,
    ItemForm,
    SideBarContent,
  },
  setup() {
    const store = useTrackerStore();
    const more_store = useMoreStore();
    return {
      store,
      more_store,
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
          this.store.fill_store(JSON.parse(response.data));
          console.log(response.data);
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
