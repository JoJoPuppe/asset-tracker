<template>
  <div class="mb-4">
    <p class="font-bold text-primary text-sm">created: {{ creationDate }}</p>
    <div class="note bg-base-200 p-4 rounded-lg ml-2 my-1" v-html="message" />
    <p class="font-italic text-base-300 text-right text-xs">last update: {{ lastUpdate }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  components: {},
  props: ["message", "creationDate", "lastUpdate"],
  data() {
    return {
    };
  },
  methods: {
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
