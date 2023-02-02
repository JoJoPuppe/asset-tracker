<template>
  <div class="rounded-xl bg-primary p-3 m-2 broder border-2 hover:border-accent">
      <button @click="delete_log_message" class="btn btn-sm btn-square fill-gray-500 hover:fill-accent mr-4">
        <RiDeleteBinFill class="w-5 h-5" />
      </button>
    <a
      class="link link-hover text-xl font-bold text-accent"
      :href="`${baseurl}/prj/${projectobj._id}`"
      >{{ projectobj.name }}</a
    >
    <p class="text-sm text-gray-400">creation date: {{ projectobj.creation_date }}</p>
  </div>
</template>
<script>
import RiPencilFill from "vue-remix-icons/icons/RiPencilFill.vue";
import RiDeleteBinFill from "vue-remix-icons/icons/RiDeleteBinFill.vue";
export default {
  components: {
    RiPencilFill,
    RiDeleteBinFill
  },
  props: ['projectobj'],
  data() {
    return {
      baseurl: import.meta.env.VITE_ASSETBASE,
    }
  },
}
</script>
