<template>
    <div>
      <AButton type="primary" @click="showModal">Upload photo</AButton>
      <AModal v-model:open="open" title="Upload photo" @ok="handleOk">
        <div v-if="!loading">
            <input type="file" accept=".jpeg, .png" @change="handleUploadChange">
            <AInput
                placeholder="Caption..."
                :v-model="caption"
                :maxlength="50"
                >
            </AInput>
            <ATypographyText v-if="errorMessage" type="danger" > {{ errorMessage }} </ATypographyText>
        </div>
        <div class="spinner" v-else>
            <ASpin></ASpin>
        </div>
      </AModal>
    </div>
  </template>
  <script setup>
  import { ref } from 'vue';
  import {supabase} from '../supabase'
  import {useUserStore} from '../stores/users'
  import { storeToRefs } from 'pinia';

  const userStore = useUserStore()

  const {user} = storeToRefs(userStore)

  const loading = ref(false)
  const open = ref(false)
  const caption = ref("")
  const file = ref(null)
  const errorMessage = ref("")
  
  const showModal = () => {
    open.value = true;
  };
  
  const handleOk = async () => {
    loading.value = true
    const fileName = Math.floor(Math.random()*1000000000000000000)
    if(file.value){
        const {data, error} = await supabase.storage.from('images').upload('public/' + fileName, file.value)
        if(error){
            loading.value = false
            return errorMessage.value("Unable to uplad image")
        }

        await supabase.from('posts').insert({
            url: data.path,
            caption: caption.value,
            owner_id: user.value.id
        })

    }

    loading.value = false
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

    .spinner {
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>