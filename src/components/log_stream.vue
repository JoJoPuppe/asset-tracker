<template>
  <ul class="mr-2">
    <li v-for="item in content">
      <logMessage :item="item" />
    </li>
  </ul>
</template>
<script>
  import logMessage from "./logs.vue";

  export default{
  props: ['content'],
  components: {
    logMessage,
  },
  data(){
    return {
    }
  },
  methods: {
  },
}
</script>
