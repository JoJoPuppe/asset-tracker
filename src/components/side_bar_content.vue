<template>
  <MessageLogs v-if="show_logs" :content="itemData" />

  <div v-else class="">
    <h2 class="font-bold text-xl my-4">{{ itemData.name }}</h2>
    <div class="divider" />
    <p>{{ itemData.path }}</p>
    <p>{{ itemData.creation_date }}</p>
    <p>{{ itemData.last_update }}</p>
    <div class="divider">history</div>
    <div class="">
      <div v-for="item in itemData.history">
        <HistoryItem  :item="item" />
      </div>
    </div>
  </div>
</template>
<script>
import MessageLogs from "./log_stream.vue";
import HistoryItem from "./history_item.vue";

export default{
  components: {
    MessageLogs,
    HistoryItem,
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
