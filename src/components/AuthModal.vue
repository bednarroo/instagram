<template>
    <div>
      <AButton type="primary" @click="showModal" class="btn">{{title}}</AButton>
      <AModal :disabled="loading" v-model:open="open" :title="title" @ok="handleOk">

      <div v-if="!loading" class="input-container">
        <AInput class="input"  v-if="!isLogin" v-model:value="userCredentials.username" placeholder="Username" />
        <AInput class="input"  v-model:value="userCredentials.email" placeholder="Email" />
        <AInput  class="input" v-model:value="userCredentials.password" placeholder="Password" type="password" />
      </div>
      <div v-else class="spinner">
        <ASpin />
      </div>

        <ATypographyText v-if="errorMessage" type="danger" > {{ errorMessage }} </ATypographyText>
      </AModal>
    </div>
  </template>
  <script setup>
  import { ref, defineProps, reactive } from 'vue';
  import useUserStore  from "../stores/users.js";
  import { storeToRefs } from 'pinia';

  const open = ref(false);
  const props = defineProps(['isLogin'])
  const title = props.isLogin ? "Login" : "Signup"
  const userStore = useUserStore();
  const userCredentials = reactive({
    email: "",
    password: "",
    username: ""
  })


  const {errorMessage, loading, user} = storeToRefs(userStore)
  
  const showModal = () => {
    open.value = true;
  };
  
  const handleOk = async () => {
    if(props.isLogin){
      await userStore.handleLogin({
       password: userCredentials.password,
       email: userCredentials.email
      });
    }
    else{
      await userStore.handleSignup(userCredentials);
    }
    
    if(user.value) open.value= false

  };
  </script>

  <style scoped>
  .btn {
    margin-left: 10px;
  }
  .input{
    margin-top: 10px
  }

  .input-container{
    height: 120px;
  }
  .spinner{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 120px;
  }
  
  </style>
  
  