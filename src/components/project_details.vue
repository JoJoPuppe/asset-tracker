<template>

  <div class="text-primary" v-html="markdownHTML">
  </div>

</template>

<script>
import { marked } from 'marked';

export default {
  data(){
    return {
      markdown: "# This Project"
    }
  },
  computed: {
    markdownHTML(){
      return marked(this.markdown)
    }
  }

}
</script>
