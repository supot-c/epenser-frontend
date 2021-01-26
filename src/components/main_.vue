<template>
  <div class="mr-auto ml-auto pr-1 pl-1">
    <div id="main_">
      <slot>
        your data here
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'main_'
}
</script>

<style scoped>
  #main_ {
    padding-top: 20px;
    max-width: 1024px;
    margin-left: auto;
    margin-right: auto;
    padding-top: .63em;
  }
</style>

<style>
  #main_ h3 {
    color: rgb(255, 255, 255);
  }
  #main_ div h3 {
    color: rgb(172, 172, 172);
  }
</style>
