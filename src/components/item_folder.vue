<template>
  <div class="box border-l border-t border-secondary text-slate-600 ">
    <div class="flex justify-between">
    <div class="flex items-center">
      <FolderIcon
        class="flex-inital py-2 px-1 w-12 h-full border-r-8 border-secondary text-secondary"
      />
        <p class="px-2">{{ item.element.name }}</p>
      </div>
        <ChevronRightIcon
          class="w-10 h-10 p-2 hover:text-secondary"
          :class="{ 'rotate-90': isOpen }"
          @click="handleCollapse"
        />
    </div>
  <Collapse :when="isOpen" class="open_this">
    <div class="flex ml-8">
      <slot></slot>
    </div>
  </Collapse>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { FolderIcon, ChevronRightIcon } from "@heroicons/vue/24/outline";
import { Collapse } from "vue-collapsed";
const props = defineProps(["item"]);

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
