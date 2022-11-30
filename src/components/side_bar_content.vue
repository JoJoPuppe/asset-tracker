<template>
  <div class="">
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
export default{
  props:['itemData']

}
</script>
