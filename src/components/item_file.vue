<template>
  <div class="box border-t border-l border-slate-400 hover:bg-base-200">
    <div class="flex justify-between">
      <div class="flex text-slate-600 items-center">
        <DocumentIcon
          class="py-2 px-1 w-12 h-full border-r-8 border-primary text-primary"
        />
        <p class="px-2">{{ item.element.name }}</p>
      </div>
      <div class="flex items-center text-slate-600">
        <div class="dropdown dropdown-end">
          <label tabindex="0" class="cursor-pointer ">
            <EllipsisVerticalIcon
              class="w-6 h-6"
            />
          </label>
          <ul
            tabindex="0"
            class="menu dropdown-content p-2 shadow bg-base-100 border border-primary rounded-box w-52 mt-4"
          >
            <li><a @click="get_more(item.element._id)">Details</a></li>
            <li><a @click="$emit('updateItem', item)">Update Item</a></li>
            <li><a @click="$emit('newVersion', item)">New Version</a></li>
            <li><a>Delete</a></li>
          </ul>
        </div>
        <ChevronRightIcon
            class="w-10 h-10 p-2 hover:text-secondary"
            :class="{ 'rotate-90': isOpen }"
            @click="handleCollapse"
          />
        </div>
    </div>
    <Collapse :when="isOpen" class="open_this">
      <div class="flex h-full">
        <div class="w-12 border-r-8 border-primary"></div>
        <div class="flex-grow">
          <ItemDetails :item="item"/>
        </div>
      </div>
    </Collapse>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useMoreStore } from "../stores/more_store";
import { DocumentIcon, ChevronRightIcon, EllipsisVerticalIcon } from "@heroicons/vue/24/outline";
import { Collapse } from "vue-collapsed";
import ItemDetails from "./item_details.vue";
import axios from "axios";
const props = defineProps(["item"]);

const store = useMoreStore();
const isOpen = ref(false); // Initial value

function handleCollapse() {
  isOpen.value = !isOpen.value;
}

function get_more(item_id) {
  axios.get("http://localhost:8000/itemfile/v2/" + item_id).then((response) => {
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
