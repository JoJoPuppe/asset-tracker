<template>
  <div>
    <p class='hover:bg-primary hover:text-accent' @click="isOpen=!isOpen">{{ item.name }}</p>
    <collapse-transition>
      <div v-show="isOpen" class="flex h-full">
        <div class="flex-grow">
          <p>{{ item.creation_date }}</p>
          <p>{{ item.last_update }}</p>
        </div>
      </div>
    </collapse-transition>
  </div>
</template>

<script setup>
import CollapseTransition from "@ivanv/vue-collapse-transition/src/CollapseTransition.vue";
import { ref } from "vue";

const isOpen = ref(false);
const props = defineProps(["item"]);

</script>
