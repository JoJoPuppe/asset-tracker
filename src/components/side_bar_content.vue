<template>
  <div class="p-2">
    <h2 class="font-bold text-xl">{{ itemData.name }}</h2>
    <p>{{ itemData.path }}</p>
    <p>{{ itemData.file_name }}</p>

  </div>
</template>
<script>
export default{
  props:['itemData']

}
</script>
