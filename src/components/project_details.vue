<template>
  <div v-if="project_editor">
    <button
      class="btn btn-sm btn-square"
      :class="[
        { 'btn-outline': !project_editor.isActive('heading', { level: 2 }) },
        !project_editor.isActive('heading', { level: 2 })
          ? 'fill-primary'
          : 'fill-accent',
      ]"
      @click="project_editor.chain().focus().toggleHeading({ level: 2 }).run()"
    >
      <RiH1 class="w-6 h-6" />
    </button>
    <button
      class="btn btn-sm btn-square"
      :class="[
        { 'btn-outline': !project_editor.isActive('heading', { level: 3 }) },
        !project_editor.isActive('heading', { level: 3 })
          ? 'fill-primary'
          : 'fill-accent',
      ]"
      @click="project_editor.chain().focus().toggleHeading({ level: 3 }).run()"
    >
      <RiH2 class="w-6 h-6" />
    </button>
    <button
      class="btn btn-sm btn-square"
      :class="[
        { 'btn-outline': !project_editor.isActive('heading', { level: 4 }) },
        !project_editor.isActive('heading', { level: 4 })
          ? 'fill-primary'
          : 'fill-accent',
      ]"
      @click="project_editor.chain().focus().toggleHeading({ level: 4 }).run()"
    >
      <RiH3 class="w-6 h-6" />
    </button>
    <button
      class="btn btn-sm btn-square"
      :class="[
        { 'btn-outline': !project_editor.isActive('bold') },
        !project_editor.isActive('bold') ? 'fill-primary' : 'fill-accent',
      ]"
      @click="project_editor.chain().focus().toggleBold().run()"
    >
      <RiBold class="w-6 h-6" />
    </button>
    <button
      class="btn btn-sm btn-square"
      :class="[
        { 'btn-outline': !project_editor.isActive('bulletList') },
        !project_editor.isActive('bulletList') ? 'fill-primary' : 'fill-accent',
      ]"
      @click="project_editor.chain().focus().toggleBulletList().run()"
    >
      <RiListUnordered class="w-6 h-6" />
    </button>
    <button
      class="btn btn-sm btn-square"
      @click="project_editor.chain().focus().toggleBlockquote().run()"
      :class="[
        { 'btn-outline': !project_editor.isActive('blockquote') },
        !project_editor.isActive('blockquote') ? 'fill-primary' : 'fill-accent',
      ]"
    >
      <RiDoubleQuotesL class="w-6 h-6" />
    </button>
    <editor-content class="text-primary" :editor="project_editor" />
  </div>
  <div class="flex justify-end">
    <button class="btn mt-4" @click="$emit('closeTipTapModal')">cancel</button>
    <button v-if="save_mode" class="btn mt-4" @click="saveLog">save</button>
    <button v-else class="btn mt-4" @click="updateLog">update</button>
  </div>
</template>

<script>
import { Editor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import RiH1 from "vue-remix-icons/icons/RiH1.vue";
import RiH2 from "vue-remix-icons/icons/RiH2.vue";
import RiH3 from "vue-remix-icons/icons/RiH3.vue";
import RiBold from "vue-remix-icons/icons/RiBold.vue";
import RiListUnordered from "vue-remix-icons/icons/RiListUnordered.vue";
import RiDoubleQuotesL from "vue-remix-icons/icons/RiDoubleQuotesL.vue";
import axios from "axios";
import { useLogStore } from "../stores/log_store";

export default {
  components: {
    EditorContent,
    RiBold,
    RiListUnordered,
    RiDoubleQuotesL,
    RiH1,
    RiH2,
    RiH3,
  },
  emits: ["closeTipTapModal"],
  props: ["proj_id", "item", "mode"],
  data() {
    return {
      project_editor: null,
      save_mode: true,
    };
  },
  setup() {
    const log_store = useLogStore();
    return {
      log_store,
    };
  },
  methods: {
    saveLog() {
      const now = new Date();
      const offsetMs = now.getTimezoneOffset() * 60 * 1000;
      const date_now = new Date(now.getTime() - offsetMs);

      axios({
        method: "post",
        url: "logs",
        baseURL: import.meta.env.VITE_BASEURL,
        data: {
          log_message: this.project_editor.getHTML(),
          creation_date: date_now,
          last_update: date_now,
          project_id: this.proj_id,
        },
      }).then((response) => {
        console.log(response.data);
        this.log_store.item = null;
      });
    },
    updateLog() {
      const now = new Date();
      const offsetMs = now.getTimezoneOffset() * 60 * 1000;
      const date_now = new Date(now.getTime() - offsetMs);

      axios({
        method: "put",
        url: "logs/" + this.item._id,
        baseURL: import.meta.env.VITE_BASEURL,
        data: {
          log_message: this.project_editor.getHTML(),
          last_update: date_now,
          project_id: this.item.project_id,
        },
      }).then((response) => {
        console.log(response.data);
        this.log_store.item = null;
      });
    },
  },
  watch: {
    mode(val, oldVal) {
      if (val == "edit") {
        this.save_mode = false;
      } else {
        this.save_mode = true;
      }
    },
    item(val, oldVal) {
      if (this.mode == "save") {
        this.project_editor.commands.setContent("");
      }
      this.project_editor.commands.setContent(this.item.log_message);
    },
  },
  mounted() {
    this.project_editor = new Editor({
      editorProps: {
        attributes: {
          class:
            "focus:outline-2 focus:outline-primary outline outline-2 outline-primary rounded-md p-2 mt-2",
        },
      },
      content: "",
      extensions: [StarterKit],
    });
  },

  beforeUnmount() {
    this.project_editor.destroy();
  },
};
</script>

<style>
/* Basic editor styles */
.ProseMirror {
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
