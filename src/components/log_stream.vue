<template>
  <ul class="mr-2">
    <li v-for="item in content">
      <logMessage :message="item.log_message" :creationDate="item.creation_date" :lastUpdate="item.last_update" />
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
}
</script>
