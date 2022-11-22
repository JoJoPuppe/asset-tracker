<template>
  <div
    tabindex="0"
    class="collapse collapse-arrow rounded-box border border-base-900 m-4"
  >
    <div class="flex">
      <DocumentIcon
        class="flex-inital py-8 w-12 h-full bg-primary text-white"
      />
      <p>{{ itemName.element.name }}</p>
    </div>
    <div class="collapse-content flex h-full">
      <div class="bg-primary w-12 flex-inital"></div>
      <div class="flex-grow py-4">
        <ItemDetails />
      </div>
    </div>
  </div>
</template>

<script>
import DocumentIcon from "@heroicons/vue/24/solid";
import ItemDetails from "./item_details.vue";
export default {
  props: ["itemName"],
  components: {
    ItemDetails,
    DocumentIcon,
  },
};
</script>
