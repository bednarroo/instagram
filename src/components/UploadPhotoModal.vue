<template>
    <div>
      <AButton type="primary" @click="showModal">Upload photo</AButton>
      <AModal v-model:open="open" title="Upload photo" @ok="handleOk">
        <input type="file" accept=".jpeg, .png" @change="handleUploadChange">
        <AInput
            placeholder="Caption..."
            :v-model="caption"
            :maxlength="50"
        >
        </AInput>
      </AModal>
    </div>
  </template>
  <script setup>
  import { ref } from 'vue';
  const open = ref(false);
  const caption = ref("");
  const file = ref()
  
  const showModal = () => {
    open.value = true;
  };
  
  const handleOk = (e) => {
    console.log(e);
    open.value = false;
  };

  const handleUploadChange = (e) => {
    if(e.target.files[0]){
        file.value = e.target.files[0]
    }
  }
  </script>

<style scoped>

input{
    margin-top: 10px
}
</style>