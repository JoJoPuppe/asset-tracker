<template>
  <div class="bg-base-300">
    <div class="bg-primary h-16 flex justify-between items-center p-4">
      <div class="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 80.81 107.23"
          class="fill-base-100 w-10 -ml-2 -mt-1"
        >
          <g>
            <path
              d="M52.85,68.14H36.17v30.11h-5.17c-6.74,0-12.21-5.47-12.21-12.21V17.18h34.05c6.78,0,12.28,5.5,12.28,12.28
            v26.41C65.13,63.16,60.26,68.14,52.85,68.14z M47.41,33.39H36.17v18.53h11.24c0.19,0,0.35-0.16,0.35-0.35V33.74
            C47.76,33.55,47.6,33.39,47.41,33.39z"
            />
          </g>
        </svg>
        <div class="mx-4">
          <p class="font-bold text-sm">Asset Tracker</p>
          <p class="font-bold text-lg">{{ project_name }}</p>
        </div>
        <button @click="changeInfo" class="btn btn-secondary"><InformationCircleIcon class="text-accent w-8" /></button>
      </div>
      <div class="mx-2 flex flex-row">
        <CloudArrowUpIcon v-if="waiting" class="text-accent w-8" />
        <CheckCircleIcon v-else class="text-accent w-8" />
        <label for="my-modal-item" class="btn btn-sm btn-accent mx-2"
          >add item</label
        >
        <label for="my-modal-folder" class="btn btn-sm btn-accent mx-2"
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

    <input type="checkbox" id="info-modal" class="modal-toggle" v-model="openInfo"/>
    <div class="modal">
      <div class="modal-box relative">
        <label
          for="info-modal"
          class="btn btn-sm btn-circle absolute right-2 top-2"
          >✕</label
        >
        <h3 class="text-lg font-bold">Project Details</h3>
        <ProjectDetails />
      </div>
    </div>
  </div>
</template>

<script>
import { useTrackerStore } from "../stores/tracker_store";
import { useMoreStore } from "../stores/more_store";
import { useDebounceStore } from "../stores/debounce_store";
import { ref } from "vue";
import nestedDraggable from "./nested_drag.vue";
import ItemForm from "./add_item.vue";
import FolderForm from "./add_folder.vue";
import SideBarContent from "./side_bar_content.vue";
import ProjectDetails from "./project_details.vue";
import { CloudArrowUpIcon, CheckCircleIcon, InformationCircleIcon } from "@heroicons/vue/24/outline";
import axios from "axios";

export default {
  components: {
    ProjectDetails,
    nestedDraggable,
    ItemForm,
    SideBarContent,
    FolderForm,
    CloudArrowUpIcon,
    CheckCircleIcon,
    InformationCircleIcon,
  },
  setup() {
    const store = useTrackerStore();
    const more_store = useMoreStore();
    const debounceStore = useDebounceStore();
    return {
      store,
      more_store,
      debounceStore,
    };
  },
  data() {
    return {
      add_checked: false,
      project_name: "My Project",
      openInfo: false,
    };
  },
  mounted() {
    this.get_project_name();
    this.get_project();
  },
  methods: {
    changeInfo(){
      this.openInfo = true;
      console.log(this.openInfo);
    },
    get_project() {
      axios
        ({url: "project/" + this.$route.params.id, baseURL: import.meta.env.VITE_BASEURL})
        .then((response) => {
          this.store.fill_store(JSON.parse(response.data));
        });
    },
    get_project_name() {
      axios
        ({url:"project/name/" + this.$route.params.id, baseURL: import.meta.env.VITE_BASEURL})
        .then((response) => {
          this.project_name = response.data.name;
        });
    },
  },
  computed: {
    waiting() {
      return this.debounceStore.waiting;
    },
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
