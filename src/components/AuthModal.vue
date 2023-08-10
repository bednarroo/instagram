<template>
    <div>
      <AButton type="primary" @click="showModal" class="btn">{{title}}</AButton>
      <AModal v-model:open="open" :title="title" @ok="handleOk">
        <AInput class="input"  v-if="!isLogin" v-model:value="value" placeholder="Username" />
        <AInput class="input"  v-model:value="value" placeholder="Email" />
        <AInput  class="input" v-model:value="value" placeholder="Password" />

      </AModal>
    </div>
  </template>
  <script setup>
  import { ref, defineProps } from 'vue';
  const open = ref(false);
  const props = defineProps(['isLogin'])
  const title = props.isLogin ? "Login" : "Signup"
  
  const showModal = () => {
    open.value = true;
  };
  
  const handleOk = (e) => {
    console.log(e);
    open.value = false;
  };
  </script>

  <style scoped>
  .btn {
    margin-left: 10px;
  }
  .input{
    margin-top: 10px
  }
  </style>
  
  