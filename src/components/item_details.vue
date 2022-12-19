<template>
  <div class="flex text-slate-600 border-t-2">
    <div class="m-4">
      <p class="text-left font-bold text-red-500" v-if="item.element.reject_text.length > 0">
        rejected:
      </p>
      <p class="text-left">last updated:</p>
      <p class="text-left">path:</p>
      <p class="text-left">comment:</p>
      <p class="text-left">link:</p>
    </div>
    <div class="m-4">
      <p class="text-left font-bold text-red-500" v-if="item.element.reject_text.length > 0">
        {{ item.element.reject_text }}
      </p>
      <p class="text-left">{{ item.element.last_update }}</p>
      <p class="text-left">{{ item.element.path }}</p>
      <p class="text-left">{{ item.element.comment }}</p>
      <p class="text-left">{{ item.element.link }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props:['item']
};
</script>
