<template>
  <div class="text-slate-600">
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
    <button v-if="type === 'update'" @click="updateItem" class="btn">update item</button>
    <button v-else-if="type === 'version'" @click="newVersion" class="btn">new version</button>
    <button v-else @click="addItem" class="btn">add item</button>
  </div>
</template>

<script>
import axios from "axios";
import { useTrackerStore } from "../stores/tracker_store";

export default {
  props: ["prj_id", "item", "type"],
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
      history: [],
      requirements: [],
    };
  },
  watch: {
    type: function (val, oldVal) {
      if (val === 'update' || val === 'version') {
        this.fill_fields();
      }
    },
  },
  methods: {
    fill_fields() {
      this.item_name = this.item.name;
      this.path = this.item.path;
      this.file_name = this.item.file_name;
      this.project_id = this.item.project_id;
      this.file_type = this.item.file_type;
      this.operator = this.item.operator;
      this.comment = this.item.comment;
      this.history = this.item.history;
    },
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
        history: [],
        requirements: [],
      };
      axios
        .post("http://localhost:8000/itemfile/", JSON.stringify(payload), {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          this.store.add_item(response.data);
        });
    },
    updateItem() {
      let payload = {
        path: this.path,
        name: this.item_name,
        file_name: this.file_name,
        status: this.item.status,
        project_id: this.prj_id,
        file_type: this.file_type,
        operator: this.operator,
        comment: this.comment,
      };
      axios
        .put(
          "http://localhost:8000/itemfile/" + this.item._id,
          JSON.stringify(payload),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          this.store.update_item(response.data);
        });
    },
    newVersion() {
      this.history.push(this.item._id)
      let payload = {
        path: this.path,
        version: this.item.version + 1,
        name: this.item_name,
        file_name: this.file_name,
        status: this.item.status,
        project_id: this.item.project_id,
        file_type: this.file_type,
        operator: this.operator,
        item_id: this.item.item_id,
        comment: this.comment,
        history: this.history,
      };
      axios
        .post(
          "http://localhost:8000/itemfile/",
          JSON.stringify(payload),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          this.store.update_item(response.data);
        });
    },
  },
};
</script>
