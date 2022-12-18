<template>
  <div class="mb-4">
    <p class="font-bold text-primary text-sm">created: {{ item.creation_date }}</p>
    <button @click="update_log_message" class="btn btn-sm">edit</button>
    <button @click="delete_log_message" class="btn btn-sm">delete</button>
    <div class="note bg-base-200 p-4 rounded-lg ml-2 my-1" v-html="item.log_message" />
    <p class="font-italic text-base-300 text-right text-xs">last update: {{ item.last_update }}</p>
  </div>
</template>

<script>
import axios from "axios";
import { useMoreStore } from "../stores/more_store";
import { useLogStore } from "../stores/log_store";

export default {
  components: {},
  props: ["item"],
  setup() {
    const more_store = useMoreStore();
    const log_store = useLogStore();
    return {
      more_store,
      log_store,
    };
  },
  data() {
    return {
    };
  },
  methods: {
    delete_log_message(){
      axios
        ({method: "delete", url: "/logs/" + this.item._id, baseURL: import.meta.env.VITE_BASEURL})
        .then((response) => {
          axios
            ({method: "get", url: "/logs/" + this.item.project_id, baseURL: import.meta.env.VITE_BASEURL})
            .then((response) => {
              this.more_store.cache_item(response.data);
          });
      });
    },
    update_log_message(){
      this.log_store.cache_item(this.item)
      this.log_store.edit = true
    },
  },
};
</script>

<style>
/* Basic editor styles */
.note {
  > * + * {
    margin-top: 0.55em;
  }

  ul,
  ol {
    padding: 0 1rem;
    list-style-type: circle;
  }

  blockquote {
    padding-left: 1rem;
    margin-left: 1rem;
    border-left: 3px solid black;
  }
}
</style>
