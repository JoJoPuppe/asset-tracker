<template>
  <div class="p-2">
    <h2 class="font-bold text-xl">{{ itemData.name }}</h2>
    <div class="divider" />
    <p>{{ itemData.path }}</p>
    <p>{{ itemData.file_name }}</p>
    <div class="divider">history</div>
    <div class="card border border-primary">
      <p>testkdsd</p>
      <p>testkdsd</p>
      <p>testkdsd</p>
      <p>testkdsd</p>
    </div>

  </div>
</template>
<script>
export default{
  props:['itemData']

}
</script>
