<template>
  <div class="rounded-box border-2 border-primary m-4">
    <div class="flex justify-between items-center">
      <FolderIcon
        class="flex-inital py-2 px-1 w-12 h-full border-r-8 border-primary text-primary"
      />
      <p class="">{{ itemName.element.name }}</p>
      <ChevronRightIcon
        class="w-8 h-8 p-2 m-1 hover:text-secondary"
        :class="{ 'rotate-90': isOpen }"
        @click="handleCollapse"
      />
    </div>
  </div>
  <Collapse :when="isOpen" class="open_this">
    <div class="flex">
      <slot></slot>
    </div>
  </Collapse>
</template>

<script setup>
import { ref } from "vue";
import { FolderIcon, ChevronRightIcon } from "@heroicons/vue/24/outline";
import { Collapse } from "vue-collapsed";
const props = defineProps(["itemName"]);

const isOpen = ref(false); // Initial value

function handleCollapse() {
  isOpen.value = !isOpen.value;
}
</script>

<style>
.open_this {
  transition: height var(--vc-auto-duration) cubic-bezier(0.3, 0, 0.6, 1);
}
</style>
