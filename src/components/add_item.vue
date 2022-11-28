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
  <label class="label">
    <span class="label-text">File name</span>
  </label>
  <input
    v-model="file_name"
    type="text"
    placeholder="Type here"
    class="input input-bordered w-full max-w-xs"
  />
  <label class="label">
    <span class="label-text">Path</span>
  </label>
  <input
    v-model="path"
    type="text"
    placeholder="Type here"
    class="input input-bordered w-full max-w-xs"
  />
  <label class="label">
    <span class="label-text">File type</span>
  </label>
  <select class="select select-bordered" v-model="file_type">
    <option disabled selected>Clip</option>
    <option>Video File</option>
    <option>Image Sequence</option>
    <option>Image</option>
    <option>Text</option>
    <option>Other</option>
  </select>
  <label class="label">
    <span class="label-text">Operator</span>
  </label>
  <input
    v-model="operator"
    type="text"
    placeholder="Type here"
    class="input input-bordered w-full max-w-xs"
  />
  <label class="label">
    <span class="label-text">Comment</span>
  </label>
  <input
    v-model="comment"
    type="text"
    placeholder="Type here"
    class="input input-bordered w-full max-w-xs"
  />
  <button @click="addItem" class="btn">add item</button>
</template>

<script>
import axios from "axios";
import { useTrackerStore } from "../stores/tracker_store";

export default {
  setup() {
    const store = useTrackerStore();
    return {
      store,
    };
  },
  data() {
    return {
      item_name: "test",
      path: "/path/to/file",
      operator: "",
      comment: "",
      file_name: "test_v01.txt",
      file_type: "",
      prj_id: "6384852d0c33ee020ce77fd2",
    };
  },
  methods: {
    addItem() {
      let payload = {
        path: this.path,
        name: this.item_name,
        file_name: this.file_name,
        status: 0,
        project_id: this.prj_id,
        file_type: this.file_type,
        operator: this.operator,
        comment: this.comment,
      };
      axios
        .post("http://localhost:8000/itemfile/", JSON.stringify(payload), {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          this.store.add_item(response.data);
          console.log(response.data);
        });
    },
  },
};
</script>
