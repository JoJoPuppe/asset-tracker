<template>
  <div class="flex justify-center bg-primary items-center h-full">
    <div class="flex flex-col justify-center space-y-4 card bg-base-100">
      <p class="font-bold text-xl text-primary">
        This is your unique project link:
      </p>
      <p class="text-primary">
        please copy the link and place it somewhere save.<br />you can not
        lookup this link after you close this site.
      </p>
      <div class="card bg-primary">
        <a
          class="link link-hover text-xl font-bold text-accent"
          :href="`${baseurl}/prj/${$route.params.id}`"
          >{{ baseurl }}/prj/{{ $route.params.id }}</a
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      baseurl: import.meta.env.VITE_ASSETBASE,
    }
  }
};
</script>
