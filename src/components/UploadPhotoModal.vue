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
  import {supabase} from '../supabase'
  const open = ref(false);
  const caption = ref("");
  const file = ref(null)
  
  const showModal = () => {
    open.value = true;
  };
  
  const handleOk = async () => {
    const fileName = Math.floor(Math.random()*1000000000000000000)
    if(file.value){
        const response = await supabase.storage.from('images').upload('public/' + fileName, file.value)
        console.log(response)
    }
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