<template>
  <label class="label">
    <span class="label-text">Name</span>
  </label>
  <input
    v-model="item_name"
    type="text"
    placeholder="Type here"
    class="input input-bordered w-full max-w-xs"
  />
  <button @click="addItem" class="btn">add folder</button>
</template>

<script>
import axios from "axios";
import { useTrackerStore } from "../stores/tracker_store";

export default {
  props: ['prj_id'],
  setup() {
    const store = useTrackerStore();
    return {
      store,
    };
  },
  data() {
    return {
      item_name: "test",
    };
  },
  methods: {
    addItem() {
      let payload = {
        name: this.item_name,
        status: 0,
        project_id: this.prj_id,
      };
      axios
        .post("http://localhost:8000/itemfolder/", JSON.stringify(payload), {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          this.store.add_item(response.data);
          console.log(this.store.list);
        });
    },
  },
};
</script>
