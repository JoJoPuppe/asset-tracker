<template>
  <div class="rounded-box border-2 border-primary m-4">
    <div class="flex justify-between items-center">
      <DocumentIcon
        class="flex-inital py-2 px-1 w-12 h-full border-r-8 border-primary text-primary"
      />
      <p class="">{{ itemName.element.name }}</p>
      <ChevronRightIcon
        class="w-8 h-8 p-2 m-1 hover:text-secondary"
        :class="{ 'rotate-90': isOpen }"
        @click="handleCollapse"
      />
      <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost rounded-btn">Dropdown</label>
        <ul
          tabindex="0"
          class="menu dropdown-content p-2 shadow bg-base-100 border border-primary rounded-box w-52 mt-4"
        >
          <li><a @click="get_more(itemName.element.name)">More</a></li>
          <li><a>Delete</a></li>
        </ul>
      </div>
    </div>
    <Collapse :when="isOpen" class="open_this">
      <div class="flex h-full">
        <div class="w-12 flex-inital border-r-8 border-primary"></div>
        <div class="flex-grow py-4">
          <ItemDetails />
        </div>
      </div>
    </Collapse>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useMoreStore } from "../stores/more_store";
import { DocumentIcon, ChevronRightIcon } from "@heroicons/vue/24/outline";
import { Collapse } from "vue-collapsed";
import ItemDetails from "./item_details.vue";
const props = defineProps(["itemName"]);

const store = useMoreStore();
const isOpen = ref(false); // Initial value

function handleCollapse() {
  isOpen.value = !isOpen.value;
}

function get_more(item_name) {
  store.item_name = item_name;
  store.more = true;
}
</script>

<style>
.open_this {
  transition: height var(--vc-auto-duration) cubic-bezier(0.3, 0, 0.6, 1);
}
</style>
