<template>
  <div class="box rounded-lg border-primary text-base-100 bg-slate-700 mb-1">
    <div class="flex justify-between">
    <div class="flex items-center">
      <FolderIcon
        class="flex-inital w-12 p-2 text-base-100"
      />
        <p class="px-2">{{ item.element.name }}</p>
      </div>
        <ChevronRightIcon
          class="w-10 h-10 px-2 hover:text-neutral"
          :class="{ 'rotate-90': isOpen }"
          @click="isOpen=!isOpen"
        />
    </div>
  <CollapseTransition>
    <div v-show="isOpen" class="flex ml-8">
      <slot></slot>
    </div>
  </CollapseTransition>
  </div>
</template>

<script setup>
import { ref } from "vue";
import CollapseTransition from '@ivanv/vue-collapse-transition/src/CollapseTransition.vue'
import { FolderIcon, ChevronRightIcon } from "@heroicons/vue/24/outline";
const props = defineProps(["item"]);

const isOpen = ref(false); // Initial value

</script>

<style>
</style>
