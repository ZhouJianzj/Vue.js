<template>
  <div>
    {{ $route.params.id }}
    <router-view></router-view>
  </div>

</template>

<script>
export default {
  name: "two"
}
</script>

<style scoped>

</style>