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
    <button v-if="type === 'update'" @click="updateItem" class="btn">
      update item
    </button>
    <button v-else-if="type === 'version'" @click="newVersion" class="btn">
      new version
    </button>
    <button v-else @click="addItem" class="btn">add item</button>
  </div>
</template>

<script>
import axios from "axios";
import { useTrackerStore } from "../stores/tracker_store";

export default {
  props: ["prj_id", "item", "type", "parent"],
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
      file_type: "",
      link: "",
      history: [],
      requirements: [],
    };
  },
  watch: {
    type: function (val, oldVal) {
      if (val === "update" || val === "version") {
        this.fill_fields();
      }
    },
  },
  methods: {
    fill_fields() {
      this.item_name = this.item.name;
      this.path = this.item.path;
      this.link = this.item.link;
      this.project_id = this.item.project_id;
      this.file_type = this.item.file_type;
      this.operator = this.item.operator;
      this.comment = this.item.comment;
      this.history = this.item.history;
    },
    addItem() {
      const now = new Date();
      const offsetMs = now.getTimezoneOffset() * 60 * 1000;
      const date_now = new Date(now.getTime() - offsetMs);

      let payload = {
        path: this.path,
        name: this.item_name,
        status: 0,
        link: this.link,
        project_id: this.prj_id,
        creation_date: date_now,
        last_update: date_now,
        file_type: this.file_type,
        operator: this.operator,
        comment: this.comment,
        history: [],
        requirements: [],
      };
      if (this.parent != undefined){
        payload.parent = this.parent;
      }
      axios
        ({method: "post", url: "/itemfile", baseURL: import.meta.env.VITE_BASEURL, data: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          if (this.parent != undefined){
            this.store.add_item_to_parent(response.data, this.parent)
          } else {
            this.store.add_item(response.data);
          }
          this.$emit("closeModal");
        });
    },
    updateItem() {
      const now = new Date();
      const offsetMs = now.getTimezoneOffset() * 60 * 1000;
      const date_now = new Date(now.getTime() - offsetMs);

      let payload = {
        path: this.path,
        name: this.item_name,
        status: this.item.status,
        link: this.link,
        project_id: this.prj_id,
        last_update: date_now,
        file_type: this.file_type,
        operator: this.operator,
        comment: this.comment,
      };
      axios
        ({method:"put", url: "/itemfile/" + this.item._id, baseURL: import.meta.env.VITE_BASEURL, data:
          JSON.stringify(payload),

            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          this.store.update_item(response.data);
          this.$emit("closeModal");
        });
    },
    newVersion() {
      const now = new Date();
      const offsetMs = now.getTimezoneOffset() * 60 * 1000;
      const date_now = new Date(now.getTime() - offsetMs);

      this.history.push(this.item._id);
      let payload = {
        path: this.path,
        version: this.item.version + 1,
        name: this.item_name,
        creation_date: date_now,
        last_update: date_now,
        link: this.link,
        status: this.item.status,
        project_id: this.item.project_id,
        file_type: this.file_type,
        operator: this.operator,
        item_id: this.item.item_id,
        comment: this.comment,
        history: this.history,
      };
      axios
        ({method:"post", url:"/itemfile", baseURL: import.meta.env.VITE_BASEURL, data: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          this.store.update_version_item(response.data);
          this.$emit("closeModal");
        });
    },
  },
};
</script>
