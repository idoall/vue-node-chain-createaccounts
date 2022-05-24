/* eslint-disable vue/valid-template-root */
<template>
  <div id="app" class="mt-3 ml-0">
    <b-img-lazy src="https://mshk.top/wp-content/uploads/2017/08/logo_248248.png" width="100" height="100"></b-img-lazy>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
