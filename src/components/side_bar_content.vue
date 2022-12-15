<template>
  <MessageLogs v-if="show_logs" :content="itemData" />
  <div v-else class="">
    <h2 class="font-bold text-xl my-4">{{ itemData.name }}</h2>
    <div class="divider" />
    <p>{{ itemData.path }}</p>
    <p>{{ itemData.file_name }}</p>
    <div class="divider">history</div>
    <div class="card border border-primary">
      <p v-for="item in itemData.history">
      {{ item.name }}
      </p>
    </div>

  </div>
</template>
<script>
import MessageLogs from "./log_stream.vue";

export default{
  components: {
    MessageLogs,
  },
  props:['itemData'],
  data(){
   return {
      show_logs: true,
   }
  },
  watch: {
    itemData(val, oldVal){
      if ('history' in val){
        this.show_logs = false
      } else {
        this.show_logs = true
      }
    }
  }
}
</script>
