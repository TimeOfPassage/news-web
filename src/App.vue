<script setup>
</script>

<template>
  <router-view></router-view>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
html,
body,
#app {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
.ce-toolbox__button,
.ce-conversion-tool,
.ce-inline-toolbar__buttons,
.ce-inline-toolbar__dropdown-content,
.image-tool {
  color: black;
  svg:not(.icon) {
    fill: none;
    width: 24px;
    height: 24px;
  }
}
</style>
