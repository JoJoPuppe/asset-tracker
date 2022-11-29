<template>
  <div>
    <h3>this is your unique project link</h3>
    <a class="link link-hover text-xl font-bold" :href="`http://127.0.0.1:5173/prj/${$route.params.id}`">http://127.0.0.1:5173/prj/{{ $route.params.id }}</a>
  </div>
</template>

<script>
  export default {
}
</script>
