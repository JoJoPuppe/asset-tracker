<template>
  <div class="box rounded-lg border-primary text-base-100 bg-primary mb-1">
    <div class="flex justify-between">
    <div class="flex items-center">
      <FolderIcon
        class="flex-inital w-12 p-2 text-base-100"
      />
        <p class="px-2">{{ item.element.name }}</p>
      </div>
      <div class="flex items-center">
        <button @click="add_item" class="btn btn-accent btn-xs btn-square mr-2">+</button>
        <button @click="delete_folder" class="btn btn-accent btn-xs">delete</button>
        <ChevronRightIcon
          class="w-10 h-10 px-2 hover:text-neutral"
          :class="{ 'rotate-90': isOpen }"
          @click="isOpen=!isOpen"
        />
      </div>
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
import { useAddItemStore } from "../stores/add_item_store";
import { useTrackerStore } from "../stores/tracker_store";
import { FolderIcon, ChevronRightIcon } from "@heroicons/vue/24/outline";
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import axios from 'axios';

const props = defineProps(["item"]);
const addItemStore = useAddItemStore();
const trackerStore = useTrackerStore();
const isOpen = ref(false); // Initial value
const $toast = useToast();

function add_item(){
  addItemStore.cache_item(props.item.element);
  addItemStore.add = true;
}


function delete_folder() {
  if (trackerStore.child_cnt(props.item.element._id) == 0){
    axios
      ({method: "delete", url: "/itemfolder/" + props.item.element._id, baseURL: import.meta.env.VITE_BASEURL})
      .then((response) => {
        trackerStore.delete_item(props.item.element._id)
      });
  } else {
    let instance = $toast.error('Folder not empty!');
  }
}

</script>

<style>
</style>
