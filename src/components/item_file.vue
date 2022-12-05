<template>
  <div class="box rounded-lg bg-base-100 mb-1 mr-1">
    <div class="flex justify-between">
      <div class="flex text-primary items-center">
        <DocumentIcon
          class="py-2 px-1 w-12 h-full border-r-8 text-primary"
          :class="statusClass"
        />
        <p class="px-2">{{ item.element.name }}</p>
      </div>
      <div class="flex items-center text-slate-600">
        <div class="dropdown dropdown-end">
          <label tabindex="0" class="cursor-pointer">
            <ChartBarIcon class="w-6 h-6 mr-2 hover:fill-neutral" />
          </label>
          <ul
            tabindex="0"
            class="menu dropdown-content p-2 shadow bg-base-100 border border-primary rounded-box w-52 mt-4"
          >
            <li>
              <a class="my-1 border-2 border-slate-300" @click="set_status(0)"
                >Not Started</a
              >
            </li>
            <li>
              <a class="my-1 border-2 border-blue-400" @click="set_status(1)"
                >In Progress</a
              >
            </li>
            <li>
              <a class="my-1 border-2 border-warning" @click="set_status(2)"
                >In Review</a
              >
            </li>
            <li>
              <a class="my-1 border-2 border-success" @click="set_status(3)"
                >Approved</a
              >
            </li>
          </ul>
        </div>
        <div class="dropdown dropdown-end">
          <label tabindex="0" class="cursor-pointer">
            <EllipsisHorizontalIcon class="w-6 h-6 hover:fill-neutral" />
          </label>
          <ul
            tabindex="0"
            class="menu dropdown-content p-2 shadow bg-base-100 border border-primary rounded-box w-52 mt-4"
          >
            <li><a @click="get_more(item.element._id)">Details</a></li>
            <li><a @click="$emit('updateItem', item)">Update Item</a></li>
            <li><a @click="$emit('newVersion', item)">New Version</a></li>
            <li><a @click="check_delete = !check_delete">Delete</a></li>
          </ul>
        </div>
        <ChevronRightIcon
          class="w-10 h-10 p-2 hover:text-neutral"
          :class="{ 'rotate-90': isOpen }"
          @click="isOpen = !isOpen"
        />
      </div>
    </div>
    <collapse-transition>
      <div v-show="isOpen" class="flex h-full">
        <div class="w-12 border-r-8 border-primary" :class="statusClass"></div>
        <div class="flex-grow">
          <ItemDetails :item="item" />
        </div>
      </div>
    </collapse-transition>
  </div>

  <input
    type="checkbox"
    id="delete-modal"
    class="modal-toggle"
    v-model="check_delete"
  />
  <div class="modal">
    <div class="modal-box w-9/12 max-w-4xl">
      <h3 class="font-bold text-lg">What do you want to delete?</h3>
      <div class="modal-action">
        <button @click="delete_item(item.element._id)" class="btn">
          delete item
        </button>
        <button @click="delete_all(item.element.item_id)" class="btn">
          delete item and versions
        </button>
        <button @click="check_delete = !check_delete" class="btn">
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useMoreStore } from "../stores/more_store";
import { useTrackerStore } from "../stores/tracker_store";
import { DocumentIcon, ChevronRightIcon } from "@heroicons/vue/24/outline";
import { EllipsisHorizontalIcon, ChartBarIcon } from "@heroicons/vue/24/solid";

import CollapseTransition from "@ivanv/vue-collapse-transition/src/CollapseTransition.vue";
import ItemDetails from "./item_details.vue";
import axios from "axios";
const props = defineProps(["item"]);
const emits = defineEmits(["updateItem", "newVersion"]);

const store = useMoreStore();
const trackerStore = useTrackerStore();
const isOpen = ref(false);
const check_delete = ref(false);

const item_status = ref(props.item.element.status);

const statusClass = computed(() => ({
  "border-success": item_status.value === 3,
  "border-warning": item_status.value === 2,
  "border-blue-300": item_status.value === 1,
  "border-slate-300": item_status.value === 0,
}));

function set_status(state) {
  axios
    ({method:"put", url: "/itemfile/" + props.item.element._id, baseURL: import.meta.env.VITE_BASEURL, data: {
      status: state,
    }})
    .then((response) => {
      trackerStore.update_item(response.data);
      item_status.value = state;
    });
}

function delete_item(item_id) {
  axios
    ({method: "delete", url: "/itemfile/" + item_id, baseURL: import.meta.env.VITE_BASEURL})
    .then((response) => {
      check_delete.value = !check_delete.value;
    });
}

function delete_all(item_id) {
  axios
    ({method:"delete", url: "/itemfile/history/" + item_id, baseURL: import.meta.env.VITE_BASEURL})
    .then((response) => {
      trackerStore.delete_item_with_versions(item_id);
      check_delete.value = !check_delete.value;
    });
}
function get_more(item_id) {
  axios
    ({url: "/itemfile/v2/" + item_id, baseURL: import.meta.env.VITE_BASEURL})
    .then((response) => {
      store.cache_item(response.data);
      store.more = true;
    });
}
</script>

<style>
.open_this {
  transition: height var(--vc-auto-duration) cubic-bezier(0.3, 0, 0.6, 1);
}
</style>
