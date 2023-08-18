<template>
    <div>
      <AButton type="primary" @click="showModal">Upload photo</AButton>
      <AModal v-model:open="open" title="Upload photo" @ok="handleOk">
        <input type="file" accept=".jpeg, .png">
        <AInput placeholder="Caption..."></AInput>
      </AModal>
    </div>
  </template>
  <script setup>
  import { ref } from 'vue';
  const open = ref(false);
  
  const showModal = () => {
    open.value = true;
  };
  
  const handleOk = (e) => {
    console.log(e);
    open.value = false;
  };
  </script>

<style scoped>

input{
    margin-top: 10px
}
</style>